"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { cn } from "@/lib/utils"

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    api: "/api/ai/chat",
    messages: []
  } as any)

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const isLoading = status === "streaming" || status === "submitted"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    const text = input.trim()
    setInput("")
    await sendMessage({ text })
  }

  return (
    <div className="fixed bottom-8 right-8 xl:right-[332px] z-50 transition-all duration-300">
      
      {/* Pop-up Chat Window */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-zinc-800 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-6 bg-primary dark:bg-black text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-accent-coral rounded-2xl flex items-center justify-center ring-2 ring-white/10 shadow-lg">
                <span className="material-symbols-outlined text-white text-xl">smart_toy</span>
              </div>
              <div>
                <h4 className="text-sm font-black tracking-tight">AI Mentor</h4>
                <p className="text-[10px] text-white/60 font-medium flex items-center gap-1">
                  <span className="size-1.5 bg-green-400 rounded-full animate-pulse" />
                  Online & ready to help
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="size-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth"
          >
            {messages.length === 0 && (
              <div className="text-center py-10">
                <div className="size-16 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl text-slate-300">chat_bubble</span>
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Ask me anything</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {["Explain closures", "Debug my code", "What's React?"].map(q => (
                    <button
                      key={q}
                      onClick={() => { setInput(q) }}
                      className="text-[10px] font-bold px-3 py-1.5 bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-full hover:border-accent-coral hover:text-accent-coral transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((m, idx) => (
              <div 
                key={m.id || idx}
                className={cn(
                  "flex animate-in fade-in slide-in-from-bottom-2 duration-300",
                  m.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {m.role === 'assistant' && (
                  <div className="size-6 bg-accent-coral rounded-lg flex items-center justify-center shrink-0 mr-2 mt-1">
                    <span className="material-symbols-outlined text-white text-xs">smart_toy</span>
                  </div>
                )}
                <div 
                  className={cn(
                    "max-w-[80%] p-4 text-xs font-medium leading-relaxed whitespace-pre-wrap",
                    m.role === 'user' 
                      ? "bg-accent-coral text-white rounded-2xl rounded-tr-none shadow-lg shadow-accent-coral/10" 
                      : "bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 rounded-2xl rounded-tl-none border border-slate-100 dark:border-zinc-700 shadow-sm"
                  )}
                >
                  {m.parts?.map((part: any, i: number) => (
                    <span key={i}>{part.type === 'text' ? part.text : ''}</span>
                  )) || (m as any).content}
                </div>
              </div>
            ))}
            
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start items-start">
                <div className="size-6 bg-accent-coral rounded-lg flex items-center justify-center shrink-0 mr-2 mt-1">
                  <span className="material-symbols-outlined text-white text-xs">smart_toy</span>
                </div>
                <div className="bg-slate-50 dark:bg-zinc-800 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5 items-center">
                  <div className="size-1.5 bg-accent-coral rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="size-1.5 bg-accent-coral rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="size-1.5 bg-accent-coral rounded-full animate-bounce" />
                </div>
              </div>
            )}
            
            {error && (
              <div className="bg-rose-50 text-rose-500 text-[10px] font-bold p-3 rounded-xl border border-rose-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                Failed to reach your mentor. Try again.
              </div>
            )}
          </div>

          {/* Input */}
          <form 
            onSubmit={handleSubmit}
            className="p-4 border-t border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0"
          >
            <div className="relative flex items-center">
              <input 
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-2xl py-4 px-6 pr-14 text-sm font-bold focus:ring-4 focus:ring-accent-coral/10 focus:border-accent-coral/30 outline-none transition-all placeholder:text-slate-400"
                placeholder="How do I center a div?"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 size-10 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-30 transition-all shadow-lg"
              >
                <span className="material-symbols-outlined text-sm font-black">send</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "bg-white dark:bg-zinc-900 rounded-full p-4 shadow-2xl border-4 transition-all group relative",
          isOpen ? "border-primary scale-90" : "border-accent-coral hover:scale-110"
        )}
      >
        {!isOpen && (
          <div className="absolute -top-12 -left-32 bg-white dark:bg-zinc-800 px-4 py-2 rounded-xl text-xs font-bold shadow-lg border border-slate-100 dark:border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300 pointer-events-none whitespace-nowrap">
            How can I help you? ✨
          </div>
        )}
        <span className={cn(
          "material-symbols-outlined text-3xl font-bold transition-all duration-300",
          isOpen ? "text-primary rotate-90" : "text-accent-coral"
        )}>
          {isOpen ? "close" : "smart_toy"}
        </span>
      </button>

    </div>
  )
}
