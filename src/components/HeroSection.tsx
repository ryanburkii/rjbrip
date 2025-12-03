"use client";

import Image from "next/image";

type HeroSectionProps = {
  openWindow?: (id: string) => void;
};

export function HeroSection({ openWindow }: HeroSectionProps) {
  const scrollToWindow = (target: string) => {
    openWindow?.(target);
  };

  return (
    <div className="flex flex-col gap-6 text-white">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Ryan Berke
          </h1>
          <p className="text-lg" style={{ color: '#8BE9FD' }}>
            IT Professional and Aspiring Cloud Engineer
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#F8F8F2' }}>
            I am a dedicated IT professional with a passion for technology and I am always looking to learn new things. Currently, my main focus is on cloud infrastructure and cloud security.
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            <button
              onClick={() => scrollToWindow("projects")}
              className="rounded-lg bg-purple-500/20 border border-purple-500/30 px-4 py-2 text-sm font-medium text-purple-300 transition-all hover:bg-purple-500/30"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToWindow("contact")}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-white/20"
            >
              Get in Touch
            </button>
          </div>

          <div className="space-y-4 mt-6">
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Who I Am</h2>
              <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
                <p>
                My name is Ryan, and welcome to my website! This website is a work in progress, but it was inspired by primarily by <a href="https://posthog.com/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors underline">Posthog&apos;s website</a>. I plan to add more features and functionality to this website, and hopefully one day it will be comparable to Posthog&apos;s website.
                </p>
                <p>
                I have held a strong passion for technology for as long as I can remember. While my education background is in psychology and neuroscience, I ultimately decided I wanted to take a step back, and pursue what I always loved. I have been working in IT for ~2 years, and I am currently working on developing my skills in cloud infrastructure and cloud security. When I&apos;m not working, I enjoy working on my homelab until something breaks, fishing, playing video games, and attending music festivals. Occasionally, I get the urge to spring into a new hobby, and spend way more money than I should on it.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-80 space-y-4">
          <div className="relative overflow-hidden rounded-2xl border border-white/5 p-5" style={{ backgroundColor: 'rgba(68, 71, 90, 0.4)' }}>
            <div className="relative h-64 overflow-hidden rounded-xl border border-white/5">
              <Image
                src="/profile-photo.jpg"
                alt="Ryan"
                fill
                sizes="(max-width: 1024px) 280px, 320px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/5 p-5 mt-25" style={{ backgroundColor: 'rgba(68, 71, 90, 0.4)' }}>
            <div className="relative h-48 overflow-hidden rounded-xl border border-white/5">
              <Image
                src="/about.JPG"
                alt="About"
                fill
                sizes="(max-width: 1024px) 280px, 320px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white mb-4">My Journey</h2>
        <div className="space-y-4">
          {[
            { year: "2025", title: "Technical Support Engineer", detail: "Transitioning to cloud technologies and automation" },
            { year: "2024", title: "IT Help Desk Technician", detail: "First professional foray into supporting complex systems" },
            { year: "2019", title: "Studying Psychology", detail: "Started academic journey at Florida State University" }
          ].map((entry) => (
            <div
              key={entry.year}
              className="flex gap-4 rounded-xl border border-white/5 bg-white/5 p-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 border border-purple-500/30 text-sm font-medium text-purple-300 flex-shrink-0">
                {entry.year}
              </div>
              <div>
                <p className="text-base font-semibold text-white">{entry.title}</p>
                <p className="text-sm text-slate-400">{entry.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
