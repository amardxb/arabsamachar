import { createClient } from '@sanity/client'

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const currencyMap = {
    uae: 'AED', saudi: 'SAR', qatar: 'QAR',
    oman: 'OMR', kuwait: 'KWD', bahrain: 'BHD',
}

export async function getExchangeRate(country = 'uae') {
    try {
        const currency = currencyMap[country] || 'AED'

        // Latest 2 records fetch karo (jo bhi available ho)
        const records = await client.fetch(
            `*[_type == "exchangeRate" && country == $country] | order(date desc, slot desc)[0...2]`,
            { country },
            { next: { revalidate: 300 } }
        )

        if (!records || records.length === 0) return null

        const latest = records[0]
        const previous = records[1] || null

        const latestRate = latest?.rates?.INR ?? null
        const previousRate = previous?.rates?.INR ?? null

        if (latestRate === null) return null

        // Compare
        let trend = 'neutral'
        if (previousRate !== null) {
            if (latestRate > previousRate) trend = 'up'
            else if (latestRate < previousRate) trend = 'down'
        }

        return {
            rate: latestRate,
            previousRate,
            trend,
            currency,
            date: latest.date,
            slot: latest.slot,
        }
    } catch (err) {
        console.error('getExchangeRate error:', err)
        return null
    }
}