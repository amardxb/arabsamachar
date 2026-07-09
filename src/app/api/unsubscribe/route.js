// app/api/unsubscribe/route.js
//
// Email ke unsubscribe link se GET request aayegi: /api/unsubscribe?token=xxxx

import { createClient } from 'next-sanity';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
});

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
        return new Response('Invalid link', { status: 400 });
    }

    const subscriber = await client.fetch(
        `*[_type == "subscriber" && unsubscribeToken == $token][0]`,
        { token }
    );

    if (!subscriber) {
        return new Response('Subscriber not found', { status: 404 });
    }

    await client.patch(subscriber._id).set({ status: 'unsubscribed' }).commit();

    return new Response(
        `<html><body style="font-family:sans-serif; text-align:center; padding:60px 20px;">
      <h2>आप अनसब्सक्राइब हो गए हैं</h2>
      <p>अब आपको newsletter emails नहीं मिलेंगी।</p>
    </body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
    );
}