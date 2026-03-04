import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { connectDB } from "@/lib/db/mongoose"
import RoadmapModel from "@/lib/db/models/Roadmap"
import type { Roadmap, RoadmapWeek, RoadmapPhase } from "@/types/roadmap"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import MarkCompleteButton from "@/components/roadmap/MarkCompleteButton"

interface PageProps {
  params: Promise<{ weekId: string }>
}

async function getWeekData(userId: string, weekId: string) {
  await connectDB()
  const roadmap = (await RoadmapModel.findOne({ userId }).lean()) as Roadmap | null
  
  if (!roadmap) return null

  let targetWeek: RoadmapWeek | null = null
  let targetPhase: RoadmapPhase | null = null

  for (const phase of roadmap.phases) {
    const week = phase.weeks.find((w: any) => w._id.toString() === weekId)
    if (week) {
      targetWeek = JSON.parse(JSON.stringify(week))
      targetPhase = JSON.parse(JSON.stringify(phase))
      break
    }
  }

  return targetWeek ? { week: targetWeek, phase: targetPhase } : null
}

export default async function WeekDetailPage({ params }: PageProps) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const { weekId } = await params
  const data = await getWeekData(session.user.id, weekId)

  if (!data) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black text-slate-900 mb-4">Week not found</h2>
        <Link href="/roadmap" className="text-accent-coral font-bold hover:underline">
          Return to Roadmap
        </Link>
      </div>
    )
  }

  const { week, phase } = data

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-8 overflow-hidden whitespace-nowrap">
        <Link href="/roadmap" className="hover:text-accent-coral transition-colors shrink-0">Roadmap</Link>
        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
        <span className="text-slate-900 truncate">{phase?.title}</span>
        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
        <span className="text-accent-coral truncate">Week {week.weekNumber}</span>
      </nav>

      {/* Week Header */}
      <header className="mb-12 relative">
        <div className="absolute -left-12 top-0 bottom-0 w-1.5 bg-accent-coral rounded-full opacity-50 hidden lg:block" />
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
          {week.title}
        </h1>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-sm">schedule</span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 leading-none">Estimate</p>
              <p className="text-sm font-bold text-slate-900">~{week.estimatedHours} Hours</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="size-8 bg-accent-coral rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg shadow-accent-coral/20">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 leading-none">Status</p>
              <p className="text-sm font-bold text-slate-900 capitalize">{week.status}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Topics & Learning Focus */}
          <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-soft">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-accent-coral">school</span>
              Focus Areas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {week.topics.map((topic, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-accent-coral/30 hover:bg-white transition-all group">
                  <div className="size-6 bg-white border border-slate-200 rounded-md flex items-center justify-center text-[10px] font-bold text-slate-400 group-hover:bg-accent-coral group-hover:border-accent-coral group-hover:text-white transition-all">
                    {i + 1}
                  </div>
                  <p className="text-sm font-bold text-slate-700">{topic}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Resources */}
          <section className="bg-[#1A1A1A] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 size-64 bg-accent-coral opacity-10 rounded-full -translate-y-32 translate-x-32 blur-3xl pointer-events-none" />
            
            <h3 className="text-xl font-black mb-6 flex items-center gap-2 relative z-10">
              <span className="material-symbols-outlined text-accent-coral">link</span>
              Learning Resources
            </h3>
            <div className="space-y-3 relative z-10">
              {week.resources.map((resource, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-accent-coral">article</span>
                    <span className="text-sm font-bold text-slate-200">{resource}</span>
                  </div>
                  <span className="material-symbols-outlined text-sm text-slate-500 group-hover:translate-x-1 transition-transform">open_in_new</span>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Actions */}
        <aside className="space-y-6 lg:sticky lg:top-6">
          {/* Action Card */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-soft">
            <p className="text-[10px] font-black text-slate-400 underline decoration-accent-coral/20 uppercase tracking-widest mb-6">Action Plan</p>
            
            <div className="space-y-4">
              <MarkCompleteButton weekId={week._id} initialStatus={week.status} />
              
              {week.status === 'active' && (
                <Link 
                  href="/code-review" 
                  className="w-full py-4 bg-accent-coral/10 text-accent-coral rounded-full font-black text-xs uppercase tracking-widest hover:bg-accent-coral/20 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">code</span>
                  Practice Now
                </Link>
              )}
            </div>
          </div>

          {/* AI Mentor Nudge */}
          <div className="bg-gradient-to-br from-accent-coral to-coral-light rounded-3xl p-8 text-white shadow-xl shadow-accent-coral/20">
            <h4 className="font-black text-lg leading-tight mb-2">Feeling Stuck?</h4>
            <p className="text-xs font-bold text-white/80 mb-6 font-medium leading-relaxed">Your AI mentor is ready to explain these specific topics in simple terms.</p>
            <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
              Chat about this week
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
