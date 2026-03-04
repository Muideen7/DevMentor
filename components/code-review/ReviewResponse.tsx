"use client"

import ReactMarkdown from "react-markdown"
import { cn } from "@/lib/utils"

interface ReviewResponseProps {
  content: string
  isLoading: boolean
}

export default function ReviewResponse({ content, isLoading }: ReviewResponseProps) {
  if (!content && !isLoading) return null

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-soft animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="size-12 bg-accent-coral/10 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined text-accent-coral text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            analytics
          </span>
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900 leading-tight">Review Result</h3>
          <p className="text-xs text-slate-500 font-medium">
            {isLoading ? "Analyzing your code..." : "Feedback ready"}
          </p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none prose-h3:text-lg prose-h3:font-black prose-h3:mt-8 prose-h3:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-accent-coral prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:rounded-2xl prose-pre:p-6 prose-pre:border prose-pre:border-white/10">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      {isLoading && (
        <div className="mt-8 flex items-center justify-center py-10 border-t border-slate-50">
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-1.5">
              <div className="size-2 bg-accent-coral rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="size-2 bg-accent-coral rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="size-2 bg-accent-coral rounded-full animate-bounce" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mentor is thinking...</p>
          </div>
        </div>
      )}
    </div>
  )
}
