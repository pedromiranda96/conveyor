import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { VERSION } from "./template.js";

const run = promisify(execFile);
const REMOTES = [
  "https://github.com/pedromiranda96/conveyor.git",
  "git@github.com:pedromiranda96/conveyor.git",
];

export function compareVersions(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) - (pb[i] ?? 0);
  }
  return 0;
}

/** Highest `vX.Y.Z` tag in `git ls-remote --tags` output, without the `v`. */
export function latestTag(lsRemoteOutput) {
  const versions = [...lsRemoteOutput.matchAll(/refs\/tags\/v(\d+\.\d+\.\d+)$/gm)].map((match) => match[1]);
  return versions.sort(compareVersions).at(-1) ?? null;
}

/**
 * Resolves to the newest released version when it is newer than this CLI,
 * otherwise null. Never prompts for credentials and ignores every failure.
 */
export async function checkForUpdate() {
  if (process.env.CONVEYOR_NO_UPDATE_CHECK) return null;
  const env = {
    ...process.env,
    GIT_TERMINAL_PROMPT: "0",
    GIT_SSH_COMMAND: "ssh -o BatchMode=yes -o ConnectTimeout=3",
  };
  for (const remote of REMOTES) {
    try {
      const { stdout } = await run("git", ["ls-remote", "--tags", "--refs", remote], { env, timeout: 4000 });
      const latest = latestTag(stdout);
      return latest && compareVersions(latest, VERSION) > 0 ? latest : null;
    } catch {
      // Try the next remote; offline or unauthenticated users simply get no notice.
    }
  }
  return null;
}

export function updateCommand(version, command) {
  const runner = process.env.npm_config_user_agent?.startsWith("pnpm") ? "pnpm dlx" : "npx";
  return `${runner} github:pedromiranda96/conveyor#v${version} ${command}`;
}
