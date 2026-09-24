"use client";

import React, { useState } from "react";
import { ChevronDown, Lightbulb } from "lucide-react";

interface WhyAccordionProps {
  label?: string;
  rationale: string;
  defaultOpen?: boolean;
  className?: string;
}

export default function WhyAccordion({
  label = "Por que fazer isso? (Justificativa médica)",
  rationale,
  defaultOpen = false,
  className = "",
}: WhyAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`w-full rounded-2xl border border-slate-200/80 bg-slate-50/90 overflow-hidden transition-all shadow-xs ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-100/80 active:bg-slate-100 transition-colors cursor-pointer group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <span className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-amber-900 transition-colors leading-tight">
            {label}
          </span>
        </div>

        <ChevronDown
          className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-amber-700" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-1 border-t border-slate-200/60 bg-white/70">
          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed mt-1">
            {rationale}
          </p>
        </div>
      )}
    </div>
  );
}
