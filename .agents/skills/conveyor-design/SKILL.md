---
name: conveyor-design
description: Create or revise Conveyor's inspectable HTML design system from a business brief and local visual references. Use to choose a visual direction, define tokens and composition, or change shared design decisions before applying them to site code.
---

# Conveyor Design

Own the visual contract at `.conveyor/generated/design/design-system.html`. The result must be useful both as a human-readable specimen and as explicit instructions for a fresh implementation/review agent.

Read `.conveyor/workflow.md`, the brief, an existing design artifact, and [design contract](references/design-contract.md). Read the installed `frontend-design/SKILL.md` for judgment about subject-specific direction, typography, composition, and restraint. Locate it among project skills; if unavailable, disclose that and use its principles as expressed in the brief rather than installing a dependency silently.

## Interpret references

Discover actual image files in `.conveyor/references/` (including nested directories), ignoring README/hidden metadata. Inspect the images with available image-reading tools; filenames alone are not visual evidence. Report corrupt or unsupported images rather than counting them as inspected. Do not fetch business facts or replacement references without a request.

Prefer one reference. Use filenames such as `composition.png`, `hero.png`, `typography.png`, and `footer.png`, plus the user's instructions, to determine each reference's role. When the intended influence is unclear, ask what the user likes about that image before committing to its direction. A single ambiguous filename is also a reason to ask. Record resolved intent so future revisions do not repeat the question. If references conflict within a role, ask which should guide that role or propose a coherent interpretation for the user to resolve.

If no usable references remain, ask whether to continue without them unless already authorized. Once authorized, offer two or three concrete directions grounded in the brief (type, palette, composition, rationale) and wait for selection. An existing chosen direction remains valid when references are absent on a later revision; do not reopen settled choices unnecessarily. Do not generate a final system from an unselected direction.

Borrow design relationships, not reference branding, facts, copy, or photos. References guide presentation; the brief controls content and visitor goals. Use supplied assets; if suitable imagery is missing, follow the workflow's asset-choice question. While waiting, describe image roles and placement without sourcing or generating images implicitly.

## Build the artifact

Choose a coherent direction and suitable fonts, including source/loading approach, required weights, and fallbacks. Define a compact Tailwind-compatible token system, component rules, ordered page composition, responsive behavior, and interaction states. Make rules measurable where review needs to verify them. Separate mandatory decisions from illustrative details and advisory principles.

Include tokens/components, a whole-page outline, and polished header/hero plus one representative section at desktop and mobile sizes. Use the brief's actual subject and proposed copy. Do not build a second full site here. The contract's embedded JSON is authoritative; specimens must use its values.

For revisions, read the existing artifact and, when available, inspect the site to understand impact. Change the requested direction while preserving unrelated decisions. Increment the design revision and keep scoped change notes. Do not change application code or claim that an implementation has applied this revision.

Verify JSON parses, specimen values match it, asset/font dependencies are declared, and both specimen sizes render when inspection tools are available. If visual verification is unavailable, say so. Show/open the saved HTML when supported, then link it with a concise explanation of the direction, changes, and remaining decisions. Do not add a routine approval gate when references and instructions already establish direction.
