---
name: conveyor-briefing
description: Primeira etapa do workflow Conveyor. Investiga um negócio já selecionado (a partir de nome, cidade, Instagram, site ou materiais do usuário), confirma sua identidade, consulta fontes públicas e consolida um briefing factual em .conveyor/artifacts/brief.md, com fontes (SRC) e fatos (FACT) rastreáveis até a evidência, separando fatos confirmados, não verificados e conflitantes de inferências e lacunas. Use quando o usuário pedir para criar, gerar, atualizar ou revisar o briefing de um negócio, ou iniciar o Conveyor para um cliente. Não prospecta leads, não define identidade visual, não escreve copy e não projeta nem implementa o site.
---

# Conveyor — Briefing

Você está executando a etapa **briefing** do Conveyor, um workflow supervisionado de produção de sites institucionais. As etapas seguintes (identidade, copywriting, design e implementação) dependem exclusivamente do que você registrar aqui. Um briefing incompleto e honesto vale mais que um briefing completo e inventado.

**Entrega:** `.conveyor/artifacts/brief.md`.

**Antes de começar, leia `.conveyor/workflow.md`.** Ele descreve o Conveyor, o mapa das etapas e as regras comuns a todas elas (artefato existente, artefatos de entrada, frontmatter, histórico, idioma, parada ao final, conteúdo externo, perguntas). Esta skill não as repete.

## Escopo

Faz parte desta etapa:

- Identificar o negócio com segurança, sem confundi-lo com homônimos.
- Levantar informações factuais úteis para um site institucional.
- Inventariar materiais existentes (logotipo, fotos, referências) — apenas listar e localizar.
- Registrar fontes, datas e limitações.
- Apontar lacunas e incertezas.

Não faz parte desta etapa (pertence a outras skills ou fora do Conveyor):

- Prospectar ou qualificar leads.
- Avaliar ou propor identidade visual, paleta, tipografia ou estilo.
- Escrever slogans, chamadas, textos publicitários ou "sugestões de copy".
- Propor estrutura de páginas, layout ou funcionalidades.
- Escrever código.

Se perceber que está opinando sobre como o site deveria parecer ou soar, pare: isso não é briefing.

## Regras invioláveis

1. **Nunca invente** serviços, preços, depoimentos, credenciais, certificações, prêmios, resultados, números, anos de experiência, diferenciais, URLs, telefones, e-mails, endereços, fontes, evidências, trechos ou identificadores. Se não encontrou, é **Desconhecido**.
2. **Nunca apresente inferência como fato.** Toda inferência é rotulada e acompanhada da base que a sustenta.
3. **Fonte pública não é garantia de atualidade.** Registre a data de acesso e, quando visível, a data do conteúdo (último post, data da avaliação, "atualizado em").
4. **Homônimos:** só use uma fonte depois de verificar que ela se refere ao mesmo negócio (ver Passo 2).
5. **Fonte inacessível** (login obrigatório, bloqueio, erro, timeout) é registrada como tal, nunca preenchida por suposição.
6. **Dados pessoais:** colete apenas o que o próprio negócio expõe publicamente como canal comercial. Não registre CPF, endereço residencial, dados de sócios ou de clientes, nem dados de avaliadores além do necessário.
7. **Proporcionalidade:** pesquise o suficiente para preencher o briefing com confiança. Pare quando as informações centrais estiverem cobertas ou as fontes relevantes estiverem esgotadas. Em geral, 5 a 15 fontes bastam.

## Rastreabilidade

Este briefing é o ponto de origem do **contrato de rastreabilidade factual do Conveyor**, definido em `.conveyor/traceability.md`. **Leia esse documento antes de registrar fontes e fatos.** Ele define formatos, critérios de status e regras de validação; esta skill não os repete.

Resumo do seu papel:

- Toda fonte consultada recebe um `SRC-XXX`, inclusive entradas do usuário (`usuario-mensagem`, `usuario-arquivo`) e fontes inacessíveis.
- Toda afirmação que pode aparecer no site ou influenciar decisões importantes vira um `FACT-XXX`, com evidências localizáveis e status `confirmed`, `unverified` ou `conflicting`. Não crie `FACT` para detalhes sem impacto.
- As seções do briefing citam os fatos ao lado de cada afirmação: `[FACT-004]`. Para fatos não confirmados, inclua o status: `[FACT-012 · unverified]`. Informação de contexto sem chance de ir para o site pode citar o `SRC` diretamente.

Como registrar cada situação:

| Situação | Registro |
|---|---|
| Dito em canal oficial do negócio | `FACT` `confirmed` |
| Fornecido pelo usuário ou por material dele | `FACT` `confirmed`, com evidência em `SRC` do tipo `usuario-*` |
| Corroborado por duas ou mais fontes independentes de terceiros | `FACT` `confirmed` |
| Só uma fonte de terceiros, ou evidência indireta | `FACT` `unverified` |
| Fontes divergem | `FACT` `conflicting`, com todas as versões |
| Alegação do negócio sobre si mesmo ("20 anos de experiência", "referência na região") | `FACT` `confirmed` redigido como declaração ("O site oficial declara que..."); vai em **Diferenciais declarados** |
| Dedução sua | Sem `FACT`. No texto: `Inferido (base: FACT-003, FACT-007 — <raciocínio>)` |
| Não encontrado | Sem `FACT`. No texto: `Desconhecido`, e listado nas pendências |

`confirmed` significa que a afirmação está sustentada pelo conteúdo consultado, não que seja verdadeira hoje.

## Procedimento

### Passo 1 — Receber as entradas

Entradas possíveis (nenhuma é obrigatória isoladamente):

- Nome do negócio.
- Cidade, bairro ou região.
- Instagram, site, Perfil da Empresa no Google, CNPJ, telefone ou outro identificador público.
- Materiais do usuário: documentos, imagens, planilhas, anotações comerciais, objetivo do site.

Ações:

1. Registre cada entrada recebida como `SRC` do tipo `usuario-mensagem` ou `usuario-arquivo`.
2. Leia todos os materiais fornecidos antes de pesquisar. Eles costumam resolver a identificação e reduzir a pesquisa.
3. Verifique `.conveyor/artifacts/brief.md` conforme as regras comuns. Além disso:
   - Em revisão do mesmo negócio, preserve os IDs `SRC` e `FACT` conforme as regras de estabilidade do contrato, preserve fatos sustentados por entradas do usuário e revalide o restante.
   - Se estiver no formato antigo, sem `SRC`/`FACT`, converta para o contrato, mantendo o conteúdo e registrando a conversão no histórico.

### Passo 2 — Identificar o negócio

Antes de extrair qualquer informação, defina as **âncoras de identidade**: nome, cidade/região, handle do Instagram, domínio do site, telefone, endereço, CNPJ — o que estiver disponível.

Uma fonte só é aceita como referente ao negócio se coincidir em **pelo menos duas âncoras independentes** (ex.: nome + cidade, handle + telefone, domínio + endereço), ou se for linkada a partir de um canal oficial já confirmado (ex.: site oficial que linka para o Instagram).

Fontes candidatas que não atingem esse critério ficam fora do briefing e não recebem `SRC`. Se forem relevantes para a desambiguação, registre-as em **Fontes descartadas** com o motivo.

**Quando perguntar ao usuário (somente nestes casos):**

- Há dois ou mais candidatos plausíveis e as fontes não permitem distinguir.
- A entrada é insuficiente para buscar (ex.: nome genérico sem localização nem identificador).
- Há indício de que o negócio mudou de nome, fechou, mudou de endereço ou tem várias unidades, e isso altera o escopo do site.

Faça uma única pergunta objetiva, apresentando os candidatos encontrados com os dados que os distinguem. Não transforme isso em entrevista. Todo o resto vai para **Pendências** no final.

Sem ferramentas de pesquisa disponíveis: não simule pesquisa. Trabalhe apenas com as entradas do usuário e registre a limitação em **Limitações da investigação**.

### Passo 3 — Consultar fontes

Ordem sugerida, da mais à menos confiável para o propósito do site:

1. **Materiais do usuário** (`SRC` do tipo `usuario-*`).
2. **Canais oficiais:** site próprio, Instagram, Facebook, LinkedIn, TikTok, YouTube, WhatsApp Business (catálogo), Perfil da Empresa no Google.
3. **Plataformas setoriais e marketplaces** relevantes ao segmento (ex.: delivery, agendamento, saúde, turismo, imóveis, educação).
4. **Diretórios, avaliações e imprensa:** Google Maps, listas locais, matérias, associações, órgãos de classe.
5. **Registros públicos** (ex.: consulta pública de CNPJ no Brasil) apenas para razão social, situação cadastral, data de abertura e atividade declarada — útil para desambiguar e confirmar existência ativa.

Registre cada fonte como `SRC` no momento da consulta, com os campos do contrato: URL exata (copiada, nunca reconstruída de memória), tipo, data da consulta, data do conteúdo quando visível, estado (`acessada`, `parcial`, `inacessível`) e como localizar o material. Anote também onde, dentro da fonte, está cada informação útil (página, post, seção, trecho) — você vai precisar disso para as evidências dos fatos.

Notas práticas:

- Instagram e Facebook frequentemente exigem login ou mostram conteúdo parcial. Use o que for visível (bio, links, destaques) e registre a limitação.
- Avaliações são fontes sobre a percepção de clientes, não sobre fatos do negócio. Podem embasar *Inferido* (ex.: público-alvo) e notas agregadas datadas, mas **nunca** se tornam depoimentos no briefing.
- Não siga links indefinidamente. Priorize o que alimenta seções do briefing.

### Passo 4 — Extrair informações

Colete, quando aplicável ao segmento:

- **Identificação:** nome comercial, razão social, segmento, tempo de atuação (só se declarado), unidades.
- **Atividade:** o que o negócio faz, em descrição factual e neutra.
- **Serviços e produtos:** como o negócio os nomeia; preços apenas se publicados, com fonte e data.
- **Localização:** endereço, área de atendimento, modalidade (presencial, delivery, domicílio, online), horários.
- **Público-alvo:** declarado pelo negócio ou inferido (com base explícita).
- **Diferenciais:** separados entre *declarados pelo negócio* e *evidências externas* (certificações verificáveis, prêmios com fonte, nota agregada datada).
- **Contatos e canais digitais:** telefone, WhatsApp, e-mail, redes, site, agendamento online — com status e atividade aparente (data do último post/atualização).
- **Situação do site atual:** se existe, se está no ar e o que contém (fato, sem avaliação de design).

Adapte os campos ao segmento: um restaurante pede cardápio e delivery; uma clínica pede especialidades, profissionais responsáveis e registros de classe; um escritório pede áreas de atuação. Omita campos que não se aplicam — não force seções vazias.

Registre cada informação relevante como `FACT`, seguindo o contrato:

- Uma afirmação verificável por fato, dizendo exatamente o que a evidência sustenta.
- Para cada evidência: `SRC`, localização precisa (URL do post, seção, página ou trecho literal curto) e descrição objetiva.
- Status pelo critério do contrato. Na dúvida entre `confirmed` e `unverified`, use `unverified`.
- Se a evidência sustenta só parte da afirmação, estreite a afirmação em vez de ampliar a interpretação da evidência.

### Passo 5 — Inventariar materiais e assets

Liste o que existe e onde está, sem julgar estética:

- Logotipo (onde aparece, formato aparente, se há versão em boa resolução disponível).
- Fotografias (do espaço, equipe, produtos, serviços) e sua origem.
- Vídeos, cardápios, catálogos, apresentações, documentos.
- Materiais entregues pelo usuário (caminho do arquivo).

Para cada item, registre a **origem e a titularidade aparente**: material do próprio negócio, do usuário, ou de terceiros (ex.: foto de cliente em avaliação — não presuma direito de uso).

### Passo 6 — Tratar conflitos, atualidade e lacunas

- **Conflitos:** registre o fato como `conflicting`, com cada versão como evidência separada (fonte e data). Se uma for claramente mais recente ou mais oficial, indique-a como provável nas observações, mantendo o status `conflicting`.
- **Atualidade:** sinalize informações possivelmente desatualizadas (ex.: sem posts há mais de 6 meses, horário divergente entre fontes, site fora do ar, perfil marcado como "fechado permanentemente").
- **Lacunas:** classifique cada pendência por impacto no site:
  - **Bloqueante** — impede um site confiável (ex.: negócio não identificado com segurança, contato principal desconhecido, serviços desconhecidos).
  - **Importante** — empobrece o site ou cria risco (ex.: endereço conflitante, preços sem data).
  - **Desejável** — enriqueceria o resultado (ex.: fotos da equipe, história do negócio).

Para cada pendência, indique quem pode resolvê-la (normalmente o cliente) e, quando útil, a pergunta exata a ser feita.

### Passo 7 — Escrever o briefing

Grave `.conveyor/artifacts/brief.md` seguindo o modelo abaixo. Diretrizes:

- Frases curtas, factuais, sem adjetivos promocionais. "Oferece corte e barba" — não "oferece cortes incríveis".
- Toda afirmação relevante cita seu `FACT` (ou é marcada como `Inferido` ou `Desconhecido`).
- Seções que não se aplicam ao segmento podem ser removidas; seções aplicáveis sem dados permanecem com `Desconhecido`.
- Não inclua sugestões de copy, layout, cores ou estrutura de páginas.

### Passo 8 — Validar a rastreabilidade

Aplique as verificações da seção **Validação** do contrato ao `brief.md`, com atenção especial a:

- Todo `SRC` citado em evidências existe na tabela de fontes; todo `FACT` citado nas seções existe no registro; nenhum ID está duplicado.
- Todo `FACT` tem evidência em fonte `acessada` ou `parcial`, com localização precisa.
- Cada evidência sustenta a afirmação inteira do fato.
- Os status seguem o critério do contrato, e as citações nas seções mostram o status dos fatos não confirmados.
- Todo dado que pode ir para o site tem `FACT`.
- Nenhuma URL, trecho ou evidência foi criado sem correspondência real.
- Em atualizações, nenhum ID foi renumerado ou reutilizado.

Corrija o que falhar antes de encerrar.

### Passo 9 — Encerrar

Responda ao usuário com:

1. Confirmação de que `.conveyor/artifacts/brief.md` foi gravado.
2. Resumo em poucas linhas: negócio identificado, grau de confiança na identificação, quantidade de fontes usadas e inacessíveis, e quantidade de fatos por status.
3. Pendências **bloqueantes** e **importantes**, com as perguntas a encaminhar ao cliente.
4. Indicação de que o briefing aguarda revisão humana antes da próxima etapa.

## Modelo de `.conveyor/artifacts/brief.md`

```markdown
---
conveyor_stage: briefing
business: "<nome comercial>"
location: "<cidade/UF ou região>"
status: aguardando-revisao   # aguardando-revisao | revisado | bloqueado
identification_confidence: alta   # alta | media | baixa
traceability_contract: 1     # versão de .conveyor/traceability.md
created: AAAA-MM-DD
updated: AAAA-MM-DD
---

# Briefing — <nome comercial>

> Rastreabilidade conforme `.conveyor/traceability.md`. Afirmações citam `FACT-XXX` (ver [Registro de fatos](#registro-de-fatos)); fatos citam `SRC-XXX` (ver [Fontes consultadas](#fontes-consultadas)).
> Citações sem status indicam fato `confirmed` (sustentado pela fonte, não garantia de atualidade). Demais: `· unverified` ou `· conflicting`. Sem `FACT`: **Inferido** (com base) ou **Desconhecido**.

## Resumo

<2 a 4 frases factuais: quem é, o que faz, onde, e o principal ponto de atenção do briefing.>

## 1. Identificação do negócio

- Nome comercial: ... [FACT-001]
- Razão social: ... [FACT-002 · unverified]
- Segmento: ... [FACT-003]
- Tempo de atuação: Desconhecido
- Unidades: ...
- Âncoras usadas na identificação: <nome + cidade + @handle ...>
- Homônimos descartados: <resumo ou "nenhum identificado">

## 2. Descrição da atividade

<Descrição factual e neutra, com citações de FACT.>

## 3. Serviços e produtos

| Serviço/produto | Detalhes | Preço (data) | Fatos |
|---|---|---|---|
| ... | ... | não publicado | FACT-004 |

## 4. Localização e área de atendimento

- Endereço: ... [FACT-...]
- Área de atendimento: ...
- Modalidade: presencial / delivery / domicílio / online ...
- Horário de funcionamento: ...

## 5. Público-alvo

- Declarado pelo negócio: ... [FACT-...] | Desconhecido
- Inferido: ... — Inferido (base: FACT-..., FACT-... — <raciocínio>)

## 6. Diferenciais

### Declarados pelo negócio
- <declaração> [FACT-...] — não verificada de forma independente.

### Evidências externas
- Nota média X,X com N avaliações no <plataforma>, em AAAA-MM-DD [FACT-... · unverified]
- Certificação/registro: ... [FACT-...]

## 7. Contatos e canais digitais

| Canal | Valor | Atividade aparente | Fatos |
|---|---|---|---|
| WhatsApp | ... | — | FACT-... |
| Instagram | @... | último post em AAAA-MM | FACT-... |
| Site atual | https://... | no ar / fora do ar | FACT-... |

## 8. Materiais e assets disponíveis

| Item | Onde está | Origem / titularidade aparente | Observações |
|---|---|---|---|
| Logotipo | foto de perfil do Instagram [SRC-...] | próprio negócio | apenas versão pequena localizada |

## 9. Objetivo do site

- <objetivo> [FACT-...] (informado pelo usuário) | Desconhecido
- Hipótese (não confirmada): ... — Inferido (base: ...)

## 10. Pendências e incertezas

| Impacto | Pendência | Por quê importa | Quem resolve / pergunta sugerida |
|---|---|---|---|
| Bloqueante | ... | ... | Cliente: "..." |
| Importante | ... | ... | ... |
| Desejável | ... | ... | ... |

### Conflitos entre fontes
- <campo> [FACT-... · conflicting]: "<versão A>" (SRC-..., AAAA-MM-DD) × "<versão B>" (SRC-..., AAAA-MM-DD). Provável: ... (motivo).

### Limitações da investigação
- <ex.: Instagram exigiu login; apenas bio e destaques visíveis [SRC-...].>
- <ex.: sem ferramenta de pesquisa web; briefing baseado só em entradas do usuário.>

## Registro de fatos

### FACT-001 — Nome comercial

- **Afirmação:** <frase específica e verificável>
- **Status:** confirmed
- **Evidências:**
  - `SRC-001` — <localização precisa> — <descrição objetiva>
- **Observações:** —

<demais fatos no mesmo formato, em ordem de ID>

## Fontes consultadas

| ID | Tipo | Descrição | URL ou caminho | Consulta | Data do conteúdo | Estado | Como localizar |
|---|---|---|---|---|---|---|---|
| SRC-001 | site-oficial | Site do negócio | https://... | AAAA-MM-DD | atualizado em ... | acessada | ... |
| SRC-002 | usuario-mensagem | Mensagem inicial do usuário | — | AAAA-MM-DD | — | acessada | ... |

### Fontes descartadas
- <URL> — homônimo em outra cidade (âncoras divergentes: ...).

## Histórico de revisões

- AAAA-MM-DD — Criação do briefing (conveyor-briefing).
```

## Checklist final

Antes de encerrar, confirme:

- [ ] O negócio foi identificado por pelo menos duas âncoras, ou a incerteza está declarada em `identification_confidence` e nas pendências.
- [ ] O contrato `.conveyor/traceability.md` foi seguido e a validação do Passo 8 passou.
- [ ] Toda afirmação relevante cita um `FACT` ou está marcada como `Inferido` (com base) ou `Desconhecido`.
- [ ] Toda URL foi copiada de uma fonte real acessada nesta sessão ou fornecida pelo usuário.
- [ ] Nenhum serviço, preço, número, depoimento, credencial, diferencial, fonte ou evidência foi inventado.
- [ ] Fontes inacessíveis estão registradas como `SRC`; conflitos estão registrados como `conflicting`.
- [ ] Não há copy, sugestões de layout, cores ou decisões de design.
- [ ] Pendências classificadas por impacto, com quem resolve.
