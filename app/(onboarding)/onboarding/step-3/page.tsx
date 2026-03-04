"use client"

import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { cn } from "@/lib/utils";
import { useState } from "react";

const options = [
  { id: "casual", title: "5 to 10", label: "Casual Pace", desc: "Learning fits around a busy life. Progress is slow but consistent.", hours: 7 },
  { id: "steady", title: "10 to 20", label: "Steady Grind", desc: "You're serious but have other responsibilities. Solid weekly progress.", hours: 15 },
  { id: "focus", title: "20 to 30", label: "Full Focus", desc: "You're prioritizing this. Expect meaningful milestones every few weeks.", hours: 25 },
  { id: "allin", title: "30+", label: "All In", desc: "You're treating this like a job. Your roadmap will be accelerated accordingly.", hours: 40 },
];

import { useSession } from "next-auth/react";
import RoadmapLoading from "@/components/onboarding/RoadmapLoading";

export default function Step3Page() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const { goal, currentLevel, stack, hoursPerWeek, reset, setHours } = useOnboardingStore();
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!hoursPerWeek) return;
    setLoading(true);

    try {
      // 1. Complete onboarding in the database
      const profileResponse = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal,
          currentLevel,
          stack,
          hoursPerWeek,
        }),
      });

      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
        throw new Error(profileData.error || "Failed to save profile");
      }

      // 2. Refresh session status
      await update({
        user: {
          ...session?.user,
          onboardingComplete: true
        }
      });

      // 3. Trigger roadmap generation via AI
      const roadmapResponse = await fetch("/api/ai/roadmap", {
        method: "POST",
      });

      const roadmapData = await roadmapResponse.json();

      if (!roadmapResponse.ok || !roadmapData.success) {
        throw new Error(roadmapData.error || "Failed to generate roadmap");
      }

      // Final success
      reset();
      router.push("/dashboard");

    } catch (error: any) {
      console.error("Onboarding error:", error);
      alert(error.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (loading) return <RoadmapLoading />;

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">How much time can you give it?</h1>
        <p className="text-slate-500 text-lg leading-relaxed max-w-[540px] mx-auto">
          There&apos;s no wrong answer. Your roadmap adjusts to what&apos;s realistic for your life, not what looks impressive on paper.
        </p>
      </div>

      {/* Availability Selector */}
      <div className="w-full space-y-4 mb-10">
        {options.map((opt) => (
          <label key={opt.id} className="group cursor-pointer block">
            <input 
              className="hidden peer" 
              name="availability" 
              type="radio" 
              checked={hoursPerWeek === opt.hours}
              onChange={() => setHours(opt.hours)}
            />
            <div className="flex items-start gap-4 p-5 border-2 border-slate-100 rounded-2xl bg-white peer-checked:border-accent-coral peer-checked:bg-coral-tint transition-all hover:border-slate-300">
              <div className="w-6 h-6 rounded-full border-2 border-slate-200 mt-1 flex items-center justify-center group-hover:border-accent-coral peer-checked:border-accent-coral">
                <div className={cn("w-3 h-3 rounded-full bg-accent-coral opacity-0 transition-opacity", hoursPerWeek === opt.hours && "opacity-100")}></div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{opt.title}</span>
                  <span className={cn(
                    "text-xs font-bold px-2 py-0.5 rounded-full",
                    hoursPerWeek === opt.hours ? "bg-accent-coral/20 text-accent-coral" : "bg-slate-100 text-slate-500"
                  )}>
                    {opt.label}
                  </span>
                </div>
                <p className="text-slate-500 text-sm mt-1">{opt.desc}</p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Commitment Summary Card */}
      <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-8 mb-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <h3 className="text-slate-400 text-xs font-bold mb-6 uppercase tracking-widest">Based on your selections...</h3>
        <ul className="space-y-4">
          <li className="flex items-center gap-3">
            <div className="w-5 h-5 bg-accent-coral/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[12px] text-accent-coral font-bold">check</span>
            </div>
            <span className="text-slate-700 font-medium">Goal: <span className="text-slate-900 font-bold underline decoration-accent-coral/30">{goal || "Build Web Apps"}</span></span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-5 h-5 bg-accent-coral/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[12px] text-accent-coral font-bold">check</span>
            </div>
            <span className="text-slate-700 font-medium">Starting at <span className="text-slate-900 font-bold underline decoration-accent-coral/30">{currentLevel || "the basics"}</span> with <span className="text-slate-900 font-bold underline decoration-accent-coral/30">{stack.join(", ") || "various technologies"}</span></span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-5 h-5 bg-accent-coral/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[12px] text-accent-coral font-bold">check</span>
            </div>
            <span className="text-slate-700 font-medium">Paced for <span className="text-slate-900 font-bold underline decoration-accent-coral/30">{hoursPerWeek || "10"} hours per week</span></span>
          </li>
        </ul>
      </div>

      {/* Footer Navigation */}
      <div className="w-full flex flex-col items-center gap-6 pb-12">
        <button 
          onClick={handleGenerate}
          disabled={loading || !hoursPerWeek}
          className="w-full bg-primary text-white py-5 rounded-full text-lg font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              Generating your roadmap... <span className="animate-spin material-symbols-outlined">sync</span>
            </span>
          ) : (
            <>
              Generate My Roadmap
              <span className="material-symbols-outlined text-accent-coral font-bold">auto_awesome</span>
            </>
          )}
        </button>
        <button 
          onClick={() => router.back()}
          className="text-slate-400 text-sm font-bold hover:text-primary transition-colors"
        >
          ← Back to Step 2
        </button>
      </div>
    </>
  );
}
