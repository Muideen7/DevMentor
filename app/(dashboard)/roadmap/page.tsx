import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { connectDB } from "@/lib/db/mongoose"
import RoadmapModel from "@/lib/db/models/Roadmap"
import RoadmapTimeline from "@/components/roadmap/RoadmapTimeline"
import type { Roadmap } from "@/types/roadmap"
import Link from "next/link"

export const metadata = {
  title: "My Roadmap | DevMentor AI",
  description: "Your personalized learning roadmap — week by week, phase by phase.",
}

async function getRoadmap(userId: string): Promise<Roadmap | null> {
  await connectDB()
  const roadmap = await RoadmapModel.findOne({ userId }).lean()
  if (!roadmap) return null
  return JSON.parse(JSON.stringify(roadmap)) as Roadmap
}

export default async function RoadmapPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const roadmap = await getRoadmap(session.user.id)

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-700">
      {/* Page Header */}
      <header className="mb-10">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 border-l-[10px] border-accent-coral pl-6 leading-tight">
              My Roadmap
            </h1>
            <p className="text-slate-500 mt-3 text-base font-medium ml-8 leading-relaxed">
              Your personalized path, week by week. Mark weeks done as you go.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors mt-2"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Dashboard
          </Link>
        </div>
      </header>

      {/* No roadmap state */}
      {!roadmap && (
        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-soft">
          <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">
            route
          </span>
          <h2 className="text-xl font-black text-slate-900 mb-2">No roadmap yet</h2>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            It looks like your roadmap hasn't been generated yet. Head back to complete your onboarding.
          </p>
          <Link
            href="/onboarding/step-1"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-coral text-white text-sm font-bold rounded-full shadow-lg shadow-accent-coral/20 hover:brightness-105 transition-all"
          >
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            Generate My Roadmap
          </Link>
        </div>
      )}

      {/* Roadmap Timeline */}
      {roadmap && <RoadmapTimeline initialRoadmap={roadmap} />}
    </div>
  )
}
