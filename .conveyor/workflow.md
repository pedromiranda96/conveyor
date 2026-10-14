# Conveyor v1

Conveyor produces a pitch-ready institutional site, then supports human-led refinement. V1 targets one page. Users invoke each stage and repeat the correction loop manually; CLI setup and orchestration are future work.

## Inputs and outputs

All paths are relative to the project root, not the shell's current directory.

| Stage | Inputs | Output |
| --- | --- | --- |
| `conveyor-brief` | Supplied business information; research only when requested | `.conveyor/generated/brief.md` |
| `conveyor-design` | Brief, existing design, images in `.conveyor/references/` | `.conveyor/generated/design/design-system.html` |
| `conveyor-implement` | Brief, design, existing site; selected review when fixing findings | Site code; `.conveyor/generated/implementation.md` |
| `conveyor-review` | Brief, design, current site; previous review for rechecks | `.conveyor/generated/reviews/<REVIEW_ID>.md` |

Reference images are inputs, never generated artifacts. Ignore README files and unsupported files when discovering images. Create output directories on demand. Keep generated artifacts in version control: they carry decisions and history. Do not create empty artifacts or fabricate a business to run a stage.

## Manual handoffs

Typical requests:

- `$conveyor-brief` — turn supplied business information into a website brief.
- `$conveyor-design` — establish or revise the visual direction from the brief and references.
- `$conveyor-implement` — build the page, make a targeted tweak, apply a changed design, or fix a specified review.
- `$conveyor-review` — independently inspect the current implementation, optionally rechecking a previous review.

Invoking a stage does not automatically invoke subsequent stages, launch a correction loop, or publish the site. An explicitly requested combination can run those stages. Review delegates one inspection to a fresh-context reviewer when possible; that is not loop orchestration.

## Shared decisions

- Business research is opt-in. Separate supplied/verified facts, assumptions, proposed copy, and unknowns. Do not invent business claims, testimonials, certifications, or contact destinations.
- Prefer one visual reference. Descriptive filenames identify intended influence, such as `composition.png`, `hero.png`, and `footer.png`. Ask what to borrow when the filename or supplied instructions do not explain it. Multiple images are not permission to average conflicting directions.
- Without usable references, ask whether to continue. If authorized, offer two or three directions grounded in the brief and wait for a choice before completing the design. Existing explicit authorization and direction choices still apply.
- When suitable business imagery is missing, ask whether to use placeholders, source stock, or generate imagery. Reuse an existing choice within its scope. Record source, usage terms, and whether an image is stock/generated; do not present it as a real business photo. Proposed copy is allowed; unsupported factual claims are not.
- Use `frontend-design` for design judgment, primarily during design. During implementation use it to critique fidelity and quality; preserve the chosen direction and accepted refinements. Conveyor's explicit requirements take precedence over generic design advice.

## Styling and revisions

Site styling uses Tailwind utilities and theme tokens. No handwritten component selectors, semantic styling classes such as `.hero-title`, or `@apply` abstractions. One-off UI uses utilities in its markup; repeated UI becomes a component file. Allow arbitrary utilities for genuinely one-off layout measurements; recurring values become tokens. Color and typography follow the design system. Keep authored CSS focused on Tailwind imports, tokens, and necessary font loading; Tailwind's generated utility CSS is expected.

An implementation request that changes a shared visual decision updates both site and design artifact. Local layout adjustments need not become global rules. A small tweak remains scoped even when the design contains broader unapplied changes: mention those changes instead of applying them silently.

Use monotonically increasing project-local IDs: `B001` for brief revisions, `D001` for design revisions, `I001` for implementation entries, and `R001` for reviews. Increment the highest existing ID; do not reuse an ID after deletion or overwrite a previous review. Findings are referenced as `R001/F001`. Artifact contracts live beside the skills. Record partial design application honestly; a small tweak must not mark an entire new design revision applied.

## Review boundary

The reviewer gets artifacts and current code, not implementation conversation history. Evidence, not the implementer's confidence or log, establishes correctness. Check design, brief requirements, responsive layout, interactions, and basic accessibility. Requirement violations and usability defects are required findings; subjective recommendations are advisory. Fix all required findings by default; advisory changes require a user request.

Prefer rendered inspection with available browser tools. Computer use can provide visual/interaction evidence but may not expose computed styles. With neither, perform useful source review, list unverified browser checks, and suggest a concrete route to finish them. Lack of coverage is not a pass. Subsequent reviews verify previous findings and inspect for regressions, producing a new artifact each time. The user decides when to run the next review and when to perform their own visual review.
