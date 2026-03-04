"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"

interface CheckIn {
  _id: string
  date: string
  workedOn: string
  blockers?: string
  mood: number
  freeText?: string
  aiResponse?: string
  streakDay: number
}

const moods = [
  { value: 1, icon: "sentiment_very_dissatisfied", label: "Struggling", color: "text-rose-500 bg-rose-50" },
  { value: 2, icon: "sentiment_dissatisfied", label: "Rough", color: "text-orange-500 bg-orange-50" },
  { value: 3, icon: "sentiment_neutral", label: "Steady", color: "text-amber-500 bg-amber-50" },
  { value: 4, icon: "sentiment_satisfied", label: "Good", color: "text-emerald-500 bg-emerald-50" },
  { value: 5, icon: "sentiment_very_satisfied", label: "Thriving", color: "text-accent-coral bg-accent-coral/10" },
]

export default function CheckInHistory({ checkIns }: { checkIns: CheckIn[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (checkIns.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-soft">
        <span className="material-symbols-outlined text-5xl text-slate-200 mb-4 block">history_edu</span>
        <h3 className="text-xl font-black text-slate-900 mb-2">No check-ins yet</h3>
        <p className="text-slate-500 text-sm">Every long journey starts with a single log. Complete your first today!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {checkIns.map((checkIn) => {
        const moodInfo = moods.find(m => m.value === checkIn.mood) || moods[2]
        const isExpanded = expandedId === checkIn._id

        return (
          <div 
            key={checkIn._id}
            className={cn(
              "bg-white rounded-3xl border border-slate-100 transition-all duration-300 shadow-soft",
              isExpanded ? "ring-2 ring-accent-coral/20 border-accent-coral/30" : "hover:border-slate-200"
            )}
          >
            {/* Header */}
            <button 
              onClick={() => setExpandedId(isExpanded ? null : checkIn._id)}
              className="w-full p-6 flex items-start gap-4 text-left"
            >
              <div className={cn("size-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", moodInfo.color)}>
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {moodInfo.icon}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {new Date(checkIn.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                    <h4 className="font-black text-slate-900 leading-tight truncate">
                      {checkIn.workedOn}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                     <span className="text-[10px] font-black text-orange-500 bg-orange-50 px-2 py-1 rounded-full uppercase tracking-widest">
                      {checkIn.streakDay} Day Streak
                    </span>
                    <span className={cn(
                      "material-symbols-outlined text-slate-300 transition-transform duration-300",
                      isExpanded && "rotate-180"
                    )}>
                      expand_more
                    </span>
                  </div>
                </div>
                {checkIn.blockers && (
                  <p className="text-xs text-rose-500 font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">warning</span>
                    {checkIn.blockers}
                  </p>
                )}
              </div>
            </button>

            {/* AI Response (Expanded) */}
            {isExpanded && checkIn.aiResponse && (
              <div className="px-6 pb-6 pt-0 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="bg-slate-50/50 rounded-2xl p-6 mt-6 border border-slate-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 size-32 bg-accent-coral opacity-5 rounded-full -translate-y-16 translate-x-16 blur-xl" />
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-8 bg-black rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg">
                      <span className="material-symbols-outlined text-sm font-black">smart_toy</span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">Mentor's Perspective</p>
                  </div>

                  <div className="prose prose-slate prose-sm max-w-none prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900 prose-strong:font-black">
                    <ReactMarkdown>{checkIn.aiResponse}</ReactMarkdown>
                  </div>
                </div>
                {checkIn.freeText && (
                  <div className="mt-4 px-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Personal Note</p>
                    <p className="text-xs text-slate-600 font-medium">{checkIn.freeText}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
