# Conveyor

Conveyor is an agent workflow for producing pitch-ready institutional sites: brief → design → implement → review. This repository is the `conveyor` CLI, which installs the workflow's skills and `.conveyor/` folder into a web project and keeps them up to date.

## Access

The repository is private. To use the CLI you need read access to `github.com/pedromiranda96/conveyor` and an SSH key registered with GitHub (`ssh -T git@github.com` should greet you). Nothing is published to a registry.

## Usage

Scaffold the site with the framework's own tool, then add Conveyor from the project root:

```sh
pnpm create astro@latest my-site
cd my-site
pnpm astro add tailwind
git add -A && git commit -m "add tailwind"
pnpm dlx github:pedromiranda96/conveyor#v0.4.0 init
```

We usually scaffold with Astro and Tailwind, but any framework works: the skills detect the stack from the project. Tailwind is preferred, not required. The agent uses it when installed, keeps a styling system the project already has, adds Tailwind when neither applies, and falls back to plain CSS only when Tailwind can't be used with the stack or you decline it.

**Always include a release tag** (`#v0.4.0`). `pnpm dlx` and `npx` cache packages by the exact text you type, so a bare `github:pedromiranda96/conveyor` keeps reusing whatever copy was downloaded first. A new tag is new text, so it always downloads fresh. Each command checks GitHub for newer tags and prints the exact command to run when one exists. `npx` works the same way as `pnpm dlx`.

### `init`

Copies the managed files into the project, exposes the skills to Claude Code through `.claude/skills`, and records the installed version and file list in `.conveyor/conveyor.json`. It then commits and tags that commit `conveyor/baseline`. The project must already be scaffolded (`init` refuses a folder without `package.json`). If the folder is not a git repository yet, `init` creates one. The working tree must otherwise be clean.

### `sync`

Replaces the managed files with the CLI's current copies and deletes managed files that a newer version no longer ships. The changes are left uncommitted so you can review them with `git diff`. `AGENTS.md`, site code, and dependencies are never touched; project-specific agent instructions belong in `AGENTS.md`.

### `reset`

Restores the project to `conveyor/baseline`: brand files, references, generated artifacts, and site changes are all removed. The reset is a new commit, so earlier work stays in git history. It asks for confirmation (`--yes` skips it) and reinstalls dependencies if they changed (`--no-install` skips that). The files restored are the ones from `init`; run `sync` afterwards to get the latest skills.

## Managed files

Everything in [`template/`](template/) is copied into projects at the same path:

- `.agents/skills/`: the `conveyor-brief`, `conveyor-design`, `conveyor-implement`, and `conveyor-review` skills, plus `frontend-design`, vendored from [anthropics/skills](https://github.com/anthropics/skills) under its Apache 2.0 license.
- `.conveyor/workflow.md`: shared rules every skill reads.
- `.conveyor/brand/README.md` and `.conveyor/references/README.md`: instructions for supplying brand files and design references.

## Development

Edit skills and workflow docs in `template/`. Run `npm test` to exercise the commands against temporary git repositories. To try a local checkout in a project, run `node /path/to/conveyor/bin/conveyor.js <command>` from that project's root.

To release, bump `version` in `package.json`, commit, tag `vX.Y.Z`, and push with `--tags`. Tag every change meant for projects: untagged commits on `main` never reach users who follow the tag convention, and the version in `.conveyor/conveyor.json` only distinguishes releases if each one bumps it.

Set `CONVEYOR_NO_UPDATE_CHECK=1` to skip the update check (the tests do).
