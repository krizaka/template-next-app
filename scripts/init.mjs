#!/usr/bin/env node
// node scripts/init.mjs <product-slug> "<Display Name>" — turns the template into a product, then removes itself.
import { readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SKIP = new Set([".git", "node_modules", ".next", ".turbo"]);

/** Replaces the placeholders of one text. */
export function fill(text, slug, display) {
  return text.split("__PRODUCT__").join(slug).split("__Product__").join(display);
}

export function validate(slug, display) {
  if (!/^[a-z][a-z0-9]{1,30}$/.test(slug ?? "")) throw new Error("slug: lowercase letters and digits, starting with a letter (e.g. kachizaka)");
  if (!display || /[\n"\\]/.test(display)) throw new Error("display name: a short name without quotes");
}

export function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

export function init(root, slug, display) {
  validate(slug, display);
  let changed = 0;
  for (const file of walk(root)) {
    if (/\.(png|ico|webp|svg|woff2?)$/.test(file)) continue;
    const text = readFileSync(file, "utf8");
    const next = fill(text, slug, display);
    if (next !== text) (writeFileSync(file, next), changed++);
  }
  return changed;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [slug, display] = process.argv.slice(2);
  try {
    const n = init(process.cwd(), slug, display);
    rmSync(new URL(import.meta.url), { force: true });
    rmSync(new URL("./init.test.mjs", import.meta.url), { force: true });
    console.log(`${n} files filled for ${slug}; init removed itself.`);
  } catch (e) {
    console.error(e.message);
    process.exit(2);
  }
}
