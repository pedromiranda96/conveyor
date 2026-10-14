import { parseArgs } from "node:util";
import { init } from "./commands/init.js";
import { sync } from "./commands/sync.js";
import { reset } from "./commands/reset.js";
import { CliError, log } from "./log.js";
import { VERSION } from "./template.js";
import { checkForUpdate, updateCommand } from "./update.js";

const HELP = `conveyor ${VERSION}

Usage: conveyor <command> [options]

Commands:
  init     Add Conveyor skills and .conveyor/ to the project in the current directory,
           commit them, and tag the commit as conveyor/baseline
  sync     Replace Conveyor-managed files with this version's copies (left uncommitted)
  reset    Restore the project to conveyor/baseline, discarding all work since

Options:
  -y, --yes        Skip the reset confirmation prompt
  --force          init: allow a missing package.json or re-tag an existing baseline;
                   sync: allow uncommitted changes
                   or a downgrade; reset: discard uncommitted and untracked files
  --no-install     reset: skip reinstalling dependencies
  -h, --help       Show this help
  -v, --version    Show the version

Run commands from the project root (the git repository root).`;

const COMMANDS = { init, sync, reset };

export async function main(argv) {
  let parsed;
  try {
    parsed = parseArgs({
      args: argv,
      allowPositionals: true,
      options: {
        yes: { type: "boolean", short: "y" },
        force: { type: "boolean" },
        "no-install": { type: "boolean" },
        help: { type: "boolean", short: "h" },
        version: { type: "boolean", short: "v" },
      },
    });
  } catch (error) {
    log.error(error.message);
    return 1;
  }

  const { values, positionals } = parsed;
  if (values.version) {
    console.log(VERSION);
    return 0;
  }
  const [name, ...rest] = positionals;
  if (values.help || !name) {
    console.log(HELP);
    return values.help ? 0 : 1;
  }
  const command = COMMANDS[name];
  if (!command) {
    log.error(`Unknown command "${name}". Run "conveyor --help".`);
    return 1;
  }
  if (rest.length) {
    log.error(`Unexpected argument "${rest[0]}". Run conveyor from the project root.`);
    return 1;
  }

  const update = checkForUpdate();
  try {
    await command({
      root: process.cwd(),
      yes: Boolean(values.yes),
      force: Boolean(values.force),
      install: !values["no-install"],
    });
    return 0;
  } catch (error) {
    if (error instanceof CliError) {
      log.error(error.message);
      return 1;
    }
    throw error;
  } finally {
    const latest = await update;
    if (latest) {
      log.warn(`conveyor ${latest} is available (this is ${VERSION}). Run: ${updateCommand(latest, name)}`);
    }
  }
}
