// app/api/webhooks/new-post/route.js
//
// Sanity Studio mein tumhara "newsletter" webhook already ban chuka hai.
// Uski settings check/update kar lo:
//   URL: https://arabsamachar.com/api/webhooks/new-post
//   Dataset: production
//   Trigger on: Create (only)
//   Filter: _type == "news" && !(_id in path("drafts.**"))
//   Projection: { "title": title, "slug": slug.current, "excerpt": description,
//                 "image": image.asset->url, "category": category }
//   Secret: ek random string — isko SANITY_WEBHOOK_SECRET env var mein daalo
//
// IMPORTANT: Sanity client import path apne existing routes se match karo
// (jaisa route.js /api/subscribe mein use kiya tha).

import { createClient } from 'next-sanity';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
});

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL; // e.g. news@arabsamachar.com
const SITE_URL = 'https://arabsamachar.com';

function buildEmailHtml({ title, excerpt, image, slug, category, unsubscribeToken }) {
    // NOTE: URL pattern abhi /category/slug maan ke chala hai (jaise /national/xxx).
    // Agar tumhare actual article URL ka pattern different hai (jaise sirf /slug),
    // to neeche wali line update kar dena.
    const postUrl = `${SITE_URL}/${category}/${slug}`;
    const unsubUrl = `${SITE_URL}/api/unsubscribe?token=${unsubscribeToken}`;
    return `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      ${image ? `<img src="${image}" alt="" style="width:100%; border-radius:8px;" />` : ''}
      <h2 style="color:#C4132A; margin: 16px 0 8px;">${title}</h2>
      ${excerpt ? `<p style="color:#333; line-height:1.6;">${excerpt}</p>` : ''}
      <a href="${postUrl}" style="display:inline-block; background:#C4132A; color:#fff; padding:10px 20px; border-radius:6px; text-decoration:none; margin-top:12px;">
        पूरी खबर पढ़ें
      </a>
      <p style="margin-top: 32px; font-size: 12px; color: #999;">
        <a href="${unsubUrl}" style="color:#999;">अनसब्सक्राइब करें</a>
      </p>
    </div>
  `;
}

export async function POST(req) {
    try {
        const rawBody = await req.text();
        const signature = req.headers.get(SIGNATURE_HEADER_NAME);

        const isValid = await isValidSignature(
            rawBody,
            signature,
            process.env.SANITY_WEBHOOK_SECRET
        );
        if (!isValid) {
            return Response.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const news = JSON.parse(rawBody);
        if (!news?.title || !news?.slug) {
            return Response.json({ error: 'Missing news data' }, { status: 400 });
        }

        // Har active subscriber ko email — category filter nahi lagega
        const subscribers = await client.fetch(
            `*[_type == "subscriber" && status == "active"]{ email, unsubscribeToken }`
        );

        if (subscribers.length === 0) {
            return Response.json({ message: 'No active subscribers' }, { status: 200 });
        }

        // Resend batch API: max 100 emails per call, isliye chunks mein bhejo
        const chunkSize = 100;
        for (let i = 0; i < subscribers.length; i += chunkSize) {
            const chunk = subscribers.slice(i, i + chunkSize);
            const batch = chunk.map((sub) => ({
                from: FROM_EMAIL,
                to: sub.email,
                subject: news.title,
                html: buildEmailHtml({ ...news, unsubscribeToken: sub.unsubscribeToken }),
            }));

            await fetch('https://api.resend.com/emails/batch', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(batch),
            });
        }

        return Response.json({ message: `Sent to ${subscribers.length} subscribers` }, { status: 200 });
    } catch (err) {
        console.error('Newsletter send error:', err);
        return Response.json({ error: 'Something went wrong' }, { status: 500 });
    }
}