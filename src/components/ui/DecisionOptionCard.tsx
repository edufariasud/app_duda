import React from "react";

interface DecisionOptionCardProps {
  actionLabel: string;
  actionVariant?: "green" | "red" | "blue" | "amber";
  description: string;
  onClick?: () => void;
  className?: string;
}

export default function DecisionOptionCard({
  actionLabel,
  actionVariant = "green",
  description,
  onClick,
  className = "",
}: DecisionOptionCardProps) {
  const variantStyles = {
    green: {
      bg: "bg-[#15803d] hover:bg-[#166534]",
      hoverText: "group-hover:text-green-800",
    },
    red: {
      bg: "bg-[#b91c1c] hover:bg-[#991b1b]",
      hoverText: "group-hover:text-red-800",
    },
    blue: {
      bg: "bg-[#1d4ed8] hover:bg-[#1e40af]",
      hoverText: "group-hover:text-blue-800",
    },
    amber: {
      bg: "bg-[#ea580c] hover:bg-[#c2410c]",
      hoverText: "group-hover:text-amber-800",
    },
  }[actionVariant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3.5 p-2 bg-slate-100/90 hover:bg-slate-200/70 active:scale-[0.99] rounded-2xl border border-slate-200 shadow-xs transition-all text-left cursor-pointer group ${className}`}
    >
      {/* Bloco de Ação à Esquerda */}
      <div
        className={`w-24 h-16 rounded-xl ${variantStyles.bg} text-white font-extrabold text-base tracking-wider uppercase flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-102`}
      >
        {actionLabel}
      </div>

      {/* Descrição à Direita */}
      <div className="flex-1 pr-2">
        <span
          className={`text-sm sm:text-base font-bold text-slate-900 ${variantStyles.hoverText} transition-colors leading-snug block`}
        >
          {description}
        </span>
      </div>
    </button>
  );
}
