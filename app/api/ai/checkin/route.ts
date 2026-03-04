import { streamText, createUIMessageStreamResponse } from 'ai'
import { mentorModel } from '@/lib/ai/client'
import { auth } from '@/lib/auth'
import { buildMentorContext } from '@/lib/ai/context'
import { checkInPrompt } from '@/lib/ai/prompts/check-in'
import { connectDB } from '@/lib/db/mongoose'
import CheckIn from '@/lib/db/models/CheckIn'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ success: false, error: 'Unauthorized', code: 401 }, { status: 401 })
        }

        const { messages } = await req.json()
        const lastMessage = messages[messages.length - 1]

        const textContent = lastMessage.text || ""

        let formData: any = {}
        try {
            formData = JSON.parse(textContent)
        } catch (e) {
            return NextResponse.json({ success: false, error: 'Invalid data format', code: 400 }, { status: 400 })
        }

        const { workedOn, blockers, mood, freeText } = formData

        await connectDB()

        // Rate limit: One check-in per day
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const existingCheckIn = await CheckIn.findOne({
            userId: session.user.id,
            createdAt: { $gte: today }
        })

        if (existingCheckIn) {
            return NextResponse.json({
                success: false,
                error: 'You have already submitted a check-in for today.',
                code: 400
            }, { status: 400 })
        }

        const context = await buildMentorContext(session.user.id)

        const result = await streamText({
            model: mentorModel,
            system: checkInPrompt
                .replace('{context}', context)
                .replace('{workedOn}', workedOn)
                .replace('{blockers}', blockers || 'None reported')
                .replace('{mood}', mood.toString())
                .replace('{freeText}', freeText || 'None'),
            messages: [],
            onFinish: async ({ text }) => {
                const lastCheckIn = await CheckIn.findOne({ userId: session.user.id }).sort({ createdAt: -1 })

                let streakDay = 1
                if (lastCheckIn) {
                    const yesterday = new Date()
                    yesterday.setDate(yesterday.getDate() - 1)
                    yesterday.setHours(0, 0, 0, 0)

                    if (new Date(lastCheckIn.createdAt) >= yesterday) {
                        streakDay = lastCheckIn.streakDay + 1
                    }
                }

                await CheckIn.create({
                    userId: session.user.id,
                    workedOn,
                    blockers,
                    mood,
                    freeText,
                    aiResponse: text,
                    streakDay
                })
            }
        })

        return createUIMessageStreamResponse({
            stream: result.toUIMessageStream()
        })
    } catch (error) {
        console.error('Check-in error:', error)
        return NextResponse.json({ success: false, error: 'Internal server error', code: 500 }, { status: 500 })
    }
}
