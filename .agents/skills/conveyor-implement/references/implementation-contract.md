# Implementation record contract

Path: `.conveyor/generated/implementation.md`. Preserve prior entries; this is a change record, not a conversation transcript.

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

Summarize known pending brief/design changes by revision and affected section/token/rule IDs, approved placeholders, and incomplete integrations. Preserve unrelated pending work when updating this summary. A later partial design revision can leave `fully_applied_design_revision` at the previous baseline: record exactly which later changes are applied/pending in the entries.

## Entries

Each entry has a unique `I…` heading and:

- Timestamp with timezone; request and scope: initial, tweak, review-fixes, or design-revision.
- Brief/design revisions read; decisions actually applied; any shared artifact update created by this request.
- Changed files and behavior, with enough location detail for a reviewer to find the work.
- Triggering review path/ID and affected `R…/F…` references, or explicitly none.
- Per-finding disposition: addressed-and-verified, changed-but-unverified, already-resolved (with evidence), or unresolved (with reason). Advisory findings changed only by request.
- Checks performed, command/tool and result, and browser viewports when applicable. Include missing coverage instead of claiming success from a source inspection.
- Remaining issues, unapplied changes, or decisions needing the user.

Log actual work, including meaningful fixes that remain incomplete; do not log planned work as completed. If no code change is necessary, record an evidence-backed recheck only when it is useful for the review handoff. No-op invocations need not create revision noise.
