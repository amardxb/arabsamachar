export const revalidate = 3600  
import Link from "next/link"
import Image from "next/image"
import ExchangeTable from "@/app/components/ExchangeTable"
import ExchangeHistoryChart from "@/app/components/ExchangeHistoryChart"
import ExchangeHistoryTable from "@/app/components/ExchangeHistoryTable"
import { sanityFetch } from "../../../../../sanity/lib/client"
import { createClient } from '@sanity/client'
import ArticleFAQ from "@/app/components/ArticleFAQ"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import exchangeContent from "@/lib/exchangeContent"
import ExchangeValueCalculator from "@/app/components/ExchangeValueCalculator"

/* ───── DIRECT SANITY CLIENT (build-safe, no self-fetch) ───── */
const exchangeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const exchangeCurrencyMap = {
  uae: 'AED', qatar: 'QAR', saudi: 'SAR',
  oman: 'OMR', kuwait: 'KWD', bahrain: 'BHD',
}

async function getExchangeData(country) {
  try {
    const currency = exchangeCurrencyMap[country] || 'AED'
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' })
    const yesterdayObj = new Date()
    yesterdayObj.setDate(yesterdayObj.getDate() - 1)
    const yesterdayDate = yesterdayObj.toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' })

const todayRecords = await exchangeClient.fetch(
      `*[_type == "exchangeRate" && country == $country && date == $today]`,
      { country, today },
  { next: { revalidate: 3600 } }
    )
    const yesterdayRecords = await exchangeClient.fetch(
      `*[_type == "exchangeRate" && country == $country && date == $yesterdayDate] | order(slot desc)`,
      { country, yesterdayDate },
      { next: { revalidate: 3600 } }
    )

    const morningRecord = todayRecords?.find(r => r.slot === 'morning')
    const eveningRecord = todayRecords?.find(r => r.slot === 'evening')
    const yesterdayRecord = yesterdayRecords?.[0]

    const currencyKeys = ['INR', 'PKR', 'PHP', 'LKR', 'NPR', 'BDT']
    const rates = {}
    currencyKeys.forEach((key) => {
      rates[key] = {
        morning: morningRecord?.rates?.[key] ?? null,
        evening: eveningRecord?.rates?.[key] ?? null,
        yesterday: yesterdayRecord?.rates?.[key] ?? null,
      }
    })

    return {
      country,
      currency,
      rates,
      updated: eveningRecord?.fetchedAt || morningRecord?.fetchedAt || yesterdayRecord?.fetchedAt || new Date().toISOString()
    }
  } catch (err) {
    console.error('getExchangeData error:', err)
    return {
      country,
      currency: exchangeCurrencyMap[country] || 'AED',
      rates: {},
      updated: new Date().toISOString(),
    }
  }
}

const FINANCE_QUERY = `
*[_type == "news" && category == "finance"]
| order(_createdAt desc)[10...17]{
  heading,
  "slug": slug.current
}
`

const FEATURED_QUERY = `
*[_type == "news" && category == "finance"]
| order(_createdAt desc)[9]{
  heading,
  "slug": slug.current,
  "image": image.asset->url,
  "alt": image.alt
}
`

// Fallback queries: agar finance category mein news kam/nahi hain,
// to national category se fill karne ke liye
const NATIONAL_QUERY = `
*[_type == "news" && category == "national"]
| order(_createdAt desc)[10...17]{
  heading,
  "slug": slug.current
}
`

const NATIONAL_FEATURED_QUERY = `
*[_type == "news" && category == "national"]
| order(_createdAt desc)[9]{
  heading,
  "slug": slug.current,
  "image": image.asset->url,
  "alt": image.alt
}
`

const faqData = [
  {
    question: "मनी ट्रांसफर एक्सचेंज रेट कैसे तय होती है?",
    answer: "मनी ट्रांसफर एक्सचेंज रेट अंतरराष्ट्रीय करेंसी मार्केट, बैंकों और एक्सचेंज हाउस की पॉलिसी के आधार पर तय होती है। यह रेट डॉलर की चाल, मांग-सप्लाई और लोकल करेंसी की स्थिति पर निर्भर करती है।"
  },
  {
    question: "बैंक और एक्सचेंज हाउस की रेट में अंतर क्यों होता है?",
    answer: "हर बैंक और एक्सचेंज हाउस अपना मार्जिन और सर्विस चार्ज जोड़ता है, इसलिए एक ही दिन में अलग-अलग जगह रेट थोड़ी अलग हो सकती है। पैसे भेजने से पहले रेट कंपेयर करना फायदेमंद रहता है।"
  },
  {
    question: "सबसे अच्छी एक्सचेंज रेट कब मिलती है?",
    answer: "एक्सचेंज रेट दिनभर में कई बार बदलती है। सामान्यतः वर्किंग डेज़ की शुरुआत में और इंटरनेशनल मार्केट के अपडेट के बाद रेट में बदलाव ज्यादा देखा जाता है।"
  },
  {
    question: "क्या मनी ट्रांसफर रेट रोज़ाना अपडेट होती है?",
    answer: "हां, एक्सचेंज रेट लगभग हर दिन और कई बार दिन में भी बदलती है। हमारी वेबसाइट पर रेट हर घंटे अपडेट होती है ताकि आपको सबसे सटीक जानकारी मिल सके।"
  },
  {
    question: "पैसे भेजने से पहले किन बातों का ध्यान रखें?",
    answer: "पैसे भेजने से पहले एक्सचेंज रेट, ट्रांसफर फीस और ट्रांसफर पहुंचने में लगने वाला समय जरूर चेक करें। अलग-अलग एक्सचेंज हाउस की रेट कंपेयर करके आप ज्यादा बचत कर सकते हैं।"
  }
]

const countryNames = {
  uae: "UAE", saudi: "Saudi Arabia", qatar: "Qatar",
  oman: "Oman", bahrain: "Bahrain", kuwait: "Kuwait"
}

export async function generateMetadata({ params }) {
  const country = params.country?.toLowerCase()
  const name = countryNames[country] || country

  const data = await getExchangeData(country)
  const currency = data?.currency || ""

  const title = `${name} Money Transfer Exchange Rate Today${currency ? ` (${currency})` : ""} | Live Rates & 30-Day History`
  const description = `Check today's live money transfer exchange rates from ${name} to India, Pakistan, Philippines, Sri Lanka, Nepal and Bangladesh. Updated rates with 30-day historical trend.`
  const url = `https://www.arabsamachar.com/tools/exchange-rate/${country}`
  const ogImage = `https://www.arabsamachar.com/live-money-exchange-rate-hindi.webp`

  return {
    title,
    description,
    keywords: [
      `${name} money transfer rate`,
      `${name} to India exchange rate`,
      `${name} to Pakistan exchange rate`,
      `${name} remittance rate today`,
      `send money from ${name}`,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Arab Samachar",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${name} Money Transfer Exchange Rate`,
        },
      ],
      locale: "hi_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
  }
}

export async function generateStaticParams() {
  return [
    { country: "uae" },
    { country: "saudi" },
    { country: "qatar" },
    { country: "oman" },
    { country: "bahrain" },
    { country: "kuwait" },
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

  /* ───── EXCHANGE DATA (direct Sanity, build-safe) ───── */
  const data = await getExchangeData(country)

  /* ───── SANITY DATA (FAST SSR) ───── */
  const [
    financeArticlesRaw,
    featuredArticleRaw,
    nationalArticles,
    nationalFeatured
  ] = await Promise.all([
    sanityFetch(FINANCE_QUERY),
    sanityFetch(FEATURED_QUERY),
    sanityFetch(NATIONAL_QUERY),
    sanityFetch(NATIONAL_FEATURED_QUERY)
  ])

  // Fallback: agar finance category mein news nahi/kam hain, to national se fill karo
  const financeArticles =
    financeArticlesRaw && financeArticlesRaw.length > 0
      ? financeArticlesRaw
      : nationalArticles

  const featuredArticle = featuredArticleRaw || nationalFeatured

  const currentCountry = countries.find(c => c.slug === country)
  const content = exchangeContent[country] || {}

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Hindi News", "item": "https://www.arabsamachar.com" },
      { "@type": "ListItem", "position": 2, "name": `${currentCountry?.name} Money Transfer Exchange Rate`, "item": `https://www.arabsamachar.com/tools/exchange-rate/${country}` }
    ]
  }

  const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `${currentCountry?.name} Money Transfer Exchange Rate Calculator`,
  "url": `https://www.arabsamachar.com/tools/exchange-rate/${country}`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": `Live money transfer exchange rate calculator for ${currentCountry?.name} with daily rates and 30-day historical trend chart.`,
  "provider": {
    "@type": "Organization",
    "name": "Arab Samachar",
    "url": "https://www.arabsamachar.com"
  }
}

  return (
    <>
      {/* ───── TOP AD SLOT (Desktop only) ───── */}
      <div className="hidden lg:flex justify-center w-full" style={{ minHeight: "280px" }}>
        <div className="w-[80%] flex justify-center items-center bg-gray-100" style={{ minHeight: "280px" }}>
          <div className="text-xs text-gray-400 uppercase tracking-widest">Advertisement</div>
        </div>
      </div>

      <div className="w-full flex">

        {/* ───── LEFT BLANK 10% ───── */}
        <div className="hidden lg:block lg:w-[10%]" />

        {/* ───── MAIN CONTENT 55% ───── */}
        <main className="w-full lg:w-[55%] px-4 py-4">
          <Breadcrumb className="mt-4 mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#C4132A] hover:text-blue-600 ">Hindi News</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#C4132A]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="md:visible invisible">
                  {currentCountry?.name} Money Transfer Exchange Rate
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
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold uppercase leading-tight">
              {currentCountry?.name?.toUpperCase()} MONEY TRANSFER EXCHANGE RATES
            </h1>
          </div>

          {/* COUNTRY NAV (SEO internal linking) */}
          <div className="flex gap-5 overflow-x-auto border-b border-gray-800 pb-2 mb-5">
            {countries.map((item) => (
              <Link
                key={item.slug}
                href={`/tools/exchange-rate/${item.slug}`}
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

          {/* TABLE */}
          <ExchangeTable
            data={data}
            country={country}
            currency={data?.currency}
          />
          {/* TABLE TEXT */}
          {content.table?.map((para, i) => (
            <p key={i} className="text-lg text-gray-800 leading-relaxed my-4">
              {para}
            </p>
          ))}
          <ExchangeValueCalculator data={data} country={country} />



          {/* CALCULATOR TEXT */}
          {content.calculator?.map((para, i) => (
            <p key={i} className="text-lg text-gray-800 leading-relaxed my-4">
              {para}
            </p>
          ))}

          {/* FEATURED ARTICLE CARD */}
          {featuredArticle && (
            <Link
              href={`/news/${featuredArticle.slug}`}
              className="flex items-center gap-2 border border-gray-200 rounded p-2 mt-6 hover:bg-gray-50 transition w-full lg:w-[70%]"
            >
              <div className="w-[60%]">
                <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded uppercase tracking-wide">
                  Update
                </span>
                <h3 className="font-bold text-sm md:text-lg mt-1 leading-snug line-clamp-3">
                  {featuredArticle.heading}
                </h3>
              </div>
              {featuredArticle.image && (
                <div className="w-[40%]">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.alt || featuredArticle.heading}
                    width={180}
                    height={100}
                    className="rounded object-cover w-full h-full"
                  />
                </div>
              )}
            </Link>
          )}

          {/* CHART */}
          <div className="mt-6">
            <ExchangeHistoryChart country={country} currency={data?.currency} />
            {/* CHART TEXT */}
            {content.chart?.map((para, i) => (
              <p key={i} className="text-lg text-gray-800 leading-relaxed my-4">
                {para}
              </p>
            ))}
          </div>

          {/* HISTORY TABLE */}
          <ExchangeHistoryTable country={country} currency={data?.currency} />
          {/* HISTORY TEXT */}
          {content.history?.map((para, i) => (
            <p key={i} className="text-lg text-gray-800 leading-relaxed my-4">
              {para}
            </p>
          ))}

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
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              })
            }}
          />

          <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
/>

          {/* COUNTRY QUICK LINKS */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold mb-3">
              More Gulf Countries:
            </h2>

            <div className="flex flex-wrap gap-2">
              {countries.map((item) => (
                <Link
                  key={item.slug}
                  href={`/tools/exchange-rate/${item.slug}`}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm transition ${
                    country === item.slug
                      ? "border-yellow-500 font-semibold"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <Image
                    src={`/flags/${item.code}.svg`}
                    alt={item.name}
                    width={18}
                    height={18}
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

        </main>

        {/* ───── RIGHT SIDEBAR 25% ───── */}
        <aside className="hidden lg:block lg:w-[25%] px-4 py-4">

          {/* HEADER */}
          <h3 className="flex items-center gap-3 mb-4">
            <span className="text-lg font-extrabold text-[#0f172a] whitespace-nowrap">
              Finance News
            </span>
            <span className="flex-1 h-[2px] bg-[#C4132A]"></span>
          </h3>

          {/* ARTICLES */}
          <div className="border border-gray-200 bg-white">
            {(financeArticles || []).map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="block px-3 py-4 text-md font-bold text-gray-700 border-b hover:bg-gray-100 transition line-clamp-2"
              >
                {item.heading}
              </Link>
            ))}
          </div>

          {/* AD SLOT */}
          <div className="mt-5 border p-3 text-center text-xs text-gray-500">
            Advertisement
          </div>

        </aside>

      </div>
    </>
  )
}
