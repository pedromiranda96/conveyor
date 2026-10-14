import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, readlinkSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, describe, test } from "node:test";
import { fileURLToPath } from "node:url";

const BIN = fileURLToPath(new URL("../bin/conveyor.js", import.meta.url));
const ENV = {
  ...process.env,
  GIT_CONFIG_GLOBAL: "/dev/null",
  GIT_CONFIG_NOSYSTEM: "1",
  GIT_AUTHOR_NAME: "Test",
  GIT_AUTHOR_EMAIL: "test@example.com",
  GIT_COMMITTER_NAME: "Test",
  GIT_COMMITTER_EMAIL: "test@example.com",
  NO_COLOR: "1",
};

const dirs = [];
after(() => dirs.forEach((dir) => rmSync(dir, { recursive: true, force: true })));

function project({ tailwind = true, commit = true } = {}) {
  const dir = mkdtempSync(join(tmpdir(), "conveyor-test-"));
  dirs.push(dir);
  const deps = tailwind ? { astro: "^5.0.0", tailwindcss: "^4.0.0" } : { astro: "^5.0.0" };
  writeFileSync(join(dir, "package.json"), JSON.stringify({ name: "site", dependencies: deps }));
  if (commit) {
    git(dir, "init", "-q");
    git(dir, "add", "-A");
    git(dir, "commit", "-q", "-m", "scaffold");
  }
  return dir;
}

const git = (cwd, ...args) => execFileSync("git", args, { cwd, env: ENV, encoding: "utf8" }).trim();
const run = (cwd, ...args) => spawnSync("node", [BIN, ...args], { cwd, env: ENV, encoding: "utf8" });
const read = (dir, file) => readFileSync(join(dir, file), "utf8");
const commitCount = (dir) => Number(git(dir, "rev-list", "--count", "HEAD"));

describe("init", () => {
  test("adds managed files, links skills for Claude, commits, and tags the baseline", () => {
    const dir = project();
    const result = run(dir, "init");
    assert.equal(result.status, 0, result.stderr);

    assert.ok(existsSync(join(dir, ".agents/skills/conveyor-brief/SKILL.md")));
    assert.ok(existsSync(join(dir, ".conveyor/workflow.md")));
    assert.ok(existsSync(join(dir, ".conveyor/brand/README.md")));
    assert.equal(readlinkSync(join(dir, ".claude/skills")), "../.agents/skills");

    const state = JSON.parse(read(dir, ".conveyor/conveyor.json"));
    assert.ok(state.files.includes(".conveyor/workflow.md"));
    assert.equal(git(dir, "status", "--porcelain"), "");
    assert.equal(git(dir, "rev-parse", "conveyor/baseline"), git(dir, "rev-parse", "HEAD"));
    assert.equal(commitCount(dir), 2);
  });

  test("initializes git and makes the first commit when there is no repository", () => {
    const dir = project({ commit: false });
    const result = run(dir, "init");
    assert.equal(result.status, 0, result.stderr);
    assert.equal(commitCount(dir), 1);
    assert.equal(git(dir, "status", "--porcelain"), "");
  });

  test("refuses a folder without package.json unless forced", () => {
    const dir = mkdtempSync(join(tmpdir(), "conveyor-test-"));
    dirs.push(dir);
    assert.match(run(dir, "init").stderr, /Scaffold the site first/);
    assert.ok(!existsSync(join(dir, ".git")));
    assert.equal(run(dir, "init", "--force").status, 0);
    assert.ok(existsSync(join(dir, ".conveyor/workflow.md")));
  });

  test("warns when Tailwind is missing", () => {
    const dir = project({ tailwind: false });
    const result = run(dir, "init");
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stderr, /Tailwind CSS is not installed/);
  });

  test("refuses a dirty working tree and a second init", () => {
    const dir = project();
    writeFileSync(join(dir, "notes.txt"), "wip");
    assert.match(run(dir, "init").stderr, /uncommitted changes/);
    rmSync(join(dir, "notes.txt"));

    assert.equal(run(dir, "init").status, 0);
    assert.match(run(dir, "init").stderr, /already set up/);
  });

  test("adds per-skill links when .claude/skills is a real directory", () => {
    const dir = project();
    mkdirSync(join(dir, ".claude/skills/my-skill"), { recursive: true });
    writeFileSync(join(dir, ".claude/skills/my-skill/SKILL.md"), "mine");
    git(dir, "add", "-A");
    git(dir, "commit", "-q", "-m", "own skill");

    assert.equal(run(dir, "init").status, 0);
    assert.ok(lstatSync(join(dir, ".claude/skills")).isDirectory());
    assert.equal(readlinkSync(join(dir, ".claude/skills/conveyor-review")), "../../.agents/skills/conveyor-review");
    assert.equal(read(dir, ".claude/skills/my-skill/SKILL.md"), "mine");
  });
});

describe("sync", () => {
  test("restores managed files, removes files no longer shipped, and leaves changes uncommitted", () => {
    const dir = project();
    run(dir, "init");
    const original = read(dir, ".conveyor/workflow.md");

    writeFileSync(join(dir, ".conveyor/workflow.md"), "edited");
    mkdirSync(join(dir, ".agents/skills/old-skill"));
    writeFileSync(join(dir, ".agents/skills/old-skill/SKILL.md"), "old");
    const state = JSON.parse(read(dir, ".conveyor/conveyor.json"));
    state.files.push(".agents/skills/old-skill/SKILL.md");
    writeFileSync(join(dir, ".conveyor/conveyor.json"), JSON.stringify(state));
    writeFileSync(join(dir, "AGENTS.md"), "project instructions");
    git(dir, "add", "-A");
    git(dir, "commit", "-q", "-m", "drift");

    const result = run(dir, "sync");
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /~ \.conveyor\/workflow\.md/);
    assert.match(result.stdout, /- \.agents\/skills\/old-skill\/SKILL\.md/);
    assert.equal(read(dir, ".conveyor/workflow.md"), original);
    assert.ok(!existsSync(join(dir, ".agents/skills/old-skill")));
    assert.equal(read(dir, "AGENTS.md"), "project instructions");
    assert.notEqual(git(dir, "status", "--porcelain"), "");
  });

  test("refuses uncommitted changes and uninitialized projects", () => {
    const dir = project();
    assert.match(run(dir, "sync").stderr, /not set up/);
    run(dir, "init");
    writeFileSync(join(dir, "wip.txt"), "wip");
    assert.match(run(dir, "sync").stderr, /uncommitted changes/);
    assert.equal(run(dir, "sync", "--force").status, 0);
  });

  test("reports when already up to date", () => {
    const dir = project();
    run(dir, "init");
    assert.match(run(dir, "sync").stdout, /Already up to date/);
  });
});

describe("reset", () => {
  test("restores the baseline as a new commit, removing later work", () => {
    const dir = project();
    run(dir, "init");
    mkdirSync(join(dir, ".conveyor/brand"), { recursive: true });
    writeFileSync(join(dir, ".conveyor/brand/logo.svg"), "<svg/>");
    writeFileSync(join(dir, "package.json"), JSON.stringify({ name: "site", dependencies: { tailwindcss: "^4.0.0" } }));
    git(dir, "add", "-A");
    git(dir, "commit", "-q", "-m", "work");
    const before = commitCount(dir);

    const result = run(dir, "reset", "--yes", "--no-install");
    assert.equal(result.status, 0, result.stderr);
    assert.ok(!existsSync(join(dir, ".conveyor/brand/logo.svg")));
    assert.ok(existsSync(join(dir, ".conveyor/brand/README.md")));
    assert.equal(git(dir, "diff", "conveyor/baseline", "HEAD", "--stat"), "");
    assert.equal(commitCount(dir), before + 1);
    assert.match(result.stderr, /Dependencies changed/);
  });

  test("requires confirmation, a clean tree, and a baseline", () => {
    const dir = project();
    assert.match(run(dir, "reset", "--yes").stderr, /No conveyor\/baseline tag/);
    run(dir, "init");
    assert.match(run(dir, "reset").stderr, /--yes/);

    writeFileSync(join(dir, "wip.txt"), "wip");
    assert.match(run(dir, "reset", "--yes").stderr, /uncommitted changes/);
    assert.equal(run(dir, "reset", "--yes", "--force").status, 0);
    assert.ok(!existsSync(join(dir, "wip.txt")));
  });
});

test("rejects unknown commands and options", () => {
  const dir = project();
  assert.equal(run(dir, "deploy").status, 1);
  assert.equal(run(dir, "init", "--nope").status, 1);
  assert.equal(run(dir, "--version").stdout.trim(), JSON.parse(readFileSync(new URL("../package.json", import.meta.url))).version);
});
