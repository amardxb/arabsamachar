// app/api/subscribe/route.js
//
// IMPORTANT: neeche wali import line apne existing Sanity client ke path
// se match karo — jo cron/gold-save ya cron/exchange-cron route mein
// use kiya tha, wahi client yahan bhi use karo (SANITY_WRITE_TOKEN
// already .env aur Vercel/GitHub secrets mein set hai).
import { createClient } from 'next-sanity';
import crypto from 'crypto';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALL_CATEGORIES = [
    'breaking',
    'national',
    'world',
    'entertainment',
    'lifestyle',
    'technology',
    'finance',
    'sports',
];

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, source } = body || {};
        let { categories } = body || {};

        if (!email || !EMAIL_REGEX.test(email)) {
            return Response.json({ error: 'Invalid email' }, { status: 400 });
        }
        // Footer / homepage-icon / mobile-modal jaise quick-subscribe forms se
        // categories nahi aatin — un cases mein saari categories default kar do
        if (!Array.isArray(categories) || categories.length === 0) {
            categories = ALL_CATEGORIES;
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check if this email already exists
        const existing = await client.fetch(
            `*[_type == "subscriber" && email == $email][0]`,
            { email: normalizedEmail }
        );

        if (existing) {
            // Re-subscribe / update categories if they already exist
            await client
                .patch(existing._id)
                .set({
                    status: 'active',
                    categories,
                    subscribedAt: new Date().toISOString(),
                })
                .commit();

            return Response.json({ message: 'Subscription updated' }, { status: 200 });
        }

        // New subscriber
        const unsubscribeToken = crypto.randomBytes(24).toString('hex');

        await client.create({
            _type: 'subscriber',
            email: normalizedEmail,
            categories,
            source: source || 'newsletter-page',
            status: 'active',
            unsubscribeToken,
            subscribedAt: new Date().toISOString(),
        });

        return Response.json({ message: 'Subscribed' }, { status: 201 });
    } catch (err) {
        console.error('Subscribe error:', err);
        return Response.json({ error: 'Something went wrong' }, { status: 500 });
    }
}