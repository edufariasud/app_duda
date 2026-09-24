"use client";

/**
 * ETAPA CLÍNICA: 1.1 / 1.2 — Segurança da Cena
 * Fluxo: Pessoa Inconsciente → Avaliação de Cena
 * → SIM (1.2): Cena segura, avançar com EPIs para Etapa 2
 * → NÃO (1.1): Cena insegura, interromper e acionar 193/192
 */

import React, { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
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
} from "@/components/ui";
import { ETAPAS_CLINICAS } from "@/data/flowchart";

interface Step1SegurancaCenaProps {
  onBack: () => void;
  onCenaSegura: () => void; // → Etapa 1.2: avança para Etapa 2
}

export default function Step_1_SegurancaCena({
  onBack,
  onCenaSegura,
}: Step1SegurancaCenaProps) {
  const [resultado, setResultado] = useState<"insegura" | "segura" | null>(null);

  const etapa12 = ETAPAS_CLINICAS["1.2"];
  const etapa11 = ETAPAS_CLINICAS["1.1"];

  // Tela de resultado quando a cena É INSEGURA (1.1)
  if (resultado === "insegura") {
    return (
      <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
        <ScreenHeader title="Cena Insegura" onBack={() => setResultado(null)} />

        <StepBadge
          stepId={etapa11.id}
          prioridade={etapa11.prioridade}
        />

        <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
          {/* Diagnóstico Clínico */}
          <AlertBanner
            variant="danger"
            title={`⛔ ${etapa11.diagnosticoClinico}`}
            description={etapa11.intervencaoImediata}
          />

          {/* Instruções de emergência componentizadas */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
            <p className="text-sm sm:text-base font-black text-red-700 uppercase tracking-tight">
              Acione imediatamente:
            </p>
            <EmergencyCallButton
              number="193"
              name="Bombeiros"
              description="Liberação e isolamento de área de risco"
              variant="red"
            />
            <EmergencyCallButton
              number="192"
              name="SAMU"
              description="Suporte médico de emergência"
              variant="blue"
            />
          </div>

          {/* Próximo Passo Crítico */}
          <NextStepCard nextStep={etapa11.proximoPasso} />

          {/* Por quê (expansível ao clique) */}
          <WhyAccordion rationale={etapa11.porqueJustificativa} />
        </div>
      </div>
    );
  }

  // Tela de resultado quando a cena É SEGURA (1.2)
  if (resultado === "segura") {
    return (
      <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
        <ScreenHeader title="Cena Segura" onBack={() => setResultado(null)} />

        <StepBadge
          stepId={etapa12.id}
          prioridade={etapa12.prioridade}
        />

        <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
          {/* Diagnóstico Clínico */}
          <AlertBanner
            variant="info"
            title={`🟢 ${etapa12.diagnosticoClinico}`}
            description={etapa12.intervencaoImediata}
          />

          {/* Recomendações e EPIs */}
          <TipsCard
            title="Cuidados de Aproximação e Proteção"
            tips={[
              "Calce luvas de procedimento descartáveis imediatamente.",
              "Utilize máscara de proteção e óculos se houver risco de secreções.",
              "Aproxime-se da vítima observando todo o entorno.",
              "Posicione-se confortavelmente ao lado do tronco da vítima.",
            ]}
          />

          {/* Próximo Passo Crítico */}
          <NextStepCard nextStep={etapa12.proximoPasso} />

          {/* Por quê (expansível ao clique) */}
          <WhyAccordion rationale={etapa12.porqueJustificativa} />

          {/* Ação para avançar para Etapa 2 */}
          <PrimaryActionButton
            label="Testar Responsividade"
            onClick={onCenaSegura}
            variant="success-green"
            icon={<ArrowRight className="w-5 h-5 text-emerald-800" />}
          />
        </div>
      </div>
    );
  }

  // Tela de pergunta principal: A cena está segura?
  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
      <ScreenHeader title="Segurança da Cena" onBack={onBack} />

      <StepBadge
        stepId="1.1 / 1.2"
        prioridade="protocolo"
      />

      <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
        {/* Pergunta Central de Decisão */}
        <QuestionCard question={etapa12.perguntaCentral.replace("Avaliação da Cena: ", "")} />

        {/* Botões de Ação Direta */}
        <DecisionButtons
          yesLabel="SIM"
          yesCaption="Cena segura — avançar"
          onYes={() => setResultado("segura")}
          noLabel="NÃO"
          noCaption="Cena insegura — parar"
          onNo={() => setResultado("insegura")}
        />

        {/* Dicas de Avaliação */}
        <TipsCard
          title="O que verificar antes de se aproximar"
          tips={[
            "Risco elétrico: fios caídos, subestações, postes abalroados.",
            "Tráfego: veículos em movimento, pista sem sinalização.",
            "Estrutural: risco de colapso, desabamento ou incêndio.",
            "Violência: armas, tumulto, assaltos ou agressões ativas.",
            "Químico: vazamento de combustível, gases ou fumaça.",
          ]}
        />
      </div>
    </div>
  );
}
