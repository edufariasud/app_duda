"use client";

/**
 * ETAPA CLÍNICA: 4.1 / 4.2 — Desfechos Clínicos da Obstrução de Vias Aéreas
 * Nível 4 da Árvore de Decisão de OVACE
 * → 4.1: Vítima expeliu o corpo estranho / recuperou ventilação espontânea
 *        Conduta: Posição Lateral de Segurança + Encaminhamento hospitalar mandatório
 * → 4.2: Vítima permanece em PCR após ciclos
 *        Conduta: Desfibrilação Precoce (DEA) + RCP contínua ininterrupta
 */

import React from "react";
import {
  ScreenHeader,
  AlertBanner,
  TipsCard,
  WhyAccordion,
  NextStepCard,
  StepBadge,
  PrimaryActionButton,
  ClinicalSpecsCard,
} from "@/components/ui";
import { ETAPAS_OVACE } from "@/data/ovaceFlowchart";

interface StepOVACE4Props {
  tipo: "sucesso_4_1" | "pcr_dea_4_2";
  onBack: () => void;
  onConcluir: () => void;
  onIrParaDEA?: () => void;
}

export function Step_OVACE_4_Desfecho({
  tipo,
  onBack,
  onConcluir,
  onIrParaDEA,
}: StepOVACE4Props) {
  const etapa41 = ETAPAS_OVACE["4.1"];
  const etapa42 = ETAPAS_OVACE["4.2"];

  // ── DESFECHO 4.1: Corpo Estranho Expelido com Sucesso ─────────
  if (tipo === "sucesso_4_1") {
    return (
      <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
        <ScreenHeader title="Vias Desobstruídas" onBack={onBack} />

        <StepBadge stepId={etapa41.id} prioridade={etapa41.prioridade} />

        <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
          <AlertBanner
            variant="success"
            title="🟢 CORPO ESTRANHO EXPELIDO COM SUCESSO"
            description="A via aérea foi liberada e a vítima restabeleceu a ventilação."
          />

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-xs">
            <p className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-1">
              {etapa41.diagnosticoClinico}
            </p>
            <h2 className="text-xl sm:text-2xl font-black text-emerald-950 leading-snug">
              {etapa41.desvioProximoPasso}
            </h2>
            <p className="text-sm sm:text-base font-bold text-emerald-900 mt-2 leading-relaxed">
              {etapa41.intervencaoImediata}
            </p>
          </div>

          <ClinicalSpecsCard
            title="Cuidados Imediatos Pós-Desengasgo"
            items={[
              { label: "Se Consciente", value: "Mantenha sentada em repouso confortável. Acalme e monitore" },
              { label: "Se Inconsciente", value: "Coloque em Posição Lateral de Segurança (PLS) para drenagem" },
              { label: "Exame Obrigatório", value: "Transporte para emergência hospitalar mesmo se estiver bem" },
              { label: "Monitoramento", value: "Checar frequência respiratória e cor da pele a cada minuto" },
            ]}
          />

          <AlertBanner
            variant="warning"
            title="⚠️ AVALIAÇÃO MÉDICA HOSPITALAR MANDATÓRIA"
            description="As manobras de Heimlich e compressões aplicam alta pressão interna. É obrigatório passar por avaliação médica para descartar lesões em órgãos abdominais, fraturas de cartilagem/costelas ou edema de laringe tardio."
          />

          <NextStepCard nextStep={etapa41.proximoPasso} />

          <WhyAccordion rationale={etapa41.porqueJustificativa} />

          <div className="pt-2">
            <PrimaryActionButton
              label="🏠 Finalizar Atendimento e Voltar ao Início"
              variant="success-green"
              onClick={onConcluir}
            />
          </div>
        </div>
      </div>
    );
  }

  // ── DESFECHO 4.2: PCR Mantida com DEA na Cena ──────────────────
  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
      <ScreenHeader title="PCR Mantida — DEA" onBack={onBack} />

      <StepBadge stepId={etapa42.id} prioridade={etapa42.prioridade} />

      <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
        <AlertBanner
          variant="danger"
          title="⚡ PARADA CARDIORRESPIRATÓRIA HIPÓXICA REFRATÁRIA"
          description="A asfixia prolongada degradou o ritmo cardíaco. Desfibrilação e RCP contínua são mandatórios!"
        />

        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 shadow-xs">
          <p className="text-sm font-bold text-purple-800 uppercase tracking-wider mb-1">
            {etapa42.diagnosticoClinico}
          </p>
          <h2 className="text-xl sm:text-2xl font-black text-purple-950 leading-snug">
            {etapa42.desvioProximoPasso}
          </h2>
          <p className="text-sm sm:text-base font-bold text-purple-900 mt-2 leading-relaxed">
            {etapa42.intervencaoImediata}
          </p>
        </div>

        <TipsCard
          title="Diretrizes de Suporte Contínuo"
          tips={[
            "Conecte as pás adesivas com o tórax seco e desnudo.",
            "Não interrompa compressões enquanto o DEA prepara a análise.",
            "Afaste todos no momento do choque.",
            "Retome imediatamente as compressões após o choque por 2 minutos (5 ciclos).",
            "Alterne o socorrista que comprime a cada 2 minutos para evitar exaustão.",
          ]}
        />

        <NextStepCard nextStep={etapa42.proximoPasso} />

        <WhyAccordion rationale={etapa42.porqueJustificativa} />

        <div className="space-y-3 pt-2">
          {onIrParaDEA && (
            <PrimaryActionButton
              label="⚡ Abrir Protocolo DEA & Choque"
              variant="primary-blue"
              onClick={onIrParaDEA}
            />
          )}

          <PrimaryActionButton
            label="🔄 Retornar ao Ciclo de RCP"
            variant="danger-red"
            onClick={onBack}
          />
        </div>
      </div>
    </div>
  );
}
