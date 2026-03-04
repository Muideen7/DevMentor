"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface MarkCompleteButtonProps {
  weekId: string
  initialStatus: string
}

export default function MarkCompleteButton({ weekId, initialStatus }: MarkCompleteButtonProps) {
  const [status, setStatus] = useState(initialStatus)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleComplete = async () => {
    if (status !== 'active' || loading) return
    
    setLoading(true)
    try {
      const res = await fetch(`/api/roadmap/week/${weekId}/complete`, {
        method: 'PATCH',
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('complete')
        router.refresh()
      } else {
        alert(data.error || "Failed to update week")
      }
    } catch (err) {
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (status === 'complete') {
    return (
      <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-center animate-in zoom-in duration-300">
        <span className="material-symbols-outlined text-emerald-500 text-3xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
        <p className="text-sm font-black text-emerald-600 uppercase tracking-tight">Week Completed!</p>
      </div>
    )
  }

  if (status === 'locked') {
    return (
      <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center opacity-60">
        <span className="material-symbols-outlined text-slate-300 text-3xl mb-2 font-light">lock</span>
        <p className="text-sm font-black text-slate-400 uppercase tracking-tight">Locked</p>
      </div>
    )
  }

  return (
    <button 
      onClick={handleComplete}
      disabled={loading}
      className={cn(
        "w-full py-4 bg-[#1A1A1A] text-white rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2",
        loading && "opacity-50 cursor-not-allowed"
      )}
    >
      {loading ? (
        <span className="animate-spin material-symbols-outlined text-sm">sync</span>
      ) : (
        <span className="material-symbols-outlined text-sm">check_circle</span>
      )}
      {loading ? "Updating..." : "Complete Week"}
    </button>
  )
}
