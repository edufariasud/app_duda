import React from "react";

export interface SpecItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface ClinicalSpecsCardProps {
  title: string;
  items: SpecItem[];
  variant?: "red" | "purple" | "blue";
  className?: string;
}

export default function ClinicalSpecsCard({
  title,
  items,
  variant = "red",
  className = "",
}: ClinicalSpecsCardProps) {
  const labelColor = {
    red: "text-red-700",
    purple: "text-purple-700",
    blue: "text-[#1d4ed8]",
  }[variant];

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3 ${className}`}
    >
      <h3 className="text-base font-bold text-slate-900 tracking-tight">
        {title}
      </h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className={`text-sm font-black ${labelColor} shrink-0`}>
              {item.label}:
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
