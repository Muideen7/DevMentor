export type WeekStatus = 'locked' | 'active' | 'complete'
export type PhaseStatus = 'locked' | 'active' | 'complete'

export interface RoadmapWeek {
    _id: string
    weekNumber: number
    title: string
    topics: string[]
    resources: string[]
    status: WeekStatus
    estimatedHours: number
}

export interface RoadmapPhase {
    _id: string
    phaseNumber: number
    title: string
    status: PhaseStatus
    weeks: RoadmapWeek[]
}

export interface Roadmap {
    _id: string
    userId: string
    phases: RoadmapPhase[]
    totalWeeks: number
    currentWeek: number
    generatedAt: string
    lastUpdated: string
}
