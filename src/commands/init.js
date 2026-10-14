import { BASELINE_TAG, git, hasBaseline, hasHead, isDirty, repoRoot, assertRepoRoot } from "../git.js";
import { CliError, log } from "../log.js";
import { checkProject, linkClaudeSkills } from "../project.js";
import { applyTemplate, readState, templateSkills, VERSION, writeState } from "../template.js";

export async function init({ root, force }) {
  if (await readState(root)) {
    throw new CliError("Conveyor is already set up here. Use `conveyor sync` to update it.");
  }

  checkProject(root);

  if (!repoRoot(root)) {
    log.step("Initializing a git repository");
    git(root, ["init", "-q"]);
  }
  assertRepoRoot(root);

  const firstCommit = !hasHead(root);
  if (!firstCommit && isDirty(root)) {
    throw new CliError("The working tree has uncommitted changes. Commit or stash them first.");
  }
  if (hasBaseline(root) && !force) {
    throw new CliError(`A ${BASELINE_TAG} tag already exists. Pass --force to move it to the new commit.`);
  }

  const { files } = await applyTemplate(root);
  await linkClaudeSkills(root, await templateSkills());
  await writeState(root, files);
  log.step(`Added ${files.length} Conveyor files`);

  git(root, ["add", "-A"]);
  const message = firstCommit ? `chore: initial commit with conveyor ${VERSION}` : `chore: add conveyor ${VERSION}`;
  git(root, ["commit", "-q", "-m", message]);
  git(root, ["tag", ...(force ? ["-f"] : []), BASELINE_TAG]);
  if (firstCommit) log.info("  The repository had no commits, so all current files were included in the first one.");
  log.success(`Committed and tagged ${BASELINE_TAG}`);

  log.info(`
Next steps:
  1. Put brand files in .conveyor/brand/ and design references in .conveyor/references/
  2. Ask your agent to run $conveyor-brief with the business information`);
}
