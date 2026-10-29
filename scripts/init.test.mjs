import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fill, init, validate } from "./init.mjs";

test("fill replaces both placeholders everywhere", () => {
  assert.equal(
    fill("www.__PRODUCT__.com — __Product__ / __PRODUCT__", "myproduct", "Myproduct"),
    "www.myproduct.com — Myproduct / myproduct",
  );
});

test("validate refuses a bad slug or name", () => {
  assert.doesNotThrow(() => validate("akinaza", "Akinaza"));
  for (const slug of ["", "Akinaza", "a-b", "1abc", undefined]) assert.throws(() => validate(slug, "X"), /slug/);
  assert.throws(() => validate("ok", 'a"b'), /display/);
});

test("init fills a tree, skips node_modules, and leaves no placeholder", () => {
  const dir = mkdtempSync(join(tmpdir(), "tpl-"));
  mkdirSync(join(dir, "a/node_modules"), { recursive: true });
  writeFileSync(join(dir, "a/x.json"), '{"name":"@__PRODUCT__/web","t":"__Product__"}');
  writeFileSync(join(dir, "a/node_modules/y.js"), "__PRODUCT__");
  assert.equal(init(dir, "yomizaka", "Yomizaka"), 1);
  assert.equal(readFileSync(join(dir, "a/x.json"), "utf8"), '{"name":"@yomizaka/web","t":"Yomizaka"}');
  assert.equal(readFileSync(join(dir, "a/node_modules/y.js"), "utf8"), "__PRODUCT__");
});
