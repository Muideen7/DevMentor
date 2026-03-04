"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useChat } from "@ai-sdk/react"

interface SettingsFormProps {
  user: any
}

export default function SettingsForm({ user }: SettingsFormProps) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    goal: user.goal || "",
    currentLevel: user.currentLevel || "Beginner",
    plan: user.plan || "Free",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    // Simulate API call for saving settings
    setTimeout(() => {
      setIsSaving(false)
      setMessage({ type: 'success', text: 'All settings have been successfully updated!' })
    }, 1500)
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
                    <option>Become a Full Stack Engineer</option>
                    <option>Master AI & Machine Learning</option>
                    <option>UI/UX Pro Totyping</option>
                    <option>Cloud Architecture Specialist</option>
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
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-accent-coral/10 focus:border-accent-coral/30 outline-none transition-all appearance-none">
                       <option>5-10 hours / week</option>
                       <option>10-20 hours / week</option>
                       <option>20+ hours / week</option>
                    </select>
                 </div>
              </div>
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
         <button className="px-8 py-3.5 bg-rose-500 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-rose-600 transition-colors shadow-xl shadow-rose-500/10 shrink-0">
            Delete Account
         </button>
      </section>

    </div>
  )
}
