import React from "react";

interface TipsCardProps {
  title?: string;
  tips: string[];
  className?: string;
}

export default function TipsCard({
  title = "Dicas",
  tips,
  className = "",
}: TipsCardProps) {
  return (
    <div
      className={`bg-slate-100/90 rounded-2xl p-4 sm:p-5 border border-slate-200/70 text-left ${className}`}
    >
      <h3 className="text-base font-bold text-slate-900 mb-2.5">
        {title}
      </h3>
      <ul className="space-y-2 text-sm sm:text-base text-slate-800 font-medium">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-slate-900 font-bold select-none">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
