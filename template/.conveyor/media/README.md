# Supplied media

Put images you already have in this folder: photography of the business, its team, work, products, or premises; stock you have licensed; illustrations; or images from an earlier site. `$conveyor-media` uses them first when filling the design's image slots, before proposing new stock or generated imagery.

Logos, fonts, and brand guidelines belong in `.conveyor/brand/`. Design inspiration from other websites belongs in `.conveyor/references/`.

Useful layout, all optional:

```text
team/
premises/
work/
stock/
media.md
```

Folder names are hints; the agent still inspects each file. Use original-resolution files when possible: a large image can be cropped for several layouts, and a small one cannot be enlarged without losing quality.

`media.md` is optional but important for anything the files cannot say themselves:

- **What an image shows**, when it is not obvious ("our Lisbon workshop, 2024").
- **Whether it depicts the actual business.** Only real photos of the business can appear as the business's people, premises, work, or products. Without a note, the agent does not assume an image does.
- **Source and license** for stock or third-party images, including any credit the license requires.
- **Approval:** which images are cleared for public use, and any people or places that must not appear.

Files here are treated as supplied originals: they are never modified or moved. Cropped or treated versions are saved in `.conveyor/generated/media/` with a record of where they came from.
