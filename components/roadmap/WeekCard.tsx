"use client"

import { cn } from "@/lib/utils"
import type { RoadmapWeek } from "@/types/roadmap"
import { useState } from "react"
import Link from "next/link"

interface WeekCardProps {
  week: RoadmapWeek
  phaseId: string
  onMarkComplete: (weekId: string) => void
  isUpdating: boolean
}

export default function WeekCard({ week, phaseId, onMarkComplete, isUpdating }: WeekCardProps) {
  const [expanded, setExpanded] = useState(week.status === 'active')

  const isLocked = week.status === 'locked'
  const isActive = week.status === 'active'
  const isComplete = week.status === 'complete'

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-300",
        isComplete && "bg-white border-slate-100 opacity-80",
        isActive && "bg-white border-accent-coral shadow-lg shadow-accent-coral/10",
        isLocked && "bg-slate-50/60 border-slate-100"
      )}
    >
      {/* Card Header */}
      <button
        className={cn(
          "w-full flex items-center gap-4 p-5 text-left",
          isLocked && "cursor-default"
        )}
        onClick={() => !isLocked && setExpanded(!expanded)}
        disabled={isLocked}
      >
        {/* Status Icon */}
        <div className={cn(
          "size-10 rounded-full shrink-0 flex items-center justify-center border-2 transition-colors",
          isComplete && "bg-accent-coral border-accent-coral",
          isActive && "bg-white border-accent-coral",
          isLocked && "bg-slate-100 border-slate-200"
        )}>
          {isComplete && (
            <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              check
            </span>
          )}
          {isActive && (
            <span className="size-3 rounded-full bg-accent-coral animate-pulse" />
          )}
          {isLocked && (
            <span className="material-symbols-outlined text-slate-300 text-lg">lock</span>
          )}
        </div>

        {/* Week Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn(
              "text-[10px] font-black uppercase tracking-wider",
              isComplete && "text-accent-coral",
              isActive && "text-accent-coral",
              isLocked && "text-slate-400"
            )}>
              Week {week.weekNumber}
            </span>
            {isActive && (
              <span className="px-2 py-0.5 bg-accent-coral/10 text-accent-coral text-[10px] font-bold rounded-full border border-accent-coral/20">
                Current
              </span>
            )}
            {isComplete && (
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100">
                Done
              </span>
            )}
          </div>
          <h4 className={cn(
            "font-bold text-sm mt-0.5 leading-snug",
            isLocked && "text-slate-400"
          )}>
            {week.title}
          </h4>
        </div>

        {/* Hours badge + chevron */}
        <div className="flex items-center gap-3 shrink-0">
          <span className={cn(
            "text-[10px] font-bold hidden sm:block",
            isLocked ? "text-slate-400" : "text-slate-500"
          )}>
            ~{week.estimatedHours}h
          </span>
          {!isLocked && (
            <span className={cn(
              "material-symbols-outlined text-slate-400 text-lg transition-transform duration-300",
              expanded && "rotate-180"
            )}>
              expand_more
            </span>
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && !isLocked && (
        <div className="px-5 pb-5 border-t border-slate-100 mt-0 pt-4 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Topics */}
          {week.topics.length > 0 && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">
                Topics Covered
              </p>
              <div className="flex flex-wrap gap-2">
                {week.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-background-light text-slate-700 text-xs font-semibold rounded-full border border-slate-100"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {week.resources.length > 0 && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">
                Resources
              </p>
              <ul className="space-y-2">
                {week.resources.map((resource, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-accent-coral text-sm mt-0.5 shrink-0">
                      link
                    </span>
                    <span className="text-xs text-slate-600 font-medium leading-relaxed">{resource}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mark Complete CTA */}
          <div className="flex flex-wrap gap-3">
            {isActive && (
              <button
                onClick={() => onMarkComplete(week._id)}
                disabled={isUpdating}
                className="flex items-center gap-2 px-5 py-2.5 bg-accent-coral text-white text-xs font-bold rounded-full hover:brightness-105 active:scale-95 transition-all shadow-md shadow-accent-coral/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                    Updating...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    Mark as Complete
                  </>
                )}
              </button>
            )}
            
            <Link 
              href={`/roadmap/week/${week._id}`}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-white text-xs font-bold rounded-full hover:brightness-125 active:scale-95 transition-all shadow-md shadow-slate-900/10"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              Focus View
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
