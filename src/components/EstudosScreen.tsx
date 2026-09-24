"use client";

import React, { useState } from "react";
import ScreenHeader from "@/components/ui/ScreenHeader";
import AlertBanner from "@/components/ui/AlertBanner";
import ParametrosClinicosTable from "@/components/ui/ParametrosClinicosTable";
import ParametrosOvaceTable from "@/components/ui/ParametrosOvaceTable";

interface EstudosScreenProps {
  onBack: () => void;
}

export default function EstudosScreen({ onBack }: EstudosScreenProps) {
  const [protocoloAtivo, setProtocoloAtivo] = useState<"sbv" | "ovace">("sbv");

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
      <ScreenHeader title="Tabelas Técnicas de Estudo" onBack={onBack} />

      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Seletor de Protocolo */}
        <div className="grid grid-cols-2 gap-2 bg-slate-200/80 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setProtocoloAtivo("sbv")}
            className={`py-2.5 px-3 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
              protocoloAtivo === "sbv"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🫀 SBV / PCR
          </button>
          <button
            type="button"
            onClick={() => setProtocoloAtivo("ovace")}
            className={`py-2.5 px-3 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
              protocoloAtivo === "ovace"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🫁 Desengasgo (OVACE)
          </button>
        </div>

        {protocoloAtivo === "sbv" ? (
          <>
            <AlertBanner
              variant="info"
              title="Parâmetros de Suporte Básico de Vida & PCR"
              description="Diretrizes oficiais (AHA / SBC / SAMU 192) comparando técnicas, profundidades e frequências para Lactentes, Crianças e Adultos."
            />
            <ParametrosClinicosTable />
          </>
        ) : (
          <>
            <AlertBanner
              variant="info"
              title="Matriz Técnica de Desengasgo (OVACE)"
              description="Algoritmo de desobstrução de vias aéreas comparando condutas para Lactentes, Crianças, Adultos, Gestantes e Obesos Mórbidos."
            />
            <ParametrosOvaceTable />
          </>
        )}
      </div>
    </div>
  );
}
