# Recurso Transversal: Screen Builder & DSL de Telas (Server-Driven UI)

## Identificação
- **Nome:** Screen Builder & DSL Declarativa de Telas (Server-Driven UI Engine)
- **Autor/Origem:** Eduardo Faria (Arquitetura Proprietária de Ecossistema)
- **Domínio:** Engenharia Frontend / Design System / Automação de Telas em Next.js (App Router) + React

---

## Pragmatismo Técnico

### Prós:
- **Escala Linear Infinita:** O crescimento do número de telas (10, 100, 1000) não infla o bundle JavaScript do Next.js nem cria centenas de rotas estáticas (`page.tsx`).
- **Desacoplamento Visual vs Código:** Owners de produto e designers podem alterar textos, formulários, botões e ordenação via JSONB em banco de dados sem passar por deploy de frontend.
- **Navegação Imune a Refatoração:** Navegação por ID técnico numérico (`screenId`) com identificação humana desacoplada (`key`).
- **Versionamento & Rollback Imediato:** Mudança de telas via `v1`, `v2`, `v3` com reversão de falhas em milissegundos sem reverter commit no Git.
- **Padronização Visual Global:** Atualizar a implementação do componente `Button` ou `Card` no `componentRegistry` propaga o novo design em todas as telas simultaneamente.

### Contras / Cuidados:
- **Necessidade de Disciplina Rígida:** Não permitir injeção de código executável arbitrário (evitar `eval`, lambdas em string ou strings de fetch na DSL). A DSL deve ser 100% declarativa.
- **Complexidade Inicial de Setup:** Exige implementar o `ScreenRenderer` e a tipagem Zod antes de rodar a primeira tela.

### Sweet Spot de Uso:
- Fluxos de Onboarding, Quizzes, Árvores de Decisão Clínica/Técnica, Checkouts, Formulários dinâmicos de múltiplos passos e painéis institucionais configuráveis.

---

## Diferencial para o Nosso Ecossistema
Elimina o gargalo do desenvolvedor ter que codificar tela por tela (`app/foo/page.tsx`, `app/bar/page.tsx`), convertendo interfaces em **dados configuráveis em Postgres/Supabase**, acelerando testes A/B, adaptação de fluxos e reutilização entre múltiplos projetos.

---

## Como Implementar

### 1. Definição do Contrato (TypeScript + Zod)
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

### 2. Registry e Engine de Renderização
```tsx
import React from "react";

const componentRegistry: Record<string, React.FC<any>> = {
  text: ({ text }) => <p className="text-base text-base-content">{text}</p>,
  button: ({ label, variant, action }) => (
    <button className={`btn btn-${variant || "primary"}`}>{label}</button>
  ),
  card: ({ title, description }) => (
    <div className="card bg-base-200 p-4 rounded-xl shadow">
      <h3 className="font-bold text-lg">{title}</h3>
      {description && <p className="text-sm opacity-80">{description}</p>}
    </div>
  )
};

export function ScreenRenderer({ screen }: { screen: ScreenDefinition }) {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      {screen.components.map((comp, idx) => {
        const Component = componentRegistry[comp.type];
        if (!Component) return <div key={idx}>Componente desconhecido: {comp.type}</div>;
        return <Component key={idx} {...comp.props} />;
      })}
    </main>
  );
}
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
