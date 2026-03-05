import { streamText, createUIMessageStreamResponse } from 'ai'
import { mentorModel } from '@/lib/ai/client'
import { auth } from '@/lib/auth'
import { connectDB } from '@/lib/db/mongoose'
import CodeReview from '@/lib/db/models/CodeReview'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ success: false, error: 'Unauthorized', code: 401 }, { status: 401 })
        }

        const { messages } = await req.json()
        const lastMessage = messages[messages.length - 1]

        // Connect to DB for logging
        await connectDB()

        const result = await streamText({
            model: mentorModel,
            system: `You are a senior software engineer mentor. Your goal is to provide structured, helpful code reviews.
            
            ALWAYS respond following this EXACT format:
            ### 🔍 Issue Found
            [Describe the problem in plain English at the user's skill level]
            
            ### 💡 Why This Happened
            [Explain the underlying concept or computer science principle]
            
            ### ✅ Here's The Fix
            [Provide the corrected code block. Use markdown code blocks with the correct language tag]
            
            Keep the tone professional and encouraging. Focus on logic, readability, and performance.`,
            messages,
            onFinish: async ({ text }) => {
                // Determine language and code from the last message
                const content = lastMessage.content || lastMessage.text || ""
                const langMatch = content.match(/Review this (\w+) code/)
                const language = langMatch ? langMatch[1] : 'unknown'

                // Extract code block if possible, otherwise use whole text
                const codeMatch = content.match(/```(?:\w+)?\n([\s\S]*?)```/)
                const codeToSave = codeMatch ? codeMatch[1] : content

                await CodeReview.create({
                    userId: session.user.id,
                    originalCode: codeToSave,
                    language: language,
                    feedback: text
                })
            }
        })

        return createUIMessageStreamResponse({
            stream: result.toUIMessageStream()
        })
    } catch (error) {
        console.error('Code review error:', error)
        return NextResponse.json({ success: false, error: 'Internal server error', code: 500 }, { status: 500 })
    }
}
