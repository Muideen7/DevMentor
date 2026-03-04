"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ConceptQuizProps {
  question: string
  options: string[]
  correctIndex: number
}

export default function ConceptQuiz({ question, options, correctIndex }: ConceptQuizProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const isCorrect = selectedIndex === correctIndex

  return (
    <section className="bg-white rounded-3xl border-4 border-accent-coral/20 p-10 shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-6 flex flex-col items-end">
        <span className="material-symbols-outlined text-4xl text-accent-coral/10 group-hover:text-accent-coral/20 transition-all font-black">quiz</span>
      </div>
      
      <div className="relative z-10 max-w-2xl">
        <h3 className="text-[10px] font-black text-slate-400 border border-slate-100 px-3 py-1 rounded-full w-fit uppercase tracking-widest mb-6 leading-none">
          Knowledge Check
        </h3>
        <h4 className="text-2xl font-black text-slate-900 leading-tight mb-8">
          {question}
        </h4>
        
        <div className="space-y-4 mb-8">
          {options.map((option, i) => {
            const isSelected = selectedIndex === i
            const showSuccess = isSubmitted && i === correctIndex
            const showError = isSubmitted && isSelected && !isCorrect

            return (
              <button
                key={i}
                disabled={isSubmitted}
                onClick={() => setSelectedIndex(i)}
                className={cn(
                  "w-full p-6 rounded-2xl border-2 text-left font-black text-sm tracking-tight transition-all duration-300 flex items-center justify-between group/option",
                  isSelected ? "bg-white border-accent-coral shadow-lg shadow-accent-coral/10 scale-[1.01]" : "bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50",
                  showSuccess && "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-emerald-500/10",
                  showError && "bg-rose-50 border-rose-500 text-rose-700 shadow-rose-500/10",
                  isSubmitted && !isSelected && !showSuccess && "opacity-40 grayscale pointer-events-none"
                )}
              >
                <span>{option}</span>
                {isSubmitted && i === correctIndex && (
                  <span className="material-symbols-outlined text-xl text-emerald-500 animate-in zoom-in duration-300" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                )}
                {isSubmitted && isSelected && !isCorrect && (
                   <span className="material-symbols-outlined text-xl text-rose-500 animate-in zoom-in duration-300" style={{ fontVariationSettings: "'FILL' 1" }}>
                    cancel
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSubmitted(true)}
            disabled={selectedIndex === null || isSubmitted}
            className={cn(
               "px-10 py-4 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10",
               (selectedIndex === null || isSubmitted) && "opacity-50 cursor-not-allowed grayscale pointer-events-none"
            )}
          >
            Check Mastery
          </button>
          {isSubmitted && (
             <div className="animate-in slide-in-from-left-4 duration-500 flex items-center gap-3">
               <div className={cn(
                 "size-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20",
                 isCorrect ? "bg-emerald-500" : "bg-rose-500"
               )}>
                 <span className="material-symbols-outlined text-lg font-black">{isCorrect ? 'celebration' : 'sentiment_dissatisfied'}</span>
               </div>
               <p className={cn(
                 "text-sm font-black uppercase tracking-tight",
                 isCorrect ? "text-emerald-600" : "text-rose-600"
               )}>
                 {isCorrect ? "Mastered! Your progress has been updated" : "Not quite. Think about the event loop context."}
               </p>
             </div>
          )}
        </div>
      </div>
    </section>
  )
}
