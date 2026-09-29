# Recurso Transversal: Screen Builder & DSL de Telas com Supabase (Server-Driven UI)

## Identificação
- **Nome:** Screen Builder & DSL Declarativa de Telas (Server-Driven UI com Supabase)
- **Autor/Origem:** Eduardo Faria (Arquitetura Proprietária de Ecossistema)
- **Domínio:** Engenharia Frontend / Design System / Automação de Telas & Cursos Online em Next.js (App Router) + Supabase + React

---

## Pragmatismo Técnico

### Prós:
- **Escala Linear Infinita:** Suporta centenas ou milhares de telas sem criar rotas estáticas (`page.tsx`) e sem inflar o bundle JS do Next.js.
- **Ecossistema de Cursos Online:** Suporta cursos, módulos, tracking de progresso (`user_screen_progress`), quizzes e certificados.
- **Segurança Nativa com RLS:** Proteção de acesso a aulas e telas restritas no nível de linha do PostgreSQL (`enrollments` + RLS policies).
- **Desacoplamento Visual vs Código:** Conteudistas e especialistas clínicos alteram fluxos e conteúdos via JSONB em banco sem exigir deploy de frontend.
- **Navegação Imune a Refatoração:** Navegação por ID técnico numérico (`screenId`) com chave semântica para humanos (`key`).
- **Versionamento & Rollback Imediato:** Mudança de telas via `v1`, `v2`, `v3` com reversão de falhas em milissegundos sem reverter commit no Git.

### Contras / Cuidados:
- **Disciplina Rígida:** Não permitir injeção de código executável arbitrário (evitar `eval`, lambdas em string ou strings de fetch na DSL). A DSL deve ser 100% declarativa.
- **Isolamento de Camadas:** A Screen Engine não deve se acoplar diretamente aos clientes do banco; o consumo deve ocorrer sempre via abstração de `ScreenRepository`.

---

## Diferencial para o Ecossistema
Converte interfaces e cursos inteiros em **dados estruturados no Supabase**, permitindo testes A/B, adaptação instantânea de fluxos e reutilização universal de componentes DaisyUI/Tailwind.

---

## Como Implementar

### 1. Modelagem no PostgreSQL / Supabase
```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  published boolean default false
);

create table modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  title text not null,
  order_index integer not null default 0
);

create table screens (
  id integer primary key,
  key text unique not null,
  name text not null,
  module_id uuid references modules(id) on delete set null,
  status text check (status in ('draft', 'review', 'published', 'archived')) default 'draft',
  current_version integer default 1
);

create table screen_versions (
  id uuid primary key default gen_random_uuid(),
  screen_id integer references screens(id) on delete cascade,
  version integer not null,
  definition jsonb not null,
  published_at timestamptz,
  unique (screen_id, version)
);

create table user_screen_progress (
  user_id uuid references auth.users(id) on delete cascade,
  screen_id integer references screens(id) on delete cascade,
  completed boolean default false,
  state_data jsonb,
  updated_at timestamptz default now(),
  primary key (user_id, screen_id)
);
```

### 2. Definição do Contrato Zod & TypeScript
```typescript
import { z } from "zod";

export const ActionSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("navigate"), screenId: z.number() }),
  z.object({ type: z.literal("back") }),
  z.object({ type: z.literal("external"), url: z.string().url() }),
  z.object({ type: z.literal("submit"), formId: z.string() })
]);

export const ComponentDefinitionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    props: z.object({ text: z.string() })
  }),
  z.object({
    type: z.literal("button"),
    props: z.object({
      label: z.string(),
      variant: z.enum(["primary", "secondary", "outline"]).optional(),
      action: ActionSchema.optional()
    })
  }),
  z.object({
    type: z.literal("card"),
    props: z.object({
      title: z.string(),
      description: z.string().optional()
    })
  })
]);

export const ScreenDefinitionSchema = z.object({
  id: z.number(),
  key: z.string(),
  name: z.string(),
  components: z.array(ComponentDefinitionSchema)
});

export type ScreenDefinition = z.infer<typeof ScreenDefinitionSchema>;
```

### 3. Entry Point Único do Next.js App Router (`app/screen/[id]/page.tsx`)
```tsx
import { ScreenRenderer } from "@/screen-engine/renderer";
import { getScreenById } from "@/screens/repository";
import { notFound } from "next/navigation";

export default async function ScreenPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const screen = await getScreenById(Number(id));

  if (!screen) notFound();

  return <ScreenRenderer screen={screen} />;
}
```
