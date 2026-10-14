import { execFileSync } from "node:child_process";
import { createInterface } from "node:readline/promises";
import {
  assertRepoRoot,
  BASELINE_TAG,
  git,
  hasBaseline,
  hasStagedChanges,
  isDirty,
  pathsDiffer,
} from "../git.js";
import { CliError, log } from "../log.js";
import { DEPENDENCY_FILES, packageManager } from "../project.js";

async function confirm(question) {
  if (!process.stdin.isTTY) {
    throw new CliError("Reset needs confirmation. Re-run with --yes to confirm non-interactively.");
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    return /^y(es)?$/i.test((await rl.question(`${question} [y/N] `)).trim());
  } finally {
    rl.close();
  }
}

export async function reset({ root, yes, force, install }) {
  assertRepoRoot(root);
  if (!hasBaseline(root)) {
    throw new CliError(`No ${BASELINE_TAG} tag found. Was this project set up with \`conveyor init\`?`);
  }
  const dirty = isDirty(root);
  if (dirty && !force) {
    throw new CliError("The working tree has uncommitted changes. Commit them first, or pass --force to discard them.");
  }

  const baseline = git(root, ["log", "-1", "--format=%h (%cs)", BASELINE_TAG]);
  log.info(
    `This restores the project to ${BASELINE_TAG} ${baseline}, removing everything added since: ` +
      "brand files, references, generated artifacts, and site changes.\n" +
      "The reset is recorded as a new commit, so earlier commits stay in history." +
      (dirty ? "\nUncommitted changes and untracked files will be permanently deleted." : ""),
  );
  if (!yes && !(await confirm("Continue?"))) {
    log.info("Reset cancelled.");
    return;
  }

  if (dirty) {
    git(root, ["reset", "-q", "--hard", "HEAD"]);
    git(root, ["clean", "-q", "-fd"]);
  }

  const dependenciesChanged = pathsDiffer(root, "HEAD", BASELINE_TAG, DEPENDENCY_FILES);
  git(root, ["restore", `--source=${BASELINE_TAG}`, "--staged", "--worktree", "--", "."]);

  if (!hasStagedChanges(root)) {
    log.success(`Already at ${BASELINE_TAG}; nothing to reset.`);
    return;
  }
  git(root, ["commit", "-q", "-m", `chore: reset to ${BASELINE_TAG}`]);
  log.success(`Reset to ${BASELINE_TAG} and committed`);

  if (!dependenciesChanged) return;
  const manager = packageManager(root);
  if (!install || !manager) {
    log.warn("Dependencies changed. Reinstall them before running the project.");
    return;
  }
  log.step(`Reinstalling dependencies with ${manager}`);
  try {
    execFileSync(manager, ["install"], { cwd: root, stdio: "inherit" });
  } catch {
    log.warn(`\`${manager} install\` failed. Run it manually.`);
  }
}
