import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { connectDB } from "@/lib/db/mongoose"
import CheckIn from "@/lib/db/models/CheckIn"
import CodeReview from "@/lib/db/models/CodeReview"
import Roadmap from "@/lib/db/models/Roadmap"
import ProgressStats from "@/components/progress/ProgressStats"
import ProgressTabs from "@/components/progress/ProgressTabs"

export const metadata = {
  title: "Progress History | DevMentor AI",
  description: "View your learning journey, past logs, and code reviews.",
}

async function getProgressData(userId: string) {
  await connectDB()

  // Fetch all check-ins (latest first)
  const checkIns = await CheckIn.find({ userId }).sort({ createdAt: -1 }).lean()
  
  // Fetch all code reviews (latest first)
  const reviews = await CodeReview.find({ userId }).sort({ createdAt: -1 }).lean()

  // Roadmap data for context
  const roadmap = await Roadmap.findOne({ userId }).lean()

  // Logic for stats
  const totalCheckIns = checkIns.length
  const totalCodeReviews = reviews.length
  const currentStreak = checkIns.length > 0 ? (checkIns[0] as any).streakDay || 0 : 0
  
  // Calculate best streak
  let bestStreak = 0
  checkIns.forEach((ci: any) => {
    if (ci.streakDay > bestStreak) bestStreak = ci.streakDay
  })

  // Basic cleanup for serialization
  const serializedCheckIns = JSON.parse(JSON.stringify(checkIns))
  const serializedReviews = JSON.parse(JSON.stringify(reviews))

  return {
    checkIns: serializedCheckIns,
    reviews: serializedReviews,
    stats: {
      totalCheckIns,
      totalCodeReviews,
      currentStreak,
      bestStreak
    }
  }
}

export default async function ProgressPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const { checkIns, reviews, stats } = await getProgressData(session.user.id)

  return (
    <div className="max-w-4xl mx-auto pt-4 pb-20 animate-in fade-in duration-700">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Your Journey
        </h1>
        <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
          Every line of code and every daily reflection is a step forward. Review your progress and celebrate the distance you've covered.
        </p>
      </header>

      {/* Stats Grid */}
      <ProgressStats stats={stats} />

      {/* Tabs Layout */}
      <ProgressTabs checkIns={checkIns} reviews={reviews} />
    </div>
  )
}
