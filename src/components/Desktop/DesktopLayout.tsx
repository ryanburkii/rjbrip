"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ContactSection } from "@/components/ContactSection";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { WindowFrame } from "@/components/WindowFrame";

type AppComponentProps = {
  openWindow: (id: string) => void;
};

type AppDefinition = {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  description: string;
  icon: string;
  accent: string;
  size: { width: number; height: number };
  position: { x: number; y: number };
  component: (props: AppComponentProps) => ReactNode;
};

type WindowInstance = AppDefinition & {
  zIndex: number;
  size: { width: number; height: number };
  position: { x: number; y: number };
};

const applications: AppDefinition[] = [
  {
    id: "welcome",
    title: "Welcome",
    subtitle: "Who I am",
    badge: "Home",
    description: "Intro",
    icon: "👤",
    accent: "from-purple-500/50 to-purple-600/30",
    size: { width: 680, height: 600 },
    position: { x: 80, y: 120 },
    component: ({ openWindow }) => <HeroSection openWindow={openWindow} />,
  },
  {
    id: "skills",
    title: "Skills",
    subtitle: "Capabilities",
    description: "Tech Stack",
    icon: "⚡",
    accent: "from-purple-500/40 to-violet-500/30",
    size: { width: 520, height: 360 },
    position: { x: 220, y: 240 },
    component: () => <SkillsSection />, 
  },
  {
    id: "projects",
    title: "Projects",
    subtitle: "Recent Projects",
    description: "Portfolio",
    icon: "📁",
    accent: "from-purple-500/40 to-purple-600/30",
    size: { width: 540, height: 520 },
    position: { x: 120, y: 200 },
    component: () => <ProjectsSection />, 
  },
  {
    id: "contact",
    title: "Contact",
    subtitle: "Get in touch",
    badge: "Available",
    description: "Connect",
    icon: "✉",
    accent: "from-purple-500/40 to-slate-500/20",
    size: { width: 520, height: 480 },
    position: { x: 200, y: 160 },
    component: () => <ContactSection />, 
  },
];

const menuSections = [
  {
    label: "",
    items: [
      { label: "About", id: "welcome" },
      { label: "Skills", id: "skills" },
      { label: "Projects", id: "projects" },
      { label: "Contact", id: "contact" },
    ],
  },
];

type MenuBarProps = {
  onMenuSelect: (id: string) => void;
  time: string;
};

function MenuBar({ onMenuSelect, time }: MenuBarProps) {
  return (
    <nav className="fixed inset-x-4 top-4 z-50 flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/90 px-4 py-2 backdrop-blur-xl shadow-lg">
      <div className="flex items-center gap-4 text-xs">
        <div className="relative w-6 h-6 flex-shrink-0">
          <Image
            src="/logo-nobg.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-sm font-medium text-slate-300">Portfolio</span>
        {menuSections.map((section) => (
          <div key={section.label} className="flex items-center gap-2">
            <span className="text-[0.55rem] tracking-[0.6em] text-slate-400" aria-label={section.label}>
              {section.label}
            </span>
            <div className="flex gap-2">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onMenuSelect(item.id)}
                  className="rounded-lg bg-white/5 hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/20 px-3 py-1 text-[0.7rem] font-medium text-slate-400 hover:text-purple-300 transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 text-[0.6rem] tracking-[0.4em] text-slate-400">
        <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
        {time}
      </div>
    </nav>
  );
}

type DesktopWindowProps = {
  app: WindowInstance;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onPositionChange: (id: string, x: number, y: number) => void;
  onSizeChange: (id: string, width: number, height: number) => void;
  children: ReactNode;
};

function DesktopWindow({
  app,
  onClose,
  onFocus,
  onPositionChange,
  onSizeChange,
  children,
}: DesktopWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const resizeStartSize = useRef({ width: 0, height: 0 });
  const isDraggingRef = useRef(false);
  
  const MIN_WIDTH = 320;
  const MIN_HEIGHT = 260;
  const MIN_X = 20;
  const MIN_Y = 70;

  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = app.position.x;
    const startTop = app.position.y;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (windowRef.current) {
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;
        windowRef.current.style.left = `${startLeft + deltaX}px`;
        windowRef.current.style.top = `${startTop + deltaY}px`;
      }
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      isDraggingRef.current = false;
      const deltaX = upEvent.clientX - startX;
      const deltaY = upEvent.clientY - startY;
      const newX = Math.max(MIN_X, startLeft + deltaX);
      const newY = Math.max(MIN_Y, startTop + deltaY);
      onPositionChange(app.id, newX, newY);

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <div
      ref={windowRef}
      onMouseDown={() => onFocus(app.id)}
      className="absolute rounded-[38px]"
      style={{
        left: app.position.x,
        top: app.position.y,
        width: app.size.width,
        height: app.size.height,
        zIndex: app.zIndex,
      }}
    >
      <WindowFrame
        title={app.title}
        subtitle={app.subtitle}
        badge={app.badge}
        accent={app.accent}
        className="h-full flex flex-col"
        onDragStart={handleDragStart}
        onClose={() => onClose(app.id)}
        onMinimize={() => {
          // Minimize functionality - could hide the window
          console.log('Minimize', app.id);
        }}
        onMaximize={() => {
          // Maximize functionality - could expand to full screen
          console.log('Maximize', app.id);
        }}
      >
        <div className="flex-1 overflow-auto text-sm min-h-0">{children}</div>
      </WindowFrame>
      
      <div
        onPointerDown={(event) => {
          event.stopPropagation();
          resizeStartSize.current = { width: app.size.width, height: app.size.height };
          
          const startX = event.clientX;
          const startY = event.clientY;
          
          const handlePointerMove = (e: PointerEvent) => {
            if (windowRef.current) {
              const deltaX = e.clientX - startX;
              const deltaY = e.clientY - startY;
              const newWidth = Math.max(MIN_WIDTH, resizeStartSize.current.width + deltaX);
              const newHeight = Math.max(MIN_HEIGHT, resizeStartSize.current.height + deltaY);
              windowRef.current.style.width = `${newWidth}px`;
              windowRef.current.style.height = `${newHeight}px`;
            }
          };
          
          const handlePointerUp = (e: PointerEvent) => {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            const newWidth = Math.max(MIN_WIDTH, resizeStartSize.current.width + deltaX);
            const newHeight = Math.max(MIN_HEIGHT, resizeStartSize.current.height + deltaY);
            onSizeChange(app.id, newWidth, newHeight);
            
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
          };
          
          window.addEventListener('pointermove', handlePointerMove);
          window.addEventListener('pointerup', handlePointerUp);
        }}
        className="absolute bottom-4 right-4 flex h-6 w-6 cursor-se-resize items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[0.65rem] text-slate-400 transition-all hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300 z-10"
        aria-label="Resize window"
      >
        ⇲
      </div>
    </div>
  );
}

export function DesktopLayout() {
  const [windows, setWindows] = useState<WindowInstance[]>(() => {
    const defaultApp = applications[0];
    return [
      {
        ...defaultApp,
        zIndex: 1000,
      },
    ];
  });

  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = useMemo(
    () =>
      currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [currentTime]
  );

  const bringToFront = (id: string) => {
    setWindows((prev) => {
      const highestZ = Math.max(...prev.map((w) => w.zIndex), 1000);
      return prev.map((window) =>
        window.id === id ? { ...window, zIndex: highestZ + 1 } : window
      );
    });
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((window) => window.id !== id));
  };

  const openWindow = (appId: string) => {
    setWindows((prev) => {
      const existing = prev.find((window) => window.id === appId);
      const highestZ = Math.max(...prev.map((w) => w.zIndex), 1000);
      if (existing) {
        return prev.map((window) =>
          window.id === appId ? { ...window, zIndex: highestZ + 1 } : window
        );
      }

      const app = applications.find((item) => item.id === appId);
      if (!app) return prev;

      return [
        ...prev,
        {
          ...app,
          zIndex: highestZ + 1,
        } as WindowInstance,
      ];
    });
  };

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === id ? { ...window, position: { x, y } } : window
      )
    );
  };

  const updateWindowSize = (id: string, width: number, height: number) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === id ? { ...window, size: { width, height } } : window
      )
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <MenuBar onMenuSelect={openWindow} time={timeString} />

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full">
        <div className="absolute left-10 top-24 h-96 w-96 rounded-full bg-gradient-to-br from-purple-600/30 to-purple-800/20 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500/20 to-slate-800/30 blur-3xl" />
      </div>

      <div className="relative z-10 block pt-20">
        <div className="relative min-h-[calc(100vh-120px)] px-4">
          {windows.map((window) => (
            <DesktopWindow
              key={window.id}
              app={window}
              onClose={closeWindow}
              onFocus={bringToFront}
              onPositionChange={updateWindowPosition}
              onSizeChange={updateWindowSize}
            >
              {window.component({ openWindow })}
            </DesktopWindow>
          ))}
        </div>
      </div>
    </div>
  );
}
