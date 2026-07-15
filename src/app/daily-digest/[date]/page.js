// app/daily-digest/[date]/page.jsx

import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { getDailyDigest } from '@/lib/getDailyDigest'
import { getDailyDigestByISODate } from '@/lib/getDailyDigest'
import Image from 'next/image'
import CopyLinkButton from '@/app/components/CopyLinkButton'

export async function generateMetadata({ params }) {
    const { date } = await params
    const digest = await getDailyDigest(date)

    if (!digest) {
        return {
            title: 'Digest Not Found | Arab Samachar',
            robots: { index: false, follow: false },
        }
    }

    const url = `https://www.arabsamachar.com/daily-digest/${digest.slug}`
    const description = digest.intro || `${digest.title} — Gulf aur India ki taazа khabarein, ek jagah.`
    const ogImage = digest.items?.find(i => i.image?.asset?.url)?.image?.asset?.url

    return {
        title: `${digest.title} | Arab Samachar`,
        description,
        alternates: {
            canonical: url,
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: digest.title,
            description,
            url,
            siteName: 'Arab Samachar',
            type: 'article',
            images: ogImage ? [{ url: ogImage }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: digest.title,
            description,
            images: ogImage ? [ogImage] : undefined,
        },
    }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DailyDigestPage({ params }) {
    const { date } = await params
    const digest = await getDailyDigest(date)

    if (!digest) {
        notFound()
    }
    // Sidebar list decide karna
let sidebarItems = digest.items || []
let sidebarBaseSlug = digest.slug   // default: aaj ka page hi
let usingYesterday = false

if (sidebarItems.length < 10) {
    const currentDate = new Date(digest.date)
    const prevDate = new Date(currentDate)
    prevDate.setUTCDate(prevDate.getUTCDate() - 1)
    const prevISODate = prevDate.toISOString().split('T')[0]

    const prevDigest = await getDailyDigestByISODate(prevISODate)

    if (prevDigest?.items?.length) {
        sidebarItems = prevDigest.items
        sidebarBaseSlug = prevDigest.slug
        usingYesterday = true
    }
    }
    
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'NewsArticle',
                headline: digest.title,
                description: digest.intro || digest.title,
                author: {
                    '@type': 'Person',
                    name: digest.author || 'Arab Samachar Team',
                },
                datePublished: digest.items?.[digest.items.length - 1]?.publishedAt,
                dateModified: digest.items?.[0]?.publishedAt,
                url: `https://www.arabsamachar.com/daily-digest/${digest.slug}`,
                publisher: {
                    '@type': 'Organization',
                    name: 'Arab Samachar',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://www.arabsamachar.com/arabsamacharwidelogo.jpg',
                    },
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': `https://www.arabsamachar.com/daily-digest/${digest.slug}`,
                },
            },
            {
                '@type': 'ItemList',
                itemListElement: digest.items?.map((item, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: item.headline,
                    url: `https://www.arabsamachar.com/daily-digest/${digest.slug}#item-${index}`,
                })),
            },
        ],
    }

    

    return (
        <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* baaki sab same */}
        </div>
   
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

            {/* MAIN COLUMN */}
            <main>
                <h1 className="text-2xl md:text-3xl font-semibold text-center mb-4">
                    {digest.title}
                    </h1>
                    {digest.author && (
                        <p className="text-center text-sm text-gray-500 mb-6">
                            संकलन एवं संपादन: <span className="font-medium text-gray-700">{digest.author}</span>
                        </p>
                    )}

                {digest.intro && (
                    <p className="text-gray-600 mb-8">
                        {digest.intro}
                    </p>
                )}

                <div className="flex flex-col gap-4">
                    {digest.items?.map((item, index) => {
                        const dateObj = new Date(item.publishedAt)

                        const time = dateObj.toLocaleString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                            timeZone: 'Asia/Dubai',
                        })

                        const date = dateObj.toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            timeZone: 'Asia/Dubai',
                        })

                        const formattedDateTime = `${time},  ${date}`

                        return (
                            <article
                                key={index}
                                id={`item-${index}`}
                                className={`relative border-t-2 pt-4 p-4 mb-10 mt-4 mt-8 rounded-b-md scroll-mt-24 ${index === 0 ? 'border-red-700 bg-red-50' : 'border-gray-700 bg-[#F9F9F9]'
                                    }`}
                            >
                                <span className={`absolute left-0 top-0 -translate-y-full text-white text-sm px-3 py-1.5 rounded-t-md rounded-b-none ${index === 0 ? 'bg-red-700' : 'bg-gray-800'
                                    }`}>
                                    {formattedDateTime}
                                </span>

                                <h2 className="text-xl md:text-2xl font-semibold mb-4 mt-2">
                                    {item.headline}
                                </h2>
                                {item.context && (
                                    <p className="text-sm text-gray-600 italic border-l-2 border-red-300 pl-3 mb-3">
                                        {item.context}
                                    </p>
                                )}

                                {item.image?.asset?.url && (
                                    <figure className="mb-3 relative w-full aspect-video rounded-md overflow-hidden">
                                        <Image
                                            src={item.image.asset.url}
                                            alt={item.image.alt || item.headline}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 700px"
                                        />
                                        {item.image.caption && (
                                            <figcaption className="text-xs text-gray-500 mt-1">
                                                {item.image.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                )}

                                <div className="text-sm text-gray-700 space-y-4">
                                    <PortableText value={item.body} />
                                </div>

                                {item.sourceNote && (
                                    <p className="text-xs text-gray-400 mt-2">
                                        {item.sourceNote}
                                    </p>
                                )}

                                {item.relatedLink?.href && (

                                <a    href = { item.relatedLink.href }
            className="text-sm text-red-800 mt-2 inline-block"
        >
                                {item.relatedLink.heading || 'Poori khabar padhein'} →
                            </a>
                        )
                    }

    <div className="flex justify-end mt-2">
                            <CopyLinkButton
                                url={`https://www.arabsamachar.com/daily-digest/${digest.slug}#item-${index}`}
                            />
                        </div>
</article>
                )
                    })}
        </div>
            </main >

        {/* SIDEBAR (Desktop Only) */ }
        < aside className = " block" >
                    <div className="lg:sticky lg:top-6 flex flex-col gap-6">

                {/* Ad Slot 1 */}
                <div className="border border-dashed border-gray-300 p-6 text-center text-xs text-gray-400">
                    Ads
                </div>

                    <nav aria-label="Digest navigation" className="border border-gray-200 p-4">
                        <div className="w-full flex flex-row items-center border-l-4 border-[#c4132a] p-2 mb-4 ">
                            <h3 className="text- font-bold uppercase tracking-wide text-gray-800 whitespace-nowrap">
                                मुख्य खबरें 
                            </h3>
                            <div className="flex-1 h-[2px] bg-[#c4132a] ml-3"></div>
                        </div>

                        <ul className="flex flex-col">
                            {sidebarItems.slice(0, 10).map((item, index) => {
                                const href = usingYesterday
                                    ? `/daily-digest/${sidebarBaseSlug}#item-${index}`
                                    : `#item-${index}`

                                return (
                                    <li
                                        key={index}
                                        className={`flex items-center gap-3 py-3 border-t ${index !== 0 ? 'border-t border-gray-200' : ''
                                            }`}
                                    >
                                        <span className="text-2xl font-bold text-gray-800 leading-none shrink-0">
                                            {index + 1}
                                        </span>


                                     <a   href={href}
                                        className="text-sm font-semibold text-gray-800 hover:text-gray-600 leading-snug line-clamp-2"
                    >
                                        {item.headline}
                                    </a>
                </li>
                        )
        })}
                    </ul>
                </nav>
    <div className="border border-dashed border-gray-300 rounded-md p-6 text-center text-xs text-gray-400">
     Ads
    </div>

                </div >
            </aside >

            </div >
        </>
    )
}