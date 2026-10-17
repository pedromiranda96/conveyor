# Design contract

Path: `.conveyor/generated/design/design.json`.

## Authoritative data

Write a standalone, readable JSON object, without HTML, comments, or Markdown fences. Use `schema_version: 1`, `artifact: "conveyor-design"`, `revision: "D001"`, `brief_revision`, and `updated_at` (ISO-8601 with timezone). The contract carries the design reasoning as well as tokens.

Required fields:

| Field | Contents |
| --- | --- |
| `direction` | Name, rationale grounded in the brief, principles, and whether established through references or user selection |
| `references` | Canonical image paths, source/view grouping, full-page or detail role, dimensions, inspection limitations, observations, resolved intent, and adopted features; derived crops identify parent and region |
| `brand` | Supplied files/guides from `.conveyor/brand/`, variant/background roles, explicit constraints, inferred proposals, and relevant source identities; explicit empty inventory when absent |
| `palette` | Color provenance/source paths, selection basis, named roles linked to color tokens, supporting additions, permitted combinations, and translation of reference color roles |
| `reference_translation` | Feature-to-target mapping explaining what makes the source distinctive and which relationships are preserved, adapted, unavailable, or omitted, with reasons and fidelity expectations |
| `tokens` | CSS-variable-name keys with `value`, `role`, and, when the project uses Tailwind, `utilities` (an array of intended Tailwind classes) |
| `theme_policy` | Explicit spacing scale/base; when the project uses Tailwind, which namespaces are extended/replaced and which defaults remain allowed |
| `typography` | Role-to-token mappings, weights, line heights, tracking, line lengths, and responsive rules |
| `fonts` | Families, roles, weights/styles, source and loading plan, usage terms where known, fallback stacks, and any unresolved acquisition |
| `layout` | Container/gutter/section spacing rules, breakpoint values, alignment, and mobile transformations |
| `components` | Stable IDs with relevant token/utility recipes, variants, interaction states, and responsive rules; distinguish required behavior from illustrative composition |
| `assets` | Project-relative canonical source paths or explicit missing values, roles/variants, supplied/placeholder/stock/generated provenance, source/usage information, and replacement needs; no assumed deployment folder |
| `rules` | Stable rule IDs, `required` or `advisory`, target, instruction, and measurable expectation where applicable |
| `exceptions` | User-authorized deviations with scope/reason; empty by default |
| `changes` | Append-only revision notes with affected token/component/section/rule IDs and a brief summary |
| `verification` | Checks actually performed, tools/evidence where relevant, source-to-contract comparison, and relevant unverified coverage with a concrete completion route |

Use strings, arrays, and objects for these structures; include explicit units for dimensions and literal values rather than prose such as "large". JSON is authoritative about a decision's stated status, not a way to promote every example into a requirement. Keep required relationships linked to rule IDs or explicit user intent; mark composition guidance as guidance. Do not encode example positions or arrangements as universal requirements.

These changes remain within schema version 1. Consumers must read earlier artifacts without manufacturing absent information or forcing regeneration; infer what can be established from their sources and report unresolved coverage. Include required fields when next creating or materially revising a design; optional fields remain optional.

Read `design.json` when present. Only when it is absent, use the legacy `.conveyor/generated/design/design-system.html`, extracting its `<script type="application/json" id="conveyor-design">` and consulting its documentation. An invalid JSON contract is an input error, not permission to fall back silently to an older HTML baseline. When JSON exists, older HTML is not another authority. Workflow sync and downstream stages do not migrate artifacts. On the next requested design revision, write JSON, carrying forward applicable decisions, stable IDs, and change history, and increment the highest existing design revision. Leave the legacy file unchanged as historical context; its presence does not require maintaining an HTML copy.

Earlier artifacts may contain `pages` or `examples`. Consumers should retain applicable visual requirements from that guidance without treating a page list as implementation scope or an illustrative arrangement as a rule. New artifacts express reusable composition guidance through `layout`, `components`, `reference_translation`, and `rules`.

## Reference and brand translation

Group related views with a source ID and view role. A composition image and its hero/footer crops describe one design, not three independent aesthetics. Track source paths and useful digests so changes can be recognized; do not assign false precision to features unreadable in the original.

For each distinctive relationship in `reference_translation`, identify its source view/region, target section/component, observation, treatment, rationale, and expected outcome. Include scale and density, composition of media, crop/layering, color/surface roles, and rhythm where they carry the direction. Describe intentional substitutions for unsupported business proof. Required preservation follows explicit user intent; general aesthetic suggestions remain advisory. Record accepted exceptions so brand adaptation cannot silently become a different composition.

Brand files remain in `.conveyor/brand/`; newly sourced/generated deployable files go in `.conveyor/generated/media/`. Fonts can come from either, with loading paths/weights recorded. For each used asset, record a project-relative `source_path`; implementation later records the deployment mapping. Keep older `preview_path` fields readable in their original HTML context. Variant names are hints: inspect light/dark logos, preserve aspect ratio, and choose appropriate backgrounds. Identify inferred palette/type decisions as proposals instead of rewriting brand guidance. Keep older asset paths readable until an explicit migration is requested.

Reference crops in `.conveyor/generated/design/inspection/` are evidence, never deployable reference photography. Do not synthesize hidden details or confuse a source website's customer/partner logos with the business's own evidence.

## Palette decision

Record the source of the selected palette (user, supplied brand guidance, existing design, references, or authorized brief-based direction), and the actual selection basis (provided values, delegated derivation, or option/direction choice). Reference-derived values can be estimates; do not manufacture exact extraction evidence or user approval. Group views of the same source instead of treating hero/footer colors as competing palettes.

Give each color a role and link it to its literal token value. Document relevant foreground/background combinations, states and decorative variants, plus how reference roles map to the selected palette. Distinguish supplied/established values from proposed supporting neutrals/shades and explain why additions are needed. When reference sources genuinely compete, record the selected option/source rather than merging incompatible schemes. A derived palette is a project design decision, not proof of the business's official identity.

Reuse an established selection without another approval gate. Older designs without `palette` remain readable through their tokens, recorded direction and source guidance; do not invent historical approval or force regeneration just to populate the new field.

## Tokens and styling

Tokens are CSS custom properties, the shared source for every styling approach in the workflow. Use Tailwind v4 theme namespaces such as `--color-*`, `--font-*`, `--text-*`, `--spacing-*`, `--container-*`, `--radius-*`, and `--shadow-*` even without Tailwind: they work as plain custom properties and keep the system portable. Include any `--text-…--line-height` companion values. Font loading declarations are separate from theme tokens.

When the project uses Tailwind, design for its installed version; check the manifest/lockfile rather than assuming one. In v4, theme variables map to utilities through `@theme`, not a new legacy JavaScript configuration. When Tailwind is not installed yet, the workflow's styling order determines whether implementation adds it; keep the tokens valid either way.

Give each token a literal CSS-compatible value and role. For Tailwind, list multiple utilities where appropriate (one color can drive background, text, and border). Record the numeric spacing base if using numeric utilities. Replacing spacing should not accidentally remove every sizing utility. Reuse allowed defaults deliberately; do not reset all namespaces merely to demonstrate customization. Record permitted color alpha/state variants and font weight/size variants so review can distinguish approved derivations from drift.

Document token companion line heights and any intentional overrides as a complete typography recipe. Utility or component style recipes must not accidentally negate these values. Surface, shadow, and layering choices should express the reference/brand direction; do not impose a blanket ban on them when the selected reference depends on them.

Source: [Tailwind theme variables](https://tailwindcss.com/docs/theme). Consult current documentation when implementing mappings for a different version.
