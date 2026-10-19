---
name: conveyor-implement
description: Build or extend a Conveyor site using its established design direction. Use for initial implementation, new pages, structure changes, scoped tweaks, design revisions, new media, or existing review fixes; never invokes review or treats its own rendered inspection as verification.
---

# Conveyor Implement

Translate decisions into code for the project's existing stack and keep `.conveyor/generated/implementation.md` as a concise record. Infer the request's scope instead of requiring the user to select a mode. Conveyor's source/artifact paths are stack-independent; the project's framework, package manager, and conventions determine where and how code is written.

**NEVER invoke `conveyor-review` from implementation**, even when the request says "and review". Follow the workflow's Review boundary: it defines what you may do with review artifacts, what working inspection allows, and what counts as verification.

Read `AGENTS.md`, `.conveyor/workflow.md`, the brief, embedded design JSON/documentation and any included examples, the media record, current code, and the existing implementation record. Read [implementation contract](references/implementation-contract.md). Discover current canonical brand and media files and design-bound reference views; stale inventory does not establish that a newly supplied file is absent. Identify the actual stack from the project; consult its relevant official guides and documentation required by `AGENTS.md`. Determine the styling approach by the workflow's order, checking the installed Tailwind version and integration when present. Do not replace the stack or an established styling system without a request.

## Choose scope

- **Initial build:** implement the requested scope from the brief and established design direction, including real visitor actions. A request for a landing page builds that page; it does not imply building every content requirement as a separate page. Choose suitable routes, content placement, and navigation within scope, honoring explicit user choices. An absent page plan or undocumented component is not an incomplete design by itself. If either artifact is missing or consequentially incomplete, identify the missing input rather than inventing a replacement workflow.
- **Extend or reorganize:** add pages, routes, sections, or components, or split/merge existing pages using the established direction. The request authorizes the necessary structure and navigation changes within its scope, including changing between one page and multiple pages. Preserve unrelated work and applicable visual requirements. Derive new layouts and component patterns from the design's principles; do not send ordinary additions back to design.
- **Small tweak:** change the requested area and preserve surrounding code, composition, and accepted refinements. Existing source is part of the project context, not something to regenerate wholesale. Missing optional artifacts need not prevent a clearly specified local fix.
- **Review fixes:** read the review selected by path/ID or unambiguous request context. If multiple reviews could be meant, ask which; do not guess. Address all required findings by default, or the user's explicit subset. Confirm findings against current code before changing it: a stale review may describe a problem already fixed. Correct findings you own and hand off the rest, as the workflow's Review boundary describes.
- **Apply design revision or new media:** reconcile the changed design or the media record's newly filled slots with the existing site while preserving refinements outside their scope. Do not treat a new revision or entry as permission to rebuild the entire site.

Apply concrete user-requested visual adjustments and record them, as the workflow's Adjustments and revisions describes. Preserve their exact values/behavior and scope in the current-state summary so future work carries them forward. If the request requires a new direction, missing business/content decisions, or new imagery, record the specific handoff and continue independent work; distinguish a concrete requested adjustment from permission to redesign. Mention newly changed brand/reference inputs without expanding a small tweak into an unrequested migration or rebrand.

## Implement

Read the installed `frontend-design` skill to guide coding decisions about hierarchy, spacing, responsive rules, copy, and restraint against the existing direction. Its screenshot self-critique is working inspection: it informs the build, not the implementation record. Do not use it to invent a competing design or impose a new aesthetic approval step.

Write copy as the workflow's Copy and messaging describes, stating only facts permitted by its Facts and claims. Change existing site text only within the requested scope.

Follow the design's decisions by status, as the workflow's Requirements and examples describes, and preserve its source-to-target relationships and media treatments as its Reference fidelity describes. Inspect the reference views for the areas being implemented.

Place images from the design's slots and the media record, honoring each slot's aspect, focal point, treatment, and alternative-text intent at every breakpoint. Treat supplied and prepared files as canonical sources: copy, optimize, or import them into locations appropriate to the stack, generate responsive variants through the stack's image tooling, and record source-to-destination mappings. Do not source, generate, or art-direct new imagery. For an unfilled slot, use a declared placeholder as the workflow's Imagery describes and hand the slot off to media. Include credits or disclosures the media record requires.

Follow the workflow's Styling for the recorded approach, with component files for reused UI. Use the design's palette and active user adjustments as the workflow's Palette selection describes. Respect font loading, responsive transformations, keyboard focus, reduced motion, semantic structure, and the actual CTA destinations. Record deliberate placeholders and nonfunctional integrations as unresolved rather than presenting them as completed.

## Verify and record

Run existing non-browser checks appropriate to the change; for an initial build or theme/component changes, verify the production build. Inspect check commands/configuration before running ambiguous test scripts so you know which results count as non-browser verification. Record checks actually performed and their results, including limits.

When a server is needed, follow the project's `AGENTS.md` and stack commands. When they define a background mode or server management commands, use them; do not replace a required background mode with a foreground command or `&`. Use the project's package-manager command wrapper when needed.

Append an implementation entry as the contract describes. Finish with what changed, technical verification, the record link, and remaining issues, then stop. The user invokes the next independent review as a separate step.
