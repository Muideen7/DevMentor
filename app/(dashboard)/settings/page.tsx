import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { connectDB } from "@/lib/db/mongoose"
import User from "@/lib/db/models/User"
import SettingsForm from "@/components/settings/SettingsForm"

export const metadata = {
  title: "Settings | DevMentor AI",
  description: "Manage your profile, learning preferences, and account security.",
}

async function getUserData(userId: string) {
  await connectDB()
  const user = await User.findById(userId).lean()
  return JSON.parse(JSON.stringify(user))
}

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await getUserData(session.user.id)

  return (
    <div className="max-w-4xl mx-auto pt-4 pb-20 animate-in fade-in duration-700">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Settings
        </h1>
        <p className="text-slate-500 font-medium max-w-lg leading-relaxed">
          Customize your learning environment, update your goals, and manage your account preferences.
        </p>
      </header>

      <SettingsForm user={user} />
    </div>
  )
}
