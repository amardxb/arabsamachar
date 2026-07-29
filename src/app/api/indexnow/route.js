export async function POST(req) {
  try {
    const body = await req.json();

    console.log("IndexNow webhook payload:", JSON.stringify(body));

    const slug = body?.slug?.current || body?.slug;
    const category = body?.category?.current || body?.category;

    // dono me se koi bhi missing ho to silently ignore
    if (!slug || !category) {
      console.log("IndexNow webhook: missing slug or category, skipping", { slug, category });
      return Response.json({ ok: true });
    }

    const url = `https://www.arabsamachar.com/${category}/${slug}`;

    console.log("IndexNow submitting URL:", url);

    // 🔥 IMPORTANT: don't block request on external API
    setTimeout(async () => {
      try {
        await fetch("https://api.indexnow.org/indexnow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            host: "www.arabsamachar.com",
            key: "19f10a83510146a68509e47e8b42cc3f",
            keyLocation:
              "https://www.arabsamachar.com/19f10a83510146a68509e47e8b42cc3f.txt",
            urlList: [url],
          }),
        });
      } catch (err) {
        // ❌ silently fail, do nothing
      }
    }, 0);

    // 🔥 respond immediately to Sanity (fast webhook)
    return Response.json({ ok: true });
  } catch (err) {
    // even if everything fails, don't break site
    return Response.json({ ok: true });
  }
}