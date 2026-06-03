export async function POST(req) {
  const body = await req.json();

  const slug = body.slug?.current;

  const url = `https://yourdomain.com/${slug}`;

  await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      host: "www.arabsamachar.com",
      key: "19f10a83510146a68509e47e8b42cc3f",
      keyLocation: "https://www.arabsamachar.com/19f10a83510146a68509e47e8b42cc3f.txt",
      urlList: [url],
    }),
  });

  return Response.json({ success: true });
}