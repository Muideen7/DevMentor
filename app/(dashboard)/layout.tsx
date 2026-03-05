"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/Sidebar"
import TopBar from "@/components/layout/TopBar"
import RightPanel from "@/components/layout/RightPanel"
import FloatingChat from "@/components/dashboard/FloatingChat"
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

        {/* Floating AI Chat Assistant */}
        <FloatingChat />
      </main>

      {/* Right Sidebar - visible on xl+ */}
      <RightPanel />
    </div>
  )
}
