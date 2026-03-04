import Navbar from "@/components/layout/Navbar"
import Link from "next/link"

export const metadata = {
  title: "Careers | DevMentor AI",
  description: "Join the DevMentor AI team. We're building the AI mentor that every self-taught developer deserves.",
}

const openRoles: { title: string; type: string; department: string; location: string }[] = []

const perks = [
  {
    icon: "public",
    title: "Fully Remote",
    body: "Work from anywhere. We believe the best talent shouldn't have to move cities to do great work.",
  },
  {
    icon: "favorite",
    title: "Mission-Driven",
    body: "Every line of code you write directly improves the learning journey of a developer in Lagos, Bangalore, or Accra.",
  },
  {
    icon: "school",
    title: "Learning Budget",
    body: "We practise what we preach. Every team member gets an annual learning budget to keep growing.",
  },
  {
    icon: "schedule",
    title: "Async-First",
    body: "Meetings have agendas. Decisions are documented. Your deep work hours are protected.",
  },
  {
    icon: "rocket_launch",
    title: "Early-Stage Impact",
    body: "Join early and help shape the product, the culture, and the company roadmap from day one.",
  },
  {
    icon: "diversity_3",
    title: "Diverse by Design",
    body: "We build for emerging markets so we hire from them too. Diverse perspectives are a product requirement.",
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-20 px-6 hero-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-accent-coral/10 text-accent-coral text-xs font-black rounded-full mb-6 uppercase tracking-widest border border-accent-coral/10">
            We're Hiring
          </span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
            Help us mentor the{" "}
            <span className="text-accent-coral">next billion developers</span>
          </h1>
          <p className="text-lg text-text-body max-w-2xl mx-auto leading-relaxed">
            DevMentor AI is building the AI-powered mentor that every self-taught developer deserves. If that mission excites you, you belong here.
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent-coral font-bold text-sm mb-3">Why DevMentor AI</p>
          <h2 className="text-4xl font-black mb-12 tracking-tight">
            A team that ships. A mission that matters.
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="p-8 rounded-2xl bg-background-light border border-primary/5 shadow-soft hover:shadow-md transition-shadow"
              >
                <div className="size-12 rounded-xl bg-accent-coral/10 flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-accent-coral text-2xl">{perk.icon}</span>
                </div>
                <h3 className="font-black text-lg mb-2">{perk.title}</h3>
                <p className="text-sm text-text-body leading-relaxed">{perk.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-20 px-6 bg-background-light">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent-coral font-bold text-sm mb-3">Open Positions</p>
          <h2 className="text-4xl font-black mb-12 tracking-tight">Current openings</h2>

          {openRoles.length === 0 ? (
            <div className="bg-white rounded-3xl border border-primary/5 shadow-soft p-16 text-center">
              <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">
                manage_search
              </span>
              <h3 className="text-xl font-black mb-3">No open roles right now</h3>
              <p className="text-text-body text-sm max-w-sm mx-auto leading-relaxed mb-8">
                We're a small, focused team right now. We'll post openings here as we grow. In the meantime, introduce yourself; we love meeting people who care about the mission.
              </p>
              <a
                href="mailto:olayeyeayomide2000@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined text-sm">alternate_email</span>
                Say Hello
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {openRoles.map((role) => (
                <div
                  key={role.title}
                  className="flex items-center justify-between bg-white p-6 rounded-2xl border border-primary/5 shadow-soft hover:shadow-md transition-shadow group"
                >
                  <div>
                    <h3 className="font-black text-lg group-hover:text-accent-coral transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-sm text-text-body mt-1">{role.department} · {role.location} · {role.type}</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-accent-coral group-hover:translate-x-1 transition-all">
                    arrow_forward
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-primary/5 text-center">
        <p className="text-xs text-text-body">
          © {new Date().getFullYear()} DevMentor AI ·{" "}
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          {" · "}
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          {" · "}
          <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
        </p>
      </footer>
    </div>
  )
}
