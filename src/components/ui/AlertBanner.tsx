import React from "react";
import { TriangleAlert, HeartPulse, ShieldCheck, Info } from "lucide-react";

type AlertVariant = "warning" | "danger" | "info" | "dark";

interface AlertBannerProps {
  title: string;
  description: string;
  variant?: AlertVariant;
  icon?: React.ReactNode;
  className?: string;
}

export default function AlertBanner({
  title,
  description,
  variant = "warning",
  icon,
  className = "",
}: AlertBannerProps) {
  const variantConfig = {
    warning: {
      container: "bg-[#fef3c7] border-amber-300 text-amber-950",
      title: "text-sm sm:text-base font-black text-amber-950 uppercase tracking-tight",
      description: "text-sm font-bold text-slate-900",
      defaultIcon: <TriangleAlert className="w-7 h-7 text-amber-600 shrink-0 mt-0.5" />,
    },
    danger: {
      container: "bg-red-50 border-red-200 text-red-950",
      title: "text-sm sm:text-base font-bold text-red-950",
      description: "text-sm font-medium text-red-800",
      defaultIcon: (
        <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shrink-0 text-white shadow-xs">
          <HeartPulse className="w-6 h-6 animate-pulse" />
        </div>
      ),
    },
    info: {
      container: "bg-blue-50 border-blue-200 text-blue-950",
      title: "text-sm sm:text-base font-bold text-blue-950",
      description: "text-sm font-medium text-blue-800",
      defaultIcon: <Info className="w-7 h-7 text-blue-600 shrink-0 mt-0.5" />,
    },
    dark: {
      container: "bg-slate-900 border-slate-800 text-white",
      title: "text-base font-bold text-white",
      description: "text-sm text-slate-300 leading-relaxed",
      defaultIcon: <ShieldCheck className="w-7 h-7 text-emerald-400 shrink-0 mt-0.5" />,
    },
  }[variant];

  return (
    <div
      className={`border rounded-2xl p-4 shadow-xs text-left ${variantConfig.container} ${className}`}
    >
      <div className="flex items-start gap-3">
        {icon !== undefined ? icon : variantConfig.defaultIcon}
        <div className="flex-1">
          <h3 className={`${variantConfig.title} leading-snug`}>{title}</h3>
          <p className={`${variantConfig.description} mt-1 leading-snug`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
