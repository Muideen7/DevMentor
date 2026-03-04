"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/Sidebar"
import TopBar from "@/components/layout/TopBar"
import RightPanel from "@/components/layout/RightPanel"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background-light dark:bg-zinc-950 overflow-hidden font-display">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <main 
        className={cn(
          "flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative scroll-smooth transition-all duration-300 ease-in-out",
          // Offset main content based on sidebar on desktop
          isSidebarOpen ? "lg:ml-[260px]" : "lg:ml-[80px]",
          // Offset main content based on right panel on large screens
          "xl:mr-[300px]"
        )}
      >
        <TopBar 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />

        <div className="flex-1 w-full p-6 md:p-8 lg:p-12 pb-24 max-w-screen-2xl mx-auto">
          {children}
        </div>

        {/* Floating AI Bubble */}
        <div className="fixed bottom-8 right-8 xl:right-[332px] z-30 transition-all duration-300">
          <div className="bg-white dark:bg-zinc-900 rounded-full p-4 shadow-2xl border-4 border-accent-coral cursor-pointer hover:scale-110 transition-transform group relative">
            <div className="absolute -top-12 -left-32 bg-white dark:bg-zinc-800 px-4 py-2 rounded-xl text-xs font-bold shadow-lg border border-slate-100 dark:border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300 pointer-events-none whitespace-nowrap">
              How can I help you? ✨
            </div>
            <span className="material-symbols-outlined text-accent-coral text-3xl font-bold">smart_toy</span>
          </div>
        </div>
      </main>

      {/* Right Sidebar - visible on xl+ */}
      <RightPanel />
    </div>
  )
}
