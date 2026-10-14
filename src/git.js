import { execFileSync } from "node:child_process";
import { realpathSync } from "node:fs";
import { CliError } from "./log.js";

export const BASELINE_TAG = "conveyor/baseline";

export function git(root, args) {
  try {
    return execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch (error) {
    if (error.code === "ENOENT") throw new CliError("git is not installed or not on PATH.");
    const detail = error.stderr?.toString().trim() || error.message;
    throw new CliError(`git ${args[0]} failed:\n${detail}`);
  }
}

function succeeds(root, args) {
  try {
    execFileSync("git", args, { cwd: root, stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

export function repoRoot(root) {
  try {
    return execFileSync("git", ["rev-parse", "--show-toplevel"], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

/** Throws unless `root` is the top level of a git repository. */
export function assertRepoRoot(root) {
  const top = repoRoot(root);
  if (!top) throw new CliError("Not a git repository. Run `conveyor init` first.");
  if (realpathSync(top) !== realpathSync(root)) {
    throw new CliError(`Run conveyor from the repository root: ${top}`);
  }
}

export const hasHead = (root) => succeeds(root, ["rev-parse", "--verify", "-q", "HEAD"]);

export const hasBaseline = (root) =>
  succeeds(root, ["rev-parse", "--verify", "-q", `refs/tags/${BASELINE_TAG}`]);

export const isDirty = (root) => git(root, ["status", "--porcelain"]) !== "";

/** True when `paths` differ between two revisions. */
export const pathsDiffer = (root, from, to, paths) =>
  !succeeds(root, ["diff", "--quiet", from, to, "--", ...paths]);

export const hasStagedChanges = (root) => !succeeds(root, ["diff", "--cached", "--quiet"]);
