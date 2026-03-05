import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { connectDB } from "@/lib/db/mongoose"
import RoadmapModel from "@/lib/db/models/Roadmap"
import FocusCard from "@/components/dashboard/FocusCard"
import SummaryCards from "@/components/dashboard/SummaryCards"
import RecentConversations from "@/components/dashboard/RecentConversations"
import GreetingHeader from "@/components/dashboard/GreetingHeader"
import type { Roadmap } from "@/types/roadmap"
import CheckIn from "@/lib/db/models/CheckIn"
import CodeReview from "@/lib/db/models/CodeReview"
import Conversation from "@/lib/db/models/Conversation"
import { startOfWeek, endOfWeek } from "date-fns"

export const metadata = {
  title: "Dashboard | DevMentor AI",
}

async function getRoadmap(userId: string): Promise<Roadmap | null> {
  await connectDB()
  const roadmap = await RoadmapModel.findOne({ userId }).lean()
  if (!roadmap) return null
  return JSON.parse(JSON.stringify(roadmap)) as Roadmap
}

async function getDashboardStats(userId: string) {
  await connectDB()
  const now = new Date()
  
  // Start and end of today
  const startOfToday = new Date(now.setHours(0, 0, 0, 0))
  const endOfToday = new Date(now.setHours(23, 59, 59, 999))

  // 1. Current Streak from latest CheckIn
  const latestCheckIn = await CheckIn.findOne({ userId }).sort({ createdAt: -1 }).lean()
  const streakDays = latestCheckIn ? (latestCheckIn as any).streakDay || 0 : 0

  // 2. Code Reviews THIS WEEK (Starting Monday)
  const weekStart = startOfWeek(now, { weekStartsOn: 1 })
  
  const reviewsThisWeek = await CodeReview.countDocuments({
    userId,
    createdAt: { $gte: weekStart }
  })

  // 3. AI Messages TODAY (Limit check)
  const conversationCountToday = await Conversation.countDocuments({
    userId,
    createdAt: { $gte: startOfToday, $lte: endOfToday }
  })
  const reviewsToday = await CodeReview.countDocuments({
    userId,
    createdAt: { $gte: startOfToday, $lte: endOfToday }
  })
  const totalAiMessagesToday = conversationCountToday + reviewsToday

  // 4. Recent Conversations and Reviews
  const recentConvos = await Conversation.find({ userId }).sort({ updatedAt: -1 }).limit(3).lean()
  const recentReviews = await CodeReview.find({ userId }).sort({ createdAt: -1 }).limit(2).lean()

  return {
    streakDays,
    reviewsThisWeek,
    totalAiMessagesToday,
    recentConvos: JSON.parse(JSON.stringify(recentConvos)),
    recentReviews: JSON.parse(JSON.stringify(recentReviews))
  }
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const [roadmap, dashStats] = await Promise.all([
    getRoadmap(session.user.id),
    getDashboardStats(session.user.id)
  ])

  const firstName = (session.user.name || "Developer").split(" ")[0]

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
    streakDays: dashStats.streakDays,
    codeReviewsDone: dashStats.reviewsThisWeek,
    aiMessagesUsed: dashStats.totalAiMessagesToday,
    aiMessageLimit: 10, // Daily limit for free tier
  }

  // Combine recent activity
  const conversations = [
    ...dashStats.recentConvos.map((c: any) => ({
      id: c._id,
      title: c.title,
      subtitle: c.type === 'concept' ? "Concept Exploration" : "General Query",
      time: "Chat",
      icon: "psychology",
      path: "/concepts" // Or a specific concept route if available
    })),
    ...dashStats.recentReviews.map((r: any) => ({
      id: r._id,
      title: `Review: ${r.language || 'Code'}`,
      subtitle: "Code Quality Check",
      time: "Review",
      icon: "terminal",
      path: "/progress" // Reviews are listed in progress history
    }))
  ].slice(0, 4)

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
