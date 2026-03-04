"use client"

import { useState, useCallback, useRef } from "react"
import Link from "next/link"
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
  const activeFocusWeek = activePhase?.weeks.find(w => w.status === 'active')
  const phaseRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const scrollToPhase = (phaseId: string) => {
    phaseRefs.current[phaseId]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
              {activeFocusWeek && (
                <span className="text-accent-coral font-bold">
                  {" "}· Currently on: {activeFocusWeek.title}
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

      {/* Active Week Focus Card */}
      {activeFocusWeek && (
        <div className="bg-slate-900 rounded-3xl p-8 mb-12 text-white relative overflow-hidden shadow-2xl group">
          <div className="absolute top-0 right-0 size-64 bg-accent-coral/20 rounded-full -translate-y-24 translate-x-24 blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-accent-coral text-white text-[10px] font-black uppercase tracking-wider rounded-full flex items-center gap-1">
                  <span className="size-2 bg-white rounded-full animate-pulse" />
                  Your Active Goal
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Phase {activePhase?.phaseNumber} · Week {activeFocusWeek.weekNumber}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-3 group-hover:text-accent-coral transition-colors">
                {activeFocusWeek.title}
              </h2>
              <p className="text-slate-400 text-sm font-medium max-w-md">
                Master the core concepts of this week to unlock the next phase of your journey.
              </p>
            </div>
            
            <Link 
              href={`/roadmap/week/${activeFocusWeek._id}`}
              className="shrink-0 flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Start Focusing
              <span className="material-symbols-outlined text-sm font-black">rocket_launch</span>
            </Link>
          </div>
        </div>
      )}

      {/* Phase Navigation Bar */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-4 scrollbar-none sticky top-0 md:top-4 z-20 bg-background-light/80 backdrop-blur-md py-2 -mx-4 px-4">
        {roadmap.phases.map((phase) => (
          <button
            key={phase._id}
            onClick={() => scrollToPhase(phase._id)}
            className={cn(
              "px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap border-2",
              phase.status === 'active' 
                ? "bg-white border-accent-coral text-accent-coral shadow-lg shadow-accent-coral/10" 
                : "bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600"
            )}
          >
            Phase {phase.phaseNumber}
          </button>
        ))}
      </div>

      {/* Phase List */}
      <div className="space-y-16">
        {roadmap.phases.map((phase, i) => (
          <div key={phase._id} ref={el => { phaseRefs.current[phase._id] = el }}>
            <PhaseBlock
              phase={phase}
              phaseIndex={i}
              totalPhases={roadmap.phases.length}
              onMarkComplete={handleMarkComplete}
              updatingWeekId={updatingWeekId}
            />
          </div>
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
