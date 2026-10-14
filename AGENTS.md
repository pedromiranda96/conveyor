## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Conveyor workflow

For institutional site work, use the project skills in `.agents/skills/`:

- `conveyor-brief`: business requirements and page content.
- `conveyor-design`: visual direction, tokens, and HTML design artifact.
- `conveyor-implement`: initial site code, targeted tweaks, and review fixes.
- `conveyor-review`: independent inspection and review artifacts.

Read `.conveyor/workflow.md` for shared rules and artifact paths. Invoke stages and correction loops only within the user's requested scope. Brand inputs belong in `.conveyor/brand/`, reference views in `.conveyor/references/`, and generated artifacts in `.conveyor/generated/`. Newly selected/generated media belongs in `.conveyor/generated/media/`. These source paths are stack-independent; implementation maps them to its template's deployment locations. Review both reference/brand fidelity and implementation fidelity.

Implementation must NEVER invoke or delegate `conveyor-review`, even for a combined implementation/review request. It must not perform browser-based self-checks either: no browser automation/computer use, screenshots, computed-style or interaction inspection, or browser-backed tests, including headless tools invoked through scripts. Finish implementation and non-browser build/lint/type/test checks, then hand off. Review is separately invoked by the user and performed in another context or by a fresh-context reviewer agent. Implementation may consume existing reviews but must not write review artifacts or issue independent review verdicts.
