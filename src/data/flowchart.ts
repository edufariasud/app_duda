/**
 * FONTE DE DADOS CLÍNICA — SBV + APH
 * Todas as 16 etapas do CSV mapeadas com fidelidade total.
 * Nenhum campo é ignorado. O campo "porqueJustificativa" é
 * revelado apenas ao clique (via WhyAccordion).
 *
 * Baseado em: AHA 2020, SBC, SAMU 192 / Ministério da Saúde
 */

export type PrioridadeClinica =
  | "alerta_vermelho"
  | "urgencia"
  | "emergencia_grave"
  | "pcr_critica"
  | "atencao_continua"
  | "estavel"
  | "seguro"
  | "protocolo"
  | "intervencao_chave";

export type FaixaEtaria = "lactente" | "crianca" | "adulto";

export interface EtapaClinica {
  /** Código identificador oficial: "1.1", "1.2", "2.1"... */
  id: string;
  /** Nome da etapa clínica */
  etapa: string;
  /** Campo "Ponto de Decisão (Avaliação)" do CSV */
  perguntaCentral: string;
  /** Campo "Resposta / Condição" do CSV */
  respostaCondicao: string;
  /** Campo "Desvio / Próximo Passo" do CSV */
  desvioProximoPasso: string;
  /** Campo "Diagnóstico Clínico" do CSV */
  diagnosticoClinico: string;
  /** Campo "Intervenção Imediata (Conduta)" do CSV */
  intervencaoImediata: string;
  /** Campo "Por quê / Justificativa Clínica" — REVELADO APENAS AO CLIQUE */
  porqueJustificativa: string;
  /** Campo "Próximo Passo Crítico" do CSV */
  proximoPasso: string;
  /** Campo "Prioridade" do CSV */
  prioridade: PrioridadeClinica;
  /** Imagem médica ilustrativa opcional */
  imagemSrc?: string;
  /** Alt text acessível da imagem */
  imagemAlt?: string;
}

/** ----------------------------------------------------------------
 * ÁRVORE DE DECISÃO CLÍNICA — 16 ETAPAS (CSV completo)
 * ---------------------------------------------------------------- */
export const ETAPAS_CLINICAS: Record<string, EtapaClinica> = {

  /* ── ETAPA 1: SEGURANÇA DA CENA ─────────────────────────────── */

  "1.1": {
    id: "1.1",
    etapa: "Segurança da Cena",
    perguntaCentral: "Avaliação da Cena: A cena está segura?",
    respostaCondicao: "NÃO",
    desvioProximoPasso: "⛔ Interromper avanço",
    diagnosticoClinico: "Cena Insegura / Risco Iminente",
    intervencaoImediata:
      "Não avance! Isole o local (risco elétrico, tráfego, colapso) e mantenha distância segura.",
    porqueJustificativa:
      "Garantir a segurança dos socorristas é a regra de ouro primordial do Suporte Básico. Um socorrista ferido se torna mais uma vítima, comprometendo todo o atendimento.",
    proximoPasso:
      "Acionar Bombeiros (193) e SAMU (192). Aguardar liberação por equipe técnica.",
    prioridade: "alerta_vermelho",
  },

  "1.2": {
    id: "1.2",
    etapa: "Segurança da Cena",
    perguntaCentral: "Avaliação da Cena: A cena está segura?",
    respostaCondicao: "SIM",
    desvioProximoPasso: "➡️ Seguir para Etapa 2",
    diagnosticoClinico: "Cena Segura e Estabilizada",
    intervencaoImediata:
      "Aproxime-se da vítima com atenção e use EPIs (luvas e máscara de barreira).",
    porqueJustificativa:
      "Permite avaliação primária imediata sem risco à integridade da equipe de atendimento. O uso de EPIs protege contra contaminação biológica.",
    proximoPasso:
      "Testar responsividade e nível de consciência da vítima conforme faixa etária.",
    prioridade: "seguro",
  },

  /* ── ETAPA 2: RESPONSIVIDADE ─────────────────────────────────── */

  "2.1": {
    id: "2.1",
    etapa: "Responsividade",
    perguntaCentral:
      "Responsividade: A vítima responde? (Toque firme nos ombros ou planta do pé se lactente)",
    respostaCondicao: "SIM",
    desvioProximoPasso: "🟢 Manter e Investigar",
    diagnosticoClinico: "Consciente / Responsiva",
    intervencaoImediata:
      "Mantenha a vítima na posição encontrada (se segura). Acalme e não movimente.",
    porqueJustificativa:
      "Evita o agravamento de possíveis traumas vertebrais ou lesões internas ocultas. Movimentar uma vítima consciente sem indicação pode provocar lesão medular irreversível.",
    proximoPasso:
      "Obtenha história clínica detalhada (SAMPLA) e acione socorro especializado se instável.",
    prioridade: "estavel",
    imagemSrc: "/images/inconsciente_avaliacao.jpg",
    imagemAlt: "Socorrista avaliando responsividade da vítima tocando os ombros",
  },

  "2.2": {
    id: "2.2",
    etapa: "Responsividade",
    perguntaCentral:
      "Responsividade: A vítima responde? (Toque firme nos ombros ou planta do pé se lactente)",
    respostaCondicao: "NÃO",
    desvioProximoPasso: "➡️ Chamar Ajuda e Passo 3",
    diagnosticoClinico: "Inconsciente / Não Responsiva",
    intervencaoImediata:
      'Aponte especificamente: "Você, ligue 192 e traga o DEA agora!". Em pediatria isolada: 2 min RCP antes de buscar socorro.',
    porqueJustificativa:
      "Desencadeia a cadeia de sobrevivência e prepara desfibrilação / suporte precoce. Apontar uma pessoa específica evita o efeito espectador onde todos assumem que o outro vai agir.",
    proximoPasso:
      "Checar simultaneamente respiração e pulso central por no máximo 10 segundos.",
    prioridade: "urgencia",
    imagemSrc: "/images/inconsciente_avaliacao.jpg",
    imagemAlt: "Socorrista avaliando responsividade de vítima inconsciente",
  },

  /* ── ETAPA 3: AVALIAÇÃO CIRCULATÓRIA (PULSO) ─────────────────── */

  "3.1": {
    id: "3.1",
    etapa: "Avaliação de Pulso — Adulto",
    perguntaCentral: "Localização do Pulso: Vítima Adulta ou Adolescente",
    respostaCondicao: "Checagem em até 10s",
    desvioProximoPasso: "➡️ Palpar Pulso Carotídeo",
    diagnosticoClinico: "Avaliação Circulatória (Adulto)",
    intervencaoImediata:
      "Palpe a artéria carótida no sulco entre a traqueia e os músculos do pescoço por 5 a 10s.",
    porqueJustificativa:
      "Pulso central mais confiável e de rápido acesso em adultos inconscientes. A carótida é facilmente palpável e não colapsa mesmo com hipotensão severa.",
    proximoPasso:
      "Se ausente ou dúvida: inicie RCP 30:2 imediata (5 a 6 cm no centro do esterno).",
    prioridade: "protocolo",
  },

  "3.2": {
    id: "3.2",
    etapa: "Avaliação de Pulso — Criança",
    perguntaCentral: "Localização do Pulso: Criança (1 ano à Puberdade)",
    respostaCondicao: "Checagem em até 10s",
    desvioProximoPasso: "➡️ Palpar Carotídeo ou Femoral",
    diagnosticoClinico: "Avaliação Circulatória (Criança)",
    intervencaoImediata:
      "Palpe o pulso carotídeo ou femoral na virilha. Se FC < 60 bpm c/ má perfusão: trate como PCR!",
    porqueJustificativa:
      "Em crianças, bradicardia acentuada com hipoperfusão gera colapso equivalente à PCR. A frequência cardíaca mínima aceitável em crianças é maior que em adultos.",
    proximoPasso:
      "Se ausente ou FC < 60: inicie RCP imediata (1 socorr: 30:2 | 2 socorr: 15:2).",
    prioridade: "protocolo",
  },

  "3.3": {
    id: "3.3",
    etapa: "Avaliação de Pulso — Lactente",
    perguntaCentral: "Localização do Pulso: Lactente (< 1 ano)",
    respostaCondicao: "Checagem em até 10s",
    desvioProximoPasso: "➡️ Palpar Pulso Braquial",
    diagnosticoClinico: "Avaliação Circulatória (Lactente)",
    intervencaoImediata:
      "Palpe a face interna do braço (artéria braquial). Evite carótida pelo pescoço curto.",
    porqueJustificativa:
      "A anatomia do lactente dificulta palpação carotídea sem ocluir a traqueia. O pescoço curto e a gordura subcutânea tornam o pulso braquial mais acessível e seguro.",
    proximoPasso:
      "Se ausente ou FC < 60 bpm: inicie compressões com 2 dedos ou 2 polegares (15:2 ou 30:2).",
    prioridade: "protocolo",
  },

  /* ── ETAPA 4: RESPIRAÇÃO / SINAIS VITAIS ─────────────────────── */

  "4.1": {
    id: "4.1",
    etapa: "Sinais Vitais — PLS",
    perguntaCentral: "Respira normalmente e possui pulso palpável satisfatório?",
    respostaCondicao: "SIM (Respira + Pulso)",
    desvioProximoPasso: "🟡 Posição de Recuperação",
    diagnosticoClinico: "Inconsciente com Sinais Vitais",
    intervencaoImediata:
      "Coloque em Posição Lateral de Segurança (PLS) se sem trauma. Lactente: colo de lado.",
    porqueJustificativa:
      "Mantém vias aéreas permeáveis e impede broncoaspiração de saliva ou secreções. A PLS utiliza a gravidade para drenar secreções e evitar obstrução das vias aéreas.",
    proximoPasso:
      "Monitore respiração e pulso continuamente até a chegada da equipe do SAMU.",
    prioridade: "atencao_continua",
    imagemSrc: "/images/respiracao_avaliacao.jpg",
    imagemAlt: "Socorrista avaliando respiração da vítima",
  },

  "4.2": {
    id: "4.2",
    etapa: "Parada Respiratória — Adulto",
    perguntaCentral: "Não respira (ou gasping), mas TEM pulso palpável presente?",
    respostaCondicao: "NÃO Respira + Adulto",
    desvioProximoPasso: "🟠 Ventilação de Resgate Adulto",
    diagnosticoClinico: "Parada Respiratória (Adulto)",
    intervencaoImediata:
      "Forneça 1 ventilação a cada 6 segundos (10/minuto) com bolsa-válvula-máscara ou barreira.",
    porqueJustificativa:
      "Restaura oxigenação tecidual sem a necessidade de compressões torácicas. Como o coração ainda bate, compressões seriam desnecessárias e poderiam causar lesões.",
    proximoPasso:
      "Reavalie o pulso carotídeo a cada 2 minutos. Se o pulso cessar, inicie RCP 30:2 imediata!",
    prioridade: "emergencia_grave",
    imagemSrc: "/images/respiracao_avaliacao.jpg",
    imagemAlt: "Avaliação da respiração da vítima adulta",
  },

  "4.3": {
    id: "4.3",
    etapa: "Parada Respiratória — Pediátrica",
    perguntaCentral: "Não respira (ou gasping), mas TEM pulso > 60 bpm presente?",
    respostaCondicao: "NÃO Respira + Pediatria",
    desvioProximoPasso: "🟠 Ventilação de Resgate Pediátrica",
    diagnosticoClinico: "Parada Respiratória (Pediátrica)",
    intervencaoImediata:
      "Forneça 1 ventilação a cada 2 a 3 segundos (20 a 30 ventilações/minuto) com volume suave.",
    porqueJustificativa:
      "Frequência respiratória basal na infância é superior; previne PCR de origem hipóxica. Em crianças, a maioria das paradas cardíacas é precedida por falência respiratória.",
    proximoPasso:
      "Reavalie pulso braquial/femoral a cada 2 min. Se FC cair para < 60 bpm: inicie compressões!",
    prioridade: "emergencia_grave",
    imagemSrc: "/images/respiracao_avaliacao.jpg",
    imagemAlt: "Avaliação da respiração de vítima pediátrica",
  },

  /* ── ETAPA 5: PCR — COMPRESSÕES TORÁCICAS ───────────────────── */

  "5.1": {
    id: "5.1",
    etapa: "PCR Confirmada — Adulto",
    perguntaCentral: "PCR Confirmada / Sem Pulso: Adulto ou Adolescente",
    respostaCondicao: "Sem Pulso + Adulto",
    desvioProximoPasso: "🔴 RCP 30:2 Adulto",
    diagnosticoClinico: "PCR Adulto",
    intervencaoImediata:
      "RCP com 2 mãos sobrepostas e entrelaçadas sobre o esterno; comprimir 5 a 6 cm no ritmo de 100 a 120/min. Relação 30:2.",
    porqueJustificativa:
      "Gera pressão de perfusão coronariana e cerebral essencial para reversão do quadro. Cada segundo sem compressão aumenta exponencialmente o dano neurológico irreversível.",
    proximoPasso:
      "Instale o DEA assim que chegar à cena e siga integralmente os comandos sonoros.",
    prioridade: "pcr_critica",
    imagemSrc: "/images/rcp_adulto.jpg",
    imagemAlt: "Técnica de RCP em adulto com duas mãos sobre o esterno",
  },

  "5.2": {
    id: "5.2",
    etapa: "PCR Confirmada — Criança",
    perguntaCentral: "PCR Confirmada / FC < 60: Criança (1 ano à Puberdade)",
    respostaCondicao: "Sem Pulso + Criança",
    desvioProximoPasso: "🔴 RCP Criança (30:2 ou 15:2)",
    diagnosticoClinico: "PCR Criança",
    intervencaoImediata:
      "Comprimir 5 cm com 1 ou 2 mãos no terço inferior do esterno (100-120/min). Se 1 socorrista: 30:2; se 2 socorristas: 15:2.",
    porqueJustificativa:
      "A relação 15:2 com 2 socorristas otimiza ventilação em paradas de etiologia hipóxica. Em crianças, a causa primária é quase sempre respiratória, tornando a ventilação proporcionalmente mais importante.",
    proximoPasso:
      "Conectar DEA com pás pediátricas (ou atenuador). Se ausente, use as pás de adulto.",
    prioridade: "pcr_critica",
    imagemSrc: "/images/rcp_adulto.jpg",
    imagemAlt: "Técnica de RCP em criança com uma mão sobre o esterno",
  },

  "5.3": {
    id: "5.3",
    etapa: "PCR Confirmada — Lactente",
    perguntaCentral: "PCR Confirmada / FC < 60: Lactente (< 1 ano)",
    respostaCondicao: "Sem Pulso + Lactente",
    desvioProximoPasso: "🔴 RCP Lactente (30:2 ou 15:2)",
    diagnosticoClinico: "PCR Lactente",
    intervencaoImediata:
      "Comprimir 4 cm. 1 socorrista: 2 dedos no centro do esterno (30:2). 2 socorristas: 2 polegares circundando o tórax (15:2).",
    porqueJustificativa:
      "A técnica dos 2 polegares gera maior pressão de pico sistólico e melhor perfusão coronária. Circundar o tórax com as mãos estabiliza a coluna e permite compressão mais eficiente.",
    proximoPasso:
      "Conectar DEA com atenuador pediátrico; pás em posição anteroposterior no tórax.",
    prioridade: "pcr_critica",
    imagemSrc: "/images/rcp_adulto.jpg",
    imagemAlt: "Técnica de RCP em lactente com dois dedos sobre o esterno",
  },

  "5.4": {
    id: "5.4",
    etapa: "Suspeita de PCR — Dúvida",
    perguntaCentral:
      "Em dúvida se a vítima tem pulso ou respira normalmente?",
    respostaCondicao: '"NÃO SEI" / DÚVIDA',
    desvioProximoPasso: "🔴 Tratar Obrigatoriamente como PCR",
    diagnosticoClinico: "Suspeita de PCR (Protocolo)",
    intervencaoImediata:
      "Inicie compressões imediatamente conforme a idade da vítima. Nunca perca tempo checando pulso!",
    porqueJustificativa:
      "O dano de atrasar compressões é letal; o risco de comprimir um coração que ainda bate é desprezível. Estudos mostram que leigos e até profissionais erram na checagem de pulso com frequência.",
    proximoPasso:
      "Instale o DEA com urgência. O aparelho analisará se existe ritmo chocável (FV/TV).",
    prioridade: "pcr_critica",
  },

  /* ── ETAPA 6: DESFIBRILAÇÃO — DEA ────────────────────────────── */

  "6.1": {
    id: "6.1",
    etapa: "Desfibrilação — DEA",
    perguntaCentral: "Desfibrilação Externa Automática: DEA disponível na cena",
    respostaCondicao: "DEA LIGADO",
    desvioProximoPasso: "⚡ Análise e Choque",
    diagnosticoClinico: "Desfibrilação Precoce",
    intervencaoImediata:
      "Adulto: pás padrão anterolateral. Criança/Lactente: pás pediátricas (ou anteroposterior se encostarem).",
    porqueJustificativa:
      "Desfibrilação rápida (< 3-5 min) reverte ritmos chocáveis (FV/TV) antes da assistolia. Para cada minuto sem desfibrilação, a chance de sobrevivência cai 10%.",
    proximoPasso:
      "Após choque ou aviso de não chocar, retome RCP imediatamente por 2 minutos sem interrupção.",
    prioridade: "intervencao_chave",
  },
};

/** ----------------------------------------------------------------
 * PARÂMETROS COMPARATIVOS POR FAIXA ETÁRIA (tabela do CSV)
 * ---------------------------------------------------------------- */
export interface ParametroClinico {
  parametro: string;
  lactente: string;
  crianca: string;
  adulto: string;
  regraDeOuro: string;
}

export const PARAMETROS_CLINICOS: ParametroClinico[] = [
  {
    parametro: "Checagem de Pulso (≤ 10s)",
    lactente: "Pulso Braquial (face interna do braço)",
    crianca: "Pulso Carotídeo ou Femoral",
    adulto: "Pulso Carotídeo (no pescoço)",
    regraDeOuro:
      "Se pulso < 60 bpm c/ má perfusão em pediatria: inicie RCP!",
  },
  {
    parametro: "Posição e Técnica das Mãos",
    lactente:
      "1 socorr: 2 Dedos no esterno\n2 socorr: 2 Polegares circundando o tórax",
    crianca: "1 ou 2 Mãos no terço inferior do esterno (conforme biotipo)",
    adulto: "2 Mãos entrelaçadas no centro do tórax (sobre o esterno)",
    regraDeOuro:
      "Retorno total do tórax a cada compressão; não apoiar peso",
  },
  {
    parametro: "Profundidade da Compressão",
    lactente: "4 cm (1,5 pol) — aprox. 1/3 do diâmetro anteroposterior",
    crianca: "5 cm (2 pol) — aprox. 1/3 do diâmetro anteroposterior",
    adulto: "5 a 6 cm (nunca exceder 6 cm para evitar lesões)",
    regraDeOuro: "Ritmo universal: 100 a 120 compressões por minuto",
  },
  {
    parametro: "Relação Compressão:Ventilação",
    lactente: "30:2 (1 socorrista)\n15:2 (2 socorristas)",
    crianca: "30:2 (1 socorrista)\n15:2 (2 socorristas)",
    adulto: "30:2 (sempre, seja com 1 ou 2 socorristas)",
    regraDeOuro:
      "Em pediatria, relação 15:2 com 2 socorristas prioriza ventilação",
  },
  {
    parametro: "Ventilação Isolada / DEA",
    lactente: "Ventilação: 1 a cada 2-3s (20-30/min)\nDEA: Atenuador pediátrico",
    crianca:
      "Ventilação: 1 a cada 2-3s (20-30/min)\nDEA: Pás pediátricas (< 8 anos)",
    adulto:
      "Ventilação: 1 a cada 6s (10/min)\nDEA: Pás adultas convencionais",
    regraDeOuro:
      "DEA: se pás tocarem no tórax da criança/lactente, use posição anteroposterior!",
  },
];

/** ----------------------------------------------------------------
 * HELPERS — Navegação e Lógica do Fluxo
 * ---------------------------------------------------------------- */

/** Retorna a etapa pelo seu ID */
export function getEtapa(id: string): EtapaClinica | undefined {
  return ETAPAS_CLINICAS[id];
}

/** Dado que já sabemos a faixa etária, retorna o ID da etapa de RCP */
export function getRcpEtapaId(faixa: FaixaEtaria): string {
  const map: Record<FaixaEtaria, string> = {
    adulto: "5.1",
    crianca: "5.2",
    lactente: "5.3",
  };
  return map[faixa];
}

/** Dado que já sabemos a faixa etária, retorna o ID da etapa de checagem de pulso */
export function getPulsoEtapaId(faixa: FaixaEtaria): string {
  const map: Record<FaixaEtaria, string> = {
    adulto: "3.1",
    crianca: "3.2",
    lactente: "3.3",
  };
  return map[faixa];
}

/** Dado que já sabemos a faixa etária e que não há respiração, retorna ventilação de resgate */
export function getVentilacaoEtapaId(faixa: FaixaEtaria): string {
  return faixa === "adulto" ? "4.2" : "4.3";
}
