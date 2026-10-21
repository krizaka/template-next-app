# __Product__ — agent contract

Started from `krizaka/template-next-app`. The governance of the family is **krizaka-com's AGENTS.md** (theming with `var(--kz-*)`,
every string in `messages/*.json`, `@krizaka/ui` blocks, tests with every change, definition of done) — read it, do not copy it here.

- Shared things stay shared: the pipeline is `krizaka/.github` reusable workflows (`ci.yml` only wires it), deploys go through
  `krizaka-deploy`, the SEO contract is `scripts/check-seo-family.mjs` (identical copy in every site), the ast-grep rules and ratchet
  are the org's (`rules/`, `sgconfig.yml`, `scripts/sg-ratchet.mjs`: **do not edit them here**, change them in the template and in the org).
- **DO routes**: the spec lists no route one by one (App Platform has no regex): one `/` per component; fine routing is code in the
  app (`lib/dev-host.ts`, `proxy.ts`) with tests.
- Environment variables are declared once in `apps/web/lib/env.ts`, named by bounded context.
- `dev-preview.json` is data: `devPreview` is claimed only when every criterion has fresh evidence.
