import { Page } from "@krizaka/ui/page";

import { getDictionary, type Locale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const t = getDictionary((await params).locale as Locale);
  return (
    <Page className="py-16">
      <h1 className="text-4xl">{t.home.title}</h1>
      <p className="mt-4 text-fg-muted">{t.home.lead}</p>
    </Page>
  );
}
