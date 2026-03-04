"use client"

import { useSession } from "next-auth/react"
import FocusCard from "@/components/dashboard/FocusCard"
import SummaryCards from "@/components/dashboard/SummaryCards"
import RecentConversations from "@/components/dashboard/RecentConversations"

export default function DashboardPage() {
  const { data: session } = useSession()
  const firstName = session?.user?.name?.split(' ')[0] || "Developer"

  // Mock data matching the Stitch design
  const focusData = {
    week: 3,
    day: 2,
    title: "Async JavaScript",
    description: "Mastering Promises, Async/Await, and handling API errors like a pro. Your next lesson is waiting.",
    progress: 60
  }

  const stats = {
    roadmapProgress: 12,
    streakDays: 7,
    codeReviewsDone: 3,
    aiMessagesUsed: 47,
    aiMessageLimit: 100
  }

  const conversations = [
    { 
      id: "1", 
      title: "Explained Promises", 
      subtitle: "How to use .then() vs async/await", 
      time: "2h ago", 
      icon: "psychology" 
    },
    { 
      id: "2", 
      title: "Code Review: fetchUserData", 
      subtitle: "Optimizing API call efficiency", 
      time: "Yesterday", 
      icon: "terminal" 
    },
    { 
      id: "3", 
      title: "Concept: Event Loop", 
      subtitle: "Visualization of stack and queue", 
      time: "3 days ago", 
      icon: "hub" 
    }
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 border-l-[10px] border-accent-coral pl-6 leading-tight">
          Good morning, {firstName} 👋
        </h1>
        <p className="text-slate-500 mt-4 text-base md:text-lg font-medium ml-8">
          Ready to master <span className="text-primary font-black italic underline decoration-accent-coral/30">asynchronous JavaScript</span> today?
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
