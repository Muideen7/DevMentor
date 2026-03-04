import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

export const authConfig = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ session, token }: any) {
            if (session.user) {
                session.user.id = token.id || token.sub
                session.user.onboardingComplete = token.onboardingComplete
            }
            return session
        },
        async jwt({ token, user, trigger, session }: any) {
            if (user) {
                token.id = user.id
                token.onboardingComplete = user.onboardingComplete
            }

            if (trigger === "update" && session?.user) {
                token.onboardingComplete = session.user.onboardingComplete
            }

            return token
        },
    },
} satisfies NextAuthConfig
