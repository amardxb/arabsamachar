import Link from "next/link"
import Image from "next/image"
import WeatherCard from "@/app/components/WeatherCard"
import WeatherForecast from "@/app/components/WeatherForecast"
import { sanityFetch } from "../../../../../sanity/lib/client";
import ArticleFAQ from "@/app/components/ArticleFAQ"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

// mixed latest news (no weather news yet, so general latest)
const LATEST_NEWS_QUERY = `
*[_type == "news"]
| order(_createdAt desc)[0...8]{
  heading,
  "slug": slug.current
}
`

const faqData = [
  {
    question: "यह मौसम जानकारी कितनी बार अपडेट होती है?",
    answer: "हमारी वेबसाइट पर मौसम की जानकारी हर 3 घंटे में अपडेट होती है ताकि आपको ताज़ा जानकारी मिल सके।"
  },
  {
    question: "7-दिन का पूर्वानुमान कितना सटीक है?",
    answer: "7-दिन का पूर्वानुमान सामान्य अनुमान पर आधारित होता है और मौसम की स्थिति के अनुसार बदल सकता है।"
  },
]

export async function generateMetadata({ params }) {
  const country = params.country?.toLowerCase()
  const countryNames = {
    uae: "UAE", saudi: "Saudi Arabia", qatar: "Qatar",
    oman: "Oman", bahrain: "Bahrain", kuwait: "Kuwait"
  }
  const name = countryNames[country] || country

  const title = `${name} Weather Today | Live Temperature, Humidity & 7-Day Forecast`
  const description = `Check today's live weather in ${name} — temperature, humidity, wind speed, visibility, sunrise/sunset, and 7-day forecast.`
  const url = `https://www.arabsamachar.com/tools/weather/${country}`
  const ogImage = `https://www.arabsamachar.com/live-weather.webp`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url,
      type: "website",
      siteName: "Arab Samachar",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${name} Weather Today` }],
      locale: "hi_IN",
    },
    twitter: {
      card: "summary_large_image",
      title, description, images: [ogImage],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    },
  }
}

export async function generateStaticParams() {
  return [
    { country: "uae" }, { country: "saudi" }, { country: "qatar" },
    { country: "oman" }, { country: "bahrain" }, { country: "kuwait" },
  ]
}

export default async function Page({ params }) {
  const country = params.country?.toLowerCase()

  const countries = [
    { name: "UAE", slug: "uae", code: "ae" },
    { name: "Saudi", slug: "saudi", code: "sa" },
    { name: "Qatar", slug: "qatar", code: "qa" },
    { name: "Oman", slug: "oman", code: "om" },
    { name: "Bahrain", slug: "bahrain", code: "bh" },
    { name: "Kuwait", slug: "kuwait", code: "kw" },
  ]

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  const res = await fetch(
    `${baseUrl}/api/weather?country=${country}`,
    { next: { revalidate: 3600 } }
  )
  const data = await res.json()

  const latestNews = await sanityFetch(LATEST_NEWS_QUERY)

  const currentCountry = countries.find(c => c.slug === country)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Hindi News", "item": "https://www.arabsamachar.com" },
      { "@type": "ListItem", "position": 2, "name": `${currentCountry?.name} Weather`, "item": `https://www.arabsamachar.com/tools/weather/${country}` }
    ]
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
          <Breadcrumb className="mt-4 mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#C4132A] hover:text-blue-600">Hindi News</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#C4132A]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="md:visible invisible">
                  {currentCountry?.name} Weather
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />

          <div className="border-b border-gray-800 pb-3 mb-3">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight">
              {currentCountry?.name} का आज का मौसम
            </h1>
          </div>

          <div className="flex gap-5 overflow-x-auto border-b border-gray-800 pb-2 mb-5">
            {countries.map((item) => (
              <Link
                key={item.slug}
                href={`/tools/weather/${item.slug}`}
                className={`whitespace-nowrap text-sm pb-2 transition ${
                  country === item.slug
                    ? "font-bold border-b-2 border-yellow-500"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                {item.name.toUpperCase()}
              </Link>
            ))}
          </div>

          <WeatherCard current={data?.current} />

          {/* SEO TEXT — baad mein likhenge */}

          <WeatherForecast forecast={data?.forecast} />

          {/* SEO TEXT — baad mein likhenge */}

          <ArticleFAQ faqs={faqData} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqData.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
                }))
              })
            }}
          />

          <div className="mt-8">
            <h2 className="text-sm font-semibold mb-3">More Gulf Countries:</h2>
            <div className="flex flex-wrap gap-2">
              {countries.map((item) => (
                <Link
                  key={item.slug}
                  href={`/tools/weather/${item.slug}`}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm transition ${
                    country === item.slug
                      ? "border-yellow-500 font-semibold"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <Image src={`/flags/${item.code}.svg`} alt={item.name} width={18} height={18} />
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