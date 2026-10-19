---
name: conveyor-review
description: Independently review a Conveyor site's reference and brand fidelity as well as implementation against its brief, design system, and media record. Produce evidence-backed findings with correction ownership for visual, content, media, responsive, interaction, accessibility checks or rechecks; does not implement fixes.
---

# Conveyor Review

Produce `.conveyor/generated/reviews/<REVIEW_ID>.md`. Read `.conveyor/workflow.md` and [review contract](references/review-contract.md). One invocation performs one review, not an automatic correction loop.

Review starts only as a separate user-invoked stage and requires independent context, as the workflow's Review boundary describes. Do not reinterpret an implementation request as review authorization.

## Fresh-context dispatch

When this skill is invoked, delegate to a reviewer subagent with fresh context (`fork_turns: "none"` or the tool's equivalent), when supported. Pass only the project root, this skill path, brief/design/media-record paths, canonical brand, media, and reference directories, current site URL if known, requested scope, and optional previous review path. Do not pass implementation conversation history, the implementer's reasoning, intended findings, claims that fixes worked, or source snippets selected to suggest a verdict. Tell the child it is the **review worker**, so it executes the inspection below without delegating recursively. Wait for its artifact, then relay its result. If the calling chat contains implementation history, it serves only as this dispatcher.

If fresh-context delegation is unavailable, ask the user to invoke this skill in a separate chat and explain that the skill requires independent context. A reviewer already explicitly invoked in a separate chat can execute as the worker. Do not substitute self-review in the implementation conversation. Browser-tool fallback and fresh-context fallback are separate concerns.

## Independent inspection (review worker)

Read the brief, design JSON/rules/specimens, the media record, current `.conveyor/brand/` and `.conveyor/media/` materials/guidance, original reference views, current source, and previous review if specified. Read active user adjustments and their referenced implementation entries as requirement context, as the workflow's Adjustments and revisions describes; report consequential ambiguity rather than inventing approval. Missing artifacts or unreadable reference details make corresponding checks unverified, not passed; an optional missing brand package is not itself a defect. Honor explicit scope and user-authorized exceptions recorded in artifacts, and read older artifacts as the workflow's Older artifacts describes. Allocate a new review ID, keeping prior artifacts intact. Capture the code/artifact/input snapshot before inspecting so conclusions are tied to the state reviewed.

Discover tools actually available. Prefer browser automation capable of navigation, computed-style inspection, interaction, and screenshots. Use computer use for visual/interaction evidence when available, without claiming computed-style checks it cannot perform. Do not install tools silently. If neither is available, perform source review, mark browser checks unverified, and recommend a concrete available route or setup for finishing them.

Use a provided running URL or discover/start the local server according to the project's stack and `AGENTS.md`, using any background mode or server management commands they define. Do not start a server for source-only review, stop a server you did not start, or bypass project instructions. Inspect source/configuration independently even when a browser is available.

Check by default:

- **Reference fidelity:** compare original composition/detail views with the design's stated relationships, any included examples for their labeled purpose, and the implemented site, as the workflow's Reference fidelity and Requirements and examples describe. Check hierarchy/proportions, media composition/layering, surface roles, and section rhythm. Respect brand/content adaptations and recorded exceptions. Distinguish lost reference features in the design from implementation deviations.
- **Brand:** supplied logo/variant, proportions, background legibility, explicit palette/type rules, and actual source-to-deployment mappings, following the workflow's Brand and media sources. Do not call an inferred color official or demand an unavailable optional logo. Record scope/freshness differences for newly added brand files rather than assuming they were already applied.
- **Design:** actual role-appropriate palette usage, font loading and resolved typography, spacing/container rules, components/states, and composition. Inspect computed values when possible; normalize color formats and evaluate fluid/responsive values at the tested viewport. Allowed alpha/state variants and one-off layout values are not automatically drift. Tokens existing in source does not prove that rendered values match them.
- **Palette decision:** the recorded source/selection against user or brand instructions and actual role/combination usage, as the workflow's Palette selection describes. Competing reference palettes need a recorded selection/delegation rather than an unexplained blend.
- **Media:** each placed image against its slot's role, subject, aspect, focal point, treatment, and alternative-text intent at the tested viewports; provenance and license recorded in the media record; evidence slots never filled by stock or generated imagery presented as the business; required credits or disclosures present; unfilled slots shown as declared placeholders rather than text panels. Coherence across the set and subject choice beyond the slot spec are advisory unless the design makes them required.
- **Brief/content:** required content within the declared scope, factual claims under the workflow's Facts and claims, audience/action alignment, contact destinations, and declared placeholders. Trace content and recorded structure changes against actual routes/navigation, using code and rendered evidence when available. Content outside a scoped delivery is pending broader work; broken visitor actions or missing content required for the delivered page remain findings.
- **Copy:** each in-scope content requirement's key message, voice and vocabulary with active messaging adjustments, consistent action labels, and leftover filler, classified by the workflow's Copy and messaging. Do not demand the brief's headline candidates over existing site text.
- **Responsive/interaction:** narrow mobile and desktop, relevant breakpoint transitions, overflow/clipping, navigation, links, contact actions, and relevant interactive controls.
- **Basic accessibility:** semantics/heading structure, labels and alternative text, keyboard reachability, visible focus, contrast, and reduced-motion behavior when relevant. State the tested scope, not a comprehensive certification.
- **Code contract:** the styling approach recorded in `implementation.md` and the workflow's Styling rules for it. Do not flag utility classes emitted by Tailwind as handwritten CSS. An unrecorded approach, or one that departs from the workflow's styling order without a stated reason, is a finding.

Choose viewports appropriate to the design (at least narrow mobile and desktop when rendered review is possible) and record dimensions. Save useful screenshots under `.conveyor/generated/reviews/<REVIEW_ID>/` and link them from the report. Do not send messages, submit real contact forms, or trigger external side effects to prove an interaction; inspect destinations and exercise safe local behavior.

Classify findings as the workflow's Review boundary describes. An explicitly requested reference relationship can be a requirement; a reviewer's preferred new direction cannot. Cite an explicit requirement, preserved reference relationship, or usability defect before making a finding required, and give advisory findings a rationale. Avoid prescribing a redesign when a scoped correction suffices. Keep source-to-design and design-to-site coverage separate so internal consistency cannot hide lost fidelity.

For rechecks, independently verify previous findings and inspect affected areas for regressions. Reference previous finding IDs as resolved, still-open, or unverified; do not copy the prior verdict. If code/artifacts change during inspection, disclose the mismatch and recheck affected evidence or mark it unverified.

Write the contract's artifact. Do not change application code, other stages' artifacts, or earlier reviews. Return the report link, required/advisory counts, coverage gaps, and next manual action.
