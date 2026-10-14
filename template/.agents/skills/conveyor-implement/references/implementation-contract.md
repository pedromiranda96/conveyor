# Implementation record contract

Path: `.conveyor/generated/implementation.md`. Preserve prior entries; this is a change record, not a conversation transcript.

Implementation writes this record, not review reports. It may consume an existing independent review but must never invoke/delegate `conveyor-review`, create or modify `.conveyor/generated/reviews/`, or issue a review verdict. It also must not perform browser automation, screenshots, rendered inspection, interaction testing, or browser-backed tests under another name. A combined implementation/review request ends with an implementation handoff; the user invokes review separately in an independent context.

Start with YAML frontmatter:

```yaml
artifact: conveyor-implementation
schema_version: 1
latest_entry: I001
fully_applied_brief_revision: B001
fully_applied_design_revision: D001
```

Use `null` when no revision is fully applied. These fields summarize application of artifact decisions, not review approval or proof of a bug-free site. Advance them only after all relevant decisions in that revision have been incorporated. A scoped tweak does not automatically advance either field.

## Current state

State the styling approach in use (Tailwind and its version, the project's established system, or plain CSS) and why the workflow's styling order selected it. Summarize known pending brief/design changes by revision and affected section/token/rule IDs, approved placeholders, and incomplete integrations. Preserve unrelated pending work when updating this summary. A later partial design revision can leave `fully_applied_design_revision` at the previous baseline: record exactly which later changes are applied/pending in the entries.

## Entries

Each entry has a unique `I…` heading and:

- Timestamp with timezone; request and scope: initial, tweak, review-fixes, or design-revision.
- Brief/design revisions read; decisions actually applied; any shared artifact update created by this request.
- Changed files and behavior, with enough location detail for a reviewer to find the work.
- Asset mappings for files used/changed: canonical `.conveyor/brand/` or generated-media source, stack-specific destination/import, variant/background role, and transformation if any. For unchanged legacy locations record the actual path, not a fictional migration. Relevant source digests can establish freshness without a new brand revision scheme.
- Triggering review path/ID and affected `R…/F…` references, or explicitly none.
- Per-finding disposition: addressed-and-verified, changed-but-unverified, already-resolved (with evidence), or unresolved (with reason). Advisory findings changed only by request.
- Non-browser technical checks performed, command/tool and result. Rendered desktop/mobile behavior, computed styles, interactions, and visual acceptance remain pending independent review; do not record implementation-owned browser viewports or screenshots. References to evidence in an existing independent report must be identified as that report's evidence, not a new implementation check.
- Remaining issues, unapplied changes, or decisions needing the user.

For review fixes, identify each finding's owning stage. Findings requiring a missing brief decision or new design choice remain unresolved with a specific handoff; do not silently choose a new direction or claim those findings fixed by changing code alone.

"Verified" in an implementation entry means the listed non-browser technical checks passed within their recorded coverage. It never means rendered/interaction acceptance passed, the reviewer independently closed that finding, or a new review passed. Mark corrected visual/interaction findings as changed-but-unverified until an independent reviewer verifies them. Record that the separate independent review is pending; do not start it. Preserve historical entries rather than rewriting their earlier verification scope.

Log actual work, including meaningful fixes that remain incomplete; do not log planned work as completed. If no code change is necessary, record an evidence-backed recheck only when it is useful for the review handoff. No-op invocations need not create revision noise.
