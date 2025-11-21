"use client";

import Image from "next/image";

type Project = {
  title: string;
  description: string;
  image: string;
  github: string;
};

const projects: Project[] = [
  {
    title: "Homelab",
    description:
      "My mini server stack consisting of 2 Proxmox servers, a small Unifi stack, and a custom built NAS. Current services: Plex, NextCloud, game servers, and more.",
    image: "/homelab.jpeg",
    github: "https://github.com/ryanburkii/homelab",
  },
  {
    title: "Portfolio Website",
    description:
      "This website! I plan to expand this experience with more information about my projects and to showcase any future rabbit holes I fall down.",
    image: "/port.png",
    github: "https://github.com/ryanburkii/myportfolio",
  },
  {
    title: "LatiArch",
    description:
      "My custom Arch Linux & Hyprland setup. This project is forked from Omarchy, however I plan to add my own set of features.",
    image: "/latiarch.png",
    github: "https://github.com/ryanburkii/latiarch",
  },
];

export function ProjectsSection() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="flex flex-col rounded-2xl border border-white/5 bg-slate-900/60 transition-all hover:-translate-y-1"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-t-2xl border-b border-white/5">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h3 className="text-lg font-semibold text-white">{project.title}</h3>
              <p className="text-sm text-slate-400">{project.description}</p>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300"
              >
                View Source
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
