import Navbar from "@/components/layout/Navbar"
import Link from "next/link"

export const metadata = {
  title: "Privacy Policy | DevMentor AI",
  description: "How DevMentor AI collects, uses, and protects your personal data.",
}

const lastUpdated = "March 2026"

const sections = [
  {
    id: "what-we-collect",
    title: "1. What We Collect",
    content: [
      {
        heading: "Account Information",
        body: "When you register, we collect your name, email address, and (if using credentials login) a bcrypt-hashed password. We never store plain-text passwords. If you sign in with Google, we only receive the profile data Google shares with us: name, email, and profile photo.",
      },
      {
        heading: "Onboarding Data",
        body: "To personalise your roadmap, we ask for your learning goal, current experience level, preferred technology stack, and estimated hours available per week. This data is stored in your user profile and used exclusively to generate and update your roadmap.",
      },
      {
        heading: "Check-In Entries",
        body: "Daily check-in submissions, including what you worked on, any blockers, your mood rating, and optional free-text notes, are stored and used to generate personalised AI responses and to build your progress history.",
      },
      {
        heading: "Code Submissions",
        body: "Code you paste for review is stored against your account to power the review history feature. We do not use your code to train AI models.",
      },
      {
        heading: "Usage Data",
        body: "We track which features you use and how often to improve the product. We do not sell this data to third parties or use it for advertising.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Data",
    content: [
      {
        heading: "Providing the Service",
        body: "Your onboarding data, check-ins, and roadmap progress are passed as context to our AI provider (Google Gemini API) to generate personalised responses. This context is sent per-request and is used only to serve your response.",
      },
      {
        heading: "Improving the Product",
        body: "Aggregated, anonymised usage patterns help us understand which features are working. We do not analyse individual conversations to improve our product without consent.",
      },
      {
        heading: "Communications",
        body: "If you opt in, we may send transactional emails such as streak reminders or weekly learning digests. You can unsubscribe from any email at any time.",
      },
    ],
  },
  {
    id: "data-storage",
    title: "3. Data Storage & Security",
    content: [
      {
        heading: "Database",
        body: "Your data is stored in MongoDB Atlas. We use a connection singleton pattern to prevent connection pool exhaustion. Database credentials are never exposed to the client.",
      },
      {
        heading: "Authentication",
        body: "Sessions are managed via NextAuth.js v5. Session tokens are signed with a secret stored as an environment variable and are never accessible from the browser.",
      },
      {
        heading: "API Keys",
        body: "All third-party API keys (AI provider, email, file uploads) are stored as server-side environment variables. They are never included in client bundles or exposed via API responses.",
      },
      {
        heading: "Passwords",
        body: "Email/password accounts use bcrypt hashing with a minimum cost factor of 12. We cannot recover your plain-text password — if you forget it, you will need to reset it.",
      },
    ],
  },
  {
    id: "third-parties",
    title: "4. Third-Party Services",
    content: [
      {
        heading: "Google Gemini API",
        body: "We use Google's Gemini API to power AI features. Content you submit may be processed by Google's infrastructure per their API Terms of Service. We send only the minimum context needed to serve your request.",
      },
      {
        heading: "Google OAuth",
        body: "If you choose 'Sign in with Google', your authentication is handled by Google. We only receive the profile data you authorise Google to share.",
      },
      {
        heading: "Vercel",
        body: "DevMentor AI is deployed on Vercel. Your requests are processed by Vercel's serverless infrastructure. Vercel's privacy policy governs any data they process.",
      },
      {
        heading: "Resend",
        body: "Transactional emails are sent via Resend. Your email address is shared with Resend only when an email is being sent to you.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "5. Your Rights",
    content: [
      {
        heading: "Access & Export",
        body: "You can request a copy of all personal data we hold about you by emailing us. We will respond within 30 days.",
      },
      {
        heading: "Deletion",
        body: "You can delete your account at any time from the dashboard settings. Deleting your account permanently removes your profile, roadmap, check-ins, code reviews, and conversation history from our systems.",
      },
      {
        heading: "Correction",
        body: "If any data we hold about you is inaccurate, you can update it directly in the dashboard or contact us to make the correction.",
      },
    ],
  },
  {
    id: "contact",
    title: "6. Contact",
    content: [
      {
        heading: "Questions?",
        body: "If you have any questions about this Privacy Policy or how we handle your data, contact us at olayeyeayomide2000@gmail.com. We typically respond within 2 business days.",
      },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 border-b border-primary/5 bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-accent-coral/10 text-accent-coral text-xs font-black rounded-full mb-5 uppercase tracking-widest border border-accent-coral/10">
            Legal
          </span>
          <h1 className="text-5xl font-black tracking-tight mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-text-body">
            Last updated: <strong>{lastUpdated}</strong>
          </p>
          <p className="text-text-body mt-4 leading-relaxed">
            DevMentor AI is committed to being transparent about how we handle your data. This policy explains what we collect, why we collect it, and how you can control it. We don't sell your data. We never will.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Table of contents */}
          <div className="bg-white rounded-2xl border border-primary/5 shadow-soft p-6 mb-12">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">Contents</p>
            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm font-bold hover:text-accent-coral transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm text-accent-coral">arrow_forward</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sections */}
          <div className="space-y-16">
            {sections.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="text-2xl font-black mb-8 pb-4 border-b border-primary/5">
                  {section.title}
                </h2>
                <div className="space-y-8">
                  {section.content.map((item) => (
                    <div key={item.heading}>
                      <h3 className="font-black text-base mb-2 text-slate-900">{item.heading}</h3>
                      <p className="text-text-body text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-primary/5 text-center">
        <p className="text-xs text-text-body">
          © {new Date().getFullYear()} DevMentor AI ·{" "}
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          {" · "}
          <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          {" · "}
          <Link href="/careers" className="hover:text-primary transition-colors">Careers</Link>
        </p>
      </footer>
    </div>
  )
}
