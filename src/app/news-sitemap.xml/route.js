import { client } from "../../../sanity/lib/client";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = "https://www.arabsamachar.com";

  const query = `*[_type=='news']
  | order(_createdAt desc)[0...50]{
    title,
    "slug": slug.current,
    category,
    _updatedAt,
    _createdAt
  }`;

  const news = await client.fetch(query);

  // only last 2 days for Google News
  const recentNews = news.filter((item) => {
    const created = new Date(item._createdAt);
    const now = new Date();

    const diffHours = (now - created) / (1000 * 60 * 60);

    return diffHours <= 120;
  });

  // ✅ FIX: fallback added (IMPORTANT)
  const finalNews =
    recentNews.length > 0
      ? recentNews
      : news.slice(0, 10);

  const urls = finalNews
    .filter((item) => item.slug && item.category)
    .map((item) => {
      return `
        <url>
          <loc>${baseUrl}/${item.category}/${item.slug}</loc>

          <news:news>
            <news:publication>
              <news:name>Arab Samachar</news:name>
              <news:language>hi</news:language>
            </news:publication>

            <news:publication_date>${item._createdAt}</news:publication_date>

            <news:title><![CDATA[${item.title}]]></news:title>
          </news:news>

          <lastmod>${item._updatedAt}</lastmod>
        </url>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    ${urls}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
