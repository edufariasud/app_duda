"use client";

import React, { useState } from "react";
import ScreenHeader from "@/components/ui/ScreenHeader";
import ParametrosClinicosTable from "@/components/ui/ParametrosClinicosTable";
import ParametrosOvaceTable from "@/components/ui/ParametrosOvaceTable";
import { BookOpen, GraduationCap, Heart, Wind } from "lucide-react";

interface EstudosScreenProps {
  onBack: () => void;
}

export default function EstudosScreen({ onBack }: EstudosScreenProps) {
  const [protocoloAtivo, setProtocoloAtivo] = useState<"sbv" | "ovace">("sbv");

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
      <ScreenHeader title="Modo de Estudos & Protocolos" onBack={onBack} />

      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Banner de Apresentação em Card */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-5 text-white shadow-md">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-8 h-8 rounded-xl bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-400">
              <GraduationCap className="w-5 h-5" />
            </span>
            <span className="text-sm font-black uppercase tracking-wider text-red-400">
              Cofre de Conhecimento Clínico
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            Matriz Técnica &amp; Parâmetros Oficiais
          </h1>
          <p className="text-sm font-medium text-slate-300 mt-1 leading-relaxed">
            Estruturado em sessões temáticas e cards comparativos para memorização e consulta rápida baseada nas diretrizes AHA 2020 e SAMU 192.
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-700/60">
            <span className="text-sm font-extrabold px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
              📚 4 Sessões Temáticas
            </span>
            <span className="text-sm font-extrabold px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
              🩺 Comparativo por Faixa Etária
            </span>
            <span className="text-sm font-extrabold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ✨ Regras de Ouro
            </span>
          </div>
        </div>

        {/* Seletor de Protocolo em Abas */}
        <div className="grid grid-cols-2 gap-2 bg-slate-200/90 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setProtocoloAtivo("sbv")}
            className={`py-3 px-3 rounded-xl text-sm sm:text-base font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
              protocoloAtivo === "sbv"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Heart className="w-4 h-4 text-red-600 fill-red-600 shrink-0" />
            <span>SBV / PCR</span>
          </button>
          <button
            type="button"
            onClick={() => setProtocoloAtivo("ovace")}
            className={`py-3 px-3 rounded-xl text-sm sm:text-base font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
              protocoloAtivo === "ovace"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Wind className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Desengasgo (OVACE)</span>
          </button>
        </div>

        {/* Conteúdo em Sessões e Cards */}
        {protocoloAtivo === "sbv" ? (
          <ParametrosClinicosTable />
        ) : (
          <ParametrosOvaceTable />
        )}
      </div>
    </div>
  );
}
