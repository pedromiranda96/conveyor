# Design contract

Path: `.conveyor/generated/design/design-system.html`.

## Authoritative data

Embed valid JSON in `<script type="application/json" id="conveyor-design">`. Escape `<` in embedded JSON as `<` so content cannot terminate the script element. Use `schema_version: 1`, `artifact: "conveyor-design"`, `revision: "D001"`, `brief_revision`, and `updated_at` (ISO-8601 with timezone).

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
| `media` | Set-wide `treatment` and image `slots`, described below; explicit empty slots when the direction uses no imagery |
| `assets` | Files the artifact itself uses or depends on (logos, fonts, icons, images): `source_path` or an explicit missing value, HTML-relative `preview_path`, and role/variant; an image prepared by media references its media-record slot instead of repeating provenance |
| `rules` | Stable rule IDs, `required` or `advisory`, target, instruction, and measurable expectation where applicable |
| `exceptions` | User-authorized deviations with scope/reason; empty by default |
| `changes` | Append-only revision notes with affected token/component/slot/section/rule IDs and a brief summary |
| `verification` | Checks actually performed, tools/viewport/evidence where relevant, source-to-contract/example comparison, and relevant unverified coverage with a concrete completion route |

Use strings, arrays, and objects for these structures; include explicit units for dimensions and literal values rather than prose such as "large". Record each decision's status as the workflow's Requirements and examples defines it: keep required relationships linked to rule IDs or explicit user intent, mark composition guidance as guidance, and do not encode example positions or arrangements as requirements.

An optional `examples` array describes included component/page samples: stable ID, kind (`component` or `page`), purpose, referenced required-rule IDs, illustrative aspects, and viewport dimensions when relevant.

These fields remain within schema version 1; the workflow's Older artifacts explains how consumers read artifacts written before a field existed.

## Reference and brand translation

Group related views with a source ID and view role. A composition image and its hero/footer crops describe one design, not three independent aesthetics. Track source paths and useful digests so changes can be recognized; do not assign false precision to features unreadable in the original.

For each distinctive relationship in `reference_translation`, identify its source view/region, target section/component, observation, treatment, rationale, and expected outcome. Include scale and density, composition of media, crop/layering, color/surface roles, and rhythm where they carry the direction. Describe intentional substitutions for unsupported business proof. Required preservation follows explicit user intent; general aesthetic suggestions remain advisory. Record accepted exceptions so brand adaptation cannot silently become a different composition.

Record each asset's project-relative `source_path` and its `preview_path` resolved from this nested HTML file; implementation later records the deployment mapping. Fonts can come from `.conveyor/brand/` or a hosted source, with loading paths/weights recorded. Identify inferred palette/type decisions as proposals instead of rewriting brand guidance.

## Media

`treatment` describes what makes the image set coherent: light and time of day, color handling relative to the palette (natural, graded toward a token, duotone), framing and lens feel, subject distance, texture or grain, and subjects or clichés to avoid. Say which parts are applied in the image file and which in code, such as an overlay token or CSS filter.

Each entry in `slots` has:

- Stable `id` and the `target` component/section and content requirement IDs it serves.
- `role`: `evidence` or `illustrative`, as the workflow's Imagery defines them.
- `subject`: what the image shows and must convey, specific to the business, audience, and locale.
- `aspect`: ratio per breakpoint or container, plus minimum rendered width when it matters.
- `focus`: focal point and crop-safe area that must survive every aspect, such as a face, product, or the area kept clear for overlaid text.
- `treatment`: slot-specific departures from the set treatment and its overlay/text-contrast requirement.
- `alt_intent`: what alternative text should communicate, or `decorative`.
- `source`: a supplied path, a media-record file, or `unfilled`.

Mark slot properties required or illustrative like any other decision; a focal point protecting overlaid text is usually required, an exact crop rarely is.

## Palette decision

Record the selected palette's source (user, supplied brand guidance, existing design, references, or authorized brief-based direction) and selection basis (provided values, delegated derivation, or option/direction choice). Reference-derived values can be estimates; do not manufacture exact extraction evidence or user approval. When reference sources genuinely compete, record the selected option/source rather than merging incompatible schemes.

Give each color a role and link it to its literal token value. Document relevant foreground/background combinations, states and decorative variants, plus how reference roles map to the selected palette. Distinguish supplied/established values from proposed supporting neutrals/shades and explain why additions are needed.

## Tokens and styling

Tokens are CSS custom properties, the shared source for every styling approach in the workflow. Use Tailwind v4 theme namespaces such as `--color-*`, `--font-*`, `--text-*`, `--spacing-*`, `--container-*`, `--radius-*`, and `--shadow-*` even without Tailwind: they work as plain custom properties and keep the system portable. Include any `--text-…--line-height` companion values. Font loading declarations are separate from theme tokens.

When the project uses Tailwind, design for its installed version; check the manifest/lockfile rather than assuming one. In v4, theme variables map to utilities through `@theme`, not a new legacy JavaScript configuration. When Tailwind is not installed yet, the workflow's styling order determines whether implementation adds it; keep the tokens valid either way.

Give each token a literal CSS-compatible value and role. For Tailwind, list multiple utilities where appropriate (one color can drive background, text, and border). Record the numeric spacing base if using numeric utilities. Replacing spacing should not accidentally remove every sizing utility. Reuse allowed defaults deliberately; do not reset all namespaces merely to demonstrate customization. Record permitted color alpha/state variants and font weight/size variants.

Document companion line heights and any intentional overrides as a complete typography recipe. Surface, shadow, and layering choices should express the reference/brand direction; do not impose a blanket ban on them when the selected reference depends on them.

Source: [Tailwind theme variables](https://tailwindcss.com/docs/theme). Consult current documentation when implementing mappings for a different version.

## Human-readable documentation and examples

Show required foundations, visual intent, reference relationships, color/type/spacing specimens, the media treatment and slots, relevant isolated component examples/states, and reusable composition patterns grounded in the brief's content. Explain how patterns adapt to different content needs. Include selected font weights and any declared placeholders.

For each included example, label what it demonstrates, which required rules it uses, and what implementation can vary. A focused collage/product-media example can explain a relationship without dictating an entire section. Identify sample viewport dimensions when relevant. Keep original references available and include a compact source-to-design comparison explaining preservation and brand/content adaptations. Provenance belongs in the artifact; add visitor-facing notices only when required or needed to avoid misleading users. Do not use repetitive internal disclaimers as design content.

Make the HTML viewable without a JavaScript framework, remote Tailwind runtime, or a separate build step. For this documentation artifact, token declarations in `:root` and inline styles consuming those tokens are acceptable. Avoid handwritten component classes here too. Either render specimen values from the embedded data or verify each against it; do not maintain contradictory token tables. External/local font and image dependencies must be declared and have understandable fallbacks.
