---
trigger: always_on
description: "Padrões de Design de UI, Tipografia e Containers do SBV + APH App"
---

# 🎨 Diretrizes de Design do SBV + APH

Para todas as telas do aplicativo (fluxos de primeiros socorros, guias, simulador e telas de triagem):

## 1. Tipografia e Escala de Fontes (Acessibilidade Crítica de Emergência)
- **REGRA DE OURO**: NUNCA usar fontes menores que `text-sm` (14px). Em emergência (pânico, luz solar, socorristas idosos ou com presbiopia), fontes miúdas são inaceitáveis e perigosas.
- **Título do Topo / Header**: `text-lg sm:text-xl font-black text-slate-900 tracking-wide`
- **Perguntas Centrais / Tomada de Decisão**: `text-xl sm:text-2xl font-black text-slate-900 leading-snug`
- **Subtítulos e Descrições de Apoio**: `text-sm sm:text-base font-bold text-slate-700`
- **Técnicas e Destaques Críticos**: `text-sm sm:text-base font-black text-red-700`
- **Botões de Ação Direta (SIM / NÃO)**: Manter texto limpo e proporcional em caixa alta `text-base tracking-wider font-extrabold text-white`
- **Legendas dos Botões**: `text-sm font-semibold text-slate-700 mt-2 text-center`
- **Seção de Dicas / Recomendações**:
  - Título: `text-base font-bold text-slate-900 mb-2.5`
  - Bullet points / Itens: `text-sm sm:text-base font-medium text-slate-800`

## 2. Imagens e Ilustrações
- **Container Justo e Arredondado**: NUNCA usar paddings que deixem margens brancas soltas ao redor da imagem.
- **Estrutura Obrigatória**:
  ```tsx
  <div className="w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-white">
    <div className="relative w-full aspect-4/3 max-h-72">
      <Image
        src="/images/..."
        alt="..."
        fill
        className="object-cover object-center"
        priority
      />
    </div>
  </div>
  ```

## 3. Cards e Botões
- Bordas sempre `rounded-2xl`
- Sombras suaves (`shadow-xs` / `shadow-md`)
- Cores semânticas de emergência:
  - Verde: `#15803d` (Afirmativo / Estável)
  - Vermelho: `#b91c1c` (Negativo / Crítico / Urgência)
  - Azul: `#1d4ed8` (Vias aéreas / Manobras)
  - Âmbar: `#ea580c` (Avisos)
