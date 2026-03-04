"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Concept {
  _id: string
  title: string
  slug: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedMinutes: number
  masteredCount: number
}

export default function ConceptList({ initialConcepts }: { initialConcepts: Concept[] }) {
  const [search, setSearch] = useState("")

  const filteredConcepts = initialConcepts.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.category.toLowerCase().includes(search.toLowerCase())
  )

  const categories = Array.from(new Set(initialConcepts.map(c => c.category)))

  return (
    <div className="space-y-12">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto md:mx-0 group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-accent-coral transition-colors">
          <span className="material-symbols-outlined text-xl">search</span>
        </div>
        <input
          type="text"
          placeholder="Search by title or language..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-100 rounded-full py-4 pl-14 pr-6 text-sm font-medium tracking-wide shadow-soft focus:outline-none focus:ring-4 focus:ring-accent-coral/10 focus:border-accent-coral/30 transition-all placeholder:text-slate-300"
        />
      </div>

      {/* Grid of Concept Cards grouped by category */}
      <div className="space-y-16">
        {categories.map(category => {
          const categoryConcepts = filteredConcepts.filter(c => c.category === category)
          if (categoryConcepts.length === 0) return null

          return (
            <section key={category}>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest leading-none">
                  {category}
                </h3>
                <div className="h-0.5 flex-1 bg-slate-100/50 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryConcepts.map(concept => (
                  <Link 
                    key={concept._id} 
                    href={`/concepts/${concept.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-soft hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden h-full flex flex-col">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 size-24 bg-accent-coral/5 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:bg-accent-coral/10 transition-all duration-500" />
                      
                      <div className="mb-4 flex items-start justify-between">
                         <span className={cn(
                          "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                          concept.difficulty === 'Beginner' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                          concept.difficulty === 'Intermediate' ? "bg-amber-50 text-amber-600 border-amber-100" :
                          "bg-indigo-50 text-indigo-600 border-indigo-100"
                        )}>
                          {concept.difficulty}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                           <span className="material-symbols-outlined text-xs">schedule</span>
                           {concept.estimatedMinutes}m
                        </div>
                      </div>

                      <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-accent-coral transition-colors leading-tight">
                        {concept.title}
                      </h4>
                      
                      <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-50">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="size-6 rounded-full border-2 border-white bg-slate-100" />
                          ))}
                          <div className="size-6 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[7px] font-black text-white">
                            +{Math.floor(concept.masteredCount/100)}k
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          Mastered <span className="material-symbols-outlined text-xs text-accent-coral">star</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
      
      {filteredConcepts.length === 0 && (
         <div className="py-20 text-center">
            <span className="material-symbols-outlined text-5xl text-slate-200 mb-4 block">manage_search</span>
            <h3 className="text-xl font-black text-slate-900 mb-2">No concepts found for "{search}"</h3>
            <p className="text-slate-500 text-sm">Try searching for a different language or fundamental.</p>
          </div>
      )}
    </div>
  )
}
