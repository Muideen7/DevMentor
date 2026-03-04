"use client"

import { useMemo } from "react"

interface GreetingHeaderProps {
  firstName: string
  activeWeekTitle: string | null
}

function getGreeting(): { word: string; emoji: string } {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return { word: "Good morning", emoji: "☀️" }
  if (hour >= 12 && hour < 17) return { word: "Good afternoon", emoji: "🌤️" }
  if (hour >= 17 && hour < 21) return { word: "Good evening", emoji: "🌇" }
  return { word: "Hey", emoji: "🌙" }
}

export default function GreetingHeader({ firstName, activeWeekTitle }: GreetingHeaderProps) {
  // Computed once on mount — no hydration mismatch risk since it's a client component
  const { word, emoji } = useMemo(() => getGreeting(), [])

  return (
    <header className="mb-12">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 border-l-[10px] border-accent-coral pl-6 leading-tight">
        {word}, {firstName} {emoji}
      </h1>
      <p className="text-slate-500 mt-4 text-base md:text-lg font-medium ml-8 leading-relaxed">
        {activeWeekTitle ? (
          <>
            Ready to master{" "}
            <span className="text-primary font-black italic underline decoration-accent-coral/30">
              {activeWeekTitle}
            </span>{" "}
            today?
          </>
        ) : (
          "Start your journey — build your personalised roadmap and let your mentor guide you."
        )}
      </p>
    </header>
  )
}
