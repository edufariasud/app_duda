---
tipo: conceito
area: engenharia
tags:
  - arquitetura
  - server_driven_ui
  - dsl
  - screen_builder
  - react
  - nextjs
  - design_systems
status: consolidado
data: 2026-09-28
aliases:
  - "Server-Driven UI via Screen Engine"
  - "DSL de Telas Declarativas"
  - "Screen Builder Architecture"
fontes:
  - "[[2026-09-25_manifesto_screen_builder_eduardo]]"
relacionados:
  - "[[moc_engenharia_software]]"
---

# 💡 Conceito: Screen Builder & DSL de Telas Declarativas (Server-Driven UI)

## 🎯 Síntese Executiva

O **Screen Builder com DSL de Telas** é um paradigma arquitetural no qual **as telas da aplicação deixam de ser código React específico (`page.tsx`) e passam a ser dados puros serializáveis (JSON/DSL)**. O framework de interface (React/Next.js) atua exclusivamente como uma **engine interpretadora e renderizadora** (`ScreenRenderer`) desses dados.

A regra fundacional é: **"Uma tela não conhece React. Ela descreve o que deve aparecer."**

Isso substitui a proliferação de dezenas ou centenas de arquivos de rota estáticos por **uma única rota dinâmica (`/screen/[id]`)**, desacoplando o ciclo de vida do conteúdo visual do ciclo de vida de deploy do frontend. Alterações de layout, textos, botões e regras de fluxo tornam-se operações de configuração em banco de dados (JSONB/PostgreSQL), com suporte a versionamento, drafts, publicações atômicas e rollback sem rebuild do projeto.

---

## ⚙️ Arquitetura e Mecanismos Centrais

```
                    ┌────────────────────────┐
                    │   Screen Definition    │
                    │      (JSON / DSL)      │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │    Screen Renderer     │
                    │    (Next.js / React)   │
                    └───────────┬────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
          TextRenderer      ButtonRenderer     CardRenderer
          (Component)       (Component)        (Component)
                                │
                                ▼ Action (navigate)
                    ┌────────────────────────┐
                    │      ScreenGraph       │
                    │   /screen/[screenId]   │
                    └────────────────────────┘
```

### 1. Separação Estrita de Camadas
- **Camada de Dados / Persistência:** PostgreSQL armazenando `screens`, `screen_versions` (v1, v2, v3) e `screen_edges` (grafo de navegação).
- **Camada de Validação:** Schemas TypeScript + Zod para validação estrutural antes de persistir ou publicar.
- **Camada de Engine / Runtime:** `ScreenRenderer` + `ComponentRegistry` mapeando tipos declarativos (`type: "button"`) para implementações React puras e reutilizáveis.
- **Camada de Navegação:** Desacoplada de URLs de arquivos. Navegação baseada em IDs numéricos técnicos (`target: 200` ou `action: { type: "navigate", screenId: 200 }`) e chaves semânticas para identificação humana (`key: "checkout-payment"`).

---

## 📜 Contrato Arquitetural — 11 Regras Mandatórias

1. **Telas são Dados, não Código:** Proibido criar `page.tsx` específico por tela de negócio.
2. **Rota Única:** Toda a experiência roda sob a rota dinâmica `/screen/[id]`.
3. **ID Técnico Único e Imutável:** Cada tela possui `id: number` técnico e perpétuo (nunca reutilizado se deletado).
4. **Chave Semântica Humana:** Toda tela possui `key: string` legível (ex: `checkout-payment`).
5. **Navegação Técnica por ID:** A engine navega por `screenId: number`, nunca por `key`, garantindo imunidade a refatorações de nomenclatura.
6. **Componentes Declarativos:** Uma tela é um array de definições tipadas (`ComponentDefinition[]`).
7. **Componentes Reutilizáveis:** Não criar variantes especializadas por tela (ex: nada de `WelcomeButton`), apenas `button` configurado via `props`.
8. **Componentes Cegos ao Contexto de Tela:** Componentes visuais nunca inspecionam `screenId` ou `pathname`.
9. **Tipagem por Propriedade `type`:** Todo componente declara seu identificador de registry em `type`.
10. **Component Registry como Fonte Única:** Resolução via dicionário `componentRegistry[definition.type]`, proibindo cascatas de `if/else` espalhadas.
11. **Contratos Fortemente Tipados:** Validação rigorosa de propriedades com Zod e TypeScript compartilhado entre Builder e Renderer.

---

## 🚀 Roteiro de Implementação em 5 Fases

> [!important] Não comece pelo Builder Visual!
> A complexidade deve ser dominada de baixo para cima.

1. **Fase 1 — Engine & Registry:** JSON estático ➔ `ScreenRenderer` ➔ 5 componentes base (`Text`, `Button`, `Image`, `Card`, `Container`).
2. **Fase 2 — Navegação & Actions:** Rota `/screen/[id]`, despachante de ações (`navigate`, `back`, `external`) e teste com 20-30 telas conectadas em grafo.
3. **Fase 3 — Persistência:** Migração do JSON estático para tabelas PostgreSQL (`screens`, `screen_versions`) via Supabase.
4. **Fase 4 — Builder Visual:** Interface administrativa com Canvas, Painel de Componentes, Editor de Propriedades e Árvore de Grafo.
5. **Fase 5 — Versionamento & Governança:** Ciclo de vida Draft ➔ Review ➔ Published com suporte a Rollback instantâneo.

---

## 🔗 Conexões & Teia

- **MOC:** [[moc_engenharia_software|MOC Engenharia de Software]] | [[moc_geral|MOC Geral]]
- **Fonte Primária / Manifesto:** [[2026-09-25_manifesto_screen_builder_eduardo]]
- **Ativo Transversal na Biblioteca:** `.agents/arquivos/a___recursos/screen_builder_dsl_server_driven_ui.md`
