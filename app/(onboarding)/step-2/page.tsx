"use client"

import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { cn } from "@/lib/utils";

const levels = [
  { 
    id: "beginner", 
    title: "Complete Beginner", 
    desc: "I've watched a few videos but haven't really written code yet.",
    icon: "potted_plant"
  },
  { 
    id: "basics", 
    title: "Know the Basics", 
    desc: "I understand HTML, CSS, and basic JavaScript but haven't built real projects.",
    icon: "menu_book"
  },
  { 
    id: "projects", 
    title: "Built Small Projects", 
    desc: "I've finished a few tutorials and built something simple, but I'm not consistent.",
    icon: "deployed_code"
  },
  { 
    id: "intermediate", 
    title: "Intermediate", 
    desc: "I can build things but I lack structure, depth, and direction.",
    icon: "settings"
  },
];

const techStacks = [
  "Web Apps", "Mobile Apps", "AI & ML", "Backend & APIs", "Data & Analytics", "Game Dev"
];

export default function Step2Page() {
  const router = useRouter();
  const { currentLevel, setLevel, stack, setStack } = useOnboardingStore();

  const toggleStack = (item: string) => {
    if (stack.includes(item)) {
      setStack(stack.filter(s => s !== item));
    } else {
      setStack([...stack, item]);
    }
  };

  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-primary mb-3 tracking-tight">Where are you right now?</h2>
        <p className="text-slate-500 text-lg">Be honest. This helps your roadmap start at exactly the right place.</p>
      </div>

      {/* Experience Level Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-10">
        {levels.map((level) => (
          <button 
            key={level.id}
            onClick={() => setLevel(level.id)}
            className={cn(
              "flex flex-col items-start p-6 rounded-2xl text-left transition-all relative border-2",
              currentLevel === level.id 
                ? "bg-coral-tint border-accent-coral ring-1 ring-accent-coral/20" 
                : "bg-white border-slate-100 hover:border-slate-300 shadow-sm"
            )}
          >
            {currentLevel === level.id && (
              <div className="absolute top-4 right-4 bg-accent-coral text-white rounded-full p-0.5 animate-in zoom-in duration-300">
                <span className="material-symbols-outlined text-xs">check</span>
              </div>
            )}
            <span className={cn(
              "material-symbols-outlined mb-4 transition-transform group-hover:scale-110",
              currentLevel === level.id ? "text-accent-coral" : "text-slate-400"
            )}>
              {level.icon}
            </span>
            <h3 className="font-bold text-lg mb-1">{level.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{level.desc}</p>
          </button>
        ))}
      </div>

      {/* Tech Stack Selector */}
      <div className="w-full mb-12">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 px-1">What interests you?</h4>
        <div className="flex flex-wrap gap-3">
          {techStacks.map((item) => (
            <button 
              key={item}
              onClick={() => toggleStack(item)}
              className={cn(
                "px-5 py-2.5 rounded-full border text-sm font-semibold transition-all",
                stack.includes(item) 
                  ? "border-accent-coral bg-coral-tint text-accent-coral shadow-sm" 
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full flex items-center justify-between mt-4 pb-12">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 font-bold hover:text-primary transition-colors px-4 py-2"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back
        </button>
        <button 
          onClick={() => router.push("/onboarding/step-3")}
          disabled={!currentLevel || stack.length === 0}
          className="bg-primary text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          Continue to Step 3
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>
    </>
  );
}
