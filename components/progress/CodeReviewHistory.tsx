"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"

interface CodeReview {
  _id: string
  language: string
  originalCode: string
  issue: string
  explanation: string
  fixedCode: string
  concept: string
  createdAt: string
}

export default function CodeReviewHistory({ reviews }: { reviews: CodeReview[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-soft">
        <span className="material-symbols-outlined text-5xl text-slate-200 mb-4 block">code_off</span>
        <h3 className="text-xl font-black text-slate-900 mb-2">No reviews yet</h3>
        <p className="text-slate-500 text-sm">Ask your mentor to review your code to start building your mastery path.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => {
        const isExpanded = expandedId === review._id

        return (
          <div 
            key={review._id}
            className={cn(
              "bg-white rounded-3xl border border-slate-100 transition-all duration-300 shadow-soft",
              isExpanded ? "ring-2 ring-emerald-500/20 border-emerald-500/30" : "hover:border-slate-200"
            )}
          >
            {/* Header */}
            <button 
              onClick={() => setExpandedId(isExpanded ? null : review._id)}
              className="w-full p-6 flex items-start gap-4 text-left"
            >
              <div className="size-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {new Date(review.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                    <h4 className="font-black text-slate-900 leading-tight truncate">
                      {review.issue || "Optimizing Logic"}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-widest border border-emerald-100/50">
                      {review.language}
                    </span>
                    <span className={cn(
                      "material-symbols-outlined text-slate-300 transition-transform duration-300",
                      isExpanded && "rotate-180"
                    )}>
                      expand_more
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">auto_fix_high</span>
                  {review.concept || "Code Refactoring"}
                </p>
              </div>
            </button>

            {/* AI Review (Expanded) */}
            {isExpanded && (
              <div className="px-6 pb-6 pt-0 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  
                  {/* Problem & Explanation */}
                  <div className="space-y-4">
                    <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="size-8 bg-zinc-900 text-white rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg">
                          <span className="material-symbols-outlined text-sm font-black">psychology</span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">Mentor's Thought</p>
                      </div>
                      <div className="prose prose-slate prose-sm max-w-none prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900 prose-strong:font-black">
                        <ReactMarkdown>{review.explanation}</ReactMarkdown>
                      </div>
                    </div>
                  </div>

                  {/* Code View */}
                  <div className="space-y-4">
                  <div className="bg-[#1A1A1A] rounded-2xl p-6 h-full relative overflow-hidden group">
                    <div className="absolute top-0 right-0 size-32 bg-emerald-500 opacity-10 rounded-full -translate-y-16 translate-x-16 blur-xl" />
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="size-8 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg">
                        <span className="material-symbols-outlined text-sm font-black text-white">code</span>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Optimized Solution</p>
                    </div>

                    <pre className="text-[11px] font-medium text-slate-300 whitespace-pre-wrap leading-relaxed opacity-90 font-mono">
                      {review.fixedCode || review.originalCode}
                    </pre>

                    <div className="absolute bottom-4 right-4 text-[10px] font-black text-white/20 uppercase tracking-widest pointer-events-none">
                      {review.language}
                    </div>
                  </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
