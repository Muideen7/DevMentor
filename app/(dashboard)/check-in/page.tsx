import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import CheckInForm from "@/components/check-in/CheckInForm"
import { connectDB } from "@/lib/db/mongoose"
import CheckIn from "@/lib/db/models/CheckIn"

export const metadata = {
  title: "Daily Check-in | DevMentor AI",
  description: "Reflect on your progress and get guidance for tomorrow.",
}

async function getLastCheckIn(userId: string) {
  await connectDB()
  return await CheckIn.findOne({ userId }).sort({ createdAt: -1 }).lean()
}

export default async function CheckInPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const lastCheckIn = await getLastCheckIn(session.user.id)
  
  // Check if already checked in today
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const checkedInToday = lastCheckIn && new Date(lastCheckIn.createdAt) >= today

  return (
    <div className="max-w-2xl mx-auto pt-4 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 border-l-[10px] border-accent-coral pl-6 leading-tight">
          Daily <span className="text-accent-coral">Check-in</span>
        </h1>
        <p className="text-slate-500 mt-3 text-base font-medium ml-8 leading-relaxed max-w-md">
          A small daily habit that compounds into massive career growth.
        </p>
      </header>

      {checkedInToday ? (
        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-soft">
          <div className="size-20 bg-accent-coral/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl text-accent-coral" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Day complete!</h2>
          <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto font-medium">
            You've already submitted your check-in for today. Your {lastCheckIn.streakDay}-day streak is safe.
          </p>
          
          <div className="bg-slate-50 rounded-2xl p-6 text-left border border-slate-100 mb-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Yesterday's Reflection</p>
            <div className="text-sm text-slate-600 font-medium leading-relaxed italic">
              "{lastCheckIn.workedOn}"
            </div>
          </div>

          <Link 
            href="/dashboard"
            className="inline-block px-8 py-3 bg-[#1A1A1A] text-white text-sm font-black rounded-full shadow-lg shadow-black/10 hover:brightness-110 transition-all uppercase tracking-widest"
          >
            Back to Dashboard
          </Link>
        </div>
      ) : (
        <CheckInForm />
      )}
    </div>
  )
}
