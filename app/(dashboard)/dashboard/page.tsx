import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { connectDB } from "@/lib/db/mongoose"
import RoadmapModel from "@/lib/db/models/Roadmap"
import FocusCard from "@/components/dashboard/FocusCard"
import SummaryCards from "@/components/dashboard/SummaryCards"
import RecentConversations from "@/components/dashboard/RecentConversations"
import GreetingHeader from "@/components/dashboard/GreetingHeader"
import type { Roadmap } from "@/types/roadmap"

export const metadata = {
  title: "Dashboard | DevMentor AI",
}

async function getRoadmap(userId: string): Promise<Roadmap | null> {
  await connectDB()
  const roadmap = await RoadmapModel.findOne({ userId }).lean()
  if (!roadmap) return null
  return JSON.parse(JSON.stringify(roadmap)) as Roadmap
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const roadmap = await getRoadmap(session.user.id)
  const firstName = session.user.name?.split(" ")[0] || "Developer"

  // Derive active week from roadmap
  const activePhase = roadmap?.phases?.find(p => p.status === "active")
  const activeWeek = activePhase?.weeks?.find(w => w.status === "active")

  // Focus card data
  const hasRoadmap = !!roadmap
  const focusData = {
    week: activeWeek?.weekNumber ?? 1,
    title: activeWeek?.title ?? "Generate Your Roadmap",
    description: activeWeek
      ? activeWeek.topics.join(" · ")
      : "You don't have a roadmap yet. Let your AI mentor build a personalised plan for you.",
    progress: roadmap
      ? Math.round((roadmap.currentWeek / (roadmap.totalWeeks || 1)) * 100)
      : 0,
    hasRoadmap,
    continuePath: hasRoadmap 
      ? (activeWeek ? `/roadmap/week/${activeWeek._id}` : "/roadmap")
      : "/onboarding/step-1",
  }

  // Stats
  const stats = {
    roadmapProgress: focusData.progress,
    streakDays: 7, // TODO: derive from CheckIn model
    codeReviewsDone: 3, // TODO: derive from CodeReview model
    aiMessagesUsed: 0,
    aiMessageLimit: 10,
  }

  const conversations = [
    {
      id: "1",
      title: "How to use .then() vs async/await",
      subtitle: "Mastering promises in Node.js",
      time: "2h ago",
      icon: "psychology",
    },
    {
      id: "2",
      title: "Code Review: handleSubmissions",
      subtitle: "Optimizing database queries",
      time: "Yesterday",
      icon: "terminal",
    },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      {/* Greeting — client component so it can read the clock */}
      <GreetingHeader
        firstName={firstName}
        activeWeekTitle={activeWeek?.title ?? null}
      />

      {/* Today's Focus Card */}
      <FocusCard {...focusData} />

      {/* Summary Stats Grid */}
      <SummaryCards {...stats} />

      {/* Recent AI Conversations */}
      <RecentConversations conversations={conversations} />
    </div>
  )
}
