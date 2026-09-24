import React from "react";
import { Sparkles, Activity, Hand, Wind, Zap } from "lucide-react";

interface ParametrosClinicosTableProps {
  className?: string;
}

interface CardParametro {
  titulo: string;
  subtitulo?: string;
  lactente: string;
  crianca: string;
  adulto: string;
  regraDeOuro: string;
}

interface SessaoEstudo {
  id: string;
  numero: string;
  titulo: string;
  subtitulo: string;
  badge: string;
  corBadge: string;
  icon: React.ReactNode;
  cards: CardParametro[];
}

const SESSOES_SBV: SessaoEstudo[] = [
  {
    id: "circulacao",
    numero: "Sessão 01",
    titulo: "Avaliação Circulatória & Pulso",
    subtitulo: "Identificação rápida e palpação arterial em no máximo 10 segundos",
    badge: "2 Tópicos",
    corBadge: "bg-blue-100 text-blue-800",
    icon: <Activity className="w-6 h-6 text-blue-600" />,
    cards: [
      {
        titulo: "Localização da Checagem de Pulso",
        subtitulo: "Artéria de referência avaliada dentro de 5 a 10 segundos",
        lactente: "Artéria Braquial (face interna do braço, entre ombro e cotovelo). Evitar carótida pelo pescoço curto.",
        crianca: "Artéria Carotídea (pescoço) ou Artéria Femoral (na virilha).",
        adulto: "Artéria Carotídea (no pescoço, no sulco entre a traqueia e a musculatura lateral).",
        regraDeOuro: "Se pulso < 60 bpm com sinais de má perfusão em pediatria/lactente: inicie RCP imediatamente!",
      },
      {
        titulo: "Ritmo e Frequência Universal",
        subtitulo: "Cadência de compressões torácicas por minuto",
        lactente: "100 a 120 compressões por minuto (aprox. 2 por segundo).",
        crianca: "100 a 120 compressões por minuto (ritmo de 'Stayin' Alive').",
        adulto: "100 a 120 compressões por minuto. Minimizar pausas a menos de 10 segundos.",
        regraDeOuro: "Permitir descompressão total do tórax a cada ciclo sem retirar as mãos do contato.",
      },
    ],
  },
  {
    id: "compressoes",
    numero: "Sessão 02",
    titulo: "Compressões Torácicas (Técnica & Posição)",
    subtitulo: "Posicionamento anatômico das mãos e profundidade adequada",
    badge: "2 Tópicos",
    corBadge: "bg-red-100 text-red-800",
    icon: <Hand className="w-6 h-6 text-red-600" />,
    cards: [
      {
        titulo: "Posição e Técnica das Mãos",
        subtitulo: "Posicionamento correto do socorrista sobre o osso esterno",
        lactente: "1 socorrista: 2 Dedos no centro do esterno (abaixo dos mamilos).\n2 socorristas: 2 Polegares circundando todo o tórax.",
        crianca: "1 ou 2 Mãos no terço inferior do esterno (conforme o biotipo e porte físico da criança).",
        adulto: "2 Mãos sobrepostas e entrelaçadas no centro do tórax (sobre o terço inferior do esterno).",
        regraDeOuro: "Braços esticados e cotovelos travados no adulto; no lactente, a técnica dos 2 polegares gera maior pico sistólico.",
      },
      {
        titulo: "Profundidade da Compressão",
        subtitulo: "Excursão de descida necessária para ejeção sanguínea eficaz",
        lactente: "4 cm (1,5 polegadas) — correspondendo a aprox. 1/3 do diâmetro anteroposterior.",
        crianca: "5 cm (2 polegadas) — correspondendo a aprox. 1/3 do diâmetro anteroposterior.",
        adulto: "5 a 6 cm no adulto (NUNCA ultrapassar 6 cm para prevenir fraturas e lesões viscerais).",
        regraDeOuro: "Compressões superficiais não geram pressão de perfusão cerebral; profundidade insuficiente é ineficaz.",
      },
    ],
  },
  {
    id: "ventilacao",
    numero: "Sessão 03",
    titulo: "Ventilação & Ciclos Clínicos",
    subtitulo: "Relação compressão-ventilação na PCR e ventilação de resgate com pulso",
    badge: "2 Tópicos",
    corBadge: "bg-emerald-100 text-emerald-800",
    icon: <Wind className="w-6 h-6 text-emerald-600" />,
    cards: [
      {
        titulo: "Relação Compressão : Ventilação (RCP)",
        subtitulo: "Proporção de manobras durante a parada cardiorrespiratória",
        lactente: "30:2 com 1 socorrista\n15:2 com 2 socorristas (equipe de atendimento).",
        crianca: "30:2 com 1 socorrista\n15:2 com 2 socorristas (equipe de atendimento).",
        adulto: "30:2 universal (sempre, seja com 1 ou com 2 socorristas presentes).",
        regraDeOuro: "Em pediatria, a relação 15:2 com 2 socorristas prioriza ventilação, pois a etiologia primária quase sempre é hipóxica.",
      },
      {
        titulo: "Ventilação de Resgate Isolada (COM Pulso)",
        subtitulo: "Vítima não respira (parada respiratória), mas possui pulso palpável",
        lactente: "1 ventilação a cada 2 a 3 segundos (20 a 30 ventilações por minuto).",
        crianca: "1 ventilação a cada 2 a 3 segundos (20 a 30 ventilações por minuto).",
        adulto: "1 ventilação a cada 6 segundos (10 ventilações por minuto).",
        regraDeOuro: "Reavaliar o pulso a cada 2 minutos. Se o pulso cessar ou cair (< 60 bpm no bebê), iniciar RCP imediatamente!",
      },
    ],
  },
  {
    id: "dea",
    numero: "Sessão 04",
    titulo: "Desfibrilação Externa Automática (DEA)",
    subtitulo: "Instalação precoce do aparelho e posicionamento das pás adesivas",
    badge: "1 Tópico",
    corBadge: "bg-purple-100 text-purple-800",
    icon: <Zap className="w-6 h-6 text-purple-600" />,
    cards: [
      {
        titulo: "Pás e Configuração do DEA",
        subtitulo: "Adaptação de energia e posicionamento no tórax",
        lactente: "Pás com atenuador de dose pediátrico. Posicionamento Anteroposterior (peito e costas).",
        crianca: "Pás pediátricas (< 8 anos ou < 25 kg). Se ausentes, usar pás de adulto sem que se toquem.",
        adulto: "Pás adultas convencionais em posição Anterolateral (abaixo da clavícula D e axila E).",
        regraDeOuro: "DEA: se as pás adesivas se tocarem no tórax da criança ou bebê, posicione OBRIGATORIAMENTE uma na frente e uma nas costas!",
      },
    ],
  },
];

export default function ParametrosClinicosTable({
  className = "",
}: ParametrosClinicosTableProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {SESSOES_SBV.map((sessao) => (
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

                {/* Sub-Cards de Comparação por Faixa Etária */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
                  {/* Lactente */}
                  <div className="p-3.5 bg-sky-50/40">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-900 text-sm font-black uppercase tracking-wider mb-1.5">
                      Lactente (&lt; 1 ano)
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-800 whitespace-pre-line leading-relaxed">
                      {card.lactente}
                    </p>
                  </div>

                  {/* Criança */}
                  <div className="p-3.5 bg-emerald-50/40">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-sm font-black uppercase tracking-wider mb-1.5">
                      Criança (1 ano - Puberdade)
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-800 whitespace-pre-line leading-relaxed">
                      {card.crianca}
                    </p>
                  </div>

                  {/* Adulto */}
                  <div className="p-3.5 bg-red-50/40">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-red-100 text-red-900 text-sm font-black uppercase tracking-wider mb-1.5">
                      Adulto (&gt; 12 anos)
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-800 whitespace-pre-line leading-relaxed">
                      {card.adulto}
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
