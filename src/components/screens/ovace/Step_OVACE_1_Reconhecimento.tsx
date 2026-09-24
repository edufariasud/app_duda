"use client";

/**
 * ETAPA CLÍNICA: 1.1 / 1.2 — Reconhecimento da OVACE (Obstrução de Vias Aéreas)
 * Nível 1 da Árvore de Decisão de Desengasgo
 * → SIM (1.1): Obstrução Leve → Estimular tosse e monitorar
 * → NÃO (1.2): Obstrução Grave → Chamar 192, pedir DEA e selecionar perfil para manobra
 */

import React, { useState } from "react";
import {
  ScreenHeader,
  QuestionCard,
  DecisionButtons,
  AlertBanner,
  TipsCard,
  WhyAccordion,
  NextStepCard,
  StepBadge,
  EmergencyCallButton,
  PrimaryActionButton,
  SelectionCard,
} from "@/components/ui";
import { ETAPAS_OVACE, PerfilOvace } from "@/data/ovaceFlowchart";
import { User, Users, Baby, HeartPulse, PersonStanding } from "lucide-react";

interface StepOVACE1Props {
  onBack: () => void;
  onAvancarManobra: (perfil: PerfilOvace) => void;
}

export function Step_OVACE_1_Reconhecimento({
  onBack,
  onAvancarManobra,
}: StepOVACE1Props) {
  const [resultado, setResultado] = useState<"pergunta" | "leve_1_1" | "grave_1_2">("pergunta");

  const etapa11 = ETAPAS_OVACE["1.1"];
  const etapa12 = ETAPAS_OVACE["1.2"];

  // ── ESTADO 1.1: Obstrução Leve de Vias Aéreas (SIM) ────────────
  if (resultado === "leve_1_1") {
    return (
      <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
        <ScreenHeader
          title="Obstrução Leve"
          onBack={() => setResultado("pergunta")}
        />

        <StepBadge stepId={etapa11.id} prioridade={etapa11.prioridade} />

        <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
          <AlertBanner
            variant="warning"
            title={etapa11.diagnosticoClinico}
            description="A vítima ainda consegue respirar e tossir. Não interfira no reflexo natural!"
          />

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-xs">
            <p className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-1">
              Conduta Imediata
            </p>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 leading-snug">
              Incentive a Tossir com Força
            </h2>
            <p className="text-sm sm:text-base font-bold text-amber-900 mt-2 leading-relaxed">
              {etapa11.intervencaoImediata}
            </p>
          </div>

          <TipsCard
            title="O que NUNCA fazer na obstrução leve"
            tips={[
              "NÃO dê tapas nas costas (pode descer o objeto e obstruir totalmente).",
              "NÃO faça manobra de Heimlich enquanto a tosse estiver eficaz.",
              "NÃO ofereça água, pão ou qualquer alimento.",
              "Mantenha a vítima em pé ou sentada com tronco ereto.",
            ]}
          />

          <NextStepCard nextStep={etapa11.proximoPasso} />

          <WhyAccordion rationale={etapa11.porqueJustificativa} />

          <div className="pt-2">
            <PrimaryActionButton
              label="🔴 Tosse enfraqueceu / Parou de falar"
              variant="danger-red"
              onClick={() => setResultado("grave_1_2")}
            />
          </div>
        </div>
      </div>
    );
  }

  // ── ESTADO 1.2: Obstrução Grave de Vias Aéreas (NÃO) ───────────
  if (resultado === "grave_1_2") {
    return (
      <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
        <ScreenHeader
          title="Obstrução Grave"
          onBack={() => setResultado("pergunta")}
        />

        <StepBadge stepId={etapa12.id} prioridade={etapa12.prioridade} />

        <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
          <AlertBanner
            variant="danger"
            title="EMERGÊNCIA: Asfixia / Obstrução Total"
            description="Vítima sem troca de ar eficaz. Risco de inconsciência em 60 a 90 segundos!"
          />

          {/* Acionamento de emergência com discagem rápida */}
          <EmergencyCallButton
            number="192"
            name="SAMU"
            description="Ligue agora no viva-voz e solicite o DEA"
          />

          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 shadow-xs">
            <p className="text-sm font-bold text-red-700 uppercase tracking-wider mb-1">
              Atitude Imediata do Socorrista
            </p>
            <p className="text-base sm:text-lg font-black text-red-950 leading-snug">
              {etapa12.intervencaoImediata}
            </p>
          </div>

          {/* Seleção do Perfil para Manobra Específica (Nível 2) */}
          <QuestionCard
            variant="plain"
            question="Qual o perfil da vítima engasgada?"
            subtitle="Selecione a situação para ver a técnica de desobstrução correta:"
          />

          <div className="space-y-3">
            <SelectionCard
              title="Adulto ou Criança (> 1 ano)"
              subtitle="Manobra de Heimlich clássica em pé ou ajoelhado"
              icon={<Users className="w-7 h-7 text-white" />}
              iconBgColor="bg-blue-600"
              onClick={() => onAvancarManobra("adulto_crianca")}
            />

            <SelectionCard
              title="Lactente / Bebê (< 1 ano)"
              subtitle="5 golpes nas costas + 5 compressões no tórax"
              icon={<Baby className="w-7 h-7 text-white" />}
              iconBgColor="bg-amber-600"
              onClick={() => onAvancarManobra("lactente")}
            />

            <SelectionCard
              title="Gestante ou Obeso Mórbido"
              subtitle="Compressões torácicas no esterno (sem apertar abdome)"
              icon={<HeartPulse className="w-7 h-7 text-white" />}
              iconBgColor="bg-purple-600"
              onClick={() => onAvancarManobra("gestante_obeso")}
            />

            <SelectionCard
              title="Vítima Sozinha (Auto-Atendimento)"
              subtitle="Auto-Heimlich apoiado contra encosto de cadeira rígida"
              icon={<PersonStanding className="w-7 h-7 text-white" />}
              iconBgColor="bg-slate-700"
              onClick={() => onAvancarManobra("solitario")}
            />
          </div>

          <NextStepCard nextStep={etapa12.proximoPasso} />

          <WhyAccordion rationale={etapa12.porqueJustificativa} />
        </div>
      </div>
    );
  }

  // ── PERGUNTA INICIAL: A vítima tosse com força? ────────────────
  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
      <ScreenHeader title="Avaliação de Engasgo" onBack={onBack} />

      <StepBadge stepId="1.1 / 1.2" prioridade="urgencia" />

      <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
        <QuestionCard
          question="A vítima tosse com força, consegue falar ou emitir sons?"
          subtitle="Observe rapidamente a presença de tosse audível ou choro no bebê."
        />

        <DecisionButtons
          yesLabel="SIM"
          yesCaption="Tosse com força / fala"
          onYes={() => setResultado("leve_1_1")}
          noLabel="NÃO"
          noCaption="Sem som / tosse fraca / cianose"
          onNo={() => setResultado("grave_1_2")}
        />

        <TipsCard
          title="Sinais de Alerta de Engasgo Grave"
          tips={[
            "Sinal universal: mãos no pescoço em desespero.",
            "Incapacidade súbita de falar, chorar ou tossir.",
            "Lábios ou pontas dos dedos arroxeados (cianose).",
            "Som agudo ao tentar inspirar (estridor) ou silêncio absoluto.",
          ]}
        />
      </div>
    </div>
  );
}
