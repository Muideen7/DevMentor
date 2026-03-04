"use client"

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const steps = [
    { title: "Your Goal", id: "step-1", path: "/onboarding/step-1" },
    { title: "Your Level", id: "step-2", path: "/onboarding/step-2" },
    { title: "Your Time", id: "step-3", path: "/onboarding/step-3" },
  ];

  const currentStepIndex = steps.findIndex(s => pathname.includes(s.id));

  return (
    <div className="min-h-screen bg-background-light py-12 px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-12 transform hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] flex items-center justify-center text-white shadow-soft">
            <span className="material-symbols-outlined text-3xl">diamond</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">DevMentor AI</h1>
        </div>

        {/* Progress Indicator */}
        <div className="w-full flex justify-between items-center mb-16 relative px-2">
          {/* Connecting Line */}
          <div className="absolute top-5 left-0 w-full h-[2px] bg-slate-200 -z-10"></div>
          
          {steps.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;

            return (
              <div key={step.id} className="flex flex-col items-center gap-3 bg-background-light px-2 relative z-10 transition-all duration-500">
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold ring-4 ring-background-light transition-all duration-300",
                    isActive ? "bg-accent-coral text-white scale-110 shadow-lg" : 
                    isCompleted ? "bg-primary text-white" : "bg-white text-slate-400 border border-slate-200"
                  )}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-sm">check</span>
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={cn(
                  "text-xs font-bold transition-colors duration-300",
                  isActive ? "text-accent-coral" : "text-slate-400"
                )}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Content */}
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </div>
    </div>
  );
}
