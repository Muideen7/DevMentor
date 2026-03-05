"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface SettingsFormProps {
  user: any
}

const techStacks = [
  "Web Apps", "Mobile Apps", "AI & ML", "Backend & APIs", "Data & Analytics", "Game Dev", "DevOps", "Cybersecurity"
]

const goalOptions = [
  "Become a Full Stack Engineer",
  "Master AI & Machine Learning",
  "UI/UX Prototyping",
  "Cloud Architecture Specialist",
  "Mobile App Developer",
  "Backend Engineer",
]

export default function SettingsForm({ user }: SettingsFormProps) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    goal: user.goal || "",
    currentLevel: user.currentLevel || "Beginner",
    stack: user.stack || [] as string[],
    hoursPerWeek: user.hoursPerWeek || 10,
    plan: user.plan || "free",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const toggleStack = (item: string) => {
    setFormData(prev => ({
      ...prev,
      stack: prev.stack.includes(item) 
        ? prev.stack.filter((s: string) => s !== item) 
        : [...prev.stack, item]
    }))
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      const resp = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: formData.name, 
          goal: formData.goal, 
          currentLevel: formData.currentLevel,
          stack: formData.stack,
          hoursPerWeek: formData.hoursPerWeek
        })
      })

      const data = await resp.json()

      if (data.success) {
        setMessage({ type: 'success', text: 'All settings have been successfully updated!' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update settings.' })
      }
    } catch (err) {
      console.error("Update error:", err)
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you absolutely sure? This will delete all your progress permanently.")) return
    
    setIsSaving(true)
    try {
      const resp = await fetch("/api/user/settings", { method: "DELETE" })
      if (resp.ok) {
        window.location.href = "/signup"
      }
    } catch (err) {
      console.error("Delete error:", err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-12">
      <form onSubmit={handleUpdate} className="space-y-8">
        
        {/* Profile Settings */}
        <section className="bg-white rounded-3xl border border-slate-100 p-10 shadow-soft relative overflow-hidden group">
           <div className="absolute top-0 right-0 size-48 bg-accent-coral/5 rounded-full -translate-y-24 translate-x-12 blur-3xl group-focus-within:bg-accent-coral/10 transition-all duration-500 pointer-events-none" />
           
           <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 relative z-10">
              <span className="material-symbols-outlined text-accent-coral">person</span>
              Profile Settings
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                 <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-accent-coral/10 focus:border-accent-coral/30 outline-none transition-all"
                 />
              </div>
              <div className="flex flex-col gap-2 opacity-50 pointer-events-none grayscale">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address (Primary)</label>
                 <input 
                    type="email" 
                    value={formData.email}
                    disabled
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold cursor-not-allowed"
                 />
              </div>
           </div>
        </section>

        {/* Learning Preferences */}
        <section className="bg-white rounded-3xl border border-slate-100 p-10 shadow-soft relative overflow-hidden group">
           <div className="absolute top-0 right-0 size-48 bg-accent-coral/5 rounded-full -translate-y-24 translate-x-12 blur-3xl group-focus-within:bg-accent-coral/10 transition-all duration-500 pointer-events-none" />
           
           <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 relative z-10">
              <span className="material-symbols-outlined text-accent-coral">explore</span>
              Learning Preferences
           </h3>

           <div className="grid grid-cols-1 gap-8 relative z-10">
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Goal</label>
                 <select 
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-accent-coral/10 focus:border-accent-coral/30 outline-none transition-all appearance-none"
                 >
                    <option value="">Select your goal...</option>
                    {goalOptions.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                 </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Skill Level</label>
                    <div className="flex gap-2 p-1 bg-slate-100/50 rounded-full border border-slate-200">
                       {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                          <button
                             key={level}
                             type="button"
                             onClick={() => setFormData({ ...formData, currentLevel: level })}
                             className={cn(
                                "flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all",
                                formData.currentLevel === level ? "bg-white text-accent-coral shadow-md" : "text-slate-500 hover:text-slate-800"
                             )}
                          >
                             {level}
                          </button>
                       ))}
                    </div>
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Learning Commitment</label>
                    <select
                      value={formData.hoursPerWeek}
                      onChange={(e) => setFormData({ ...formData, hoursPerWeek: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-accent-coral/10 focus:border-accent-coral/30 outline-none transition-all appearance-none"
                    >
                       <option value={5}>5-10 hours / week</option>
                       <option value={10}>10-20 hours / week</option>
                       <option value={20}>20+ hours / week</option>
                    </select>
                 </div>
              </div>
           </div>
        </section>

        {/* Tech Stack */}
        <section className="bg-white rounded-3xl border border-slate-100 p-10 shadow-soft relative overflow-hidden group">
           <div className="absolute top-0 right-0 size-48 bg-accent-coral/5 rounded-full -translate-y-24 translate-x-12 blur-3xl group-focus-within:bg-accent-coral/10 transition-all duration-500 pointer-events-none" />

           <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 relative z-10">
              <span className="material-symbols-outlined text-accent-coral">code</span>
              Tech Interests
           </h3>

           <div className="flex flex-wrap gap-3 relative z-10">
             {techStacks.map(item => (
               <button
                 key={item}
                 type="button"
                 onClick={() => toggleStack(item)}
                 className={cn(
                   "px-5 py-2.5 rounded-full border text-sm font-semibold transition-all",
                   formData.stack.includes(item)
                     ? "border-accent-coral bg-coral-tint text-accent-coral shadow-sm"
                     : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300"
                 )}
               >
                 {formData.stack.includes(item) && (
                   <span className="material-symbols-outlined text-xs mr-1 align-middle">check</span>
                 )}
                 {item}
               </button>
             ))}
           </div>
        </section>

        {/* Roadmap Actions */}
        <section className="bg-white rounded-3xl border border-slate-100 p-10 shadow-soft relative overflow-hidden group">
          <div className="absolute top-0 right-0 size-48 bg-accent-coral/5 rounded-full -translate-y-24 translate-x-12 blur-3xl transition-all duration-500 pointer-events-none" />

          <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3 relative z-10">
            <span className="material-symbols-outlined text-accent-coral">route</span>
            My Roadmap
          </h3>
          <p className="text-sm text-slate-500 font-medium mb-6 relative z-10 max-w-md">
            Changed your goals or tech stack? Regenerate your roadmap to get a brand new, personalized curriculum.
          </p>
          <Link
            href="/onboarding/step-1"
            className="relative z-10 inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/10"
          >
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            Regenerate Roadmap
          </Link>
        </section>

        {/* Current Plan */}
        <section className="bg-white rounded-3xl border border-slate-100 p-10 shadow-soft">
          <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-accent-coral">workspace_premium</span>
            Current Plan
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold capitalize">{formData.plan} Tier</p>
              <p className="text-[10px] text-slate-500 font-medium">
                {formData.plan === 'free' ? "10 AI messages/day · 5 code reviews/month" : "Unlimited access to all features"}
              </p>
            </div>
            <Link
              href="/billing"
              className="px-6 py-3 bg-accent-coral text-white rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-accent-coral/10"
            >
              {formData.plan === 'free' ? "Upgrade" : "Manage Plan"}
            </Link>
          </div>
        </section>

        {/* Global Action Bar */}
        <div className="flex items-center justify-between sticky bottom-8 p-4 bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl shadow-2xl z-50">
           <div className="px-6">
              {message && (
                <p className={cn(
                  "text-xs font-black uppercase tracking-widest animate-in slide-in-from-left-4 duration-500 flex items-center gap-2",
                  message.type === 'success' ? "text-emerald-500" : "text-rose-500"
                )}>
                  <span className="material-symbols-outlined text-sm font-bold">{message.type === 'success' ? 'check_circle' : 'error'}</span>
                  {message.text}
                </p>
              )}
           </div>
           
           <button 
              type="submit"
              disabled={isSaving}
              className={cn(
                 "px-12 py-4 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-slate-900/20",
                 isSaving && "opacity-50 grayscale pointer-events-none"
              )}
           >
              {isSaving ? "Saving..." : "Save Changes"}
           </button>
        </div>
      </form>
      
      {/* Danger Zone */}
      <section className="bg-rose-50/50 rounded-3xl border border-rose-100 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
         <div>
            <h3 className="text-xl font-black text-rose-900 mb-2">Danger Zone</h3>
            <p className="text-sm text-rose-700/60 font-medium">Permanently delete your account and all learning progress. This cannot be undone.</p>
         </div>
         <button 
           onClick={handleDelete}
           disabled={isSaving}
           className="px-8 py-3.5 bg-rose-500 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-rose-600 transition-colors shadow-xl shadow-rose-500/10 shrink-0 disabled:opacity-50"
         >
            Delete Account
         </button>
      </section>

    </div>
  )
}
