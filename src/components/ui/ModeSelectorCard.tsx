import React from "react";

interface ModeSelectorCardProps {
  label: string;
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export default function ModeSelectorCard({
  label,
  title,
  icon,
  isActive,
  onClick,
  className = "",
}: ModeSelectorCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-200 text-left cursor-pointer ${
        isActive
          ? "bg-slate-800/80 border-red-500/80 shadow-md shadow-red-500/10 ring-1 ring-red-500/50"
          : "bg-slate-900/40 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/40 opacity-75 hover:opacity-100"
      } ${className}`}
    >
      <div
        className={`p-2.5 rounded-xl transition-colors ${
          isActive
            ? "bg-red-600/20 text-red-400"
            : "bg-slate-800 text-slate-400"
        }`}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
          {label}
        </span>
        <span className="text-sm font-extrabold text-white tracking-wide uppercase">
          {title}
        </span>
      </div>
    </button>
  );
}
