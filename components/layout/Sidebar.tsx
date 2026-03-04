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
    { title: "My Roadmap", icon: "map", path: "/dashboard/roadmap" },
    { title: "Code Review", icon: "code", path: "/dashboard/code-review" },
    { title: "Daily Check-in", icon: "event_available", path: "/dashboard/check-in" },
    { title: "Concept Library", icon: "library_books", path: "/dashboard/concepts" },
    { title: "Community", icon: "groups", path: "/dashboard/community" },
    { title: "Progress History", icon: "history", path: "/dashboard/progress" },
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
          "fixed top-0 left-0 h-screen bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 flex flex-col z-50 transition-all duration-300 ease-in-out",
          isOpen ? "w-[260px] translate-x-0" : "w-[80px] -translate-x-full lg:translate-x-0"
        )}
      >
        {/* Toggle Button (Desktop) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-20 bg-white border border-slate-200 rounded-full p-1 hidden lg:flex items-center justify-center hover:bg-slate-50 transition-colors z-[60]"
        >
          <span className={cn(
            "material-symbols-outlined text-sm transition-transform duration-300",
            isOpen ? "rotate-0" : "rotate-180"
          )}>
            chevron_left
          </span>
        </button>

        <div className="p-6">
          <div className={cn(
            "flex items-center gap-3 text-primary dark:text-white mb-8 transition-all duration-300",
            !isOpen && "justify-center"
          )}>
            <div className="size-8 bg-primary dark:bg-white text-white dark:text-primary rounded flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">terminal</span>
            </div>
            {isOpen && <h2 className="text-lg font-bold tracking-tight whitespace-nowrap">DevMentor AI</h2>}
          </div>

          <div className={cn(
            "flex items-center gap-3 mb-8 p-2 rounded-xl border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/50 overflow-hidden transition-all duration-300",
            !isOpen ? "justify-center border-none bg-transparent" : ""
          )}>
            <div 
              className="size-10 rounded-full bg-cover bg-center shrink-0 border-2 border-white shadow-sm" 
              style={{ backgroundImage: `url(${session?.user?.image || "https://lh3.googleusercontent.com/a/default-user"})` }}
            />
            {isOpen && (
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-bold truncate">{session?.user?.name || "User"}</p>
                <p className="text-xs text-slate-500">Self-Taught Dev</p>
              </div>
            )}
          </div>

          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link 
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-200 whitespace-nowrap group",
                    isActive 
                      ? "bg-accent-coral text-white font-medium shadow-md shadow-accent-coral/20" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
                  )}
                  title={!isOpen ? item.title : ""}
                >
                  <span className={cn(
                    "material-symbols-outlined text-lg",
                    isActive ? "text-white" : "text-slate-500 group-hover:text-primary"
                  )}>
                    {item.icon}
                  </span>
                  {isOpen && <span className="text-sm">{item.title}</span>}
                </Link>
              )
            })}
          </nav>

          {isOpen && (
            <div className="mt-8 p-4 bg-accent-coral/10 rounded-2xl border border-accent-coral/20">
              <p className="text-[10px] font-bold text-accent-coral uppercase tracking-wider mb-2">Upgrade Nudge</p>
              <p className="text-xs text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">Get unlimited AI code reviews and personalized mentoring.</p>
              <button className="w-full py-2 bg-accent-coral text-white rounded-full text-[10px] font-bold hover:brightness-110 transition-all shadow-sm">Go Pro</button>
            </div>
          )}
        </div>

        <div className="mt-auto p-6 flex flex-col gap-1 border-t border-slate-100 dark:border-zinc-800">
          <Link 
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors",
              !isOpen && "justify-center"
            )}
            title={!isOpen ? "Settings" : ""}
          >
            <span className="material-symbols-outlined text-lg font-light">settings</span>
            {isOpen && <span className="text-sm">Settings</span>}
          </Link>
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className={cn(
              "flex items-center gap-3 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors",
              !isOpen && "justify-center"
            )}
            title={!isOpen ? "Logout" : ""}
          >
            <span className="material-symbols-outlined text-lg font-light">logout</span>
            {isOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
