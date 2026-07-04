import { client } from "../../sanity/lib/client";

export const revalidate = 60;

export default async function sitemap() {
  const baseurl = "https://www.arabsamachar.com";

  const sitemapQuery = `*[_type=='news'] | order(_updatedAt desc){ 
    category,    
    "slug": slug.current,
    _updatedAt      
  }`;

  const sitemapData = await client.fetch(sitemapQuery);

  const isRecent = (date) => {
    const diff = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
    return diff < 7;
  };

  const posts = sitemapData.map((item) => ({
    url: `${baseurl}/${item.category}/${item.slug}`,
    lastModified: item._updatedAt,
    changeFrequency: isRecent(item._updatedAt) ? "daily" : "monthly",
    priority: isRecent(item._updatedAt) ? 0.7 : 0.5,
  }));

  const goldCountries = ["uae", "saudi", "qatar", "oman", "bahrain", "kuwait"];

  const goldPages = goldCountries.map((country) => ({
    url: `${baseurl}/tools/gold-silver-rate/${country}`,
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.8,
  }));

  const exchangeCountries = ["uae", "saudi", "qatar", "oman", "bahrain", "kuwait"];

const exchangePages = exchangeCountries.map((country) => ({
  url: `${baseurl}/tools/exchange-rate/${country}`,
  lastModified: new Date(),
  changeFrequency: "hourly",
  priority: 0.8,
}));
const weatherCountries = ["uae", "saudi", "qatar", "oman", "bahrain", "kuwait"];

const weatherPages = weatherCountries.map((country) => ({
  url: `${baseurl}/tools/weather/${country}`,
  lastModified: new Date(),
  changeFrequency: "hourly",
  priority: 0.8,
}));
  const fuelCountries = ["uae", "saudi", "qatar", "oman", "bahrain", "kuwait"];

  const fuelPages = fuelCountries.map((country) => ({
    url: `${baseurl}/tools/fuel-rates/${country}`,
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.8,
  }));

  return [
    {
      url: `${baseurl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseurl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseurl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseurl}/cookies-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseurl}/copyright`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseurl}/disclaimers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseurl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseurl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseurl}/national`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseurl}/world`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseurl}/lifestyle`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseurl}/technology`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseurl}/sports`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseurl}/finance`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseurl}/breaking`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseurl}/entertainment`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseurl}/tools/uae-gratuity-calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...goldPages,
    ...exchangePages,
    ...weatherPages,
    ...fuelPages,
    ...posts,
  ];
}
