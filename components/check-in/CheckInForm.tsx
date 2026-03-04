"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import MoodSelector from "./MoodSelector"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"

export default function CheckInForm() {
  const [mood, setMood] = useState(3)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [input, setInput] = useState("")

  const { messages, status, sendMessage } = useChat({
    api: "/api/ai/checkin",
    messages: [] // Ensure explicit empty array for initial state
  } as any) // Use 'as any' temporarily if linting still struggles with the complex ChatInit union

  const aiMessage = messages.find((m: any) => m.role === "assistant")
  
  if (!isSubmitted && aiMessage) {
    setIsSubmitted(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || status === "streaming") return

    const formData = {
      workedOn: input,
      blockers: (e.currentTarget.elements.namedItem("blockers") as HTMLTextAreaElement).value,
      mood: mood,
      freeText: (e.currentTarget.elements.namedItem("freeText") as HTMLInputElement).value,
    }

    try {
      await sendMessage({ 
        text: JSON.stringify(formData)
      })
      setInput("")
      setError(null)
    } catch (err: any) {
      setError(err.message || "Failed to submit")
    }
  }

  if (isSubmitted && aiMessage) {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-soft animate-in fade-in zoom-in duration-500">
        <div className="flex items-center gap-4 mb-8">
          <div className="size-12 bg-accent-coral/10 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-accent-coral text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 leading-tight">Your Mentor's Response</h3>
            <p className="text-xs text-slate-500 font-medium">Daily reflection completed</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900 prose-strong:font-black pb-8 border-b border-slate-100 mb-8">
          {aiMessage.parts.map((part: any, i: number) => 
            part.type === 'text' ? <ReactMarkdown key={i}>{part.text}</ReactMarkdown> : null
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">See you tomorrow!</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-sm font-black text-accent-coral hover:brightness-110 transition-all flex items-center gap-2"
          >
            Dashboard
            <span className="material-symbols-outlined text-sm font-black">arrow_forward</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-soft">
      <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-accent-coral">edit_note</span>
        Today's Log
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            What did you work on today?
          </label>
          <textarea
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={status === "streaming"}
            className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-accent-coral/20 focus:border-accent-coral transition-all outline-none min-h-[120px]"
            placeholder="e.g. Completed the authentication flow using NextAuth..."
          />
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            Any blockers or confusion?
          </label>
          <textarea
            name="blockers"
            disabled={status === "streaming"}
            className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-accent-coral/20 focus:border-accent-coral transition-all outline-none min-h-[80px]"
            placeholder="What's holding you back?"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            How are you feeling about your progress?
          </label>
          <MoodSelector value={mood} onChange={setMood} />
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            Anything else on your mind?
          </label>
          <input
            name="freeText"
            disabled={status === "streaming"}
            className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-accent-coral/20 focus:border-accent-coral transition-all outline-none"
            placeholder="Quick notes..."
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
            <span className="material-symbols-outlined text-lg">error</span>
            <p className="text-xs font-bold">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "streaming"}
          className={cn(
            "w-full py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2",
            status === "streaming"
              ? "bg-slate-100 text-slate-400 shadow-none cursor-not-allowed" 
              : "bg-[#1A1A1A] text-white hover:brightness-110 active:scale-[0.98] shadow-[#1A1A1A]/20"
          )}
        >
          {status === "streaming" ? (
            <>
              <div className="size-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              Recording...
            </>
          ) : (
            <>
              Complete Check-in
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
