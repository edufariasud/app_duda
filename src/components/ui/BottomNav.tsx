import React from "react";
import { Home, BookOpen, Activity, LayoutGrid } from "lucide-react";

export type NavTabId = "inicio" | "estudos" | "simulador" | "mais";

interface BottomNavProps {
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
  className?: string;
}

export default function BottomNav({
  activeTab,
  onTabChange,
  className = "",
}: BottomNavProps) {
  const tabs = [
    { id: "inicio" as NavTabId, label: "Início", icon: Home },
    { id: "estudos" as NavTabId, label: "Estudos", icon: BookOpen },
    { id: "simulador" as NavTabId, label: "Simulador", icon: Activity },
    { id: "mais" as NavTabId, label: "Fontes", icon: LayoutGrid },
  ];

  return (
    <nav
      className={`w-full bg-[#050b1d]/95 backdrop-blur-md border-t border-slate-800/80 py-2.5 px-4 z-20 shrink-0 ${className}`}
      aria-label="Navegação Principal"
    >
      <div className="grid grid-cols-4 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 py-1 transition-colors cursor-pointer ${
                isActive
                  ? "text-red-500 font-bold"
                  : "text-slate-400 hover:text-slate-200 font-medium"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
