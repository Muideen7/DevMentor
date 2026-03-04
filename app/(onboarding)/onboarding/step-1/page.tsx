"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

const presets = [
  { id: "web", title: "Build Web Apps", icon: "browser_updated" },
  { id: "mobile", title: "Build Mobile Apps", icon: "smartphone" },
  { id: "ai", title: "Learn AI & ML", icon: "smart_toy" },
  { id: "backend", title: "Become a Backend Dev", icon: "dns" },
];

export default function Step1Page() {
  const router = useRouter();
  const { goal, setGoal } = useOnboardingStore();
  const [input, setInput] = useState(goal);

  const handleNext = () => {
    if (input.trim()) {
      setGoal(input);
      router.push("/onboarding/step-2");
    }
  };

  const handlePreset = (presetTitle: string) => {
    setInput(`I want to ${presetTitle.toLowerCase()}.`);
  };

  return (
    <>
      {/* Main Content Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-primary mb-4 leading-tight">What do you want to build?</h2>
        <p className="text-slate-500 text-lg">
          Be honest. There&apos;s no wrong answer. Your roadmap will be built around this.
        </p>
      </div>

      {/* Input Area */}
      <div className="w-full mb-10 transition-all duration-300">
        <textarea 
          className="w-full min-h-[160px] p-6 text-lg border-2 border-slate-200 rounded-2xl bg-white focus:border-accent-coral focus:ring-0 transition-all placeholder:text-slate-300 resize-none shadow-soft" 
          placeholder="e.g. I want to become a fullstack developer and build SaaS products. I've tried a few tutorials but never finished anything."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {/* Grid Options */}
      <div className="w-full mb-12 animate-in fade-in duration-500 delay-300">
        <p className="text-slate-500 text-lg mb-6 font-medium">Or choose a goal to start with:</p>
        <div className="grid grid-cols-2 gap-4">
          {presets.map((preset) => (
            <button 
              key={preset.id}
              onClick={() => handlePreset(preset.title)}
              className="flex flex-col items-center gap-4 p-6 bg-white border border-slate-100 rounded-2xl hover:border-accent-coral hover:bg-accent-coral/5 transition-all group shadow-sm hover:shadow-lg text-center"
            >
              <span className="material-symbols-outlined text-slate-400 group-hover:text-accent-coral group-hover:scale-110 transition-all text-3xl">
                {preset.icon}
              </span>
              <span className="font-semibold text-primary">{preset.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="w-full text-center pb-12">
        <button 
          onClick={handleNext}
          disabled={!input.trim()}
          className="w-full py-5 bg-primary text-white rounded-full text-xl font-bold hover:opacity-90 transition-all active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 group mb-4"
        >
          Continue to Step 2
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
        <p className="text-slate-400 text-sm">
          This takes about 3 minutes. Your roadmap generates at the end.
        </p>
      </div>
    </>
  );
}
