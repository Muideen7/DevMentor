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
            console.error("Onboarding complete: No user ID in session", session)
            return NextResponse.json({ success: false, error: "Unauthorized: No user ID in session", code: 401 }, { status: 401 })
        }

        const body = await req.json().catch(() => ({}))
        console.log("Onboarding complete: Received body:", body)

        // Parse data
        let validatedData
        try {
            validatedData = OnboardingCompleteSchema.parse(body)
        } catch (zodError: any) {
            console.error("Onboarding complete: Validation failed:", zodError.errors)
            return NextResponse.json({
                success: false,
                error: `Validation error: ${zodError.errors[0]?.message || "Invalid data"}`,
                code: 400
            }, { status: 400 })
        }

        console.log("Onboarding complete: Connecting to DB...")
        await connectDB()

        console.log(`Onboarding complete: Updating user ${session.user.id}...`)
        const updatedUser = await User.findByIdAndUpdate(
            session.user.id,
            {
                goal: validatedData.goal,
                currentLevel: validatedData.currentLevel,
                stack: validatedData.stack,
                hoursPerWeek: validatedData.hoursPerWeek,
                onboardingComplete: true,
            },
            { new: true }
        )

        if (!updatedUser) {
            console.error(`Onboarding complete: User not found with ID ${session.user.id}`)
            return NextResponse.json({ success: false, error: "User profile not found in database", code: 404 }, { status: 404 })
        }

        console.log("Onboarding complete: Success!")
        return NextResponse.json({
            success: true,
            data: {
                id: updatedUser._id,
                onboardingComplete: updatedUser.onboardingComplete
            }
        })
    } catch (error: any) {
        console.error("Onboarding complete: CRITICAL ERROR:", error)

        // Return a detailed error message for better diagnostics
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
