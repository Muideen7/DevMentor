"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import CodeEditor from "@/components/code-review/CodeEditor"
import ReviewResponse from "@/components/code-review/ReviewResponse"
import { useSession } from "next-auth/react"

export default function CodeReviewPage() {
  const { data: session } = useSession()
  const [currentCode, setCurrentCode] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState("typescript")

  const { messages, status, sendMessage, setMessages } = useChat({
    api: "/api/ai/review",
    messages: []
  } as any)

  const handleReview = async (code: string, language: string) => {
    setMessages([])
    setCurrentCode(code)
    setCurrentLanguage(language)
    
    try {
      await sendMessage({ 
        text: `Review this ${language} code:\n\n${code}`
      })
    } catch (err) {
      console.error("Review failed:", err)
    }
  }

  const aiMessage = messages.find((m: any) => m.role === "assistant")
  const aiText = aiMessage?.parts?.map((p: any) => p.type === 'text' ? p.text : '').join('') || ""

  return (
    <div className="max-w-6xl mx-auto pt-4 pb-20 animate-in fade-in duration-700">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
          Code Review
        </h1>
        <p className="text-slate-500 font-medium max-w-2xl">
          Get expert feedback on your code. Our AI mentor analyzes your logic, 
          style, and performance to help you write production-grade software.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <CodeEditor onReview={handleReview} isLoading={status === "streaming"} />
        </div>

        <div className="lg:sticky lg:top-6">
          <ReviewResponse 
            content={aiText} 
            isLoading={status === "streaming"} 
          />
        </div>
      </div>
    </div>
  )
}
