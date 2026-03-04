"use client"

import { useMemo } from "react"

interface GreetingHeaderProps {
  firstName: string
  activeWeekTitle: string | null
}

function getGreeting(): { word: string; emoji: string } {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return { word: "Good morning", emoji: "👋" }
  if (hour >= 12 && hour < 17) return { word: "Good afternoon", emoji: "👋" }
  if (hour >= 17 && hour < 21) return { word: "Good evening", emoji: "👋" }
  return { word: "Welcome back", emoji: "👋" }
}

export default function GreetingHeader({ firstName, activeWeekTitle }: GreetingHeaderProps) {
  // Computed once on mount — no hydration mismatch risk since it's a client component
  const { word, emoji } = useMemo(() => getGreeting(), [])

  return (
    <header className="mb-8">
      <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
        {word}, {firstName} {emoji}
      </h1>
      <p className="text-slate-500 mt-2 text-base font-medium leading-relaxed">
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
