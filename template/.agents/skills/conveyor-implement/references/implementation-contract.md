# Implementation record contract

Path: `.conveyor/generated/implementation.md`. Preserve prior entries; this is a change record, not a conversation transcript.

Implementation writes this record and site code; brief, design, and review artifacts are read-only inputs. It may consume an existing independent review but must never invoke/delegate `conveyor-review`, create or modify `.conveyor/generated/reviews/`, or issue a review verdict. It also must not perform browser automation, screenshots, rendered inspection, interaction testing, or browser-backed tests under another name. A combined implementation/review request ends with an implementation handoff; the user invokes review separately in an independent context.

Start with YAML frontmatter:

```yaml
artifact: conveyor-implementation
schema_version: 1
latest_entry: I001
fully_applied_brief_revision: B001
fully_applied_design_revision: D001
```

Use `null` when no revision is fully applied. These fields summarize application of artifact decisions, not review approval or proof of a bug-free site. Advance them only after all relevant decisions in that revision have been incorporated. A scoped tweak does not automatically advance either field.

These fields identify applied artifact baselines, not acceptance of later adjustments. Record any superseded decisions explicitly below; an accepted adjustment is not pending design work solely because the design artifact remains unchanged.

## Current state

State the styling approach in use (Tailwind and its version, the project's established system, or plain CSS) and why the workflow's styling order selected it. Summarize known pending brief/design changes by revision and affected section/token/rule IDs, approved placeholders, and incomplete integrations. Preserve unrelated pending work when updating this summary. A later partial design revision can leave `fully_applied_design_revision` at the previous baseline: record exactly which later changes are applied/pending in the entries.

Summarize implemented scope and relevant pending work. A scoped page delivery does not mean every brief requirement has been implemented; distinguish content outside the request from incomplete work inside it. Entries record affected pages/routes and navigation as part of describing actual changes, without requiring a separate site plan or full route inventory.

Keep a concise list of active explicit user adjustments to the design, linked to their implementation entries: request/provenance, exact values or behavior, local/shared scope, and the older tokens/rules they supersede. Distinguish accepted-and-applied adjustments from requested but unfinished work and agent-derived refinements. Update this summary when an adjustment is superseded or incorporated into a later design revision, preserving historical entries. Subsequent implementation and review consume this list alongside the design artifact; do not invent user approval or treat an implementation success claim as review evidence.

## Entries

Each entry has a unique `I…` heading and:

- Timestamp with timezone; request and scope: initial, extend/reorganize, tweak, review-fixes, or design-revision.
- Brief/design revisions read; decisions actually applied; any upstream correction needed, with its owning stage. Do not modify upstream artifacts.
- Explicit user adjustments applied, their request/provenance, exact result and scope, and superseded design decisions; distinguish these from refinements within existing guidance.
- Changed files and behavior, with enough location detail for a reviewer to find the work.
- For structure changes, affected routes, navigation, and content placement, including how applicable visual requirements carry over. New pages/components within the established direction need no new design revision.
- Asset mappings for files used/changed: canonical `.conveyor/brand/` or generated-media source, stack-specific destination/import, variant/background role, and transformation if any. For unchanged legacy locations record the actual path, not a fictional migration. Relevant source digests can establish freshness without a new brand revision scheme.
- Triggering review path/ID and affected `R…/F…` references, or explicitly none.
- Per-finding disposition: addressed-and-verified, changed-but-unverified, already-resolved (with evidence), or unresolved (with reason). Advisory findings changed only by request.
- Non-browser technical checks performed, command/tool and result. Rendered desktop/mobile behavior, computed styles, interactions, and visual acceptance remain pending independent review; do not record implementation-owned browser viewports or screenshots. References to evidence in an existing independent report must be identified as that report's evidence, not a new implementation check.
- Remaining issues, unapplied changes, or decisions needing the user.

For review fixes, identify each finding's owning stage. Findings requiring a missing brief decision or new design choice remain unresolved with a specific handoff; do not silently choose a new direction or claim those findings fixed by changing code alone.

"Verified" in an implementation entry means the listed non-browser technical checks passed within their recorded coverage. It never means rendered/interaction acceptance passed, the reviewer independently closed that finding, or a new review passed. Mark corrected visual/interaction findings as changed-but-unverified until an independent reviewer verifies them. Record that the separate independent review is pending; do not start it. Preserve historical entries rather than rewriting their earlier verification scope.

Log actual work, including meaningful fixes that remain incomplete; do not log planned work as completed. If no code change is necessary, record an evidence-backed recheck only when it is useful for the review handoff. No-op invocations need not create revision noise.
