import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db/mongoose"
import User from "@/lib/db/models/User"
import { z } from "zod"

const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = RegisterSchema.parse(body)

    await connectDB()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already in use", code: 400 },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      onboardingComplete: false, // Default for new users
    })

    return NextResponse.json(
      { success: true, data: { id: user._id, email: user.email } },
      { status: 201 }
    )
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0].message, code: 400 },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: "Internal server error", code: 500 },
      { status: 500 }
    )
  }
}
