import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db/mongoose"
import User from "@/lib/db/models/User"

// For the adapter, we need a raw client or a way to get one. 
// However, many Next.js 15+ implementations use the standard Mongoose connection for queries 
// and potentially a simple raw client for the adapter if needed.
// For now, let's configure the basics for version 5.

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          await connectDB()
          const user = await User.findOne({ email })
          if (!user || !user.password) return null
          
          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (passwordsMatch) return user
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.onboardingComplete = token.onboardingComplete
      }
      return session
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.sub = user.id
        token.onboardingComplete = user.onboardingComplete
      }
      // If onboarding is completed later, we might need a sync trigger or refresh.
      // For now we just initialize it at login.
      return token
    }
  }
})
