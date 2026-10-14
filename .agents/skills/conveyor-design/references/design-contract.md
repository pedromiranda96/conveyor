# Design contract

Path: `.conveyor/generated/design/design-system.html`.

## Authoritative data

Embed valid JSON in `<script type="application/json" id="conveyor-design">`. Escape `<` in embedded JSON as `\u003c` so content cannot terminate the script element. Use `schema_version: 1`, `artifact: "conveyor-design"`, `revision: "D001"`, `brief_revision`, and `updated_at` (ISO-8601 with timezone).

Required fields:

| Field | Contents |
| --- | --- |
| `direction` | Name, rationale grounded in the brief, principles, and whether established through references or user selection |
| `references` | Array of relative image paths, resolved intended roles, observations, and what was adopted; empty when proceeding without references |
| `tokens` | CSS-variable-name keys with `value`, `role`, and `utilities` (an array of intended Tailwind classes) |
| `theme_policy` | Which Tailwind namespaces are extended/replaced, and which defaults remain allowed; explicit spacing scale/base |
| `typography` | Role-to-token mappings, weights, line heights, tracking, line lengths, and responsive rules |
| `fonts` | Families, roles, weights/styles, source and loading plan, usage terms where known, fallback stacks, and any unresolved acquisition |
| `layout` | Container/gutter/section spacing rules, breakpoint values, alignment, and mobile transformations |
| `components` | Stable IDs with applicable token/utility recipes, variants, interaction states, and responsive rules; only components needed by this site |
| `pages` | One page with route `/`; sections ordered by stable brief IDs, purpose, composition, content/asset bindings, and responsive behavior |
| `assets` | Paths or explicit missing values, purpose, supplied/placeholder/stock/generated provenance, source/usage information, and replacement needs |
| `rules` | Stable rule IDs, `required` or `advisory`, target, instruction, and measurable expectation where applicable |
| `exceptions` | User-authorized deviations with scope/reason; empty by default |
| `changes` | Append-only revision notes with affected token/component/section/rule IDs and a brief summary |

Use strings, arrays, and objects for these structures; include explicit units for dimensions and literal values rather than prose such as "large". Do not encode examples as universal requirements. State when a specimen position is illustrative so review does not demand pixel-perfect matching at every viewport.

## Tokens and Tailwind

Design for the project's installed Tailwind version. This starter uses v4: theme variables map to utilities through `@theme`, not a new legacy JavaScript configuration. Use proper namespaces such as `--color-*`, `--font-*`, `--text-*`, `--spacing-*`, `--container-*`, `--radius-*`, and `--shadow-*`. Include any `--text-…--line-height` companion values. Font loading declarations are separate from theme tokens.

Give each token a literal CSS-compatible value and role. List multiple utilities where appropriate (one color can drive background, text, and border). Record the numeric spacing base if using numeric utilities. Replacing spacing should not accidentally remove every sizing utility. Reuse allowed defaults deliberately; do not reset all namespaces merely to demonstrate customization. Record permitted color alpha/state variants and font weight/size variants so review can distinguish approved derivations from drift.

Source: [Tailwind theme variables](https://tailwindcss.com/docs/theme). Consult current documentation when implementing mappings for a different version.

## Human-readable specimen

Show the direction and reference rationale, color/type/spacing specimens, relevant component states, full-page outline, and header/hero plus one representative section at desktop and mobile widths. Identify viewport dimensions. Include selected and required font weights, real business subject matter, and disclosed placeholders.

Make the HTML viewable without a JavaScript framework, remote Tailwind runtime, or a separate build step. For this documentation artifact, token declarations in `:root` and inline styles consuming those tokens are acceptable; they are not application CSS. Avoid handwritten component classes here too. Either render specimen values from the embedded data or verify each against it; do not maintain contradictory token tables. External/local font and image dependencies must be declared and have understandable fallbacks. Use resolved paths from this nested HTML location, not assumed project-root browser paths.

The actual site must use Tailwind utilities and the application styling policy. The documentation artifact's inline styles are not a shortcut for implementation.
