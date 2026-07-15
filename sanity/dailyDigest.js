// schemas/dailyDigest.js

export default {
    name: 'dailyDigest',
    title: 'Daily Digest',
    type: 'document',
    fields: [
        {
            name: 'date',
            title: 'Date',
            type: 'date',
            description: 'ISO format date for this digest (e.g. 2026-07-11)',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            description: 'Auto-generated from date, e.g. 11-july-2026',
            options: {
                source: 'date',
                maxLength: 50,
                slugify: (input) => {
                    const date = new Date(input)
                    const day = String(date.getUTCDate()).padStart(2, '0')
                    const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' }).toLowerCase()
                    const year = date.getUTCFullYear()
                    return `${day}-${month}-${year}`
                },
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'title',
            title: 'Page Title (H1)',
            type: 'string',
            description: 'e.g. 11 July 2026: Gulf aur India ki Top 10 Khabarein',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'intro',
            title: 'Intro Paragraph',
            type: 'text',
            rows: 3,
        },
        {
            name: 'author',
            title: 'संकलनकर्ता (Author)',
            type: 'string',
            initialValue: 'अमर दीप द्विवेदी',
        },
        {
            name: 'items',
            title: 'News Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'digestItem',
                    title: 'News Item',
                    fields: [
                        {
                            name: 'headline',
                            title: 'Headline (H2)',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'context',
                            title: 'संदर्भ (क्यों जरूरी है)',
                            type: 'text',
                            rows: 2,
                            description: 'Ek chhoti line - yeh khabar Gulf reader ke liye kyun important hai',
                        },
                        {
                            name: 'publishedAt',
                            title: 'Published At',
                            type: 'datetime',
                            description: 'Exact time this item was added — used for ordering (newest first)',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'body',
                            title: 'Body',
                            type: 'array',
                            of: [{ type: 'block' }],
                            description: 'Multiple paragraphs allowed',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'image',
                            title: 'Image (optional)',
                            type: 'image',
                            options: { hotspot: true },
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alt Text',
                                    type: 'string',
                                    description: 'Required if image is uploaded — describe the image for SEO/accessibility',
                                    validation: (Rule) =>
                                        Rule.custom((alt, context) => {
                                            const hasImage = context.parent?.asset;
                                            if (hasImage && !alt) {
                                                return 'Alt text is required when an image is uploaded';
                                            }
                                            return true;
                                        }),
                                },
                                {
                                    name: 'caption',
                                    title: 'Caption (optional)',
                                    type: 'string',
                                },
                            ],
                        },
                        {
                            name: 'sourceNote',
                            title: 'Source Note (optional)',
                            type: 'string',
                            description: 'e.g. Source: Reuters',
                        },
                        {
                            name: 'relatedLink',
                            title: 'Poori Khabar Link (optional)',
                            type: 'object',
                            fields: [
                                {
                                    name: 'heading',
                                    type: 'string',
                                    title: 'Link Text',
                                    description: 'e.g. Poori khabar padhein',
                                    initialValue: 'Poori khabar padhein',
                                },
                                {
                                    name: 'href',
                                    type: 'url',
                                    title: 'URL',
                                    validation: (Rule) => Rule.required(),
                                },
                            ],
                        },
                    ],
                    preview: {
                        select: {
                            title: 'headline',
                            subtitle: 'publishedAt',
                            media: 'image',
                        },
                    },
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'date',
        },
    },
    orderings: [
        {
            title: 'Date, Newest First',
            name: 'dateDesc',
            by: [{ field: 'date', direction: 'desc' }],
        },
    ],
}