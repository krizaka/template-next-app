import { describe, expect, it } from "vitest";

import { GET } from "@/app/llms.txt/route";
import { llmsText } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

describe("llms.txt", () => {
  it("names the site, links its pages and its sitemap, and leads back to Krizaka", () => {
    const text = llmsText();
    expect(text.startsWith("# ")).toBe(true);
    expect(text).toContain(`${SITE_URL}/en`);
    expect(text).toContain(`${SITE_URL}/sitemap.xml`);
    expect(text).toContain("https://www.krizaka.com");
  });
  it("is served as plain text", async () => {
    const res = GET();
    expect(res.headers.get("content-type")).toContain("text/plain");
    expect(await res.text()).toBe(llmsText());
  });
});
