import { auth } from "@/lib/auth"
import { mentorModel } from "@/lib/ai/client"
import { streamText, createUIMessageStreamResponse } from "ai"
import { connectDB } from "@/lib/db/mongoose"
import Conversation from "@/lib/db/models/Conversation"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { messages } = await req.json()

        await connectDB()

        const result = await streamText({
            model: mentorModel,
            system: `You are DevMentor AI, a helpful senior software engineer mentor.
      Your goal is to guide the user through their coding journey.
      Be encouraging, provides clear explanations, and help with debugging.
      Keep responses relatively concise for a chat interface.`,
            messages,
            onFinish: async ({ text }) => {
                // Log to DB
                await Conversation.create({
                    userId: session.user.id,
                    title: messages[0]?.content?.slice(0, 50) || "New Conversation",
                    type: "chat",
                    messages: [...messages, { role: "assistant", content: text }]
                })
            }
        })

        return createUIMessageStreamResponse({
            stream: result.toUIMessageStream()
        })
    } catch (error) {
        console.error("Chat error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
