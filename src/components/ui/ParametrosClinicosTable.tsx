import React from "react";
import { PARAMETROS_CLINICOS, ParametroClinico } from "@/data/flowchart";
import { Sparkles, ShieldAlert } from "lucide-react";

interface ParametrosClinicosTableProps {
  className?: string;
}

export default function ParametrosClinicosTable({
  className = "",
}: ParametrosClinicosTableProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Cards de Comparação por Parâmetro */}
      {PARAMETROS_CLINICOS.map((item: ParametroClinico, index: number) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden"
        >
          {/* Cabeçalho do Parâmetro */}
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800">
            <h3 className="text-base font-black text-white tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-red-600/30 text-red-400 flex items-center justify-center text-sm font-extrabold">
                {index + 1}
              </span>
              <span>{item.parametro}</span>
            </h3>
          </div>

          {/* Grid de 3 Colunas: Lactente, Criança, Adulto */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            {/* Lactente */}
            <div className="p-3.5 bg-sky-50/40">
              <span className="inline-block px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 text-sm font-extrabold uppercase tracking-wider mb-1.5">
                Lactente (&lt; 1 ano)
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-800 whitespace-pre-line leading-relaxed">
                {item.lactente}
              </p>
            </div>

            {/* Criança */}
            <div className="p-3.5 bg-emerald-50/40">
              <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-sm font-extrabold uppercase tracking-wider mb-1.5">
                Criança (1 ano - Puberdade)
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-800 whitespace-pre-line leading-relaxed">
                {item.crianca}
              </p>
            </div>

            {/* Adulto */}
            <div className="p-3.5 bg-red-50/40">
              <span className="inline-block px-2 py-0.5 rounded-md bg-red-100 text-red-800 text-sm font-extrabold uppercase tracking-wider mb-1.5">
                Adulto (&gt; 12 anos)
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-800 whitespace-pre-line leading-relaxed">
                {item.adulto}
              </p>
            </div>
          </div>

          {/* Regra de Ouro do CSV */}
          <div className="bg-amber-50/90 border-t border-amber-200/80 px-4 py-2.5 flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-black text-amber-900 uppercase tracking-tight mr-1.5">
                Regra de Ouro:
              </span>
              <span className="text-sm sm:text-base font-bold text-amber-950 leading-snug">
                {item.regraDeOuro}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
