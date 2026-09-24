import React from "react";

interface SelectionCardProps {
  title: string;
  subtitle?: string;
  highlightText?: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  onClick?: () => void;
  className?: string;
}

export default function SelectionCard({
  title,
  subtitle,
  highlightText,
  icon,
  iconBgColor = "bg-red-600",
  onClick,
  className = "",
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3.5 p-3.5 bg-white hover:bg-slate-50 active:scale-[0.99] rounded-2xl border border-slate-200/90 shadow-xs hover:border-red-400 hover:shadow-md transition-all text-left cursor-pointer group ${className}`}
    >
      {/* Bloco com Ícone Colorido */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105 ${iconBgColor}`}
      >
        {icon}
      </div>

      {/* Textos Informativos */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-slate-900 group-hover:text-red-700 transition-colors leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm font-semibold text-slate-600 mt-0.5 leading-snug">
            {subtitle}
          </p>
        )}
        {highlightText && (
          <p className="text-sm sm:text-base font-black text-red-700 mt-1 leading-snug">
            {highlightText}
          </p>
        )}
      </div>
    </button>
  );
}
