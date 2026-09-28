---
tipo: literatura
area: engenharia
tags:
  - arquitetura
  - dsl
  - screen_builder
  - server_driven_ui
  - nextjs
  - react
status: consolidado
data: 2026-09-25
aliases:
  - "Manifesto Screen Builder"
  - "DSL de Telas Eduardo Faria"
fontes:
  - "Comunicação Direta Eduardo Faria"
relacionados:
  - "[[c_screen_builder_dsl_engine]]"
  - "[[moc_engenharia_software]]"
---

# 📑 Registro de Literatura: Manifesto Screen Builder & DSL de Telas

> **Fonte:** Comunicação e diretriz direta de Eduardo Faria (25/09/2026).  
> **Tema Central:** Transição de telas como código React para telas como dados (Server-Driven UI / DSL declarativa).

---

## Texto Integral

[25/9 19:45] Eduardo Faria: Sim — e eu mudaria bastante a arquitetura antes de continuar fazendo tela por tela.

O que você está descrevendo é, na prática, um **mini sistema de design + DSL de telas + engine de navegação**. A ideia central é: **as telas deixam de ser código React e passam a ser dados**. O React apenas interpreta esses dados.

### A arquitetura que eu faria

```
                    ┌─────────────────────┐
                    │   Screen Definition │
                    │       JSON/DSL      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Screen Renderer   │
                    │      (React)        │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
          Button            Card             Form
          Component        Component        Component
              │
              ▼
       navigate(screenId)
              │
              ▼
        Screen Registry
```

A regra de ouro seria:

> **Uma tela não conhece React. Ela descreve o que deve aparecer.**

Por exemplo, em vez de criar:

```
app/foo/page.tsx
app/bar/page.tsx
app/baz/page.tsx
...
```

você teria algo parecido com:

```json
const screens = {
  100: {
    title: "Bem-vindo",
    components: [
      {
        type: "text",
        props: {
          text: "Olá!"
        }
      },
      {
        type: "button",
        props: {
          label: "Continuar",
          target: 200
        }
      }
    ]
  },

  200: {
    title: "Escolha uma opção",
    components: [
      {
        type: "button",
        props: {
          label: "Opção A",
          target: 300
        }
      },
      {
        type: "button",
        props: {
          label: "Opção B",
          target: 400
        }
      }
    ]
  }
}
```

E aí o React teria **uma única engine** capaz de renderizar todas essas telas.

---

# 1. Não começaria com uma "linguagem de marcação" própria

Eu começaria com **JSON + TypeScript**.

Por exemplo:

```typescript
type Screen = {
  id: number
  title?: string
  components: ComponentDefinition[]
}

type ComponentDefinition =
  | TextDefinition
  | ButtonDefinition
  | ImageDefinition
  | CardDefinition
  | FormDefinition

type TextDefinition = {
  type: "text"
  props: {
    text: string
  }
}

type ButtonDefinition = {
  type: "button"
  props: {
    label: string
    target?: number
    action?: Action
  }
}
```

Isso já é uma DSL.

Você pode posteriormente criar uma sintaxe mais amigável se realmente precisar.

---

# 2. O componente mais importante é o Renderer

Algo conceitualmente assim:

```tsx
function ScreenRenderer({ screen }: { screen: Screen }) {
  return (
    <PageLayout>
      {screen.components.map((component, index) => (
        <ComponentRenderer
          key={index}
          definition={component}
        />
      ))}
    </PageLayout>
  )
}
```

E:

```tsx
function ComponentRenderer({
  definition
}: {
  definition: ComponentDefinition
}) {
  switch (definition.type) {
    case "text":
      return <Text {...definition.props} />

    case "button":
      return <Button {...definition.props} />

    case "card":
      return <Card {...definition.props} />

    case "image":
      return <Image {...definition.props} />

    default:
      return null
  }
}
```

Mas eu iria um passo além e faria um **registry**:

```typescript
const componentRegistry = {
  text: TextRenderer,
  button: ButtonRenderer,
  card: CardRenderer,
  image: ImageRenderer,
  form: FormRenderer,
}
```

Então:

```tsx
function ComponentRenderer({ definition }) {
  const Component = componentRegistry[definition.type]

  if (!Component) {
    return <UnknownComponent type={definition.type} />
  }

  return <Component {...definition.props} />
}
```

Isso é muito mais escalável quando você tiver 50, 100 componentes.

---

# 3. A navegação deve ser baseada em IDs, não em URLs

Essa parte da sua ideia é **muito boa**.

Imagine:

```
100
├── 200
│   ├── 300
│   └── 400
└── 500
    ├── 600
    └── 700
```

A tela 100 simplesmente diz:

```json
{
  "type": "button",
  "props": {
    "label": "Continuar",
    "target": 200
  }
}
```

O botão não precisa saber:

```
/foo/bar/baz
```

Ele sabe:

```
screenId = 200
```

E você pode ter:

```typescript
function navigateToScreen(id: number) {
  router.push(`/screen/${id}`)
}
```

Sua aplicação poderia ter literalmente uma rota:

```
/screen/[id]
```

Então:

```
/screen/100
/screen/200
/screen/300
/screen/400
...
```

E **uma única `page.tsx`**:

```tsx
export default async function ScreenPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const screen = await getScreen(Number(id))

  return <ScreenRenderer screen={screen} />
}
```

Acabou.

Você não precisa criar 300 `page.tsx`.

---

# 4. Mas eu não colocaria as telas dentro do código

Aqui está uma decisão arquitetural importante.

Eu separaria:

```
React/Next
    ↓
Componentes
    ↓
Screen Engine
    ↓
Screen Definitions
    ↓
Database
```

Por exemplo:

```
PostgreSQL
    │
    ├── screens
    │
    └── screen_versions
```

Uma tabela poderia ser:

```sql
screens
────────────────────────
id
name
version
definition
status
created_at
updated_at
```

E `definition` seria JSONB.

Por exemplo:

```json
{
  "id": 100,
  "name": "Welcome",
  "components": [
    {
      "type": "text",
      "props": {
        "text": "Bem-vindo"
      }
    },
    {
      "type": "button",
      "props": {
        "label": "Começar",
        "target": 200
      }
    }
  ]
}
```

Isso muda completamente seu processo.

O owner pode mudar:

```
"Bem-vindo"
```

para:

```
"Olá! Vamos começar?"
```

sem você precisar alterar React.

---

# 5. E eu criaria um Builder visual

Aí vem a parte realmente interessante.

Você pode ter:

```
┌────────────────────────────────────────────────────┐
│ Screen #100                         [Save] [Publish]│
├──────────────┬───────────────────────┬─────────────┤
│ COMPONENTS   │       CANVAS          │ PROPERTIES  │
│              │                       │             │
│ Text         │   ┌───────────────┐   │ Text        │
│ Button       │   │ Bem-vindo     │   │             │
│ Image        │   │               │   │ "Bem-vindo" │
│ Card         │   │ [Continuar]   │   │             │
│ Form         │   └───────────────┘   │             │
│              │                       │             │
└──────────────┴───────────────────────┴─────────────┘
```

Você arrasta:

```
Button
```

para a tela.

O builder gera:

```json
{
  "type": "button",
  "props": {
    "label": "Continuar",
    "target": 200
  }
}
```

Ou você pode começar sem drag-and-drop.

Um editor lateral já resolveria 80%:

```
Components

+ Text
+ Button
+ Image
+ Card
+ Form
```

---

# 6. Eu faria uma árvore de navegação separada

Tem uma sutileza importante no que você descreveu.

Você disse que as telas se subdividem como uma árvore binária.

Eu **não misturaria a árvore de navegação com a definição visual da tela**.

São conceitos diferentes.

Por exemplo:

```
Screen
├── visual definition
└── navigation
```

Uma tela pode ter:

```json
{
  "id": 100,

  "components": [
    ...
  ],

  "navigation": {
    "children": [200, 500]
  }
}
```

Mas eu iria ainda mais longe.

Criaria uma entidade:

```
ScreenGraph
```

que representa:

```
100
├── 200
│   ├── 300
│   └── 400
└── 500
    ├── 600
    └── 700
```

E as telas continuam independentes:

```
Screen 100
Screen 200
Screen 300
...
```

Isso permite que uma tela seja reutilizada em vários fluxos.

Por exemplo:

```
             100
            /   \
          200   300
           \     /
             400
```

Não é mais uma árvore; virou um grafo.

E provavelmente **isso vai acontecer no seu projeto**.

Então eu modelaria como grafo desde o começo.

---

# 7. Não use apenas `target: 200`

Eu criaria um conceito de `Action`.

Por exemplo:

```typescript
type Action =
  | {
      type: "navigate"
      screenId: number
    }
  | {
      type: "back"
    }
  | {
      type: "external"
      url: string
    }
  | {
      type: "submit"
      formId: string
    }
```

Então:

```json
{
  "type": "button",
  "props": {
    "label": "Continuar",
    "action": {
      "type": "navigate",
      "screenId": 200
    }
  }
}
```

Isso te dá muito mais futuro.

Hoje:

```
button → tela
```

Amanhã:

```
button → API
button → modal
button → tela
button → voltar
button → download
button → condição
```

Sem mudar a arquitetura.

---

# 8. Outra coisa MUITO importante: dados dinâmicos

Aqui mora uma armadilha.

Você provavelmente vai chegar em algo assim:

> "Nessa tela preciso mostrar o nome do usuário."

Não faça:

```json
{
  "text": "Olá João"
}
```

Faça algo parecido com:

```json
{
  "type": "text",
  "props": {
    "text": "Olá {{user.name}}"
  }
}
```

Ou melhor ainda, dependendo da complexidade:

```json
{
  "type": "text",
  "props": {
    "text": {
      "type": "expression",
      "value": "user.name"
    }
  }
}
```

Então a engine recebe um contexto:

```typescript
const context = {
  user: {
    name: "João"
  }
}
```

E resolve:

```
user.name
```

Isso transforma seu sistema em algo muito poderoso.

---

# 9. Mas NÃO deixe a DSL executar JavaScript

Eu evitaria completamente algo como:

```json
{
  "onClick": "() => {
     fetch(...)
  }"
}
```

Isso vira uma bomba de manutenção e segurança.

A DSL deve ser **declarativa**.

Ou seja:

```json
{
  "action": {
    "type": "navigate",
    "screenId": 200
  }
}
```

e a engine decide como executar.

---

# 10. Eu colocaria versionamento desde o primeiro dia

Essa provavelmente vai ser uma das coisas que mais vai te salvar.

Imagine:

```
Screen 100

v1
v2
v3
v4
```

O owner muda a tela.

Você salva:

```
100 / v1
100 / v2
```

e publica:

```
100 / v3
```

Assim você consegue:

```
Draft
   ↓
Review
   ↓
Published
```

E principalmente:

**rollback.**

Se o owner falar:

> "A alteração de ontem quebrou o fluxo."

Você simplesmente volta:

```
v8 → v7
```

---

# 11. Eu separaria Draft de Published

Algo assim:

```
                 ┌─────────────┐
                 │    Draft    │
                 └──────┬──────┘
                        │
                     publish
                        │
                        ▼
                 ┌─────────────┐
                 │  Published  │
                 └─────────────┘
```

O owner trabalha no draft.

Usuários reais veem published.

Isso é **fundamental** para um sistema desse tamanho.

---

# 12. A estrutura do projeto poderia ser

Algo nessa linha:

```text
src/
│
├── app/
│   └── screen/
│       └── [id]/
│           └── page.tsx
│
├── components/
│   ├── Text/
│   ├── Button/
│   ├── Card/
│   ├── Image/
│   ├── Form/
│   └── ...
│
├── screen-engine/
│   ├── renderer.tsx
│   ├── registry.ts
│   ├── actions.ts
│   ├── expressions.ts
│   ├── validation.ts
│   └── types.ts
│
├── screens/
│   ├── repository.ts
│   └── service.ts
│
└── builder/
    ├── Canvas.tsx
    ├── ComponentPalette.tsx
    ├── PropertyEditor.tsx
    └── ScreenTree.tsx
```

E o banco:

```text
screens
screen_versions
screen_edges
```

---

# 13. E tem uma coisa que eu faria diferente do que você está imaginando

Você falou em:

> "cada tela recebe um número"

Eu manteria o número, mas criaria também um identificador estável.

Por exemplo:

```text
ID: 1024
key: checkout-payment
```

Porque daqui a 2 anos você vai olhar:

```text
screen 1837
```

e não vai fazer ideia do que é.

Então:

```json
{
  "id": 1837,
  "key": "checkout-payment",
  "name": "Checkout - Pagamento"
}
```

O número é ótimo para a engine.

O `key` é ótimo para humanos.

---

# 14. A validação também deve existir

Antes de publicar:

```text
Screen 100
   ↓
Button → Screen 200 ✓

Screen 200
   ↓
Button → Screen 999 ✗
```

O builder deveria acusar:

```text
❌ Screen 999 does not exist
```

Também:

```text
❌ Button requires label
❌ Image requires src
❌ Form requires fields
```

Eu usaria **JSON Schema + Zod** para validar a definição.

---

# 15. E o ponto mais importante: não faça o Builder primeiro

Eu faria em etapas.

### Fase 1 — Engine

Primeiro faça:

```
JSON
 ↓
Renderer
 ↓
React
```

Com uns 5 componentes:

```text
Text
Button
Image
Card
Container
```

E:

```text
Button → screenId
```

Quando isso funcionar, você já consegue construir 100 telas usando JSON.

---

### Fase 2 — Navegação

Crie:

```text
/screen/[id]
```

e:

```text
navigate(screenId)
```

Teste uma árvore de 20–30 telas.

---

### Fase 3 — Persistência

Passe:

```text
JSON hardcoded
```

para:

```text
Postgres
```

com:

```text
screens
screen_versions
```

---

### Fase 4 — Builder

Aí você cria:

```text
Palette
Canvas
Properties
Tree
Preview
```

---

### Fase 5 — Versionamento

Depois:

```text
Draft
Review
Published
Rollback
```

---

# A arquitetura final que eu buscaria

No final, você teria algo assim:

```
                     ┌──────────────────┐
                     │   SCREEN BUILDER │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │ Screen Definition│
                     │      JSON        │
                     └────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │      DATABASE     │
                    │                   │
                    │ v1 v2 v3 ...     │
                    └─────────┬─────────┘
                              │
                              ▼
                         /screen/[id]
                              │
                              ▼
                     ┌──────────────────┐
                     │  SCREEN ENGINE   │
                     └────────┬─────────┘
                              │
                ┌─────────────┼──────────────┐
                ▼             ▼              ▼
             Button          Card           Form
                │
                │ action
                ▼
          ┌──────────────┐
          │ Navigation   │
          │ /screen/200  │
          └──────────────┘
```

**Essa abordagem resolve exatamente o problema que você está sentindo:** a tela deixa de ser um artefato de programação e passa a ser uma **configuração versionável**.

E tem uma consequência muito boa: depois que a engine estiver madura, você consegue mudar a implementação visual de `Button`, `Card`, `Form`, etc. e **centenas de telas mudam automaticamente**, sem editar nenhuma delas.

Se você quiser, eu posso ir para a parte prática e montar contigo uma **primeira versão dessa arquitetura em Next.js + TypeScript**, incluindo `ScreenDefinition`, `ComponentRegistry`, `/screen/[id]`, navegação por `screenId`, Zod e um exemplo de 10 telas — que é provavelmente o melhor ponto de partida antes de construir o editor visual.

---

[25/9 19:45] Eduardo Faria: Sim. Eu transformaria isso em um **contrato arquitetural** do projeto: regras que qualquer dev precisa seguir para criar ou alterar telas.

A ideia é impedir que, daqui a 6 meses, alguém volte a criar `page.tsx` específico para cada tela e destrua o benefício do sistema.

## Regras de arquitetura do Screen Builder

# Regras de Arquitetura — Screen Builder

## 1. Princípio fundamental

As telas da aplicação são **dados**, não componentes React.

Uma tela deve ser descrita por uma `ScreenDefinition`.

O React é responsável somente por:

1. interpretar a definição da tela;
2. renderizar os componentes;
3. executar ações;
4. resolver dados/contexto;
5. controlar o ciclo de vida da aplicação.

É proibido criar uma implementação React específica para cada tela de negócio.

### Permitido

```
ScreenDefinition
      ↓
ScreenRenderer
      ↓
Component Registry
      ↓
React Components
```

### Proibido

```
Screen 001 → page.tsx específico
Screen 002 → page.tsx específico
Screen 003 → page.tsx específico
...
```

---

# 2. Existe apenas uma rota de tela

Todas as telas devem utilizar a mesma rota dinâmica:

```
/screen/[id]
```

Exemplo:

```
/screen/100
/screen/200
/screen/300
```

Não criar:

```
/login
/checkout
/payment
/confirmation
```

como páginas React independentes quando essas páginas puderem ser representadas pelo Screen Builder.

A implementação deve ser conceitualmente:

```text
app/
└── screen/
    └── [id]/
        └── page.tsx
```

Essa página é apenas um entry point para o `ScreenRenderer`.

---

# 3. Toda tela possui um ID único

Toda tela deve possuir:

```typescript
id: number
```

O ID é o identificador técnico da tela.

Exemplo:

```json
{
  "id": 100
}
```

O ID nunca deve ser reutilizado para outra tela.

Se uma tela for removida, seu ID permanece inutilizado.

---

# 4. Toda tela deve possuir uma chave legível

Além do ID numérico, toda tela deve possuir uma chave semântica:

```typescript
key: string
```

Exemplo:

```json
{
  "id": 100,
  "key": "checkout-payment"
}
```

A `key` deve explicar o propósito da tela.

### Ruim

```text
screen-100
page-23
tela-final-2
```

### Bom

```text
checkout-payment
checkout-confirmation
customer-address
product-selection
```

---

# 5. O ID é técnico; a key é semântica

Nunca utilizar a `key` como substituta do ID no mecanismo de navegação.

A navegação deve utilizar:

```typescript
screenId: number
```

e não:

```text
screenKey: string
```

Isso permite renomear uma tela sem quebrar referências existentes.

---

# 6. Uma tela é composta por componentes declarativos

Uma tela deve possuir uma lista de componentes:

```typescript
type ScreenDefinition = {
  id: number
  key: string
  name: string
  components: ComponentDefinition[]
}
```

Exemplo:

```json
{
  "id": 100,
  "key": "welcome",
  "name": "Welcome",
  "components": [
    {
      "type": "text",
      "props": {
        "text": "Bem-vindo"
      }
    },
    {
      "type": "button",
      "props": {
        "label": "Continuar"
      }
    }
  ]
}
```

---

# 7. Componentes devem ser reutilizáveis

Um componente do Screen Builder representa um tipo reutilizável.

Exemplos:

```text
text
button
image
card
container
divider
input
select
checkbox
radio
form
list
header
footer
modal
```

Não criar componentes chamados:

```text
WelcomeScreenButton
CheckoutScreenButton
CustomerScreenButton
```

quando eles forem apenas variações do componente `button`.

A personalização deve ocorrer através de `props`.

---

# 8. Componentes não conhecem a tela onde estão

Um componente não pode conter lógica específica de uma tela.

### Proibido

```typescript
if (screenId === 100) {
   ...
}
```

dentro de componentes genéricos.

Também é proibido:

```typescript
if (pathname === "/checkout") {
   ...
}
```

para alterar o comportamento de componentes do Builder.

O componente deve depender de suas propriedades e do contexto fornecido pela engine.

---

# 9. Todo componente possui um tipo

Cada componente deve possuir:

```typescript
type: string
```

Exemplo:

```json
{
  "type": "button"
}
```

O `type` identifica o componente no registry.

---

# 10. Component Registry é a única fonte de resolução

Os componentes devem ser registrados em um único registry.

Exemplo conceitual:

```typescript
const componentRegistry = {
  text: TextRenderer,
  button: ButtonRenderer,
  card: CardRenderer,
  image: ImageRenderer,
  form: FormRenderer,
}
```

O `ScreenRenderer` não deve possuir uma enorme cadeia de regras espalhadas pelo projeto.

### Evitar

```typescript
if (component.type === "text") ...
else if (component.type === "button") ...
else if (component.type === "card") ...
```

espalhado por múltiplos arquivos.

---

# 11. Componentes devem possuir contrato tipado

Cada componente deve definir claramente suas propriedades.

Exemplo:

```typescript
type ButtonDefinition = {
  type: "button"
  props: {
    label: string
    variant?: "primary" | "secondary"
    disabled?: boolean
    action?: Action
  }
}
```

O Builder e o Renderer compartilham desse mesmo contrato estrito via Zod e TypeScript.
