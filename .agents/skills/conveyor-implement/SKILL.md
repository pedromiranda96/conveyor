---
name: conveyor-implement
description: Build or refine a Conveyor institutional site using its brief and HTML design system. Use for first implementation, scoped code or visual tweaks, applying design revisions, or fixing findings from a Conveyor review.
---

# Conveyor Implement

Translate decisions into working Astro code and keep `.conveyor/generated/implementation.md` as a concise record. Infer the request's scope instead of requiring the user to select a mode.

Read `AGENTS.md`, `.conveyor/workflow.md`, the brief, embedded design JSON and specimens, current code, and the existing implementation record. Read [implementation contract](references/implementation-contract.md). Consult the relevant Astro guides required by `AGENTS.md` before related code work. Check the installed Tailwind version and existing integration; do not replace the stack without a request.

## Choose scope

- **Initial build:** create the one-page site from the brief/design, including real visitor actions. If either artifact is missing or consequentially incomplete, identify the missing input rather than inventing a replacement workflow. Work on independent parts while awaiting necessary answers.
- **Small tweak:** change the requested area and preserve surrounding code, composition, and accepted refinements. Existing source is part of the project context, not something to regenerate wholesale. Missing optional artifacts need not prevent a clearly specified local fix.
- **Review fixes:** read the review selected by path/ID or unambiguous request context. If multiple reviews could be meant, ask which; do not guess. Address all required findings by default, or the user's explicit subset. Advisory findings need a request. Confirm findings against current code before changing it: a stale review may describe a problem already fixed.
- **Apply design revision:** reconcile the requested design changes with the existing site while preserving refinements outside their scope. Do not treat every new artifact revision as permission to rebuild the whole page.

For a small tweak with broader unapplied design changes, make the tweak and mention the remaining changes. For a requested shared visual change, update design JSON, specimens, change notes, and revision together with the site. Read the design contract when doing this. Do not mark that entire revision applied if other parts remain pending. Local composition adjustments need not become shared tokens or rules. A request changing business facts also needs the corresponding brief correction, with provenance; do not silently establish a new business claim.

## Implement

Read the installed `frontend-design` skill to critique hierarchy, spacing, responsiveness, copy, and restraint against the existing direction. Do not use it to invent a competing design or impose a new aesthetic approval step.

Use utilities directly in markup, shared theme tokens, and component files for reused UI. Follow the workflow's styling policy: no `.hero-title`, handwritten component CSS, giant authored stylesheets, or `@apply` classes. Tailwind v4 tokens belong in `@theme`; font loading may use necessary `@font-face`. Keep full utility strings discoverable by Tailwind, including component variants. Use arbitrary utilities only for truly one-off layout measurements, not to bypass the palette/type scale.

Respect font loading, responsive transformations, keyboard focus, reduced motion, semantic structure, and the actual CTA destinations. Do not invent a form backend, working contact destination, or business proof. Missing imagery follows the shared choice policy; do not source or generate it without that choice. Record deliberate placeholders and nonfunctional integrations as unresolved, rather than presenting them as completed.

## Verify and record

Run existing checks appropriate to the change; for an initial build or theme/component changes, verify the production build. Inspect the affected desktop/mobile behavior when browser tools are available. Record checks actually performed and their results, including limits. A build is not visual verification and this self-check is not an independent Conveyor review.

When a server is needed, follow `AGENTS.md`: `astro dev --background`, managed with `astro dev status`, `astro dev logs`, and `astro dev stop`. Use the project's package-manager command wrapper when needed; do not replace background mode with a foreground command or `&`.

Append an implementation entry with affected files, artifact revisions, checks, pending scope, and review/finding references. For review fixes, distinguish addressed-and-verified, changed-but-unverified, already-resolved, and unresolved findings. Do not edit the original review or declare its findings independently closed. Finish with what changed, verification, the record link, and remaining issues. The user manually invokes the next independent review unless explicitly requesting it now.
