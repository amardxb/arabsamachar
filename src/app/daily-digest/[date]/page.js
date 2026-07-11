// app/daily-digest/[date]/page.jsx

import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { getDailyDigest } from '@/lib/getDailyDigest'

export async function generateMetadata({ params }) {
    const { date } = await params
    const digest = await getDailyDigest(date)

    if (!digest) {
        return {
            title: 'Digest Not Found | Arab Samachar',
            robots: { index: false, follow: false },
        }
    }

    return {
        title: `${digest.title} | Arab Samachar`,
        description: digest.intro || digest.title,
        robots: {
            index: false,
            follow: true,
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

    return (
        <main className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold text-center mb-4">
                {digest.title}
            </h1>

            {digest.intro && (
                <p className="text-gray-600 text-center mb-8">
                    {digest.intro}
                </p>
            )}

            <div className="flex flex-col gap-4">
                {digest.items?.map((item, index) => (
                    <article
                        key={index}
                        className="border border-gray-200 border-l-4 border-l-red-700 rounded-lg p-4"
                    >
                        <span className="inline-block bg-red-50 text-red-800 text-xs px-2 py-1 rounded mb-2">
                            {new Date(item.publishedAt).toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: 'Asia/Dubai',
                            })}
                        </span>

                        <h2 className="text-lg font-medium mb-2">
                            {item.headline}
                        </h2>

                        {item.image?.asset?.url && (
                            <figure className="mb-3">
                                <img
                                    src={item.image.asset.url}
                                    alt={item.image.alt || item.headline}
                                    className="w-full rounded-md object-cover aspect-video"
                                />
                                {item.image.caption && (
                                    <figcaption className="text-xs text-gray-500 mt-1">
                                        {item.image.caption}
                                    </figcaption>
                                )}
                            </figure>
                        )}

                        <div className="text-sm text-gray-700 space-y-2">
                            <PortableText value={item.body} />
                        </div>

                        {item.sourceNote && (
                            <p className="text-xs text-gray-400 mt-2">
                                {item.sourceNote}
                            </p>
                        )}

                        {item.relatedLink?.href && (

                          <a href = { item.relatedLink.href } className="text-sm text-red-800 mt-2 inline-block" >
                        {item.relatedLink.heading || 'Poori khabar padhein'} →
                         </a>
                )}
            </article>
                ))}
        </div>
        </main >
    )
}