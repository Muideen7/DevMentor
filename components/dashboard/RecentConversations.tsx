"use client"

import { cn } from "@/lib/utils"

interface Conversation {
  id: string
  title: string
  subtitle: string
  time: string
  icon: string
}

interface RecentConversationsProps {
  conversations: Conversation[]
}

export default function RecentConversations({ conversations }: RecentConversationsProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-xl font-black tracking-tight">Recent AI Conversations</h3>
        <button className="text-[10px] font-black uppercase tracking-wider text-accent-coral hover:bg-accent-coral/10 py-1.5 px-3 rounded-full transition-all">
          View All Conversations
        </button>
      </div>
      <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-zinc-800 shadow-soft">
        {conversations.map((conv, idx) => (
          <div 
            key={conv.id} 
            className={cn(
              "p-5 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all cursor-pointer group",
              idx !== conversations.length - 1 && "border-b border-slate-100 dark:border-zinc-800"
            )}
          >
            <div className="size-12 rounded-2xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-primary dark:text-white group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-105 duration-300">
              <span className="material-symbols-outlined">{conv.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black truncate group-hover:text-primary transition-colors">{conv.title}</p>
              <p className="text-[10px] text-slate-500 font-bold tracking-tight">{conv.subtitle}</p>
            </div>
            <span className="text-[10px] text-slate-400 font-black whitespace-nowrap bg-slate-50 dark:bg-zinc-800 px-2.5 py-1 rounded-full">{conv.time}</span>
            <span className="material-symbols-outlined text-sm text-slate-300 group-hover:text-accent-coral transition-colors">arrow_forward_ios</span>
          </div>
        ))}
      </div>
    </section>
  )
}
