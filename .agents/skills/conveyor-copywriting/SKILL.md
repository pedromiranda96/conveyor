---
name: conveyor-copywriting
description: Terceira etapa do workflow Conveyor. Transforma os fatos verificados de .conveyor/artifacts/brief.md, com o tom orientado por .conveyor/artifacts/brand.md quando existir, em estratégia de comunicação, arquitetura de conteúdo e copy completa e pronta para implementação, gravadas em .conveyor/artifacts/copy.md, com cada afirmação factual (COPY) rastreada até os fatos (FACT) do briefing, diretrizes de SEO editorial e pendências explícitas. Use quando o usuário pedir para escrever a copy, os textos ou o conteúdo do site, definir mensagem e tom de voz, ou avançar o Conveyor após a identidade. Não inventa fatos, não investiga o negócio do zero, não define layout, cores ou tipografia e não implementa código.
---

# Conveyor — Copywriting

Você está executando a etapa **copywriting** do Conveyor, um workflow supervisionado de produção de sites institucionais personalizados. Sua função é transformar informações verificadas em uma narrativa que faça o visitante entender rapidamente o que o negócio oferece, para quem, por que vale a pena e o que fazer em seguida.

O texto precisa parecer escrito para **este** negócio. Se um parágrafo continuar verdadeiro trocando o nome do negócio pelo de um concorrente, ele ainda não está pronto.

**Entrada obrigatória:** `.conveyor/artifacts/brief.md` (`conveyor-briefing`) — fonte de verdade para fatos.
**Entrada complementar:** `.conveyor/artifacts/brand.md` (`conveyor-identity`) — personalidade e tom, nunca evidência de fatos.
**Entrega:** `.conveyor/artifacts/copy.md`.

**Antes de começar, leia `.conveyor/workflow.md`.** Ele descreve o Conveyor, o mapa das etapas e as regras comuns a todas elas (artefato existente, artefatos de entrada, frontmatter, histórico, idioma, parada ao final, conteúdo externo, perguntas). Esta skill não as repete.

## Escopo

Faz parte desta etapa:

- Estratégia de comunicação: objetivo, público, mensagem central, proposta de valor, tom de voz.
- Arquitetura de conteúdo: páginas, objetivo de cada uma, blocos de conteúdo e hierarquia das mensagens.
- Copy completa: títulos, textos de apoio, descrições de serviços, CTAs, navegação, microcopy, perguntas frequentes, títulos de página e meta descriptions.
- Revisão factual de todo o texto contra o briefing.
- Registro de pendências e decisões que dependem de aprovação.

Não faz parte desta etapa (pertence a outras skills):

- Investigar o negócio ou completar o briefing (`conveyor-briefing`).
- Redefinir identidade visual, paleta ou tipografia (`conveyor-identity`).
- Definir layout, grids, componentes, composição, wireframes ou ordem visual de elementos (`conveyor-design`).
- Escrever HTML, Astro, CSS, Tailwind ou qualquer código (`conveyor-implementation`).

A arquitetura de conteúdo diz **o que** cada página comunica e em que **ordem de importância**. **Como** isso aparece na tela é decisão do design.

## Regras invioláveis

1. **Nunca invente** serviços, produtos, preços, condições comerciais, tempo de atuação, número de clientes, certificações, formações, credenciais, depoimentos, avaliações, prêmios, resultados, garantias, promessas de desempenho ou diferenciais.
2. **Não promova o status de uma informação.** Fato `unverified` ou `conflicting`, inferência ou hipótese do briefing não vira afirmação definitiva no texto. Siga a seção de rastreabilidade abaixo.
3. **Sem superlativos e comparativos sem prova.** "Referência na região", "os melhores profissionais", "especialistas reconhecidos", "líder", "número 1" só com evidência externa registrada no briefing. Mesmo assim, prefira o fato específico ao adjetivo.
4. **Lacuna não se preenche com invenção.** Diante de informação ausente, escolha nesta ordem: redação segura sem o dado → reformular ou fundir o bloco → omitir o bloco → marcador de pendência.
5. **Não edite `brief.md` nem `brand.md`** para justificar textos, e não crie `SRC` ou `FACT`. Divergências são registradas em `copy.md`.
6. **Não faça nova investigação.** Você pode reler canais oficiais já listados no briefing para captar a *voz* atual do negócio, nunca para extrair fatos novos. Fato novo relevante vira pendência para o briefing.
7. **CTA só para canal confirmado.** Botões e chamadas apontam apenas para canais de contato registrados como `FACT` `confirmed` no briefing.

## Rastreabilidade

A copy consome o **contrato de rastreabilidade factual do Conveyor**, definido em `.conveyor/traceability.md`. **Leia esse documento antes de escrever.** Ele define os formatos de `FACT` e `COPY`, a suficiência semântica, o uso por status e as regras de validação; esta skill não os repete.

Resumo do seu papel:

- A única evidência válida para uma afirmação factual da copy é um `FACT` do `brief.md`. Inferências, desconhecidos, o `brand.md` e o seu conhecimento geral não sustentam afirmações.
- Todo trecho do texto público que afirma ou implica um fato sobre o negócio recebe um `COPY-XXX` na seção **Rastreabilidade** de `copy.md`, com página/bloco, trecho literal e os `FACT` que o sustentam.
- Os fatos citados precisam sustentar **todo** o significado do trecho, não apenas algumas palavras.
- IDs nunca aparecem no texto público. Texto criativo sem conteúdo factual específico, CTAs e rótulos de navegação não precisam de `COPY`.

Uso conforme o fato:

| Fato no briefing | Uso no texto público |
|---|---|
| `confirmed` | Pode ser afirmado, dentro do alcance exato da afirmação do fato. Se o fato for sustentado só por entrada do usuário e for dado sensível (preço, credencial, número), registre confirmação na revisão. |
| `confirmed`, redigido como declaração do negócio (ex.: "o site declara atuar há 20 anos") | Pode ser usado na voz do negócio, de forma literal e sem ampliar ("há 20 anos", não "há mais de 20 anos"). Números e tempo de atuação entram em Pendências para confirmação do cliente. Superlativos declarados não são usados (regra 3). |
| `unverified` | Nunca apresentado como confirmado. Use redação que não dependa do dado ou um marcador de pendência. |
| `conflicting` | Não publique o valor. Use marcador de pendência. |
| com `Substituído por` | Não use; use o fato substituto. |
| Inferido (sem `FACT`) | Nunca aparece como fato. Pode orientar a estratégia (ex.: público provável define o tom), registrada como hipótese. |
| Desconhecido (sem `FACT`) | Não escreva sobre. Omita, reformule ou use marcador de pendência se o dado for essencial. |

Avaliações e notas agregadas do briefing **não viram depoimentos**. Não crie citações de clientes. Uma nota agregada só pode ser citada se for um `FACT` `confirmed` com data, e entra em Pendências para confirmação de atualidade.

## Segmentos regulamentados

Em atividades com regras de publicidade profissional, escreva de forma informativa e sóbria, e registre em Pendências que o texto precisa de validação do responsável técnico. Referências brasileiras a considerar (confirme a versão vigente; elas mudam):

- **Medicina:** Resolução CFM nº 2.336/2023. Em geral exige identificação do médico com CRM e, para especialidade, RQE; veda promessa de resultado e sensacionalismo.
- **Odontologia, psicologia, nutrição, fisioterapia, estética e outras profissões de saúde:** normas do respectivo conselho (CFO, CFP, CFN, COFFITO etc.).
- **Advocacia:** Provimento OAB nº 205/2021. Publicidade informativa, sem captação de clientela, mercantilização ou promessa de resultado.
- **Finanças, investimentos, seguros:** normas de CVM, Banco Central e SUSEP; sem promessa de rentabilidade.
- **Alimentos, suplementos, cosméticos:** sem alegações terapêuticas não autorizadas (ANVISA).
- **Todos os segmentos:** Código de Defesa do Consumidor — nada de publicidade enganosa ou abusiva.

Em caso de dúvida: menos alegação, mais informação. Nunca afirme cura, resultado garantido, ausência de riscos ou "antes e depois" implícito.

## Procedimento

### Passo 1 — Ler os artefatos e verificar a base

1. Leia `.conveyor/artifacts/brief.md` integralmente. Ele é obrigatório.
   - **Ausente ou vazio:** pare e recomende executar `conveyor-briefing`.
   - **`identification_confidence: baixa` ou `status: bloqueado`:** avise o usuário e só prossiga com a confirmação dele.
   - **Sem registro de fatos (`FACT`), em formato anterior ao contrato:** não há como rastrear a copy. Recomende atualizar o briefing com `conveyor-briefing` e só prossiga se o usuário pedir, registrando que a rastreabilidade ficou incompleta.
   - **Sem nenhum serviço/produto nem contato com `FACT` `confirmed`:** não há base para um site. Apresente as pendências bloqueantes do briefing e pergunte como seguir.
2. Leia `.conveyor/artifacts/brand.md`, se existir. Aproveite:
   - atributos de personalidade ("isto, não aquilo");
   - conceito da direção visual e o que deve ser preservado;
   - restrições e cuidados que afetem a comunicação.
   - Se estiver ausente, derive o tom do briefing e marque o tom de voz como decisão a aprovar.
   - Atenção: `brand.md` não é fonte de fatos comerciais. Se ele mencionar algo factual que não está no briefing, ignore para a copy e registre a divergência.
3. Registre como `U#` preferências de comunicação, referências de linguagem e restrições editoriais informadas pelo usuário nesta etapa. `U#` orienta escolhas editoriais, mas **não sustenta afirmações factuais**. Se o usuário trouxer um fato novo (ex.: um serviço não listado, um horário), ele só pode ir para o texto depois de registrado no briefing como `FACT`. Registre em Pendências e sugira atualizar o briefing com `conveyor-briefing`.
4. Verifique `.conveyor/artifacts/copy.md` conforme as regras comuns. Em revisão do mesmo negócio, preserve os IDs `COPY` conforme as regras de estabilidade do contrato e, se o `brief.md` mudou desde a última versão (compare `brief_updated`), revalide todas as linhas `COPY` contra os fatos atuais, inclusive fatos substituídos.

**Quando perguntar ao usuário:** somente se a falta de informação comprometer uma decisão essencial (ex.: briefing sem base, como acima; o objetivo do site muda radicalmente a arquitetura e não há como inferir com segurança). Faça uma pergunta objetiva. Todo o resto vai para Pendências. Detalhes secundários não bloqueiam a etapa.

### Passo 2 — Entender o negócio

Antes de escrever, responda para si, com base no briefing:

- O que o negócio faz, concretamente? Qual é a oferta principal e quais são as secundárias?
- Quem é o público conhecido (declarado) e qual é a hipótese de público (inferida)?
- Que problema ou desejo leva alguém a procurar este negócio?
- O que é comprovadamente específico dele (localização, modalidade, especialidade, história, método, diferenciais com evidência)?
- Qual é o objetivo do site (informado) ou o objetivo provável (hipótese, a validar)?
- Qual é a ação desejada do visitante e por qual canal confirmado ela acontece?

Se não houver nenhum diferencial comprovado, **não fabrique um**. A especificidade pode vir de fatos simples e verdadeiros: o bairro, os serviços exatos, o modo de atendimento, os horários, o processo.

### Passo 3 — Definir a estratégia de comunicação

Defina e registre:

- **Objetivo principal da comunicação** e objetivos secundários.
- **Público:** conhecido (com `FACT`) e hipóteses (rotuladas, com a base).
- **Mensagem central:** uma frase interna (não é slogan) que resume o que o visitante deve entender.
- **Proposta de valor:** o que o visitante ganha, sustentado por fatos do briefing.
- **Benefícios sustentados:** cada um ligado aos `FACT` que o sustentam.
- **Abordagem narrativa:** o fio condutor escolhido e por quê (ex.: começar pelo problema do cliente, pela oferta direta, pelo lugar, pelo processo, pela pessoa por trás do negócio). Escolha pelo negócio, não por fórmula.

### Passo 4 — Definir o tom de voz

Traduza os atributos de personalidade do `brand.md` (ou o contexto do briefing) em regras práticas de escrita:

- **Dimensões:** formalidade, proximidade, energia, grau técnico — cada uma com uma frase de calibração.
- **Tratamento:** "você", "o senhor/a senhora", "tu" ou impessoal, coerente com público e região.
- **Vocabulário:** termos que o negócio e o público usam (preferir os termos do próprio negócio para nomear serviços); termos a evitar.
- **Exemplos curtos:** um par "assim / não assim" para cada dimensão.

Se o negócio já tem uma voz reconhecível nos canais oficiais (bio, legendas, materiais do usuário), considere preservá-la, ajustando clareza e correção.

### Passo 5 — Planejar a arquitetura de conteúdo

- **Página única ou múltiplas páginas:** decida pela quantidade de conteúdo verificado e pela complexidade da oferta, não por hábito. Pouca informação confirmada pede página única. Vários serviços com conteúdo próprio, públicos distintos ou necessidade de SEO por serviço podem justificar páginas separadas.
- Para cada página: objetivo, público prioritário, ação esperada e lista de blocos.
- Para cada bloco: identificador estável (`pagina.bloco`, ex.: `home.servicos`), propósito, mensagem principal e prioridade (1 = essencial, 2 = importante, 3 = complementar).
- **Todo bloco precisa ter razão de existir e conteúdo real.** Não inclua depoimentos, números, equipe, FAQ ou "por que nos escolher" só porque sites costumam ter. Sem material, sem bloco.
- Inclua navegação (rótulos) e conteúdo de rodapé quando necessários.

### Passo 6 — Escrever a copy

Escreva todo o texto público, bloco a bloco, pronto para uso.

**Princípios:**

- Clareza antes de criatividade. Um título interessante que não diz o que o negócio faz falhou.
- Especificidade: nomes reais dos serviços, lugar real, processo real. Fato concreto vence adjetivo.
- Benefício com lastro: todo benefício decorre de um fato do briefing.
- Cada bloco tem uma função; não repita a mesma mensagem em seções diferentes.
- Varie ritmo e extensão conforme a necessidade. Sem limite artificial de palavras e sem encher.

**Evite** (salvo justificativa concreta):

- Clichês: "transformando sonhos em realidade", "excelência em cada detalhe", "soluções inovadoras", "qualidade e compromisso", "sua satisfação é nossa prioridade", "atendimento diferenciado", "paixão pelo que fazemos", "seja bem-vindo ao nosso site", "venha nos conhecer", "muito mais que X: uma experiência".
- Padrões de texto genérico de IA: tríades de adjetivos, frases "não é apenas X, é Y", perguntas retóricas em série, abertura com "No mundo atual...", exclamações em excesso, metáforas grandiosas.
- Jargão interno que o público não usa.

**CTAs:**

- Use verbos concretos ligados ao canal real e à ação real: "Agendar pelo WhatsApp", "Ligar agora", "Ver o cardápio", "Como chegar".
- Para cada CTA, registre na anotação interna (após `→`) o canal de destino e o `FACT` `confirmed` desse canal. CTAs não recebem `COPY`, mas o canal precisa existir como fato.
- Hierarquia: um CTA primário por página ou contexto, e secundários quando houver outra ação legítima.

**Marcadores de pendência no texto:** quando um trecho essencial depende de dado ausente, use exatamente `[[PENDENTE: <descrição curta> — P#]]`. O formato é fixo para que as próximas etapas possam detectá-lo. Use o mínimo possível; prefira redação que funcione sem o dado.

### Passo 7 — SEO editorial

- Defina o tema principal de cada página.
- Liste termos relevantes **extraídos do briefing**: nomes dos serviços, segmento, cidade e bairro confirmados, modalidade de atendimento. Não invente localidades, serviços ou volumes de busca.
- Proponha título de página (aprox. 50–60 caracteres) e meta description (aprox. 140–160 caracteres) para cada página, factuais e sem clichês.
- Organização semântica: um título principal por página, hierarquia de títulos que espelhe a hierarquia de mensagens, rótulos de link descritivos.
- Use os termos de forma natural. Nunca repita palavras-chave artificialmente ou crie texto só para SEO.

### Passo 8 — Revisão factual e rastreabilidade

Releia toda a copy, bloco a bloco, e identifique **cada trecho que afirma ou implica um fato** sobre o negócio (serviço, preço, local, área atendida, horário, contato exibido, credencial, número, tempo de atuação, diferencial, benefício que depende de fato, nota). Para cada um:

1. Atribua um `COPY-XXX` (em revisões, mantenha o ID da mesma afirmação) e registre página/bloco e o trecho literal.
2. Liste os `FACT` que o sustentam.
3. Verifique se os fatos, juntos, sustentam **todo** o significado do trecho, inclusive qualificadores como "mais de", "todos", "sempre", "único", "toda a região".
4. Verifique se o status de cada fato permite o uso feito (tabela da seção Rastreabilidade).
5. Se faltar evidência: reformule até o trecho caber no que os fatos dizem, ou remova, ou use um marcador de pendência — e registre na coluna de pendências.

Depois, aplique as verificações da seção **Validação** do contrato à copy:

- Todo `FACT` citado existe no `brief.md` atual e não está marcado com `Substituído por`; nenhum `COPY` está duplicado.
- Nenhum trecho baseado em fato `unverified` ou `conflicting` aparece como confirmado.
- Toda afirmação factual relevante do texto público tem linha `COPY` (cobertura). Releia o texto procurando afirmações implícitas.
- Nenhum ID aparece no texto público.
- Nenhuma afirmação se apoia em inferência, desconhecido, `brand.md` ou `U#`.

Depois, aplique os testes de qualidade:

- **Teste da troca:** trocando o nome por um concorrente, o texto continua verdadeiro? Se sim, especifique.
- **Teste do "e daí?":** cada benefício responde por que isso importa para o visitante?
- **Teste da prova:** cada afirmação tem lastro rastreável?
- **Teste da leitura em voz alta:** soa como uma pessoa do negócio falaria, no tom definido?
- **Teste da ação:** em qualquer ponto, o visitante sabe qual é o próximo passo?

### Passo 9 — Escrever `copy.md`

Grave `.conveyor/artifacts/copy.md` seguindo o modelo abaixo. Diretrizes:

- Separe com rigor o **texto público** (campos de conteúdo) das **notas internas** (propósito, notas, destino dos CTAs). A convenção está no topo do modelo.
- Não inclua instruções visuais (cores, tamanhos, posições, componentes, imagens específicas). Se um bloco depende de uma imagem para fazer sentido, apenas anote em "Nota" que tipo de conteúdo visual ele pressupõe.
- Não use sintaxe de framework (JSX, Astro, HTML).

### Passo 10 — Encerrar

Responda ao usuário com:

1. Confirmação de que `.conveyor/artifacts/copy.md` foi gravado.
2. Estrutura recomendada (página única ou páginas) e a mensagem central em uma frase.
3. Quantidade de marcadores `[[PENDENTE]]` no texto e as pendências bloqueantes ou importantes.
4. Decisões editoriais que precisam de aprovação (tom, objetivo presumido, uso de declarações do negócio).
5. Indicação de que a copy aguarda revisão humana antes de `conveyor-design`.

## Modelo de `.conveyor/artifacts/copy.md`

```markdown
---
conveyor_stage: copywriting
business: "<nome comercial, igual ao brief.md>"
brief_updated: AAAA-MM-DD   # campo updated do brief.md usado
brand_updated: AAAA-MM-DD   # campo updated do brand.md usado, ou "ausente"
language: pt-BR
site_structure: pagina-unica   # pagina-unica | multipagina
status: aguardando-revisao     # aguardando-revisao | revisado | bloqueado
pending_markers: 0             # quantidade de [[PENDENTE]] no texto
traceability_contract: 1       # versão de .conveyor/traceability.md
created: AAAA-MM-DD
updated: AAAA-MM-DD
---

# Copy — <nome comercial>

> **Convenção.** Em cada bloco, apenas os campos de conteúdo em negrito (ex.: **Título**, **Texto**, **CTA**) são texto público, e o valor entre aspas ou o parágrafo seguinte é o texto final. Linhas iniciadas por *Propósito* e *Nota*, e o que vem após `→` nos CTAs, são internos e não vão para o site.
> Trechos `[[PENDENTE: ... — P#]]` dependem de informação ainda não confirmada (ver seção 5).
> Rastreabilidade conforme `.conveyor/traceability.md`: `FACT-XXX` são fatos do `brief.md`; `COPY-XXX` são as afirmações factuais desta copy (ver seção 6); `U#` são entradas editoriais do usuário nesta etapa.

## 1. Estratégia de comunicação

- **Objetivo principal:** ... [FACT-...] | Hipótese (a validar)
- **Objetivos secundários:** ...
- **Público conhecido:** ... [FACT-...]
- **Hipóteses de público:** ... (base: inferência do briefing, FACT-...)
- **Mensagem central:** ...
- **Proposta de valor:** ...
- **Benefícios sustentados:**
  - <benefício> — decorre de <fato> [FACT-...]
- **Abordagem narrativa:** ... (por quê: ...)

### Tom de voz

- Formalidade: ... — assim: "..." / não assim: "..."
- Proximidade: ...
- Energia: ...
- Grau técnico: ...
- Tratamento: ...
- Vocabulário a usar: ...
- Vocabulário a evitar: ...
- Base: atributos do brand.md (...) | contexto do briefing (brand.md ausente)

## 2. Arquitetura de conteúdo

**Estrutura:** página única | multipágina — justificativa: ...

| Página | Objetivo | Ação esperada | Blocos (em ordem de prioridade de mensagem) |
|---|---|---|---|
| Início | ... | ... | home.abertura (1), home.servicos (1), ... |

**Navegação:** "...", "...", "..."

Blocos considerados e descartados:
- <bloco> — motivo (ex.: sem depoimentos verificáveis).

## 3. Copy por página

### Página: Início (`home`)

#### `home.abertura` — prioridade 1
*Propósito:* ...

**Título:** "..."
**Texto:** "..."
**CTA primário:** "..." → WhatsApp [FACT-...]
**CTA secundário:** "..." → ...

#### `home.servicos` — prioridade 1
*Propósito:* ...

**Título:** "..."
**Introdução:** "..."
**Itens:**
- **Nome:** "..." — **Descrição:** "..."
- ...

#### `home.perguntas` — prioridade 3
**Título:** "..."
- **Pergunta:** "..." — **Resposta:** "..."

#### `global.rodape`
**Texto:** "..."
**Contato:** ...

*Nota:* <observação editorial, ex.: bloco pressupõe fotos do espaço.>

## 4. Diretrizes de SEO editorial

| Página | Tema principal | Termos relevantes (do briefing) | Título da página | Meta description |
|---|---|---|---|---|
| Início | ... | ... | "..." | "..." |

**Organização semântica:** ...
**Recomendações de linguagem:** ...

## 5. Pendências e validações

| ID | Impacto | Pendência | Onde aparece | Como resolver |
|---|---|---|---|---|
| P1 | Bloqueante | ... | home.abertura | Cliente: "..." |
| P2 | Importante | ... | ... | ... |
| P3 | Desejável | ... | ... | ... |

### Decisões editoriais a aprovar
- ...

### Divergências entre artefatos
- <ou "nenhuma">

### Conteúdos não produzidos
- <bloco ou página> — motivo.

## 6. Rastreabilidade

| ID | Página / bloco | Trecho factual | Fatos | Pendências / observações |
|---|---|---|---|---|
| COPY-001 | home / home.abertura | "..." | FACT-..., FACT-... | — |
| COPY-002 | home / home.servicos | "<lista de serviços>" | FACT-..., FACT-..., FACT-... | — |
| COPY-003 | home / home.sobre | "..." | FACT-... | declaração do negócio; confirmar com o cliente (P2) |

## Histórico de revisões

- AAAA-MM-DD — Criação da copy (conveyor-copywriting).
```

## Checklist final

Antes de encerrar, confirme:

- [ ] O contrato `.conveyor/traceability.md` foi seguido e a validação do Passo 8 passou.
- [ ] Toda afirmação factual do texto público tem linha `COPY`, sustentada em todo o seu significado por `FACT` existentes, com status que permite o uso feito.
- [ ] Nenhum ID aparece no texto público.
- [ ] Nenhum depoimento, número, credencial, prêmio, preço ou diferencial foi inventado ou ampliado.
- [ ] Nenhum superlativo ou comparativo sem evidência externa.
- [ ] Todos os CTAs apontam para canais com `FACT` `confirmed`.
- [ ] Cada bloco tem propósito e conteúdo real; nenhum bloco existe só por convenção.
- [ ] Sem clichês da lista e sem padrões de texto genérico; o teste da troca passou.
- [ ] Tom de voz coerente com o `brand.md` (ou marcado para aprovação, se ausente).
- [ ] Segmentos regulamentados sinalizados para validação profissional.
- [ ] Marcadores `[[PENDENTE]]` no formato exato, contados em `pending_markers` e listados na seção 5.
- [ ] Nenhuma instrução visual, de layout ou código; `brief.md` e `brand.md` não foram modificados.
