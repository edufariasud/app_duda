"use client";

/**
 * ETAPA CLÍNICA: 6.1 — Desfibrilação Externa Automática (DEA)
 * Fluxo: Etapa 5 (RCP) → DEA chegou à cena → Usar DEA
 * → Após choque / aviso de não chocar: retornar à RCP por 2 min
 */

import React from "react";
import {
  ScreenHeader,
  QuestionCard,
  AlertBanner,
  TipsCard,
  WhyAccordion,
  StepBadge,
  ClinicalSpecsCard,
  PrimaryActionButton,
} from "@/components/ui";
import { ETAPAS_CLINICAS, FaixaEtaria } from "@/data/flowchart";

interface Step6DEAProps {
  faixaEtaria: FaixaEtaria;
  onBack: () => void;
  onVoltarRCP: () => void; // Após análise/choque, retornar ao RCP por 2 min
}

export default function Step_6_DEA({
  faixaEtaria,
  onBack,
  onVoltarRCP,
}: Step6DEAProps) {
  const etapa = ETAPAS_CLINICAS["6.1"];

  const isPediatrico = faixaEtaria !== "adulto";

  const PAS_CONFIG: Record<FaixaEtaria, { tipo: string; posicao: string }> = {
    adulto: {
      tipo: "Pás adultas convencionais",
      posicao: "Posição anterolateral padrão: uma pá abaixo da clavícula direita, outra na lateral esquerda.",
    },
    crianca: {
      tipo: "Pás pediátricas (ou atenuador em crianças < 8 anos)",
      posicao: "Pás pediátricas anterolateral. Se as pás se tocarem: use posição anteroposterior (uma no peito, outra nas costas).",
    },
    lactente: {
      tipo: "Atenuador pediátrico obrigatório",
      posicao: "Posição anteroposterior: uma pá no centro do peito, outra nas costas entre as escápulas.",
    },
  };

  const pasConfig = PAS_CONFIG[faixaEtaria];

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
      <ScreenHeader title="DEA — Desfibrilação" onBack={onBack} />

      <StepBadge stepId={etapa.id} prioridade={etapa.prioridade} />

      <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
        {/* Ponto de Decisão do CSV */}
        <QuestionCard
          variant="plain"
          question={etapa.perguntaCentral}
          subtitle={`Condição: ${etapa.respostaCondicao} → ${etapa.desvioProximoPasso}`}
        />

        {/* Diagnóstico e Conduta */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 shadow-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-100 text-purple-800 text-sm font-extrabold uppercase mb-2">
            <span>{etapa.desvioProximoPasso}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-purple-900 leading-snug">
            ⚡ {etapa.diagnosticoClinico}
          </h2>
          <p className="text-sm sm:text-base font-bold text-purple-800 mt-1">
            {etapa.intervencaoImediata}
          </p>
        </div>

        {/* Configuração das pás por faixa etária componentizada */}
        <ClinicalSpecsCard
          title={`Configuração das Pás — ${faixaEtaria === "adulto" ? "Adulto" : faixaEtaria === "crianca" ? "Criança" : "Lactente"}`}
          variant="purple"
          items={[
            { label: "Tipo", value: pasConfig.tipo },
            { label: "Posição", value: pasConfig.posicao },
          ]}
        />

        {/* Alerta pediátrico específico */}
        {isPediatrico && (
          <AlertBanner
            variant="warning"
            title="⚠️ Atenção Pediátrica"
            description="Se as pás de adulto forem as únicas disponíveis: use posição anteroposterior. Nunca deixe de usar o DEA por falta de pás pediátricas!"
          />
        )}

        {/* Passos de uso */}
        <TipsCard
          title="Passos de uso do DEA"
          tips={[
            "1. Ligue o DEA e siga as instruções de voz.",
            "2. Exponha o tórax e posicione as pás conforme indicado.",
            "3. Certifique-se de que NINGUÉM está tocando na vítima durante a análise.",
            "4. Pressione o botão de choque se indicado (afaste todos antes).",
            "5. Após o choque ou aviso 'Não chocar': retome a RCP IMEDIATAMENTE.",
            "6. Faça 2 minutos completos de RCP antes da próxima análise.",
          ]}
        />

        {/* Alerta pós-choque */}
        <AlertBanner
          variant="danger"
          title="🔴 Após choque ou aviso de não chocar:"
          description={etapa.proximoPasso}
        />

        <WhyAccordion rationale={etapa.porqueJustificativa} />

        {/* CTA: Voltar ao RCP Componentizado */}
        <PrimaryActionButton
          label="🔴 Retomar RCP por 2 Minutos"
          variant="danger-red"
          onClick={onVoltarRCP}
        />
      </div>
    </div>
  );
}
