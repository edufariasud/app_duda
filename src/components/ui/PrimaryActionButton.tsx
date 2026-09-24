import React from "react";

export type ActionButtonVariant = "primary-blue" | "danger-red" | "success-green" | "secondary-slate";

interface PrimaryActionButtonProps {
  label: string;
  onClick: () => void;
  variant?: ActionButtonVariant;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function PrimaryActionButton({
  label,
  onClick,
  variant = "primary-blue",
  icon,
  className = "",
  disabled = false,
}: PrimaryActionButtonProps) {
  const variantStyles = {
    "primary-blue":
      "bg-gradient-to-r from-[#1d4ed8] to-[#1e40af] hover:from-[#1e40af] hover:to-[#1d4ed8] text-white border-blue-400/30 shadow-lg",
    "danger-red":
      "bg-[#b91c1c] hover:bg-[#991b1b] text-white border-red-600/30 shadow-md",
    "success-green":
      "bg-green-50 hover:bg-green-100/90 text-[#15803d] border-green-300 shadow-xs",
    "secondary-slate":
      "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-xs",
  }[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 px-5 rounded-2xl active:scale-[0.98] font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all cursor-pointer border flex items-center justify-center gap-2 ${variantStyles} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="leading-snug text-center">{label}</span>
    </button>
  );
}
