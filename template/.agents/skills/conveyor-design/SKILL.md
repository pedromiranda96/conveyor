---
name: conveyor-design
description: Establish or reconsider Conveyor's visual direction in an HTML design system from a brief, supplied brand materials, and visual references. Define reusable principles, tokens, component guidance, and image slots for initial and future implementation.
---

# Conveyor Design

Own the visual contract at `.conveyor/generated/design/design-system.html`. The result must be useful as human-readable design documentation and explicit instructions for a fresh media, implementation, or review agent. Page mockups are optional, not the artifact's organizing purpose.

Read `.conveyor/workflow.md`, the brief, an existing design artifact, the media record when present, and [design contract](references/design-contract.md). Discover current `.conveyor/brand/` and `.conveyor/media/` materials and optional guidance, inspect relevant logos, variants, and images, and reconcile them with the brief's inventory. Read the installed `frontend-design/SKILL.md` for judgment about subject-specific direction, typography, composition, and restraint; Conveyor's explicit requirements take precedence over its generic advice. Locate it among project skills; if unavailable, disclose that and use its principles as expressed in the brief rather than installing a dependency silently.

## Define the visual language

Provide a coherent design direction, tokens, reusable patterns, and principles for hierarchy, composition, media treatment, interaction, and responsive behavior. Ground these in the business, brand, and references so they guide both initial and future implementation.

Explain how patterns can be combined and adapted to different content needs. Classify every decision as the workflow's Requirements and examples describes, giving implementation enough guidance to create suitable layouts and components without an example for every case.

## Interpret references

Discover actual image files in `.conveyor/references/` (including nested directories), ignoring README/hidden metadata. Inspect the images with available image-reading tools; filenames alone are not visual evidence. Report corrupt or unsupported images rather than counting them as inspected.

Group views and inspect them as the workflow's Reference fidelity describes: composition first, then important regions at original resolution. Record dimensions and limitations of tall/downsampled captures, and save useful derived crops under `.conveyor/generated/design/inspection/` with parent/region provenance; keep originals unchanged. When intent or grouping is unclear, ask before committing to it. If no usable references remain, follow that section's no-reference path: offer two or three concrete directions (type, palette, composition, rationale), wait for a selection, and do not generate a final system from an unselected direction. Do not reopen a settled direction when references are absent on a later revision.

Record the reference's distinctive hierarchy, proportions, density, media treatment, layering, surface roles, and rhythm in the contract's `reference_translation`. Adapt unsupported proof as the workflow's Facts and claims describes; do not default every unavailable photo or interface to a large text panel. Choose purposeful media treatments and record substantive departures.

## Select the palette

Resolve color selection as the workflow's Palette selection describes before finalizing tokens, independently of composition-reference selection. Reuse prior answers or explicit delegation instead of asking again. Sample interface colors separately from photographic content and label uncertain extracted values as estimates. Check intended combinations for contrast, and record the decision in the contract's `palette`.

## Specify imagery

Define the set-wide media treatment and one slot per image the direction needs, following the workflow's Imagery and the contract's `media`. Derive each slot's subject from the content requirement it serves and the business's actual offer, audience, and locale, so media can brief it without generic stock subjects. Classify each slot as evidence or illustrative. Point a slot at a supplied or already prepared image when one fits; otherwise mark it unfilled. Do not source, generate, or prepare images, and do not ask the imagery-choice question; filling slots is media's work.

## Build the artifact

Choose suitable fonts, including source/loading approach, required weights, and fallbacks. Define a compact token system of CSS custom properties with Tailwind-compatible names, visual intent, component rules, page/section relationships, responsive behavior, and interaction states. Make required rules measurable where review needs to verify them. Leave room for implementation to refine the composition and finish.

Include foundations, reference interpretation, reusable composition patterns grounded in the brief's content requirements, image slots, and useful isolated component examples. Add a page specimen only when it answers a meaningful design question. Label each example's purpose, the rule IDs it demonstrates, and its illustrative aspects so it cannot become an accidental blueprint. Use the brief's actual subject, messaging, and candidate copy where examples need content. Do not build a second full site here. Examples must use defined tokens and may show supplied or prepared images; an unfilled slot appears as a placeholder with its proportions and treatment.

For revisions, read the existing artifact and the implementation record's active user adjustments and referenced entries; when available, inspect the site to understand impact. Incorporate accepted adjustments as the workflow's Adjustments and revisions describes. Keep slot IDs stable so media and implementation can follow them. Change the requested direction, increment the design revision, and keep scoped change notes identifying incorporated or superseded adjustments and changed slots. Do not claim that media or implementation has applied this revision.

Verify JSON parses, required/advisory/illustrative distinctions are clear, included examples use its token values, and asset/font dependencies are declared. Inspect the rendered documentation and any included samples when tools are available; test responsive samples at their stated widths and compare them with references for what they demonstrate. Do not claim whole-page composition was verified from isolated component examples. Without a page specimen, assess documented reference relationships now and leave rendered page-composition verification to implementation/review. Use supported local preview/file/browser tooling rather than assuming hidden `.conveyor/` files are served by the application. If relevant visual verification is unavailable, record missing coverage and a concrete way to finish it; DOM simulation alone is not visual verification. Show/open the saved HTML when supported, then link it with a concise explanation of the direction, changes, unfilled image slots, and remaining decisions. Do not add a routine approval gate when references and instructions already establish direction.
