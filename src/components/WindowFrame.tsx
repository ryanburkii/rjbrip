"use client";

import type { ReactNode, PointerEventHandler } from "react";

type WindowFrameProps = {
  title: string;
  subtitle?: string;
  badge?: string;
  accent?: string;
  className?: string;
  actions?: ReactNode;
  onDragStart?: PointerEventHandler<HTMLDivElement>;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  children: ReactNode;
};

export function WindowFrame({
  title,
  subtitle,
  badge,
  accent = "from-violet-500/80 to-sky-500/60",
  className = "",
  actions,
  onDragStart,
  onClose,
  onMinimize,
  onMaximize,
  children,
}: WindowFrameProps) {

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-slate-950/80 shadow-2xl backdrop-blur-xl ${className}`}
    >
      <div
        className="flex items-center justify-between border-b border-white/5 px-4 py-3 select-none cursor-move flex-shrink-0"
        onPointerDown={onDragStart}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" onPointerDown={(e) => e.stopPropagation()}>
            <button
              onClick={onClose}
              className="h-2.5 w-2.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors group relative"
              aria-label="Close"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[0.5rem] text-red-900 opacity-0 group-hover:opacity-100">×</span>
            </button>
            <button
              onClick={onMinimize}
              className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors group relative"
              aria-label="Minimize"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[0.5rem] text-yellow-900 opacity-0 group-hover:opacity-100">−</span>
            </button>
            <button
              onClick={onMaximize}
              className="h-2.5 w-2.5 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors group relative"
              aria-label="Maximize"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[0.5rem] text-green-900 opacity-0 group-hover:opacity-100">+</span>
            </button>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">
              {title}
            </p>
            {subtitle && (
              <p className="text-[0.65rem] text-slate-500">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="rounded-md bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[0.65rem] font-medium text-purple-300">
              {badge}
            </span>
          )}
          {actions && (
            <div onPointerDown={(event) => event.stopPropagation()}>{actions}</div>
          )}
        </div>
      </div>
      <div className="px-4 py-4 flex-1 flex flex-col min-h-0">
        {accent && (
          <div
            className={`mb-4 h-px w-full bg-gradient-to-r ${accent} flex-shrink-0`}
          />
        )}
        {children}
      </div>
    </div>
  );
}

