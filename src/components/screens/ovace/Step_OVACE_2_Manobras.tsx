"use client";

/**
 * ETAPA CLÍNICA: 2.1 / 2.2 / 2.3 / 2.4 — Manobras Específicas de Desengasgo
 * Nível 2 da Árvore de Decisão de OVACE
 * → 2.1: Manobra de Heimlich em Adulto ou Criança (> 1 ano)
 * → 2.2: 5 Golpes Dorsais + 5 Compressões em Lactente (< 1 ano)
 * → 2.3: Compressões Torácicas em Gestante ou Obeso Mórbido
 * → 2.4: Auto-Heimlich em Vítima Desacompanhada
 *
 * Desvios da Árvore:
 * → Sucesso: Corpo estranho expelido → Avança para Etapa 4.1
 * → Complicação: Vítima perde a consciência → Avança para Etapa 3.1
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
  QuestionCard,
} from "@/components/ui";
import { ETAPAS_OVACE, PerfilOvace } from "@/data/ovaceFlowchart";

interface StepOVACE2Props {
  perfil: PerfilOvace;
  onBack: () => void;
  onSucesso: () => void; // → Etapa 4.1
  onInconsciente: () => void; // → Etapa 3.1
}

export function Step_OVACE_2_Manobras({
  perfil,
  onBack,
  onSucesso,
  onInconsciente,
}: StepOVACE2Props) {
  const getEtapaId = (): string => {
    switch (perfil) {
      case "adulto_crianca":
        return "2.1";
      case "lactente":
        return "2.2";
      case "gestante_obeso":
        return "2.3";
      case "solitario":
        return "2.4";
    }
  };

  const etapaId = getEtapaId();
  const etapa = ETAPAS_OVACE[etapaId];

  // Configuração dos parâmetros técnicos por perfil
  const getSpecs = () => {
    switch (perfil) {
      case "adulto_crianca":
        return [
          { label: "Posição", value: "Em pé atrás da vítima (ajoelhe-se se criança)" },
          { label: "Ponto Anatômico", value: "Acima do umbigo, abaixo do osso esterno" },
          { label: "Movimento", value: "Compressões vigorosas para dentro e para cima (em 'J')" },
          { label: "Frequência", value: "Contínuo até desobstruir ou perder a consciência" },
        ];
      case "lactente":
        return [
          { label: "Posição", value: "Bebê de bruços sobre o antebraço em declive, apoiando a mandíbula" },
          { label: "Dorsal", value: "5 golpes secos e firmes entre as escápulas com o calcanhar da mão" },
          { label: "Torácica", value: "Vire de frente e aplique 5 compressões no centro do peito (2 dedos)" },
          { label: "Atenção", value: "Manter a cabeça sempre mais baixa que o tórax" },
        ];
      case "gestante_obeso":
        return [
          { label: "Posição", value: "Atrás da vítima, braços sob as axilas abraçando o tórax médio" },
          { label: "Ponto Anatômico", value: "Centro do esterno (mesmo ponto da RCP — NUNCA no abdome)" },
          { label: "Movimento", value: "Puxadas rápidas e firmes para trás contra o tórax" },
          { label: "Objetivo", value: "Elevar pressão intratorácica sem comprimir o útero / vísceras" },
        ];
      case "solitario":
        return [
          { label: "Apoio Rígido", value: "Borda superior de encosto de cadeira, mesa ou corrimão firme" },
          { label: "Ponto de Contato", value: "Acima do umbigo, na boca do estômago" },
          { label: "Movimento", value: "Projete o peso do corpo com força contra a borda" },
          { label: "Segurança", value: "Destranque a porta antes de iniciar caso perca a consciência" },
        ];
    }
  };

  const getDicas = () => {
    switch (perfil) {
      case "adulto_crianca":
        return [
          "Coloque uma de suas pernas entre as pernas da vítima para estabilidade caso ela desmaie.",
          "Feche uma mão com o polegar voltado para o abdome da vítima.",
          "Envolva o punho fechado com a outra mão e comprima com força.",
          "Cada compressão deve ser um movimento independente com intenção de expelir.",
        ];
      case "lactente":
        return [
          "Apoie o seu antebraço sobre a sua coxa para firmeza e controle.",
          "Segure a mandíbula do bebê com os dedos em 'V' sem apertar a garganta.",
          "Ao final de cada ciclo de 5 golpes e 5 compressões, olhe rapidamente a boca.",
          "NUNCA faça varredura cega com o dedo!",
        ];
      case "gestante_obeso":
        return [
          "Indicado para gestantes a partir do 2º trimestre e obesos mórbidos.",
          "As compressões torácicas substituem a manobra subdiafragmática com eficácia idêntica.",
          "Permita a expansão torácica completa entre cada tração.",
        ];
      case "solitario":
        return [
          "Se não houver cadeira rígida, use a borda de uma bancada ou mesa firme.",
          "Mantenha a calma para economizar oxigênio.",
          "Ligue para o 192 mesmo sem conseguir falar; o sistema do SAMU rastreia a chamada.",
        ];
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
      <ScreenHeader title={etapa.etapa} onBack={onBack} />

      <StepBadge stepId={etapa.id} prioridade={etapa.prioridade} />

      <div className="flex-1 px-4 py-4 flex flex-col space-y-4">
        {/* Ponto de Decisão do CSV */}
        <QuestionCard
          variant="plain"
          question={etapa.perguntaCentral}
          subtitle={`Condição: ${etapa.respostaCondicao} → ${etapa.desvioProximoPasso}`}
        />

        {/* Diagnóstico e Instrução Imediata */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 shadow-xs">
          <p className="text-sm font-bold text-red-700 uppercase tracking-wider mb-1">
            {etapa.diagnosticoClinico}
          </p>
          <p className="text-base sm:text-lg font-black text-red-950 leading-snug">
            {etapa.intervencaoImediata}
          </p>
        </div>

        {/* Especificações Técnicas Padronizadas */}
        <ClinicalSpecsCard title="Protocolo de Execução" items={getSpecs()} />

        {/* Dicas e Instruções Práticas */}
        <TipsCard title="Como executar com segurança" tips={getDicas()} />

        <NextStepCard nextStep={etapa.proximoPasso} />

        <WhyAccordion rationale={etapa.porqueJustificativa} />

        {/* Botões de Ação Direta da Árvore de Decisão */}
        <div className="space-y-3 pt-2">
          <PrimaryActionButton
            label="🟢 Corpo Estranho Expelido (Vítima Desengasgou)"
            variant="success-green"
            onClick={onSucesso}
          />

          <PrimaryActionButton
            label="🔴 Vítima Perdeu a Consciência (Iniciar RCP)"
            variant="danger-red"
            onClick={onInconsciente}
          />
        </div>
      </div>
    </div>
  );
}
