"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { title: "Home", icon: "dashboard", path: "/dashboard" },
    { title: "My Roadmap", icon: "route", path: "/dashboard/roadmap" },
    { title: "Code Review", icon: "rate_review", path: "/dashboard/code-review" },
    { title: "Daily Check-in", icon: "event_available", path: "/dashboard/check-in" },
    { title: "Community", icon: "groups", path: "/dashboard/community" },
  ];

  return (
    <div className="flex h-screen bg-background-light overflow-hidden">
      {/* Sidebar */}
      <aside id="sidebar" className="w-64 bg-white border-r border-slate-200 flex flex-col z-30 transition-all duration-300">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="bg-accent-coral p-1.5 rounded-lg text-white group-hover:rotate-12 transition-transform">
              <span className="material-symbols-outlined text-xl">diamond</span>
            </div>
            <span className="font-bold text-lg tracking-tight">DevMentor <span className="text-accent-coral">AI</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path}
                href={item.path} 
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group",
                  isActive 
                    ? "bg-coral-tint text-accent-coral" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                )}
              >
                <span className={cn(
                  "material-symbols-outlined transition-all",
                  isActive ? "text-accent-coral" : "text-slate-400 group-hover:text-primary"
                )}>
                  {item.icon}
                </span>
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-accent-coral/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-accent-coral text-sm">bolt</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Streak: 12 Days</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-accent-coral w-[80%] rounded-full shadow-[0_0_8px_rgba(232,115,106,0.3)]"></div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-50 rounded-xl transition-colors group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200"></div>
              <div className="text-left">
                <p className="text-xs font-bold text-primary">Alex Chen</p>
                <p className="text-[10px] text-slate-400">Pro Member</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-sm">settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main id="main-content" className="flex-1 overflow-y-auto relative scroll-smooth bg-background-light">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-background-light/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 material-symbols-outlined">search</span>
            <input 
              type="text" 
              placeholder="Search concepts, bugs, or roadmaps..." 
              className="bg-transparent border-none outline-none text-sm placeholder:text-slate-400 w-64"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary transition-colors hover:shadow-sm">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
            <Link href="/dashboard/roadmap" className="bg-primary text-white px-6 py-2 rounded-full text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              Generate New Task
            </Link>
          </div>
        </header>

        <div className="p-8 pb-24">
          {children}
        </div>
        
        {/* Floating AI Bubble (Always present in dashboard) */}
        <div className="fixed bottom-8 right-8 z-50">
          <div className="bg-white rounded-full p-4 shadow-2xl border-4 border-accent-coral cursor-pointer hover:scale-110 transition-transform group relative animate-bounce-slow">
            <div className="absolute -top-12 -left-24 bg-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300 pointer-events-none">
              How can I help you? ✨
            </div>
            <span className="material-symbols-outlined text-accent-coral text-3xl font-bold">smart_toy</span>
          </div>
        </div>
      </main>
    </div>
  );
}
