export const revalidate = 3600;

export async function GET() {
  try {
    const baseUrl = "https://www.arabsamachar.com";

    const query = `*[_type=="news"] | order(_createdAt desc)[0...30]{
      heading,
      title,
      description,
      date,
      publishedAt,
      category,
      slug,
      image
    }`;

    const res = await fetch(
      `https://c3a7mc67.api.sanity.io/v2024-04-17/data/query/production?query=${encodeURIComponent(
        query
      )}`
    );

    const data = await res.json();
    const posts = data?.result || [];

    const items = (posts || [])
      .map((post) => {
        if (!post?.slug?.current) return "";

        const url = `${baseUrl}/${post.category}/${post.slug.current}`;

        // -----------------------------
        // SAFE IMAGE HANDLING (ALL FORMATS)
        // -----------------------------
        let imageUrl = "";
        let mimeType = "image/jpeg";

        if (post?.image?.asset?._ref) {
          const ref = post.image.asset._ref;

          const parts = ref.replace("image-", "").split("-");
          const id = parts[0];
          const size = parts[1];
          const format = ref.split("-").pop();

          imageUrl = `https://cdn.sanity.io/images/c3a7mc67/production/${id}-${size}.${format}`;

          if (format === "webp") mimeType = "image/webp";
          else if (format === "png") mimeType = "image/png";
          else mimeType = "image/jpeg";
        }

        const safeDate = new Date(
          post.date || post.publishedAt || post._createdAt
        ).toUTCString();

        return `
          <item>
            <title><![CDATA[${post.heading || post.title || ""}]]></title>
            <link>${url}</link>
            <guid>${url}</guid>
            <pubDate>${safeDate}</pubDate>

            ${
              imageUrl
                ? `<enclosure url="${imageUrl}" type="${mimeType}" />`
                : ""
            }

            <description><![CDATA[
              ${post.description || ""}
            ]]></description>
          </item>
        `;
      })
      .join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:media="http://search.yahoo.com/mrss/">

  <channel>
    <title><![CDATA[Arab Samachar]]></title>
    <link>${baseUrl}</link>
    <description><![CDATA[Latest Arab News Updates]]></description>
    <language>hi-IN</language>

    ${items}

  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  } catch (err) {
    return new Response("RSS Error", { status: 500 });
  }
}