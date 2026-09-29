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
  - supabase
  - postgresql
  - cursos_online
status: consolidado
data: 2026-09-28
atualizado: 2026-09-29
aliases:
  - "Server-Driven UI via Screen Engine"
  - "DSL de Telas Declarativas"
  - "Screen Builder Architecture"
  - "Ecossistema de Telas e Cursos no Supabase"
fontes:
  - "[[2026-09-25_manifesto_screen_builder_eduardo]]"
relacionados:
  - "[[moc_engenharia_software]]"
---

# 💡 Conceito: Screen Builder & DSL de Telas Declarativas (Server-Driven UI com Supabase)

## 🎯 Síntese Executiva

O **Screen Builder com DSL de Telas** é um paradigma arquitetural no qual **as telas da aplicação deixam de ser código React específico (`page.tsx`) e passam a ser dados puros serializáveis (JSON/DSL)**. O framework de interface (React/Next.js) atua exclusivamente como uma **engine interpretadora e renderizadora** (`ScreenRenderer`) desses dados.

A regra fundacional é: **"Uma tela não conhece React. Ela descreve o que deve aparecer."**

Com a inclusão do suporte a **cursos online, tracking de progresso e milhares de telas**, o **Supabase (PostgreSQL + RLS + Auth + Storage)** foi adotado como a espinha dorsal de dados. O modelo desacopla completamente o conteúdo do código: a navegação ocorre sob uma **única rota dinâmica (`/screen/[id]`)**, enquanto permissões de acesso, matrículas, persistência de versões imutáveis (`screen_versions`) e estados dos alunos são orquestrados no banco via PostgreSQL e Row Level Security (RLS).

---

## ⚙️ Arquitetura em 4 Camadas Integradas

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CAMADA DE NEGÓCIO: CURSOS                      │
│        Courses ──▶ Modules ──▶ Enrollments ──▶ User Progress           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                    CAMADA DE PERSISTÊNCIA: SUPABASE                    │
│   screens (id, key, status)                                            │
│   screen_versions (version, definition JSONB)                          │
│   screen_edges (grafo de conexões / decisões)                          │
│   user_screen_progress (respostas, estado, tela atual)                 │
│   RLS (segurança nativa por matrícula do aluno)                        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                  CAMADA DE ACESSO: SCREEN REPOSITORY                   │
│   getScreenById(id) ──▶ Next.js Server Component ──▶ Cache/PPR         │
│   saveUserProgress(userId, screenId, state) ──▶ Server Action          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│               CAMADA DE RENDERIZAÇÃO: SCREEN ENGINE (REACT)            │
│   /screen/[id] ──▶ ScreenRenderer ──▶ ComponentRegistry ──▶ UI         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Modelo de Dados Relacional no Supabase (PostgreSQL)

```sql
-- 1. Estrutura de Cursos e Módulos
create table courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  cover_url text,
  published boolean default false,
  created_at timestamptz default now()
);

create table modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  title text not null,
  order_index integer not null default 0,
  created_at timestamptz default now()
);

-- 2. As Telas (com ID numérico técnico e chave semântica)
create table screens (
  id integer primary key,                 -- ex: 100, 200, 1024
  key text unique not null,               -- ex: "ovace-intro", "m1-aula1-intro"
  name text not null,
  module_id uuid references modules(id) on delete set null, -- null = protocolo aberto
  status text check (status in ('draft', 'review', 'published', 'archived')) default 'draft',
  current_version integer default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Versionamento Imutável das Telas (JSONB)
create table screen_versions (
  id uuid primary key default gen_random_uuid(),
  screen_id integer references screens(id) on delete cascade,
  version integer not null,
  definition jsonb not null,              -- Payload validado da ScreenDefinition
  published_at timestamptz,
  author_id uuid references auth.users(id),
  unique (screen_id, version)
);

-- 4. Grafo de Navegação (Arestas e Condições)
create table screen_edges (
  id uuid primary key default gen_random_uuid(),
  from_screen_id integer references screens(id) on delete cascade,
  to_screen_id integer references screens(id) on delete cascade,
  condition jsonb,                        -- ex: {"field": "status", "equals": "inconsciente"}
  created_at timestamptz default now()
);

-- 5. Matrículas e Progresso do Aluno
create table enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  status text check (status in ('active', 'completed', 'blocked')) default 'active',
  current_screen_id integer references screens(id),
  enrolled_at timestamptz default now(),
  unique (user_id, course_id)
);

create table user_screen_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  screen_id integer references screens(id) on delete cascade,
  completed boolean default false,
  state_data jsonb,                       -- respostas de formulários/quizzes do aluno
  updated_at timestamptz default now(),
  unique (user_id, screen_id)
);
```

---

## 📜 Contrato Arquitetural — Regras Mandatórias

1. **Telas são Dados, não Código:** Proibido criar `page.tsx` específico por tela de negócio.
2. **Rota Única:** Toda a experiência roda sob a rota dinâmica `/screen/[id]`.
3. **ID Técnico Único e Imutável:** Cada tela possui `id: number` técnico e perpétuo (nunca reutilizado se deletado).
4. **Chave Semântica Humana:** Toda tela possui `key: string` legível (ex: `checkout-payment`, `m1-aula1`).
5. **Navegação Técnica por ID:** A engine navega por `screenId: number`, nunca por `key`, garantindo imunidade a refatorações.
6. **Componentes Declarativos:** Uma tela é um array de definições tipadas (`ComponentDefinition[]`).
7. **Componentes Reutilizáveis:** Não criar variantes especializadas por tela, apenas componentes genéricos configurados via `props`.
8. **Componentes Cegos ao Contexto de Tela:** Componentes visuais nunca inspecionam `screenId` ou `pathname`.
9. **Tipagem por Propriedade `type`:** Todo componente declara seu identificador de registry em `type`.
10. **Component Registry como Fonte Única:** Resolução via dicionário `componentRegistry[definition.type]`, proibindo cascatas de `if/else`.
11. **Contratos Fortemente Tipados:** Validação rigorosa de propriedades com Zod e TypeScript compartilhado entre Builder, Renderer e Supabase.
12. **Desacoplamento do Repositório:** A Engine de Renderização consome `ScreenDefinition` puras da interface de repositório, sem depender diretamente dos drivers do banco.

---

## 🗺️ Mapa de Execução: Os 8 Capítulos Estruturados

1. **Capítulo 1 — O Contrato da DSL & Schemas JSONB:** Especificação em TypeScript + Zod de `ScreenDefinition`, ações e componentes compatíveis com a coluna JSONB do Supabase.
2. **Capítulo 2 — A Engine de Renderização & Contexto Dinâmico:** Implementação do `ScreenRenderer`, `ComponentRegistry` e interpolação de dados do aluno (`{{user.name}}`, `{{course.progress}}`).
3. **Capítulo 3 — A Máquina de Navegação & Server Actions:** Rota `/screen/[id]` com Server Actions para salvar progresso do usuário no Supabase sem travar a transição.
4. **Capítulo 4 — Fundação Supabase: Schema, Migrations & Repositório:** Instalação do `@supabase/ssr`, criação das migrations SQL e implementação da camada `ScreenRepository`.
5. **Capítulo 5 — Autenticação, RLS & Paywall de Cursos:** Login/cadastro via Supabase Auth, regras de Row Level Security para proteção de aulas e gestão de matrículas.
6. **Capítulo 6 — Motor de Validação & Integridade do Grafo:** Validações de integridade referencial no banco para impedir telas órfãs e links quebrados.
7. **Capítulo 7 — O Visual Screen Builder & Studio de Cursos:** Editor gráfico no-code para montagem de telas, visualização em grafo e publicação atômica com rollback.
8. **Capítulo 8 — Migração de Protocolos & Primeiro Curso Piloto:** Conversão das árvores de OVACE e PCR/SBV para o Supabase e lançamento do 1º minicurso na plataforma.

---

## 🔗 Conexões & Teia

- **MOC:** [[moc_engenharia_software|MOC Engenharia de Software]] | [[moc_geral|MOC Geral]]
- **Fonte Primária / Manifesto:** [[2026-09-25_manifesto_screen_builder_eduardo]]
- **Ativo Transversal na Biblioteca:** `.agents/arquivos/a___recursos/screen_builder_dsl_server_driven_ui.md`
