# Brand materials

Put the business's own brand files in this folder before running `$conveyor-brief` or `$conveyor-design`. A single logo is enough to start; add more when it becomes available.

Useful files:

```text
logo.svg
logo-white.svg
symbol.svg
fonts/
photos/
brand-guidelines.pdf
brand.md
```

- **Logos and symbols:** prefer SVG, otherwise a large transparent PNG. Name variants by intended background when relevant, such as `logo-dark.svg` for light backgrounds and `logo-white.svg` for dark ones. Names are hints; the agent still inspects each file.
- **Fonts:** licensed font files, or a note in `brand.md` naming the family and where it is hosted (for example, Google Fonts). Include the weights the brand uses.
- **Photos:** real photography of the business, team, products, or location. Group them in subfolders if that helps.
- **Guidelines:** brand books, style guides, or any document with usage rules.

`brand.md` is optional. Use it for rules that are not obvious from the files: official color values, logo restrictions ("never place the logo on red"), required taglines, tone of voice, or which photos are approved for public use.

Files here are treated as supplied originals: they are never modified or moved. Colors the agent infers from a logo are proposals, not official palette values, unless you confirm them. Newly sourced or generated media goes in `.conveyor/generated/media/`, not here. Design inspiration from other websites belongs in `.conveyor/references/`.
