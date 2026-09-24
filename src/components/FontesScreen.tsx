"use client";

import React from "react";
import ScreenHeader from "@/components/ui/ScreenHeader";
import AlertBanner from "@/components/ui/AlertBanner";
import ReferenceCard, { ReferenceItem } from "@/components/ui/ReferenceCard";

interface FontesScreenProps {
  onBack: () => void;
}

export default function FontesScreen({ onBack }: FontesScreenProps) {
  const fontes: ReferenceItem[] = [
    {
      instituicao: "Ministério da Saúde & SAMU 192",
      titulo: "Protocolos de Intervenção para o SAMU 192",
      descricao:
        "Padronização oficial das condutas e fluxos de atendimento do Suporte Básico e Avançado de Vida no Atendimento Pré-Hospitalar (APH) móvel no Brasil.",
      ano: "Diretrizes Nacionais Vigentes",
      tag: "Brasil / SUS",
      link: "https://www.gov.br/saude/pt-br",
    },
    {
      instituicao: "American Heart Association (AHA)",
      titulo: "2020 AHA Guidelines for CPR and ECC",
      descricao:
        "Diretrizes mundiais de referência para Ressuscitação Cardiopulmonar e Emergência Cardiovascular, publicadas na revista Circulation. Base para frequências (100-120 bpm) e profundidades de compressão.",
      ano: "Circulation 2020; 142(16_suppl_2)",
      tag: "Referência Global",
      link: "https://cpr.heart.org",
    },
    {
      instituicao: "Sociedade Brasileira de Cardiologia (SBC)",
      titulo: "Atualização da Diretriz de Ressuscitação Cardiopulmonar (2019/2020)",
      descricao:
        "Consenso brasileiro de especialistas publicado nos Arquivos Brasileiros de Cardiologia sobre atendimento da PCR em adultos e pediatria no Brasil.",
      ano: "Arq Bras Cardiol. 2019; 113(3):449-663",
      tag: "Cardiologia Brasil",
      link: "https://abccardiol.org",
    },
    {
      instituicao: "Sociedade Brasileira de Pediatria (SBP)",
      titulo: "Reanimação Cardiopulmonar em Pediatria e PALS",
      descricao:
        "Recomendações clínicas para lactentes e crianças, enfatizando causas hipóxicas/respiratórias e técnica de 2 dedos ou 2 polegares.",
      ano: "SBP PALS Brasil",
      tag: "Pediatria",
      link: "https://www.sbp.com.br",
    },
    {
      instituicao: "European Resuscitation Council (ERC)",
      titulo: "ERC Guidelines 2021: Basic Life Support",
      descricao:
        "Orientações do conselho europeu focadas na rápida identificação da parada cardíaca, respiração agônica (gasping) e ação imediata de leigos.",
      ano: "Resuscitation (2021)",
      tag: "Internacional",
      link: "https://www.erc.edu",
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] text-slate-900 overflow-y-auto">
      {/* Header Padronizado */}
      <ScreenHeader title="Fontes e Referências" onBack={onBack} />

      {/* Conteúdo */}
      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Banner Informativo Componentizado */}
        <AlertBanner
          variant="dark"
          title="Evidência Científica e Protocolos Oficiais"
          description="Todas as orientações, ritmos e técnicas deste aplicativo são rigorosamente baseados nos consensos do Ministério da Saúde (SAMU 192), SBC e American Heart Association."
        />

        {/* Lista de Fontes Componentizada */}
        <div className="space-y-3.5 pt-1">
          {fontes.map((fonte, idx) => (
            <ReferenceCard key={idx} reference={fonte} />
          ))}
        </div>
      </div>
    </div>
  );
}
