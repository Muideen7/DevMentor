import NextAuth from "next-auth"
import { authConfig } from "./lib/auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    const onboardingComplete = (req.auth?.user as any)?.onboardingComplete

    // Define route types
    const isAuthRoute = ["/login", "/signup"].includes(nextUrl.pathname)
    const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard")
    const isOnboardingRoute = nextUrl.pathname.startsWith("/onboarding")

    // 1. If hitting an auth route (login/signup) and already logged in, go to dashboard
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/dashboard", nextUrl))
        }
        return NextResponse.next()
    }

    // 2. If NOT logged in and trying to hit a protected route, go to login
    if (!isLoggedIn && (isDashboardRoute || isOnboardingRoute)) {
        return NextResponse.redirect(new URL("/login", nextUrl))
    }

    // 3. Logic for authenticated users
    if (isLoggedIn) {
        // If finished onboarding but trying to onboard again, go to dashboard
        if (isOnboardingRoute && onboardingComplete) {
            return NextResponse.redirect(new URL("/dashboard", nextUrl))
        }

        // If NOT finished onboarding but trying to reach dashboard, go to onboarding steps
        if (isDashboardRoute && !onboardingComplete) {
            return NextResponse.redirect(new URL("/onboarding/step-1", nextUrl))
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|api/og).*)"],
}
