
export const revalidate = 3600

import Link from "next/link"
import Image from "next/image"
import { notFound } from 'next/navigation'
import { createClient } from '@sanity/client'
import { sanityFetch } from "../../../../../sanity/lib/client";
import ArticleFAQ from "@/app/components/ArticleFAQ"
import FuelRateTable from "@/app/components/FuelRateTable"
import FuelCalculator from "@/app/components/FuelCalculator"
import FuelRateChart from "@/app/components/FuelRateChart"
import FuelRateHistoryTable from "@/app/components/FuelRateHistoryTable"
import fuelRateContentFAQ from "@/lib/fuelRateContentFAQ"
import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

/* ───── DIRECT SANITY CLIENT ───── */
const fuelClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const countryCurrency = {
    uae: 'AED', saudi: 'SAR', qatar: 'QAR',
    kuwait: 'KWD', oman: 'OMR', bahrain: 'BHD',
}

const countryFuelTypes = {
    uae: ['uae_super98', 'uae_special95', 'uae_eplus91', 'uae_diesel'],
    saudi: ['saudi_gasoline98', 'saudi_super95', 'saudi_premium91', 'saudi_diesel'],
    qatar: ['qatar_super95', 'qatar_premium91', 'qatar_diesel'],
    kuwait: ['kuwait_ultra98', 'kuwait_super95', 'kuwait_premium91', 'kuwait_diesel'],
    oman: ['oman_mogas98', 'oman_mogas95', 'oman_mogas91', 'oman_diesel'],
    bahrain: ['bahrain_super98', 'bahrain_mumtaz95', 'bahrain_jayyid91', 'bahrain_diesel'],
}

const fuelLabels = {
    uae_super98: 'Super 98', uae_special95: 'Special 95',
    uae_eplus91: 'E-Plus 91', uae_diesel: 'Diesel',
    saudi_gasoline98: 'Gasoline 98', saudi_super95: 'Super 95',
    saudi_premium91: 'Premium 91', saudi_diesel: 'Diesel',
    qatar_super95: 'Super 95', qatar_premium91: 'Premium 91',
    qatar_diesel: 'Diesel',
    kuwait_ultra98: 'Ultra 98', kuwait_super95: 'Super 95',
    kuwait_premium91: 'Premium 91', kuwait_diesel: 'Diesel',
    oman_mogas98: 'Mogas 98', oman_mogas95: 'Mogas 95',
    oman_mogas91: 'Mogas 91', oman_diesel: 'Diesel',
    bahrain_super98: 'Super 98', bahrain_mumtaz95: 'Mumtaz 95',
    bahrain_jayyid91: 'Jayyid 91', bahrain_diesel: 'Diesel',
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

async function getFuelData(country) {
    try {
        const now = new Date()
        const currentMonth = now.getMonth() + 1
        const currentYear = now.getFullYear()
        const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1
        const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear

        const fuelTypes = countryFuelTypes[country] || countryFuelTypes.uae

        const [current, previous, history] = await Promise.all([
            fuelClient.fetch(
                `*[_type == "fuelRate" && country == $country && month == $month && year == $year][0]`,
                { country, month: currentMonth, year: currentYear },
                { next: { revalidate: 3600 } }
            ),
            fuelClient.fetch(
                `*[_type == "fuelRate" && country == $country && month == $month && year == $year][0]`,
                { country, month: prevMonth, year: prevYear },
                { next: { revalidate: 3600 } }
            ),
            fuelClient.fetch(
                `*[_type == "fuelRate" && country == $country] | order(year desc, month desc) [0...12]`,
                { country },
                { next: { revalidate: 3600 } }
            ),
        ])

        const fuelTypesArr = fuelTypes
        const rates = fuelTypesArr.map((key) => {
            const currentPrice = current?.[key] ?? null
            const previousPrice = previous?.[key] ?? null
            const change =
                currentPrice !== null && previousPrice !== null
                    ? parseFloat((((currentPrice - previousPrice) / previousPrice) * 100).toFixed(1))
                    : null

            return { fuelType: fuelLabels[key], currentPrice, previousPrice, change }
        })

        const historyFormatted = history.map((h) => {
            const entry = { label: `${months[h.month - 1]} ${h.year}` }
            fuelTypesArr.forEach((key) => { entry[fuelLabels[key]] = h[key] ?? null })
            return entry
        })

        return {
            country,
            currency: countryCurrency[country] || 'AED',
            currentMonth: current ? `${months[current.month - 1]} ${current.year}` : null,
            previousMonth: previous ? `${months[previous.month - 1]} ${previous.year}` : null,
            rates,
            history: historyFormatted,
        }
    } catch (err) {
        console.error('getFuelData error:', err)
        return { country, currency: countryCurrency[country] || 'AED', rates: [], history: [] }
    }
}

/* ───── SANITY QUERIES (sidebar) ───── */
const FINANCE_QUERY = `
*[_type == "news" && category == "finance"]
| order(_createdAt desc)[10...17]{
  heading, category, "slug": slug.current
}
`
const FEATURED_QUERY = `
*[_type == "news" && category == "finance"]
| order(_createdAt desc)[9]{
  heading, category, "slug": slug.current,
  "image": image.asset->url, "alt": image.alt
}
`
const NATIONAL_QUERY = `
*[_type == "news" && category == "national"]
| order(_createdAt desc)[10...17]{
  heading, category, "slug": slug.current
}
`
const NATIONAL_FEATURED_QUERY = `
*[_type == "news" && category == "national"]
| order(_createdAt desc)[9]{
  heading, category, "slug": slug.current,
  "image": image.asset->url, "alt": image.alt
}
`

const countryNames = {
    uae: 'UAE', saudi: 'Saudi Arabia', qatar: 'Qatar',
    oman: 'Oman', bahrain: 'Bahrain', kuwait: 'Kuwait',
}

const countries = [
    { name: 'UAE', slug: 'uae', code: 'ae' },
    { name: 'Saudi', slug: 'saudi', code: 'sa' },
    { name: 'Qatar', slug: 'qatar', code: 'qa' },
    { name: 'Kuwait', slug: 'kuwait', code: 'kw' },
    { name: 'Oman', slug: 'oman', code: 'om' },
    { name: 'Bahrain', slug: 'bahrain', code: 'bh' },
]

/* ───── METADATA ───── */
export async function generateMetadata({ params }) {
    const country = params.country?.toLowerCase()
    const currentCountry = countries.find(c => c.slug === country)
    if (!currentCountry) return {}

    const content = fuelRateContentFAQ[country]
    const url = `https://www.arabsamachar.com/tools/fuel-rates/${country}`
    const ogImage = content.ogImage
        ? `https://www.arabsamachar.com${content.ogImage}`
        : `https://www.arabsamachar.com/arabsamacharwidelogotp.png`

    return {
        title: content.title,
        description: content.description,
        alternates: { canonical: url },
        openGraph: {
            title: content.title,
            description: content.description,
            url,
            type: 'website',
            siteName: 'Arab Samachar',
            images: [{ url: ogImage, width: 1200, height: 630, alt: `${currentCountry.name} Fuel Rates` }],
            locale: 'hi_IN',
        },
        twitter: {
            card: 'summary_large_image',
            title: content.title,
            description: content.description,
            images: [ogImage],
        },
        robots: {
            index: true, follow: true,
            googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
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

    // Galat/invalid country slug ke liye clean 404 — koi junk/undefined page render nahi hoga
    if (!currentCountry) return notFound()

    const content = fuelRateContentFAQ[country] || fuelRateContentFAQ.uae

    const [
        data,
        financeArticlesRaw,
        featuredArticleRaw,
        nationalArticles,
        nationalFeatured,
    ] = await Promise.all([
        getFuelData(country),
        sanityFetch(FINANCE_QUERY),
        sanityFetch(FEATURED_QUERY),
        sanityFetch(NATIONAL_QUERY),
        sanityFetch(NATIONAL_FEATURED_QUERY),
    ])

    const financeArticles = financeArticlesRaw?.length > 0 ? financeArticlesRaw : nationalArticles
    const featuredArticle = featuredArticleRaw || nationalFeatured

    const pageUrl = `https://www.arabsamachar.com/tools/fuel-rates/${country}`

    // Breadcrumb schema mein sirf real, navigable pages shamil hain.
    // "Tools" aur "Fuel Rates" (bina country ke) ka koi actual page nahi hai,
    // isliye unhe schema mein fake URL ke saath daalna Google guidelines ke against hai.
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Hindi News", "item": "https://www.arabsamachar.com" },
            { "@type": "ListItem", "position": 2, "name": `${currentCountry.name} Fuel Rates`, "item": pageUrl },
        ]
    }

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": `${currentCountry.name} Petrol Diesel Price Today`,
        "url": pageUrl,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": countryCurrency[country] || "USD"
        },
        "description": `Live petrol and diesel prices for ${currentCountry.name} with monthly history and trend chart.`,
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
            {/* ───── TOP AD ───── */}
            <div className="hidden lg:flex justify-center w-full" style={{ minHeight: '280px' }}>
                <div className="w-[80%] flex justify-center items-center bg-gray-100" style={{ minHeight: '280px' }}>
                    <div className="text-xs text-gray-400 uppercase tracking-widest">Advertisement</div>
                </div>
            </div>

            <div className="w-full flex">

                {/* ───── LEFT BLANK 10% ───── */}
                <div className="hidden lg:block lg:w-[10%]" />

                {/* ───── MAIN CONTENT 55% ───── */}
                <main className="w-full lg:w-[55%] px-4 py-4">

                    {/* BREADCRUMB — Home real page hai, "Tools" aur "Fuel Rates" ka koi apna
                        page nahi hai isliye plain text (non-clickable), sirf current country
                        page final crumb hai */}
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
                                <span className="text-gray-500">Fuel Rates</span>
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

                    {/* COUNTRY TABS */}
                    <div className="flex gap-5 overflow-x-auto border-b border-gray-800 pb-2 mb-5">
                        {countries.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/tools/fuel-rates/${item.slug}`}
                                className={`whitespace-nowrap text-sm pb-2 transition ${country === item.slug
                                    ? 'font-bold border-b-2 border-yellow-500'
                                    : 'text-gray-700 hover:text-black'
                                    }`}
                            >
                                {item.name.toUpperCase()}
                            </Link>
                        ))}
                    </div>

                    {/* ───── RATE TABLE ───── */}
                    <FuelRateTable data={data} />

                    <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">
                        {content.tableText.heading}
                    </h2>
                    {content.tableText.paragraphs.map((para, i) => (
                        <p key={i} className="text-lg text-gray-800 leading-relaxed my-4">
                            {para}
                        </p>
                    ))}

                    {/* ───── CALCULATOR ───── */}
                    <FuelCalculator data={data} country={country} />

                    <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">
                        {content.calculatorText.heading}
                    </h2>
                    {content.calculatorText.paragraphs.map((para, i) => (
                        <p key={i} className="text-lg text-gray-800 leading-relaxed my-4">
                            {para}
                        </p>
                    ))}

                    {/* FEATURED ARTICLE */}
                    {featuredArticle && (
                        <Link
                            href={`/${featuredArticle.category}/${featuredArticle.slug}`}
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

                    {/* ───── CHART ───── */}
                    <div className="mt-6">
                        <FuelRateChart data={data} />
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">
                        {content.chartText.heading}
                    </h2>
                    {content.chartText.paragraphs.map((para, i) => (
                        <p key={i} className="text-lg text-gray-800 leading-relaxed my-4">
                            {para}
                        </p>
                    ))}

                    {/* ───── HISTORY TABLE ───── */}
                    <FuelRateHistoryTable data={data} />

                    <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">
                        {content.historyText.heading}
                    </h2>
                    {content.historyText.paragraphs.map((para, i) => (
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
                        <h2 className="text-sm font-semibold mb-3">Other Gulf Countries:</h2>
                        <div className="flex flex-wrap gap-2">
                            {countries.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={`/tools/fuel-rates/${item.slug}`}
                                    className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm transition ${country === item.slug
                                        ? 'border-yellow-500 font-semibold'
                                        : 'border-gray-300 hover:bg-gray-100'
                                        }`}
                                >
                                    <Image src={`/flags/${item.code}.svg`} alt={item.name} width={18} height={18} />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                </main>

                {/* ───── RIGHT SIDEBAR 25% ───── */}
                <aside className="hidden lg:block lg:w-[25%] px-4 py-4">

                    <h3 className="flex items-center gap-3 mb-4">
                        <span className="text-lg font-extrabold text-[#0f172a] whitespace-nowrap">Finance News</span>
                        <span className="flex-1 h-[2px] bg-[#C4132A]"></span>
                    </h3>

                    <div className="border border-gray-200 bg-white">
                        {(financeArticles || []).map((item) => (
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