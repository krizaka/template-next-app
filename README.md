# template-next-app

The starting point of a Krizaka product site: a Next.js (App Router) pnpm/turbo monorepo with `apps/web`, wired to everything the family
shares. **It only wires**: the pipeline, deploy tool and UI are the org's reusable workflows and `@krizaka/*` packages, so a fix there
reaches every product without touching the template.

## How to start a product from this

1. On GitHub: **Use this template** → `krizaka/<product>` (private until the dev site is ready), or `gh repo create krizaka/<product> --template krizaka/template-next-app`.
2. Clone, then `node scripts/init.mjs <product> "<Product>"` (lowercase slug, display name): it fills the double-underscore placeholders (slug, display name)
   everywhere, then deletes itself. Commit that as the first commit.
3. `pnpm install && pnpm check` (lint with ast-grep ratchet and i18n check, typecheck, tests) and `pnpm build`.
4. Protect `main` like the org's other repos (PR + required check `Lint · Typecheck · Tests · Build`, squash only).
5. Brand: add the product's tokens to `@krizaka/tokens` and the import in `apps/web/app/globals.css`; marks come from `@krizaka/ui`.
6. Deploy: `deploy/digitalocean/app.yaml` (create the app once, then `krizaka-deploy deploy --apply` — always `--context default`,
   pull main first). Fill `dev-preview.json` honestly; claim the badge only when it is complete.

## What is in it (and where the truth stays)

| Piece | Here | Truth |
| --- | --- | --- |
| CI | `.github/workflows/ci.yml` (≈10 lines) | `krizaka/.github` `node-ci.yml` |
| Dependabot auto-merge, scorecard | thin workflows | `krizaka/.github` |
| Deploy | `.krizaka-deploy.json`, `deploy/digitalocean/app.yaml` (www rule, no route list) | `krizaka-deploy` in `krizaka/.github/deploy` |
| SEO family | `scripts/check-seo-family.mjs` | identical copy, org contract |
| Static rules | `rules/`, `rule-tests/`, `sgconfig.yml`, `scripts/sg-*.mjs`, `sg-ratchet.json` (all 0) | copies of the org's; keep identical |
| Env | `apps/web/lib/env.ts` (zod, bounded contexts) + test | krizaka-com AGENTS §5 |
| i18n | `lib/i18n.ts`, `messages/{en,fr}.json` | `@krizaka/i18n` |
| UI | `@krizaka/ui`, `tailwind`, `tokens`, `fonts` | published packages |
| Dev host / DO routes | `lib/dev-host.ts`, `proxy.ts` (+ tests) | ADR in `ci-and-deploy.md` |
| dev-preview | `dev-preview.json` (every criterion a gap) | `docs/standards/dev-preview.md` |

Not in it, on purpose: a database, auth, mail, maps, mobile — add them from the product that already does it.

## Drift

The files marked « copy » are the only duplication left; `scripts/check-template-drift.mjs` compares them with the org's source
(`node scripts/check-template-drift.mjs`) and the template's CI runs it weekly. Moving them into `@krizaka/config` is the end state.
