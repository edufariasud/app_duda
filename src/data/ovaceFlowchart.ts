/**
 * FONTE DE DADOS CLÍNICA — PROTOCOLO DE DESENGASGO (OVACE)
 * Todas as 11 etapas da árvore de decisão mapeadas fielmente do CSV oficial.
 * Nenhum campo é ignorado. O campo "porqueJustificativa" é
 * revelado apenas ao clique (via WhyAccordion).
 *
 * Baseado em: Diretrizes de Obstrução de Vias Aéreas por Corpo Estranho (AHA / ERC / SAMU 192)
 */

import { PrioridadeClinica } from "./flowchart";

export type PerfilOvace = "adulto_crianca" | "lactente" | "gestante_obeso" | "solitario";

export interface EtapaOvace {
  /** Código identificador oficial da árvore: "1.1", "1.2", "2.1", etc. */
  id: string;
  /** Nome da etapa clínica */
  etapa: string;
  /** Ponto de Decisão (Avaliação) do CSV */
  perguntaCentral: string;
  /** Resposta / Condição do CSV */
  respostaCondicao: string;
  /** Desvio / Próximo Passo do CSV */
  desvioProximoPasso: string;
  /** Diagnóstico Clínico do CSV */
  diagnosticoClinico: string;
  /** Intervenção Imediata (Conduta) do CSV */
  intervencaoImediata: string;
  /** Por quê / Justificativa Clínica — Revelado sob clique */
  porqueJustificativa: string;
  /** Próximo Passo Crítico do CSV */
  proximoPasso: string;
  /** Prioridade do CSV */
  prioridade: PrioridadeClinica;
}

/** ----------------------------------------------------------------
 * ÁRVORE DE DECISÃO CLÍNICA DE DESENGASGO (OVACE) — 11 ETAPAS
 * ---------------------------------------------------------------- */
export const ETAPAS_OVACE: Record<string, EtapaOvace> = {
  /* ── NÍVEL 1: RECONHECIMENTO DA OVACE ──────────────────────── */

  "1.1": {
    id: "1.1",
    etapa: "Reconhecimento da OVACE",
    perguntaCentral: "Reconhecimento da OVACE: A vítima tosse com força, fala ou chora?",
    respostaCondicao: "SIM (Tosse Eficaz)",
    desvioProximoPasso: "🟡 Monitorar e Estimular",
    diagnosticoClinico: "Obstrução Leve de Vias Aéreas",
    intervencaoImediata:
      "Incentive a tosse contínua vigorosa. NÃO realize tapas nas costas nem compressões abdominais. Não dê água nem alimentos.",
    porqueJustificativa:
      "A tosse fisiológica produz pressões aéreas superiores a qualquer manobra mecânica externa e preserva a troca gasosa.",
    proximoPasso:
      "Observar de perto. Se a tosse enfraquecer, cessar ou surgir estridor inspiratório, migrar imediatamente para Etapa 2.",
    prioridade: "atencao_continua",
  },

  "1.2": {
    id: "1.2",
    etapa: "Reconhecimento da OVACE",
    perguntaCentral: "Reconhecimento da OVACE: Vítima em silêncio, tosse fraca, sinal universal ou cianose?",
    respostaCondicao: "NÃO (Tosse Ineficaz / Afonia)",
    desvioProximoPasso: "🔴 Chamar Ajuda e Passo 2",
    diagnosticoClinico: "Obstrução Grave de Vias Aéreas",
    intervencaoImediata:
      'Identifique-se e declare: "Vou te ajudar!". Peça para alguém acionar o SAMU (192) e buscar um DEA imediatamente.',
    porqueJustificativa:
      "Asfixia completa gera anóxia encefálica rápida e evolução para PCR em questão de poucos minutos se não revertida.",
    proximoPasso:
      "Checar o estado de consciência: vítima em pé/consciente vai para Etapa 2; se colapsar, ir para Etapa 3.",
    prioridade: "emergencia_grave",
  },

  /* ── NÍVEL 2: MANOBRAS CONFORME PERFIL DA VÍTIMA ───────────── */

  "2.1": {
    id: "2.1",
    etapa: "Manobra em Adulto ou Criança (> 1 ano)",
    perguntaCentral: "Manobra em Adulto ou Criança Consciente (> 1 ano de idade)",
    respostaCondicao: "Consciente + Adulto/Criança",
    desvioProximoPasso: "🔴 Manobra de Heimlich",
    diagnosticoClinico: "OVACE Grave Consciente (Heimlich)",
    intervencaoImediata:
      "Posicione-se atrás (ajoelhe-se se criança). Punho fechado na boca do estômago (acima do umbigo). Compressões rápidas para dentro e para cima (em 'J').",
    porqueJustificativa:
      "A compressão subdiafragmática eleva o diafragma abruptamente, gerando tosse artificial por pressão intratorácica positiva.",
    proximoPasso:
      "Repetir as compressões vigorosamente até expelir o corpo estranho ou a vítima perder a consciência.",
    prioridade: "urgencia",
  },

  "2.2": {
    id: "2.2",
    etapa: "Manobra em Lactente Consciente (< 1 ano)",
    perguntaCentral: "Manobra em Lactente Consciente (< 1 ano com afonia ou choro silencioso)",
    respostaCondicao: "Consciente + Lactente",
    desvioProximoPasso: "🔴 5 Golpes Dorsais + 5 Compressões",
    diagnosticoClinico: "OVACE Grave em Lactente (< 1 ano)",
    intervencaoImediata:
      "Apoie o bebê de bruços sobre seu antebraço em declive apoiando a mandíbula. Aplique 5 golpes dorsais interescapulares e vire aplicando 5 compressões no tórax.",
    porqueJustificativa:
      "A anatomia frágil do lactente contraindica Heimlich abdominal pelo alto risco de laceração hepática ou esplênica.",
    proximoPasso:
      "Repetir o ciclo 5:5 continuamente. Inspecionar a cavidade oral a cada virada; se objeto visível, retire-o em pinça.",
    prioridade: "urgencia",
  },

  "2.3": {
    id: "2.3",
    etapa: "Manobra em Gestante / Obeso Mórbido",
    perguntaCentral: "Manobra em Gestante no 2º/3º Trimestre ou Obeso Mórbido Consciente",
    respostaCondicao: "Gestante / Obeso Mórbido",
    desvioProximoPasso: "🔴 Compressões Torácicas em Pé",
    diagnosticoClinico: "OVACE Grave (Variação Torácica)",
    intervencaoImediata:
      "Abrace a vítima pelas axilas ao nível do tórax médio. Aplique compressões rápidas e vigorosas contra o centro do esterno (sem apertar abdome).",
    porqueJustificativa:
      "Evita aumento súbito da pressão intra-abdominal em gestantes e contorna a ineficácia do abraço abdominal em obesos.",
    proximoPasso:
      "Manter as compressões no esterno até a desobstrução ou perda da consciência.",
    prioridade: "urgencia",
  },

  "2.4": {
    id: "2.4",
    etapa: "Auto-Atendimento (Vítima Desacompanhada)",
    perguntaCentral: "Auto-Atendimento: Vítima adulta engasgada e completamente desacompanhada",
    respostaCondicao: "Vítima Solitária",
    desvioProximoPasso: "🟠 Auto-Heimlich c/ Suporte",
    diagnosticoClinico: "OVACE Grave sem Socorrista Presente",
    intervencaoImediata:
      "Feche o punho contra o abdome superior e incline o corpo com força contra a borda de uma cadeira firme, mesa ou corrimão rígido.",
    porqueJustificativa:
      "Substitui a tração manual por alavanca de peso corporal, produzindo ejeção por descompressão pulmonar forçada.",
    proximoPasso:
      "Se não desobstruir e sentir perda iminente de sentidos, destranque a porta do local para facilitar acesso do resgate.",
    prioridade: "emergencia_grave",
  },

  /* ── NÍVEL 3: VÍTIMA INCONSCIENTE & INSPEÇÃO ORAL ──────────── */

  "3.1": {
    id: "3.1",
    etapa: "Transição para RCP (Inconsciente)",
    perguntaCentral: "Vítima de Engasgo Perdeu a Consciência (Adulto ou Pediátrico)",
    respostaCondicao: "Inconsciente / Não Responde",
    desvioProximoPasso: "🔴 Transição Imediata para RCP",
    diagnosticoClinico: "PCR por Obstrução de Via Aérea (Asfixia)",
    intervencaoImediata:
      "Amparar a vítima até o chão em superfície rígida. Acionar SAMU 192 (se ainda não feito), solicitar DEA e iniciar ciclos de RCP (30:2).",
    porqueJustificativa:
      "A anóxia cerebral induz parada cardíaca hipóxica; as compressões torácicas mantêm fluxo coronariano e auxiliam na expulsão do corpo estranho.",
    proximoPasso:
      "Realizar 30 compressões torácicas de alta qualidade (100-120/min) e preparar para abertura de vias aéreas.",
    prioridade: "pcr_critica",
  },

  "3.2": {
    id: "3.2",
    etapa: "Abertura de Via Aérea — Objeto Visível",
    perguntaCentral: "Abertura da Via Aérea durante a RCP: Objeto visível na boca?",
    respostaCondicao: "SIM (Objeto Visível e Acessível)",
    desvioProximoPasso: "🟢 Remoção em Pinça Cuidadosa",
    diagnosticoClinico: "Corpo Estranho em Cavidade Oral",
    intervencaoImediata:
      "Tracione a mandíbula, abra a boca e remova o corpo estranho com movimento de pinça (dedo indicador ou pinça). Nunca empurre!",
    porqueJustificativa:
      "A perda do tônus de orofaringe e as compressões costumam projetar o corpo estranho para a cavidade oral visível.",
    proximoPasso:
      "Após remover o objeto, tente fornecer 2 ventilações de resgate e observe a elevação torácica.",
    prioridade: "intervencao_chave",
  },

  "3.3": {
    id: "3.3",
    etapa: "Abertura de Via Aérea — Objeto Oculto",
    perguntaCentral: "Abertura da Via Aérea durante a RCP: Objeto NÃO visível na boca?",
    respostaCondicao: "NÃO Visível (Cavidade Vazia)",
    desvioProximoPasso: "⛔ PROIBIDO Varredura Cega!",
    diagnosticoClinico: "Objeto Oculto / Hipofaringe",
    intervencaoImediata:
      "NÃO insira o dedo às cegas na boca! Forneça 2 ventilações de resgate e retome imediatamente 30 compressões torácicas.",
    porqueJustificativa:
      "A varredura digital cega pode impactar o objeto mais profundamente na traqueia ou causar espasmo e sangramento.",
    proximoPasso:
      "Continuar ciclos ininterruptos de RCP (30:2), reolhando a cavidade oral apenas ao final de cada bloco de compressões.",
    prioridade: "protocolo",
  },

  /* ── NÍVEL 4: DESFECHO CLÍNICO ─────────────────────────────── */

  "4.1": {
    id: "4.1",
    etapa: "Desfecho: Vias Aéreas Desobstruídas",
    perguntaCentral: "Desfecho: Vítima expeliu o corpo estranho e recuperou ventilação espontânea",
    respostaCondicao: "Corpo Estranho Expelido",
    desvioProximoPasso: "🟢 Posição Lateral e Avaliação Médica",
    diagnosticoClinico: "Vias Aéreas Desobstruídas",
    intervencaoImediata:
      "Cesse manobras. Se consciente, mantenha em repouso confortável. Se inconsciente respirando, coloque em Posição Lateral de Segurança.",
    porqueJustificativa:
      "Manobras vigorosas podem causar lesões internas (laceração esplênica, fraturas costais ou edema pulmonar tardio).",
    proximoPasso:
      "Encaminhar obrigatoriamente para avaliação em serviço de urgência hospitalar para exame radiológico e endoscópico se indicado.",
    prioridade: "estavel",
  },

  "4.2": {
    id: "4.2",
    etapa: "Desfecho: PCR Mantida com DEA",
    perguntaCentral: "Desfecho: Vítima permanece em PCR após múltiplos ciclos de RCP",
    respostaCondicao: "PCR Mantida + DEA na Cena",
    desvioProximoPasso: "⚡ Desfibrilação e RCP Contínua",
    diagnosticoClinico: "PCR Hipóxica Refratária",
    intervencaoImediata:
      "Ligue o DEA, conecte as pás no tórax limpo e seco. Siga as orientações sonoras: choque se indicado, retome RCP sem pausas imediatamente.",
    porqueJustificativa:
      "A hipóxia prolongada degrada o miocárdio gerando FV/TV ou assistolia; desfibrilação e compressões contínuas são a única chance de sobrevida.",
    proximoPasso:
      "Alternar socorristas a cada 2 minutos (5 ciclos) até chegada do suporte avançado (SAMU/UTI móvel).",
    prioridade: "pcr_critica",
  },
};

/** ----------------------------------------------------------------
 * MATRIZ TÉCNICA COMPARATIVA DE DESENGASGO POR FAIXA ETÁRIA / PERFIL
 * ---------------------------------------------------------------- */
export interface ParametroTecnicoOvace {
  parametro: string;
  lactente: string;
  crianca: string;
  adulto: string;
  gestanteObeso: string;
}

export const MATRIZ_TECNICA_OVACE: ParametroTecnicoOvace[] = [
  {
    parametro: "Técnica Inicial (Consciente)",
    lactente: "5 Golpes dorsais interescapulares seguidos de 5 compressões torácicas",
    crianca: 'Manobra de Heimlich ajoelhado: compressões subdiafragmáticas em "J"',
    adulto: 'Manobra de Heimlich em pé: compressões subdiafragmáticas em "J"',
    gestanteObeso: "Compressões torácicas no esterno (SEM compressão abdominal!)",
  },
  {
    parametro: "Posição do Socorrista & Vítima",
    lactente: "Lactente de bruços sobre o antebraço em declive; cabeça firme apoiada pela mandíbula",
    crianca: "Socorrista ajoelhado atrás da criança para equiparar altura com tronco ereto",
    adulto: "Socorrista em pé atrás da vítima com perna de apoio entre as pernas da vítima",
    gestanteObeso: "Socorrista posicionado atrás, braços sob as axilas abraçando o tórax médio",
  },
  {
    parametro: "Ponto Anatômico das Compressões",
    lactente: "Dorsal: Entre as escápulas / Torácica: Terço inferior do esterno (2 dedos)",
    crianca: "Linha média do abdome, entre cicatriz umbilical e apêndice xifoide",
    adulto: "Linha média do abdome, entre cicatriz umbilical e apêndice xifoide",
    gestanteObeso: "Metade inferior do esterno (mesmo ponto de compressão da RCP)",
  },
  {
    parametro: "Conduta se Ficar Inconsciente",
    lactente: "Deitar em plano rígido; iniciar RCP. Inspecionar a cavidade oral antes de ventilar",
    crianca: "Apoiar até o solo; chamar 192 e iniciar RCP (30:2). Inspecionar boca antes de ventilar",
    adulto: "Aparar queda até o chão; ligar 192, pedir DEA e iniciar RCP 30:2 imediata",
    gestanteObeso: "RCP imediata; na gestante (>20 sem), realizar deslocamento uterino manual à esquerda",
  },
  {
    parametro: "Inspeção Oral & Regras de Ouro",
    lactente: "NUNCA fazer varredura digital cega! Retirar apenas se claramente visível e pinçável",
    crianca: "Não oferecer água nem tapas aleatórios no dorso. Manter ciclo contínuo até alívio",
    adulto: 'Auto-Heimlich: se sozinho, apoie o punho acima do umbigo contra encosto de cadeira',
    gestanteObeso: "Transporte hospitalar mandatório pós-desengasgo para descartar lesões internas",
  },
];
