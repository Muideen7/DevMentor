import Link from "next/link";
import Logo from "@/components/shared/Logo";
import Navbar from "@/components/layout/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero-gradient pt-20 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/40 mb-8 shadow-sm">
            <span className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
              <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-300"></div>
              <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-400"></div>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider">2,400+ developers already learning</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Your Personal AI Mentor for <br className="hidden md:block"/> Self-Taught Developers
          </h1>
          <p className="text-lg md:text-xl text-text-main/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            No senior dev? No problem. DevMentor builds your roadmap, reviews your code, and guides you through every block — at 2am if it has to.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/login" className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform text-center">
              Start Learning Free
            </Link>
            <button className="w-full sm:w-auto bg-white/20 backdrop-blur-md border border-white/30 px-10 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">play_circle</span> Watch how it works
            </button>
          </div>

          {/* Centerpiece Chat UI */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-xl lg:rounded-xl p-6 shadow-2xl text-left border border-white soft-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent-coral flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">smart_toy</span>
                </div>
                <div>
                  <p className="text-sm font-bold">DevMentor AI</p>
                  <p className="text-xs text-text-body">Online & ready to help</p>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="bg-background-light p-4 rounded-lg inline-block max-w-[80%]">
                  <p className="text-sm font-medium">Hey! What are you stuck on today? I can help you debug, explain a concept, or plan your next project.</p>
                </div>
              </div>
              <div className="relative">
                <input 
                  className="w-full bg-background-light border-none rounded-full px-6 py-4 focus:ring-2 focus:ring-accent-coral outline-none text-sm" 
                  placeholder="I'm struggling with CSS Grid layouts..." 
                  type="text"
                />
                <button className="absolute right-2 top-2 bg-primary text-white p-2 rounded-full">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-10 -right-6 md:-right-12 bg-white p-4 rounded-lg shadow-xl border border-white/50 flex items-center gap-3 animate-bounce-slow">
              <div className="bg-blue-100 p-2 rounded-lg">
                <span className="material-symbols-outlined text-blue-600">map</span>
              </div>
              <span className="text-xs font-bold">Generate My Roadmap</span>
            </div>
            <div className="absolute top-1/2 -left-6 md:-left-20 bg-white p-4 rounded-lg shadow-xl border border-white/50 flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <span className="material-symbols-outlined text-emerald-600">code</span>
              </div>
              <span className="text-xs font-bold">Review My Code</span>
            </div>
            <div className="absolute -bottom-6 right-10 bg-white p-4 rounded-lg shadow-xl border border-white/50 flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <span className="material-symbols-outlined text-amber-600">lightbulb</span>
              </div>
              <span className="text-xs font-bold">Explain This Concept</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-text-body uppercase tracking-[0.2em] mb-10">Trusted by learners from</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-40 grayscale">
            <div className="flex justify-center text-xl font-black italic">freeCodeCamp</div>
            <div className="flex justify-center text-xl font-bold">Andela</div>
            <div className="flex justify-center text-xl font-bold tracking-tighter">ALX</div>
            <div className="flex justify-center text-xl font-bold">Coursera</div>
            <div className="flex justify-center text-xl font-semibold">The Odin Project</div>
            <div className="flex justify-center text-xl font-bold">Scrimba</div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent-coral font-bold">The Real Problem</p>
          <h2 className="text-4xl font-bold mb-16">Self-teaching is hard for three reasons</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg bg-background-light/50 border border-primary/5 shadow-soft hover:bg-white transition-colors group">
              <span className="material-symbols-outlined text-4xl mb-6 text-primary group-hover:text-accent-coral">list_alt</span>
              <h3 className="text-xl font-bold mb-4">No Structure</h3>
              <p className="text-text-body">Tutorial hell is real. Without a plan, you're just jumping from one random video to another without progress.</p>
            </div>
            <div className="p-8 rounded-lg bg-background-light/50 border border-primary/5 shadow-soft hover:bg-white transition-colors group">
              <span className="material-symbols-outlined text-4xl mb-6 text-primary group-hover:text-accent-coral">chat_bubble_outline</span>
              <h3 className="text-xl font-bold mb-4">No Feedback</h3>
              <p className="text-text-body">You finish a project but don't know if your code is "good" or just "working". Bad habits stick when uncorrected.</p>
            </div>
            <div className="p-8 rounded-lg bg-background-light/50 border border-primary/5 shadow-soft hover:bg-white transition-colors group">
              <span className="material-symbols-outlined text-4xl mb-6 text-primary group-hover:text-accent-coral">explore</span>
              <h3 className="text-xl font-bold mb-4">No Direction</h3>
              <p className="text-text-body">When you get stuck, it takes hours to find an answer. Many people quit because they feel lonely in the struggle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works (Solution) */}
      <section className="py-24 px-6 overflow-hidden" id="roadmap">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent-coral font-bold">How DevMentor Works</p>
          <h2 className="text-4xl font-bold mb-20">Your journey, automated.</h2>
          <div className="space-y-32">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                <span className="inline-block w-12 h-12 bg-primary text-white rounded-full text-center leading-[48px] font-bold mb-6">1</span>
                <h3 className="text-3xl font-bold mb-6">Tell it your goal once</h3>
                <p className="text-text-body text-lg leading-relaxed">Whether it's "Get a React job" or "Build a mobile app", DevMentor analyzes the current job market and your current skills to build a customized daily curriculum.</p>
              </div>
              <div className="md:w-1/2 bg-white rounded-lg p-4 shadow-xl border border-primary/5">
                <div className="bg-background-light aspect-video rounded-lg flex items-center justify-center border border-dashed border-primary/10">
                  <div className="text-center p-8">
                    <span className="material-symbols-outlined text-accent-coral font-bold text-4xl mb-2">person_add</span>
                    <p className="font-bold">Onboarding UI Mockup</p>
                    <p className="text-xs text-text-body">Defining your career path...</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="md:w-1/2">
                <span className="inline-block w-12 h-12 bg-primary text-white rounded-full text-center leading-[48px] font-bold mb-6">2</span>
                <h3 className="text-3xl font-bold mb-6">Paste your code. Get a real explanation.</h3>
                <p className="text-text-body text-lg leading-relaxed">Don't just fix bugs. Understand them. Paste your snippet and DevMentor explains the "Why" behind every suggestion, acting like a pair programmer.</p>
              </div>
              <div className="md:w-1/2 bg-primary rounded-lg p-4 shadow-xl border border-white/10">
                <div className="bg-[#1e1e1e] aspect-video rounded-lg p-6 font-mono text-sm text-white/80 overflow-hidden">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <pre className="whitespace-pre-wrap">
                    <span className="text-blue-400">function</span> <span className="text-yellow-300">calculateTotal</span>(items) {'{'}{"\n"}
                    {"  "}<span className="text-slate-500">// AI Review: Consider using reduce() for cleaner code</span>{"\n"}
                    {"  "}let total = 0;{"\n"}
                    {"  "}items.forEach(i =&gt; total += i.price);{"\n"}
                    {"  "}return total;{"\n"}
                    {'}'}
                  </pre>
                </div>
              </div>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                <span className="inline-block w-12 h-12 bg-primary text-white rounded-full text-center leading-[48px] font-bold mb-6">3</span>
                <h3 className="text-3xl font-bold mb-6">Check in every day. Watch yourself grow.</h3>
                <p className="text-text-body text-lg leading-relaxed">Consistency is king. DevMentor tracks your progress, remembers where you left off, and sends gentle nudges to keep you coding daily.</p>
              </div>
              <div className="md:w-1/2 bg-white rounded-lg p-6 shadow-xl border border-primary/5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <span className="font-bold">Progress Streak</span>
                    <span className="text-accent-coral font-bold">14 Days 🔥</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-full bg-accent-coral flex items-center justify-center"></div>
                    <div className="h-8 w-8 bg-accent-coral/40 rounded-md"></div>
                    <div className="w-10 h-10 rounded-full bg-accent-coral flex items-center justify-center"></div>
                    <div className="h-8 w-8 bg-background-light border border-primary/5 rounded-md"></div>
                    <div className="h-8 w-8 bg-background-light border border-primary/5 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Dark Grid */}
      <section className="py-24 px-6 bg-primary text-white rounded-xl mx-4" id="features">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Everything you need to go from zero to hired.</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-accent-coral font-bold text-3xl mb-4">route</span>
              <h4 className="text-xl font-bold mb-3">Roadmap Generator</h4>
              <p className="text-white/60 text-sm">Dynamic career paths that adapt based on the skills you've already mastered.</p>
            </div>
            <div className="p-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-accent-coral font-bold text-3xl mb-4">rate_review</span>
              <h4 className="text-xl font-bold mb-3">AI Code Review</h4>
              <p className="text-white/60 text-sm">Instant feedback on logic, performance, and security for every line you write.</p>
            </div>
            <div className="p-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-accent-coral font-bold text-3xl mb-4">event_available</span>
              <h4 className="text-xl font-bold mb-3">Daily Check-ins</h4>
              <p className="text-white/60 text-sm">Personalized reminders and mini-challenges to keep your coding streak alive.</p>
            </div>
            <div className="p-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-accent-coral font-bold text-3xl mb-4">psychology</span>
              <h4 className="text-xl font-bold mb-3">Concept Explainer</h4>
              <p className="text-white/60 text-sm">Struggling with Closures or Recursion? Get 10 different ways of explaining it.</p>
            </div>
            <div className="p-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-accent-coral font-bold text-3xl mb-4">memory</span>
              <h4 className="text-xl font-bold mb-3">Progress Memory</h4>
              <p className="text-white/60 text-sm">DevMentor remembers your previous bugs and helps you avoid repeating them.</p>
            </div>
            <div className="p-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-accent-coral font-bold text-3xl mb-4">groups</span>
              <h4 className="text-xl font-bold mb-3">Community Feed</h4>
              <p className="text-white/60 text-sm">Share your wins and roadmaps with 2,400+ other self-taught developers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Loved by developers worldwide</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-soft border border-primary/5">
              <p className="text-text-body mb-8 italic">"I was stuck on freeCodeCamp for months. DevMentor gave me the structure I needed to finally build my own portfolio projects."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-coral/20"></div>
                <div>
                  <p className="font-bold">Tunde A.</p>
                  <p className="text-xs text-text-body">Frontend Developer @ ALX</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-soft border border-primary/5">
              <p className="text-text-body mb-8 italic">"The AI Code Review is basically like having a senior developer sitting next to me. I've learned more in 2 weeks than in 2 months of YouTube."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent-coral flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm text-[1.2rem]">person</span>
                </div>
                <div>
                  <p className="font-bold">Priya M.</p>
                  <p className="text-xs text-text-body">Self-taught Data Analyst</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-soft border border-primary/5">
              <p className="text-text-body mb-8 italic">"The roadmap feature is a game changer. It cuts out all the noise and tells me exactly what I need to learn to get hired."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10"></div>
                <div>
                  <p className="font-bold">Marcus L.</p>
                  <p className="text-xs text-text-body">Fullstack Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-background-light" id="pricing">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Investment in your future</h2>
            <p className="text-text-body">No expensive bootcamps. Just pure learning.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-end">
            {/* Starter */}
            <div className="bg-white p-8 rounded-lg shadow-soft border border-primary/5">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-text-body">/month</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-accent-coral text-lg">check_circle</span>
                  Basic Roadmap Generator
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-accent-coral text-lg">check_circle</span>
                  5 AI Code Reviews / month
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-accent-coral text-lg">check_circle</span>
                  Community Feed Access
                </li>
              </ul>
              <Link href="/login" className="block w-full text-center py-4 rounded-full border-2 border-primary font-bold hover:bg-primary hover:text-white transition-colors">
                Join Free
              </Link>
            </div>
            {/* Mentor */}
            <div className="bg-white p-10 rounded-lg shadow-2xl border-4 border-accent-coral relative transform md:scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-coral text-white px-4 py-1 rounded-full text-xs font-bold text-[0.7rem] whitespace-nowrap">MOST POPULAR</div>
              <h3 className="text-xl font-bold mb-2">Mentor</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-bold">$12</span>
                <span className="text-text-body">/month</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-2 text-sm font-bold">
                  <span className="material-symbols-outlined text-accent-coral text-lg">check_circle</span>
                  Unlimited Roadmaps
                </li>
                <li className="flex items-center gap-2 text-sm font-bold">
                  <span className="material-symbols-outlined text-accent-coral text-lg">check_circle</span>
                  Unlimited AI Code Reviews
                </li>
                <li className="flex items-center gap-2 text-sm font-bold">
                  <span className="material-symbols-outlined text-accent-coral text-lg">check_circle</span>
                  Daily Goal Tracking
                </li>
                <li className="flex items-center gap-2 text-sm font-bold">
                  <span className="material-symbols-outlined text-accent-coral text-lg">check_circle</span>
                  Priority Concept Explanation
                </li>
              </ul>
              <Link href="/login" className="block w-full text-center py-4 rounded-full bg-primary text-white font-bold hover:scale-105 transition-transform">
                Go Pro
              </Link>
            </div>
            {/* Cohort */}
            <div className="bg-white p-8 rounded-lg shadow-soft border border-primary/5">
              <h3 className="text-xl font-bold mb-2">Cohort</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-text-body">/month</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-accent-coral text-lg">check_circle</span>
                  Everything in Mentor
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-accent-coral text-lg">check_circle</span>
                  Private Study Group
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-accent-coral text-lg">check_circle</span>
                  Monthly Live Q&A Sessions
                </li>
              </ul>
              <Link href="/login" className="block w-full text-center py-4 rounded-full border-2 border-primary font-bold hover:bg-primary hover:text-white transition-colors">
                Select Cohort
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group p-6 rounded-lg bg-background-light border border-primary/5">
              <summary className="list-none flex justify-between items-center cursor-pointer font-bold">
                Is this just like ChatGPT?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <p className="mt-4 text-text-body text-sm leading-relaxed">While we use advanced LLMs, DevMentor is specifically tuned for coding education. It includes features like persistent memory of your learning progress, career-focused roadmaps, and structured feedback that general AI lacks.</p>
            </details>
            <details className="group p-6 rounded-lg bg-background-light border border-primary/5">
              <summary className="list-none flex justify-between items-center cursor-pointer font-bold">
                Do I need to know how to code already?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <p className="mt-4 text-text-body text-sm leading-relaxed">Not at all! Many of our users are absolute beginners. We build your roadmap from square one, teaching you the fundamentals like Variables and Logic first.</p>
            </details>
            <details className="group p-6 rounded-lg bg-background-light border border-primary/5">
              <summary className="list-none flex justify-between items-center cursor-pointer font-bold">
                Can I cancel my subscription?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <p className="mt-4 text-text-body text-sm leading-relaxed">Yes, you can cancel at any time from your dashboard. No hidden fees or long-term contracts.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 pb-32">
        <div className="max-w-5xl mx-auto rounded-xl p-16 text-center text-primary relative overflow-hidden" 
             style={{ background: "linear-gradient(135deg, #E8736A 0%, #F5C4A8 100%)" }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stop learning alone.</h2>
            <p className="text-lg mb-10 opacity-80">Join 2,400+ developers building their dreams today.</p>
            <Link href="/login" className="bg-primary text-white px-12 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform inline-block">
              Start Learning Free Today
            </Link>
          </div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-primary/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <Logo className="mb-6" />
            <p className="text-text-body text-sm leading-relaxed">The personal AI companion for the next generation of software engineers.</p>
          </div>
          <div>
            <h5 className="font-bold mb-6 uppercase text-xs tracking-widest">Product</h5>
            <ul className="space-y-4 text-sm text-text-body">
              <li><a className="hover:text-primary" href="#">Features</a></li>
              <li><a className="hover:text-primary" href="#">Roadmaps</a></li>
              <li><a className="hover:text-primary" href="#">Pricing</a></li>
              <li><a className="hover:text-primary" href="#">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6 uppercase text-xs tracking-widest">Resources</h5>
            <ul className="space-y-4 text-sm text-text-body">
              <li><a className="hover:text-primary" href="#">Community</a></li>
              <li><a className="hover:text-primary" href="#">Documentation</a></li>
              <li><a className="hover:text-primary" href="#">Blog</a></li>
              <li><a className="hover:text-primary" href="#">Free Courses</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6 uppercase text-xs tracking-widest">Company</h5>
            <ul className="space-y-4 text-sm text-text-body">
              <li><a className="hover:text-primary" href="#">About Us</a></li>
              <li><a className="hover:text-primary" href="#">Careers</a></li>
              <li><a className="hover:text-primary" href="#">Privacy</a></li>
              <li><a className="hover:text-primary" href="#">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-body">© {new Date().getFullYear()} DevMentor AI. Built for self-taught devs.</p>
          <div className="flex gap-6">
            <a className="text-text-body hover:text-primary transition-colors" href="https://crdev.vercel.app" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined text-xl">language</span>
            </a>
            <a className="text-text-body hover:text-primary transition-colors" href="mailto:olayeyeayomide2000@gmail.com">
              <span className="material-symbols-outlined text-xl">alternate_email</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
