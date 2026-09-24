"use client";

/**
 * ETAPA CLÍNICA: 4.1 / 4.2 / 4.3 — Respiração e Sinais Vitais
 * Fluxo: Etapa 3 (pulso presente) → Avaliar respiração
 * → SIM (4.1): Respira normalmente + tem pulso → PLS (Posição Lateral de Segurança)
 * → NÃO + Adulto (4.2): Parada Respiratória → Ventilação de Resgate (1 a cada 6s)
 * → NÃO + Pediatria (4.3): Parada Respiratória → Ventilação (1 a cada 2-3s)
 */

import React, { useState } from "react";
import {
  ScreenHeader,
  EmergencyImage,
  QuestionCard,
  AlertBanner,
  TipsCard,
  WhyAccordion,
  NextStepCard,
  StepBadge,
  DecisionOptionCard,
  PrimaryActionButton,
} from "@/components/ui";
import { ETAPAS_CLINICAS, FaixaEtaria, getVentilacaoEtapaId } from "@/data/flowchart";

interface Step4RespiracaoProps {
  faixaEtaria: FaixaEtaria;
  onBack: () => void;
  onPulsoCessou: () => void;   // → Etapa 5: RCP (pulso parou durante ventilação)
  onDuvida: () => void;        // → Etapa 5.4: Dúvida na respiração / gasping → tratar como PCR
}

export default function Step_4_Respiracao({
  faixaEtaria,
  onBack,
  onPulsoCessou,
  onDuvida,
}: Step4RespiracaoProps) {
  const [resultado, setResultado] = useState<"pls" | "ventilacao" | null>(null);

  const etapa41 = ETAPAS_CLINICAS["4.1"];
  const ventEtapaId = getVentilacaoEtapaId(faixaEtaria);
  const etapaVent = ETAPAS_CLINICAS[ventEtapaId];
  const etapa54 = ETAPAS_CLINICAS["5.4"];

  // Tela 4.1 — PLS: Respira + Tem Pulso
  if (resultado === "pls") {
    return (
      <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
        <ScreenHeader title={etapa41.desvioProximoPasso.replace("🟡 ", "")} onBack={() => setResultado(null)} />

        <StepBadge stepId={etapa41.id} prioridade={etapa41.prioridade} />

        <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
          <AlertBanner
            variant="info"
            title={`${etapa41.desvioProximoPasso} — ${etapa41.diagnosticoClinico}`}
            description={etapa41.intervencaoImediata}
          />

          <EmergencyImage
            src={etapa41.imagemSrc!}
            alt={etapa41.imagemAlt!}
          />

          <TipsCard
            title="Como posicionar (PLS)"
            tips={[
              "Ajoelhe-se ao lado da vítima.",
              "Coloque o braço mais próximo estendido, perpendicular ao corpo.",
              "Dobre o joelho mais distante e use como alavanca.",
              "Gire a vítima de lado, apoiando a cabeça.",
              "Ajuste a mão superior sob a bochecha para manter a cabeça inclinada.",
              "Lactente: mantenha de lado no colo, inclinado levemente para frente.",
            ]}
          />

          <NextStepCard nextStep={etapa41.proximoPasso} />
          <WhyAccordion rationale={etapa41.porqueJustificativa} />

          {/* Ação de emergência: se a vítima parar de respirar em PLS */}
          <div className="pt-2">
            <p className="text-sm font-bold text-slate-600 text-center mb-2">
              A vítima parou de respirar durante o monitoramento?
            </p>
            <PrimaryActionButton
              label="🔴 Vítima Parou de Respirar — Iniciar RCP"
              variant="danger-red"
              onClick={onPulsoCessou}
            />
          </div>
        </div>
      </div>
    );
  }

  // Tela 4.2 / 4.3 — Ventilação de Resgate
  if (resultado === "ventilacao") {
    const isAdulto = faixaEtaria === "adulto";
    const freq = isAdulto ? "1 a cada 6 segundos (10/min)" : "1 a cada 2-3 segundos (20-30/min)";

    return (
      <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
        <ScreenHeader title={etapaVent.desvioProximoPasso.replace("🟠 ", "")} onBack={() => setResultado(null)} />

        <StepBadge stepId={etapaVent.id} prioridade={etapaVent.prioridade} />

        <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
          <AlertBanner
            variant="warning"
            title={`${etapaVent.desvioProximoPasso} — ${etapaVent.diagnosticoClinico}`}
            description={etapaVent.intervencaoImediata}
          />

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 text-center">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
              Frequência de Ventilação
            </p>
            <p className="text-xl sm:text-2xl font-black text-[#1d4ed8] leading-snug">
              {freq}
            </p>
          </div>

          <TipsCard
            title="Técnica de ventilação"
            tips={
              isAdulto
                ? [
                    "Incline a cabeça e eleve o queixo (hiperextensão).",
                    "Use bolsa-válvula-máscara ou máscara de barreira.",
                    "Forneça volume suficiente para elevar o tórax.",
                    "Reavalie o pulso carotídeo a cada 2 minutos.",
                    "Se o pulso cessar: inicie RCP 30:2 imediatamente!",
                  ]
                : [
                    "Incline suavemente a cabeça (menos que em adultos).",
                    "No lactente: cubra boca E nariz com sua boca.",
                    "Volume deve ser suave — apenas o suficiente para elevar o tórax.",
                    "Reavalie pulso braquial/femoral a cada 2 minutos.",
                    "Se FC < 60 bpm: inicie compressões torácicas!",
                  ]
            }
          />

          <NextStepCard nextStep={etapaVent.proximoPasso} />
          <WhyAccordion rationale={etapaVent.porqueJustificativa} />

          {/* Ação de emergência: pulso cessou durante ventilação */}
          <div className="pt-2">
            <p className="text-sm font-bold text-slate-600 text-center mb-3">
              O pulso cessou durante a ventilação?
            </p>
            <PrimaryActionButton
              label="🔴 Iniciar RCP Agora"
              variant="danger-red"
              onClick={onPulsoCessou}
            />
          </div>
        </div>
      </div>
    );
  }

  // Tela de pergunta principal — Avaliação Respiratória
  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
      <ScreenHeader title="Respiração" onBack={onBack} />

      <StepBadge stepId="4.1 / 4.2 / 4.3" prioridade="protocolo" />

      <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
        <QuestionCard
          variant="plain"
          question={etapa41.perguntaCentral}
          subtitle="Observe por até 10 segundos: ver o tórax, ouvir e sentir o fluxo de ar."
        />

        <EmergencyImage
          src="/images/respiracao_avaliacao.jpg"
          alt="Socorrista avaliando respiração da vítima"
        />

        <div className="flex flex-col space-y-3">
          <DecisionOptionCard
            actionLabel="SIM"
            actionVariant="green"
            description={`${etapa41.desvioProximoPasso} — Respira normalmente e tem pulso palpável`}
            onClick={() => setResultado("pls")}
          />
          <DecisionOptionCard
            actionLabel="NÃO"
            actionVariant="red"
            description={`${etapaVent.desvioProximoPasso} — ${etapaVent.perguntaCentral}`}
            onClick={() => setResultado("ventilacao")}
          />
          <DecisionOptionCard
            actionLabel="DÚVIDA"
            actionVariant="amber"
            description={`${etapa54.desvioProximoPasso} — Dúvida se a respiração é normal ou agônica (gasping)`}
            onClick={onDuvida}
          />
        </div>

        <TipsCard
          title="Como avaliar a respiração"
          tips={[
            "VER: o tórax se expande de forma simétrica e eficaz?",
            "OUVIR: há ruídos respiratórios claros ou sons de asfixia?",
            "SENTIR: o ar toca a sua bochecha na aproximação?",
            "ATENÇÃO: Respiração agônica (gasping/engasgos) NÃO é respiração eficaz. Na dúvida, trate como PCR!",
          ]}
        />
      </div>
    </div>
  );
}
