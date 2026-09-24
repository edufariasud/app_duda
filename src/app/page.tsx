"use client";

import React, { useState, useCallback } from "react";

// UI Shell
import AppShell from "@/components/ui/AppShell";
import BottomNav, { NavTabId } from "@/components/ui/BottomNav";

// Telas de navegação principal
import HomeScreen, { ModeType } from "@/components/HomeScreen";
import PopulacaoScreen from "@/components/PopulacaoScreen";
import FontesScreen from "@/components/FontesScreen";
import EstudosScreen from "@/components/EstudosScreen";

// Fluxo clínico: Pessoa Inconsciente (Etapas 1→6)
import Step_1_SegurancaCena from "@/components/screens/Step_1_SegurancaCena";
import Step_2_Responsividade from "@/components/screens/Step_2_Responsividade";
import Step_3_CheckPulso from "@/components/screens/Step_3_CheckPulso";
import Step_4_Respiracao from "@/components/screens/Step_4_Respiracao";
import Step_5_RCP from "@/components/screens/Step_5_RCP";
import Step_6_DEA from "@/components/screens/Step_6_DEA";

// Fluxo clínico: Desengasgo / OVACE (Níveis 1→4)
import {
  Step_OVACE_1_Reconhecimento,
  Step_OVACE_2_Manobras,
  Step_OVACE_3_Inconsciente,
  Step_OVACE_4_Desfecho,
} from "@/components/screens/ovace";
import { PerfilOvace } from "@/data/ovaceFlowchart";

import { FaixaEtaria } from "@/data/flowchart";

// ── Tipos de View ─────────────────────────────────────────────────
type ViewType =
  // Navegação principal
  | "home"
  | "populacao"
  | "fontes"
  | "estudante"
  // Fluxo clínico: Pessoa Inconsciente (SBV / APH)
  | "step_1_seguranca"      // Etapas 1.1 / 1.2
  | "step_2_responsividade" // Etapas 2.1 / 2.2
  | "step_3_pulso"          // Etapas 3.1 / 3.2 / 3.3
  | "step_4_respiracao"     // Etapas 4.1 / 4.2 / 4.3
  | "step_5_rcp"            // Etapas 5.1 / 5.2 / 5.3 / 5.4
  | "step_6_dea"            // Etapa 6.1
  // Fluxo clínico: Desengasgo (OVACE)
  | "ovace_1_reconhecimento" // Etapas 1.1 / 1.2
  | "ovace_2_manobras"       // Etapas 2.1 / 2.2 / 2.3 / 2.4
  | "ovace_3_inconsciente"   // Etapas 3.1 / 3.2 / 3.3
  | "ovace_4_desfecho";      // Etapas 4.1 / 4.2

// ── Estado do Fluxo Clínico ───────────────────────────────────────
interface FlowState {
  faixaEtaria: FaixaEtaria;
  isDuvida: boolean; // Veio do caminho 5.4 (dúvida sobre pulso/respiração)
  rcpOrigem: "step_3_pulso" | "step_4_respiracao" | "step_6_dea"; // Origem precisa para o botão Voltar
  deaConectado: boolean; // Se o DEA já foi conectado ao tórax
}

export default function HomePage() {
  const [selectedMode, setSelectedMode] = useState<ModeType>("populacao");
  const [activeTab, setActiveTab] = useState<NavTabId>("inicio");
  const [currentView, setCurrentView] = useState<ViewType>("home");

  // Estado do fluxo SBV / PCR
  const [flowState, setFlowState] = useState<FlowState>({
    faixaEtaria: "adulto",
    isDuvida: false,
    rcpOrigem: "step_3_pulso",
    deaConectado: false,
  });

  // Estado do fluxo OVACE (Desengasgo)
  const [ovacePerfil, setOvacePerfil] = useState<PerfilOvace>("adulto_crianca");
  const [ovaceDesfechoTipo, setOvaceDesfechoTipo] = useState<"sucesso_4_1" | "pcr_dea_4_2">("sucesso_4_1");

  // ── Helpers de navegação ────────────────────────────────────────

  const goTo = useCallback((view: ViewType) => {
    setCurrentView(view);
  }, []);

  const handleTabChange = useCallback(
    (tab: NavTabId) => {
      setActiveTab(tab);
      if (tab === "inicio") goTo("home");
      else if (tab === "mais") goTo("fontes");
      else if (tab === "estudos") goTo("estudante");
      else if (tab === "simulador") goTo("populacao");
    },
    [goTo]
  );

  const handleStart = useCallback(() => {
    if (selectedMode === "populacao") goTo("populacao");
    else if (selectedMode === "estudante") goTo("estudante");
  }, [selectedMode, goTo]);

  // ── Handlers do Fluxo SBV / Inconsciente ────────────────────────

  /** 2.2: Inconsciente → define faixa etária e inicia pulso */
  const handleInconsciente = useCallback(
    (faixa: FaixaEtaria) => {
      setFlowState((prev) => ({
        ...prev,
        faixaEtaria: faixa,
        isDuvida: false,
        deaConectado: false,
      }));
      goTo("step_3_pulso");
    },
    [goTo]
  );

  /** 3: Sem pulso → RCP */
  const handleSemPulso = useCallback(() => {
    setFlowState((prev) => ({
      ...prev,
      isDuvida: false,
      rcpOrigem: "step_3_pulso",
      deaConectado: false,
    }));
    goTo("step_5_rcp");
  }, [goTo]);

  /** 4.2/4.3: Pulso cessou durante ventilação → RCP */
  const handlePulsoCessou = useCallback(() => {
    setFlowState((prev) => ({
      ...prev,
      isDuvida: false,
      rcpOrigem: "step_4_respiracao",
      deaConectado: false,
    }));
    goTo("step_5_rcp");
  }, [goTo]);

  /** 5.4: Dúvida sobre pulso ou respiração → RCP (tratar como PCR) */
  const handleDuvidaPulso = useCallback(
    (origem: "step_3_pulso" | "step_4_respiracao" = "step_3_pulso") => {
      setFlowState((prev) => ({
        ...prev,
        isDuvida: true,
        rcpOrigem: origem,
        deaConectado: false,
      }));
      goTo("step_5_rcp");
    },
    [goTo]
  );

  /** 5 → 6: RCP → DEA chegou */
  const handleIrParaDEA = useCallback(() => goTo("step_6_dea"), [goTo]);

  /** 6 → 5: Pós-choque → voltar ao RCP por 2 min com DEA conectado */
  const handleVoltarRCP = useCallback(() => {
    setFlowState((prev) => ({
      ...prev,
      isDuvida: false,
      rcpOrigem: "step_6_dea",
      deaConectado: true,
    }));
    goTo("step_5_rcp");
  }, [goTo]);

  // ── Renderização Condicional ────────────────────────────────────

  const renderContent = () => {
    switch (currentView) {
      // ── FONTES E REFERÊNCIAS
      case "fontes":
        return (
          <FontesScreen
            onBack={() => {
              goTo("home");
              setActiveTab("inicio");
            }}
          />
        );

      // ── ESTUDOS / TABELA DE PARÂMETROS
      case "estudante":
        return (
          <EstudosScreen
            onBack={() => {
              goTo("home");
              setActiveTab("inicio");
            }}
          />
        );

      // ── MENU DE EMERGÊNCIAS
      case "populacao":
        return (
          <PopulacaoScreen
            onBack={() => goTo("home")}
            onSelectEmergency={(id) => {
              if (id === "inconsciente") goTo("step_1_seguranca");
              if (id === "engasgo") goTo("ovace_1_reconhecimento");
            }}
          />
        );

      // ── FLUXO SBV: ETAPA 1 — Segurança da Cena
      case "step_1_seguranca":
        return (
          <Step_1_SegurancaCena
            onBack={() => goTo("populacao")}
            onCenaSegura={() => goTo("step_2_responsividade")}
          />
        );

      // ── FLUXO SBV: ETAPA 2 — Responsividade
      case "step_2_responsividade":
        return (
          <Step_2_Responsividade
            onBack={() => goTo("step_1_seguranca")}
            onInconsciente={handleInconsciente}
          />
        );

      // ── FLUXO SBV: ETAPA 3 — Checagem de Pulso
      case "step_3_pulso":
        return (
          <Step_3_CheckPulso
            faixaEtaria={flowState.faixaEtaria}
            onBack={() => goTo("step_2_responsividade")}
            onPulsoPresente={() => goTo("step_4_respiracao")}
            onSemPulso={handleSemPulso}
            onDuvida={() => handleDuvidaPulso("step_3_pulso")}
          />
        );

      // ── FLUXO SBV: ETAPA 4 — Respiração / PLS / Ventilação
      case "step_4_respiracao":
        return (
          <Step_4_Respiracao
            faixaEtaria={flowState.faixaEtaria}
            onBack={() => goTo("step_3_pulso")}
            onPulsoCessou={handlePulsoCessou}
            onDuvida={() => handleDuvidaPulso("step_4_respiracao")}
          />
        );

      // ── FLUXO SBV: ETAPA 5 — RCP
      case "step_5_rcp":
        return (
          <Step_5_RCP
            faixaEtaria={flowState.faixaEtaria}
            isDuvida={flowState.isDuvida}
            deaConectado={flowState.deaConectado}
            onBack={() => goTo(flowState.rcpOrigem)}
            onIrParaDEA={handleIrParaDEA}
            onReavaliarSemDEA={() => goTo("step_3_pulso")}
            onRecuperouSinais={() => goTo("step_4_respiracao")}
          />
        );

      // ── FLUXO SBV: ETAPA 6 — DEA
      case "step_6_dea":
        return (
          <Step_6_DEA
            faixaEtaria={flowState.faixaEtaria}
            onBack={() => goTo("step_5_rcp")}
            onVoltarRCP={handleVoltarRCP}
          />
        );

      // ── FLUXO OVACE: NÍVEL 1 — Reconhecimento da Obstrução (1.1 / 1.2)
      case "ovace_1_reconhecimento":
        return (
          <Step_OVACE_1_Reconhecimento
            onBack={() => goTo("populacao")}
            onAvancarManobra={(perfil) => {
              setOvacePerfil(perfil);
              goTo("ovace_2_manobras");
            }}
          />
        );

      // ── FLUXO OVACE: NÍVEL 2 — Manobras Específicas (2.1 / 2.2 / 2.3 / 2.4)
      case "ovace_2_manobras":
        return (
          <Step_OVACE_2_Manobras
            perfil={ovacePerfil}
            onBack={() => goTo("ovace_1_reconhecimento")}
            onSucesso={() => {
              setOvaceDesfechoTipo("sucesso_4_1");
              goTo("ovace_4_desfecho");
            }}
            onInconsciente={() => goTo("ovace_3_inconsciente")}
          />
        );

      // ── FLUXO OVACE: NÍVEL 3 — Vítima Inconsciente e Vias Aéreas (3.1 / 3.2 / 3.3)
      case "ovace_3_inconsciente":
        return (
          <Step_OVACE_3_Inconsciente
            onBack={() => goTo("ovace_2_manobras")}
            onRecuperou={() => {
              setOvaceDesfechoTipo("sucesso_4_1");
              goTo("ovace_4_desfecho");
            }}
            onPcrMantida={() => {
              setOvaceDesfechoTipo("pcr_dea_4_2");
              goTo("ovace_4_desfecho");
            }}
          />
        );

      // ── FLUXO OVACE: NÍVEL 4 — Desfecho Clínico (4.1 / 4.2)
      case "ovace_4_desfecho":
        return (
          <Step_OVACE_4_Desfecho
            tipo={ovaceDesfechoTipo}
            onBack={() =>
              goTo(ovaceDesfechoTipo === "sucesso_4_1" ? "ovace_2_manobras" : "ovace_3_inconsciente")
            }
            onConcluir={() => {
              goTo("home");
              setActiveTab("inicio");
            }}
            onIrParaDEA={() => goTo("step_6_dea")}
          />
        );

      // ── TELA INICIAL (HOME)
      default:
        return (
          <HomeScreen
            selectedMode={selectedMode}
            onSelectMode={(mode) => {
              setSelectedMode(mode);
              if (mode === "populacao") goTo("populacao");
              else if (mode === "estudante") goTo("estudante");
            }}
            onStart={handleStart}
          />
        );
    }
  };

  return (
    <AppShell footer={<BottomNav activeTab={activeTab} onTabChange={handleTabChange} />}>
      {renderContent()}
    </AppShell>
  );
}
