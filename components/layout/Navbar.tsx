"use client"

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-primary/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                className="text-sm font-medium hover:text-accent-coral transition-colors" 
                href={link.href}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/signup" 
              className="hidden sm:block bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Get Started Free
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden flex items-center justify-center p-2 text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-white md:hidden transition-all duration-300 ease-in-out transform",
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full pt-24 px-8 space-y-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              className="text-2xl font-bold text-primary active:text-accent-coral translate-y-4 opacity-0 transition-all duration-500 delay-100"
              href={link.href}
              style={{ 
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMenuOpen ? 1 : 0
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-8 pt-auto pb-12">
            <Link 
              href="/signup" 
              className="block w-full bg-primary text-white text-center py-4 rounded-full text-lg font-bold shadow-lg shadow-primary/20"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Learning Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
