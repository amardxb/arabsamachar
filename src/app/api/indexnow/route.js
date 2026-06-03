export async function POST(request) {
  try {
    const body = await request.json();

    const articleUrl = body.url;

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: "www.arabsamachar.com",
        key: "19f10a83510146a68509e47e8b42cc3f",
        keyLocation: "https://www.arabsamachar.com/19f10a83510146a68509e47e8b42cc3f.txt",
        urlList: [articleUrl],
      }),
    });

    return Response.json({
      success: true,
      status: response.status,
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}