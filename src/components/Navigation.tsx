"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed inset-x-4 top-4 z-50">
      <div
        className={`mx-auto flex max-w-6xl flex-col gap-3 rounded-[28px] border border-white/10 bg-slate-950/50 px-5 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.8)] backdrop-blur-3xl transition duration-300 ${
          isScrolled ? "bg-slate-950/80 backdrop-blur-2xl" : "bg-slate-950/60"
        }`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200 transition hover:bg-white/10"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-slate-800">
              <Image src="/logo-nobg.png" alt="logo" fill className="object-cover" />
            </div>
            rjb.rip
          </button>

          <div className="hidden items-center gap-6 uppercase tracking-[0.3em] text-xs text-slate-400 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>

        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-slate-600" />
            System Ready
          </div>
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="rounded-full border border-white/20 px-3 py-1 uppercase tracking-[0.3em] text-[0.6rem] text-slate-300"
          >
            {isMobileMenuOpen ? "Close" : "Apps"}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-[0_10px_40px_rgba(15,23,42,0.6)] backdrop-blur-3xl">
            <div className="flex flex-col gap-3 uppercase tracking-[0.3em] text-sm text-slate-300">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="rounded-2xl border border-white/10 px-3 py-2 text-left transition hover:border-violet-500/70 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
