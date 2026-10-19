---
name: conveyor-media
description: Fill a Conveyor design's image slots with art-directed imagery. Use to treat and crop supplied photos, write stock search briefs or generation prompts, take in and select candidates, prepare canonical images with provenance, or replace an image; does not change site code.
---

# Conveyor Media

Fill the design's image slots and keep `.conveyor/generated/media.md` as their record. Own `.conveyor/generated/media/` and that record, not the slot specs, the site, or supplied originals. The goal is a coherent, specific image set for this business, not individually pleasant pictures.

Read `.conveyor/workflow.md`, especially Imagery and Brand and media sources, the brief, the design's `media`, `palette`, and `reference_translation`, the existing media record, and [media contract](references/media-contract.md). Discover current files in `.conveyor/media/` and `.conveyor/brand/`, with their optional `media.md` or `brand.md` notes.

## Plan the set

List the design's slots with their role, subject, aspect, focus, and treatment. For a design without `media`, derive slots as the workflow's Older artifacts describes and record them as inferred. Choose the request's scope: one named slot, a section, or every unfilled or changed slot. Leave slots outside the scope unchanged.

When a slot spec cannot be met truthfully, such as an evidence slot whose subject the business has no photos of, or an aspect that defeats its focal point, record the conflict as a design handoff and continue with the rest. Do not rewrite the spec.

## Use supplied images first

Inspect every candidate in `.conveyor/media/` and `.conveyor/brand/` at original resolution; filenames are not visual evidence. For each slot, weigh:

- **Eligibility:** an evidence slot accepts only images that notes or the user identify as the actual business.
- **Subject:** does it show what the slot must convey, or only something adjacent?
- **Crop:** does the focal point survive every aspect the slot needs, with room for overlaid text where specified?
- **Resolution:** is it large enough for the slot's minimum rendered width on high-density screens?
- **Rescue potential:** a well-composed but dull, tilted, or color-cast photo can be fixed; a blurred, cluttered, or tiny one usually cannot.

Treatment can raise ordinary photos to the set: crop, straighten, correct exposure and white balance, grade toward the set treatment, and reduce noise or dust. Never change what a real photo shows. Do not add, remove, or replace people, products, signage, or surroundings, and do not extend a real photo with generated content.

## Resolve the choice

For slots still unfilled, ask the workflow's imagery-choice question unless the user already answered for this scope. Ask once for the scope, not per image, and recommend per slot: illustrative slots can use stock or generation; evidence slots stay placeholders unless the user explicitly authorizes a pitch stand-in. Note when a better supplied photo would serve the site more than any stock image, so the user can ask the business for it. Continue with supplied images while waiting.

## Write briefs

For every slot to be sourced or generated, write a brief a person can run without conversation history. Make it specific to the brief's offer, audience, and locale: "a carpenter's hands fitting a walnut drawer front, workshop light from the left" and not "craftsman at work". Keep briefs consistent across the set so the results look like one shoot.

- **Stock search brief:** subject and action, setting, people who plausibly fit the audience and locale, composition and orientation with the crop-safe area, light, color relative to the palette, minimum resolution, several search-term variants (including the site's language when it is not English), and clichés to avoid, such as handshakes, headsets, pointing at laptops, lightbulbs, and generic skylines. State the license requirement: commercial web use, with any attribution the user accepts.
- **Generation prompt:** subject, setting, composition and framing, aspect ratio, camera and lens feel, light, palette and grade, texture, and what to exclude. Repeat the set's shared style anchors in every prompt. Exclude text, logos, trademarked products, and likenesses of real people. Never write a prompt meant to pass as the business's own people or premises.

## Acquire candidates

When the choice authorizes it and tools allow, acquire candidates yourself, several per slot when practical:

- **Stock:** use a source whose license permits commercial web use, read the license on the image's actual page, and record the page URL, author, license name and URL, access date, and credit requirement. Reject editorial-only, watermarked, or unlicensed images; a search engine's image results are not a license.
- **Generation:** use an available image-generation tool, recording tool and model, the full prompt, settings, date, and known usage terms.

Without suitable tools, give the user the briefs and stop for this slot. Ask them to save chosen files in `.conveyor/media/` with source and license in its `media.md`, or to name any path; the next invocation takes them in.

## Select and prepare

Inspect each candidate at full resolution against its slot and the set treatment, then compare the chosen set side by side. Reject generation artifacts (hands, warped geometry, garbled text, uncanny faces), visible third-party branding, and images that contradict the brief's facts, such as the wrong region, season, or kind of client.

Write one canonical master per slot to `.conveyor/generated/media/`, named after the slot ID. Keep enough surrounding area for every aspect the slot needs and record the focal point, so implementation can crop per breakpoint; prepare separate art-directed crops only when aspects differ too much for one master. Apply only the file-level parts of the treatment, leaving code-level overlays and filters to implementation. Save at high quality, at least twice the slot's largest rendered width when the source allows; responsive sizes and delivery formats are implementation's work. Strip location and camera metadata from supplied photos. Write a replacement to a new path so the current site keeps working until implementation switches to it.

Use image tools already available, such as the project's image library, ImageMagick, `sips`, or a Python imaging library; do not install tools silently. If nothing can process images, record the intended crop, focal point, and treatment for implementation and mark the file unprepared.

## Verify and record

Inspect each prepared file you wrote, confirm its dimensions and focal point, and check that supplied originals are unchanged. Record choices, set treatment, slot states, briefs, provenance, and an entry as the contract describes; never present stock or generated images as real business photos, and flag credits or disclosures implementation must place.

Do not change brief, design, site code, or other stages' records. Finish with the record link, filled slots, placeholders, briefs awaiting the user, design handoffs, and the next step: `$conveyor-implement` to place the new media. Do not invoke it.
