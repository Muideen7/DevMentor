"use client"

import Link from "next/link"

interface FocusCardProps {
  week: number
  title: string
  description: string
  progress: number
  /** true when a real roadmap exists, false when onboarding is incomplete */
  hasRoadmap: boolean
  /** /dashboard/roadmap when roadmap exists, /onboarding/step-1 otherwise */
  continuePath: string
}

export default function FocusCard({
  week,
  title,
  description,
  progress,
  hasRoadmap,
  continuePath,
}: FocusCardProps) {
  // SVG ring — r=50, circumference = 2π × 50 ≈ 314.159
  const circumference = 314.159
  const offset = circumference - (progress / 100) * circumference

  return (
    <section className="mb-8 group">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 flex flex-col md:flex-row items-center justify-between shadow-soft hover:shadow-xl transition-all duration-300 relative overflow-hidden">
        {/* Decorative blur blob */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent-coral/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-accent-coral/10 transition-all duration-500 pointer-events-none" />

        {/* Left — text content */}
        <div className="max-w-md relative z-10 text-center md:text-left mb-8 md:mb-0">
          {hasRoadmap ? (
            <span className="inline-block px-3 py-1 bg-accent-coral/10 text-accent-coral text-[10px] font-black rounded-full mb-4 uppercase tracking-widest border border-accent-coral/10">
              Week {week} · In Progress
            </span>
          ) : (
            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-full mb-4 uppercase tracking-widest border border-slate-200">
              No Roadmap Yet
            </span>
          )}

          <h2 className="text-2xl md:text-3xl font-black mb-3 tracking-tight leading-snug">
            {hasRoadmap ? (
              <>Today&apos;s Focus: {title}</>
            ) : (
              title
            )}
          </h2>

          <p className="text-slate-500 mb-8 max-w-sm leading-relaxed text-sm">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={continuePath}
              className="px-8 py-3.5 bg-primary text-white rounded-full font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/10"
            >
              {hasRoadmap ? (
                <>
                  Continue Learning
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  Generate My Roadmap
                </>
              )}
            </Link>

            {hasRoadmap && (
              <Link
                href="/dashboard/roadmap"
                className="px-6 py-3.5 bg-slate-50 text-slate-700 border border-slate-200 rounded-full font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
              >
                <span className="material-symbols-outlined text-sm">map</span>
                View Full Roadmap
              </Link>
            )}
          </div>
        </div>

        {/* Right — progress ring */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="size-32 md:size-44 drop-shadow-sm -rotate-90">
            {/* Track */}
            <circle
              cx="50%"
              cy="50%"
              fill="transparent"
              r="50"
              stroke="currentColor"
              strokeWidth="12"
              className="text-slate-100"
            />
            {/* Progress */}
            <circle
              cx="50%"
              cy="50%"
              fill="transparent"
              r="50"
              stroke="currentColor"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="text-accent-coral transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl md:text-3xl font-black">{progress}%</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">
              {hasRoadmap ? "Complete" : "Start"}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
