"use client"

import { useState, useCallback } from "react"
import type { Roadmap, RoadmapWeek } from "@/types/roadmap"
import PhaseBlock from "./PhaseBlock"
import { cn } from "@/lib/utils"

interface RoadmapTimelineProps {
  initialRoadmap: Roadmap
}

export default function RoadmapTimeline({ initialRoadmap }: RoadmapTimelineProps) {
  const [roadmap, setRoadmap] = useState<Roadmap>(initialRoadmap)
  const [updatingWeekId, setUpdatingWeekId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const handleMarkComplete = useCallback(async (weekId: string) => {
    setUpdatingWeekId(weekId)
    try {
      const res = await fetch(`/api/roadmap/week/${weekId}/complete`, {
        method: 'PATCH',
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update week')
      }

      // Optimistically update the local state with the fresh roadmap from server
      setRoadmap(data.data)
      showToast('Week marked as complete! Keep it up 🎉', 'success')
    } catch (err: any) {
      showToast(err.message || 'Something went wrong. Try again.', 'error')
    } finally {
      setUpdatingWeekId(null)
    }
  }, [])

  // Compute overall progress
  const allWeeks: RoadmapWeek[] = roadmap.phases.flatMap(p => p.weeks)
  const completedCount = allWeeks.filter(w => w.status === 'complete').length
  const progressPercent = roadmap.totalWeeks > 0
    ? Math.round((completedCount / roadmap.totalWeeks) * 100)
    : 0

  const activePhase = roadmap.phases.find(p => p.status === 'active')
  const activeWeek = activePhase?.weeks.find(w => w.status === 'active')

  return (
    <div>
      {/* Overall Progress Banner */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 mb-8 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
              Overall Progress
            </p>
            <p className="text-slate-600 text-sm font-medium">
              {completedCount} of {roadmap.totalWeeks} weeks complete
              {activeWeek && (
                <span className="text-accent-coral font-bold">
                  {" "}· Currently on: {activeWeek.title}
                </span>
              )}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-4xl font-black text-slate-900">{progressPercent}%</span>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Complete</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-coral to-coral-light transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Phase Dots */}
        <div className="flex justify-between mt-3 px-0.5">
          {roadmap.phases.map(phase => (
            <div
              key={phase._id}
              className={cn(
                "text-[9px] font-bold text-center",
                phase.status === 'complete' && "text-accent-coral",
                phase.status === 'active' && "text-accent-coral",
                phase.status === 'locked' && "text-slate-300"
              )}
            >
              P{phase.phaseNumber}
            </div>
          ))}
        </div>
      </div>

      {/* Phase List */}
      <div className="space-y-12">
        {roadmap.phases.map((phase, i) => (
          <PhaseBlock
            key={phase._id}
            phase={phase}
            phaseIndex={i}
            totalPhases={roadmap.phases.length}
            onMarkComplete={handleMarkComplete}
            updatingWeekId={updatingWeekId}
          />
        ))}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-full text-sm font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-4 duration-300",
          toast.type === 'success' && "bg-slate-900 text-white",
          toast.type === 'error' && "bg-red-500 text-white"
        )}>
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
            {toast.type === 'success' ? 'check_circle' : 'error'}
          </span>
          {toast.message}
        </div>
      )}
    </div>
  )
}
