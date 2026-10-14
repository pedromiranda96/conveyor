import { readFileSync } from "node:fs";
import { mkdir, readFile, readdir, rm, rmdir, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, normalize, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { CliError } from "./log.js";

const PACKAGE_ROOT = fileURLToPath(new URL("..", import.meta.url));
export const TEMPLATE_DIR = join(PACKAGE_ROOT, "template");
export const VERSION = JSON.parse(readFileSync(join(PACKAGE_ROOT, "package.json"), "utf8")).version;

export const STATE_FILE = ".conveyor/conveyor.json";
export const SKILLS_DIR = ".agents/skills";

const IGNORED = new Set([".DS_Store"]);

/** Project-relative POSIX paths of every file the CLI manages. */
export async function templateFiles() {
  const entries = await readdir(TEMPLATE_DIR, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && !IGNORED.has(entry.name))
    .map((entry) => relative(TEMPLATE_DIR, join(entry.parentPath, entry.name)).split(sep).join("/"))
    .sort();
}

export async function templateSkills() {
  const entries = await readdir(join(TEMPLATE_DIR, SKILLS_DIR), { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

export async function readState(root) {
  try {
    return JSON.parse(await readFile(join(root, STATE_FILE), "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw new CliError(`Could not read ${STATE_FILE}: ${error.message}`);
  }
}

export async function writeState(root, files) {
  const state = { version: VERSION, files };
  await writeFile(join(root, STATE_FILE), `${JSON.stringify(state, null, 2)}\n`);
}

async function readOrNull(path) {
  try {
    return await readFile(path);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

/** Resolves a recorded path inside `root`, rejecting anything that escapes it. */
function managedPath(root, file) {
  const path = normalize(file);
  if (isAbsolute(path) || path.startsWith("..")) {
    throw new CliError(`Refusing to touch "${file}" listed in ${STATE_FILE}: it is outside the project.`);
  }
  return join(root, path);
}

async function removeEmptyParents(root, path) {
  for (let dir = dirname(path); dir !== root && dir.startsWith(root); dir = dirname(dir)) {
    try {
      await rmdir(dir);
    } catch {
      return;
    }
  }
}

/**
 * Copies every template file into `root` and deletes files recorded in
 * `previous` that this version no longer ships.
 */
export async function applyTemplate(root, previous = []) {
  const files = await templateFiles();
  const result = { files, added: [], updated: [], removed: [] };

  for (const file of files) {
    const source = await readFile(join(TEMPLATE_DIR, file));
    const target = join(root, file);
    const current = await readOrNull(target);
    if (current?.equals(source)) continue;
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, source);
    (current ? result.updated : result.added).push(file);
  }

  const shipped = new Set(files);
  for (const file of previous) {
    if (shipped.has(file)) continue;
    const target = managedPath(root, file);
    if ((await readOrNull(target)) === null) continue;
    await rm(target);
    await removeEmptyParents(root, target);
    result.removed.push(file);
  }

  return result;
}
