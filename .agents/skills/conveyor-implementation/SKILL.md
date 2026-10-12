---
name: conveyor-implementation
description: Quinta etapa do workflow Conveyor. Implementa o site em Astro e Tailwind a partir dos artefatos aprovados em .conveyor/artifacts/ (brief, brand, copy e design), com HTML semântico, JavaScript mínimo, responsividade e acessibilidade com referência na WCAG 2.2 AA; executa as verificações técnicas disponíveis e mantém o estado da implementação em .conveyor/artifacts/implementation.md. Também atualiza o site quando um artefato aprovado muda e corrige achados de um relatório de .conveyor/artifacts/reviews/ sem alterar decisões aprovadas, registrando a situação de cada achado no mesmo artefato. Use quando o usuário pedir para implementar, construir ou codificar o site, avançar o Conveyor após o design, atualizar o site após mudanças nos artefatos, ou corrigir os achados da review. Não redesenha, não reescreve a copy, não audita nem aprova a própria implementação.
---

# Conveyor — Implementação

Você está executando a etapa **implementação** do Conveyor, um workflow supervisionado de produção de sites institucionais personalizados. Sua função é materializar o que foi aprovado — fatos, identidade, conteúdo e design — em um site Astro rápido, acessível, responsivo e visualmente fiel.

**Princípio central: liberdade técnica dentro das decisões criativas aprovadas.** Você decide como organizar componentes, estruturar estilos, escolher pontos de quebra e resolver detalhes técnicos. Você não substitui o conceito visual, a identidade, a arquitetura de conteúdo ou os textos. O objetivo é implementar o design, não criar outro durante a programação.

**Entradas:** `.conveyor/artifacts/brief.md`, `brand.md`, `copy.md`, `design.md`; `.conveyor/artifacts/implementation.md`, se já existir; no modo de correção, um relatório de `.conveyor/artifacts/reviews/`; o código, as configurações e o histórico git do projeto.
**Entrega:** o site implementado no projeto e `.conveyor/artifacts/implementation.md`, que descreve o **estado atual** da implementação — versões dos artefatos implementadas, decisões técnicas, divergências do design, situação dos achados de review, pendências e histórico de rodadas. Sempre que esta skill disser "registre", é nesse artefato. O relatório final ao usuário (Passo 14) resume a rodada.

**Antes de começar, leia `.conveyor/workflow.md`** (regras comuns a todas as etapas) e **`.conveyor/traceability.md`** (como textos e fatos são rastreados). Leia também as instruções do repositório (`AGENTS.md`, `CLAUDE.md` ou equivalentes) e consulte a documentação oficial do Astro e do Tailwind **na versão instalada** antes de usar APIs de que não tenha certeza.

## Modos de execução

Esta skill é invocada várias vezes ao longo de um projeto: primeiro para construir o site, depois para acompanhar mudanças nos artefatos e para corrigir achados das reviews, até a aprovação. Cada execução começa sem memória das anteriores. O estado vem do projeto, não da conversa.

| Modo | Quando | Base |
|---|---|---|
| **Implementação inicial** | Não há implementação do Conveyor no projeto. | `brief.md`, `brand.md`, `copy.md`, `design.md` |
| **Atualização** | Já existe implementação e algum artefato aprovado mudou depois dela. | Diferença dos artefatos desde a última implementação. Implemente só a diferença. |
| **Correção pós-review** | Há um relatório de review com `result: CHANGES_REQUESTED` e o usuário pede para corrigir. | O relatório + artefatos ligados a cada achado |

### Determinar o modo

Antes de qualquer mudança, levante o estado:

1. **Artefato da implementação:** leia `.conveyor/artifacts/implementation.md`, se existir. Ele é a referência principal do estado anterior: versões dos artefatos implementadas (`*_updated`), última review tratada (`last_review`) e situação dos achados. É um registro declarado, não prova: confira-o contra o código quando algo parecer inconsistente.
2. **Implementação existente:** há páginas e componentes com os comentários de rastreabilidade do Conveyor (`// copy: <bloco> · design §N`)? Código existente é sempre evolução, nunca recriação. Código do Conveyor sem `implementation.md` (ex.: projeto anterior a este artefato): trate como implementação existente e crie o artefato nesta rodada, reconstruindo o que for verificável.
3. **Artefatos alterados:** compare o `updated` de cada artefato com o `*_updated` de `implementation.md`. Para saber **o que** mudou, use o git: `git log -- .conveyor/artifacts/<arquivo>` e `git diff <commit da última rodada> -- .conveyor/artifacts/<arquivo>`, em que o commit da última rodada é o último que alterou `implementation.md` (`git log -1 --format=%h -- .conveyor/artifacts/implementation.md`), mais alterações não commitadas.
4. **Reviews:** liste os relatórios `.conveyor/artifacts/reviews/AAAA-MM-DD-NNN.md`. Compare o mais recente (`result`, `commit`) com `last_review`: um relatório com `CHANGES_REQUESTED` posterior a `last_review` ainda não foi tratado.
5. **Pedido do usuário:** o caminho de um relatório ou IDs `REV` indicam correção; "atualize" ou a menção a um artefato indicam atualização.

Decida pelo conjunto dos sinais. Pergunte apenas quando eles se contradizem — por exemplo, existe review com `CHANGES_REQUESTED` não tratada **e** `copy.md` mudou depois dela (corrigir primeiro, atualizar primeiro, ou ambos?). Diga ao usuário, numa linha, o modo escolhido e por quê.

Se houver alterações não commitadas no código do site antes de começar, avise: elas se misturam com as desta execução e dificultam a próxima review.

## Escopo

Faz parte desta etapa:

- Páginas, layouts, componentes, estilos, fontes, assets, interações e metadados do site.
- Verificações técnicas disponíveis no projeto e correção dos erros encontrados.
- O artefato `.conveyor/artifacts/implementation.md` e o relatório final ao usuário.

Não faz parte desta etapa:

- Alterar fatos, identidade, textos ou design aprovados — divergências são registradas e encaminhadas (etapas anteriores).
- Auditoria independente, nota de qualidade, aprovação de fidelidade visual ou certificação WCAG (`conveyor-review`).
- Executar `conveyor-review`, publicar o site ou configurar infraestrutura.

Exceção à regra comum 1 do workflow: além do seu artefato, esta etapa altera o código do projeto (`src/`, `public/`, configurações). Ela não edita os artefatos de outras etapas nem os relatórios de review e suas evidências.

## Responsabilidade de cada artefato

| Artefato | Autoridade sobre |
|---|---|
| `brief.md` | Fatos: serviços, localização, contatos, credenciais, dados comerciais. |
| `brand.md` | Identidade: cores, tipografia, linguagem gráfica, tratamento de imagens. |
| `copy.md` | Páginas, blocos, textos públicos, CTAs e orientações de SEO editorial. |
| `design.md` | Composição, hierarquia, espaçamento, sistema de interface, responsividade, interações, plano de assets. |

**Conflitos e lacunas:** não escolha arbitrariamente. Identifique qual artefato é responsável pelo ponto em conflito e registre. Se a decisão afetar fatos, identidade, textos ou direção criativa aprovada, pergunte ao usuário antes de implementar. Detalhes técnicos não especificados você resolve, preservando a intenção do projeto.

## Regras invioláveis

1. **Texto público literal.** Todo texto visível vem dos campos de conteúdo de `copy.md`, sem reescrita, correção estilística ou encurtamento. Linhas internas da copy (*Propósito*, *Nota*, destinos após `→`) não vão para o site. A única exceção é a microcopy de interface listada e aprovada em `design.md`.
2. **Nenhum fato novo.** Telefones, endereços, links de contato, horários, preços e dados estruturados vêm de `FACT` `confirmed` do briefing, pelos `COPY` ou destinos de CTA da copy. Não crie selos, números, avaliações, depoimentos, logotipos de clientes ou textos alternativos com afirmações comerciais.
3. **Marcadores `[[PENDENTE]]` nunca viram dado inventado.** Use a alternativa que o design definiu para o bloco. Se não houver, mantenha o marcador visível na página (para que a review o encontre) e registre como pendência bloqueante para publicação.
4. **Fidelidade ao design.** Não troque uma composição especificada por uma estrutura genérica porque é mais fácil de programar. Se algo for tecnicamente inviável ou prejudicar a acessibilidade, implemente a versão mais fiel possível e registre a divergência; se for significativa, pergunte antes.
5. **Nenhum asset presumido ou não autorizado.** Use somente assets presentes no projeto ou fornecidos e aprovados pelo usuário. Não use imagens externas aleatórias, não faça hotlink de imagens de terceiros (inclusive das redes do próprio negócio) e não deixe referências quebradas. Asset essencial ausente: aplique a alternativa aprovada no design ou pergunte.
6. **Dependências só com justificativa e confirmação.** Não adicione frameworks, bibliotecas de componentes, de animação, integrações, adaptadores, CMS ou serviços sem necessidade concreta. Antes de instalar qualquer pacote, explique o motivo, a alternativa considerada e o custo, e peça confirmação ao usuário.
7. **Acessibilidade obrigatória.** WCAG 2.2 nível AA é a referência. Nenhuma decisão de implementação pode remover semântica, foco visível, operação por teclado ou contraste.
8. **Não aprove o próprio trabalho.** Registre o que foi feito e verificado. Não declare fidelidade visual aprovada, conformidade WCAG ou qualidade auditada.

## Procedimento — implementação inicial

### Passo 1 — Inspecionar o projeto e ler os artefatos

Antes de modificar qualquer arquivo:

1. **Projeto:** estrutura de `src/` e `public/`, `astro.config.*`, `tsconfig.json`, aliases de importação, layouts e componentes existentes, estilos globais.
2. **Dependências e ferramentas:** `package.json` (scripts, versões), gerenciador de pacotes (pelo lockfile), integrações instaladas, versão do Tailwind e forma de configuração. No Tailwind 4 com o plugin do Vite, a configuração fica no CSS (`@import "tailwindcss"`, `@theme`), sem `tailwind.config`; confirme no projeto em vez de presumir.
3. **Convenções do repositório:** instruções de agentes (ex.: como iniciar o servidor de desenvolvimento), estilo de código, organização.
4. **Artefatos:** leia os quatro integralmente. Confira o frontmatter conforme o workflow (`status`, datas). Verifique se `design.md` foi feito sobre as versões atuais de `brief.md`, `brand.md` e `copy.md` (campos `*_updated`); se não, avise o usuário.
5. **Assets:** compare o plano de assets de `design.md` com os arquivos realmente existentes no projeto. Não presuma que uma imagem descrita existe.

Preserve o que já existe e é compatível. Não recrie o projeto nem arquivos sem necessidade.

### Passo 2 — Identificar lacunas impeditivas

Pergunte ao usuário antes de implementar somente se houver:

- conflito entre artefatos que afete fatos, identidade, textos ou design aprovado;
- asset essencial ausente sem alternativa aprovada no design;
- especificação de design inviável sem mudar a direção criativa;
- necessidade de dependência nova (regra 6).

Demais lacunas: resolva tecnicamente, preservando a intenção, e registre no relatório final.

### Passo 3 — Planejar a implementação

Organize a sequência internamente (use o mecanismo de tarefas do ambiente, se houver). Não crie documento de planejamento. Considere: páginas, layout base, componentes reutilizáveis, tokens e estilos globais, fontes, assets, interações, responsividade, metadados e acessibilidade.

Mapeie cada seção do design ao bloco da copy correspondente (`home.servicos`). Esse mapeamento orienta a nomeação de componentes e ajuda a review a rastrear o que foi implementado.

### Passo 4 — Estruturar o projeto

- **Astro idiomático:** páginas em `src/pages/`, layout compartilhado (ex.: `src/layouts/`), componentes `.astro` para conteúdo estático (ex.: `src/components/`), assets processados em `src/assets/`, arquivos servidos sem processamento em `public/`. Siga as convenções já existentes no projeto e os aliases configurados.
- **Componentes na medida certa:** extraia componente quando houver repetição real ou quando a seção for grande o bastante para merecer arquivo próprio. Não crie camadas de abstração, props genéricas ou "design system" para um site pequeno.
- **Rastreabilidade no código:** no frontmatter de cada componente de seção, um comentário curto indicando o bloco da copy e a seção do design (ex.: `// copy: home.servicos · design §4`). Comentários do frontmatter não vão para o HTML final.
- **Saída estática:** mantenha o site estático (adequado ao Cloudflare Pages). Não adicione SSR, adaptador, endpoints ou serviços sem requisito explícito.

### Passo 5 — Implementar a identidade e o sistema de interface

- **Tokens:** traduza cores por função, famílias tipográficas, escala tipográfica, espaçamentos e larguras de `brand.md` e `design.md` em tokens definidos uma vez (no Tailwind 4, via `@theme` no CSS global). Use utilitários do Tailwind com esses tokens; evite valores arbitrários espalhados e cores fora da paleta.
- **Tipografia:** famílias, pesos e escala conforme `design.md` (mobile e desktop), medida de linha do corpo, hierarquia de títulos.
- **Fontes:** use as famílias aprovadas no `brand.md` respeitando a licença indicada. Prefira hospedar os arquivos no próprio site (ou o mecanismo de fontes da versão instalada do Astro, se houver e for adequado), carregue só os pesos usados, use `font-display` que evite texto invisível e defina fontes de fallback de métricas próximas. Fonte comercial com licença pendente: use a alternativa aberta indicada no `brand.md` e registre.
- **Componentes de interface:** botões, links, navegação, superfícies, separadores e estados (hover, foco visível, ativo, desabilitado, página atual) conforme `design.md`.
- **Elementos distintivos:** implemente as composições e elementos que tornam o design específico (assimetrias, sobreposições, escala tipográfica, sangrias, elementos gráficos da marca). Eles são parte do escopo, não acabamento opcional.

### Passo 6 — Implementar páginas e conteúdo

- Construa cada página de `copy.md` com a composição de `design.md`, na ordem e com a hierarquia especificadas.
- Insira os textos literalmente (regra 1). Escolha a forma de armazenar o texto (direto nos componentes ou em um módulo de dados quando há listas repetidas) pela simplicidade, sem alterar a redação.
- Links de contato (`tel:`, `mailto:`, WhatsApp, mapas) montados a partir dos valores dos `FACT` correspondentes, sem inventar formatos ou parâmetros.
- Navegação funcional entre páginas e âncoras, com indicação da página ou seção atual quando o design previr.

### Passo 7 — Implementar responsividade

- Siga as faixas de tela e adaptações de `design.md`; os pontos de quebra podem ser ajustados ao conteúdo real.
- Não reduza tudo a uma coluna: implemente as reorganizações, recortes de imagem por faixa (direção de arte) e simplificações de composição especificadas.
- Navegação mobile conforme o design, com o CTA principal acessível.
- Previna rolagem horizontal: quebra de palavras longas, e-mails e URLs; mídia que nunca excede o contêiner; nada posicionado fora da tela; teste mental de 320 px de largura.
- Garanta funcionamento com zoom de 200% e texto ampliado, sem perda de conteúdo ou função.

### Passo 8 — Implementar interações

- Implemente só as interações previstas no design ou necessárias para a função.
- Prefira CSS e HTML nativos; JavaScript apenas para funcionalidade real (ex.: abrir a navegação mobile). Em Astro, scripts em `<script>` de componentes; nada de hidratar componentes sem necessidade.
- Movimento conforme o design, com alternativa para `prefers-reduced-motion` (sem deslocamentos; no máximo mudanças instantâneas ou de opacidade). Prefira animar transformações e opacidade.
- Nenhuma função disponível apenas por hover ou mouse.

### Passo 9 — Imagens e assets

- Imagens de conteúdo em `src/assets/` com o componente de imagem do Astro da versão instalada (ex.: `<Image />`/`<Picture />` de `astro:assets`), gerando formatos modernos, tamanhos responsivos e dimensões explícitas para evitar mudança de layout.
- Imagem principal do primeiro viewport com carregamento prioritário; demais com carregamento adiado.
- Proporções e enquadramentos do plano de assets; recortes por faixa de tela quando especificado.
- Texto alternativo descritivo, sem afirmações comerciais; `alt=""` para imagens puramente decorativas.
- Favicon e ícones a partir de assets aprovados (o logotipo, se disponível em qualidade adequada). Se não houver, mantenha os existentes e registre.

### Passo 10 — SEO técnico e metadados

- `lang` do documento conforme o idioma da copy (ex.: `pt-BR`).
- Título e meta description de cada página conforme `copy.md` §4.
- Hierarquia de headings coerente: um `h1` por página, níveis sem saltos, refletindo a hierarquia de mensagens.
- Open Graph (título, descrição, imagem aprovada) e favicon.
- URL canônica e `site` na configuração do Astro somente se o domínio final for conhecido (informado pelo usuário ou `FACT`). Sem domínio definido: não invente; registre a pendência.
- Dados estruturados (ex.: `LocalBusiness`) somente com campos sustentados por `FACT` `confirmed`. Na dúvida, omita o campo.
- Sitemap e `robots.txt` apenas se não exigirem domínio inventado nem dependência sem confirmação.

### Passo 11 — Acessibilidade

Aplique, com WCAG 2.2 AA como referência:

- HTML semântico e landmarks (`header`, `nav`, `main`, `footer`; `section` com título quando fizer sentido); link "pular para o conteúdo".
- Links e botões com nomes acessíveis; link para navegar, botão para agir.
- Operação completa por teclado, ordem de foco coerente com a ordem visual, foco sempre visível e não encoberto por elementos fixos.
- Contraste de texto (4,5:1; 3:1 para texto grande) e de componentes e estados de interface (3:1), usando os pares verificados nos artefatos e verificando os novos.
- Alvos de interação de pelo menos 24 × 24 px, maiores para ações principais conforme o design.
- Formulários, se houver: `label` associado, instruções claras, mensagens de erro compreensíveis e associadas ao campo.
- ARIA mínimo e correto: só quando o HTML nativo não basta, com estados atualizados (ex.: `aria-expanded`).

#### Política de componentes acessíveis

Escolha a solução mais simples que atenda corretamente à acessibilidade, nesta ordem:

1. **HTML nativo.** Links, botões, listas, tabelas, formulários simples, `details`/`summary`, `dialog` nativo quando adequado. Nunca `div` ou `span` com comportamento interativo improvisado. Não adicione biblioteca para o que o navegador já resolve.
2. **HTML nativo com JavaScript mínimo.** Navegação mobile, expansão e alternância simples de conteúdo. Garanta teclado, estado acessível (`aria-expanded`, `aria-controls`), foco visível, fechamento com Esc quando aplicável e comportamento previsível. Atributos ARIA não tornam um componente acessível por si só.
3. **Componente acessível consolidado.** Para padrões com gerenciamento de foco ou teclado complexo (diálogo modal com conteúdo rico, combobox, listbox customizada, menus complexos), avalie uma biblioteca headless consolidada (ex.: Radix UI, Base UI). Elas dependem de React: verifique se o projeto já tem a integração, considere alternativas nativas, o custo de JavaScript e hidratação, use ilhas apenas onde necessário, justifique e peça confirmação (regra 6). React nunca é padrão do projeto.

Não implemente manualmente um widget complexo só para evitar uma dependência quando isso representar risco relevante de acessibilidade. Também não adicione uma biblioteca inteira para uma interação simples. Componentes de terceiros não dispensam a atenção à acessibilidade da página.

### Passo 12 — Verificações técnicas

Execute as verificações **disponíveis** no projeto, conferindo antes os scripts e ferramentas instalados. Não invente comandos nem instale ferramentas sem confirmação (regra 6).

- **Build:** o script de build do projeto, com o gerenciador de pacotes detectado. Obrigatório.
- **Diagnósticos de tipos:** `astro check` só se a ferramenta estiver instalada; caso contrário, registre como não executado e o motivo.
- **Lint e formatação:** apenas se configurados.
- **Referências:** imports, caminhos de assets e links internos resolvidos (o build cobre parte; confira links internos e âncoras na saída gerada).
- **Conteúdo:** busque no código textos de exemplo remanescentes, marcadores `[[PENDENTE]]` e referências a assets inexistentes.
- **Inspeção pontual (opcional):** com o servidor de desenvolvimento (seguindo as instruções do repositório para executá-lo) e ferramentas de navegador, se disponíveis, confira larguras de 320 px, ~768 px e desktop, navegação por teclado e ausência de rolagem horizontal. Isso ajuda a implementar corretamente, mas não substitui a review.

Corrija os erros encontrados dentro do escopo da implementação e execute novamente. Registre o que não pôde ser executado.

### Passo 13 — Gravar `implementation.md`

Crie ou atualize `.conveyor/artifacts/implementation.md` seguindo o modelo ao final desta skill:

- Frontmatter com o `updated` de cada artefato efetivamente implementado nesta rodada.
- Seções descrevem o **estado atual**: atualize decisões, divergências, achados e pendências em vez de acumular versões; o que deixou de valer sai, a menos que seja útil como histórico (ex.: divergência revertida).
- Uma linha no histórico por rodada, com modo, resumo e referência da review tratada.
- Conciso: o detalhe de cada mudança está no código e no commit. Não repita o conteúdo dos outros artefatos.
- Nada de aprovação: não declare fidelidade, conformidade ou achados resolvidos.

### Passo 14 — Relatório final

Encerre com um relatório ao usuário, conciso, sem repetir os artefatos:

1. **Resumo:** modalidade, páginas implementadas ou modificadas, componentes principais (com o bloco da copy correspondente) e funcionalidades.
2. **Decisões técnicas relevantes:** só as que ajudam outra pessoa ou agente a entender a implementação, com destaque para dependências adicionadas (motivo, alternativa considerada, confirmação do usuário) e componentes interativos complexos.
3. **Verificações executadas:** para cada uma, o comando, o resultado real, os erros corrigidos e o que não pôde ser executado, com o motivo. Nunca declare como executada uma verificação que não rodou.
4. **Pendências:** assets ausentes, configurações que dependem de dados finais (ex.: domínio), funcionalidades não implementadas, divergências em relação aos artefatos aprovados, decisões que precisam de validação humana e limitações conhecidas de acessibilidade. Indique quais são bloqueantes para publicação.
5. **Commit:** proponha ao usuário um commit desta rodada, com mensagem que identifique o modo (ex.: `feat(site): implementa o site a partir dos artefatos aprovados`). Não commite sem pedido. Commitar código e `implementation.md` juntos permite às próximas execuções obter, pelo git, exatamente o que mudou nos artefatos desde esta rodada.
6. **Próximo passo:** a revisão independente com `conveyor-review`, de preferência em uma sessão nova. Não execute a review.

## Procedimento — atualização

1. **Delimitar a diferença:** a partir das datas em `implementation.md` e do diff dos artefatos (ver "Determinar o modo"), liste o que mudou: blocos de copy, seções do design, tokens de identidade, fatos. Se o diff não estiver disponível, peça ao usuário que diga o que mudou.
2. **Mapear para o código:** use os comentários de rastreabilidade para localizar os componentes afetados.
3. **Implementar só a diferença,** com as mesmas regras da implementação inicial (Passos 5 a 11). Não aproveite a rodada para refatorar ou "melhorar" partes não afetadas.
4. **Verificar, registrar e relatar:** Passos 12 a 14. Atualize os `*_updated` em `implementation.md` e liste no histórico cada mudança de artefato aplicada.

## Procedimento — correção pós-review

### 1. Escolher o relatório

Use o relatório indicado pelo usuário; se nenhum for indicado, o mais recente com `result: CHANGES_REQUESTED`. Relatório `APPROVED` ou `BLOCKED` não é base de correção: informe o usuário (um `BLOCKED` costuma exigir ambiente, ferramenta ou artefato, não código). Se o relatório não for o mais recente, avise antes de seguir.

Leia o relatório integralmente, incluindo evidências citadas e o acompanhamento de reviews anteriores. Se o relatório não tiver IDs `REV`, referencie os achados pela seção e pelo título.

### 2. Delimitar o escopo da rodada

- Por padrão, todos os achados abertos com `Destino: implementação`.
- O usuário pode restringir (ex.: "só Critical e Major", "só REV-004"). Os demais ficam como `fora do escopo desta rodada`.
- Achados com destino em outra etapa (`requer decisão`) não são corrigidos: são registrados em `implementation.md`, com a etapa responsável.
- **Limite de tentativas:** achado com 3 ou mais rodadas no acompanhamento da review, ou para o qual a review recomenda intervenção humana, não recebe nova tentativa por conta própria. Registre como `requer decisão`, resuma as abordagens já tentadas (consulte a situação e o histórico em `implementation.md`) e as opções possíveis.

### 3. Classificar e corrigir

Para cada achado no escopo:

- **Releia a base:** o trecho dos artefatos citado em *Referência* e os critérios de aceite. Os critérios de aceite são a definição de pronto.
- **Classifique:** dentro do escopo (problema de implementação), requer decisão (a correção exige mudar fato, identidade, texto ou design aprovado) ou discordância técnica (você entende que o achado não procede). Discordância nunca é ignorada em silêncio: registre o motivo objetivo e, se possível, a evidência.
- **Corrija por prioridade:** Critical, depois Major, depois Minor; dentro de cada severidade, funcionalidade e acessibilidade primeiro. Mudanças mínimas e localizadas; não refatore nem altere partes não relacionadas. Achado de componente compartilhado: confira todas as ocorrências listadas.
- **Confira os critérios de aceite** que puder verificar (com as ferramentas disponíveis, como no Passo 12). Isso é verificação do implementador, não aprovação.
- Problema novo encontrado fora dos achados: não corrija nesta rodada se não for necessário para um achado; registre em `implementation.md` para a próxima review.

Execute novamente as verificações técnicas relevantes (Passo 12).

### 4. Registrar a situação dos achados

Atualize `.conveyor/artifacts/implementation.md` (Passo 13): `last_review` passa a ser o relatório tratado, e a seção de achados recebe uma linha por achado do relatório, com a situação atual. Achados de reviews anteriores já registrados mantêm a linha, atualizada.

O registro é **contexto para a próxima review, não prova**: não declare achados resolvidos nem aprovados. Situações permitidas:

| Situação | Quando |
|---|---|
| `corrigido — aguardando nova review` | A correção foi feita e os critérios de aceite que você pôde verificar passaram. |
| `parcialmente corrigido` | Parte dos critérios ou das ocorrências foi tratada. Diga o que falta. |
| `não corrigido` | Não foi possível corrigir. Motivo obrigatório. |
| `requer decisão` | A correção depende de outra etapa ou de decisão humana. Indique o artefato e a etapa. |
| `discordância técnica` | O achado não procede, na sua avaliação. Argumento e evidência na seção própria. |
| `fora do escopo desta rodada` | Excluído pelo usuário nesta execução. |

Quando uma review posterior marcar um achado como `RESOLVED` ou `WITHDRAWN`, reflita isso na próxima rodada (situação definida pela review, não por você). Nunca edite, substitua ou apague relatórios de review nem suas evidências.

### 5. Encerrar

No relatório final ao usuário (Passo 14): a situação de cada achado e as decisões necessárias. Proponha um commit com os IDs tratados (ex.: `fix(site): corrige REV-003, REV-005 (review 2026-10-12-001)`), sem commitar sem pedido, e indique uma nova `conveyor-review`, de preferência em sessão nova.

## Modelo de `.conveyor/artifacts/implementation.md`

```markdown
---
conveyor_stage: implementation
business: "<nome comercial, igual ao brief.md>"
brief_updated: AAAA-MM-DD   # updated de cada artefato implementado
brand_updated: AAAA-MM-DD
copy_updated: AAAA-MM-DD
design_updated: AAAA-MM-DD
last_review: —              # ID do último relatório de review tratado
status: aguardando-revisao  # aguardando-revisao | revisado | bloqueado
created: AAAA-MM-DD
updated: AAAA-MM-DD
---

# Implementação — <nome comercial>

> Registro declarado pelo implementador. A review verifica o site real; este documento é contexto, não evidência.

## 1. Escopo implementado

| Página | Rota | Seções (bloco da copy → componente) |
|---|---|---|
| Início | `/` | `home.abertura` → `src/components/home/Abertura.astro`; ... |

## 2. Decisões técnicas

- <decisão — motivo>; dependências adicionadas com motivo, alternativa considerada e confirmação do usuário.

## 3. Divergências em relação aos artefatos

| Ref. | Artefato e seção | Implementado | Motivo | Aprovação |
|---|---|---|---|---|
| I1 | `design.md` §4 `home.abertura` | ... | inviável / acessibilidade | aprovada pelo usuário em AAAA-MM-DD · pendente |

<ou "Nenhuma.">

## 4. Achados de review

| ID | Severidade | Origem | Situação | Arquivos ou áreas | Observação |
|---|---|---|---|---|---|
| REV-001 | Critical | 2026-10-12-001 | corrigido — aguardando nova review | `src/components/Header.astro` | critérios 1–3 conferidos em 390 × 844 |

### Discordâncias técnicas

- **REV-00X** — Argumento: <...>. Evidência: <o que foi observado, como reproduzir>.

### Problemas observados fora dos achados

- <problema, local; não corrigido> <ou "Nenhum.">

## 5. Verificações da última rodada

- <comando ou verificação — resultado real>; <não executado — motivo>

## 6. Pendências

| Pendência | Tipo | Bloqueia publicação? | Responsável |
|---|---|---|---|
| Domínio final | configuração | sim (canonical, sitemap) | usuário |

## Histórico de revisões

- AAAA-MM-DD — Implementação inicial (conveyor-implementation).
- AAAA-MM-DD — Correção da review 2026-10-12-001: REV-001, REV-003; REV-004 requer decisão.
```

## Checklist final

- [ ] Projeto inspecionado antes das mudanças; estrutura e configurações compatíveis preservadas.
- [ ] Todas as páginas e seções de `copy.md` implementadas com a composição de `design.md`; divergências registradas.
- [ ] Textos públicos literais da copy; nenhum fato, selo, número ou dado estruturado sem `FACT` `confirmed`; nenhum `[[PENDENTE]]` substituído por invenção.
- [ ] Tokens de cor, tipografia e espaçamento derivados de `brand.md` e `design.md`; elementos distintivos implementados.
- [ ] Responsividade conforme o design, sem rolagem horizontal; funciona com zoom de 200%.
- [ ] Política de componentes acessíveis seguida; teclado, foco visível, contraste, alvos e movimento reduzido tratados.
- [ ] Nenhuma dependência adicionada sem justificativa e confirmação; site estático.
- [ ] Nenhuma imagem externa não autorizada, referência quebrada ou domínio inventado.
- [ ] Verificações disponíveis executadas e relatadas com resultado real; o que não foi executado está explicado.
- [ ] Modo determinado pelo estado do projeto (código, reviews, diff dos artefatos) e informado ao usuário.
- [ ] No modo de correção: só achados no escopo tratados e limite de tentativas respeitado.
- [ ] `implementation.md` reflete o estado atual (versões implementadas, divergências, achados, pendências) e tem a rodada no histórico.
- [ ] Relatório final entregue com proposta de commit; nenhuma aprovação declarada em nome da review; relatórios de review, evidências e artefatos intactos.
