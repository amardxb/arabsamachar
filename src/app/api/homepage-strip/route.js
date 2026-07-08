import { getPrayerTimes } from '@/lib/getPrayerTimes'
import { getGoldRate } from '@/lib/getGoldRate'
import { getExchangeRate } from '@/lib/getExchangeRate'
import { mapToGulfCountry } from '@/lib/detectCountry'
import { getFuelRate } from '@/lib/getFuelRate'

export const dynamic = 'force-dynamic'

export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams
        const rawCountry = searchParams.get('country')
        const vercelCity = searchParams.get('city')

        // Gulf country map karo, fallback uae
        const country = mapToGulfCountry(rawCountry) || 'uae'

        // Teeno parallel fetch karo — ek saath, sequential nahi
        const [gold, exchange, prayer, fuel] = await Promise.all([
            getGoldRate(country),
            getExchangeRate(country),
            getPrayerTimes(country, vercelCity),
            getFuelRate(country),
        ])

        return Response.json({
            country,
            gold,
            exchange,
            prayer,
            fuel,
        })
    } catch (err) {
        console.error('homepage-strip error:', err)
        return Response.json({
            country: 'uae',
            gold: null,
            exchange: null,
            prayer: null,
            fuel: null,
        }, { status: 500 })
    }
}