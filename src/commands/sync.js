import { assertRepoRoot, isDirty } from "../git.js";
import { CliError, log } from "../log.js";
import { linkClaudeSkills } from "../project.js";
import { applyTemplate, readState, templateSkills, VERSION, writeState } from "../template.js";

function compareVersions(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) - (pb[i] ?? 0);
  }
  return 0;
}

export async function sync({ root, force }) {
  const state = await readState(root);
  if (!state) throw new CliError("Conveyor is not set up here. Run `conveyor init` first.");
  assertRepoRoot(root);

  if (isDirty(root) && !force) {
    throw new CliError(
      "The working tree has uncommitted changes. Commit them first so the sync shows up as a clean diff, or pass --force.",
    );
  }
  if (compareVersions(VERSION, state.version) < 0 && !force) {
    throw new CliError(
      `This project was synced with conveyor ${state.version}, newer than this CLI (${VERSION}). Pass --force to downgrade.`,
    );
  }

  const { files, added, updated, removed } = await applyTemplate(root, state.files ?? []);
  await linkClaudeSkills(root, await templateSkills());
  await writeState(root, files);

  const changes = [
    ...added.map((file) => `  + ${file}`),
    ...updated.map((file) => `  ~ ${file}`),
    ...removed.map((file) => `  - ${file}`),
  ];
  if (!changes.length) {
    log.success(`Already up to date with conveyor ${VERSION}`);
    return;
  }
  log.info(changes.join("\n"));
  log.success(`Synced ${state.version} → ${VERSION}. Review with \`git diff\` and commit when ready.`);
}
