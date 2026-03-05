import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db/mongoose"
import User from "@/lib/db/models/User"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { name, goal, currentLevel, stack, hoursPerWeek } = body

        await connectDB()
        const updatedUser = await User.findByIdAndUpdate(
            session.user.id,
            { $set: { name, goal, currentLevel, stack, hoursPerWeek } },
            { new: true }
        )

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true, user: updatedUser })
    } catch (error) {
        console.error("Settings update error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await connectDB()
        // In a real app, you'd also delete roadmaps, checkins, etc.
        await User.findByIdAndDelete(session.user.id)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Account deletion error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
