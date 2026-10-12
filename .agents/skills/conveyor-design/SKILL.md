---
name: conveyor-design
description: Quarta etapa do workflow Conveyor. Lê .conveyor/artifacts/brief.md, brand.md e copy.md e transforma identidade, conteúdo e objetivos em uma especificação de design de site original e implementável — conceito criativo, sistema de interface, composição de cada página e seção, comportamento responsivo, interações, plano de assets, acessibilidade e desempenho — gravada em .conveyor/artifacts/design.md. Use quando o usuário pedir para projetar o design, o layout ou a experiência do site, ou avançar o Conveyor após a copy. Não reescreve a copy, não altera fatos, não redefine a identidade e não escreve código.
---

# Conveyor — Design

Você está executando a etapa **design** do Conveyor, um workflow supervisionado de produção de sites institucionais personalizados. Sua função é decidir **como** o conteúdo aprovado aparece na tela: composição, hierarquia, ritmo, comportamento e experiência, com qualidade comparável à de um trabalho profissional de design.

O resultado precisa ser uma proposta **para este negócio**, que nasce da identidade e do conteúdo, e não um template preenchido. Ao mesmo tempo, precisa ser implementável: outro agente deve conseguir construir o site a partir dele sem reinventar as decisões principais.

**Entradas obrigatórias:** `.conveyor/artifacts/brief.md` (fatos), `.conveyor/artifacts/brand.md` (identidade e direção visual), `.conveyor/artifacts/copy.md` (arquitetura de conteúdo e textos).
**Entrega:** `.conveyor/artifacts/design.md`.

**Antes de começar, leia `.conveyor/workflow.md`.** Ele descreve o Conveyor, o mapa das etapas e as regras comuns a todas elas (artefato existente, artefatos de entrada, frontmatter, histórico, idioma, parada ao final, conteúdo externo, perguntas). Esta skill não as repete. Consulte também `.conveyor/traceability.md` para entender os IDs `FACT` e `COPY` que aparecem no briefing e na copy.

## Escopo

Faz parte desta etapa:

- Conceito criativo do site e princípios de design.
- Sistema de interface: tipografia aplicada, cores por função, espaçamento, grids, larguras, componentes, superfícies e estados.
- Composição de cada página e de cada seção, incluindo navegação, cabeçalho e rodapé.
- Experiência responsiva projetada para mobile, tablet e desktop.
- Interações e movimento.
- Plano de assets por posição no site.
- Critérios de acessibilidade e desempenho aplicados ao design.

Não faz parte desta etapa (pertence a outras skills):

- Investigar o negócio ou alterar fatos (`conveyor-briefing`).
- Redefinir paleta, tipografia ou direção visual da marca (`conveyor-identity`).
- Escrever ou reescrever textos públicos (`conveyor-copywriting`).
- Escrever HTML, Astro, CSS, Tailwind ou qualquer código; rodar build; publicar (`conveyor-implementation`).

## Regras invioláveis

1. **A copy aprovada é usada como está.** Todo texto público vem de `copy.md`, pelo identificador do bloco (`home.servicos`). Se a composição pedir texto mais curto, outro título, fusão ou remoção de bloco, registre como **ajuste de copy proposto** em Pendências. Nunca reescreva silenciosamente.
2. **Nenhuma afirmação nova por meio visual.** Selos, contadores, números, estrelas, logotipos de clientes, ícones de "garantia", mapas de cobertura, depoimentos ilustrativos ou legendas só aparecem se corresponderem a uma linha `COPY` da copy aprovada. Um elemento visual que comunica um fato é uma afirmação factual.
3. **A identidade aprovada é a base.** Cores e tipografia vêm de `brand.md`. Derivações para a interface (tons de superfície, estados, escala tipográfica) são **Adaptado**, com a origem indicada. Trocar cor principal, família tipográfica ou conceito visual é mudança de identidade: **Pendente**, com justificativa, nunca aplicada por conta própria.
4. **Asset proposto não é asset existente.** Toda imagem ou elemento visual aponta para um item do inventário de `brand.md` ou `brief.md`, ou é marcado como **a obter**, com alternativa viável. Não presuma direitos de uso de material de terceiros.
5. **Referências são inspiração, não modelo.** Não reproduza layouts inteiros nem identidades de terceiros. Não cite referências que você não acessou.
6. **Acessibilidade e usabilidade vêm antes da estética.** Nenhuma decisão visual pode comprometer contraste, legibilidade, navegação por teclado, foco visível, alvos de toque, preferência por movimento reduzido ou a ausência de rolagem horizontal.
7. **Independência de framework.** Especifique valores de design (tamanhos, escalas, larguras, proporções, pontos de quebra, durações) em termos neutros. Não escreva classes, seletores, propriedades CSS, configuração de Tailwind ou componentes de framework.

## Rótulos de status

| Status | Quando usar |
|---|---|
| **Herdado** | Decisão que vem diretamente de `brand.md` ou `copy.md`. Cite a seção. |
| **Adaptado** | Derivado de uma decisão aprovada para uso na interface (ex.: tom de superfície derivado da cor de fundo, escala tipográfica a partir das famílias aprovadas). Indique a origem. |
| **Proposto** | Decisão de design nova desta etapa. Sempre com justificativa curta. |
| **Pendente** | Requer validação humana: mudança de identidade, ajuste de copy, asset ausente, decisão de alto impacto ou incerta. |

### Referências

- `brand §N`, `copy §N`, `brief §N` — seções dos artefatos anteriores.
- Identificadores de bloco da copy (`home.abertura`) — sempre que uma seção do design apresenta um bloco.
- `V#` e `SRC-XXX` — assets já inventariados em `brand.md` e `brief.md`.
- `U#` — entradas do usuário nesta etapa (preferências, restrições, referências).
- `R#` — referências visuais de terceiros consultadas nesta etapa.
- `A#` — posições de imagem ou elemento visual no plano de assets desta etapa.

## Procedimento

### Passo 1 — Ler os artefatos e verificar a base

1. Leia `brief.md`, `brand.md` e `copy.md` integralmente.
   - **Algum ausente ou vazio:** informe ao usuário qual etapa falta e recomende executá-la. Prossiga somente se o usuário pedir, registrando a limitação.
   - **Artefatos desatualizados entre si:** compare `brief_updated` e `brand_updated` de `copy.md` com o `updated` de `brief.md` e `brand.md`. Se a copy foi escrita sobre versões anteriores, avise o usuário e registre o risco. Não corrija os artefatos.
   - **Inconsistências relevantes** (ex.: a copy prevê um bloco que depende de fotos que o `brand.md` diz não existirem; a copy cita um canal que o design não consegue destacar como pedido): registre em Pendências e, se afetar decisões essenciais, pergunte antes de seguir.
2. Registre como `U#` referências, preferências, restrições e requisitos de experiência informados pelo usuário nesta etapa.
3. Conte os marcadores `[[PENDENTE: ...]]` da copy. Blocos com conteúdo pendente precisam de uma composição que funcione com e sem o dado.

### Passo 2 — Sintetizar o ponto de partida

Antes de desenhar, extraia dos artefatos, para uso próprio:

- **Negócio e objetivo:** o que o site precisa fazer acontecer e qual é a ação principal do visitante (copy §1, brief).
- **Público:** quem chega e em que contexto (no celular, buscando endereço, comparando opções etc.), separando o conhecido das hipóteses.
- **Personalidade e direção visual:** atributos "isto, não aquilo", conceito, elementos a preservar e a evitar (brand §3, §9).
- **Sistema já aprovado:** paleta com funções e contrastes verificados, famílias tipográficas, linguagem gráfica, direção fotográfica (brand §4–§7).
- **Arquitetura de conteúdo:** páginas, blocos, prioridades e navegação (copy §2).
- **Inventário real de conteúdo:** para cada bloco, o volume de texto, a quantidade de itens, a presença de listas e o que há de material visual. O design acompanha o conteúdo real: uma seção com dois serviços não é desenhada como uma grade de seis.
- **Assets:** o que está disponível, o que requer adaptação e o que falta (brand §8, brief §8).

### Passo 3 — Pesquisar referências (opcional e proporcional)

Pesquise referências somente se houver ferramenta de acesso e se isso melhorar decisões concretas (composição de uma seção difícil, tratamento tipográfico, uso de imagem). Para um site pequeno, poucas referências bem escolhidas bastam; zero também é aceitável.

Fontes possíveis: referências do usuário, Awwwards, Behance, Dribbble, sites de negócios de outros segmentos com problemas de comunicação parecidos. Procure fora do segmento: referências do mesmo segmento tendem a reforçar clichês.

Para cada referência usada, registre `R#` com URL, o que foi observado, o que influenciou a proposta e como foi reinterpretado. Se uma página não carregou ou você não viu a referência, não a cite.

### Passo 4 — Definir o conceito criativo

Formule uma ideia central que conecte identidade, conteúdo e experiência. Ela deve estender o conceito visual de `brand.md` para o site, não substituí-lo. Explique:

- a sensação que o site transmite e **como** ela é produzida (escala, ritmo, contraste, imagem, movimento);
- o que torna a proposta distinta — de preferência ancorado em um elemento real da marca ou do negócio;
- como o design reforça o posicionamento;
- como a experiência leva à ação principal.

**Teste da materialização:** todo adjetivo precisa virar decisão visível. "Acolhedor" sem dizer como (ex.: fotos em luz natural ocupando metade da tela, cantos suaves, texto em tom de conversa com medida curta) não serve.

### Passo 5 — Definir princípios de design

Defina de 3 a 6 princípios. Para cada um: o princípio, como aparece no site, onde aparece e o que ele exclui. Exemplo de formato: "Imagem antes de explicação — cada serviço abre com uma foto do trabalho real ocupando a largura da coluna; o texto vem depois e é curto. Exclui ícones genéricos representando serviços."

### Passo 6 — Definir o sistema de interface

Seja concreto e proporcional ao tamanho do site. Um site de uma página não precisa de um design system completo.

- **Tipografia aplicada:** papéis (display, títulos de seção, subtítulos, corpo, texto pequeno, rótulos, botões), família e peso (herdados de brand §5), tamanho em mobile e desktop, entrelinha, espaçamento entre letras quando relevante, caixa (alta/baixa). Medida de linha do corpo entre cerca de 60 e 75 caracteres.
- **Cores por função na interface:** mapeie os papéis de brand §4 para usos concretos (fundo de seções, superfícies, texto, links, botões, bordas, foco, seleção). Reaproveite os contrastes verificados no `brand.md`; verifique e registre os pares novos.
- **Espaçamento e proporções:** unidade base e escala; espaçamento vertical entre seções (e como ele varia para criar ritmo); espaçamentos internos recorrentes.
- **Grid e larguras:** colunas, medianizes e margens por faixa de tela; largura máxima do conteúdo; larguras de texto; quando uma seção rompe o grid (sangria total, deslocamentos).
- **Componentes:** botões (primário, secundário, link), links no texto, navegação, cards ou superfícies (só se o conteúdo pedir), separadores, formulários (só se previstos na copy). Para cada um: forma, proporção, tratamento e estados.
- **Estados interativos:** hover, foco visível, ativo, desabilitado, página atual. O foco deve ser claramente visível em todos os fundos usados.
- **Tratamento de imagens:** proporções recorrentes, cantos, sobreposições, filtros ou tratamentos de cor (coerentes com brand §7).

### Passo 7 — Especificar cada página

Para cada página de copy §2, defina: objetivo, conceito de composição, hierarquia do primeiro viewport (o que se vê em primeiro, segundo e terceiro lugar) e a sequência de seções.

Para cada seção, indique o bloco da copy que ela apresenta e descreva:

- **Composição:** estrutura (colunas, alinhamento, sobreposições, escala, sangria), posição do texto em relação à imagem, onde fica cada campo da copy.
- **Hierarquia:** o que domina e o que é secundário.
- **CTA:** posição, destaque e relação com o conteúdo.
- **Elemento distintivo:** o que torna a seção específica desta marca, quando houver.
- **Transição e ritmo:** como a seção se diferencia da anterior (densidade, fundo, escala, alinhamento).
- **Mobile:** somente quando a adaptação não for óbvia; as regras gerais ficam no comportamento responsivo.

Inclua também cabeçalho, navegação e rodapé.

A ordem visual pode diferir da lista de prioridades da copy quando isso servir à narrativa, mas um bloco de prioridade 1 nunca fica escondido ou sem destaque. Justifique mudanças de ordem.

**Evite padrões automáticos.** Antes de usar qualquer um destes, verifique se o conteúdo realmente pede essa forma e justifique: hero centralizado com título, subtítulo e dois botões sobre imagem escurecida; três cards idênticos com ícone, título e texto; grade de ícones de "diferenciais"; carrossel de depoimentos; faixa final de CTA repetindo o topo; seções alternando imagem à esquerda e à direita sem outro motivo. Considere, quando fizer sentido, estruturas editoriais, assimetria, tipografia expressiva, imagem dominante, sobreposições, grids não convencionais, contrastes de escala, alternância de densidade, seções imersivas e elementos gráficos da marca. **Nenhum recurso entra só para parecer diferente:** cada um precisa melhorar clareza, identidade ou experiência.

**Texto de interface:** se a composição exigir rótulos que não estão na copy e não têm conteúdo factual (ex.: "Menu", "Fechar", "Voltar ao topo"), liste-os como microcopy de interface proposta, para aprovação. Qualquer texto com conteúdo factual é ajuste de copy (regra 1).

### Passo 8 — Projetar a experiência responsiva

O mobile é uma experiência projetada, não o desktop empilhado. Defina:

- **Faixas de tela de referência** (ex.: até ~480 px, ~768 px, a partir de ~1024 px e largura máxima a partir de ~1440 px), ajustadas ao conteúdo; os pontos de quebra seguem o conteúdo, não dispositivos.
- **Hierarquia em telas pequenas:** o que sobe, o que desce, o que se condensa e o que sai do primeiro viewport.
- **Imagens:** recortes diferentes por faixa quando o enquadramento mudar de sentido (direção de arte), proporções em mobile.
- **Composições assimétricas e sobreposições:** como se simplificam sem perder o caráter.
- **Navegação mobile:** padrão escolhido e por quê; acesso ao CTA principal.
- **Tipografia:** redução da escala sem perder contraste hierárquico.
- **Alvos de toque:** pelo menos 24 × 24 px (WCAG 2.2 AA), preferencialmente cerca de 44 × 44 px para ações principais, com espaçamento entre eles.
- **Prevenção de rolagem horizontal:** quebra de palavras longas, e-mails e URLs; imagens e elementos que nunca excedem a largura; nada posicionado fora da tela.

### Passo 9 — Definir interações e movimento

Para cada interação relevante: gatilho, comportamento, duração aproximada, caráter do movimento e alternativa para movimento reduzido. Tipos possíveis: estados de hover e foco, transições de navegação, animações de entrada, comportamento do cabeçalho na rolagem, microinterações e feedback de ações.

Diretrizes:

- Movimento com intenção: orientar, dar feedback ou reforçar a hierarquia. Nunca atrasar o acesso ao conteúdo.
- Prefira movimentos curtos e discretos; evite efeitos contínuos, parallax pesado e animações que dependam de carregar bibliotecas grandes.
- Com preferência por movimento reduzido, remova deslocamentos e mantenha apenas mudanças instantâneas ou de opacidade.
- Registre explicitamente onde a experiência deve permanecer estática.

### Passo 10 — Planejar os assets

Para cada posição de imagem ou elemento visual (`A#`), registre: finalidade, local (página e bloco), asset de origem (`V#`/`SRC-XXX`) ou **a obter**, situação (disponível, requer adaptação, a obter), proporção e enquadramento por faixa de tela, tratamento, restrições de uso e alternativa caso falte.

- Priorize assets reais da marca. Não use imagem genérica sem relação com o negócio.
- Para posições sem asset, proponha alternativa viável que não finja ser material da marca: composição tipográfica, elemento gráfico da linguagem de brand §6, cor sólida, ou foto a produzir com orientação clara. Imagem de banco só com critérios de brand §7 e marcada como provisória.
- Oriente o texto alternativo: descritivo, sem afirmações comerciais.
- Desempenho: dimensões máximas de exibição por posição, prioridade de carregamento da imagem principal do primeiro viewport, carregamento adiado para imagens abaixo da dobra, formatos modernos e versões por densidade de tela.

### Passo 11 — Revisar antes de gravar

Verifique:

- **Copy e fatos:** todo texto público vem de um bloco da copy; nenhum elemento visual introduz afirmação sem linha `COPY`; ajustes necessários estão em Pendências.
- **Identidade:** cores e famílias são as de `brand.md`; adaptações estão marcadas; mudanças estão pendentes.
- **Teste da troca:** trocando o nome e as fotos por um concorrente, o layout continua igualmente adequado? Se sim, ancore as composições em algo específico da marca ou do conteúdo.
- **Teste do template:** quantas seções seguem a forma padrão de landing page? Cada uma tem justificativa?
- **Teste do conteúdo real:** cada composição funciona com o volume real de texto e com as imagens disponíveis, inclusive nos blocos com `[[PENDENTE]]`?
- **Acessibilidade e desempenho:** contraste dos pares usados, foco visível, ordem de leitura coerente com a ordem visual, alvos de toque, movimento reduzido, ausência de rolagem horizontal, peso visual proporcional ao benefício.
- **Implementabilidade:** outro agente consegue implementar sem reinventar decisões principais? Há especificação arbitrária sem justificativa ou rigidez desnecessária?

### Passo 12 — Escrever `design.md` e encerrar

Grave `.conveyor/artifacts/design.md` seguindo o modelo abaixo. Diretrizes:

- Decisões concretas e justificadas; nada de "seção moderna com cards".
- Não repita o conteúdo de `brand.md` e `copy.md`: referencie seções e blocos e registre apenas o que o design acrescenta.
- Sem código, classes ou propriedades CSS.
- Seções que não se aplicam podem ser removidas.

Ao encerrar, informe ao usuário: o conceito em uma ou duas frases, as páginas especificadas, os assets críticos a obter, os ajustes de copy propostos e as decisões que dependem de aprovação.

## Modelo de `.conveyor/artifacts/design.md`

```markdown
---
conveyor_stage: design
business: "<nome comercial, igual ao brief.md>"
brief_updated: AAAA-MM-DD   # campo updated de cada artefato usado
brand_updated: AAAA-MM-DD
copy_updated: AAAA-MM-DD
pages: [home]               # páginas especificadas, conforme copy §2
status: aguardando-revisao  # aguardando-revisao | revisado | bloqueado
created: AAAA-MM-DD
updated: AAAA-MM-DD
---

# Design — <nome comercial>

> Status: **Herdado** (de brand/copy) · **Adaptado** (derivado de decisão aprovada) · **Proposto** (nova decisão) · **Pendente** (requer validação).
> Referências: `brand §N`, `copy §N`, `brief §N` · blocos da copy (`home.abertura`) · `V#`/`SRC-XXX` (assets inventariados) · `U#` (usuário) · `R#` (referências) · `A#` (posições de asset).

## 1. Visão geral do design

**Conceito:** <nome de trabalho> — Proposto

<Parágrafo: sensação, como é produzida, o que é distintivo, relação com brand §3, como leva à ação principal.>

**Objetivos da experiência:**
- ...

## 2. Princípios de design

1. **<princípio>** — como aparece: ... · onde: ... · exclui: ...
2. ...

## 3. Sistema visual de interface

### Tipografia
| Papel | Família / peso | Mobile | Desktop | Entrelinha | Observações | Status |
|---|---|---|---|---|---|---|
| Display | ... | ... | ... | ... | ... | Adaptado (brand §5) |
| Corpo | ... | ... | ... | ... | medida 60–75 caracteres | Adaptado |

### Cores na interface
| Uso | Cor (função do brand) | Contraste | Status |
|---|---|---|---|
| Fundo padrão | Background #XXXXXX | — | Herdado (brand §4) |
| Texto sobre fundo padrão | Text #XXXXXX | 0,0:1 | Herdado |
| Foco | ... | 0,0:1 contra fundos usados | Proposto |

### Espaçamento e proporções
- Unidade base e escala: ...
- Ritmo entre seções: ...

### Grid e larguras
| Faixa | Colunas | Medianiz | Margem lateral | Largura máxima |
|---|---|---|---|---|
| Mobile | ... | ... | ... | — |
| Desktop | ... | ... | ... | ... |

- Larguras de texto: ...
- Rupturas de grid: ...

### Componentes
- **Botão primário:** forma, proporção, tratamento; estados: hover ..., foco ..., ativo ...
- **Botão secundário / link:** ...
- **Navegação:** ...
- **Superfícies e separadores:** ...

### Tratamento de imagens
- ...

### Acessibilidade e desempenho
- ...

## 4. Especificação por página

### Página: Início (`home`)

**Objetivo:** ... (copy §2)
**Conceito de composição:** ...
**Primeiro viewport:** 1º ... · 2º ... · 3º ...

#### Cabeçalho e navegação
...

#### Seção: `home.abertura`
- **Composição:** ...
- **Hierarquia:** ...
- **CTA:** ...
- **Imagem:** A1
- **Elemento distintivo:** ...
- **Transição:** ...
- **Mobile:** ...

#### Seção: `home.servicos`
...

#### Rodapé
...

## 5. Comportamento responsivo

- **Faixas de referência:** ...
- **Hierarquia em telas pequenas:** ...
- **Navegação mobile:** ...
- **Composições que mudam de estrutura:** `<bloco>` — desktop: ... · mobile: ...
- **Imagens e direção de arte:** ...
- **Prevenção de rolagem horizontal:** ...

## 6. Interações e movimento

| Elemento | Gatilho | Comportamento | Duração | Movimento reduzido |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

**Permanece estático:** ...

## 7. Plano de assets

| ID | Finalidade | Local | Origem | Situação | Proporção / enquadramento | Tratamento | Restrições | Alternativa se ausente |
|---|---|---|---|---|---|---|---|---|
| A1 | ... | home.abertura | V2 | disponível | 4:5 mobile, 3:2 desktop | ... | ... | ... |

**Texto alternativo:** ...
**Desempenho de imagens:** ...

## 8. Referências e justificativas

### Referências
| ID | Fonte | O que foi observado | Influência | Reinterpretação |
|---|---|---|---|---|
| R1 | https://... | ... | ... | ... |

### Justificativas das principais decisões
- <decisão>: <motivo em uma ou duas frases>.

## 9. Pendências e pontos de aprovação

| ID | Tipo | Pendência | Impacto | Recomendação |
|---|---|---|---|---|
| D1 | Ajuste de copy | <bloco>: ... | ... | ... |
| D2 | Asset ausente | A3: ... | ... | alternativa: ... |
| D3 | Mudança de identidade | ... | ... | ... |
| D4 | Risco de implementação | ... | ... | ... |

### Microcopy de interface proposta
- "Menu", "Fechar", ...

### Conflitos entre artefatos
- <ou "nenhum">

## Histórico de revisões

- AAAA-MM-DD — Criação do design (conveyor-design).
```

## Checklist final

- [ ] Todo texto público vem da copy aprovada; ajustes necessários estão em Pendências.
- [ ] Nenhum selo, número, depoimento, logotipo de cliente ou outro elemento visual introduz afirmação sem linha `COPY`.
- [ ] Cores e tipografia vêm de `brand.md`; adaptações marcadas; mudanças de identidade pendentes.
- [ ] Toda posição de asset aponta para um asset inventariado ou está marcada como a obter, com alternativa.
- [ ] Referências citadas foram realmente acessadas e foram reinterpretadas, não copiadas.
- [ ] Conceito e princípios se materializam em decisões visíveis; os testes da troca, do template e do conteúdo real passaram.
- [ ] Cada página e seção da copy tem composição, hierarquia, CTA e comportamento mobile definidos quando relevantes.
- [ ] Contraste, foco visível, alvos de toque, movimento reduzido e ausência de rolagem horizontal foram considerados.
- [ ] Nenhum código, classe ou propriedade CSS; nenhuma dependência de framework.
