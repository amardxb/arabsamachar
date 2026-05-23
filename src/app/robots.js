     export default function robots() {
  const baseurl = "https://www.arabsamachar.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api", "/admin"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Googlebot-News",
        allow: "/",
      },
    ],
    sitemap: `${baseurl}/sitemap.xml`,
  };
}