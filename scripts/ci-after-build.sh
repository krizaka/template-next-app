#!/usr/bin/env bash
# Runs after the production build (node-ci `after-build`; the repository root is the working directory): the SEO family contract
# on the built site, and the routes of the DO spec (no list of routes: krizaka-deploy routes).
set -euo pipefail
export NODE_ENV=production PORT=3000
trap 'tail -100 web.log || true' ERR
(cd apps/web && npx next start -p 3000 > ../../web.log 2>&1 &)
for _ in $(seq 1 60); do curl -sf http://localhost:3000/api/healthz && break; sleep 1; done
pnpm run seo:check
