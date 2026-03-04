"use client"

import { cn } from "@/lib/utils"

interface FocusCardProps {
  week: number
  day: number
  title: string
  description: string
  progress: number
}

export default function FocusCard({ week, day, title, description, progress }: FocusCardProps) {
  // SVG circumference: 2 * PI * r = 2 * 3.14159 * 50 = 314.159
  const circumference = 314.159
  const offset = circumference - (progress / 100) * circumference

  return (
    <section className="mb-8 group">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-slate-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between shadow-soft hover:shadow-xl transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-coral/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-accent-coral/10 transition-all duration-500"></div>
        
        <div className="max-w-md relative z-10 text-center md:text-left mb-6 md:mb-0">
          <span className="inline-block px-3 py-1 bg-accent-coral/10 text-accent-coral text-[10px] font-black rounded-full mb-4 uppercase tracking-widest border border-accent-coral/10">
            WEEK {week}, DAY {day}
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-3 tracking-tight">Today's Focus: {title}</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm leading-relaxed text-sm">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3.5 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/10">
              Continue Learning <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center shrink-0">
          <svg className="size-32 md:size-40 drop-shadow-sm">
            <circle 
              className="text-slate-100 dark:text-zinc-800" 
              cx="50%" cy="50%" fill="transparent" r="50" stroke="currentColor" strokeWidth="12"
            ></circle>
            <circle 
              className="text-accent-coral transition-all duration-700 ease-out" 
              cx="50%" cy="50%" fill="transparent" r="50" stroke="currentColor" strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            ></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl md:text-3xl font-black">{progress}%</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Complete</span>
          </div>
        </div>
      </div>
    </section>
  )
}
