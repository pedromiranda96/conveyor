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

Include the relevant canonical brand guides/files, original reference views and their source grouping, and deployed media/source mappings. Track their identities/digests so an input change is distinguishable from a code regression. Derived inspection crops must retain parent/region provenance; they do not replace the original reference in the baseline.

## Coverage

List checks, tool/method, tested viewport/state, and result: verified, failed, or unverified. Include relevant checks not possible with the available tools. Separate source evidence from rendered evidence. Give a concrete way to finish missing coverage, without pretending an unavailable tool was used.

Record source-reference/brand-to-design coverage separately from design-to-site coverage. If there are no references by prior authorization, state that the reference comparison is not applicable. When no optional page specimen exists, compare the documented relationships with references and inspect the implemented site; absence of the specimen alone is neither a defect nor a coverage gap. If relevant reference details, an included example, or the actual site cannot be inspected, state what remains unverified. Included examples are assessed for their declared purpose, not as universal page blueprints. Do not require fields added to the contract after an older artifact was created, or imply reference fidelity passed merely because implementation uses the correct tokens.

## Findings

Each finding has a local stable ID `F001`, referenced externally as `R001/F001`, and:

- Classification: required or advisory; priority: high, medium, or low based on user impact.
- `owner_stage`: brief, design, or implement; identify where the corrective decision belongs, separate from where its symptoms appear.
- Target: file/line, section/component/rule ID, and route/viewport/state as appropriate.
- Expected behavior and its source: brief section, design rule/token, styling contract, or explained usability requirement.
- When citing an example, identify the explicit rule or relationship it demonstrates; illustrative positioning or arrangement alone is not a required acceptance criterion.
- Observed behavior and reproducible evidence: measured styles, source location, steps, or screenshot link. Do not assert numerical measurements from a visual estimate.
- Acceptance criterion, with a scoped fix suggestion when useful.
- Previous finding reference when this carries forward a prior issue.

Avoid duplicate findings for one root cause. Required findings are actionable corrections, not vague preferences. Approved placeholders are not automatically violations; distinguish an expected pitch limitation from an undeclared broken action.

## Recheck and handoff

For a prior review, list each relevant prior finding with independently evidenced resolved, still-open, or unverified status. New regressions get new finding IDs. Keep earlier reports unchanged.

End with required/advisory totals, coverage gaps, and the next manual action: implementation fixes, finish verification, or user visual review. A pass is scoped to the inspected snapshot and checks, not client approval.

When findings originate in business requirements or visual translation, name the needed brief/design handoff before implementation. Implementation can correct concrete deviations; it must not invent missing business facts or a new aesthetic direction to claim the review closed.
