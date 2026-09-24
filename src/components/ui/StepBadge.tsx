import React from "react";
import { PrioridadeClinica } from "@/data/flowchart";

interface StepBadgeProps {
  stepId: string;
  prioridade: PrioridadeClinica;
  className?: string;
}

const PRIORIDADE_CONFIG: Record<
  PrioridadeClinica,
  { label: string; bg: string; text: string; dot: string }
> = {
  alerta_vermelho:  { label: "Alerta Vermelho",   bg: "bg-red-100",    text: "text-red-800",    dot: "bg-red-600"    },
  pcr_critica:      { label: "PCR Crítica",        bg: "bg-red-100",    text: "text-red-800",    dot: "bg-red-600"    },
  urgencia:         { label: "Urgência",           bg: "bg-orange-100", text: "text-orange-800", dot: "bg-orange-500" },
  emergencia_grave: { label: "Emergência Grave",   bg: "bg-amber-100",  text: "text-amber-800",  dot: "bg-amber-500"  },
  atencao_continua: { label: "Atenção Contínua",   bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-500" },
  protocolo:        { label: "Protocolo",          bg: "bg-blue-100",   text: "text-blue-800",   dot: "bg-blue-500"   },
  estavel:          { label: "Estável",            bg: "bg-green-100",  text: "text-green-800",  dot: "bg-green-600"  },
  seguro:           { label: "Seguro",             bg: "bg-green-100",  text: "text-green-800",  dot: "bg-green-600"  },
  intervencao_chave:{ label: "Intervenção Chave",  bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-600" },
};

export default function StepBadge({ stepId, prioridade, className = "" }: StepBadgeProps) {
  const config = PRIORIDADE_CONFIG[prioridade];

  return (
    <div className={`flex items-center gap-2 px-4 py-1.5 ${className}`}>
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-bold tracking-wide ${config.bg} ${config.text}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot} shrink-0`} />
        Etapa {stepId}
      </span>
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold ${config.bg} ${config.text} opacity-90`}
      >
        {config.label}
      </span>
    </div>
  );
}
