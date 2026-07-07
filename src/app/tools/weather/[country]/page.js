import Link from "next/link"
import Image from "next/image"
import { notFound } from 'next/navigation'
import WeatherCard from "@/app/components/WeatherCard"
import WeatherForecast from "@/app/components/WeatherForecast"
import { sanityFetch } from "../../../../../sanity/lib/client";
import { createClient } from '@sanity/client'
import ArticleFAQ from "@/app/components/ArticleFAQ"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import weatherContentFAQ from "@/lib/weatherContentFAQ"

/* ───── DIRECT SANITY CLIENT (build-safe, no self-fetch) ───── */
const weatherClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const countryCoords = {
  uae: { lat: 25.2048, lon: 55.2708 },
  qatar: { lat: 25.2854, lon: 51.5310 },
  saudi: { lat: 24.7136, lon: 46.6753 },
  oman: { lat: 23.5880, lon: 58.3829 },
  kuwait: { lat: 29.3759, lon: 47.9774 },
  bahrain: { lat: 26.2285, lon: 50.5860 },
}

const countryNames = {
  uae: "UAE", saudi: "Saudi Arabia", qatar: "Qatar",
  oman: "Oman", bahrain: "Bahrain", kuwait: "Kuwait"
}

const countries = [
  { name: "UAE", slug: "uae", code: "ae" },
  { name: "Saudi", slug: "saudi", code: "sa" },
  { name: "Qatar", slug: "qatar", code: "qa" },
  { name: "Oman", slug: "oman", code: "om" },
  { name: "Bahrain", slug: "bahrain", code: "bh" },
  { name: "Kuwait", slug: "kuwait", code: "kw" },
]

async function getWeatherData(country) {
  try {
    const coords = countryCoords[country] || countryCoords.uae
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' })

    const current = await weatherClient.fetch(
      `*[_type == "weatherData" && country == $country && date == $today][0]`,
      { country, today },
      { next: { revalidate: 0 } }
    )

    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,weather_code,sunrise,sunset&timezone=auto&forecast_days=7`

    const forecastRes = await fetch(forecastUrl)
    const forecastData = await forecastRes.json()

    const forecast = forecastData?.daily?.time?.map((dateStr, i) => ({
      date: dateStr,
      maxTemp: forecastData.daily.temperature_2m_max[i],
      minTemp: forecastData.daily.temperature_2m_min[i],
      apparentMax: forecastData.daily.apparent_temperature_max[i],
      apparentMin: forecastData.daily.apparent_temperature_min[i],
      weatherCode: forecastData.daily.weather_code[i],
      sunrise: forecastData.daily.sunrise[i],
      sunset: forecastData.daily.sunset[i],
    })) || []

    return {
      country,
      current: current || null,
      forecast,
      updated: new Date().toISOString(),
    }
  } catch (err) {
    console.error('getWeatherData error:', err)
    return {
      country,
      current: null,
      forecast: [],
      updated: new Date().toISOString(),
    }
  }
}

// mixed latest news (no weather news yet, so general latest)
const LATEST_NEWS_QUERY = `
*[_type == "news"]
| order(_createdAt desc)[0...8]{
  heading,
  "slug": slug.current
}
`

/* ───── METADATA ───── */
export async function generateMetadata({ params }) {
  const country = params.country?.toLowerCase()
  const currentCountry = countries.find(c => c.slug === country)
  if (!currentCountry) return {}

  const name = countryNames[country] || country
  const content = weatherContentFAQ[country] || weatherContentFAQ.uae
  const url = `https://www.arabsamachar.com/tools/weather/${country}`
  const ogImageUrl = `https://www.arabsamachar.com${content.ogImage}`

  return {
    title: content.title,
    description: content.description,
    keywords: [
      `${name} weather today`,
      `${name} temperature today`,
      `${name} humidity forecast`,
      `${name} 7 day weather forecast`,
      `${name} mausam`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: content.title,
      description: content.description,
      url,
      type: "website",
      siteName: "Arab Samachar",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${name} Weather Today` }],
      locale: "hi_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [ogImageUrl],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    },
  }
}

export async function generateStaticParams() {
  return countries.map(c => ({ country: c.slug }))
}

/* ───── PAGE ───── */
export default async function Page({ params }) {
  const country = params.country?.toLowerCase()
  const currentCountry = countries.find(c => c.slug === country)

  // Galat/invalid country slug ke liye clean 404
  if (!currentCountry) return notFound()

  const content = weatherContentFAQ[country] || weatherContentFAQ.uae

  const data = await getWeatherData(country)
  const latestNews = await sanityFetch(LATEST_NEWS_QUERY)

  const pageUrl = `https://www.arabsamachar.com/tools/weather/${country}`

  // Breadcrumb schema mein sirf real, navigable pages — "Tools" (bina weather ke)
  // ka koi actual page nahi hai, isliye schema mein sirf Home + current page
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Hindi News", "item": "https://www.arabsamachar.com" },
      { "@type": "ListItem", "position": 2, "name": `${currentCountry.name} Weather`, "item": pageUrl },
    ]
  }

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${currentCountry.name} Weather Today`,
    "url": pageUrl,
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": `Live weather, temperature, humidity and 7-day forecast for ${currentCountry.name}.`,
    "provider": { "@type": "Organization", "name": "Arab Samachar", "url": "https://www.arabsamachar.com" }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  }

  return (
    <>
      <div className="hidden lg:flex justify-center w-full  " style={{ minHeight: "280px" }}>
        <div className="w-[80%] flex justify-center items-center bg-gray-100" style={{ minHeight: "280px" }}>
          <div className="text-xs text-gray-400 uppercase tracking-widest">Advertisement</div>
        </div>
      </div>

      <div className="w-full flex">

        <div className="hidden lg:block lg:w-[10%]" />

        <main className="w-full lg:w-[55%] px-4 py-4">

          {/* BREADCRUMB — "Tools" ka koi apna page nahi hai isliye plain text (non-clickable) */}
          <Breadcrumb className="mt-4 mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#C4132A] hover:text-blue-600">Hindi News</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#C4132A]" />
              <BreadcrumbItem>
                <span className="text-gray-500">Tools</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#C4132A]" />
              <BreadcrumbItem>
                <span className="text-gray-500">Weather</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#C4132A]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="md:visible invisible">
                  {currentCountry.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />

          {/* TITLE */}
          <div className="border-b border-gray-800 pb-3 mb-3">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight">
              {content.h1}
            </h1>
          </div>

          {/* COUNTRY NAV */}
          <div className="flex gap-5 overflow-x-auto border-b border-gray-800 pb-2 mb-5">
            {countries.map((item) => (
              <Link
                key={item.slug}
                href={`/tools/weather/${item.slug}`}
                className={`whitespace-nowrap text-sm pb-2 transition ${country === item.slug
                    ? "font-bold border-b-2 border-yellow-500"
                    : "text-gray-700 hover:text-black"
                  }`}
              >
                {item.name.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* ───── WEATHER CARD ───── */}
          <WeatherCard current={data?.current} country={country} />

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">
            {content.cardText.heading}
          </h2>
          {content.cardText.paragraphs.map((para, i) => (
            <p key={i} className="text-lg text-gray-800 leading-relaxed my-4">
              {para}
            </p>
          ))}

          {/* ───── 7-DAY FORECAST ───── */}
          <WeatherForecast forecast={data?.forecast} />

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">
            {content.forecastText.heading}
          </h2>
          {content.forecastText.paragraphs.map((para, i) => (
            <p key={i} className="text-lg text-gray-800 leading-relaxed my-4">
              {para}
            </p>
          ))}

          {/* ───── FAQ (country-specific, no duplicate across pages) ───── */}
          <ArticleFAQ faqs={content.faqs} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
          />

          {/* COUNTRY QUICK LINKS */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold mb-3">More Gulf Countries:</h2>
            <div className="flex flex-wrap gap-2">
              {countries.map((item) => (
                <Link
                  key={item.slug}
                  href={`/tools/weather/${item.slug}`}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm transition ${country === item.slug
                      ? "border-yellow-500 font-semibold"
                      : "border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  <Image src={`/flags/${item.code}.svg`} alt={item.name} width={18} height={18} className="w-[18px] h-[18px]" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

        </main>

        <aside className="hidden lg:block lg:w-[25%] px-4 py-4">
          <h3 className="flex items-center gap-3 mb-4">
            <span className="text-lg font-extrabold text-[#0f172a] whitespace-nowrap">
              ताज़ा खबरें
            </span>
            <span className="flex-1 h-[2px] bg-[#C4132A]"></span>
          </h3>

          <div className="border border-gray-200 bg-white">
            {(latestNews || []).map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="block px-3 py-4 text-md font-bold text-gray-700 border-b hover:bg-gray-100 transition line-clamp-2"
              >
                {item.heading}
              </Link>
            ))}
          </div>

          <div className="mt-5 border p-3 text-center text-xs text-gray-500">
            Advertisement
          </div>
        </aside>

      </div>
    </>
  )
}
