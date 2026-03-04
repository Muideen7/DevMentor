import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db/mongoose"
import Roadmap from "@/lib/db/models/Roadmap"

export async function GET() {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ success: false, error: "Unauthorized", code: 401 }, { status: 401 })
        }

        await connectDB()
        const roadmap = await Roadmap.findOne({ userId: session.user.id })

        if (!roadmap) {
            return NextResponse.json({ success: false, error: "Roadmap not found", code: 404 }, { status: 404 })
        }

        return NextResponse.json({ success: true, data: roadmap })
    } catch (error) {
        console.error("Fetch roadmap error:", error)
        return NextResponse.json({ success: false, error: "Internal server error", code: 500 }, { status: 500 })
    }
}
