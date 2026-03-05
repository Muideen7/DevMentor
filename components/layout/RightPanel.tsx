"use client"

import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export default function RightPanel() {
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <aside className="hidden xl:flex w-[300px] bg-white dark:bg-zinc-900 border-l border-slate-200 dark:border-zinc-800 fixed right-0 h-screen overflow-y-auto p-6 z-40 flex-col">
      {/* Mentor Card */}
      <div className="mb-8">
        <div className="bg-background-light dark:bg-zinc-800 rounded-2xl p-6 border border-slate-100 dark:border-zinc-700 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white ring-4 ring-white dark:ring-zinc-800">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <div>
              <p className="text-sm font-bold">Your Mentor</p>
              <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 italic mb-4 leading-relaxed">
            "Hey {session?.user?.name?.split(' ')[0]}! You're making great progress with JavaScript. Want to try a quick coding challenge to test your Async knowledge?"
          </p>
          <button className="w-full py-2.5 bg-accent-coral text-white rounded-full text-xs font-bold shadow-lg shadow-accent-coral/20 hover:translate-y-[-2px] transition-all">
            Start Challenge
          </button>
        </div>
      </div>

      {/* Up Next Roadmap */}
      <div className="mb-8">
        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">Up Next</h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="size-2 mt-1.5 rounded-full bg-slate-300 shrink-0"></div>
            <div>
              <p className="text-sm font-bold leading-tight">Error Handling in API</p>
              <p className="text-[10px] text-slate-500 mt-1">Module 3.3 • 15 mins</p>
            </div>
          </div>
          <div className="flex items-start gap-3 opacity-50">
            <div className="size-2 mt-1.5 rounded-full bg-slate-300 shrink-0"></div>
            <div>
              <p className="text-sm font-bold leading-tight">Introduction to Node.js</p>
              <p className="text-[10px] text-slate-500 mt-1">Module 4.1 • 45 mins</p>
            </div>
          </div>
          <div className="flex items-start gap-3 opacity-50">
            <div className="size-2 mt-1.5 rounded-full bg-slate-300 shrink-0"></div>
            <div>
              <p className="text-sm font-bold leading-tight">Building a Simple Server</p>
              <p className="text-[10px] text-slate-500 mt-1">Module 4.2 • 60 mins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Wins */}
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">Community Wins</h4>
        <div className="space-y-4">
          <CommunityWin 
            name="Sarah J." 
            action="earned" 
            item="JS Master Badge" 
            time="1m" 
            image="https://lh3.googleusercontent.com/a/default-user" 
          />
          <CommunityWin 
            name="Mike R." 
            action="reached" 
            item="30-Day Streak" 
            time="5m" 
            image="https://lh3.googleusercontent.com/a/default-user" 
          />
          <CommunityWin 
            name="Leo K." 
            action="completed" 
            item="React Fundamentals" 
            time="12m" 
            image="https://lh3.googleusercontent.com/a/default-user" 
          />
        </div>
      </div>
    </aside>
  )
}

function CommunityWin({ name, action, item, time, image }: { name: string, action: string, item: string, time: string, image: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-8 rounded-full bg-cover bg-center shrink-0 border border-slate-100" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold leading-none truncate">{name} <span className="text-slate-400 font-normal">{action}</span></p>
        <p className="text-[10px] font-bold text-accent-coral mt-1">{item}</p>
      </div>
      <span className="text-[10px] text-slate-400 whitespace-nowrap">{time}</span>
    </div>
  )
}
