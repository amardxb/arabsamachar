import Link from "next/link"
import Image from "next/image"
import { notFound } from 'next/navigation'
import PrayerCityTabs from "@/app/components/PrayerCityTabs"
import { sanityFetch } from "../../../../../sanity/lib/client"
import ArticleFAQ from "@/app/components/ArticleFAQ"
import { prayerCountries } from "@/lib/prayerCities"
import prayerTimeContentFAQ from "@/lib/prayerTimeContentFAQ"
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
  category,
  "slug": slug.current
}
`

export async function generateMetadata({ params }) {
    const country = params.country?.toLowerCase()
    const currentCountry = countries.find(c => c.slug === country)
    if (!currentCountry) return {}

    const content = prayerTimeContentFAQ[country]
    const url = `https://www.arabsamachar.com/tools/prayer-time/${country}`
    const ogImage = content.ogImage
        ? `https://www.arabsamachar.com${content.ogImage}`
        : `https://www.arabsamachar.com/gulf-prayer-time-live.webp`

    return {
        title: content.title,
        description: content.description,
        alternates: { canonical: url },
        openGraph: {
            title: content.title,
            description: content.description,
            url,
            type: "website",
            siteName: "Arab Samachar",
            images: [{ url: ogImage, width: 1200, height: 630, alt: `${currentCountry.name} Prayer Time` }],
            locale: "hi_IN",
        },
        twitter: {
            card: "summary_large_image",
            title: content.title,
            description: content.description,
            images: [ogImage],
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

export default async function Page({ params }) {
    const country = params.country?.toLowerCase()
    const currentCountry = countries.find(c => c.slug === country)

    // Galat/invalid country slug ke liye clean 404
    if (!currentCountry) return notFound()

    const content = prayerTimeContentFAQ[country] || prayerTimeContentFAQ.uae
    const countryData = prayerCountries[country] || prayerCountries.uae

    const latestNews = await sanityFetch(LATEST_NEWS_QUERY)

    const pageUrl = `https://www.arabsamachar.com/tools/prayer-time/${country}`

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Hindi News", "item": "https://www.arabsamachar.com" },
            { "@type": "ListItem", "position": 2, "name": `${currentCountry.name} Prayer Time`, "item": pageUrl }
        ]
    }

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": `${currentCountry.name} Namaz Time Calculator`,
        "url": pageUrl,
        "applicationCategory": "LifestyleApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": `Daily and monthly namaz/prayer time calculator for ${currentCountry.name}.`,
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
                                <span className="text-gray-500">Tools</span>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="text-[#C4132A]" />
                            <BreadcrumbItem>
                                <span className="text-gray-500">Prayer Time</span>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="text-[#C4132A]" />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="md:visible invisible">
                                    {currentCountry.name}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

                    {/* TITLE — content file se, generic nahi */}
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

                    {/* CARD-related SEO TEXT (unique per country) */}
                    <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">
                        {content.cardText.heading}
                    </h2>
                    {content.cardText.paragraphs.map((para, i) => (
                        <p key={i} className="text-lg text-gray-800 leading-relaxed my-4">
                            {para}
                        </p>
                    ))}

                    {/* MONTHLY TABLE SEO TEXT (unique per country) */}
                    <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">
                        {content.monthlyText.heading}
                    </h2>
                    {content.monthlyText.paragraphs.map((para, i) => (
                        <p key={i} className="text-lg text-gray-800 leading-relaxed my-4">
                            {para}
                        </p>
                    ))}

                    {/* FAQ — country-specific, no duplicate across pages */}
                    <div className="mt-6">
                        <ArticleFAQ faqs={content.faqs} />
                    </div>
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
                                href={`/${item.category}/${item.slug}`}
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