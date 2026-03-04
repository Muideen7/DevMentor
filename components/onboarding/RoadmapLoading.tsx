"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function RoadmapLoading() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(0)

  const steps = [
    { id: 1, text: "Analyzing your goals...", icon: "psychology" },
    { id: 2, text: "Structuring learning modules...", icon: "architecture" },
    { id: 3, text: "Curation best-in-class resources...", icon: "library_books" },
    { id: 4, text: "Preparing your personalized mentor experience...", icon: "auto_awesome" },
  ]

  useEffect(() => {
    // Progress interval for the bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return 95
        return prev + Math.random() * 5
      })
    }, 800)

    // Interval to change step text
    const stepInterval = setInterval(() => {
      setStep(prev => (prev < 4 ? prev + 1 : 4))
    }, 3000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[60] bg-background-light dark:bg-background-dark font-display antialiased overflow-hidden flex flex-col items-center justify-center p-6 text-center">
      <div className="relative flex flex-col items-center justify-center max-w-[600px] w-full">
        {/* Animated Icon */}
        <div className="relative flex items-center justify-center mb-12">
          <div className="absolute w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse ring-4 ring-primary/10"></div>
          <div className="relative w-24 h-24 bg-primary flex items-center justify-center rounded-full shadow-lg shadow-primary/30 animate-bounce-slow">
            <span className="material-symbols-outlined text-white text-5xl">auto_awesome</span>
          </div>
        </div>

        <h1 className="text-slate-900 dark:text-slate-100 text-3xl md:text-4xl font-black tracking-tight mb-4">
          Your mentor is building your roadmap...
        </h1>
        
        <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-medium leading-relaxed mb-10 max-w-sm">
          Analyzing your goals, level, and availability to create the perfect path for you.
        </p>

        {/* Progress System */}
        <div className="w-full max-w-sm space-y-4">
          <div className="flex justify-between items-end mb-2">
            <span className="text-primary text-xs font-black uppercase tracking-widest animate-pulse">Processing</span>
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Step {step} of 4</span>
          </div>
          
          <div className="relative h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/50 dark:border-zinc-700">
            <div 
              className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(232,115,106,0.3)]" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex flex-col gap-2 pt-6">
            <div className="flex items-center gap-2 justify-center text-slate-500 dark:text-slate-400 text-sm font-bold italic animate-in fade-in slide-in-from-bottom-2 duration-1000">
              <span className="material-symbols-outlined text-lg">{steps[step-1].icon}</span>
              <span>{steps[step-1].text}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative dots */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center space-x-2">
        {[1, 2, 3].map((dot) => (
          <div 
            key={dot}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-500",
              step === dot ? "bg-primary scale-125" : "bg-primary/20"
            )}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
