export async function POST(req) {
  try {
    const body = await req.json();

     

    const docType = body?._type;
    const slug = body?.slug?.current || body?.slug;
    const category = body?.category?.current || body?.category;

    let url = null;

    if (docType === "news") {
      if (slug && category) {
        url = `https://www.arabsamachar.com/${category}/${slug}`;
      }
    } else if (docType === "dailyDigest") {
      if (slug) {
        url = `https://www.arabsamachar.com/daily-digest/${slug}`;
      }
    }

    // koi bhi required field missing ho ya document type unknown ho to silently ignore
    if (!url) {
      
      return Response.json({ ok: true });
    }

    

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