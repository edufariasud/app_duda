"use client";

/**
 * ETAPA CLÍNICA: 3.1 / 3.2 / 3.3 — Vítima Inconsciente e Inspeção de Vias Aéreas
 * Nível 3 da Árvore de Decisão de OVACE
 * → 3.1: Transição Imediata para RCP 30:2 (Asfixia / Anóxia Hipóxica)
 * → 3.2: Objeto Visível na Boca → Remoção em Pinça Cuidadosa
 * → 3.3: Objeto NÃO Visível → PROIBIDO Varredura Cega!
 *
 * Desvios da Árvore:
 * → Recuperação: Expeliu / voltou a respirar → Avança para Etapa 4.1
 * → PCR Mantida: Permanece em PCR com DEA → Avança para Etapa 4.2
 */

import React, { useState } from "react";
import {
  ScreenHeader,
  AlertBanner,
  TipsCard,
  WhyAccordion,
  NextStepCard,
  StepBadge,
  PrimaryActionButton,
  ClinicalSpecsCard,
  QuestionCard,
  DecisionOptionCard,
  EmergencyCallButton,
} from "@/components/ui";
import { ETAPAS_OVACE } from "@/data/ovaceFlowchart";

interface StepOVACE3Props {
  onBack: () => void;
  onRecuperou: () => void; // → Etapa 4.1
  onPcrMantida: () => void; // → Etapa 4.2
}

export function Step_OVACE_3_Inconsciente({
  onBack,
  onRecuperou,
  onPcrMantida,
}: StepOVACE3Props) {
  const [inspecaoOral, setInspecaoOral] = useState<"inicial" | "visivel_3_2" | "oculto_3_3">("inicial");

  const etapa31 = ETAPAS_OVACE["3.1"];
  const etapa32 = ETAPAS_OVACE["3.2"];
  const etapa33 = ETAPAS_OVACE["3.3"];

  const getStepId = () => {
    if (inspecaoOral === "visivel_3_2") return etapa32.id;
    if (inspecaoOral === "oculto_3_3") return etapa33.id;
    return etapa31.id;
  };

  const getPrioridade = () => {
    if (inspecaoOral === "visivel_3_2") return etapa32.prioridade;
    if (inspecaoOral === "oculto_3_3") return etapa33.prioridade;
    return etapa31.prioridade;
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
      <ScreenHeader
        title={inspecaoOral === "inicial" ? "Transição para RCP" : "Inspeção Oral"}
        onBack={inspecaoOral === "inicial" ? onBack : () => setInspecaoOral("inicial")}
      />

      <StepBadge stepId={getStepId()} prioridade={getPrioridade()} />

      <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
        {/* Banner de Criticidade Máxima */}
        <AlertBanner
          variant="danger"
          title="🔴 PCR POR ASFIXIA (ANÓXIA HIPÓXICA)"
          description="A vítima colapsou. O coração precisa de compressões imediatas para manter perfusão cerebral!"
        />

        {/* Acionamento de Emergência SAMU 192 */}
        <EmergencyCallButton
          number="192"
          name="SAMU"
          description="Avise: Parada cardiorrespiratória por engasgo! Tragam o DEA."
        />

        {/* ── ESTADO INICIAL 3.1: RCP 30:2 ────────────────────────── */}
        {inspecaoOral === "inicial" && (
          <>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 shadow-xs">
              <p className="text-sm font-bold text-red-700 uppercase tracking-wider mb-1">
                {etapa31.diagnosticoClinico}
              </p>
              <p className="text-base sm:text-lg font-black text-red-950 leading-snug">
                {etapa31.intervencaoImediata}
              </p>
            </div>

            <ClinicalSpecsCard
              title="Algoritmo de RCP por Asfixia"
              items={[
                { label: "1. Compressões", value: "30 compressões torácicas rápidas e profundas (100-120/min)" },
                { label: "2. Abrir Boca", value: "Tracione a língua/mandíbula e olhe a cavidade oral" },
                { label: "3. Se Visível", value: "Retire com dedo em pinça (NUNCA faça varredura cega!)" },
                { label: "4. Ventilações", value: "Forneça 2 ventilações de resgate (1s cada, observe o peito)" },
                { label: "5. Ciclo", value: "Repita 30 compressões imediatamente" },
              ]}
            />

            <QuestionCard
              variant="plain"
              question="Ao abrir a via aérea durante a RCP, há objeto visível na boca?"
              subtitle="Examine a boca rapidamente antes de fornecer as ventilações:"
            />

            <div className="space-y-3">
              <DecisionOptionCard
                actionLabel="SIM"
                actionVariant="green"
                description="Objeto visível e acessível — 🟢 Remoção em Pinça Cuidadosa (3.2)"
                onClick={() => setInspecaoOral("visivel_3_2")}
              />

              <DecisionOptionCard
                actionLabel="NÃO"
                actionVariant="red"
                description="Boca vazia / objeto não visível — ⛔ PROIBIDO Varredura Cega! (3.3)"
                onClick={() => setInspecaoOral("oculto_3_3")}
              />
            </div>

            <NextStepCard nextStep={etapa31.proximoPasso} />
            <WhyAccordion rationale={etapa31.porqueJustificativa} />
          </>
        )}

        {/* ── ESTADO 3.2: Objeto Visível na Boca ──────────────────── */}
        {inspecaoOral === "visivel_3_2" && (
          <>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-xs">
              <p className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-1">
                {etapa32.diagnosticoClinico}
              </p>
              <h2 className="text-xl sm:text-2xl font-black text-emerald-950 leading-snug">
                {etapa32.desvioProximoPasso}
              </h2>
              <p className="text-sm sm:text-base font-bold text-emerald-900 mt-2 leading-relaxed">
                {etapa32.intervencaoImediata}
              </p>
            </div>

            <TipsCard
              title="Técnica de remoção em pinça"
              tips={[
                "Utilize o dedo indicador em formato de gancho/pinça para pescar o objeto.",
                "Remova APENAS se estiver frouxo e na parte anterior da boca.",
                "NUNCA empurre para trás, sob risco de re-oclusão total da laringe.",
                "Após retirar, aplique 2 ventilações de resgate e observe se o tórax expande.",
              ]}
            />

            <NextStepCard nextStep={etapa32.proximoPasso} />
            <WhyAccordion rationale={etapa32.porqueJustificativa} />

            <div className="pt-2">
              <PrimaryActionButton
                label="🔄 Retornar à Avaliação do Ciclo de RCP"
                variant="secondary-slate"
                onClick={() => setInspecaoOral("inicial")}
              />
            </div>
          </>
        )}

        {/* ── ESTADO 3.3: Objeto NÃO Visível na Boca ──────────────── */}
        {inspecaoOral === "oculto_3_3" && (
          <>
            <div className="bg-red-50 border border-red-300 rounded-2xl p-4 shadow-xs">
              <p className="text-sm font-bold text-red-700 uppercase tracking-wider mb-1">
                Regra de Ouro Proibitiva
              </p>
              <h2 className="text-xl sm:text-2xl font-black text-red-950 leading-snug">
                ⛔ NUNCA FAÇA VARREDURA DIGITAL CEGA!
              </h2>
              <p className="text-sm sm:text-base font-bold text-red-900 mt-2 leading-relaxed">
                {etapa33.intervencaoImediata}
              </p>
            </div>

            <TipsCard
              title="Por que a varredura cega é proibida?"
              tips={[
                "O dedo às cegas empurra o corpo estranho mais fundo contra as cordas vocais.",
                "Pode provocar vômito, edema e lesões nas mucosas orais.",
                "Pode causar espasmo de glote e agravar irreversivelmente a asfixia.",
                "As próprias compressões torácicas da RCP geram pressão pulmonar que empurra o objeto para fora.",
              ]}
            />

            <NextStepCard nextStep={etapa33.proximoPasso} />
            <WhyAccordion rationale={etapa33.porqueJustificativa} />

            <div className="pt-2">
              <PrimaryActionButton
                label="🔄 Retornar à Avaliação do Ciclo de RCP"
                variant="secondary-slate"
                onClick={() => setInspecaoOral("inicial")}
              />
            </div>
          </>
        )}

        {/* ── BOTÕES DE DESFECHO DA ÁRVORE (NÍVEL 4) ──────────────── */}
        <div className="border-t border-slate-200 pt-4 space-y-3">
          <p className="text-sm font-bold text-slate-600 text-center uppercase tracking-wider">
            Evolução do Paciente
          </p>

          <PrimaryActionButton
            label="🟢 Vítima Expeliu / Voltou a Respirar (4.1)"
            variant="success-green"
            onClick={onRecuperou}
          />

          <PrimaryActionButton
            label="⚡ Vítima Permanece em PCR / DEA Disponível (4.2)"
            variant="primary-blue"
            onClick={onPcrMantida}
          />
        </div>
      </div>
    </div>
  );
}
