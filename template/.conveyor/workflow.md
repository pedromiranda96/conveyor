# Conveyor v1

Conveyor produces a pitch-ready institutional site, then supports human-led refinement. Users invoke each stage and repeat the correction loop manually; orchestration is future work.

The `conveyor` CLI installs and updates the Conveyor skills, this file, and the `.conveyor/` READMEs. `conveyor sync` replaces them, so put project-specific instructions in the project's `AGENTS.md`, not in managed files.

## Stack

Conveyor is framework-agnostic and runs in an already scaffolded project. Identify the framework, package manager, scripts, and conventions from the project, and follow its `AGENTS.md` and official documentation. Choose the styling approach in this order:

1. Use Tailwind CSS when the project already has it.
2. Otherwise keep a styling system the project already establishes, such as CSS modules, CSS-in-JS, or an existing stylesheet architecture. Do not add a parallel one.
3. Otherwise add Tailwind through the framework's official integration.
4. Use plain CSS only when Tailwind has no official integration for the stack or the user declines it.

A failed installation is not a reason to switch approaches: report it and ask. Implementation records the approach in use and why.

## Inputs and outputs

All paths are relative to the project root, not the shell's current directory.

| Stage | Inputs | Output |
| --- | --- | --- |
| `conveyor-brief` | Business information and `.conveyor/brand/`; research only when requested | `.conveyor/generated/brief.md` |
| `conveyor-design` | Brief, brand materials, reference views, existing design | `.conveyor/generated/design/design-system.html`; selected/generated media |
| `conveyor-implement` | Brief, design, canonical brand/media files, existing site; selected review | Site code; `.conveyor/generated/implementation.md` |
| `conveyor-review` | Brief, brand materials, original references, design, current site; optional previous review | `.conveyor/generated/reviews/<REVIEW_ID>.md` |

Reference images are inputs, never generated artifacts. Ignore README files and unsupported files when discovering images. Create output directories on demand. Keep generated artifacts in version control: they carry decisions and history. Do not create empty artifacts or fabricate a business to run a stage.

## Brand and media sources

- `.conveyor/brand/` is the stack-independent source for supplied logos, symbols, fonts, photos, and guidelines. Its [README](brand/README.md) explains usage; `brand.md` is optional. A single logo is enough to start. Discover and inspect actual files instead of treating an old brief's missing-asset inventory as current.
- Preserve supplied originals. Record logo variants and intended backgrounds, font sources/weights, and explicit brand rules. Colors inferred from a logo are proposals, not official palette values. Specific user instructions take precedence; resolve consequential ambiguity between brand rules and requested reference treatment.
- `.conveyor/generated/media/` stores newly sourced, generated, or explicitly prepared media variants, with provenance recorded in the design artifact. Framework build outputs remain in their normal locations. Reference inspection crops belong in `.conveyor/generated/design/inspection/` and are evidence, not site imagery.
- Brief/design use project-relative canonical source paths. Implementation chooses stack-appropriate imports or deployment locations and records source-to-destination mappings. Neither `src/assets/` nor `public/` is a universal Conveyor input/output contract. Do not overwrite brand originals or require copies to already exist in the application's folders.
- Existing projects may reference media in older locations such as `.conveyor/generated/design/assets/`. Read those paths as recorded. Updating the workflow does not automatically migrate files, regenerate existing artifacts, or change a site.

## Palette selection

Color selection is an explicit design decision. Reuse an established palette from the user's instructions, supplied brand guidance, or the existing design unless the request changes it. A logo alone is not an established palette. Specific new user instructions take precedence; resolve consequential conflicts instead of silently replacing supplied colors.

If no palette is established, ask whether the user wants to provide colors or have a palette proposed from the references. A prior request to derive/select colors already answers that question. When proceeding without references, propose colors as part of the authorized brief-based direction choices; a direction selection also selects its palette, without an extra repeated question.

Treat multiple views of one design as one palette, accounting for surfaces/states. For independent sources with compatible colors, propose one coherent palette and explain their contributions; delegated derivation can proceed without another approval gate. For materially competing color directions with no preferred source, present distinct palette options, recommend one, and wait for selection before completing the system. An already specified palette source resolves that choice. Do not average competing hues or treat colors inside photos as interface palette values.

Map selected colors to the references' visual roles: text/background pairs, actions, accents, contrasting surfaces, borders, and decorative details. Preserve hierarchy and surface differentiation instead of replacing every reference panel with the same tint. When supplied colors do not cover necessary roles, clearly propose supporting neutrals/shades and permitted combinations; do not label those additions official brand colors. Respect explicit restrictions, and resolve a consequential addition outside their scope before using it.

The design artifact records palette provenance, selection basis, named role/token mappings, supporting additions, permitted combinations, and reference-role translation. Implementation consumes that decision rather than selecting another palette; review checks both its provenance and actual application.

## Reference fidelity

Prefer one design source, which may have several views: a whole-page composition plus hero, section, product, or footer close-ups. Use filenames, grouping directories, and supplied notes to distinguish views of the same source from different inspirations. Inspect the full composition and important details separately; ask for intended roles only when unclear.

For a tall screenshot, check original dimensions and inspect original-resolution regions with available tools. Save derived crops with their parent path/region if useful. Crops improve inspection but cannot restore missing detail. Ask for clearer originals or targeted close-ups only when an unreadable feature materially affects the requested fidelity; do not invent precise font, shadow, or spacing measurements from a blurry preview.

Design must explain which relationships make the reference distinctive: visual hierarchy, scale, density, media composition, layering, surfaces, and section rhythm. Translate these to the business and brand, recording what is preserved, adapted, unavailable, or intentionally omitted. Unsupported business claims can be omitted while their visual role is replaced with truthful, well-composed content. Generic text panels are not a universal substitute for missing photography or product imagery.

The design artifact contains required foundations, visual intent, reference relationships, composition guidance, and useful isolated component examples. Page specimens, screenshots, and mockups are optional: include one only when it resolves a meaningful design question. There is no mandatory header/hero or representative-section preview. Mark each example's purpose, any existing rules it demonstrates, and aspects left illustrative. An example cannot create a requirement merely by showing a particular arrangement.

Inspect examples that are included against their stated purpose and original references when tools are available. When no page specimen is included, review the design contract against the references and later verify the implemented site's composition; absence of that optional specimen is not a failure or missing coverage by itself. If a relevant included sample or actual site cannot be inspected, record missing coverage and a concrete route to finish it. Build/JSON validation alone does not establish visual fidelity.

## Manual handoffs

Typical requests:

- `$conveyor-brief` — turn supplied business information into a website brief.
- `$conveyor-design` — establish or revise the visual direction from the brief and references.
- `$conveyor-implement` — build the site, make a targeted tweak, apply a changed design, or fix a specified review.
- `$conveyor-review` — independently inspect the current implementation, optionally rechecking a previous review.

Invoking a stage does not automatically invoke subsequent stages, launch a correction loop, or publish the site. Explicitly requested combinations of briefing/design/implementation can run within scope. **Implementation must NEVER invoke or delegate review**, including when a request combines implementation with review. Complete implementation and its technical checks, then return a handoff; the user invokes review as a separate step. Implementation cannot switch roles to review, launch a review subagent, schedule a review, or write review reports on its own work.

A separately user-invoked review can delegate one inspection to a fresh-context reviewer; that is review's responsibility, not implementation's. If the calling chat contains implementation history, it serves only as the dispatcher and relays the fresh worker's report. Without fresh-context delegation, review must run in another chat/context.

Implementation checks are limited to non-browser build, lint, type checks, source inspection, and relevant non-browser tests, recorded in `implementation.md`. Implementation must not launch/control browsers, use browser automation/MCP or computer use, capture site screenshots, query computed styles, test interactions, run browser-backed tests (including headless tools through scripts/terminal), or delegate those inspections. Renaming them self-checks or QA is not an exception. Reading supplied reference/brand images and documentation remains allowed. Rendered-site verification belongs to the separately invoked independent reviewer; design may still inspect its own design documentation/examples within its stage.

## Shared decisions

- Business research is opt-in. Separate supplied/verified facts, assumptions, proposed copy, and unknowns. Do not invent business claims, testimonials, certifications, or contact destinations.
- Descriptive reference filenames identify intended influence, such as `composition.png`, `hero.png`, and `footer.png`. Follow the source/view grouping above; multiple images are not permission to average conflicting directions.
- Without usable references, ask whether to continue. If authorized, offer two or three directions grounded in the brief and wait for a choice before completing the design. Existing explicit authorization and direction choices still apply.
- When suitable business imagery is missing, ask whether to use placeholders, source stock, or generate imagery. Reuse an existing choice within its scope. Record source, usage terms, and whether an image is stock/generated; do not present it as a real business photo. Keep acquisition details and internal uncertainties in artifacts. Include visitor-facing credits/disclosures when required or needed to avoid a misleading claim, without turning every visual into a workflow disclaimer. Proposed copy is allowed; unsupported factual claims are not.
- Use `frontend-design` for design judgment, primarily during design. During implementation use it to critique fidelity and quality; preserve the chosen direction and accepted refinements. Conveyor's explicit requirements take precedence over generic design advice.

## Styling and revisions

Design tokens are CSS custom properties and the single source of shared color, typography, spacing, and other values in every styling approach (see Stack). Color and typography follow the design system; recurring values become tokens. One-off UI stays local to its markup; repeated UI becomes a component file.

- **Tailwind:** style with utilities and theme tokens. No handwritten component selectors, semantic styling classes such as `.hero-title`, or `@apply` abstractions. Allow arbitrary utilities for genuinely one-off layout measurements. Keep authored CSS focused on Tailwind imports, tokens, and necessary font loading; Tailwind's generated utility CSS is expected.
- **Established project styling:** follow the project's conventions and map the design tokens into that system instead of adding a parallel one.
- **Plain CSS:** declare tokens once as custom properties in a global stylesheet that otherwise holds only resets, base element styles, and font loading. Keep component styles beside their component using the stack's scoping mechanism, such as scoped component styles or CSS modules. Reference tokens instead of literal palette/type values. Do not write one large page stylesheet or a handwritten utility framework.

An implementation request that changes a shared visual decision updates both site and design artifact. Local layout adjustments need not become global rules. A small tweak remains scoped even when the design contains broader unapplied changes: mention those changes instead of applying them silently.

Implementation can refine composition, cropping, responsive behavior, and finish within the established visual direction. Required tokens/rules, explicit user decisions, and requested reference relationships remain binding; illustrative arrangements do not. Keep original references available instead of treating an intermediate page example as their replacement. Shared decision changes still update the design artifact; improvements within its stated freedom need only the implementation record.

Use monotonically increasing project-local IDs: `B001` for brief revisions, `D001` for design revisions, `I001` for implementation entries, and `R001` for reviews. Increment the highest existing ID; do not reuse an ID after deletion or overwrite a previous review. Findings are referenced as `R001/F001`. Artifact contracts live beside the skills. Record partial design application honestly; a small tweak must not mark an entire new design revision applied.

## Review boundary

The reviewer gets artifacts, canonical brand materials, original references, and current code, not implementation conversation history. It must be a fresh-context worker or a reviewer in a separate chat; the implementing context cannot perform the review. Implementation may read existing reports to fix findings, but cannot invoke/delegate review, create/modify review artifacts, or issue an independent verdict. Evidence, not the implementer's confidence or log, establishes correctness. Compare both design against the requested reference/brand treatment and implementation against design. A site following an oversimplified artifact is not proof of reference fidelity. Check brief requirements, responsive layout, interactions, and basic accessibility too. Requirement violations and usability defects are required findings; subjective recommendations are advisory. Fix all required findings by default; advisory changes require a user request.

Findings identify the correction's owning stage: brief, design, or implementation. A lost requested composition can be evidenced as a requirement violation; a new aesthetic preference remains advisory. Implementation addresses concrete corrections within scope and records upstream findings needing new information or a design choice as unresolved handoffs, rather than silently inventing a direction. The user invokes any needed design revision before continuing the manual fix/review loop.

Prefer rendered inspection with available browser tools. Computer use can provide visual/interaction evidence but may not expose computed styles. With neither, perform useful source review, list unverified browser checks, and suggest a concrete route to finish them. Lack of coverage is not a pass. Subsequent reviews verify previous findings and inspect for regressions, producing a new artifact each time. The user decides when to run the next review and when to perform their own visual review.
