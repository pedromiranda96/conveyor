# Brief contract

Path: `.conveyor/generated/brief.md`. Markdown is authoritative; an agent must be able to distinguish facts from proposals without conversation history.

Start with YAML frontmatter:

```yaml
artifact: conveyor-brief
schema_version: 1
revision: B001
updated_at: "ISO-8601 timestamp with timezone"
```

Use these sections; omit irrelevant optional fields rather than populating them with invented facts.

## Business facts

Name, business description, services, location/address, service regions, hours, contact channels, social profiles, and supplied brand constraints. For each claim record provenance: user-supplied, agent-supplied/unverified, or researched with source URL and access date. Keep conflicts visible. Unknown is a valid value.

## Audience and outcome

Primary audience, their need, primary action, secondary actions if relevant, language/locale, and positioning grounded in the offer. Mark inferred choices as assumptions. Identify the exact destination and behavior of the primary action, or flag it as a consequential unknown.

## Page plan

Describe one page at route `/`, with ordered sections. Give each a stable descriptive ID, purpose, required content, proposed copy, relevant asset, and CTA behavior where applicable. Use a page-level grouping so more pages can be added later, without designing multi-page behavior in v1. Do not make all businesses use the same section count or structure.

## Content and assets

Separate factual copy from proposed messaging. List supplied logos/photos, missing assets, approved sourcing choice, source/usage information when known, and any content that must be confirmed before client delivery. A pitch may have placeholders; the artifact must identify them and their replacement requirements.

## Constraints and assumptions

Business/brand requirements, interaction requirements, priorities, labeled assumptions with their impact, and unresolved questions. Distinguish a requirement from a suggestion. Cross-reference affected page/section IDs.

## Revision notes

Keep concise entries for materially changed revisions: revision ID, request, changed requirements, and downstream impact. Preserve provenance and accepted decisions during updates. Do not imply that design or code has already incorporated a brief revision.
