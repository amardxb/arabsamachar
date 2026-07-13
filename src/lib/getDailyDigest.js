// src/lib/getDailyDigest.js

import { createClient } from '@sanity/client'

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
})

export async function getDailyDigest(slug) {
    try {
        const digest = await client.fetch(
            `*[_type == "dailyDigest" && slug.current == $slug][0]{
                _id,
                date,
                "slug": slug.current,
                title,
                intro,
                "items": items | order(publishedAt desc) {
                    headline,
                    publishedAt,
                    body,
                    image {
                        asset->{
                            _id,
                            url
                        },
                        alt,
                        caption,
                        hotspot
                    },
                    sourceNote,
                    relatedLink {
    heading,
    href
}
                }
            }`,
            { slug },
            { next: { revalidate: 60 } }
        )

        return digest || null
    } catch (err) {
        console.error('getDailyDigest error:', err)
        return null
    }
}

export async function getDailyDigestByISODate(isoDate) {
    try {
        const digest = await client.fetch(
            `*[_type == "dailyDigest" && date == $isoDate][0]{
                _id,
                date,
                "slug": slug.current,
                title,
                "items": items | order(publishedAt desc) {
                    headline,
                    publishedAt,
                    image {
                        asset->{ _id, url },
                        alt,
                        caption
                    }
                }
            }`,
            { isoDate },
            { next: { revalidate: 300 } }
        )
        return digest || null
    } catch (err) {
        console.error('getDailyDigestByISODate error:', err)
        return null
    }
}