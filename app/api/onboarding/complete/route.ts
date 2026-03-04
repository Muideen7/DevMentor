import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db/mongoose"
import User from "@/lib/db/models/User"
import { z } from "zod"

const OnboardingCompleteSchema = z.object({
    goal: z.string().min(1),
    currentLevel: z.string().min(1),
    stack: z.array(z.string()).min(1),
    hoursPerWeek: z.number().min(1),
})

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ success: false, error: "Unauthorized", code: 401 }, { status: 401 })
        }

        const body = await req.json()
        const validatedData = OnboardingCompleteSchema.parse(body)

        await connectDB()

        const updatedUser = await User.findByIdAndUpdate(
            session.user.id,
            {
                ...validatedData,
                onboardingComplete: true,
            },
            { new: true }
        )

        if (!updatedUser) {
            return NextResponse.json({ success: false, error: "User not found", code: 404 }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            data: {
                id: updatedUser._id,
                onboardingComplete: updatedUser.onboardingComplete
            }
        })
    } catch (error: any) {
        console.error("Onboarding complete error:", error)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, error: error.issues[0].message, code: 400 }, { status: 400 })
        }
        return NextResponse.json({ success: false, error: "Internal server error", code: 500 }, { status: 500 })
    }
}
