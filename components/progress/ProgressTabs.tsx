"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import CheckInHistory from "./CheckInHistory"
import CodeReviewHistory from "./CodeReviewHistory"

interface ProgressTabsProps {
  checkIns: any[]
  reviews: any[]
}

export default function ProgressTabs({ checkIns, reviews }: ProgressTabsProps) {
  const [activeTab, setActiveTab] = useState<'logs' | 'reviews'>('logs')

  return (
    <div className="w-full">
      {/* Tab Selectors */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100/50 p-1.5 rounded-full border border-slate-200 shadow-sm flex gap-1 transition-all">
          <button
            onClick={() => setActiveTab('logs')}
            className={cn(
              "rounded-full px-8 py-2.5 text-xs font-black uppercase tracking-widest transition-all",
              activeTab === 'logs' 
                ? "bg-white text-accent-coral shadow-md border border-slate-100" 
                : "text-slate-500 hover:text-slate-700 bg-transparent border border-transparent"
            )}
          >
            Daily Logs
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={cn(
              "rounded-full px-8 py-2.5 text-xs font-black uppercase tracking-widest transition-all",
              activeTab === 'reviews' 
                ? "bg-white text-emerald-600 shadow-md border border-slate-100" 
                : "text-slate-500 hover:text-slate-700 bg-transparent border border-transparent"
            )}
          >
            AI Code Reviews
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {activeTab === 'logs' ? (
          <CheckInHistory checkIns={checkIns} />
        ) : (
          <CodeReviewHistory reviews={reviews} />
        )}
      </div>
    </div>
  )
}
