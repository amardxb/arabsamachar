import Link from "next/link"
import GulfGoldTable from "@/app/components/GulfGoldTable"
import GoldChart from "@/app/components/GoldChart"
import Image from "next/image"
import { sanityFetch } from "../../../../../sanity/lib/client";
import ArticleFAQ from "@/app/components/ArticleFAQ"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import GoldHistoryTable from "@/app/components/GoldHistoryTable"
import GoldValueCalculator from "@/app/components/GoldValueCalculator"
import GulfSilverTable from "@/app/components/GulfSilverTable";
import countryContent from "@/lib/countryContent"

const FINANCE_QUERY = `
*[_type == "news" && category == "finance"]
| order(_createdAt desc)[1...9]{
  heading,
  "slug": slug.current
}
`

const FEATURED_QUERY = `
*[_type == "news" && category == "finance"]
| order(_createdAt desc)[0]{
  heading,
  "slug": slug.current,
  "image": image.asset->url,
  "alt": image.alt
}
`
const faqData = [
  {
    question: "आज सोने का भाव कैसे तय होता है?",
    answer: "सोने का भाव अंतरराष्ट्रीय बाजार (London Bullion Market) में डॉलर की कीमत, मांग-सप्लाई और करेंसी एक्सचेंज रेट के आधार पर तय होता है। Gulf देशों में यह रेट स्थानीय करेंसी में रोज़ाना अपडेट होता है।"
  },
  {
    question: "24K, 22K और 21K सोने में क्या अंतर है?",
    answer: "24K सबसे शुद्ध सोना होता है (99.9% pure), जबकि 22K और 21K में अन्य धातुएं (जैसे तांबा या चांदी) मिलाई जाती हैं ताकि गहना मजबूत बने। 22K का उपयोग ज्यादातर ज्वेलरी में होता है।"
  },
  {
    question: "Gulf देशों में सोना खरीदना भारत से सस्ता क्यों है?",
    answer: "Gulf देशों में सोने पर VAT या import duty बहुत कम होती है, और making charges भी भारत के मुकाबले कम लगते हैं। इसी कारण NRI और टूरिस्ट यहां से सोना खरीदना पसंद करते हैं।"
  },
  {
    question: "सोने की कीमत दिन में कितनी बार बदलती है?",
    answer: "अंतरराष्ट्रीय बाजार खुला रहने तक सोने की कीमत लगातार बदलती रहती है। स्थानीय ज्वेलर्स आमतौर पर सुबह, दोपहर और शाम की दर अपडेट करते हैं।"
  },
  {
    question: "यह रेट कितनी बार अपडेट होता है?",
    answer: "हमारी वेबसाइट पर रेट हर घंटे अपडेट होता है ताकि आपको सबसे ताज़ा और सटीक जानकारी मिल सके।"
  }
]

export async function generateMetadata({ params }) {
  const country = params.country?.toLowerCase()
  const countryNames = {
    uae: "UAE", saudi: "Saudi Arabia", qatar: "Qatar",
    oman: "Oman", bahrain: "Bahrain", kuwait: "Kuwait"
  }
  const name = countryNames[country] || country

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  let currency = ""
  try {
    const res = await fetch(`${baseUrl}/api/gold-silver?country=${country}`, {
      next: { revalidate: 3600 }
    })
    const json = await res.json()
    currency = json?.currency || ""
  } catch (e) {
    currency = ""
  }

  const title = `${name} Gold & Silver Price Today${currency ? ` (${currency})` : ""} | Live Rates & 30-Day Chart`
  const description = `Check today's live gold and silver prices in ${name}${currency ? ` in ${currency}` : ""}. 24K, 22K, 21K, 18K rates updated hourly with 30-day historical trend chart.`
  const url = `https://www.arabsamachar.com/tools/gold-silver-rate/${country}`
  const ogImage = `https://www.arabsamachar.com/live-gold-silver-rate.webp`

  return {
    title,
    description,
    keywords: [
      `${name} gold price`,
      `${name} gold rate today`,
      `${name} silver price`,
      `gold price ${country}`,
      `22k gold rate ${name}`,
      `24k gold rate ${name}`,
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
          alt: `${name} Gold Price Today`,
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

  /* ───── GOLD DATA (cached API) ───── */
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  const res = await fetch(
    `${baseUrl}/api/gold-silver?country=${country}`,
    { next: { revalidate: 3600 } }
  )

  const data = await res.json()

  /* ───── SANITY DATA (FAST SSR) ───── */
  const [financeArticles, featuredArticle] = await Promise.all([
    sanityFetch(FINANCE_QUERY),
    sanityFetch(FEATURED_QUERY)
  ])

  const currentCountry = countries.find(c => c.slug === country)
  const content = countryContent[country] || {}
  const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Hindi News", "item": "https://www.arabsamachar.com" },
    { "@type": "ListItem", "position": 2, "name": `${currentCountry?.name} Gold Silver Rate`, "item": `https://www.arabsamachar.com/tools/gold-silver-rate/${country}` }
  ]
}

  return (
    <>
      {/* ───── TOP AD SLOT (Desktop only) ───── */}
      <div className="hidden lg:flex justify-center w-full  " style={{ minHeight: "280px" }}>
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
        {currentCountry?.name} Gold Silver Rate
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
              {currentCountry?.name?.toUpperCase()} GOLD & SILVER PRICES
            </h1>
          </div>

          {/* COUNTRY NAV (SEO internal linking) */}
          <div className="flex gap-5 overflow-x-auto border-b border-gray-800 pb-2 mb-5">
            {countries.map((item) => (
              <Link
                key={item.slug}
                href={`/tools/gold-silver-rate/${item.slug}`}
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
         <GulfGoldTable data={data} country={country} />
{/* GOLD TEXT - yahan render hoga */}
{content.gold?.map((para, i) => (
  <p key={i} className="text-lg text-gray-800 leading-relaxed my-4">
    {para}
  </p>
))}

          <div className="mt-2 text-right">
  <a href="#silver-rate" className="text-md text-[#C4132A] font-semibold hover:underline">
    चांदी का भाव देखें (Silver Rate)
  </a>
</div>
         <GoldValueCalculator data={data} country={country} />
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
          <GoldChart country={country} currency={data?.currency} />
{/* CHART TEXT */}
{content.chart?.map((para, i) => (
  <p key={i} className="text-lg text-gray-800 leading-relaxed my-4">
    {para}
  </p>
))}
          </div>   
          <div className="mt-2 text-right">
  <a href="#silver-rate" className="text-md text-[#C4132A] font-semibold hover:underline">
    चांदी का भाव देखें (Silver Rate)
  </a>
</div>       

<GoldHistoryTable country={country} />
{/* HISTORY TEXT */}
{content.history?.map((para, i) => (
  <p key={i} className="text-lg text-gray-800 leading-relaxed my-4">
    {para}
  </p>
))}
<div id="silver-rate">
  <GulfSilverTable data={data} country={country} />
{/* SILVER TEXT */}
{content.silver?.map((para, i) => (
  <p key={i} className="text-lg text-gray-800 leading-relaxed my-4">
    {para}
  </p>
))}
   
</div>

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

          {/* COUNTRY QUICK LINKS */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold mb-3">
              More Gulf Countries:
            </h2>

            <div className="flex flex-wrap gap-2">
              {countries.map((item) => (
                <Link
                  key={item.slug}
                  href={`/tools/gold-silver-rate/${item.slug}`}
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