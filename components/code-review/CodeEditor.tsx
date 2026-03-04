"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface CodeEditorProps {
  onReview: (code: string, language: string) => void
  isLoading: boolean
}

const languages = [
  { id: "typescript", name: "TypeScript" },
  { id: "javascript", name: "JavaScript" },
  { id: "python", name: "Python" },
  { id: "htmlcss", name: "HTML/CSS" },
  { id: "other", name: "Other" },
]

export default function CodeEditor({ onReview, isLoading }: CodeEditorProps) {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("typescript")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim() || isLoading) return
    onReview(code, language)
  }

  return (
    <div className="bg-[#1A1A1A] rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
      <div className="bg-white/5 border-b border-white/5 p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setLanguage(lang.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all",
                language === lang.id 
                  ? "bg-accent-coral text-white shadow-lg shadow-accent-coral/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              {lang.name}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-full bg-[#FF5F56]" />
          <div className="size-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="size-2.5 rounded-full bg-[#27C93F]" />
        </div>
      </div>
      
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Paste your code here..."
          spellCheck={false}
          className="w-full h-[400px] bg-transparent text-[#CDD6F4] p-8 font-mono text-sm outline-none resize-none placeholder:text-slate-600 leading-relaxed"
        />
        
        <div className="absolute bottom-6 right-6">
          <button
            onClick={handleSubmit}
            disabled={!code.trim() || isLoading}
            className={cn(
              "px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3",
              !code.trim() || isLoading
                ? "bg-white/5 text-slate-500 cursor-not-allowed"
                : "bg-accent-coral text-white hover:brightness-110 active:scale-95 shadow-xl shadow-accent-coral/20"
            )}
          >
            {isLoading ? "Analyzing..." : "Get Review"}
            <span className="material-symbols-outlined text-sm font-black">bolt</span>
          </button>
        </div>
      </div>
    </div>
  )
}
