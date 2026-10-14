import assert from "node:assert/strict";
import { test } from "node:test";
import { compareVersions, latestTag } from "../src/update.js";

test("compareVersions orders numerically, not lexically", () => {
  assert.ok(compareVersions("0.10.0", "0.9.0") > 0);
  assert.ok(compareVersions("1.0.0", "1.0.1") < 0);
  assert.equal(compareVersions("0.2.0", "0.2.0"), 0);
});

test("latestTag picks the highest release tag and ignores others", () => {
  const output = [
    "aaa\trefs/tags/v0.2.0",
    "bbb\trefs/tags/v0.10.0",
    "ccc\trefs/tags/v0.9.1",
    "ddd\trefs/tags/conveyor/baseline",
    "eee\trefs/tags/v1.0.0-beta",
  ].join("\n");
  assert.equal(latestTag(output), "0.10.0");
  assert.equal(latestTag(""), null);
});
