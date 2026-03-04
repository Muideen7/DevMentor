"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface TopBarProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export default function TopBar({ isSidebarOpen, toggleSidebar }: TopBarProps) {
  const { data: session } = useSession()

  return (
    <header className={cn(
      "sticky top-0 z-30 bg-background-light/80 backdrop-blur-md border-b border-slate-200/50 px-6 py-4 flex items-center justify-between transition-all duration-300",
      // On desktop, the main content is offset by the sidebar width
      // We'll handle that in the layout, but TopBar should match the content width
    )}>
      <div className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 px-4 py-2 rounded-full focus-within:ring-2 focus-within:ring-accent-coral/20 transition-all shadow-sm">
          <span className="text-slate-400 material-symbols-outlined text-xl">search</span>
          <input 
            type="text" 
            placeholder="Search concepts, bugs, or roadmaps..." 
            className="bg-transparent border-none outline-none text-xs placeholder:text-slate-400 w-48 md:w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden sm:flex size-10 rounded-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 items-center justify-center text-slate-500 hover:text-primary transition-colors hover:shadow-sm">
          <span className="material-symbols-outlined text-xl">notifications</span>
        </button>
        
        <Link 
          href="/dashboard/roadmap" 
          className="bg-primary dark:bg-white text-white dark:text-primary px-5 py-2 rounded-full text-[10px] font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
          Generate New Roadmap
        </Link>
      </div>
    </header>
  )
}
