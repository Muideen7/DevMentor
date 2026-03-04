import Link from "next/link";
import Logo from "@/components/shared/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full bg-background-light">
      {/* LEFT COLUMN (40%) - Visible on LG screens */}
      <section className="hidden lg:flex lg:w-[40%] flex-col justify-between p-12 relative overflow-hidden auth-gradient">
        {/* Decorative Blurred Shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          {/* Logo */}
          <Logo className="mb-16" />

          {/* Hero Content */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-tight mb-4 text-slate-900">
              The mentor you never had is waiting.
            </h1>
            <p className="text-lg text-slate-800/80 mb-10 leading-relaxed">
              Thousands of self-taught developers stopped feeling lost the moment they joined.
            </p>

            {/* Testimonial Card */}
            <div className="bg-white rounded-xl p-6 shadow-card mb-8">
              <div className="text-accent-coral flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="text-slate-700 font-medium italic mb-4">
                "I finally know what to learn next. The AI roadmap is a game changer for my career path."
              </p>
              <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/100?u=tunde-auth" alt="Tunde" className="w-10 h-10 rounded-full border border-slate-100 object-cover" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Tunde A.</p>
                  <p className="text-xs text-slate-500">Fullstack Developer, Lagos</p>
                </div>
              </div>
            </div>

            {/* Stat Pills */}
            <div className="flex flex-wrap gap-2">
              <div className="bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="text-xs font-semibold text-slate-800">2,400+ Developers</span>
              </div>
              <div className="bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="text-xs font-semibold text-slate-800">98% Feel More Focused</span>
              </div>
              <div className="bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="text-xs font-semibold text-slate-800">Built for Self-Taught</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT COLUMN (60%) */}
      <section className="w-full lg:w-[60%] flex flex-col items-center justify-center p-8 lg:p-16 overflow-y-auto bg-background-light">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex justify-center lg:hidden mb-12">
            <Logo />
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
