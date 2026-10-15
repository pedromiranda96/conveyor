---
name: conveyor-brief
description: Create or revise Conveyor's business and website brief from supplied information. Use for project intake, content planning, or changes to audience, services, goals, and content requirements.
---

# Conveyor Brief

Turn business information into `.conveyor/generated/brief.md`, useful to an agent with no conversation history. Own business requirements and content structure, not visual design or implementation.

Read the project's `.conveyor/workflow.md` and [brief contract](references/brief-contract.md). Resolve the project root from its repository/project files and follow its `AGENTS.md`.

## Intake and decisions

Read an existing brief before drafting. Accept information supplied by the user or another agent, but preserve provenance and uncertainties rather than treating an agent's assertions as verified facts. Reuse established language, audience, and business decisions unless the request changes them.

Discover supplied materials in `.conveyor/brand/`, including optional `brand.md` or existing guides. Record actual canonical paths, logo variants, fonts, photos, explicit usage rules, and consequential gaps. Inspect relevant visuals; do not infer official colors from a logo without labeling that inference as a proposal. An incomplete or absent brand package does not block a useful brief. Keep this inventory separate from inspiration in `.conveyor/references/` and media selected/generated later. Do not reorganize or overwrite supplied originals.

Identify the audience, primary visitor action, business offer, credible supporting information, and content needed to make that action understandable. Record content requirements independently of pages or routes; implementation determines and evolves site structure. Preserve explicit user constraints, but do not require a page-count decision during intake. Do not force an unrelated template's sections onto the business.
Draft with labeled assumptions. Ask only about consequential gaps, such as an unclear business identity, contradictory service information, or an unknown destination for the primary contact action. Make useful independent progress while answers are pending. Optional missing details become open questions, not a mandatory intake questionnaire.

Do not research the business unless the user requests research. A business name, URL, or Instagram handle alone is not that request. When research is requested, use available tools, cite the actual sources and access date, and report access limitations or conflicting information. Do not infer private profile content from snippets or manufacture facts when a source is inaccessible.

Write proposed copy when useful for a pitch, clearly distinguished from facts. Never invent testimonials, achievements, credentials, opening hours, addresses, prices, or contact information. Use an explicit unresolved value where factual content is missing. Missing imagery follows the shared asset-choice policy; asset sourcing is not implied by permission to research facts.

## Write or revise

Write the contract's sections at `.conveyor/generated/brief.md`; increment the brief revision only when its content materially changes. Keep accepted information and stable section IDs. For a revision, record what changed and which content/design decisions are affected without automatically regenerating downstream artifacts.

Check that every planned section serves the audience or primary action, factual claims have provenance, and consequential unknowns are explicit. Finish with the artifact link, the material decisions made, and any answers still needed. Do not invoke design or implementation unless requested.
