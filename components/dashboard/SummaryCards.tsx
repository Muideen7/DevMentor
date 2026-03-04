"use client"

import { cn } from "@/lib/utils"

interface SummaryCardsProps {
  roadmapProgress: number
  streakDays: number
  codeReviewsDone: number
  aiMessagesUsed: number
  aiMessageLimit: number
}

export default function SummaryCards({ 
  roadmapProgress, 
  streakDays, 
  codeReviewsDone, 
  aiMessagesUsed, 
  aiMessageLimit 
}: SummaryCardsProps) {
  
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Roadmap Progress */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-soft hover:shadow-lg transition-all duration-300">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">My Roadmap</p>
        <div className="flex items-end gap-2 mb-4">
          <span className="text-3xl font-black">{roadmapProgress}%</span>
          <span className="text-green-500 text-[10px] font-bold mb-1.5 flex items-center">
            <span className="material-symbols-outlined text-[10px]">trending_up</span> +2%
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-accent-coral h-1.5 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(232,113,105,0.3)]" 
            style={{ width: `${roadmapProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Current Streak */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-soft hover:shadow-lg transition-all duration-300">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Current Streak</p>
        <div className="flex items-end gap-2 mb-4">
          <span className="text-3xl font-black">{streakDays} Days</span>
          <span className="material-symbols-outlined text-accent-coral mb-2 text-2xl animate-pulse">local_fire_department</span>
        </div>
        <p className="text-[10px] text-slate-400 font-bold leading-tight">Keep it up! {10 - (streakDays % 10)} more days for a badge.</p>
      </div>

      {/* Code Reviews */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-soft hover:shadow-lg transition-all duration-300">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Code Reviews</p>
        <div className="flex items-end gap-2 mb-4">
          <span className="text-3xl font-black">{codeReviewsDone} Done</span>
          <span className="text-slate-400 text-[10px] font-bold mb-1.5 uppercase">This week</span>
        </div>
        <div className="flex gap-1.5">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-500",
                i < codeReviewsDone ? "bg-accent-coral shadow-[0_0_5px_rgba(232,113,105,0.3)]" : "bg-slate-100 dark:bg-zinc-800"
              )}
            ></div>
          ))}
        </div>
      </div>

      {/* AI Messages */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-soft hover:shadow-lg transition-all duration-300">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">AI Messages</p>
        <div className="flex items-end gap-2 mb-4">
          <span className="text-3xl font-black">{aiMessagesUsed}/{aiMessageLimit}</span>
          <span className="text-slate-400 text-[10px] font-bold mb-1.5 uppercase tracking-tighter">Free Tier</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-primary dark:bg-white h-1.5 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${(aiMessagesUsed / aiMessageLimit) * 100}%` }}
          ></div>
        </div>
      </div>
    </section>
  )
}
