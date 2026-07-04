import { createClient } from '@sanity/client'

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
})

// Har country ka most popular fuel field key
const popularFuelKey = {
    uae: 'uae_special95',
    saudi: 'saudi_super95',
    qatar: 'qatar_super95',
    kuwait: 'kuwait_super95',
    oman: 'oman_mogas95',
    bahrain: 'bahrain_mumtaz95',
}

const popularFuelLabel = {
    uae: 'Special 95',
    saudi: 'Super 95',
    qatar: 'Super 95',
    kuwait: 'Super 95',
    oman: 'Mogas 95',
    bahrain: 'Mumtaz 95',
}

const countryCurrency = {
    uae: 'AED', saudi: 'SAR', qatar: 'QAR',
    kuwait: 'KWD', oman: 'OMR', bahrain: 'BHD',
}

export async function getFuelRate(country = 'uae') {
    try {
        const key = popularFuelKey[country] || popularFuelKey.uae
        const label = popularFuelLabel[country] || 'Special 95'
        const currency = countryCurrency[country] || 'AED'

        // Latest 2 months fetch karo
        const records = await client.fetch(
            `*[_type == "fuelRate" && country == $country] | order(year desc, month desc)[0...2]`,
            { country },
            { next: { revalidate: 3600 } }
        )

        if (!records || records.length === 0) return null

        const current = records[0]
        const previous = records[1] || null

        const currentPrice = current?.[key] ?? null
        const previousPrice = previous?.[key] ?? null

        if (currentPrice === null) return null

        let trend = 'neutral'
        if (previousPrice !== null) {
            if (currentPrice > previousPrice) trend = 'up'
            else if (currentPrice < previousPrice) trend = 'down'
        }

        return {
            fuelType: label,
            currentPrice,
            previousPrice,
            trend,
            currency,
        }
    } catch (err) {
        console.error('getFuelRate error:', err)
        return null
    }
}