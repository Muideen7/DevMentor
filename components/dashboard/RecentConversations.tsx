import Link from "next/link"
import { cn } from "@/lib/utils"

interface Conversation {
  id: string
  title: string
  subtitle: string
  time: string
  icon: string
  path: string
}

interface RecentConversationsProps {
  conversations: Conversation[]
}

export default function RecentConversations({ conversations }: RecentConversationsProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-accent-coral/10 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-accent-coral text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
          </div>
          <h3 className="text-xl font-black tracking-tight">Recent Interactions</h3>
        </div>
        <Link href="/progress" className="text-[10px] font-black uppercase tracking-wider text-accent-coral hover:bg-accent-coral/10 py-1.5 px-3 rounded-full transition-all">
          View All Progress
        </Link>
      </div>
      
      {conversations.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-zinc-800 shadow-soft">
          <p className="text-slate-400 font-bold text-sm italic">No recent interactions yet. Start by asking a question or submitting code!</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-zinc-800 shadow-soft">
          {conversations.map((conv, idx) => (
            <Link 
              key={conv.id} 
              href={conv.path}
              className={cn(
                "p-5 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all group",
                idx !== conversations.length - 1 && "border-b border-slate-100 dark:border-zinc-800"
              )}
            >
              <div className="size-12 rounded-2xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-primary dark:text-white group-hover:bg-accent-coral group-hover:text-white transition-all transform group-hover:scale-105 duration-300">
                <span className="material-symbols-outlined">{conv.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black truncate group-hover:text-accent-coral transition-colors">{conv.title}</p>
                <p className="text-[10px] text-slate-500 font-bold tracking-tight uppercase tracking-wider">{conv.subtitle}</p>
              </div>
              <span className="text-[10px] text-slate-400 font-black whitespace-nowrap bg-slate-50 dark:bg-zinc-800 px-2.5 py-1 rounded-full">{conv.time}</span>
              <span className="material-symbols-outlined text-sm text-slate-300 group-hover:text-accent-coral transition-colors">arrow_forward_ios</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
