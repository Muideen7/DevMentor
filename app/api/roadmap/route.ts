import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { googleModel } from '@/lib/ai/client'
import { auth } from '@/lib/auth'
import { connectDB } from '@/lib/db/mongoose'
import Roadmap from '@/lib/db/models/Roadmap'
import User from '@/lib/db/models/User'

// GET — fetch existing roadmap
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized', code: 401 }, { status: 401 })
    }

    await connectDB()
    const roadmap = await Roadmap.findOne({ userId: session.user.id })

    if (!roadmap) {
      return NextResponse.json({ success: false, error: 'Roadmap not found', code: 404 }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: roadmap })
  } catch (error) {
    console.error('Fetch roadmap error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error', code: 500 }, { status: 500 })
  }
}

// POST — generate roadmap using Gemini
export async function POST() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized', code: 401 }, { status: 401 })
    }

    await connectDB()

    const user = await User.findById(session.user.id)
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found', code: 404 }, { status: 404 })
    }

    // Delete any existing roadmap before generating a new one
    await Roadmap.deleteOne({ userId: user._id })

    const { text } = await generateText({
      model: googleModel,
      prompt: `
        You are a senior software engineer and mentor creating a personalized learning roadmap.

        User details:
        - Goal: ${user.goal}
        - Current level: ${user.currentLevel}
        - Preferred stack: ${user.stack?.join(', ') || 'Not specified'}
        - Available hours per week: ${user.hoursPerWeek}

        Generate a realistic, structured learning roadmap as valid JSON only.
        No markdown. No explanation. No code fences. Just the raw JSON object.

        Use exactly this structure:
        {
          "totalWeeks": <number>,
          "phases": [
            {
              "phaseNumber": <number>,
              "title": "<phase title>",
              "status": "active or locked",
              "weeks": [
                {
                  "weekNumber": <number>,
                  "title": "<week topic title>",
                  "topics": ["<topic 1>", "<topic 2>"],
                  "resources": ["<resource name or URL>"],
                  "status": "active or locked",
                  "estimatedHours": <number>
                }
              ]
            }
          ]
        }

        Rules:
        - Phase 1, Week 1 status must be "active". Everything else is "locked".
        - Tailor topics strictly to the user's goal and stack.
        - Keep estimatedHours realistic for their available hours per week.
        - Return ONLY the JSON object. Nothing else.
      `,
    })

    // Strip any accidental markdown fences before parsing
    const cleaned = text.replace(/```json|```/g, '').trim()
    const roadmapData = JSON.parse(cleaned)

    const roadmap = await Roadmap.create({
      userId: user._id,
      ...roadmapData,
      currentWeek: 1,
      generatedAt: new Date(),
      lastUpdated: new Date(),
    })

    // Mark onboarding complete
    await User.findByIdAndUpdate(user._id, { onboardingComplete: true })

    return NextResponse.json({ success: true, data: roadmap })
  } catch (error) {
    console.error('Generate roadmap error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error', code: 500 }, { status: 500 })
  }
}