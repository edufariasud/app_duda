import React from "react";
import { MATRIZ_TECNICA_OVACE, ParametroTecnicoOvace } from "@/data/ovaceFlowchart";

interface ParametrosOvaceTableProps {
  className?: string;
}

export default function ParametrosOvaceTable({
  className = "",
}: ParametrosOvaceTableProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {MATRIZ_TECNICA_OVACE.map((item: ParametroTecnicoOvace, index: number) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden"
        >
          {/* Cabeçalho do Parâmetro */}
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800">
            <h3 className="text-base font-black text-white tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-600/40 text-blue-300 flex items-center justify-center text-sm font-extrabold">
                {index + 1}
              </span>
              <span>{item.parametro}</span>
            </h3>
          </div>

          {/* Grid de 4 Grupos: Lactente, Criança, Adulto, Gestante/Obeso */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            {/* Lactente */}
            <div className="p-3.5 bg-sky-50/40">
              <span className="inline-block px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 text-sm font-extrabold uppercase tracking-wider mb-1.5">
                Lactente (&lt; 1 ano)
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                {item.lactente}
              </p>
            </div>

            {/* Criança */}
            <div className="p-3.5 bg-emerald-50/40">
              <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-sm font-extrabold uppercase tracking-wider mb-1.5">
                Criança (1a - Puberdade)
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                {item.crianca}
              </p>
            </div>

            {/* Adulto */}
            <div className="p-3.5 bg-blue-50/40">
              <span className="inline-block px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-sm font-extrabold uppercase tracking-wider mb-1.5">
                Adulto &amp; Adolescente
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                {item.adulto}
              </p>
            </div>

            {/* Gestante / Obeso */}
            <div className="p-3.5 bg-purple-50/40">
              <span className="inline-block px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-sm font-extrabold uppercase tracking-wider mb-1.5">
                Gestante / Obeso
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                {item.gestanteObeso}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
