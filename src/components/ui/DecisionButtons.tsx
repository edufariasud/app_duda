import React from "react";

interface DecisionButtonsProps {
  yesLabel?: string;
  yesCaption?: string;
  onYes?: () => void;
  noLabel?: string;
  noCaption?: string;
  onNo?: () => void;
  className?: string;
}

export default function DecisionButtons({
  yesLabel = "Sim",
  yesCaption,
  onYes,
  noLabel = "Não",
  noCaption,
  onNo,
  className = "",
}: DecisionButtonsProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 pt-1 ${className}`}>
      {/* Botão SIM */}
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={onYes}
          className="w-full py-3.5 rounded-2xl bg-[#15803d] hover:bg-[#166534] active:scale-[0.98] text-white font-extrabold text-base tracking-wider uppercase shadow-md shadow-green-700/20 transition-all cursor-pointer border border-green-600/30"
        >
          {yesLabel}
        </button>
        {yesCaption && (
          <span className="text-sm font-semibold text-slate-700 mt-2 text-center">
            {yesCaption}
          </span>
        )}
      </div>

      {/* Botão NÃO */}
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={onNo}
          className="w-full py-3.5 rounded-2xl bg-[#b91c1c] hover:bg-[#991b1b] active:scale-[0.98] text-white font-extrabold text-base tracking-wider uppercase shadow-md shadow-red-700/20 transition-all cursor-pointer border border-red-600/30"
        >
          {noLabel}
        </button>
        {noCaption && (
          <span className="text-sm font-semibold text-slate-700 mt-2 text-center">
            {noCaption}
          </span>
        )}
      </div>
    </div>
  );
}
