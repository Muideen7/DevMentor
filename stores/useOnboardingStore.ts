import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OnboardingState {
  goal: string
  currentLevel: string
  stack: string[]
  hoursPerWeek: number
  setGoal: (goal: string) => void
  setLevel: (level: string) => void
  setStack: (stack: string[]) => void
  setHours: (hours: number) => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      goal: '',
      currentLevel: '',
      stack: [],
      hoursPerWeek: 0,
      setGoal: (goal) => set({ goal }),
      setLevel: (currentLevel) => set({ currentLevel }),
      setStack: (stack) => set({ stack }),
      setHours: (hoursPerWeek) => set({ hoursPerWeek }),
      reset: () => set({ goal: '', currentLevel: '', stack: [], hoursPerWeek: 0 }),
    }),
    {
      name: 'devmentor-onboarding',
    }
  )
)
