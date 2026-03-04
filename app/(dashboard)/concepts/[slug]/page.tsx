import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { connectDB } from "@/lib/db/mongoose"
import Concept from "@/lib/db/models/Concept"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import ConceptQuiz from "@/components/concepts/ConceptQuiz"

export default async function ConceptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const { slug } = await params
  await connectDB()
  const concept = await Concept.findOne({ slug }).lean()

  if (!concept) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black text-slate-900 mb-4">Concept not found</h2>
        <Link href="/concepts" className="text-accent-coral font-bold hover:underline underline-offset-4">
          Return to Library
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto pt-4 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-8 overflow-hidden whitespace-nowrap">
        <Link href="/concepts" className="hover:text-accent-coral transition-colors shrink-0">Library</Link>
        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
        <span className="text-slate-900 truncate">{(concept as any).category}</span>
        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
        <span className="text-accent-coral truncate">{(concept as any).title}</span>
      </nav>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-4">
           <span className="px-3 py-1 bg-accent-coral/10 text-accent-coral text-[10px] font-black uppercase tracking-widest rounded-full border border-accent-coral/10 leading-none">
            {(concept as any).difficulty} · {(concept as any).estimatedMinutes}m Read
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
          {(concept as any).title}
        </h1>
        <p className="text-lg text-slate-600 font-medium leading-relaxed italic max-w-2xl px-6 border-l-4 border-slate-100 italic">
          "{(concept as any).intro}"
        </p>
      </header>

      {/* Main Content Sections */}
      <div className="space-y-12">
        
        {/* Mental Model Section */}
        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-soft relative overflow-hidden group">
           <div className="absolute top-0 right-0 size-64 bg-accent-coral/5 rounded-full -translate-y-24 translate-x-24 blur-3xl group-hover:bg-accent-coral/10 transition-all duration-700" />
           
           <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 relative z-10">
            <span className="material-symbols-outlined text-accent-coral relative top-0.5">psychology</span>
            The Mental Model
          </h3>
          <div className="relative z-10">
            <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
              {(concept as any).mentalModel.text}
            </p>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 group/analogy">
              <div className="size-16 bg-white border-2 border-dashed border-accent-coral/20 rounded-full flex items-center justify-center text-accent-coral shrink-0 group-hover/analogy:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl font-black">lightbulb</span>
              </div>
              <p className="text-slate-500 italic text-base font-medium leading-relaxed">
                {(concept as any).mentalModel.analogy}
              </p>
            </div>
          </div>
        </section>

        {/* Code Comparison */}
        <section className="space-y-6">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <span className="material-symbols-outlined text-accent-coral relative top-0.5">code_blocks</span>
            Code Evolution
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* The Old Way */}
            <div className="bg-zinc-900 rounded-3xl p-8 flex flex-col items-start h-full">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                {(concept as any).codeComparison.oldWay.label}
              </p>
              <pre className="text-[11px] font-mono text-slate-400 whitespace-pre leading-relaxed opacity-80 overflow-x-auto w-full scrollbar-none pb-4">
                {(concept as any).codeComparison.oldWay.code}
              </pre>
            </div>
            
            {/* The DevMentor Way */}
            <div className="bg-white rounded-3xl p-8 border-4 border-accent-coral/30 shadow-2xl flex flex-col items-start h-full relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4">
                  <span className="inline-block px-2 py-0.5 bg-accent-coral text-white text-[8px] font-black uppercase tracking-widest rounded-full">New Paradigm</span>
               </div>
               <p className="text-[10px] font-black text-accent-coral uppercase tracking-widest mb-4">
                {(concept as any).codeComparison.newWay.label}
              </p>
              <pre className="text-[11px] font-mono text-slate-900 whitespace-pre leading-relaxed font-bold overflow-x-auto w-full scrollbar-none pb-4">
                {(concept as any).codeComparison.newWay.code}
              </pre>
            </div>
          </div>
        </section>

        {/* Pitfalls */}
        {((concept as any).pitfalls?.length > 0) && (
          <section className="bg-[#1A1A1A] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 size-64 bg-accent-coral opacity-10 rounded-full -translate-y-32 translate-x-32 blur-3xl pointer-events-none" />
            
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3 relative z-10">
              <span className="material-symbols-outlined text-accent-coral relative top-0.5">warning</span>
              Common Pitfalls
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {(concept as any).pitfalls.map((pitfall: any, i: number) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-all">
                  <h4 className="font-black text-white mb-2 flex items-center gap-2 group-hover:text-accent-coral transition-colors">
                    <span className="material-symbols-outlined text-xs">auto_fix_high</span>
                    {pitfall.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{pitfall.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quiz (Client Component) */}
        <ConceptQuiz 
          question={(concept as any).quiz.question} 
          options={(concept as any).quiz.options} 
          correctIndex={(concept as any).quiz.correctIndex} 
        />
        
      </div>
    </div>
  )
}
