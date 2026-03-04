import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export const proxy = auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isAuthRoute = ["/login", "/signup"].includes(nextUrl.pathname)
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard")
  const isOnboardingRoute = nextUrl.pathname.startsWith("/onboarding")

  // 3. Authenticated user hitting /login or /signup → redirect to /dashboard
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }
    return NextResponse.next()
  }

  // 1. Unauthenticated user hits any /dashboard/* or /onboarding/* route → redirect to /login
  if (!isLoggedIn && (isDashboardRoute || isOnboardingRoute)) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  // 2. Authenticated user with onboardingComplete: false hitting dashboard → redirect to /onboarding/step-1
  if (isLoggedIn && isDashboardRoute && !req.auth?.user?.onboardingComplete) {
    return NextResponse.redirect(new URL("/onboarding/step-1", nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|api/og).*)"],
}
