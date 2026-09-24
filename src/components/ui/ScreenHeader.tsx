import React from "react";
import { ChevronLeft } from "lucide-react";

interface ScreenHeaderProps {
  title: string;
  onBack: () => void;
  rightAction?: React.ReactNode;
  subtitle?: string;
}

export default function ScreenHeader({
  title,
  onBack,
  rightAction,
  subtitle,
}: ScreenHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 px-4 py-3.5 flex items-center justify-between shadow-xs">
      <button
        type="button"
        onClick={onBack}
        aria-label="Voltar para a tela anterior"
        className="p-1.5 -ml-1 text-slate-800 hover:text-red-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer shrink-0"
      >
        <ChevronLeft className="w-7 h-7 stroke-[2.5]" />
      </button>

      <div className="flex-1 text-center px-2">
        <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-wide leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm font-semibold text-slate-600 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      <div className="w-8 flex justify-end shrink-0">
        {rightAction || null}
      </div>
    </header>
  );
}
