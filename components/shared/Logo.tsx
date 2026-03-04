import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 group transition-all", className)}>
      <div className="bg-[#1A1A1A] p-2 rounded-full text-white shadow-soft group-hover:scale-110 transition-transform flex items-center justify-center">
        <span className="material-symbols-outlined block text-[1.5rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
          diamond
        </span>
      </div>
      {!iconOnly && (
        <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">
          DevMentor <span className="text-accent-coral">AI</span>
        </span>
      )}
    </Link>
  );
}
