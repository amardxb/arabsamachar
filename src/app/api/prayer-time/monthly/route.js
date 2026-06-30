export const revalidate = 3600 // 1 hour cache, monthly data changes rarely

import { prayerCountries } from '@/lib/prayerCities'

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const country = searchParams.get('country')?.toLowerCase()
    const city = searchParams.get('city')?.toLowerCase()
    const month = searchParams.get('month') // 1-12
    const year = searchParams.get('year')

    const countryData = prayerCountries[country] || prayerCountries.uae
    const cityKeys = Object.keys(countryData.cities)
    const selectedCityKey = countryData.cities[city] ? city : cityKeys[0]
    const cityData = countryData.cities[selectedCityKey]

    const now = new Date()
    const targetMonth = month || (now.getMonth() + 1)
    const targetYear = year || now.getFullYear()

    try {
        const url = `https://api.aladhan.com/v1/calendar?latitude=${cityData.lat}&longitude=${cityData.lon}&method=4&month=${targetMonth}&year=${targetYear}`
        const res = await fetch(url, { next: { revalidate: 3600 } })  // monthly route.js wale me 3600
        const data = await res.json()

        if (data.code !== 200) {
            return Response.json({ error: 'Failed to fetch calendar' }, { status: 500 })
        }

        const days = data.data.map((entry) => ({
            date: entry.date.gregorian.day + ' ' + entry.date.gregorian.month.en,
            hijriDay: entry.date.hijri.day,
            hijriMonth: entry.date.hijri.month.en,
            Fajr: entry.timings.Fajr.split(' ')[0],
            Sunrise: entry.timings.Sunrise.split(' ')[0],
            Dhuhr: entry.timings.Dhuhr.split(' ')[0],
            Asr: entry.timings.Asr.split(' ')[0],
            Maghrib: entry.timings.Maghrib.split(' ')[0],
            Isha: entry.timings.Isha.split(' ')[0],
        }))

        return Response.json({
            country,
            city: selectedCityKey,
            month: targetMonth,
            year: targetYear,
            days,
        })
    } catch (err) {
        console.error('Monthly calendar fetch error:', err)
        return Response.json({ error: 'Failed to fetch calendar' }, { status: 500 })
    }
}