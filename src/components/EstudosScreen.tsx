"use client";

import React from "react";
import ScreenHeader from "@/components/ui/ScreenHeader";
import AlertBanner from "@/components/ui/AlertBanner";
import ParametrosClinicosTable from "@/components/ui/ParametrosClinicosTable";

interface EstudosScreenProps {
  onBack: () => void;
}

export default function EstudosScreen({ onBack }: EstudosScreenProps) {
  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
      <ScreenHeader title="Tabela de Parâmetros" onBack={onBack} />

      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Banner Informativo */}
        <AlertBanner
          variant="info"
          title="Parâmetros Comparativos por Faixa Etária"
          description="Diretrizes oficiais (AHA / SBC / SAMU 192) comparando técnicas, profundidades e frequências para Lactentes, Crianças e Adultos."
        />

        {/* Tabela de Parâmetros do CSV */}
        <ParametrosClinicosTable />
      </div>
    </div>
  );
}
