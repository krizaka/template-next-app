import test from "node:test";
import assert from "node:assert/strict";
import { drift } from "./check-template-drift.mjs";

test("reports the shared files that differ from the reference, and only those", async () => {
  const local = { a: "1", b: "2", c: "3" };
  const ref = { a: "1", b: "CHANGED", c: "3" };
  assert.deepEqual(await drift({ read: (f) => local[f], fetchText: async (f) => ref[f], files: ["a", "b", "c"] }), [
    "b",
  ]);
  assert.deepEqual(await drift({ read: (f) => local[f], fetchText: async (f) => local[f], files: ["a", "b"] }), []);
});
