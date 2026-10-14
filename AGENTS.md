# Conveyor CLI

This repository is the `conveyor` CLI, not a Conveyor site project. See `README.md` for what each command does.

- `template/` is copied verbatim into projects by `init` and `sync`. Editing a skill or `.conveyor/workflow.md` means editing it there. Keep skills stack-agnostic: no framework-specific commands or paths, and no required styling technology. Tailwind is preferred through the styling order in `workflow.md`, so any Tailwind-specific rule needs a counterpart for the other approaches.
- `src/` is plain ESM JavaScript with no dependencies and no build step, because the package is installed straight from GitHub. Keep it that way and use only Node built-ins (Node >= 20.12).
- Run `npm test` after changes. Tests run the CLI against temporary git repositories in `test/cli.test.js`.
