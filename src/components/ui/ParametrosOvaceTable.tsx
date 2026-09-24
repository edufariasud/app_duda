import React from "react";
import { Sparkles, ShieldAlert, AlertTriangle, Users, HeartHandshake, Stethoscope } from "lucide-react";

interface ParametrosOvaceTableProps {
  className?: string;
}

interface CardOvace {
  titulo: string;
  subtitulo?: string;
  lactente: string;
  crianca: string;
  adulto: string;
  gestanteObeso: string;
  regraDeOuro: string;
}

interface SessaoOvace {
  id: string;
  numero: string;
  titulo: string;
  subtitulo: string;
  badge: string;
  corBadge: string;
  icon: React.ReactNode;
  cards: CardOvace[];
}

const SESSOES_OVACE: SessaoOvace[] = [
  {
    id: "triagem",
    numero: "Sessão 01",
    titulo: "Classificação & Reconhecimento da Asfixia",
    subtitulo: "Diferenciação crítica entre obstrução parcial (leve) e total (grave)",
    badge: "1 Tópico",
    corBadge: "bg-amber-100 text-amber-900",
    icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
    cards: [
      {
        titulo: "Tosse Eficaz vs Ineficaz (Conduta Inicial)",
        subtitulo: "Avaliação da capacidade de troca aérea e emissão de som",
        lactente: "Choro audível / tosse com força = Leve (apenas observar). Silêncio / cianose = Grave (iniciar 5:5 imediato).",
        crianca: "Tosse forte e fala = Leve (estimular a tossir). Não fala / tosse fraca = Grave (Heimlich ajoelhado).",
        adulto: "Tosse ruidosa com força = Leve (incentivar tosse). Mãos no pescoço / afonia = Grave (Heimlich em pé).",
        gestanteObeso: "Identificação idêntica: tosse ineficaz demanda compressões torácicas imediatas no esterno.",
        regraDeOuro: "NUNCA dê tapas nas costas de quem está tossindo com força! A tosse fisiológica produz pressão superior a qualquer manobra mecânica.",
      },
    ],
  },
  {
    id: "manobras",
    numero: "Sessão 02",
    titulo: "Manobras no Paciente Consciente",
    subtitulo: "Técnicas de descompressão adaptadas por faixa etária e condições anatômicas",
    badge: "2 Tópicos",
    corBadge: "bg-blue-100 text-blue-900",
    icon: <Users className="w-6 h-6 text-blue-600" />,
    cards: [
      {
        titulo: "Técnica Inicial e Posição do Socorrista",
        subtitulo: "Postura e mecânica de alavanca para ejeção do corpo estranho",
        lactente: "Lactente de bruços sobre o antebraço em declive, apoiando a mandíbula com dedos em 'V'.",
        crianca: "Socorrista ajoelhado atrás da criança para equiparar a altura mantendo tronco ereto.",
        adulto: "Socorrista em pé atrás da vítima, com uma das pernas de apoio entre as pernas da vítima.",
        gestanteObeso: "Socorrista posicionado atrás, braços passando por debaixo das axilas abraçando o tórax médio.",
        regraDeOuro: "A perna de apoio entre as pernas do adulto/criança garante equilíbrio e ampara a queda se a vítima desmaiar.",
      },
      {
        titulo: "Ponto Anatômico das Compressões",
        subtitulo: "Local exato onde a pressão deve ser aplicada",
        lactente: "Dorsal: Entre as escápulas (5 golpes) / Torácica: Terço inferior do esterno (5 compressões c/ 2 dedos).",
        crianca: "Linha média do abdome, logo acima da cicatriz umbilical e abaixo do apêndice xifoide.",
        adulto: "Linha média do abdome, acima do umbigo na boca do estômago (compressões em 'J' para dentro e para cima).",
        gestanteObeso: "Metade inferior do esterno (mesmo ponto da RCP). NUNCA comprimir o abdome da gestante/obeso.",
        regraDeOuro: "Manobra de Heimlich abdominal é TERMINANTEMENTE PROIBIDA em bebês (< 1 ano) pelo risco de ruptura no fígado ou baço!",
      },
    ],
  },
  {
    id: "inconsciente",
    numero: "Sessão 03",
    titulo: "Complicação: Vítima Perdeu a Consciência",
    subtitulo: "Transição para suporte avançado e cuidados na inspeção de vias aéreas",
    badge: "2 Tópicos",
    corBadge: "bg-red-100 text-red-900",
    icon: <HeartHandshake className="w-6 h-6 text-red-600" />,
    cards: [
      {
        titulo: "Conduta Imediata se Colapsar (Inconsciência)",
        subtitulo: "Algoritmo de transição direta para RCP por asfixia",
        lactente: "Deitar sobre superfície rígida, chamar 192 e iniciar 30 compressões torácicas com 2 dedos.",
        crianca: "Amparar até o solo, ligar 192 e iniciar ciclos de RCP (30 compressões : 2 ventilações).",
        adulto: "Aparar a queda suavemente até o chão, acionar o SAMU 192, pedir o DEA e iniciar RCP 30:2 imediata.",
        gestanteObeso: "Iniciar RCP imediata; na gestante (> 20 semanas), realizar deslocamento uterino manual à esquerda.",
        regraDeOuro: "As próprias compressões torácicas da RCP funcionam como tosse artificial, auxiliando na ejeção do corpo estranho.",
      },
      {
        titulo: "Inspeção da Cavidade Oral & Regra Proibitiva",
        subtitulo: "Manejo da via aérea antes de aplicar as ventilações",
        lactente: "Abrir a boca e olhar: retirar em pinça APENAS se visível. NUNCA fazer varredura digital cega!",
        crianca: "Olhar a cavidade oral a cada ciclo de 30 compressões. Retirar somente se claramente alcançável.",
        adulto: "Tracione a língua/mandíbula e olhe a boca antes de ventilar. Se o objeto estiver solto, remova em pinça.",
        gestanteObeso: "Conduta idêntica: remover com o indicador em pinça se visível. Nunca enfiar o dedo às cegas.",
        regraDeOuro: "⛔ NUNCA faça varredura digital cega com o dedo! O dedo às cegas empurra o corpo estranho mais fundo na traqueia.",
      },
    ],
  },
  {
    id: "pos_manobra",
    numero: "Sessão 04",
    titulo: "Desfecho Clínico & Cuidados Hospitalares",
    subtitulo: "Encaminhamento após o desengasgo e protocolo de segurança",
    badge: "1 Tópico",
    corBadge: "bg-emerald-100 text-emerald-900",
    icon: <Stethoscope className="w-6 h-6 text-emerald-600" />,
    cards: [
      {
        titulo: "Transporte e Avaliação Hospitalar Obrigatória",
        subtitulo: "Investigação de lesões internas pós-manobras de alta energia",
        lactente: "Transporte mandatório ao pronto-socorro para avaliação de vias aéreas e prevenção de edema tardio.",
        crianca: "Encaminhar obrigatoriamente para exame médico; investigar possíveis fraturas costais ou aspiração.",
        adulto: "Encaminhar ao serviço de urgência para avaliação abdominal (risco de laceração hepática/esplênica).",
        gestanteObeso: "Avaliação obstétrica imediata com cardiotocografia fetal e ultrassom para avaliar vitalidade gestacional.",
        regraDeOuro: "A manobra de Heimlich aplica grande pressão interna. Todo paciente desengasgado DEVE passar por avaliação médica hospitalar.",
      },
    ],
  },
];

export default function ParametrosOvaceTable({
  className = "",
}: ParametrosOvaceTableProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {SESSOES_OVACE.map((sessao) => (
        <section
          key={sessao.id}
          className="bg-slate-100/80 border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4"
        >
          {/* Cabeçalho da Sessão */}
          <div className="flex items-start justify-between gap-3 border-b border-slate-200/80 pb-3">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
                {sessao.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold uppercase tracking-wider text-slate-500">
                    {sessao.numero}
                  </span>
                  <span className={`text-sm font-extrabold px-2.5 py-0.5 rounded-full ${sessao.corBadge}`}>
                    {sessao.badge}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug mt-0.5">
                  {sessao.titulo}
                </h2>
                <p className="text-sm font-bold text-slate-600 mt-0.5">
                  {sessao.subtitulo}
                </p>
              </div>
            </div>
          </div>

          {/* Cards Dentro da Sessão */}
          <div className="grid grid-cols-1 gap-4">
            {sessao.cards.map((card, cIndex) => (
              <div
                key={cIndex}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden"
              >
                {/* Cabeçalho do Card */}
                <div className="bg-slate-900 px-4 py-3 border-b border-slate-800">
                  <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                    {card.titulo}
                  </h3>
                  {card.subtitulo && (
                    <p className="text-sm font-medium text-slate-300 mt-0.5">
                      {card.subtitulo}
                    </p>
                  )}
                </div>

                {/* Sub-Cards de Comparação por 4 Grupos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
                  {/* Lactente */}
                  <div className="p-3.5 bg-sky-50/40">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-900 text-sm font-black uppercase tracking-wider mb-1.5">
                      Lactente (&lt; 1 ano)
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                      {card.lactente}
                    </p>
                  </div>

                  {/* Criança */}
                  <div className="p-3.5 bg-emerald-50/40">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-sm font-black uppercase tracking-wider mb-1.5">
                      Criança (1a - Puberdade)
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                      {card.crianca}
                    </p>
                  </div>

                  {/* Adulto */}
                  <div className="p-3.5 bg-blue-50/40">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-900 text-sm font-black uppercase tracking-wider mb-1.5">
                      Adulto &amp; Adolescente
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                      {card.adulto}
                    </p>
                  </div>

                  {/* Gestante / Obeso */}
                  <div className="p-3.5 bg-purple-50/40">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-900 text-sm font-black uppercase tracking-wider mb-1.5">
                      Gestante / Obeso
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                      {card.gestanteObeso}
                    </p>
                  </div>
                </div>

                {/* Regra de Ouro em Destaque */}
                <div className="bg-amber-50 border-t border-amber-200/80 px-4 py-3 flex items-start gap-2.5">
                  <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-black text-amber-900 uppercase tracking-tight mr-1.5">
                      Regra de Ouro:
                    </span>
                    <span className="text-sm sm:text-base font-bold text-amber-950 leading-snug">
                      {card.regraDeOuro}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
