"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import Logo from "@/components/shared/Logo"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = [
    { title: "Home", icon: "home", path: "/dashboard" },
    { title: "My Roadmap", icon: "map", path: "/roadmap" },
    { title: "Code Review", icon: "code", path: "/code-review" },
    { title: "Daily Check-in", icon: "event_available", path: "/check-in" },
    { title: "Concept Library", icon: "library_books", path: "/concepts" },
    { title: "Community", icon: "groups", path: "/community" },
    { title: "Progress History", icon: "history", path: "/progress" },
  ]

  if (!mounted) return null

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 h-screen bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 flex flex-col z-50 transition-all duration-300 ease-in-out shadow-soft",
          isOpen ? "w-[260px] translate-x-0" : "w-[80px] -translate-x-full lg:translate-x-0"
        )}
      >
        {/* Toggle Button (Desktop) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-20 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-full p-1 hidden lg:flex items-center justify-center hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors z-[60] shadow-sm"
        >
          <span className={cn(
            "material-symbols-outlined text-sm transition-transform duration-300",
            isOpen ? "rotate-0" : "rotate-180"
          )}>
            chevron_left
          </span>
        </button>

        {/* Top Header & User Info - Non-scrollable */}
        <div className="p-6 pb-2 shrink-0">
          <Link href="/dashboard" className={cn(
            "flex items-center gap-3 text-primary dark:text-white mb-8 transition-all duration-300 group",
            !isOpen && "justify-center"
          )}>
            <div className="size-9 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] rounded-full flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
            </div>
            {isOpen && <h2 className="text-xl font-black tracking-tight whitespace-nowrap">DevMentor <span className="text-accent-coral">AI</span></h2>}
          </Link>

          <div className={cn(
            "flex items-center gap-3 mb-6 p-2 rounded-xl border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/50 overflow-hidden transition-all duration-300",
            !isOpen ? "justify-center border-none bg-transparent" : ""
          )}>
            <div 
              className="size-10 rounded-full bg-cover bg-center shrink-0 border-2 border-white dark:border-zinc-700 shadow-sm" 
              style={{ backgroundImage: `url(${session?.user?.image || "https://lh3.googleusercontent.com/a/default-user"})` }}
            />
            {isOpen && (
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-bold truncate">{session?.user?.name || "User"}</p>
                <p className="text-xs text-slate-500 font-medium italic">Self-Taught Dev</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation List - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-2 scrollbar-none">
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link 
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-full transition-all duration-200 whitespace-nowrap group relative",
                    isOpen ? "px-4 py-2.5" : "w-12 h-12 justify-center mx-auto",
                    isActive 
                      ? "bg-accent-coral text-white font-bold shadow-lg shadow-accent-coral/20" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-primary dark:hover:text-white"
                  )}
                  title={!isOpen ? item.title : ""}
                >
                  <span className={cn(
                    "material-symbols-outlined text-xl transition-transform group-hover:scale-110",
                    isActive ? "text-white" : "text-slate-500 group-hover:text-primary dark:group-hover:text-white"
                  )}>
                    {item.icon}
                  </span>
                  {isOpen && <span className="text-sm tracking-tight">{item.title}</span>}
                </Link>
              )
            })}
          </nav>

          {isOpen && (
            <div className="mt-8 p-5 bg-accent-coral/10 rounded-2xl border border-accent-coral/20 mb-6 bg-[#FDF0EF] dark:bg-accent-coral/5">
              <p className="text-[10px] font-black text-accent-coral uppercase tracking-widest mb-2">Upgrade Nudge</p>
              <p className="text-xs text-slate-700 dark:text-slate-300 mb-4 leading-relaxed font-medium">Get unlimited AI code reviews and personalized mentoring.</p>
              <button className="w-full py-2.5 bg-accent-coral text-white rounded-full text-[10px] font-black uppercase tracking-wider hover:brightness-110 transition-all shadow-md shadow-accent-coral/20">Go Pro</button>
            </div>
          )}
        </div>

        {/* Bottom Actions - Non-scrollable */}
        <div className="mt-auto p-6 pt-2 shrink-0 flex flex-col gap-1 border-t border-slate-100 dark:border-zinc-800">
          <Link 
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors group",
              isOpen ? "px-4 py-2" : "w-12 h-10 justify-center mx-auto"
            )}
            title={!isOpen ? "Settings" : ""}
          >
            <span className="material-symbols-outlined text-xl font-light group-hover:rotate-45 transition-transform duration-500">settings</span>
            {isOpen && <span className="text-sm font-medium">Settings</span>}
          </Link>
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className={cn(
              "flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors group",
              isOpen ? "px-4 py-2" : "w-12 h-10 justify-center mx-auto"
            )}
            title={!isOpen ? "Logout" : ""}
          >
            <span className="material-symbols-outlined text-xl font-light group-hover:translate-x-1 transition-transform">logout</span>
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
