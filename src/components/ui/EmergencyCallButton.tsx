import React from "react";
import { Phone } from "lucide-react";

interface EmergencyCallButtonProps {
  number: string;
  name: string;
  description: string;
  variant?: "red" | "blue";
  className?: string;
}

export default function EmergencyCallButton({
  number,
  name,
  description,
  variant = "red",
  className = "",
}: EmergencyCallButtonProps) {
  const variantStyles = {
    red: {
      bg: "bg-red-600 hover:bg-red-700",
      subtext: "text-red-100",
    },
    blue: {
      bg: "bg-[#1d4ed8] hover:bg-[#1e40af]",
      subtext: "text-blue-100",
    },
  }[variant];

  return (
    <a
      href={`tel:${number}`}
      className={`flex items-center gap-3.5 w-full p-3.5 rounded-2xl ${variantStyles.bg} active:scale-[0.98] transition-all shadow-md cursor-pointer ${className}`}
    >
      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
        <Phone className="w-6 h-6 text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-base font-extrabold text-white tracking-wider">
          {number} — {name}
        </p>
        <p className={`text-sm font-semibold ${variantStyles.subtext}`}>
          {description}
        </p>
      </div>
    </a>
  );
}
