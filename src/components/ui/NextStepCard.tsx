import React from "react";
import { ChevronRight } from "lucide-react";

interface NextStepCardProps {
  nextStep: string;
  className?: string;
}

export default function NextStepCard({ nextStep, className = "" }: NextStepCardProps) {
  return (
    <div
      className={`w-full rounded-2xl border border-blue-200/80 bg-blue-50/80 p-4 flex items-start gap-3 shadow-xs ${className}`}
    >
      <div className="w-7 h-7 rounded-lg bg-[#1d4ed8]/15 flex items-center justify-center shrink-0 mt-0.5">
        <ChevronRight className="w-4 h-4 text-[#1d4ed8]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-blue-900 mb-0.5 uppercase tracking-wide">
          Próximo Passo Crítico
        </p>
        <p className="text-sm sm:text-base font-medium text-blue-800 leading-snug">
          {nextStep}
        </p>
      </div>
    </div>
  );
}
