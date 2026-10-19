# Design references

Paste reference screenshots into this folder before running `$conveyor-design`. PNG, JPEG, and WebP are suitable. Prefer one design source; it may have several complementary views.

For a long page, provide its full composition and close-ups of the important treatments when available:

```text
composition.png
hero.png
solutions.png
products.png
footer.png
```

These can all be views of the same design. Say so in your prompt or notes. With different sources, group them in directories such as `reference-a/` and `reference-b/`, then identify which aspects to borrow. No fixed list of screenshots is required; `typography.png` or another descriptive name is equally useful. The agent asks when intended influence or grouping is unclear.

Use original-resolution images when possible. A full-page view conveys sequence and rhythm; close-ups convey typography, media composition, shadows, and small details. Cropping helps inspection but cannot recover detail absent from the original. The agent should inspect important regions separately and request a clearer view only when needed for a consequential choice.

References guide presentation. The business brief determines the content and goals. Screenshots are not permission to reuse another business's logo, copy, or photography.

Reference colors are not adopted automatically. Design reuses your established palette or asks whether you want to provide colors or derive them from the references. Related views share one source palette. Compatible independent sources can inform one coherent proposal; competing palettes require a choice unless you already specified the color source. Photograph colors are kept separate from interface colors.

If there are no usable reference images, the agent will ask whether to proceed without them. If you agree, it will propose multiple directions for you to choose from.

Put your own logos, fonts, and brand guidance in `.conveyor/brand/`, and images you already have in `.conveyor/media/`. Generated artifacts go in `.conveyor/generated/`; inspection crops may be saved under `.conveyor/generated/design/inspection/`, while prepared site imagery belongs in `.conveyor/generated/media/`. Keep original reference inputs here.
