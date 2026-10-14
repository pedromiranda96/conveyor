import { existsSync } from "node:fs";
import { lstat, mkdir, readdir, readlink, realpath, symlink, unlink } from "node:fs/promises";
import { join, resolve } from "node:path";
import { CliError, log } from "./log.js";
import { SKILLS_DIR } from "./template.js";

const CLAUDE_SKILLS = ".claude/skills";

const LOCKFILES = {
  "pnpm-lock.yaml": "pnpm",
  "yarn.lock": "yarn",
  "bun.lock": "bun",
  "bun.lockb": "bun",
  "package-lock.json": "npm",
};

export const DEPENDENCY_FILES = ["package.json", ...Object.keys(LOCKFILES)];

export function packageManager(root) {
  for (const [file, manager] of Object.entries(LOCKFILES)) {
    if (existsSync(join(root, file))) return manager;
  }
  return null;
}

/** Checks project prerequisites without changing anything. */
export function checkProject(root, { force }) {
  if (existsSync(join(root, "package.json"))) return;
  const message =
    "No package.json here. Scaffold the site first (for example `pnpm create astro@latest`), " +
    "then run `conveyor init` from its root.";
  if (!force) throw new CliError(`${message} Pass --force to continue anyway.`);
  log.warn(message);
}

async function lstatOrNull(path) {
  try {
    return await lstat(path);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function realpathOrNull(path) {
  try {
    return await realpath(path);
  } catch {
    return null;
  }
}

/**
 * Exposes `.agents/skills` to Claude Code. A missing `.claude/skills` becomes a
 * symlink to the whole directory; an existing real directory gets one symlink
 * per Conveyor skill, and dangling links to removed skills are cleaned up.
 */
export async function linkClaudeSkills(root, skills) {
  const linkDir = join(root, CLAUDE_SKILLS);
  const skillsDir = join(root, SKILLS_DIR);
  const stat = await lstatOrNull(linkDir);

  if (!stat) {
    await mkdir(join(root, ".claude"), { recursive: true });
    await symlink(`../${SKILLS_DIR}`, linkDir);
    return;
  }

  if (stat.isSymbolicLink()) {
    if ((await realpathOrNull(linkDir)) !== (await realpath(skillsDir))) {
      log.warn(`${CLAUDE_SKILLS} is a symlink to somewhere else; Claude Code may not see Conveyor skills.`);
    }
    return;
  }

  if (!stat.isDirectory()) {
    log.warn(`${CLAUDE_SKILLS} is not a directory; Claude Code may not see Conveyor skills.`);
    return;
  }

  for (const skill of skills) {
    const link = join(linkDir, skill);
    const existing = await lstatOrNull(link);
    if (!existing) {
      await symlink(`../../${SKILLS_DIR}/${skill}`, link);
    } else if ((await realpathOrNull(link)) !== (await realpath(join(skillsDir, skill)))) {
      log.warn(`${CLAUDE_SKILLS}/${skill} already exists and was left untouched.`);
    }
  }

  for (const entry of await readdir(linkDir, { withFileTypes: true })) {
    if (!entry.isSymbolicLink()) continue;
    const link = join(linkDir, entry.name);
    const target = resolve(linkDir, await readlink(link));
    if (target.startsWith(skillsDir) && !(await realpathOrNull(link))) await unlink(link);
  }
}
