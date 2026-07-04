import { createClient } from '@sanity/client'

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: true,
})

const countryCurrency = {
    uae: 'AED',
    saudi: 'SAR',
    qatar: 'QAR',
    kuwait: 'KWD',
    oman: 'OMR',
    bahrain: 'BHD',
}

// Har country ke fuel types — display order bhi yahi rahega
const countryFuelTypes = {
    uae: [
        { key: 'uae_super98', label: 'Super 98' },
        { key: 'uae_special95', label: 'Special 95' },
        { key: 'uae_eplus91', label: 'E-Plus 91' },
        { key: 'uae_diesel', label: 'Diesel' },
    ],
    saudi: [
        { key: 'saudi_gasoline98', label: 'Gasoline 98' },
        { key: 'saudi_super95', label: 'Super 95' },
        { key: 'saudi_premium91', label: 'Premium 91' },
        { key: 'saudi_diesel', label: 'Diesel' },
    ],
    qatar: [
        { key: 'qatar_super95', label: 'Super 95' },
        { key: 'qatar_premium91', label: 'Premium 91' },
        { key: 'qatar_diesel', label: 'Diesel' },
    ],
    kuwait: [
        { key: 'kuwait_ultra98', label: 'Ultra 98' },
        { key: 'kuwait_super95', label: 'Super 95' },
        { key: 'kuwait_premium91', label: 'Premium 91' },
        { key: 'kuwait_diesel', label: 'Diesel' },
    ],
    oman: [
        { key: 'oman_mogas98', label: 'Mogas 98' },
        { key: 'oman_mogas95', label: 'Mogas 95' },
        { key: 'oman_mogas91', label: 'Mogas 91' },
        { key: 'oman_diesel', label: 'Diesel' },
    ],
    bahrain: [
        { key: 'bahrain_super98', label: 'Super 98' },
        { key: 'bahrain_mumtaz95', label: 'Mumtaz 95' },
        { key: 'bahrain_jayyid91', label: 'Jayyid 91' },
        { key: 'bahrain_diesel', label: 'Diesel' },
    ],
}

const validCountries = Object.keys(countryCurrency)

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const revalidate = 3600

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const requested = searchParams.get('country')?.toLowerCase()
    const country = validCountries.includes(requested) ? requested : 'uae'

    const now = new Date()
    const currentMonth = now.getMonth() + 1
    const currentYear = now.getFullYear()

    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1
    const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear

    const fuelTypes = countryFuelTypes[country]

    try {
        const [current, previous, history] = await Promise.all([
            client.fetch(
                `*[_type == "fuelRate" && country == $country && month == $month && year == $year][0]`,
                { country, month: currentMonth, year: currentYear }
            ),
            client.fetch(
                `*[_type == "fuelRate" && country == $country && month == $month && year == $year][0]`,
                { country, month: prevMonth, year: prevYear }
            ),
            client.fetch(
                `*[_type == "fuelRate" && country == $country] | order(year desc, month desc) [0...12]`,
                { country }
            ),
        ])

        // Rates with change % calculate karo
        const rates = fuelTypes.map(({ key, label }) => {
            const currentPrice = current?.[key] ?? null
            const previousPrice = previous?.[key] ?? null
            const change =
                currentPrice !== null && previousPrice !== null
                    ? parseFloat((((currentPrice - previousPrice) / previousPrice) * 100).toFixed(1))
                    : null

            return { fuelType: label, currentPrice, previousPrice, change }
        })

        // History — chart ke liye
        const historyFormatted = history.map((h) => {
            const entry = { label: `${months[h.month - 1]} ${h.year}` }
            fuelTypes.forEach(({ key, label }) => {
                entry[label] = h[key] ?? null
            })
            return entry
        })

        return Response.json({
            country,
            currency: countryCurrency[country],
            currentMonth: current ? `${months[current.month - 1]} ${current.year}` : null,
            previousMonth: previous ? `${months[previous.month - 1]} ${previous.year}` : null,
            rates,
            history: historyFormatted,
        })

    } catch (err) {
        console.error('Fuel rates fetch error:', err)
        return Response.json({ error: 'Failed to fetch fuel rates' }, { status: 500 })
    }
}