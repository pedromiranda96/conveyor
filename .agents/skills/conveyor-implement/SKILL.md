---
name: conveyor-implement
description: Build or refine a Conveyor site from its brief and design system, with non-browser technical checks only. Use for initial implementation, scoped tweaks, design revisions, or fixes from an existing independent review; never invokes review or performs browser-based inspection.
---

# Conveyor Implement

Translate decisions into code for the project's existing stack and keep `.conveyor/generated/implementation.md` as a concise record. Infer the request's scope instead of requiring the user to select a mode. This starter is Astro; Conveyor's source/artifact paths are stack-independent.

## Implementation/review boundary

**NEVER invoke `conveyor-review` from implementation.** Do not switch to a reviewer role, launch/delegate a review subagent, schedule a review, or ask another chat/agent to perform it on your behalf. This prohibition also applies to combined requests such as "implement and review" or "fix and review again": complete the implementation and its technical checks, then return a handoff for the user to invoke review separately.

You may read existing independent review artifacts as fix inputs. You must not create or modify files in `.conveyor/generated/reviews/`, issue an independent review verdict, or declare review findings independently closed. Review is a separate user-invoked stage conducted in a different context or by a fresh-context reviewer agent.

**No browser-based self-checks.** Do not launch/control a browser, use browser automation/MCP or computer use to inspect the implemented site, capture screenshots, query computed styles, exercise interactions, compare rendered layouts, or run browser-backed tests. This includes Playwright/Puppeteer/headless tools invoked through scripts or the terminal and inspection delegated to another agent. Calling it "verification", "QA", or "my own check" does not change the boundary. The allowed implementation checks are non-browser build, lint, type checks, source inspection, and relevant non-browser tests. Reading supplied reference/brand images and documentation remains allowed; it is not permission to inspect the rendered site.

Read `AGENTS.md`, `.conveyor/workflow.md`, the brief, embedded design JSON/documentation and any included examples, current code, and the existing implementation record. Read [implementation contract](references/implementation-contract.md). A page specimen is not a prerequisite for implementation. Discover current canonical brand files, optional guidance, and design-bound media/reference views; stale inventory does not establish that a newly supplied logo is absent. Identify the actual stack from the project; consult its relevant official guides and documentation required by `AGENTS.md`. Check the installed Tailwind version and existing integration; do not replace the stack without a request.

## Choose scope

- **Initial build:** create the one-page site from the brief/design, including real visitor actions. If either artifact is missing or consequentially incomplete, identify the missing input rather than inventing a replacement workflow. Work on independent parts while awaiting necessary answers.
- **Small tweak:** change the requested area and preserve surrounding code, composition, and accepted refinements. Existing source is part of the project context, not something to regenerate wholesale. Missing optional artifacts need not prevent a clearly specified local fix.
- **Review fixes:** read the review selected by path/ID or unambiguous request context. If multiple reviews could be meant, ask which; do not guess. Address all required findings by default, or the user's explicit subset. Advisory findings need a request. Confirm findings against current code before changing it: a stale review may describe a problem already fixed.
- **Apply design revision:** reconcile the requested design changes with the existing site while preserving refinements outside their scope. Do not treat every new artifact revision as permission to rebuild the whole page.

For a small tweak with broader unapplied design changes, make the tweak and mention the remaining changes. For a requested shared visual change, update design JSON, documentation, relevant included examples, change notes, and revision together with the site; do not create a missing page specimen merely to synchronize the artifact. Read the design contract when doing this. Do not mark that entire revision applied if other parts remain pending. Local composition adjustments need not become shared tokens or rules. A request changing business facts also needs the corresponding brief correction, with provenance; do not silently establish a new business claim.

Use review ownership to distinguish code defects from upstream brief/design decisions. Apply concrete required corrections within scope, including explicit shared corrections; findings needing new business information or a new direction remain unresolved handoffs to the owning stage. Do not reinterpret an aesthetic suggestion as permission to redesign. Mention newly changed brand/reference inputs without expanding a small tweak into an unrequested migration or rebrand.

## Implement

Read the installed `frontend-design` skill to guide coding decisions about hierarchy, spacing, responsive rules, copy, and restraint against the existing direction. Do not follow its browser/screenshot self-critique procedures during implementation; this skill's stricter boundary applies. Do not use it to invent a competing design or impose a new aesthetic approval step.

Preserve the design's source-to-target relationships and purposeful media treatments, not merely its token list. Inspect the reference views for the areas being implemented. Do not replace a specified collage, image treatment, or interface composition with generic text panels just because that is easier to code; follow the existing asset-choice policy when a required source is missing.

Treat required foundations/rules and explicit preservation decisions as constraints, and illustrative examples as demonstrations of their labeled purpose. Refine composition, cropping, responsive behavior, and finish within the chosen direction; do not copy an unfinished page example's incidental arrangement or defects. Consult original references instead of treating an intermediate mockup as their replacement. Resolve actual conflicts with requirements, but do not ask permission for ordinary improvements in explicitly open areas. Record those refinements; shared decision changes still update the design artifact.

Use `.conveyor/brand/` as supplied originals and `.conveyor/generated/media/` as canonical newly selected/generated media. Copy, optimize, or import assets into locations appropriate to the actual stack without changing originals; record source-to-destination mappings, variant/role, and any transformation. No universal `src/assets/` or `public/` layout is required. Respect older recorded paths unless migration is requested. Keep inspection crops out of deployable media.

Use utilities directly in markup, shared theme tokens, and component files for reused UI. Follow the workflow's styling policy: no `.hero-title`, handwritten component CSS, giant authored stylesheets, or `@apply` classes. Tailwind v4 tokens belong in `@theme`; font loading may use necessary `@font-face`. Keep full utility strings discoverable by Tailwind, including component variants. Use arbitrary utilities only for truly one-off layout measurements, not to bypass the palette/type scale.

Preserve companion line heights and complete typography recipes. Do not add generic `leading-*` utilities that override token values unless the design explicitly specifies that override. Check source recipes for unintended overrides; resolved browser typography must be verified by independent review.

Use the design's selected palette and documented color-role/combination mappings, not hues re-extracted from the references or photos. Follow explicit supporting-color restrictions. For older artifacts use their recorded color tokens and direction; absence of the new `palette` field does not authorize choosing different colors. A requested palette change updates shared design decisions through the existing revision process.

Respect font loading, responsive transformations, keyboard focus, reduced motion, semantic structure, and the actual CTA destinations. Do not invent a form backend, working contact destination, or business proof. Missing imagery follows the shared choice policy; do not source or generate it without that choice. Record deliberate placeholders and nonfunctional integrations as unresolved, rather than presenting them as completed.

## Verify and record

Run existing non-browser checks appropriate to the change; for an initial build or theme/component changes, verify the production build. Inspect check commands/configuration before running ambiguous test scripts so browser-backed tests are not started inadvertently. Leave desktop/mobile rendering, computed styles, screenshots, interaction testing, and visual acceptance to independent review. Record checks actually performed and their results, including limits; do not claim rendered behavior or visual quality passed from source/build evidence. These are technical implementation checks, not a formal review artifact or an independent verdict.

When a server is needed, follow the project's `AGENTS.md` and stack commands. In this Astro starter use `astro dev --background`, managed with `astro dev status`, `astro dev logs`, and `astro dev stop`. Use the project's package-manager command wrapper when needed; do not replace its required background mode with a foreground command or `&`.

Append an implementation entry with affected files, artifact revisions, non-browser checks, pending scope, and review/finding references. For review fixes, distinguish addressed-and-verified, changed-but-unverified, already-resolved, and unresolved findings; these describe technical implementation evidence, not independent closure. Rendered/interaction findings remain pending independent verification even after code corrections and a passing build. Do not edit the original review or declare its findings independently closed. Finish with what changed, technical verification, the record link, and remaining issues. Stop after this handoff. The user must invoke the next independent review as a separate step; implementation never starts or delegates it.
