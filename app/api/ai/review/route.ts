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

        // Connect to DB for logging
        await connectDB()

        const result = await streamText({
            model: mentorModel,
            system: "You are a senior software engineer mentor. Provide a concise, helpful code review with specific improvements. Focus on logic, readability, and performance.",
            messages,
            onFinish: async ({ text }) => {
                // Determine language and code from the last message
                const lastMsg = messages[messages.length - 1].text || ""

                await CodeReview.create({
                    userId: session.user.id,
                    code: lastMsg,
                    language: 'unknown', // Simplified for logging
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
