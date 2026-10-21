#!/usr/bin/env node
// The files this template copies are « identical in every Krizaka repository » by contract (krizaka-com AGENTS.md §2.4 and « Static rules »).
// This compares them with the reference repository's main, and fails when the template has fallen behind.
// Usage: node scripts/check-template-drift.mjs   (needs network; GH_TOKEN optional)
import { readFileSync } from "node:fs";

// file -> the repository whose main is its reference (sg-ratchet: the six product repos agree; the SEO guard: krizaka-com owns the contract)
export const SHARED = { "scripts/sg-ratchet.mjs": "akinaza", "scripts/check-seo-family.mjs": "krizaka-com" };
const RAW = (repo, f) => `https://raw.githubusercontent.com/krizaka/${repo}/main/${f}`;

/** Names of the shared files whose content differs from the reference. */
export async function drift({ read = (p) => readFileSync(p, "utf8"), fetchText, files = Object.keys(SHARED), source = (f) => f } = {}) {
  const out = [];
  for (const f of files) if (read(f) !== (await fetchText(f, SHARED[f]))) out.push(f);
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const fetchText = async (f, repo) => {
    const res = await fetch(RAW(repo, f), { headers: process.env.GH_TOKEN ? { Authorization: `Bearer ${process.env.GH_TOKEN}` } : {} });
    if (!res.ok) throw new Error(`${f}: ${res.status}`);
    return res.text();
  };
  const stale = await drift({ fetchText });
  if (stale.length) {
    console.error(`behind krizaka-com main: ${stale.join(", ")}`);
    process.exit(1);
  }
  console.log("no drift");
}
