export async function POST(req) {
  try {
    const body = await req.json();

   

    const slug = body?.slug?.current || body?.slug;
    const category = body?.category?.current || body?.category;

    // dono me se koi bhi missing ho to silently ignore
    if (!slug || !category) {
      
      return Response.json({ ok: true });
    }

    const url = `https://www.arabsamachar.com/${category}/${slug}`;

    

    // 🔥 seedha await karo — serverless function me setTimeout/after()
    // ke bharose reh ke background task drop hone se behtar hai thoda wait karna
    try {
      const res = await fetch("https://api.indexnow.org/indexnow", {
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
      const text = await res.text();
      
    } catch (err) {
      
    }

    return Response.json({ ok: true });
  } catch (err) {
    // even if everything fails, don't break site
    return Response.json({ ok: true });
  }
}