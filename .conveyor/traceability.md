# Contrato de rastreabilidade factual do Conveyor

Versão: 1

Este documento define como afirmações factuais circulam entre as etapas do Conveyor sem perder o vínculo com a evidência original. É a referência única do contrato: as skills explicam como produzi-lo ou consumi-lo, mas as definições ficam aqui.

| Quem | Papel |
|---|---|
| `conveyor-briefing` | Define fontes (`SRC`) e fatos (`FACT`) em `.conveyor/artifacts/brief.md`. |
| `conveyor-copywriting` | Consome fatos e define afirmações da copy (`COPY`) em `.conveyor/artifacts/copy.md`. |
| Demais etapas | Podem citar `SRC` e `FACT`, mas não os criam nem alteram. |

Tudo é Markdown, legível por pessoas e por agentes. Não há banco de dados nem validação automatizada: a validação é feita pelo agente, seguindo a seção 5.

Os nomes de artefatos citados aqui (`brief.md`, `copy.md`) ficam em `.conveyor/artifacts/`. A organização da pasta e as regras comuns às etapas estão em `.conveyor/workflow.md`.

## 1. Identificadores

| Prefixo | Representa | Definido em | Formato da definição |
|---|---|---|---|
| `SRC-` | Uma fonte consultada | `brief.md`, seção Fontes consultadas | linha de tabela iniciada por `\| SRC-001 \|` |
| `FACT-` | Uma afirmação factual sustentada por evidências | `brief.md`, seção Registro de fatos | título `### FACT-001 — <rótulo curto>` |
| `COPY-` | Um trecho factual do texto público do site | `copy.md`, seção Rastreabilidade | linha de tabela iniciada por `\| COPY-001 \|` |

Regras:

- Formato `PREFIXO-NNN`, com três dígitos e zeros à esquerda (`SRC-001`). Acima de 999, use quatro dígitos.
- Numeração sequencial dentro de cada arquivo. O próximo ID é o maior existente + 1.
- **Nunca renumere, reutilize ou apague um ID.** Entradas que deixam de valer são marcadas (ver abaixo), não removidas.
- **Estabilidade em revisões:** o ID se mantém enquanto representar a mesma fonte, o mesmo fato ou a mesma afirmação.
  - Mantém o ID: acrescentar evidência, corrigir a localização, mudar o status, ajustar a redação sem mudar o sentido.
  - Exige novo ID: o conteúdo da afirmação mudou (ex.: telefone novo, endereço novo, serviço diferente). O antigo recebe `Substituído por: FACT-0YY (AAAA-MM-DD)`.
  - Fonte que deixou de existir mantém o `SRC` com estado `inacessível` e a data da última verificação.
  - Afirmação removida da copy mantém a linha `COPY`, com `removido em AAAA-MM-DD` nas observações.
- IDs nunca aparecem no texto destinado à publicação.

## 2. Fontes (`SRC`)

Toda fonte consultada recebe um `SRC`, inclusive entradas do usuário e fontes inacessíveis (para registrar a limitação). Fontes descartadas por serem de outro negócio (homônimos) **não** recebem `SRC`; ficam numa lista separada de fontes descartadas.

Formato, em `brief.md`:

```markdown
| ID | Tipo | Descrição | URL ou caminho | Consulta | Data do conteúdo | Estado | Como localizar |
|---|---|---|---|---|---|---|---|
| SRC-001 | site-oficial | Site do negócio | https://... | AAAA-MM-DD | rodapé "atualizado em ..." | acessada | páginas Início, Serviços e Contato |
| SRC-002 | usuario-mensagem | Mensagem inicial do usuário | — | AAAA-MM-DD | — | acessada | primeira mensagem da sessão de briefing |
```

Campos:

- **Tipo:** `site-oficial`, `rede-oficial`, `perfil-empresa` (Google e similares), `plataforma` (marketplace, delivery, agendamento, setorial), `diretorio`, `avaliacoes`, `imprensa`, `registro-publico`, `usuario-mensagem`, `usuario-arquivo` ou `outro`.
- **Descrição:** nome ou descrição suficiente para uma pessoa reconhecer a fonte.
- **URL ou caminho:** exatamente como acessado ou fornecido. Nunca reconstruído de memória. `—` quando não se aplica.
- **Consulta:** data em que a fonte foi consultada.
- **Data do conteúdo:** quando visível (data de publicação, último post, "atualizado em"). `—` se não houver.
- **Estado:** `acessada`, `parcial` (login, bloqueio parcial, conteúdo truncado) ou `inacessível`.
- **Como localizar:** o que alguém precisa para reencontrar o material (aba, perfil, seção, nome do arquivo, data da mensagem).

**Fontes oficiais** são `site-oficial` e `rede-oficial` cuja correspondência com o negócio foi verificada, e `perfil-empresa` quando há indício de que é gerenciado pelo negócio (verificação na plataforma, link a partir de um canal oficial). Entradas do usuário (`usuario-*`) são tratadas como informação do próprio negócio ou de quem o representa.

## 3. Fatos (`FACT`)

Um `FACT` é uma afirmação factual específica, com evidências localizáveis. Crie `FACT` para o que pode aparecer no site ou influenciar decisões importantes: identificação, segmento, serviços e produtos, preços, localização e área de atendimento, horários, modalidade, contatos e canais, credenciais e registros profissionais, tempo de atuação, diferenciais declarados, evidências externas (ex.: nota agregada), situação do site atual e objetivo do site informado pelo usuário. Não crie `FACT` para detalhes sem impacto.

Formato, em `brief.md`:

```markdown
### FACT-001 — <rótulo curto>

- **Afirmação:** <frase específica e verificável>
- **Status:** confirmed | unverified | conflicting
- **Evidências:**
  - `SRC-001` — <localização precisa> — <descrição objetiva da evidência>
  - `SRC-003` — <localização precisa> — <descrição objetiva da evidência>
- **Observações:** <limitações, data do conteúdo, versão provável em caso de conflito> | —
- **Substituído por:** FACT-0YY (AAAA-MM-DD)   ← somente quando aplicável
```

### Afirmação

- Uma unidade verificável por fato. "Oferece corte e barba" pode ser um fato; serviço e horário são fatos distintos.
- Diz **exatamente** o que a evidência sustenta, nem mais nem menos.
- Alegações que o negócio faz sobre si mesmo (qualidade, experiência, tempo de atuação, especialização, resultados) são escritas como declaração: "O site oficial declara que o negócio atua há 20 anos". Assim, `confirmed` significa que a declaração existe, não que ela foi verificada de forma independente.
- Informações sensíveis ao tempo (preços, horários, promoções) indicam a data do conteúdo nas observações.

### Evidências

Cada evidência liga o fato a uma fonte com:

- **Localização precisa:** URL da publicação ou página específica, seção do documento, número da página, destaque do perfil, minuto do vídeo, ou um trecho literal curto e identificável (até cerca de 25 palavras, entre aspas).
- **Descrição objetiva:** o que a fonte mostra, sem interpretação ("Rodapé exibe '(11) 0000-0000' rotulado como WhatsApp").

Só fontes com estado `acessada` ou `parcial` (na parte acessível) podem servir de evidência. Fonte `inacessível` nunca sustenta um fato.

### Status

| Status | Critério |
|---|---|
| `confirmed` | O conteúdo consultado sustenta a afirmação inteira **e** a evidência vem de fonte oficial, de entrada do usuário ou de duas ou mais fontes independentes de terceiros que concordam. |
| `unverified` | Sustentada por uma única fonte de terceiros, ou a evidência é indireta (ex.: aparece numa foto, mas não é declarada). |
| `conflicting` | Fontes acessíveis divergem. Registre cada versão como evidência separada e, nas observações, a versão provável e o motivo, se houver. |

`confirmed` indica que a afirmação está sustentada pelo conteúdo consultado. **Não** é garantia de veracidade independente nem de que a informação continua atual.

### O que não é `FACT`

- **Inferências** do agente: ficam no texto do briefing como `Inferido (base: FACT-003, FACT-007 — <raciocínio>)`.
- **Desconhecidos:** registrados como `Desconhecido` e listados nas pendências.
- Opiniões, avaliações estéticas e recomendações.

Inferências e desconhecidos **nunca** sustentam afirmações da copy.

## 4. Afirmações da copy (`COPY`)

Todo trecho do texto público que afirma ou **implica** um fato sobre o negócio recebe um `COPY`. Exemplos: serviços, preços, local, área atendida, horários, contatos exibidos, credenciais, tempo de atuação, números, diferenciais, benefícios que dependem de um fato, notas e avaliações. "Atendemos toda a zona sul" implica área de atendimento e precisa de rastreabilidade.

Não exigem `COPY`: texto criativo ou de tom sem conteúdo factual específico, CTAs, rótulos de navegação e títulos sem afirmação factual. Mesmo assim, o canal citado por um CTA precisa corresponder a um `FACT` `confirmed`, indicado na anotação interna do CTA.

Formato, em `copy.md`:

```markdown
| ID | Página / bloco | Trecho factual | Fatos | Pendências / observações |
|---|---|---|---|---|
| COPY-001 | home / home.abertura | "Corte e barba no centro de <cidade>" | FACT-004, FACT-002 | — |
| COPY-002 | home / home.sobre | "Há 20 anos atendendo..." | FACT-009 | declaração do negócio; confirmar com o cliente (P2) |
```

- **Trecho factual:** o texto público literal, longo o suficiente para avaliar o sentido.
- **Granularidade:** uma linha por afirmação factual em cada bloco. Uma lista contínua no mesmo bloco (ex.: lista de serviços) pode ser uma única linha com todos os fatos que a sustentam. A mesma afirmação repetida em outro bloco recebe outra linha.

### Suficiência semântica

Os fatos citados precisam sustentar, juntos, **todo o significado** do trecho, não apenas palavras isoladas.

- "Corte e barba de segunda a sábado, com hora marcada" exige fatos para os serviços, para os dias **e** para o atendimento com hora marcada. Se faltar o último, reescreva ou registre pendência.
- "Há mais de 20 anos no bairro" não é sustentado por "o negócio declara atuar há 20 anos": o fato não diz que foi sempre no mesmo bairro. E "mais de" amplia o que foi declarado.
- "A barbearia mais bem avaliada da cidade" não é sustentado por uma nota alta: o fato não traz comparação.

### Uso conforme o status

| Status do fato | Uso na copy |
|---|---|
| `confirmed` | Pode ser apresentado como fato, dentro do alcance exato da afirmação. Se a afirmação for uma declaração do negócio, pode ser usada na voz do negócio, de forma literal e sem ampliar. |
| `unverified` | Nunca apresentado como confirmado. Reformule sem depender dele ou use um marcador de pendência, e registre o motivo na linha. |
| `conflicting` | Não publique o valor. Use um marcador de pendência e registre na linha. |
| com `Substituído por` | Não use. Use o fato substituto, se ele existir. |

## 5. Validação

Antes de encerrar uma etapa que cria ou consome IDs, o agente verifica:

1. **Integridade dos IDs:** todo `SRC`, `FACT` e `COPY` referenciado está definido; nenhum ID está definido duas vezes.
2. **Fontes localizáveis:** todo `FACT` tem ao menos uma evidência com `SRC` `acessada` ou `parcial`, localização precisa e descrição objetiva.
3. **Sustentação semântica:** as evidências sustentam a afirmação do `FACT` inteira; os `FACT` citados sustentam o trecho `COPY` inteiro.
4. **Status respeitado:** nada baseado em `unverified` ou `conflicting` aparece como confirmado, nem no briefing nem na copy.
5. **Cobertura:** toda afirmação factual relevante da copy tem linha `COPY`, e todo dado do briefing que pode ir para o site tem `FACT`.
6. **Sem ficção:** nenhuma fonte, URL, evidência, trecho ou ID foi criado sem correspondência real.
7. **Estabilidade:** em revisões, IDs existentes foram preservados, nenhum foi renumerado ou reutilizado, e substituições estão marcadas.

Para as verificações 1 e 7, uma busca textual ajuda. Por exemplo, compare os IDs definidos com os referenciados usando `grep -o 'FACT-[0-9]\{3,4\}'` em cada arquivo. Isso é apoio para o agente, não um sistema de validação.

Se uma verificação falhar: corrija a referência, reformule ou remova a afirmação, ou rebaixe o status, e registre a pendência. Nunca crie evidência para fazer uma verificação passar.
