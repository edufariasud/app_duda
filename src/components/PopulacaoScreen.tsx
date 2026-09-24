"use client";

import React from "react";
import {
  Droplet,
  Bone,
  TriangleAlert,
} from "lucide-react";
import ScreenHeader from "@/components/ui/ScreenHeader";
import SelectionCard from "@/components/ui/SelectionCard";

interface EmergencyOption {
  id: string;
  title: string;
  subtitle: string;
  bgIcon: string;
  icon: React.ReactNode;
}

interface PopulacaoScreenProps {
  onBack: () => void;
  onSelectEmergency?: (id: string) => void;
}

export default function PopulacaoScreen({
  onBack,
  onSelectEmergency,
}: PopulacaoScreenProps) {
  const emergencies: EmergencyOption[] = [
    {
      id: "inconsciente",
      title: "Pessoa inconsciente",
      subtitle: "Não responde a estímulos",
      bgIcon: "bg-[#b91c1c]",
      icon: (
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <path d="M12 9v4" strokeWidth="2.5" />
          <path d="M10 11h4" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      id: "engasgo",
      title: "Engasgo",
      subtitle: "Obstrução de vias aéreas",
      bgIcon: "bg-[#1d4ed8]",
      icon: (
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="3" />
          <path d="M15 9H9c-1.1 0-2 .9-2 2v3h2.5l1.5-2 1.5 2H17v-3c0-1.1-.9-2-2-2Z" />
          <path d="M10 14v7h4v-7h-4Z" />
        </svg>
      ),
    },
    {
      id: "sangramento",
      title: "Sangramento intenso",
      subtitle: "Hemorragias ativas",
      bgIcon: "bg-[#991b1b]",
      icon: <Droplet className="w-8 h-8 text-white fill-white" />,
    },
    {
      id: "consciencia",
      title: "Alteração da consciência",
      subtitle: "Confusão, desmaio, convulsão",
      bgIcon: "bg-[#0d9488]",
      icon: (
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a3.5 3.5 0 0 1 5 0" />
          <path d="M9 13h.01" strokeWidth="3" />
          <path d="M15 13h.01" strokeWidth="3" />
          <path d="M10 17c.5-.5 1.5-.5 2 0s1.5.5 2 0" />
        </svg>
      ),
    },
    {
      id: "trauma",
      title: "Trauma",
      subtitle: "Fraturas, quedas, acidentes",
      bgIcon: "bg-[#5b21b6]",
      icon: <Bone className="w-8 h-8 text-white stroke-[2.2]" />,
    },
    {
      id: "outra",
      title: "Outra emergência",
      subtitle: "Outras situações urgentes",
      bgIcon: "bg-[#ea580c]",
      icon: <TriangleAlert className="w-8 h-8 text-white stroke-[2.4]" />,
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
      {/* Header Padronizado */}
      <ScreenHeader title="O que está acontecendo?" onBack={onBack} />

      {/* Lista de Emergências Componentizada */}
      <div className="flex-1 px-4 py-4 space-y-3">
        {emergencies.map((item) => (
          <SelectionCard
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            iconBgColor={item.bgIcon}
            onClick={() => onSelectEmergency?.(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
