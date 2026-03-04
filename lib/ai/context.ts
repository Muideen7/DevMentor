import { connectDB } from '@/lib/db/mongoose'
import User from '@/lib/db/models/User'
import Roadmap from '@/lib/db/models/Roadmap'
import CheckIn from '@/lib/db/models/CheckIn'

export async function buildMentorContext(userId: string): Promise<string> {
  await connectDB()

  const [user, roadmap, recentCheckIns] = await Promise.all([
    User.findById(userId).select('goal currentLevel stack hoursPerWeek'),
    Roadmap.findOne({ userId }).select('currentWeek totalWeeks phases'),
    CheckIn.find({ userId }).sort({ date: -1 }).limit(5).select('workedOn blockers mood')
  ])

  // Find the active week from roadmap phases
  const activeWeek = roadmap?.phases
    ?.flatMap((p: any) => p.weeks)
    ?.find((w: any) => w.status === 'active')

  return `
User goal: ${user?.goal || 'Not set'}
Current level: ${user?.currentLevel || 'Not set'}
Preferred stack: ${user?.stack?.join(', ') || 'Not set'}
Hours available per week: ${user?.hoursPerWeek || 0}
Roadmap progress: Week ${roadmap?.currentWeek || 0} of ${roadmap?.totalWeeks || 0}
Current topic: ${activeWeek?.title ?? 'Not started'}
Recent check-ins: ${recentCheckIns?.length ? recentCheckIns.map((c: any) => `"${c.workedOn}" (mood: ${c.mood}/5)`).join(' | ') : 'No recent check-ins'}
  `.trim()
}
