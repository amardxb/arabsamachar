// sanity/schemaTypes/subscriber.js
// Apne existing schema folder mein daalo aur index.js mein register karo
// (jaisa goldPrice / exchangeRate schema register kiya tha)

import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'subscriber',
    title: 'Newsletter Subscriber',
    type: 'document',
    fields: [
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) =>
                Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
                    name: 'email',
                    invert: false,
                }),
        }),
        defineField({
            name: 'categories',
            title: 'Subscribed Categories',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Breaking News', value: 'breaking' },
                    { title: 'National', value: 'national' },
                    { title: 'World', value: 'world' },
                    { title: 'Entertainment', value: 'entertainment' },
                    { title: 'Lifestyle', value: 'lifestyle' },
                    { title: 'Technology', value: 'technology' },
                    { title: 'Finance', value: 'finance' },
                    { title: 'Sports', value: 'sports' },
                ],
            },
        }),
        defineField({
            name: 'source',
            title: 'Signup Source',
            type: 'string',
            options: {
                list: [
                    { title: 'Footer', value: 'footer' },
                    { title: 'Homepage Icon', value: 'homepage-icon' },
                    { title: 'Newsletter Page', value: 'newsletter-page' },
                    { title: 'Article Page', value: 'article_page' },
                ],
            },
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: { list: ['active', 'unsubscribed'] },
            initialValue: 'active',
        }),
        defineField({
            name: 'unsubscribeToken',
            title: 'Unsubscribe Token',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'subscribedAt',
            title: 'Subscribed At',
            type: 'datetime',
        }),
    ],
    preview: {
        select: { title: 'email', subtitle: 'status' },
    },
});