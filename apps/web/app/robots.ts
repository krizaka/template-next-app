import type { MetadataRoute } from "next";

import { readEnv } from "@/lib/env";
import { CRAWLERS } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const env = readEnv();
  return env.APP_SEARCH_INDEXING === "off"
    ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: [{ userAgent: "*", allow: "/" }, ...CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" }))], sitemap: `${env.APP_PUBLIC_URL}/sitemap.xml` };
}
