---
name: conveyor-review
description: Independently review a Conveyor site's current implementation against its brief and design system, producing an evidence-backed review artifact. Use for design, content, responsive, interaction, accessibility checks, or rechecking previous findings; does not implement fixes.
---

# Conveyor Review

Produce `.conveyor/generated/reviews/<REVIEW_ID>.md`. Read `.conveyor/workflow.md` and [review contract](references/review-contract.md). One invocation performs one review, not an automatic correction loop.

## Fresh-context dispatch

When this skill is invoked, delegate to a reviewer subagent with fresh context (`fork_turns: "none"` or the tool's equivalent), when supported. Pass only the project root, this skill path, brief/design paths, current site URL if known, requested scope, and optional previous review path. Do not pass implementation conversation history, the implementer's reasoning, intended findings, or claims that fixes worked. Tell the child it is the **review worker**, so it executes the inspection below without delegating recursively. Wait for its artifact, then relay its result.

The review worker reads artifacts and source itself. Implementation record metadata can establish which revision/scope was applied; its claimed success is not evidence. Do not send unrelated source snippets selected to suggest a verdict.

If fresh-context delegation is unavailable, ask the user to invoke this skill in a separate chat and explain that the skill requires independent context. A reviewer already explicitly invoked in a separate chat can execute as the worker when delegation is unavailable. Do not substitute self-review in the implementation conversation. Browser-tool fallback and fresh-context fallback are separate concerns.

## Independent inspection (review worker)

Read the brief, design JSON/rules/specimens, current source, and previous review if specified. Missing artifacts make corresponding checks unverified, not passed. Honor explicit scope and user-authorized exceptions recorded in artifacts. Allocate a new review ID, keeping prior artifacts intact. Capture the code/artifact snapshot before inspecting so conclusions are tied to the state reviewed.

Discover tools actually available. Prefer browser automation capable of navigation, computed-style inspection, interaction, and screenshots. Use computer use for visual/interaction evidence when available, without claiming computed-style checks it cannot perform. Do not install tools silently. If neither is available, perform source review, mark browser checks unverified, and recommend a concrete available route or setup for finishing them.

Use a provided running URL or discover/start the local server according to `AGENTS.md` (`astro dev --background`; manage with status/logs/stop). Do not start a server for source-only review, stop a server you did not start, or bypass project instructions. Inspect source/configuration independently even when a browser is available.

Check by default:

- **Design:** actual role-appropriate palette usage, font loading and resolved typography, spacing/container rules, components/states, and composition. Inspect computed values when possible; normalize color formats and evaluate fluid/responsive values at the tested viewport. Allowed alpha/state variants and one-off layout utilities are not automatically drift. Tokens existing in source does not prove that rendered values match them.
- **Brief/content:** required sections, factual claims, audience/action alignment, contact destinations, and declared placeholders. Identify a newly changed requirement versus an implementation mistake where provenance makes that clear.
- **Responsive/interaction:** narrow mobile and desktop, relevant breakpoint transitions, overflow/clipping, navigation, links, contact actions, and relevant interactive controls.
- **Basic accessibility:** semantics/heading structure, labels and alternative text, keyboard reachability, visible focus, contrast, and reduced-motion behavior when relevant. State the tested scope, not a comprehensive certification.
- **Code contract:** Tailwind token/utility usage, prohibited component CSS/classes, repeated UI component reuse, and inappropriate hardcoded palette/type values. Do not flag utility classes emitted by Tailwind as handwritten CSS.

Choose viewports appropriate to the design (at least narrow mobile and desktop when rendered review is possible) and record dimensions. Save useful screenshots under `.conveyor/generated/reviews/<REVIEW_ID>/` and link them from the report. Do not send messages, submit real contact forms, or trigger external side effects to prove an interaction; inspect destinations and exercise safe local behavior.

Required findings need an evidenced requirement violation or usability defect. Subjective aesthetic suggestions are advisory, with rationale. An inability to verify is coverage missing, not an invented failure. For each finding include exact location, expectation, observation, evidence, and acceptance criterion; avoid prescribing a redesign when a scoped correction suffices.

For rechecks, independently verify previous findings and inspect affected areas for regressions. Reference previous finding IDs as resolved, still-open, or unverified; do not copy the prior verdict. If code/artifacts change during inspection, disclose the mismatch and recheck affected evidence or mark it unverified.

Write the contract's artifact with `needs-fixes`, `incomplete`, or `pass` outcome. Do not change application code, brief, design, or implementation history, and do not alter earlier reviews. Return the report link, required/advisory counts, coverage gaps, and next manual action. The implementer may fix it on the user's next request.
