# Media record contract

Path: `.conveyor/generated/media.md`. Prepared files live in `.conveyor/generated/media/`. Preserve prior entries; this is a provenance record, not a conversation transcript.

Start with YAML frontmatter:

```yaml
artifact: conveyor-media
schema_version: 1
latest_entry: M001
brief_revision: B001
design_revision: D001
```

`brief_revision` and `design_revision` name the revisions the current slot states were prepared against. Use `null` when an artifact is missing.

## Imagery choices

Each choice the user made: scope (all slots, a section, or slot IDs), choice (supplied only, placeholder, stock, or generated), date, and provenance (the user's request or an earlier artifact). Record each evidence-slot stand-in authorization separately, with its replace-before-launch requirement.

## Set treatment

The treatment actually applied, by reference to the design's `media.treatment`: concrete parameters such as grade direction, crop conventions, and the tools used. Record any deviation and its reason.

## Slots

One subsection per design slot ID, including slots outside this entry's scope once they have been recorded:

- `status`: `supplied`, `stock`, `generated`, `placeholder`, `awaiting-candidates`, or `unfilled`; plus `inferred` when the slot came from an older design.
- Role (`evidence` or `illustrative`) and the design revision whose spec was used.
- Files: project-relative path, dimensions, format, focal point as percentages from the top-left, and which aspects each file serves; `unprepared` with intended crop and treatment when no tool could process it.
- Origin: the supplied original's path and note; for stock, provider, page URL, author, license name and URL, access date, and credit requirement; for generated, tool and model, prompt reference, settings, date, and usage terms.
- Transformations applied, and confirmation that location metadata was stripped from supplied photos.
- What the image actually shows, so implementation can write accurate alternative text.
- Disclosure or credit implementation must place, or none.
- Replacement needs, such as a stand-in or placeholder to replace before launch.
- Superseded files still in use by the site, until implementation switches.

## Briefs

The current search brief or generation prompt for each slot that has one, labeled by slot ID and the entry that last changed it. Superseded briefs stay in their entries.

## Entries

Each entry has a unique `M…` heading and:

- Timestamp with timezone; request and scope.
- Brief/design revisions read.
- Slots changed and their new status; files added or replaced.
- Choices or authorizations recorded.
- Checks performed: files inspected, dimensions confirmed, originals confirmed unchanged.
- Handoffs: design conflicts, candidates awaited from the user, and slots ready for implementation.

Log actual work. A brief written but not yet run is `awaiting-candidates`, not filled.
