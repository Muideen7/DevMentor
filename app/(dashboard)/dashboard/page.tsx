"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import FocusCard from "@/components/dashboard/FocusCard"
import SummaryCards from "@/components/dashboard/SummaryCards"
import RecentConversations from "@/components/dashboard/RecentConversations"

export default function DashboardPage() {
  const { data: session } = useSession()
  const firstName = session?.user?.name?.split(' ')[0] || "Developer"
  const [roadmap, setRoadmap] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRoadmap() {
      try {
        const response = await fetch("/api/roadmap")
        const resData = await response.json()
        if (resData.success) {
          setRoadmap(resData.data)
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchRoadmap()
  }, [])

  // Find the active week from real data
  const activePhase = roadmap?.phases?.find((p: any) => p.status === 'active')
  const activeWeek = activePhase?.weeks?.find((w: any) => w.status === 'active')

  // Derive Focus Data or use a fallback
  const focusData = {
    week: activeWeek?.weekNumber || 1,
    day: 1, // We could derive this from progress, but 1 is fine for now
    title: activeWeek?.title || "Welcome to DevMentor!",
    description: activeWeek?.topics?.join(", ") || "Analyze your roadmap to get started with your first lesson.",
    progress: (roadmap?.currentWeek / (roadmap?.totalWeeks || 1)) * 100 || 0
  }

  // Derive Stats from real data
  const stats = {
    roadmapProgress: Math.round((roadmap?.currentWeek / (roadmap?.totalWeeks || 1)) * 100) || 0,
    streakDays: 7, // Stretch: Fetch real streak from DB
    codeReviewsDone: 3, 
    aiMessagesUsed: 47,
    aiMessageLimit: 100
  }

  const conversations = [
    { 
      id: "1", 
      title: "How to use .then() vs async/await", 
      subtitle: "Mastering promises in Node.js", 
      time: "2h ago", 
      icon: "psychology" 
    },
    { 
      id: "2", 
      title: "Code Review: handleSubmissions", 
      subtitle: "Optimizing database queries", 
      time: "Yesterday", 
      icon: "terminal" 
    },
  ]

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin material-symbols-outlined text-4xl text-accent-coral">sync</div>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 border-l-[10px] border-accent-coral pl-6 leading-tight">
          Good morning, {firstName} 👋
        </h1>
        <p className="text-slate-500 mt-4 text-base md:text-lg font-medium ml-8 leading-relaxed">
          Ready to master <span className="text-primary font-black italic underline decoration-accent-coral/30">
            {activeWeek?.title || "your learning roadmap"}
          </span> aujourd'hui?
        </p>
      </header>

      {/* Today's Focus Card */}
      <FocusCard {...focusData} />

      {/* Summary Stats Grid */}
      <SummaryCards {...stats} />

      {/* Recent AI Conversations */}
      <RecentConversations conversations={conversations} />
    </div>
  )
}
