"use client";

/**
 * ETAPA CLÍNICA: 3.1 / 3.2 / 3.3 — Avaliação Circulatória (Pulso)
 * Fluxo: Etapa 2 (inconsciente) → Checagem de pulso conforme faixa etária
 * → PULSO PRESENTE: avança para Etapa 4 (respiração)
 * → SEM PULSO / DÚVIDA (5.4): avança diretamente para Etapa 5 (RCP)
 */

import React from "react";
import {
  ScreenHeader,
  QuestionCard,
  AlertBanner,
  WhyAccordion,
  NextStepCard,
  StepBadge,
  TipsCard,
  DecisionOptionCard,
} from "@/components/ui";
import { ETAPAS_CLINICAS, FaixaEtaria, getPulsoEtapaId } from "@/data/flowchart";

interface Step3CheckPulsoProps {
  faixaEtaria: FaixaEtaria;
  onBack: () => void;
  onPulsoPresente: () => void;  // → Etapa 4
  onSemPulso: () => void;       // → Etapa 5 (RCP)
  onDuvida: () => void;         // → Etapa 5.4 (tratar como PCR)
}

const DICAS_POR_FAIXA: Record<FaixaEtaria, string[]> = {
  adulto: [
    "Localize a traqueia com dois dedos.",
    "Deslize os dedos para o sulco lateral do pescoço.",
    "Pressione suavemente por 5 a 10 segundos.",
    "Se ausente ou dúvida em 10s: trate como PCR.",
  ],
  crianca: [
    "Palpe o pulso carotídeo no pescoço ou o femoral na virilha.",
    "Se FC < 60 bpm com má perfusão: trate como PCR.",
    "Pressione suavemente por 5 a 10 segundos.",
    "Sinais de má perfusão: pele fria, pálida ou acinzentada.",
  ],
  lactente: [
    "Palpe a face interna do braço (artéria braquial).",
    "Use o polegar e o indicador para abraçar o braço.",
    "Nunca use a carótida — pescoço curto pode ocluir a traqueia.",
    "Se FC < 60 bpm: inicie compressões imediatamente.",
  ],
};

export default function Step_3_CheckPulso({
  faixaEtaria,
  onBack,
  onPulsoPresente,
  onSemPulso,
  onDuvida,
}: Step3CheckPulsoProps) {
  const etapaId = getPulsoEtapaId(faixaEtaria);
  const etapa = ETAPAS_CLINICAS[etapaId];
  const etapa54 = ETAPAS_CLINICAS["5.4"];
  const dicas = DICAS_POR_FAIXA[faixaEtaria];

  const INSTRUCOES: Record<FaixaEtaria, string> = {
    adulto: "Palpe o Pulso Carotídeo",
    crianca: "Palpe o Pulso Carotídeo ou Femoral",
    lactente: "Palpe o Pulso Braquial",
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
      <ScreenHeader title="Checagem de Pulso" onBack={onBack} />

      <StepBadge stepId={etapa.id} prioridade={etapa.prioridade} />

      <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
        {/* Alerta de tempo */}
        <AlertBanner
          variant="warning"
          title="⏱️ Você tem no máximo 10 segundos!"
          description="Checar rapidamente — a demora em compressões é letal."
        />

        {/* Ponto de Decisão do CSV */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 text-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
            {etapa.diagnosticoClinico}
          </p>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            {etapa.perguntaCentral}
          </h2>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-extrabold">
            <span>{etapa.desvioProximoPasso}</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-red-700 mt-2 leading-snug">
            {etapa.intervencaoImediata}
          </p>
        </div>

        {/* Dicas por faixa etária */}
        <TipsCard title="Técnica de palpação" tips={dicas} />

        {/* Pergunta de resultado */}
        <QuestionCard
          variant="plain"
          question="Conseguiu palpar o pulso dentro de 10 segundos?"
          subtitle="Selecione o resultado da checagem para definir a conduta imediata:"
        />

        {/* Opções de resultado com desvios do CSV */}
        <div className="flex flex-col space-y-3">
          <DecisionOptionCard
            actionLabel="SIM"
            actionVariant="green"
            description="Pulso presente e regular — ➡️ Seguir para Avaliação Respiratória"
            onClick={onPulsoPresente}
          />
          <DecisionOptionCard
            actionLabel="NÃO"
            actionVariant="red"
            description={`Sem pulso — ${ETAPAS_CLINICAS[etapaId.replace("3.", "5.")].desvioProximoPasso}`}
            onClick={onSemPulso}
          />
          <DecisionOptionCard
            actionLabel="DÚVIDA"
            actionVariant="amber"
            description={`${etapa54.desvioProximoPasso} — "Não sei" / Dúvida`}
            onClick={onDuvida}
          />
        </div>

        <NextStepCard nextStep={etapa.proximoPasso} />
        <WhyAccordion rationale={etapa.porqueJustificativa} />

        {/* Por quê da regra da dúvida */}
        <WhyAccordion
          label="💡 Por que tratar a dúvida como PCR?"
          rationale={etapa54.porqueJustificativa}
        />
      </div>
    </div>
  );
}
