## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Conveyor workflow

For institutional site work, use the project skills in `.agents/skills/`:

- `conveyor-brief`: business requirements and page content.
- `conveyor-design`: visual direction, tokens, and HTML design artifact.
- `conveyor-implement`: initial site code, targeted tweaks, and review fixes.
- `conveyor-review`: independent inspection and review artifacts.

Read `.conveyor/workflow.md` for shared rules and artifact paths. Invoke stages and correction loops only within the user's requested scope. Generated artifacts belong in `.conveyor/generated/`; reference inputs belong in `.conveyor/references/`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
