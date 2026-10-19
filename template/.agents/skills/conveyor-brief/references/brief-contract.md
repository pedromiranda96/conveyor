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

## Messaging

Direction for the site's copy, not the copy itself; keep it short enough to apply on every page.

- Positioning line: one visitor-facing sentence saying what the business is and why it is the right choice, grounded in the business facts and audience positioning.
- Voice: three or four rules, each with a short do/don't pair written for this business.
- Vocabulary: the exact label for each primary and secondary action, plus terms to use or avoid.
- Claims: the recorded facts copy may state, by reference to their provenance above. Copy states nothing beyond them.

Key messages belong to the content requirements below.

## Content requirements

Describe the content needed to serve the audience and primary action independently of pages or routes. Give each requirement a stable descriptive ID, audience need, purpose, required information, the key message it must land, headline or action candidates where useful, relevant asset, and CTA behavior where applicable. Prioritize requirements when useful, but do not prescribe a page count, route, or universal section structure. Preserve explicit user constraints as such; implementation determines and evolves the structure without revising the brief when business/content requirements stay the same.

## Content and assets

Separate factual copy from proposed messaging. List any content that must be confirmed before client delivery, and declared placeholders with their replacement requirements.

Include an inventory of `.conveyor/brand/` and `.conveyor/media/`: project-relative source paths; logo variants and intended backgrounds; font files/weights; images with what each is known to show, whether it depicts the actual business, and its source/license or approval when known; guides or notes files; and explicit constraints with provenance. Distinguish official supplied rules from inferred proposals. Do not duplicate entire guides. Note consequential missing imagery and any imagery choice the user has stated, with its scope.

## Constraints and assumptions

Business/brand requirements, interaction requirements, priorities, labeled assumptions with their impact, and unresolved questions. Distinguish a requirement from a suggestion. Cross-reference affected content requirement IDs.

## Revision notes

Keep concise entries for materially changed revisions: revision ID, request, changed requirements, messaging adjustments incorporated from the implementation record (by entry ID), and downstream impact. Preserve provenance and accepted decisions during updates. Do not imply that design or code has already incorporated a brief revision.
