"use client";

export function AboutSection() {
  return (
    <div className="flex flex-col gap-6 text-sm leading-relaxed text-slate-200">
      <div className="space-y-2">
        <p>
          My name is Ryan, and welcome to my website! I have held a strong passion for technology for as long as I can remember. While my education background is in psychology and neuroscience, I ultimately decided I wanted to take a step back, and pursue what I always loved. I have been working in IT for ~2 years, and I am currently working on developing my skills in cloud infrastructure and cloud security.
        </p>
        <p>
          When I&apos;m not refining a script or recovering a failed deployment, you will find me tuning
          the homelab, casting for bass, playing video games, or overcommitting to new hobbies. There is
          always another rabbit hole to explore.
        </p>
      </div>
      <div className="space-y-4">
        {[{ year: "2025", title: "Technical Support Engineer", detail: "Transitioning to cloud technologies and automation" },
          { year: "2024", title: "IT Help Desk Technician", detail: "First professional foray into supporting complex systems" },
          { year: "2019", title: "Studying Psychology", detail: "Started academic journey at Florida State University" }].map((entry) => (
          <div
            key={entry.year}
            className="flex gap-4 rounded-xl border border-white/5 bg-white/5 p-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 border border-purple-500/30 text-sm font-medium text-purple-300">
              {entry.year}
            </div>
            <div>
              <p className="text-base font-semibold text-white">{entry.title}</p>
              <p className="text-slate-300">{entry.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
