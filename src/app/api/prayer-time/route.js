export const revalidate = 60

import { prayerCountries } from '@/lib/prayerCities'

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const country = searchParams.get('country')?.toLowerCase()
    const city = searchParams.get('city')?.toLowerCase()

    const countryData = prayerCountries[country] || prayerCountries.uae
    const cityKeys = Object.keys(countryData.cities)
    const selectedCityKey = countryData.cities[city] ? city : cityKeys[0]
    const cityData = countryData.cities[selectedCityKey]

    const today = new Date()
    const dateStr = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`

    try {
        const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${cityData.lat}&longitude=${cityData.lon}&method=4`
        const res = await fetch(url, { next: { revalidate: 60 } })
        const data = await res.json()

        if (data.code !== 200) {
            return Response.json({ error: 'Failed to fetch prayer times' }, { status: 500 })
        }

        const { timings, date } = data.data

        return Response.json({
            country,
            city: selectedCityKey,
            cityLabel: cityData.label,
            timings: {
                Fajr: timings.Fajr,
                Sunrise: timings.Sunrise,
                Dhuhr: timings.Dhuhr,
                Asr: timings.Asr,
                Maghrib: timings.Maghrib,
                Isha: timings.Isha,
            },
            hijri: {
                day: date.hijri.day,
                month: date.hijri.month.en,
                year: date.hijri.year,
            },
            gregorian: date.readable,
            updated: new Date().toISOString(),
        })
    } catch (err) {
        console.error('Prayer time fetch error:', err)
        return Response.json({ error: 'Failed to fetch prayer times' }, { status: 500 })
    }
}