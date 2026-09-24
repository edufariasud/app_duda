import React from "react";
import { User, GraduationCap } from "lucide-react";
import AppLogo from "@/components/ui/AppLogo";
import ModeSelectorCard from "@/components/ui/ModeSelectorCard";

export type ModeType = "populacao" | "estudante";

interface HomeScreenProps {
  selectedMode: ModeType;
  onSelectMode: (mode: ModeType) => void;
  onStart: () => void;
}

export default function HomeScreen({
  selectedMode,
  onSelectMode,
  onStart,
}: HomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col justify-between pt-8 pb-4">
      {/* Efeito de iluminação de emergência no fundo */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Conteúdo Central */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center z-10 -mt-4">
        {/* Logo Oficial Componentizado */}
        <div className="mb-6">
          <AppLogo />
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-1">
          <span>SBV</span>
          <span className="text-red-500 text-3xl font-black">+</span>
          <span>APH</span>
        </h1>

        {/* Subtítulo */}
        <h2 className="text-sm sm:text-base font-semibold tracking-[0.25em] text-slate-200 mt-1 uppercase">
          Guia de Emergência
        </h2>

        {/* Frase de Efeito */}
        <p className="text-slate-300 text-sm sm:text-base mt-4 leading-snug max-w-xs font-normal">
          Orientação rápida
          <br />
          para salvar vidas.
        </p>

        {/* Botão Principal INICIAR */}
        <div className="w-full mt-8">
          <button
            type="button"
            onClick={onStart}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 active:scale-[0.98] text-white font-bold text-lg tracking-wider uppercase shadow-lg shadow-red-600/35 hover:shadow-red-600/50 transition-all duration-200 cursor-pointer border border-red-400/30"
          >
            Iniciar
          </button>
        </div>

        {/* Seleção de Modos Componentizada */}
        <div className="grid grid-cols-2 gap-3.5 w-full mt-4">
          <ModeSelectorCard
            label="Modo"
            title="População"
            icon={<User className="w-5 h-5" />}
            isActive={selectedMode === "populacao"}
            onClick={() => onSelectMode("populacao")}
          />
          <ModeSelectorCard
            label="Modo"
            title="Estudante"
            icon={<GraduationCap className="w-5 h-5" />}
            isActive={selectedMode === "estudante"}
            onClick={() => onSelectMode("estudante")}
          />
        </div>
      </section>
    </div>
  );
}
