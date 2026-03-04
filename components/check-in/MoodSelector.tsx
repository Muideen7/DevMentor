"use client"

import { cn } from "@/lib/utils"

interface MoodSelectorProps {
  value: number
  onChange: (value: number) => void
}

const moods = [
  { value: 1, label: "Struggling", icon: "sentiment_very_dissatisfied", color: "text-red-500" },
  { value: 2, label: "Tired", icon: "sentiment_dissatisfied", color: "text-orange-400" },
  { value: 3, label: "Neutral", icon: "sentiment_neutral", color: "text-slate-400" },
  { value: 4, label: "Progressing", icon: "sentiment_satisfied", color: "text-blue-400" },
  { value: 5, label: "Inspired", icon: "sentiment_very_satisfied", color: "text-accent-coral" },
]

export default function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="flex justify-between gap-2 bg-slate-50/50 p-2 rounded-2xl border border-slate-100">
      {moods.map((mood) => (
        <button
          key={mood.value}
          type="button"
          onClick={() => onChange(mood.value)}
          className={cn(
            "flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all duration-300",
            value === mood.value 
              ? "bg-white shadow-sm ring-1 ring-slate-100 scale-105" 
              : "hover:bg-white/50 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
          )}
        >
          <span className={cn(
            "material-symbols-outlined text-2xl",
            value === mood.value ? mood.color : "text-slate-400"
          )} style={{ fontVariationSettings: value === mood.value ? "'FILL' 1" : "'FILL' 0" }}>
            {mood.icon}
          </span>
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-wider",
            value === mood.value ? "text-slate-900" : "text-slate-400"
          )}>
            {mood.label}
          </span>
        </button>
      ))}
    </div>
  )
}
