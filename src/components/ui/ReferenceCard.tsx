import React from "react";
import { Award, ExternalLink } from "lucide-react";

export interface ReferenceItem {
  instituicao: string;
  titulo: string;
  descricao: string;
  ano: string;
  tag: string;
  link: string;
}

interface ReferenceCardProps {
  reference: ReferenceItem;
  className?: string;
}

export default function ReferenceCard({
  reference,
  className = "",
}: ReferenceCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all text-left ${className}`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-sm font-bold uppercase tracking-wider">
          <Award className="w-4 h-4 shrink-0" />
          {reference.tag}
        </span>
        <span className="text-sm text-slate-500 font-medium">
          {reference.ano}
        </span>
      </div>

      <h3 className="text-base font-bold text-slate-900 mt-2.5 leading-snug">
        {reference.instituicao}
      </h3>

      <p className="text-sm sm:text-base font-semibold text-slate-700 mt-0.5">
        {reference.titulo}
      </p>

      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
        {reference.descricao}
      </p>

      <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end">
        <a
          href={reference.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
        >
          <span>Acessar portal oficial</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
