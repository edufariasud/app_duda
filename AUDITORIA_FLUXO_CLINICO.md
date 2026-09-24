# 🔍 Auditoria Completa de Fluxo Clínico, CSV e Regras de Design — `duda_app`

**Data:** 2026-09-24  
**Escopo Auditado:** 16 etapas + tabela comparativa do CSV ([`src/data/flowchart.ts`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/data/flowchart.ts)) vs. telas atuais (`Step_1` a `Step_6` e [`src/app/page.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/app/page.tsx)).

---

## 🚨 1. Erros de Fluxo e Navegação Clínica

1. **Etapa `1.2` (Cena Segura e Estabilizada) é pulada inteira no fluxo**
   - **Onde**: [`Step_1_SegurancaCena.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_1_SegurancaCena.tsx#L117-L124)
   - **Problema**: Ao clicar em **SIM** na pergunta *"A cena está segura?"*, o botão chama `onCenaSegura()` e pula **direto para a Etapa 2 (`Step_2_Responsividade`)**.
   - **Impacto no CSV**: A Etapa `1.2` nunca é exibida como estado próprio. O socorrista nunca vê o badge `Etapa 1.2 (Seguro)`, nem o diagnóstico *"Cena Segura e Estabilizada"*, nem a conduta obrigatória *"Aproxime-se da vítima com atenção e use EPIs (luvas e máscara de barreira)"*, nem o `proximoPasso` de `1.2`.

2. **Separação sequencial de Pulso (Etapa 3) e Respiração (Etapa 4) + Falta de opção "EM DÚVIDA" (`5.4`) na Respiração**
   - **Onde**: [`Step_3_CheckPulso.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_3_CheckPulso.tsx) e [`Step_4_Respiracao.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_4_Respiracao.tsx#L169-L182)
   - **Problema**:
     - No CSV, a Etapa `2.2` determina: *"Checar **simultaneamente** respiração e pulso central por no máximo 10 segundos"*, e a Etapa `5.4` pergunta: *"Em dúvida se a vítima tem pulso **ou respira normalmente**?"*.
     - No fluxo atual, a checagem foi quebrada em duas telas separadas (primeiro Pulso na Etapa 3 e depois Respiração na Etapa 4).
     - Além disso, na tela de Respiração ([`Step_4_Respiracao.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_4_Respiracao.tsx#L169-L182)), só existem os botões **SIM** (`4.1`) e **NÃO** (`4.2`/`4.3`). **Não existe o botão "EM DÚVIDA" (`5.4`)** caso o socorrista esteja em dúvida se a respiração é normal ou agônica (*gasping*).

3. **Bug no botão "Voltar" (`onBack`) da Etapa 5 (`Step_5_RCP`)**
   - **Onde**: [`src/app/page.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/app/page.tsx#L177-L181)
   - **Problema**: O código atual tem um ternário redundante:
     ```tsx
     onBack={() => goTo(flowState.isDuvida ? "step_3_pulso" : "step_3_pulso")}
     ```
   - O usuário pode entrar na `Step_5_RCP` por **3 caminhos distintos**:
     1. Vindo da **Etapa 3 (`step_3_pulso`)** (sem pulso ou dúvida `5.4`);
     2. Vindo da **Etapa 4 (`step_4_respiracao` — Ventilação `4.2`/`4.3`)** ao clicar em *"🔴 Iniciar RCP Agora"* quando o pulso cessa (`onPulsoCessou`);
     3. Vindo da **Etapa 6 (`step_6_dea`)** ao clicar em *"🔴 Retomar RCP por 2 Minutos"* após o choque (`onVoltarRCP`).
   - Se ele veio da Etapa 4 ou da Etapa 6 e clicar em "Voltar" no topo da tela de RCP, o app o joga erroneamente de volta para a **Etapa 3 (`step_3_pulso`)**.

4. **Falta de saída/reavaliação na RCP (`Step_5_RCP`) quando NÃO há DEA ou quando a vítima recupera sinais vitais**
   - **Onde**: [`Step_5_RCP.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_5_RCP.tsx#L161-L169) e [`Step_6_DEA.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_6_DEA.tsx#L117-L123)
   - **Problema**:
     - Na `Step_5_RCP`, o único botão de ação é `"⚡ DEA Chegou — Usar Agora"`. Não há opção para **reavaliar pulso/respiração a cada 2 minutos** (caso não haja DEA disponível) nem opção para **"Vítima voltou a respirar / recuperou pulso"** (que deveria encaminhar para `4.1` — Posição Lateral de Segurança).
     - Quando o socorrista já usou o DEA (`6.1`) e clica em *"🔴 Retomar RCP por 2 Minutos"*, ele volta para `Step_5_RCP` e o botão continua dizendo *"⚡ DEA Chegou — Usar Agora"*, mesmo o DEA já estando conectado.

5. **Falta de botão de ligação `192` na Etapa `2.2` (Vítima Inconsciente)**
   - **Onde**: [`Step_2_Responsividade.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_2_Responsividade.tsx#L106-L145)
   - **Problema**: Na Etapa `1.1` há botões clicáveis para ligar `193` e `192`. Porém, na Etapa `2.2` (onde a conduta oficial do CSV é ligar `192` e pedir o DEA), só existe o texto do alerta — não há botão de acionamento rápido `tel:192`.

6. **Modo "Estudante" e abas inferiores ("Estudos" / "Simulador") sem rota funcional**
   - **Onde**: [`src/app/page.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/app/page.tsx#L58-L70) e [`HomeScreen.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/HomeScreen.tsx#L62-L77)
   - **Problema**:
     - Clicar no card "Modo População" na Home abre imediatamente a tela `populacao` sem clicar em "Iniciar", mas clicar em "Modo Estudante" só seleciona o card. Ao clicar em "Iniciar", `handleStart` chama `goTo("estudante")`, que **não possui `case "estudante"` no `switch`** de `page.tsx` (volta para o `default`, parecendo que o botão está travado).
     - No `BottomNav`, clicar nas abas `"estudos"` ou `"simulador"` muda a cor da aba ativa, mas não troca a tela em `handleTabChange`.

---

## 📋 2. Dados do CSV Omitidos ou Desalinhados na UI (Regra Mandatória 2)

1. **Etapa `5.4` (Suspeita de PCR / Dúvida) tem campos omitidos**
   - **Onde**: [`Step_5_RCP.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_5_RCP.tsx#L108-L115)
   - **Problema**: Quando o usuário escolhe "EM DÚVIDA" (`5.4`), ele vai direto para `Step_5_RCP` com `isDuvida = true`. Os campos de `5.4` no CSV — `perguntaCentral` (*"Em dúvida se a vítima tem pulso ou respira normalmente?"*), `diagnosticoClinico` (*"Suspeita de PCR (Protocolo)"*) e `proximoPasso` (*"Instale o DEA com urgência. O aparelho analisará se existe ritmo chocável (FV/TV)."*) — **são substituídos pelos de `5.1`/`5.2`/`5.3` e nunca aparecem**.

2. **Perguntas Centrais do CSV nas Etapas `3.1`, `3.2`, `3.3`, `4.1`, `4.2`, `4.3` e `6.1` não são usadas**
   - **Onde**: [`Step_3_CheckPulso.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_3_CheckPulso.tsx#L88-L90), [`Step_4_Respiracao.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_4_Respiracao.tsx#L158-L162), [`Step_6_DEA.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_6_DEA.tsx#L59-L66)
   - **Problema**:
     - Em `4.2` e `4.3`, o CSV traz perguntas específicas de decisão: *"Não respira (ou gasping), mas TEM pulso palpável presente?"* (`4.2`) e *"Não respira (ou gasping), mas TEM pulso > 60 bpm presente?"* (`4.3`), além de *"Respira normalmente e possui pulso palpável satisfatório?"* (`4.1`). Na tela atual, foi colocada uma pergunta genérica hardcoded (*"A vítima está respirando normalmente?"*).
     - O campo `desvioProximoPasso` do CSV (presente nas 16 etapas de `ETAPAS_CLINICAS`) não está sendo consumido em nenhuma das telas.

3. **Tabela Comparativa do CSV (`PARAMETROS_CLINICOS`) nunca é exibida**
   - **Onde**: [`src/data/flowchart.ts`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/data/flowchart.ts#L338-L381)
   - **Problema**: A constante `PARAMETROS_CLINICOS` (com as 5 linhas comparativas de Lactente, Criança, Adulto e Regra de Ouro do CSV) foi criada em `flowchart.ts`, mas **não é importada nem renderizada em nenhum componente do aplicativo**.

4. **`WhyAccordion` exibido prematuramente nas telas de pergunta antes da decisão**
   - **Onde**: [`Step_1_SegurancaCena.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_1_SegurancaCena.tsx#L140), [`Step_2_Responsividade.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_2_Responsividade.tsx#L185), [`Step_4_Respiracao.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_4_Respiracao.tsx#L194)
   - **Problema**: Na tela de pergunta inicial da Etapa 1 (onde o `StepBadge` é `"1"`), já aparece a justificativa de `1.2`; na pergunta da Etapa 2 (`StepBadge` `"2"`), já aparece a justificativa de `2.2` (mesmo antes de saber se a vítima está consciente `2.1` ou inconsciente `2.2`); e na pergunta da Etapa 4 (`StepBadge` `"4"`), já aparece a justificativa de `4.1` (PLS).

---

## 🧩 3. Violações das Regras de Design e Componentização (`.rules`)

1. **IDs de Etapa fora do padrão oficial (`"1"`, `"2"`, `"4"`, `"5.4 → 5.1"`)**
   - **Onde**: `Step_1_SegurancaCena.tsx` (`stepId="1"`), `Step_2_Responsividade.tsx` (`stepId="2"`), `Step_4_Respiracao.tsx` (`stepId="4"`), `Step_5_RCP.tsx` (`stepId="5.4 → 5.1"`).
   - **Problema**: A Regra Mandatória 3 exige os códigos exatos da tabela (`1.1`, `1.2`, `2.1`, `2.2`, `3.1`... `6.1`). Como as perguntas de decisão de 1, 2 e 4 foram separadas das telas de resultado, criaram-se IDs genéricos (`"1"`, `"2"`, `"4"`) que não existem no CSV.

2. **Violação da Fonte Mínima (`text-xs` = 12px) proibida pela Regra Mandatória 4**
   - **Onde**:
     - [`StepBadge.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/ui/StepBadge.tsx#L37): badge de prioridade usa `text-xs`.
     - [`BottomNav.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/ui/BottomNav.tsx#L46): rótulos das abas usam `text-xs sm:text-sm`.
     - [`ModeSelectorCard.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/ui/ModeSelectorCard.tsx): subtítulo "Modo" usa `text-xs`.

3. **Elementos HTML/JSX soltos nas telas em vez de componentizados (Regra Mandatória 1)**
   - **Onde**:
     - [`Step_3_CheckPulso.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_3_CheckPulso.tsx#L106-L153): Os 3 botões (`SIM`, `NÃO`, `EM DÚVIDA`) foram recriados com `<button>` manual no meio da tela em vez de usar o componente [`DecisionOptionCard`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/ui/DecisionOptionCard.tsx).
     - [`Step_1_SegurancaCena.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_1_SegurancaCena.tsx#L58-L90): Os botões de chamada telefônica (`193` e `192`) são `<a>` estilizados manualmente na tela em vez de um componente reutilizável (que também servirá para a Etapa `2.2`).
     - [`Step_5_RCP.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_5_RCP.tsx#L129-L145) e [`Step_6_DEA.tsx`](file:///run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/duda_app/src/components/screens/Step_6_DEA.tsx#L69-L83): Cards de especificações técnicas e botões de ação final (`<button>`) estão hardcoded direto no JSX das telas.
