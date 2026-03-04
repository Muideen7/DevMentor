import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db/mongoose"
import User from "@/lib/db/models/User"
import Roadmap from "@/lib/db/models/Roadmap"
import { generateText } from "ai"
import { mentorModel } from "@/lib/ai/client"
import { roadmapPrompt } from "@/lib/ai/prompts/roadmap"

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ success: false, error: "Unauthorized", code: 401 }, { status: 401 })
        }

        await connectDB()
        const user = await User.findById(session.user.id)
        if (!user) {
            return NextResponse.json({ success: false, error: "User not found", code: 404 }, { status: 404 })
        }

        // Call AI to generate roadmap
        const { text } = await generateText({
            model: mentorModel,
            prompt: roadmapPrompt
                .replace("{goal}", user.goal)
                .replace("{currentLevel}", user.currentLevel)
                .replace("{stack}", user.stack.join(", "))
                .replace("{hoursPerWeek}", user.hoursPerWeek.toString()),
        })

        // Parse the JSON output from AI
        let roadmapData
        try {
            // Sometimes AI includes markdown markers like ```json even if told not to
            const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim()
            roadmapData = JSON.parse(cleanedText)
        } catch (parseError) {
            console.error("Failed to parse AI roadmap:", text)
            return NextResponse.json({
                success: false,
                error: "Failed to generate a valid roadmap structure. Please try again.",
                code: 500
            }, { status: 500 })
        }

        // Calculate total weeks
        let totalWeeks = 0
        roadmapData.phases.forEach((phase: any) => {
            totalWeeks += phase.weeks.length
        })

        // Save to database
        // We'll update the existing or create a new one
        const roadmap = await Roadmap.findOneAndUpdate(
            { userId: user._id },
            {
                userId: user._id,
                phases: roadmapData.phases,
                totalWeeks: totalWeeks,
                currentWeek: 1, // Start at week 1
                generatedAt: new Date(),
                lastUpdated: new Date()
            },
            { upsert: true, new: true }
        )

        // Mark onboarding complete only after successful roadmap generation
        await User.findByIdAndUpdate(user._id, { onboardingComplete: true })

        return NextResponse.json({
            success: true,
            data: roadmap
        })
    } catch (error: any) {
        console.error("Roadmap generation: CRITICAL ERROR:", error)

        // Detailed error reporting for diagnosing failures in development
        const detailedError = error instanceof Error
            ? `${error.name}: ${error.message}`
            : JSON.stringify(error)

        return NextResponse.json({
            success: false,
            error: detailedError,
            code: 500
        }, { status: 500 })
    }
}
