import { createClient } from '@sanity/client'

const currencyMap = {
    uae: 'AED', saudi: 'SAR', qatar: 'QAR',
    oman: 'OMR', kuwait: 'KWD', bahrain: 'BHD',
}

const goldFx = {
    AED: 3.67, QAR: 3.64, SAR: 3.75,
    OMR: 0.385, KWD: 0.31, BHD: 0.38,
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
})

export async function getGoldRate(country = 'uae') {
    try {
        const currency = currencyMap[country] || 'AED'
        const fx = goldFx[currency] || 3.67

        const res = await fetch('https://api.gold-api.com/price/XAU/USD', {
            next: { revalidate: 300 }
        })
        const data = await res.json()

        if (!data?.price) return null

        const goldPerGramUSD = data.price / 31.1035
        const retail = goldPerGramUSD * fx * 1.023
        const rate22k = retail * 0.9175

        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayDate = yesterday.toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' })

        const savedYesterday = await client.fetch(
            `*[_type == "goldPrice" && country == $country && date == $date][0]`,
            { country, date: yesterdayDate },
            { next: { revalidate: 300 } }
        )

        const previousRate = savedYesterday?.gold22k ?? null

        let trend = 'neutral'
        if (previousRate !== null) {
            if (rate22k > previousRate) trend = 'up'
            else if (rate22k < previousRate) trend = 'down'
        }

        return {
            rate: rate22k,
            previousRate,
            trend,
            currency,
        }
    } catch (err) {
        console.error('getGoldRate error:', err)
        return null
    }
}