"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 border-l-4 border-accent-coral pl-4">
          Welcome back, {session?.user?.name?.split(' ')[0] || "Developer"}! 👋
        </h1>
        <p className="text-slate-500 mt-2 text-sm ml-5">Here's your plan for today. You have <span className="text-accent-coral font-bold italic">2 hours</span> scheduled for learning.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Roadmap Progress Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-soft hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-8xl text-accent-coral">map</span>
            </div>
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-coral bg-coral-tint px-3 py-1 rounded-full">Current Phase</span>
              <h2 className="text-2xl font-bold mt-4 mb-2">Frontend Foundations</h2>
              <p className="text-slate-500 mb-8 max-w-sm">Mastering semantic HTML and CSS Grid for responsive layouts.</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-700">Overall Progress</span>
                  <span className="font-black italic text-accent-coral">35%</span>
                </div>
                <div className="w-full h-3 bg-slate-50 rounded-full border border-slate-100 p-0.5">
                  <div 
                    className="h-full bg-accent-coral rounded-full shadow-[0_0_12px_rgba(232,115,106,0.4)] animate-pulse" 
                    style={{ width: "35%" }}
                  ></div>
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <Link href="/dashboard/roadmap" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2 text-sm shadow-md shadow-primary/20">
                  Continue Learning
                  <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                </Link>
                <button className="bg-white border border-slate-200 px-8 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors text-sm">
                  View Roadmap
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft group hover:translate-y-[-4px] transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined font-bold">rate_review</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full uppercase">Recent</span>
              </div>
              <h3 className="font-bold mb-1">Code Review #42</h3>
              <p className="text-xs text-text-body mb-4">"The logic in handleCheckout is solid, but we can improve..."</p>
              <Link href="/dashboard/code-review" className="text-xs font-black italic text-blue-600 hover:underline">Read feedback &rarr;</Link>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft group hover:translate-y-[-4px] transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  <span className="material-symbols-outlined font-bold">event_available</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">Complete</span>
              </div>
              <h3 className="font-bold mb-1">Daily Check-in</h3>
              <p className="text-xs text-text-body mb-4">You've logged your progress for today. Keep it up!</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Focus & Assistant Sidebar */}
        <div className="space-y-8">
          <div className="bg-[#1A1A1A] p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-coral/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <h4 className="font-black text-sm uppercase tracking-widest text-accent-coral mb-6">Daily Focus</h4>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full border-2 border-accent-coral flex-shrink-0 mt-0.5"></div>
                <div>
                  <p className="font-bold text-sm">Finish CSS Grid Layout</p>
                  <p className="text-xs text-white/40">30 mins remaining</p>
                </div>
              </div>
              <div className="flex gap-4 opacity-50 group">
                <div className="w-6 h-6 rounded-full border-2 border-white/20 flex-shrink-0 mt-0.5 group-hover:border-white transition-colors cursor-pointer"></div>
                <div>
                  <p className="font-bold text-sm">Implement Modal Logic</p>
                  <p className="text-xs text-white/40">Not started</p>
                </div>
              </div>
              <div className="flex gap-4 opacity-50 group">
                <div className="w-6 h-6 rounded-full border-2 border-white/20 flex-shrink-0 mt-0.5 group-hover:border-white transition-colors cursor-pointer"></div>
                <div>
                  <p className="font-bold text-sm">Concept: Closures in JS</p>
                  <p className="text-xs text-white/40">Scheduled for 4pm</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-10 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl py-4 font-bold text-sm transition-all">
              Manage Tasks
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent-coral flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xl">psychology</span>
              </div>
              <div>
                <p className="text-sm font-bold">Explain a concept</p>
                <p className="text-[10px] text-slate-400">Ask your mentor anything</p>
              </div>
            </div>
            <div className="relative">
              <input 
                className="w-full bg-background-light border-none rounded-2xl px-4 py-3 text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-accent-coral/20 outline-none" 
                placeholder="What is an API?"
              />
              <button className="absolute right-2 top-2 bg-primary text-white p-1 rounded-lg">
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
