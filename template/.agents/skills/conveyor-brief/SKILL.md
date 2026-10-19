---
name: conveyor-brief
description: Create or revise Conveyor's business and website brief from supplied information. Use for project intake, content planning, messaging, or changes to audience, services, goals, voice, and content requirements.
---

# Conveyor Brief

Turn business information into `.conveyor/generated/brief.md`, useful to an agent with no conversation history. Own business requirements and content structure, not visual design or implementation.

Read the project's `.conveyor/workflow.md` and [brief contract](references/brief-contract.md). Resolve the project root from its repository/project files and follow its `AGENTS.md`.

## Intake and decisions

Read an existing brief before drafting. Accept information supplied by the user or another agent, but preserve provenance and uncertainties rather than treating an agent's assertions as verified facts. Reuse established language, audience, and business decisions unless the request changes them.

Discover supplied materials in `.conveyor/brand/` and `.conveyor/media/`, including optional `brand.md`, `media.md`, or existing guides, following the workflow's Brand and media sources. Inspect relevant visuals and record actual canonical paths, logo variants, fonts, images and what they are known to show, explicit usage rules, and consequential gaps. An incomplete or absent brand package does not block a useful brief. Keep this inventory separate from inspiration in `.conveyor/references/`.

Identify the audience, primary visitor action, business offer, credible supporting information, and content needed to make that action understandable. Record content requirements independently of pages or routes; implementation determines and evolves site structure. Preserve explicit user constraints, but do not require a page-count decision during intake. Do not force an unrelated template's sections onto the business.

Draft with labeled assumptions. Ask only about consequential gaps, such as an unclear business identity, contradictory service information, or an unknown destination for the primary contact action. Make useful independent progress while answers are pending. Optional missing details become open questions, not a mandatory intake questionnaire.

Research only when the workflow's Facts and claims allows it. When research is requested, use available tools, cite the actual sources and access date, and report access limitations or conflicting information. Do not infer private profile content from snippets or manufacture facts when a source is inaccessible.

Write the contract's messaging so implementation can write persuasive copy without conversation history, following the workflow's Copy and messaging. Ground every line in recorded facts and keep candidates distinguished from facts. Record an imagery choice the user volunteers, as the workflow's Imagery describes; do not ask for one or source images.

## Write or revise

Write the contract's sections at `.conveyor/generated/brief.md`; increment the brief revision only when its content materially changes. Keep accepted information and stable section IDs. For a revision, record what changed and which content/design decisions are affected without regenerating downstream artifacts. Incorporate active messaging adjustments from `.conveyor/generated/implementation.md` as the workflow's Copy and messaging describes.

Check that every planned section serves the audience or primary action, factual claims have provenance, key messages are grounded in recorded facts, and consequential unknowns are explicit. Finish with the artifact link, the material decisions made, and any answers still needed.
