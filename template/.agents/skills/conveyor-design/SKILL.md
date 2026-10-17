---
name: conveyor-design
description: Establish or reconsider Conveyor's visual direction in a JSON design contract from a brief, supplied brand materials, and visual references. Define reusable principles, tokens, and component guidance for initial and future implementation.
---

# Conveyor Design

Own the visual contract at `.conveyor/generated/design/design.json`. Write clear, explicit decisions for a fresh implementation/review agent.

Read `.conveyor/workflow.md`, the brief, an existing design artifact, and [design contract](references/design-contract.md). Discover current `.conveyor/brand/` materials and optional guidance, inspect relevant logos/variants, and reconcile them with the brief's inventory. Respect explicit brand rules; inferred palette values remain proposals. Read the installed `frontend-design/SKILL.md` for judgment about subject-specific direction, typography, composition, and restraint. Locate it among project skills; if unavailable, disclose that and use its principles as expressed in the brief rather than installing a dependency silently.

## Define the visual language

Provide a coherent design direction, tokens, reusable patterns, and principles for hierarchy, composition, media treatment, interaction, and responsive behavior. Ground these in the business, brand, and references so they guide both initial and future implementation.

Explain how patterns can be combined and adapted to different content needs. Distinguish required visual relationships from illustrative arrangements, giving implementation enough guidance to create suitable layouts and components without an example for every case.

## Interpret references

Discover actual image files in `.conveyor/references/` (including nested directories), ignoring README/hidden metadata. Inspect the images with available image-reading tools; filenames alone are not visual evidence. Report corrupt or unsupported images rather than counting them as inspected. Do not fetch business facts or replacement references without a request.

Prefer one design source, with full-page and detail views as useful. Use filenames, directories, and user notes to group views of the same source and distinguish independent inspirations. `composition.png`, `hero.png`, `solutions.png`, `products.png`, or `footer.png` describe roles, not a mandatory upload list. When intent or source grouping is unclear, ask before committing to it; record resolved intent so revisions do not repeat the question. Resolve conflicting roles rather than averaging designs.

Inspect composition first, then important regions at original resolution using available inspection tools. Record dimensions and limitations of tall/downsampled captures. Save useful derived crops under `.conveyor/generated/design/inspection/` with parent/region provenance; keep originals unchanged. Ask for better originals/close-ups only when an unreadable detail materially affects fidelity. Crops do not restore lost detail, and a vague preview does not establish exact font or shadow values.

If no usable references remain, ask whether to continue without them unless already authorized. Once authorized, offer two or three concrete directions grounded in the brief (type, palette, composition, rationale) and wait for selection. An existing chosen direction remains valid when references are absent on a later revision; do not reopen settled choices unnecessarily. Do not generate a final system from an unselected direction.

Borrow design relationships, not reference branding, facts, copy, or photos. References guide presentation; the brief controls content and visitor goals. Use supplied assets; if suitable imagery is missing, follow the workflow's asset-choice question. While waiting, describe image roles and placement without sourcing or generating images implicitly.

Explain the reference's distinctive hierarchy, proportions, density, media treatment, layering, surface roles, and rhythm in the contract's `reference_translation`. Honor requested fidelity, including explicit exceptions such as changing colors only. Adapt unsupported proof into truthful content while preserving an appropriate visual role; do not default every unavailable photo/interface to a large text panel. Choose purposeful media treatments and record substantive departures. Brand adaptation should preserve the reference's relationships unless the request changes them.

## Select the palette

Resolve color selection before finalizing tokens, independently of composition-reference selection. Reuse colors established by user instructions, explicit brand guidance, or the existing design unless a change is requested; a logo alone does not establish an official palette. If none is established, ask whether the user wants to provide colors or have a palette proposed from the references. Reuse prior answers or explicit delegation instead of asking again. A selected brief-based direction without references can establish its palette too.

Treat views of one source as one palette, including its surfaces/states. With compatible independent sources, propose one coherent palette and explain contributions; delegated derivation does not need another approval gate. With materially competing palettes and no chosen color source, present distinct options, recommend one, and wait for selection. Do not average conflicting hues. Sample interface colors separately from photographic content, and label uncertain extracted values as estimates.

Map provided/selected colors to text/background pairs, actions, accents, distinct surfaces, borders, and decorative roles in the references. Preserve hierarchy and differentiation, not literal reference hues when the user selected another palette. Propose any needed supporting neutrals/shades explicitly, respect supplied restrictions, and check intended combinations for contrast. Record provenance, selection basis, additions, and role translation in the contract's `palette`; do not claim derived colors are official brand values.

## Build the artifact

Choose a coherent direction and suitable fonts, including source/loading approach, required weights, and fallbacks. Define a compact token system of CSS custom properties with Tailwind-compatible names, visual intent, component rules, page/section relationships, responsive behavior, and interaction states. Make required rules measurable where review needs to verify them. Separate required foundations and explicit preservation decisions from composition guidance, illustrative arrangements, and advisory principles; leave room for implementation to refine the composition and finish.

Write foundations, reference interpretation, reusable composition patterns, and component recipes directly in JSON, grounded in the brief's content requirements. Preserve the reasoning about hierarchy, proportions, density, media treatment, layering, and rhythm; a token list alone is insufficient. JSON is the source of truth for documented definitions and classifications; an illustrative layout remains illustrative inside JSON too. Reference supplied brand files at their canonical paths; save newly sourced/generated deployable media under `.conveyor/generated/media/`. Use project-relative source paths without assuming a framework's public directory.

For revisions, read the existing artifact and the implementation record's active explicit user adjustments and referenced entries; when available, inspect the site to understand impact. Incorporate relevant accepted adjustments into the design baseline, preserving their recorded scope and unrelated decisions unless the current request supersedes them. Do not treat agent-derived refinements as user approval. Change the requested direction, increment the design revision, and keep scoped change notes identifying incorporated or superseded adjustments. Do not change brief, implementation records, or application code, or claim that implementation has applied this revision.

Verify JSON parses, token/rule references resolve, required/advisory/illustrative distinctions are clear, and asset/font dependencies are declared. Assess the documented relationships against the inspected references; JSON validation alone does not establish visual fidelity. Leave rendered-site verification to the separately invoked independent review. Record relevant missing coverage and a concrete way to finish it. Link the saved JSON with a concise explanation of the direction, changes, and remaining decisions. Do not add a routine approval gate when references and instructions already establish direction.
