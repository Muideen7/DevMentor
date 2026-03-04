import Navbar from "@/components/layout/Navbar"
import Link from "next/link"

export const metadata = {
  title: "About Us | DevMentor AI",
  description: "Learn about DevMentor AI — our mission, vision, and the problem we are solving for self-taught developers worldwide.",
}

const stats = [
  { value: "10,000+", label: "Developers served (target year 1)" },
  { value: "$0", label: "Cost to get started" },
  { value: "24 / 7", label: "Mentor availability" },
  { value: "3", label: "Emerging markets targeted at launch" },
]

const values = [
  {
    icon: "diversity_3",
    title: "Access is everything",
    body: "Geography and finances should never determine who gets mentorship. We build for Tunde in Lagos, Priya in Bangalore, and Marcus in Accra, not just developers in San Francisco.",
  },
  {
    icon: "psychology",
    title: "Teach the why, not just the fix",
    body: "Anyone can copy-paste a fix. DevMentor explains the concept behind every bug so it never trips you up again. Understanding beats memorising every time.",
  },
  {
    icon: "trending_up",
    title: "Progress, not perfection",
    body: "Self-taught learning is non-linear. We celebrate consistency. A 30-day streak of 30-minute sessions beats a perfect weekend binge and then nothing for a month.",
  },
  {
    icon: "memory",
    title: "Your mentor remembers",
    body: "Unlike generic AI, DevMentor builds a model of you: your goals, your stack, your blockers, and every interaction is shaped by that context.",
  },
]

const personas = [
  {
    name: "Tunde A.",
    location: "Lagos, Nigeria",
    description: "23-year-old self-taught developer who knows HTML & CSS but feels stuck. Wants a remote frontend job in 12 months.",
    bg: "bg-accent-coral/10",
    text: "text-accent-coral",
  },
  {
    name: "Priya M.",
    location: "Bangalore, India",
    description: "27-year-old career-switcher with two Udemy courses under her belt. Needs someone to review her code and say 'you're ready'.",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    name: "Marcus L.",
    location: "Accra, Ghana",
    description: "19-year-old weekend coder with no community nearby. Motivated, isolated, and looking for structure and recognition.",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-20 px-6 hero-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-accent-coral/10 text-accent-coral text-xs font-black rounded-full mb-6 uppercase tracking-widest border border-accent-coral/10">
            Our Story
          </span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
            Every developer deserves a{" "}
            <span className="text-accent-coral">mentor</span>
          </h1>
          <p className="text-lg text-text-body max-w-2xl mx-auto leading-relaxed">
            DevMentor AI was built on a simple belief: where you were born, and how much money you have, should not determine whether you get guidance on your coding journey.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-accent-coral font-bold text-sm mb-3">Our Mission</p>
            <h2 className="text-4xl font-black mb-6 tracking-tight leading-tight">
              Give every self-taught developer the experience of having a senior developer who knows them
            </h2>
            <p className="text-text-body leading-relaxed mb-6">
              Self-teaching is the dominant path to a tech career in emerging markets. But it is brutally hard without structure, feedback, or someone to notice when you go quiet for three weeks.
            </p>
            <p className="text-text-body leading-relaxed">
              DevMentor AI is the senior developer most self-taught coders never had. It builds your roadmap, reviews your code, explains the concepts you're stuck on, and checks in every single day at 2am if it has to.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-background-light rounded-2xl p-6 border border-primary/5 shadow-soft"
              >
                <p className="text-3xl font-black text-accent-coral mb-2">{s.value}</p>
                <p className="text-xs font-bold text-text-body leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we build for */}
      <section className="py-20 px-6 bg-background-light">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent-coral font-bold text-sm mb-3">Who We Build For</p>
          <h2 className="text-4xl font-black mb-12 tracking-tight">
            Real people. Real constraints. Real goals.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {personas.map((p) => (
              <div
                key={p.name}
                className="bg-white rounded-2xl p-8 border border-primary/5 shadow-soft"
              >
                <div className={`size-14 ${p.bg} rounded-full flex items-center justify-center mb-5`}>
                  <span className={`material-symbols-outlined text-2xl ${p.text}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    person
                  </span>
                </div>
                <h3 className="font-black text-lg mb-1">{p.name}</h3>
                <p className="text-xs text-text-body font-bold mb-4 uppercase tracking-wider">{p.location}</p>
                <p className="text-sm text-text-body leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent-coral font-bold text-sm mb-3">Our Values</p>
          <h2 className="text-4xl font-black mb-12 tracking-tight">What we believe</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex gap-5 p-8 rounded-2xl bg-background-light border border-primary/5 shadow-soft hover:shadow-md transition-shadow"
              >
                <div className="size-12 rounded-xl bg-accent-coral/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-accent-coral text-2xl">{v.icon}</span>
                </div>
                <div>
                  <h3 className="font-black text-lg mb-2">{v.title}</h3>
                  <p className="text-sm text-text-body leading-relaxed">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4 tracking-tight">Ready to start?</h2>
          <p className="text-text-body mb-8 leading-relaxed">
            Join thousands of self-taught developers who are building structure, getting feedback, and making progress every day.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20"
          >
            Start Learning Free
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Footer note */}
      <footer className="py-8 px-6 border-t border-primary/5 text-center">
        <p className="text-xs text-text-body">
          © {new Date().getFullYear()} DevMentor AI ·{" "}
          <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
          {" · "}
          <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
        </p>
      </footer>
    </div>
  )
}
