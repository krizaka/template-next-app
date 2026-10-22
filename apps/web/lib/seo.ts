import { getDictionary } from "@/lib/i18n";
import { REPO_URL, SITE_URL } from "@/lib/site";

const KRIZAKA_URL = "https://www.krizaka.com";

/** llms.txt (llmstxt.org): what the site is, its key pages, its source, and the way back to the family. Words come from messages/. */
export function llmsText(): string {
  const en = getDictionary("en");
  return `# ${en.meta.siteName}

> ${en.meta.description}

## Key pages

- [${en.home.title}](${SITE_URL}/en): ${en.home.lead}
- [${getDictionary("fr").home.title} (fr)](${SITE_URL}/fr)

## Source

- [Repository](${REPO_URL})

## Publisher

- [Krizaka](${KRIZAKA_URL}): the company, an open-source software studio in Montréal

Languages: English and French. Sitemap: ${SITE_URL}/sitemap.xml
`;
}
