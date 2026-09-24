"use client";

/**
 * ETAPA CLÍNICA: 5.1 / 5.2 / 5.3 / 5.4 — RCP (Compressões Torácicas)
 * Fluxo: Sem pulso confirmado OU dúvida → RCP imediata conforme faixa etária
 * → 5.1: PCR Adulto — 2 mãos, 5-6 cm, 30:2
 * → 5.2: PCR Criança — 1-2 mãos, 5 cm, 30:2 / 15:2
 * → 5.3: PCR Lactente — 2 dedos / 2 polegares, 4 cm, 30:2 / 15:2
 * → 5.4: Dúvida → tratar obrigatoriamente como PCR
 * → Continua para Etapa 6 (DEA)
 */

import React from "react";
import {
  ScreenHeader,
  EmergencyImage,
  AlertBanner,
  TipsCard,
  WhyAccordion,
  NextStepCard,
  StepBadge,
  ClinicalSpecsCard,
  PrimaryActionButton,
} from "@/components/ui";
import { ETAPAS_CLINICAS, FaixaEtaria, getRcpEtapaId } from "@/data/flowchart";

interface Step5RCPProps {
  faixaEtaria: FaixaEtaria;
  isDuvida?: boolean; // Veio do caminho 5.4 (dúvida)
  deaConectado?: boolean; // DEA já está instalado no paciente
  onBack: () => void;
  onIrParaDEA: () => void; // → Etapa 6.1 (ou nova análise no DEA)
  onReavaliarSemDEA?: () => void; // → Reavaliar pulso/respiração após 2 min se não houver DEA
  onRecuperouSinais?: () => void; // → Vítima recuperou sinais vitais (RCE → PLS)
}

const PARAMETROS_RCP: Record<
  FaixaEtaria,
  {
    tecnica: string[];
    profundidade: string;
    relacao: string;
    ritmo: string;
  }
> = {
  adulto: {
    tecnica: [
      "Posicione-se ajoelhado ao lado do tórax da vítima.",
      "Coloque a base de uma mão sobre o centro do esterno (metade inferior).",
      "Sobreponha a segunda mão entrelaçando os dedos.",
      "Mantenha os braços retos e os ombros diretamente sobre as mãos.",
      "Comprima firme e permita o retorno completo do tórax entre compressões.",
      "Não apoie peso entre as compressões.",
    ],
    profundidade: "5 a 6 cm (nunca exceder 6 cm)",
    relacao: "30 compressões : 2 ventilações",
    ritmo: "100 a 120 compressões por minuto",
  },
  crianca: {
    tecnica: [
      "Use 1 mão (crianças menores) ou 2 mãos (crianças maiores/adolescentes).",
      "Posicione no terço inferior do esterno.",
      "Com 1 socorrista: relação 30:2.",
      "Com 2 socorristas: relação 15:2 (otimiza ventilação).",
      "Permita o retorno completo do tórax entre compressões.",
    ],
    profundidade: "5 cm (aproximadamente 1/3 do tórax)",
    relacao: "30:2 (1 socorrista) ou 15:2 (2 socorristas)",
    ritmo: "100 a 120 compressões por minuto",
  },
  lactente: {
    tecnica: [
      "1 Socorrista: use 2 dedos (indicador + médio) no centro do esterno, logo abaixo da linha dos mamilos.",
      "2 Socorristas: técnica dos 2 polegares circundando o tórax — gera maior pressão.",
      "Com 1 socorrista: relação 30:2.",
      "Com 2 socorristas: relação 15:2.",
      "Permita o retorno completo do tórax entre compressões.",
    ],
    profundidade: "4 cm (aproximadamente 1/3 do tórax)",
    relacao: "30:2 (1 socorrista) ou 15:2 (2 socorristas)",
    ritmo: "100 a 120 compressões por minuto",
  },
};

export default function Step_5_RCP({
  faixaEtaria,
  isDuvida = false,
  deaConectado = false,
  onBack,
  onIrParaDEA,
  onReavaliarSemDEA,
  onRecuperouSinais,
}: Step5RCPProps) {
  const etapaId = getRcpEtapaId(faixaEtaria);
  const etapa = ETAPAS_CLINICAS[etapaId];
  const etapa54 = ETAPAS_CLINICAS["5.4"];
  const params = PARAMETROS_RCP[faixaEtaria];

  const NOMES_FAIXA: Record<FaixaEtaria, string> = {
    adulto: "Adulto",
    crianca: "Criança",
    lactente: "Lactente (Bebê)",
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
      <ScreenHeader
        title={isDuvida ? `Suspeita de PCR — ${NOMES_FAIXA[faixaEtaria]}` : `RCP — ${NOMES_FAIXA[faixaEtaria]}`}
        onBack={onBack}
      />

      <StepBadge
        stepId={isDuvida ? etapa54.id : etapaId}
        prioridade={isDuvida ? etapa54.prioridade : etapa.prioridade}
      />

      <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
        {/* Alerta se o DEA já estiver conectado */}
        {deaConectado && (
          <AlertBanner
            variant="warning"
            title="⚡ DEA Conectado — Ciclo de 2 Minutos de RCP"
            description="Realize as compressões torácicas sem interrupção. Ao completar os 2 minutos, o aparelho analisará novamente o ritmo cardíaco."
          />
        )}

        {/* Alerta de Diagnóstico Clínico e Conduta (CSV) */}
        {isDuvida ? (
          <AlertBanner
            variant="danger"
            title={`🔴 ${etapa54.diagnosticoClinico} (${NOMES_FAIXA[faixaEtaria]})`}
            description={etapa54.intervencaoImediata}
          />
        ) : (
          <AlertBanner
            variant="danger"
            title={`🔴 ${etapa.diagnosticoClinico}`}
            description={etapa.intervencaoImediata}
          />
        )}

        <EmergencyImage
          src="/images/rcp_adulto.jpg"
          alt={`Técnica de RCP em ${NOMES_FAIXA[faixaEtaria].toLowerCase()}`}
        />

        {/* Parâmetros clínicos em destaque componentizados */}
        <ClinicalSpecsCard
          title="Parâmetros de RCP"
          variant="red"
          items={[
            { label: "Profundidade", value: params.profundidade },
            { label: "Relação", value: params.relacao },
            { label: "Ritmo", value: params.ritmo },
          ]}
        />

        {/* Técnica detalhada */}
        <TipsCard title="Técnica passo a passo" tips={params.tecnica} />

        {/* Próximo Passo Crítico (Fidelidade ao CSV) */}
        <NextStepCard nextStep={isDuvida ? etapa54.proximoPasso : etapa.proximoPasso} />

        {/* Justificativa Clínica (CSV) */}
        {isDuvida ? (
          <>
            <WhyAccordion
              label="💡 Por que tratar a dúvida obrigatoriamente como PCR?"
              rationale={etapa54.porqueJustificativa}
            />
            <WhyAccordion
              label={`Por que a técnica em ${NOMES_FAIXA[faixaEtaria].toLowerCase()} é essa?`}
              rationale={etapa.porqueJustificativa}
            />
          </>
        ) : (
          <WhyAccordion rationale={etapa.porqueJustificativa} />
        )}

        {/* Ações de Continuidade e Desfecho Componentizadas */}
        <div className="flex flex-col space-y-3 pt-2">
          {/* Botão DEA */}
          <PrimaryActionButton
            label={
              deaConectado
                ? "⚡ 2 Minutos Concluídos — Analisar Ritmo no DEA"
                : "⚡ DEA Chegou — Conectar e Usar Agora"
            }
            variant="primary-blue"
            onClick={onIrParaDEA}
          />

          {/* Opção sem DEA (reavaliação a cada 2 min) */}
          {!deaConectado && onReavaliarSemDEA && (
            <PrimaryActionButton
              label="⏱️ Reavaliar Sinais (Sem DEA — após 2 min)"
              variant="secondary-slate"
              onClick={onReavaliarSemDEA}
            />
          )}

          {/* Retorno da Circulação Espontânea (RCE) */}
          {onRecuperouSinais && (
            <PrimaryActionButton
              label="🟢 Vítima recuperou sinais vitais (PLS)"
              variant="success-green"
              onClick={onRecuperouSinais}
            />
          )}
        </div>
      </div>
    </div>
  );
}
