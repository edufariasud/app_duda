---
trigger: always_on
description: "Protocolos Clínicos de Emergência (SBV/APH), Fluxograma de Triagem e Regras de Decisão Médica"
---

# 🩺 Diretrizes Clínicas e Fluxograma de Emergência (SBV / APH)

Este documento define a especificação clínica oficial para o desenvolvimento e evolução dos fluxos de atendimento do aplicativo (baseado nas diretrizes AHA 2020, SBC e SAMU 192 / Ministério da Saúde).

---

## 1. Regra de Ouro Primordial
- **Segurança da Cena em 1º Lugar**: Nenhum socorrista deve intervir se a cena representar risco iminente à sua própria integridade física.
- **Dúvida no Pulso = Iniciar RCP**: Em vítimas não responsivas com respiração ausente ou anormal (gasping), se houver dúvida ou incapacidade de confirmar pulso em até 10 segundos, deve-se **iniciar imediatamente a RCP**. O atraso em compressões torácicas é letal.

---

## 2. 🏷️ Identificação Obrigatória de Telas por Código Clínico (IDs do Fluxograma)
**REGRA MANDATÓRIA DE RASTREABILIDADE**:
Toda tela, etapa, subfluxo, arquivo de dados ou componente associado a uma situação clínica **DEVE OBRIGATORIAMENTE** conter o código identificador correspondente da situação (ex: `1.1`, `1.2`, `2.1`, `2.2`, etc.).

### Tabela Oficial de Identificadores de Páginas e Estados:
| Código ID | Etapa Clínica | Descrição da Situação / Página |
| :--- | :--- | :--- |
| `1.1` | Segurança da Cena | Cena Insegura / Risco Iminente (Interromper avanço, 193/192) |
| `1.2` | Segurança da Cena | Cena Segura e Estabilizada (Aproximação com EPIs) |
| `2.1` | Responsividade | Vítima Consciente / Responsiva (SAMPLA, não movimentar) |
| `2.2` | Responsividade | Vítima Inconsciente / Não Responsiva (Chamar 192 + DEA) |
| `3.1` | Avaliação de Pulso | Checagem de Pulso Carotídeo em Adulto/Adolescente (≤ 10s) |
| `3.2` | Avaliação de Pulso | Checagem de Pulso Carotídeo/Femoral em Criança (≤ 10s) |
| `3.3` | Avaliação de Pulso | Checagem de Pulso Braquial em Lactente (< 1 ano, ≤ 10s) |
| `4.1` | Sinais Vitais | Inconsciente com Pulso e Respiração Normal $\rightarrow$ Posição Lateral de Segurança (PLS) |
| `4.2` | Parada Respiratória | Adulto: Não respira, mas TEM pulso $\rightarrow$ Ventilação de Resgate (1 a cada 6s) |
| `4.3` | Parada Respiratória | Criança/Lactente: Não respira, mas TEM pulso > 60 bpm $\rightarrow$ Ventilação (1 a cada 2-3s) |
| `5.1` | PCR Confirmada | Parada Cardiorrespiratória em Adulto/Adolescente $\rightarrow$ RCP 30:2 (5 a 6 cm) |
| `5.2` | PCR Confirmada | Parada Cardiorrespiratória em Criança $\rightarrow$ RCP 5 cm (30:2 com 1 socorr / 15:2 com 2 socorr) |
| `5.3` | PCR Confirmada | Parada Cardiorrespiratória em Lactente $\rightarrow$ RCP 4 cm (30:2 com 1 socorr / 15:2 com 2 socorr) |
| `5.4` | Suspeita / Dúvida | Dúvida no Pulso ou Respiração Agônica $\rightarrow$ Tratar compulsoriamente como PCR |
| `6.1` | Desfibrilação | Uso e Posicionamento do DEA (Pás adulto vs pediátricas / Análise e Choque) |

### Como aplicar a Identificação:
1. **No Código / TypeScript**: As rotas, chaves de estado (`view`, `stepId`, `stageId`) e propriedades devem carregar o ID (ex: `currentStep = "1.1"`).
2. **Nos Comentários e Cabeçalhos de Arquivo**: Todo componente de tela deve conter um cabeçalho explícito indicando o código:
   ```tsx
   /**
    * ETAPA CLÍNICA: 1.1 - Cena Insegura
    * Fluxo: Pessoa Inconsciente -> Avaliação de Cena -> Não Segura
    */
   ```
3. **No Header da UI (opcional / sutil)**: Quando exibido para o socorrista ou modo estudante, pode incluir uma identificação discreta de progresso ou badge (ex: `Etapa 1.1` ou `Passo 1.1`).
4. **NUNCA omitir** essa identificação em novas páginas ou passos de fluxo!

---

## 3. 📋 Fidelidade Total ao Conteúdo do CSV (Nenhum Dado Pode Ser Ignorado)
**REGRA MANDATÓRIA DE CONTEÚDO**:
Todo o conteúdo e campos clínicos presentes no arquivo CSV **DEVEM OBRIGATORIAMENTE** ser aproveitados e disponibilizados nas telas e no simulador. Nenhuma informação ou instrução técnica deve ser descartada ou omitida.

### Mapeamento dos Campos do CSV na UI:
1. **Ponto de Decisão (Avaliação)** $\rightarrow$ Pergunta Central na UI (`QuestionCard`).
2. **Resposta / Condição** $\rightarrow$ Opção acionada ou estado da vítima.
3. **Desvio / Próximo Passo** $\rightarrow$ Ação do botão direto (`DecisionButtons` / `DecisionOptionCard`).
4. **Diagnóstico Clínico** $\rightarrow$ Título de estado / badge do quadro da vítima.
5. **Intervenção Imediata (Conduta)** $\rightarrow$ Instruções principais e técnicas de socorro na tela.
6. **Por quê / Justificativa Clínica (REVELAÇÃO POR CLIQUE)**:
   - **Regra**: O texto da coluna *"Por quê / Justificativa Clínica"* **NUNCA deve poluir visualmente a tela de emergência direta**, mas **DEVE OBRIGATORIAMENTE estar disponível ao socorrista ou estudante mediante clique**.
   - **Como exibir**: Usar um componente expansível interativo (ex: `WhyAccordion`, `JustificativaCard` ou botão *"💡 Por que fazer isso? / Entenda o motivo"*).
   - Ao clicar, o card se expande suavemente exibindo a justificativa fisiopatológica completa.
7. **Próximo Passo Crítico** $\rightarrow$ Alerta inferior ou card de acompanhamento contínuo (`AlertBanner`).
8. **Prioridade** $\rightarrow$ Indicador de criticidade (Alerta Vermelho, Seguro, Estável, Urgência, PCR Crítica, etc.).

---

## 4. 🧩 Componentização Total e Irrestrita (COMPONENTE EM TUDO)
- **REGRA DE OURO DE ENGENHARIA**: **SEMPRE componentizar TUDO**. Nenhuma tela deve conter código monolítico, marcações de botões, cards ou cabeçalhos repetidos e soltos no JSX.
- Toda interface deve ser montada como uma orquestração limpa de componentes modulares reutilizáveis de `src/components/ui/`:
  - `ScreenHeader`: Cabeçalho fixo com título e ação voltar.
  - `EmergencyImage`: Ilustrações com proporção justa `4/3` e cantos arredondados.
  - `QuestionCard`: Perguntas centrais de tomada de decisão.
  - `DecisionButtons`: Botões diretos SIM/NÃO com legendas.
  - `DecisionOptionCard`: Cards horizontais com bloco de cor e descrição.
  - `SelectionCard`: Cards de seleção com ícone lateral e textos explicativos.
  - `AlertBanner`: Alertas de risco, PCR ou atenção.
  - `TipsCard`: Listas de dicas e recomendações clínicas.
  - `WhyAccordion`: Componente expansível ao clique para o *"Por quê / Justificativa Clínica"*.
  - `AppShell`: Container do dispositivo mobile.
  - `BottomNav`: Dock de navegação inferior.
- Se uma nova necessidade visual surgir, crie primeiro o componente atômico em `src/components/ui/` e só depois o utilize na tela.

---

## 5. Detalhamento dos Protocolos por Faixa Etária
- **Ritmo Universal de Compressões**: **100 a 120 compressões por minuto** para todas as faixas etárias. Permitir o retorno completo do tórax sem apoiar peso entre as compressões.
- **Adulto / Adolescente**:
  - Técnica: 2 mãos sobrepostas e entrelaçadas no centro do tórax (sobre o esterno).
  - Profundidade: 5 a 6 cm (nunca exceder 6 cm).
  - Relação: **30:2** (sempre, seja com 1 ou 2 socorristas).
- **Criança (1 ano à Puberdade)**:
  - Técnica: 1 ou 2 mãos no terço inferior do esterno (conforme biotipo).
  - Profundidade: 5 cm (aprox. 1/3 do diâmetro anteroposterior).
  - Relação: **30:2** com 1 socorrista | **15:2** com 2 socorristas.
- **Lactente (< 1 ano)**:
  - Técnica: 1 socorrista usa 2 dedos no centro do esterno | 2 socorristas usam técnica dos 2 polegares circundando o tórax.
  - Profundidade: 4 cm (aprox. 1/3 do diâmetro anteroposterior).
  - Relação: **30:2** com 1 socorrista | **15:2** com 2 socorristas.

---

## 6. Adaptação entre Modos do Aplicativo
- **Modo População (Leigo)**:
  - Foco em simplicidade e ação rápida: instrução de compressão contínua só com as mãos (Hands-Only CPR para adultos), ligação direta para 192 e uso orientado do DEA.
- **Modo Estudante / Profissional de Saúde**:
  - Inclui avaliação de pulso específico (braquial vs carotídeo), ventilações com dispositivo bolsa-válvula-máscara (BVM), relação 15:2 pediátrica e critérios de bradicardia sintomática (< 60 bpm).

---

## 7. Acessibilidade e Tipografia Crítica
- **NUNCA usar fontes menores que `text-sm` (14px)**.
- Cores semânticas oficiais:
  - Verde: `#15803d` (Afirmativo / Estável)
  - Vermelho: `#b91c1c` (Negativo / Crítico / Urgência)
  - Azul: `#1d4ed8` (Vias aéreas / Manobras)
  - Âmbar: `#ea580c` (Avisos)
