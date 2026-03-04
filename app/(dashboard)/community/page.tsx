import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { connectDB } from "@/lib/db/mongoose"
import CommunityPost from "@/lib/db/models/CommunityPost"
import { seedCommunityIfNeeded } from "@/lib/db/seeds/community"
import CommunityFeed from "@/components/community/CommunityFeed"
import User from "@/lib/db/models/User"

export const metadata = {
  title: "Community | DevMentor AI",
  description: "Connect with thousands of developers, share your wins, and get help.",
}

async function getCommunityData() {
  await seedCommunityIfNeeded()
  const posts = await CommunityPost.find({})
    .populate('userId', 'name image currentLevel')
    .sort({ createdAt: -1 })
    .lean()
  return JSON.parse(JSON.stringify(posts))
}

export default async function CommunityPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const posts = await getCommunityData()
  const user = await User.findById(session.user.id).lean()

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 pt-4 pb-20 animate-in fade-in duration-700">
      
      {/* Main Feed Section */}
      <div className="flex-1 max-w-2xl mx-auto w-full">
        <header className="mb-10 text-center md:text-left px-4 md:px-0">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Community Feed
          </h1>
          <p className="text-slate-500 font-medium max-w-lg leading-relaxed">
             Share your progress, ask technical questions, or celebrate a debugging win with your fellow learners. 
          </p>
        </header>

        {/* Community Feed Client Component */}
        <CommunityFeed 
          initialPosts={posts} 
          user={JSON.parse(JSON.stringify(user))} 
        />
      </div>

      {/* Right Sidebar - Trends & Leaderboard */}
      <aside className="w-full lg:w-80 space-y-8 hidden xl:block sticky top-8 h-fit">
        {/* Search */}
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-coral transition-colors">search</span>
          <input className="w-full bg-white border border-slate-100 rounded-full py-4 pl-12 pr-4 text-sm font-bold shadow-soft focus:ring-4 focus:ring-accent-coral/10 focus:border-accent-coral/30 outline-none transition-all placeholder:text-slate-300" placeholder="Search community..." type="text"/>
        </div>

        {/* Top Learners */}
        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-xs uppercase tracking-widest text-slate-400">Top Learners</h3>
            <span className="text-[9px] text-accent-coral px-2 py-0.5 bg-accent-coral/5 rounded-full font-black uppercase tracking-widest">Growth</span>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 group">
                <span className="text-sm font-black text-slate-200 group-hover:text-accent-coral transition-colors w-4">{i}</span>
                <div className="size-10 rounded-full bg-slate-100 border-2 border-white shadow-sm" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-black truncate text-slate-900">Developer #{i}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Level {4-i}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Win Tip */}
        <section className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 size-32 bg-accent-coral/20 rounded-full -translate-y-12 translate-x-12 blur-2xl" />
           <p className="text-[10px] font-black uppercase tracking-widest text-accent-coral mb-4">Pro Tip</p>
           <p className="text-sm font-bold leading-relaxed mb-6">"Share one code block today to get featured in our Weekly Digest!"</p>
           <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 transition-all">
              Learn More
           </button>
        </section>
      </aside>

    </div>
  )
}
