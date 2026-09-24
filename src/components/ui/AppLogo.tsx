import React from "react";

interface AppLogoProps {
  className?: string;
  size?: number;
}

export default function AppLogo({ className = "w-36 h-36", size }: AppLogoProps) {
  return (
    <div className="relative group cursor-default">
      <svg
        className={`${className} drop-shadow-[0_10px_25px_rgba(239,68,68,0.25)] transition-transform duration-300 hover:scale-105`}
        style={size ? { width: size, height: size } : undefined}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Logo SBV + APH: Coração com traçado de ECG e Cruz de Emergência"
      >
        {/* Contorno do Coração */}
        <path
          d="M100 168C100 168 30 122 30 72C30 44 52 22 80 22C94 22 100 32 100 32C100 32 106 22 120 22C148 22 170 44 170 72C170 122 100 168 100 168Z"
          stroke="#ef4444"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Traçado de ECG (Eletrocardiograma em Branco) */}
        <path
          d="M20 86H72L82 58L94 112L106 70L116 92L124 86H180"
          stroke="#ffffff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cruz Vermelha de Emergência no canto inferior direito */}
        <g transform="translate(124, 96)">
          <rect x="12" y="0" width="16" height="40" rx="3.5" fill="#dc2626" />
          <rect x="0" y="12" width="40" height="16" rx="3.5" fill="#dc2626" />
          <rect
            x="12"
            y="0"
            width="16"
            height="40"
            rx="3.5"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeOpacity="0.8"
            fill="none"
          />
          <rect
            x="0"
            y="12"
            width="40"
            height="16"
            rx="3.5"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeOpacity="0.8"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}
