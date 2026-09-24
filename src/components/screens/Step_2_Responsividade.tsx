"use client";

/**
 * ETAPA CLÍNICA: 2.1 / 2.2 — Responsividade
 * Fluxo: Pessoa Inconsciente → Cena Segura → Avaliação de Responsividade
 * → SIM (2.1): Vítima consciente/responsiva → Manter, SAMPLA, não movimentar
 * → NÃO (2.2): Inconsciente → Chamar 192 + DEA → Avança para Etapa 3
 */

import React, { useState } from "react";
import {
  ScreenHeader,
  EmergencyImage,
  QuestionCard,
  DecisionButtons,
  AlertBanner,
  TipsCard,
  WhyAccordion,
  NextStepCard,
  StepBadge,
  EmergencyCallButton,
} from "@/components/ui";
import { ETAPAS_CLINICAS, FaixaEtaria } from "@/data/flowchart";
import { SelectionCard } from "@/components/ui";
import { Baby, User, Users } from "lucide-react";

interface Step2ResponsividadeProps {
  onBack: () => void;
  onInconsciente: (faixa: FaixaEtaria) => void; // → 2.2 → Etapa 3
}

const FAIXAS = [
  {
    id: "adulto" as FaixaEtaria,
    nome: "Adulto / Adolescente",
    descricao: "Acima de 12 anos (ou > 55 kg)",
    bgIcon: "bg-red-600",
    icon: <Users className="w-7 h-7 text-white" />,
  },
  {
    id: "crianca" as FaixaEtaria,
    nome: "Criança",
    descricao: "De 1 ano até a puberdade (ou até 55 kg)",
    bgIcon: "bg-emerald-600",
    icon: <User className="w-7 h-7 text-white" />,
  },
  {
    id: "lactente" as FaixaEtaria,
    nome: "Lactente (Bebê)",
    descricao: "Menos de 1 ano de idade",
    bgIcon: "bg-sky-600",
    icon: <Baby className="w-7 h-7 text-white" />,
  },
];

export default function Step_2_Responsividade({
  onBack,
  onInconsciente,
}: Step2ResponsividadeProps) {
  const [resultado, setResultado] = useState<"consciente" | "selecionarFaixa" | null>(null);

  const etapa21 = ETAPAS_CLINICAS["2.1"];
  const etapa22 = ETAPAS_CLINICAS["2.2"];

  // Tela 2.1 — Vítima CONSCIENTE / RESPONSIVA
  if (resultado === "consciente") {
    return (
      <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
        <ScreenHeader title="Vítima Responsiva" onBack={() => setResultado(null)} />

        <StepBadge stepId={etapa21.id} prioridade={etapa21.prioridade} />

        <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
          {/* Diagnóstico */}
          <AlertBanner
            variant="info"
            title={`🟢 ${etapa21.diagnosticoClinico}`}
            description={etapa21.intervencaoImediata}
          />

          <EmergencyImage
            src={etapa21.imagemSrc!}
            alt={etapa21.imagemAlt!}
          />

          {/* Conduta */}
          <TipsCard
            title="Conduta — SAMPLA"
            tips={[
              "S — Sintomas: o que sente agora?",
              "A — Alergias: tem alergia a medicamentos?",
              "M — Medicamentos: usa algum remédio?",
              "P — Passado médico: doenças anteriores?",
              "L — Última refeição: quando comeu pela última vez?",
              "A — Ambiente/Evento: o que aconteceu?",
            ]}
          />

          <NextStepCard nextStep={etapa21.proximoPasso} />
          <WhyAccordion rationale={etapa21.porqueJustificativa} />
        </div>
      </div>
    );
  }

  // Tela 2.2 — Seleção de faixa etária (antes de avançar para Etapa 3)
  if (resultado === "selecionarFaixa") {
    return (
      <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
        <ScreenHeader title="Vítima Inconsciente" onBack={() => setResultado(null)} />

        <StepBadge stepId={etapa22.id} prioridade={etapa22.prioridade} />

        <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
          {/* Alerta de urgência */}
          <AlertBanner
            variant="danger"
            title="🚨 Vítima Inconsciente / Não Responsiva"
            description={etapa22.intervencaoImediata}
          />

          {/* Botão de Chamada Imediata SAMU 192 */}
          <EmergencyCallButton
            number="192"
            name="SAMU"
            description='Peça o envio urgente de ambulância e traga o DEA!'
            variant="red"
          />

          {/* Seleção de faixa etária para calibrar protocolo */}
          <QuestionCard
            variant="plain"
            question="Qual a faixa etária da vítima?"
            subtitle="A técnica de checagem e RCP varia conforme a idade:"
          />

          <div className="flex flex-col space-y-3">
            {FAIXAS.map((f) => (
              <SelectionCard
                key={f.id}
                title={f.nome}
                subtitle={f.descricao}
                icon={f.icon}
                iconBgColor={f.bgIcon}
                onClick={() => onInconsciente(f.id)}
              />
            ))}
          </div>

          <NextStepCard nextStep={etapa22.proximoPasso} />
          <WhyAccordion rationale={etapa22.porqueJustificativa} />
        </div>
      </div>
    );
  }

  // Tela de pergunta principal — A vítima responde?
  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
      <ScreenHeader title="Responsividade" onBack={onBack} />

      <StepBadge stepId="2.1 / 2.2" prioridade="protocolo" />

      <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
        <EmergencyImage
          src="/images/inconsciente_avaliacao.jpg"
          alt="Socorrista avaliando responsividade da vítima tocando os ombros"
        />

        <QuestionCard
          question="A vítima responde quando você chama ou toca firme nos ombros?"
          subtitle="(Lactente: toque a planta do pé)"
        />

        <DecisionButtons
          yesLabel="SIM"
          yesCaption="Responde — consciente"
          onYes={() => setResultado("consciente")}
          noLabel="NÃO"
          noCaption="Não responde — inconsciente"
          onNo={() => setResultado("selecionarFaixa")}
        />

        <TipsCard
          title="Como avaliar"
          tips={[
            "Chame em voz alta pelo nome ou 'Tudo bem?'.",
            "Toque firmemente com as duas mãos nos ombros.",
            "No lactente: toque suave na planta do pé.",
            "Observe qualquer resposta: movimento, gemido, abertura dos olhos.",
          ]}
        />
      </div>
    </div>
  );
}
