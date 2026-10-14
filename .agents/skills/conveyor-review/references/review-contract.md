# Review artifact contract

Path: `.conveyor/generated/reviews/R001.md` (increment ID). Optional evidence: `.conveyor/generated/reviews/R001/`. Each invocation writes a new report, including rechecks; preserve old reports.

Start with YAML frontmatter:

```yaml
artifact: conveyor-review
schema_version: 1
review_id: R001
created_at: "ISO-8601 timestamp with timezone"
brief_revision: B001
design_revision: D001
previous_review: null
outcome: needs-fixes
```

Use `null` for missing artifact revisions. Outcome semantics:

- `needs-fixes`: at least one required finding, even if some coverage is also missing.
- `incomplete`: no required finding established, but relevant requested/default checks could not be verified.
- `pass`: no required findings and adequate verification coverage for the declared scope. Advisory findings may remain. An explicitly source-only scope can pass source checks, but must state that it is not a full site review.

## Snapshot and scope

Record root, route/URL (or source-only), scope, current Git HEAD when available, and working-tree identity including relevant untracked files. A commit alone does not identify uncommitted code: use a deterministic content digest/manifest of reviewed source/config files, excluding secrets, dependencies, build outputs, and generated review evidence. Record brief/design revisions and content digests and the latest implementation entry only for traceability. State how the snapshot was captured and whether it remained stable. For a non-Git project use the source manifest/digest.

## Coverage

List checks, tool/method, tested viewport/state, and result: verified, failed, or unverified. Include relevant checks not possible with the available tools. Separate source evidence from rendered evidence. Give a concrete way to finish missing coverage, without pretending an unavailable tool was used.

## Findings

Each finding has a local stable ID `F001`, referenced externally as `R001/F001`, and:

- Classification: required or advisory; priority: high, medium, or low based on user impact.
- Target: file/line, section/component/rule ID, and route/viewport/state as appropriate.
- Expected behavior and its source: brief section, design rule/token, styling contract, or explained usability requirement.
- Observed behavior and reproducible evidence: measured styles, source location, steps, or screenshot link. Do not assert numerical measurements from a visual estimate.
- Acceptance criterion, with a scoped fix suggestion when useful.
- Previous finding reference when this carries forward a prior issue.

Avoid duplicate findings for one root cause. Required findings are actionable corrections, not vague preferences. Approved placeholders are not automatically violations; distinguish an expected pitch limitation from an undeclared broken action.

## Recheck and handoff

For a prior review, list each relevant prior finding with independently evidenced resolved, still-open, or unverified status. New regressions get new finding IDs. Keep earlier reports unchanged.

End with required/advisory totals, coverage gaps, and the next manual action: implementation fixes, finish verification, or user visual review. A pass is scoped to the inspected snapshot and checks, not client approval.
