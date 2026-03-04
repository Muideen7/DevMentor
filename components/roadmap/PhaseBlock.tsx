"use client"

import { cn } from "@/lib/utils"
import type { RoadmapPhase } from "@/types/roadmap"
import WeekCard from "./WeekCard"

interface PhaseBlockProps {
  phase: RoadmapPhase
  phaseIndex: number
  totalPhases: number
  onMarkComplete: (weekId: string) => void
  updatingWeekId: string | null
}

export default function PhaseBlock({
  phase,
  phaseIndex,
  totalPhases,
  onMarkComplete,
  updatingWeekId
}: PhaseBlockProps) {
  const isLocked = phase.status === 'locked'
  const isActive = phase.status === 'active'
  const isComplete = phase.status === 'complete'

  const completedWeeks = phase.weeks.filter(w => w.status === 'complete').length
  const totalWeeks = phase.weeks.length
  const phaseProgress = totalWeeks > 0 ? Math.round((completedWeeks / totalWeeks) * 100) : 0

  return (
    <div className="relative">
      {/* Vertical connector line (not on last phase) */}
      {phaseIndex < totalPhases - 1 && (
        <div className="absolute left-[19px] top-full w-0.5 h-8 bg-gradient-to-b from-slate-200 to-transparent z-0" />
      )}

      {/* Phase Header */}
      <div className={cn(
        "flex items-start gap-4 mb-5",
        isLocked && "opacity-60"
      )}>
        {/* Phase number badge */}
        <div className={cn(
          "size-10 rounded-full flex items-center justify-center shrink-0 font-black text-sm border-2 transition-all",
          isComplete && "bg-accent-coral border-accent-coral text-white",
          isActive && "bg-white border-accent-coral text-accent-coral shadow-lg shadow-accent-coral/20",
          isLocked && "bg-slate-100 border-slate-200 text-slate-400"
        )}>
          {isComplete ? (
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              check
            </span>
          ) : (
            phase.phaseNumber
          )}
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={cn(
              "font-black text-base leading-tight",
              isLocked ? "text-slate-400" : "text-slate-900"
            )}>
              {phase.title}
            </h3>
            {isActive && (
              <span className="px-2 py-0.5 bg-accent-coral text-white text-[10px] font-bold rounded-full">
                In Progress
              </span>
            )}
            {isComplete && (
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100">
                Completed
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] text-slate-400 font-bold">
              {completedWeeks}/{totalWeeks} weeks
            </span>
            {!isLocked && (
              <div className="flex-1 max-w-[160px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    isComplete ? "bg-emerald-400" : "bg-accent-coral"
                  )}
                  style={{ width: `${phaseProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Week Cards */}
      <div className={cn(
        "ml-14 space-y-3",
        isLocked && "pointer-events-none"
      )}>
        {phase.weeks.map(week => (
          <WeekCard
            key={week._id}
            week={week}
            phaseId={phase._id}
            onMarkComplete={onMarkComplete}
            isUpdating={updatingWeekId === week._id}
          />
        ))}
      </div>
    </div>
  )
}
