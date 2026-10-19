# Conveyor v1

Conveyor produces a pitch-ready institutional site, then supports human-led refinement. Users invoke each stage and repeat the correction loop manually; orchestration is future work.

The `conveyor` CLI installs and updates the Conveyor skills, this file, and the `.conveyor/` READMEs. `conveyor sync` replaces them, so put project-specific instructions in the project's `AGENTS.md`, not in managed files.

This file holds every rule that more than one stage executes, consumes, or checks. Skills hold their own stage's procedure and refer to these sections by name; artifact contracts beside the skills hold artifact formats.

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
| `conveyor-brief` | Business information, `.conveyor/brand/`, and `.conveyor/media/`; research only when requested | `.conveyor/generated/brief.md` |
| `conveyor-design` | Brief, brand materials, supplied and prepared media, reference views, existing design | `.conveyor/generated/design/design-system.html` |
| `conveyor-media` | Brief, design media slots and treatment, supplied media and brand photos, existing media record, candidates the user provides | Files in `.conveyor/generated/media/`; `.conveyor/generated/media.md` |
| `conveyor-implement` | Brief, design, media record, canonical brand/media files, existing site; selected review | Site code; `.conveyor/generated/implementation.md` |
| `conveyor-review` | Brief, brand materials, supplied media, original references, design, media record, current site; optional previous review | `.conveyor/generated/reviews/<REVIEW_ID>.md` |

Reference images are inputs, never generated artifacts. Ignore README files and unsupported files when discovering images. Create output directories on demand. Keep generated artifacts in version control: they carry decisions and history. Do not create empty artifacts or fabricate a business to run a stage.

Each stage writes only its own outputs. Brief owns `brief.md`; design owns the design artifact and its supporting examples/evidence; media owns `.conveyor/generated/media/` and `media.md`; implementation owns site code and `implementation.md`; review owns its new report/evidence. Stages may read other artifacts but must not modify them, increment their revisions, or silently invoke their owning skill. Record any needed upstream correction in the current stage's output and hand it off.

## Stages and handoffs

Typical requests:

- `$conveyor-brief` — turn supplied business information into a website brief.
- `$conveyor-design` — establish or revise the visual direction from the brief and references.
- `$conveyor-media` — fill the design's image slots: treat supplied photos, write stock or generation briefs, prepare selected images, or replace one.
- `$conveyor-implement` — build the site, add or reorganize pages, make a targeted tweak, apply a changed design or new media, or fix a specified review.
- `$conveyor-review` — independently inspect the current implementation, optionally rechecking a previous review.

The initial brief → design → implement sequence establishes a reusable foundation; media runs after design whenever the direction needs imagery the brand folder cannot supply, and can run again later to replace an image. Implementation can start before media finishes, using declared placeholders (see Imagery). Design provides visual direction, patterns, and composition principles. Implementation builds the scope requested by the user, including individual pages, routes, sections, and components within that direction. For example, `$conveyor-implement implement the landing page` can be followed later by `$conveyor-implement implement the contact page`; the second request is optional and does not require repeating brief or design. Invoke design again when reconsidering the visual direction.

Implementation determines the routes, content placement, and navigation needed for the requested scope, honoring explicit user choices and the existing site. Record what was built and what remains pending in `implementation.md`; do not expand an individual-page request into building the rest of the site. Content outside a scoped delivery is pending broader work, not a defect. Preserve applicable visual requirements when content moves. Ask only when a consequential ambiguity affects the requested work, and continue independent work while awaiting answers.

Invoking a stage does not automatically invoke subsequent stages, launch a correction loop, or publish the site. Explicitly requested combinations of brief, design, media, and implementation can run within scope; review never runs as part of such a combination (see Review boundary).

## Review boundary

Review is a separate, user-invoked stage. Its independence is what makes its evidence worth having.

- **Implementation must NEVER invoke or delegate review**, including when a request combines them, such as "implement and review" or "fix and review again". It completes the work and its technical checks, then returns a handoff; the user invokes review separately. Implementation cannot switch to a reviewer role, launch, delegate, or schedule a review agent, ask another chat to review, create or modify files in `.conveyor/generated/reviews/`, issue a verdict, or declare findings closed. It may read existing reviews as fix inputs.
- Implementation's verification is limited to non-browser build, lint, type checks, source inspection, and non-browser tests. It may view the rendered site while building, scoped to the areas its request touches, as working inspection: it cannot delegate that inspection, sweep pages or viewports beyond its change, run review's checks on its own work, or record anything observed there, including browser-backed test results, as evidence. Problems seen and left unfixed are remaining issues; it never records that something looked correct. Design and media may inspect their own outputs within their stage.
- The reviewer is a fresh-context worker or runs in a separate chat; the context that implemented or fixed the code cannot perform the review. It gets artifacts, canonical brand materials, original references, and current code, not implementation conversation history or the implementer's reasoning. Implementation-record metadata can establish which revision and scope were applied; claimed success is not evidence.
- Review compares design against the requested reference and brand treatment, and the site against design. A site following an oversimplified artifact is not proof of reference fidelity. It also checks brief requirements, copy, media, responsive layout, interactions, and basic accessibility.
- Requirement violations and usability defects are required findings; subjective recommendations are advisory. Implementation fixes all required findings by default; advisory changes need a user request. An inability to verify is missing coverage, never a pass or an invented failure.
- Each finding names the stage that owns the correction: brief, design, media, or implementation. Implementation corrects concrete deviations within scope and records findings needing new business information, a design choice, or new media as unresolved handoffs rather than inventing a direction. The user invokes those stages before continuing the fix/review loop, and decides when to run the next review and their own visual review.

## Facts and claims

- Business research is opt-in. A business name, URL, or social handle alone is not a request for it. Without a request, no stage fetches business facts or replacement references.
- Separate supplied/verified facts, assumptions, proposed copy, and unknowns, with provenance for each claim. Unknown is a valid value; use an explicit unresolved value where factual content is missing.
- Never invent testimonials, achievements, credentials, certifications, opening hours, addresses, prices, contact destinations, form backends, or other business proof. Proposed copy is allowed; unsupported factual claims are not.
- A reference site's customers, partners, and proof are not the business's evidence. Where the direction calls for proof the business cannot support, replace it with truthful, well-composed content in the same visual role.
- A pitch may contain placeholders. Artifacts identify them and their replacement requirements. An approved placeholder is not a review violation; an undeclared broken action is.

## Brand and media sources

- `.conveyor/brand/` is the stack-independent source for supplied logos, symbols, fonts, photos, and guidelines. Its [README](brand/README.md) explains usage; `brand.md` is optional. A single logo is enough to start. Discover and inspect actual files instead of treating an older artifact's missing-asset inventory as current: a newly added file is a current input.
- `.conveyor/media/` is the source for imagery the user already has that is not brand identity: business photography, previously licensed stock, product shots, illustrations, or images from an earlier site. Its [README](media/README.md) explains usage; optional `media.md` notes say what images show, whether they depict the actual business, and their license or approval for public use. Without such a note, do not assume an image depicts the business.
- Preserve supplied originals in both folders: never modify, move, or reorganize them. Record logo variants and intended backgrounds, font sources/weights, and explicit brand rules. Variant names are hints; inspect light/dark logos, preserve aspect ratio, and choose legible backgrounds. Colors inferred from a logo are proposals, not official palette values. Specific user instructions take precedence; resolve consequential ambiguity between brand rules and requested reference treatment.
- `.conveyor/generated/media/` holds newly sourced, generated, or prepared images, including cropped or treated versions of supplied images. Media writes it and records each file's provenance in `.conveyor/generated/media.md`. Reference inspection crops belong in `.conveyor/generated/design/inspection/` and are evidence, never site imagery.
- Brief, design, and media use project-relative canonical source paths. Implementation chooses stack-appropriate imports or deployment locations and records source-to-destination mappings. Neither `src/assets/` nor `public/` is a universal Conveyor input/output contract. Framework build outputs remain in their normal locations.

## Imagery

Imagery is where pitch sites most often look generic and where they most easily mislead. Design specifies it, media supplies it, implementation places it, and review checks it.

- Design defines a set-wide media treatment and a slot for each image the direction needs. Each slot has a role:
  - **Evidence** shows the actual business: its people, premises, work, or products. Only supplied photography fills it as real. Otherwise it is a declared placeholder or, when the user explicitly authorizes it for a pitch, a stand-in recorded as needing replacement before launch and never presented, captioned, or described in copy as the business.
  - **Illustrative** sets atmosphere or shows a category, setting, material, or idea. Supplied, stock, or generated imagery can fill it.
- Prefer supplied images, cropped and treated to the set, over new stock or generated imagery when they can serve the slot. Supplied stock or generated images keep their nature: they fill illustrative slots, not evidence slots. Coherence across the set matters more than any single image: light, color handling, framing, and subject distance follow the shared treatment.
- When a slot has no suitable supplied image, media asks whether to use a placeholder, source stock, or generate imagery, unless the user already answered for that scope; reuse an existing choice within its scope. Brief records a choice the user volunteers. No other stage sources or generates imagery, and permission to research facts does not imply permission to source images.
- Record source, usage terms, credit requirements, and whether an image is stock or generated. Never present stock or generated imagery as a real business photo. Include visitor-facing credits or disclosures when a license requires them or when needed to avoid a misleading impression, without turning every image into a workflow disclaimer.
- Missing imagery does not justify replacing a specified collage, image treatment, or interface composition with generic text panels. Until a slot is filled, implementation uses a declared placeholder that keeps the slot's proportions and treatment.
- Reference photography is never site imagery. Screenshots are not permission to reuse another business's logo, copy, or photos.

## Palette selection

Color selection is an explicit design decision. Reuse an established palette from the user's instructions, supplied brand guidance, or the existing design unless the request changes it. A logo alone is not an established palette. Specific new user instructions take precedence; resolve consequential conflicts instead of silently replacing supplied colors.

If no palette is established, ask whether the user wants to provide colors or have a palette proposed from the references. A prior request to derive/select colors already answers that question. When proceeding without references, propose colors as part of the authorized brief-based direction choices; a direction selection also selects its palette, without an extra repeated question.

Treat multiple views of one design as one palette, accounting for surfaces/states. For independent sources with compatible colors, propose one coherent palette and explain their contributions; delegated derivation can proceed without another approval gate. For materially competing color directions with no preferred source, present distinct palette options, recommend one, and wait for selection before completing the system. An already specified palette source resolves that choice. Do not average competing hues or treat colors inside photos as interface palette values.

Map selected colors to the references' visual roles: text/background pairs, actions, accents, contrasting surfaces, borders, and decorative details. Preserve hierarchy and surface differentiation instead of replacing every reference panel with the same tint. When supplied colors do not cover necessary roles, clearly propose supporting neutrals/shades and permitted combinations; do not label those additions official brand colors. Respect explicit restrictions, and resolve a consequential addition outside their scope before using it.

The design artifact records palette provenance, selection basis, named role/token mappings, supporting additions, permitted combinations, and reference-role translation. Implementation consumes that decision together with active user adjustments, rather than selecting another palette or re-extracting hues from references or photos; a concrete requested color change is an adjustment, while exploring a new palette belongs to design. Review checks both provenance and actual application: intentional recoloring and supporting additions identified in the design are not drift.

## Reference fidelity

Prefer one design source, which may have several views: a whole-page composition plus hero, section, product, or footer close-ups. Use filenames, grouping directories, and supplied notes to distinguish views of the same source from different inspirations. Descriptive filenames such as `composition.png`, `hero.png`, and `footer.png` identify intended influence; they are not a mandatory upload list, and multiple images are not permission to average conflicting directions. Inspect the full composition and important details separately; ask for intended roles only when unclear, and record the resolved intent so revisions do not repeat the question.

For a tall screenshot, check original dimensions and inspect original-resolution regions with available tools. Save derived crops with their parent path/region if useful. Crops improve inspection but cannot restore missing detail. Ask for clearer originals or targeted close-ups only when an unreadable feature materially affects the requested fidelity; do not invent precise font, shadow, or spacing measurements from a blurry preview.

Design must explain which relationships make the reference distinctive: visual hierarchy, scale, density, media composition, layering, surfaces, and section rhythm. Translate these to the business and brand, recording what is preserved, adapted, unavailable, or intentionally omitted. Honor requested fidelity, including explicit exceptions such as changing colors only. Borrow relationships, not the reference's branding, facts, copy, or photos.

Implementation preserves those source-to-target relationships and purposeful media treatments, not merely the token list, and consults the original references for the areas it builds. Review checks fidelity at both levels: a site matching its design does not establish that the design matches the requested reference. Avoid fabricated similarity scores or pixel-perfect demands when viewports and content differ.

Without usable references, ask whether to continue. If authorized, offer two or three directions grounded in the brief and wait for a choice before completing the design. Existing explicit authorization and direction choices still apply; reference comparison is then not applicable.

## Requirements and examples

Every design decision has a status, and every stage treats it the same way:

- **Required:** foundations, rules marked required, requested reference relationships, and explicit user decisions, including existing user-approved composition requirements. Implementation follows them; review can cite them for required findings.
- **Advisory:** principles and suggestions that guide judgment. Departing from them is not a defect.
- **Illustrative:** examples and arrangements. An example demonstrates its labeled purpose and the rules it cites; it cannot create a requirement by showing a particular arrangement, position, or detail, including inside the embedded JSON.

Page specimens, screenshots, and mockups are optional. Design includes one only when it resolves a meaningful design question; there is no mandatory header/hero or representative-section preview. A missing specimen is not a defect, a coverage gap, or a prerequisite for implementation.

Implementation can refine composition, cropping, responsive behavior, and finish within the established direction, and derive new layouts and components from its principles. It does not ask permission for ordinary improvements in explicitly open areas, and records refinements in `implementation.md`. It does not copy an unfinished example's incidental arrangement or defects, nor treat an intermediate example as a replacement for the original references. Review assesses examples for their declared purpose; a refinement within documented freedom is not drift because it differs from a sample.

## Copy and messaging

Copy carries much of a pitch's persuasion. Its direction is decided once in the brief; its wording lives in the site.

- The brief owns messaging: a positioning line, voice rules, vocabulary (action labels and terms to use or avoid), the key message each content requirement must land, and which recorded facts copy may state. It may offer headline and action candidates, but it is not a copy deck for the whole site.
- The site owns wording. Implementation writes final copy against the messaging, using `frontend-design`'s writing guidance, and keeps action labels consistent across pages and states. Text already on the site is authoritative, whoever wrote it: do not restore brief candidates over it or rewrite copy outside the requested scope.
- A wording change needs no brief invocation and at most an implementation entry. A change to a messaging decision, such as a renamed primary action or a different key message, is an explicit user adjustment: record it in `implementation.md` with its scope so later pages follow it. Record any new factual claim with its provenance; never invent one to strengthen copy.
- When brief is next invoked, it incorporates active messaging adjustments into its own messaging and lists them in its revision notes. A brief revision supersedes an adjustment only when it says so explicitly; otherwise the adjustment stays in effect.
- Review checks copy against the messaging and active adjustments. A missing key message, inconsistent action labels, unsupported claims, and leftover placeholder or template filler are required findings; wording that could be sharper is advisory.

## Styling

Design tokens are CSS custom properties and the single source of shared color, typography, spacing, and other values in every styling approach (see Stack). Color and typography follow the design system; recurring values become tokens. One-off UI stays local to its markup; repeated UI becomes a component file.

- **Tailwind:** style with utilities and theme tokens; Tailwind v4 tokens belong in `@theme`. No handwritten component selectors, semantic styling classes such as `.hero-title`, giant authored stylesheets, or `@apply` abstractions. Keep full utility strings discoverable by Tailwind, including component variants. Allow arbitrary utilities only for genuinely one-off layout measurements, not to bypass the palette or type scale. Keep authored CSS focused on Tailwind imports, tokens, and necessary font loading; Tailwind's generated utility CSS is expected.
- **Established project styling:** follow the project's conventions and map the design tokens into that system once instead of adding a parallel one.
- **Plain CSS:** declare tokens once as custom properties in a global stylesheet that otherwise holds only resets, base element styles, and font loading. Keep component styles beside their component using the stack's scoping mechanism, such as scoped component styles or CSS modules. Reference tokens instead of literal palette/type values. Do not write one large page stylesheet or a handwritten utility framework.

Typography tokens are complete recipes, including companion line heights. Do not add generic overrides, such as `leading-*` utilities, that negate token values unless the design or a recorded user adjustment specifies them. Allowed alpha/state and weight/size variants are recorded in the design so review can distinguish them from drift. Resolved browser typography is verified by review.

The design documentation's inline styles are not application CSS and not a shortcut for implementation.

## Adjustments and revisions

Implementation handles concrete user-requested visual tweaks, including shared changes such as a specified button color, without requiring another design invocation. Record the request, exact adjustment, scope, and any superseded design decision in `implementation.md`; leave the design artifact unchanged. Within their recorded scope, later explicit user adjustments take precedence over older artifact values: carry them into subsequent implementation and review unless the user or a later design revision explicitly supersedes them. An authorized adjustment is not drift because design was not rewritten. Ordinary layout/component refinements within the direction need only the implementation entry; do not label an agent's discretionary change as user-approved.

Design establishes or reconsiders the visual direction and, when next invoked, incorporates relevant accepted adjustments into its own artifact while preserving unrelated decisions. An implementation request requiring exploration of a new direction, missing business/content decisions, or new imagery needs a specific handoff to design, brief, or media. Continue independent work within scope. A small tweak remains scoped even when the design contains broader unapplied changes: mention those changes instead of applying them silently, and do not mark the whole revision applied.

Use monotonically increasing project-local IDs: `B001` for brief revisions, `D001` for design revisions, `M001` for media entries, `I001` for implementation entries, and `R001` for reviews. Increment the highest existing ID; do not reuse an ID after deletion or overwrite a previous review. Findings are referenced as `R001/F001`.

## Older artifacts

Updating Conveyor does not migrate files, regenerate artifacts, or change a site. Fields added to a contract after an artifact was written are optional for that artifact: read what it has, infer what its sources establish, and report real uncertainty. A missing newer field alone is never a defect or a reason to regenerate, and absence never authorizes a new decision or invents a historical approval. Include current required fields when next creating or materially revising an artifact.

- **Design `pages` lists:** keep their applicable visual requirements, but the list is not implementation scope or a closed set of pages. New pages and components within the direction need no design revision; record where affected content moved.
- **Designs without `palette`:** use their recorded tokens, direction, and source guidance. Absence does not authorize choosing different colors.
- **Designs without `media`:** derive slots from their recorded assets, media treatments, and reference translation. Media records the slots it inferred; when a slot's role is unclear, treat it as evidence.
- **Briefs without a messaging section:** derive voice from their positioning and proposed copy.
- **Media recorded elsewhere:** photos in `.conveyor/brand/photos/` remain supplied media. Files in older locations such as `.conveyor/generated/design/assets/`, or acquired media whose provenance lives only in a design's `assets`, stay valid. Read paths and provenance as recorded until the user requests a migration.
