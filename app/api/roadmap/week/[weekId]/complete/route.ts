import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db/mongoose"
import Roadmap from "@/lib/db/models/Roadmap"

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ weekId: string }> }
) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized", code: 401 },
                { status: 401 }
            )
        }

        const { weekId } = await params

        await connectDB()

        const roadmap = await Roadmap.findOne({ userId: session.user.id })
        if (!roadmap) {
            return NextResponse.json(
                { success: false, error: "Roadmap not found", code: 404 },
                { status: 404 }
            )
        }

        // Find the target week and validate it belongs to this user's roadmap
        let targetPhaseIndex = -1
        let targetWeekIndex = -1

        for (let pi = 0; pi < roadmap.phases.length; pi++) {
            const wi = roadmap.phases[pi].weeks.findIndex(
                (w: any) => w._id.toString() === weekId
            )
            if (wi !== -1) {
                targetPhaseIndex = pi
                targetWeekIndex = wi
                break
            }
        }

        if (targetPhaseIndex === -1 || targetWeekIndex === -1) {
            return NextResponse.json(
                { success: false, error: "Week not found", code: 404 },
                { status: 404 }
            )
        }

        const targetWeek = roadmap.phases[targetPhaseIndex].weeks[targetWeekIndex]

        // Only allow completing an active week
        if (targetWeek.status !== "active") {
            return NextResponse.json(
                { success: false, error: "Only active weeks can be marked complete", code: 400 },
                { status: 400 }
            )
        }

        // Mark target week as complete
        roadmap.phases[targetPhaseIndex].weeks[targetWeekIndex].status = "complete"

        // Find the next week to unlock
        const currentPhase = roadmap.phases[targetPhaseIndex]
        const nextWeekInPhase = currentPhase.weeks[targetWeekIndex + 1]

        if (nextWeekInPhase) {
            // Next week is in same phase — unlock it
            roadmap.phases[targetPhaseIndex].weeks[targetWeekIndex + 1].status = "active"
        } else {
            // All weeks in this phase complete — mark phase complete
            roadmap.phases[targetPhaseIndex].status = "complete"

            // Unlock the next phase and its first week
            const nextPhase = roadmap.phases[targetPhaseIndex + 1]
            if (nextPhase) {
                roadmap.phases[targetPhaseIndex + 1].status = "active"
                if (nextPhase.weeks.length > 0) {
                    roadmap.phases[targetPhaseIndex + 1].weeks[0].status = "active"
                }
            }
        }

        // Advance the current week counter
        roadmap.currentWeek = Math.min(roadmap.currentWeek + 1, roadmap.totalWeeks)
        roadmap.lastUpdated = new Date()

        // Mark the document as modified (needed for nested arrays in Mongoose)
        roadmap.markModified("phases")

        await roadmap.save()

        return NextResponse.json({ success: true, data: roadmap })
    } catch (error: any) {
        console.error("Mark week complete error:", error)
        return NextResponse.json(
            { success: false, error: "Internal server error", code: 500 },
            { status: 500 }
        )
    }
}
