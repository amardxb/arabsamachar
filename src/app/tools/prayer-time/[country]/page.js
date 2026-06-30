import Link from "next/link"
import Image from "next/image"
import PrayerCityTabs from "@/app/components/PrayerCityTabs"
import { sanityFetch } from "../../../../../sanity/lib/client"
import ArticleFAQ from "@/app/components/ArticleFAQ"
import { prayerCountries } from "@/lib/prayerCities"
import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const countries = [
    { name: "UAE", slug: "uae", code: "ae" },
    { name: "Saudi", slug: "saudi", code: "sa" },
    { name: "Qatar", slug: "qatar", code: "qa" },
    { name: "Oman", slug: "oman", code: "om" },
    { name: "Bahrain", slug: "bahrain", code: "bh" },
    { name: "Kuwait", slug: "kuwait", code: "kw" },
]

const LATEST_NEWS_QUERY = `
*[_type == "news"]
| order(_createdAt desc)[0...8]{
  heading,
  "slug": slug.current
}
`

// Placeholder FAQ  
const faqData = [
    {
        question: "नमाज़ का समय कैसे तय होता है?",
        answer: "नमाज़ का समय सूरज की स्थिति (सूर्योदय, दोपहर, सूर्यास्त) के आधार पर खगोलीय गणना से तय होता है, जो हर शहर के अक्षांश-देशांतर के अनुसार अलग-अलग होता है।"
    },
    {
        question: "क्या अलग-अलग शहरों में नमाज़ का समय अलग होता है?",
        answer: "हां, एक ही देश के अलग-अलग शहरों में भी सूर्योदय-सूर्यास्त के समय में थोड़ा अंतर होने की वजह से नमाज़ के समय में कुछ मिनट का फर्क हो सकता है।"
    },
    {
        question: "इस्लामी (हिजरी) तारीख कैसे तय होती है?",
        answer: "हिजरी कैलेंडर चांद के चक्र पर आधारित होता है, इसलिए हर महीना लगभग 29-30 दिन का होता है और ग्रेगोरियन कैलेंडर से हर साल लगभग 10-11 दिन पीछे खिसकता है।"
    },
]

export async function generateMetadata({ params }) {
    const country = params.country?.toLowerCase()
    const countryNames = {
        uae: "UAE", saudi: "Saudi Arabia", qatar: "Qatar",
        oman: "Oman", bahrain: "Bahrain", kuwait: "Kuwait"
    }
    const name = countryNames[country] || country

    const title = `${name} Namaz Time Today | Prayer Times - Fajr, Dhuhr, Asr, Maghrib, Isha`
    const description = `Check today's accurate namaz/prayer timings in ${name} - Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha with monthly prayer time calendar.`
    const url = `https://www.arabsamachar.com/tools/prayer-time/${country}`
    const ogImage = `https://www.arabsamachar.com/gulf-prayer-time-live.webp`

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title, description, url,
            type: "website",
            siteName: "Arab Samachar",
            images: [{ url: ogImage, width: 1200, height: 630, alt: `खाड़ी देशों का लाइव नमाज़ का समय - ${name}`, }],
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
    const countryData = prayerCountries[country] || prayerCountries.uae

    const latestNews = await sanityFetch(LATEST_NEWS_QUERY)

    const currentCountry = countries.find(c => c.slug === country)
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Hindi News", "item": "https://www.arabsamachar.com" },
            { "@type": "ListItem", "position": 2, "name": `${currentCountry?.name} Prayer Time`, "item": `https://www.arabsamachar.com/tools/prayer-time/${country}` }
        ]
    }

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": `${currentCountry?.name} Namaz Time Calculator`,
        "url": `https://www.arabsamachar.com/tools/prayer-time/${country}`,
        "applicationCategory": "LifestyleApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": `Daily and monthly namaz/prayer time calculator for ${currentCountry?.name}.`,
        "provider": { "@type": "Organization", "name": "Arab Samachar", "url": "https://www.arabsamachar.com" }
    }

    return (
        <>
            <div className="hidden lg:flex justify-center w-full" style={{ minHeight: "280px" }}>
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
                                    {currentCountry?.name} Prayer Time
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

                    <div className="border-b border-gray-800 pb-3 mb-3">
                        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight">
                            {currentCountry?.name} में आज नमाज़ का समय
                        </h1>
                    </div>

                    {/* COUNTRY NAV */}
                    <div className="flex gap-5 overflow-x-auto border-b border-gray-800 pb-2 mb-5">
                        {countries.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/tools/prayer-time/${item.slug}`}
                                className={`whitespace-nowrap text-sm pb-2 transition ${country === item.slug
                                        ? "font-bold border-b-2 border-yellow-500"
                                        : "text-gray-700 hover:text-black"
                                    }`}
                            >
                                {item.name.toUpperCase()}
                            </Link>
                        ))}
                    </div>

                    {/* CITY TABS + TODAY CARD + MONTHLY TABLE */}
                    <PrayerCityTabs country={country} cities={countryData.cities} />

                    {/* SEO TEXT  */}
                    {/* <div className="prose max-w-none my-6"> ... </div> */}

                    <div className="mt-6">
                        <ArticleFAQ faqs={faqData} />
                    </div>
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
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

                    <div className="mt-8">
                        <h2 className="text-sm font-semibold mb-3">More Gulf Countries:</h2>
                        <div className="flex flex-wrap gap-2">
                            {countries.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={`/tools/prayer-time/${item.slug}`}
                                    className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm transition ${country === item.slug
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
                        <span className="text-lg font-extrabold text-[#0f172a] whitespace-nowrap">ताज़ा खबरें</span>
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