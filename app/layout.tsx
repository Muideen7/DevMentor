import type { Metadata, Viewport } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/shared/Toaster"
import { Providers } from "@/components/providers/SessionProvider"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const viewport: Viewport = {
  themeColor: "#1A1A1A",
  width: "device-width",
  initialScale: 1,
}

const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "DevMentor AI | Stop Learning to Code Alone",
  description:
    "DevMentor AI is an AI-powered mentorship platform for self-taught developers. Get personalized roadmaps, instant code reviews, and daily guidance to accelerate your career.",
  keywords: [
    "AI mentor",
    "coding bootcamp alternative",
    "learn to code",
    "self-taught developer",
    "coding roadmap",
    "code review",
    "personalized learning",
  ],
  authors: [{ name: "DevMentor AI Team" }],
  openGraph: {
    title: "DevMentor AI | Stop Learning to Code Alone",
    description:
      "The AI-powered mentor you never had. Personalized roadmaps, code reviews, and constant progress tracking for self-taught devs.",
    url: baseUrl,
    siteName: "DevMentor AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevMentor AI | Your Personal AI Coding Mentor",
    description:
      "The mentor you never had is waiting. AI-powered coding guidance at 2am.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} antialiased bg-background-light text-text-main font-display`}
      >
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}