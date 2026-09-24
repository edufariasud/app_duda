import React from "react";

interface QuestionCardProps {
  question: string;
  subtitle?: string;
  variant?: "card" | "plain";
  className?: string;
}

export default function QuestionCard({
  question,
  subtitle,
  variant = "card",
  className = "",
}: QuestionCardProps) {
  if (variant === "plain") {
    return (
      <div className={`text-center pt-1 px-2 ${className}`}>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
          {question}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base font-bold text-slate-700 mt-1">
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs text-center ${className}`}
    >
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
        {question}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base font-bold text-slate-700 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}
