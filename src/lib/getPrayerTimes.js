import { prayerCountries } from '@/lib/prayerCities'

// Gulf cities ka Vercel city name se mapping
const cityNameMap = {
    // UAE
    'dubai': 'dubai',
    'abu dhabi': 'abu-dhabi',
    'sharjah': 'sharjah',
    'ajman': 'ajman',
    'fujairah': 'fujairah',
    'ras al-khaimah': 'rak',
    'ras al khaimah': 'rak',
    'umm al-quwain': 'umm-al-quwain',
    'umm al quwain': 'umm-al-quwain',
    // Saudi
    'riyadh': 'riyadh',
    'mecca': 'makkah',
    'makkah': 'makkah',
    'dammam': 'dammam',
    // Qatar
    'doha': 'doha',
    // Oman
    'muscat': 'muscat',
    // Kuwait
    'kuwait city': 'kuwait-city',
    'kuwait': 'kuwait-city',
    // Bahrain
    'manama': 'manama',
}

// Country ka default city
const countryDefaultCity = {
    uae: 'dubai',
    saudi: 'riyadh',
    qatar: 'doha',
    oman: 'muscat',
    kuwait: 'kuwait-city',
    bahrain: 'manama',
}

export async function getPrayerTimes(country = 'uae', vercelCity = null) {
    try {
        const countryData = prayerCountries[country] || prayerCountries.uae

        // Vercel city se match karo, nahi to default city use karo
        const normalizedCity = vercelCity?.toLowerCase().trim()
        const matchedCityKey = cityNameMap[normalizedCity] || countryDefaultCity[country] || 'dubai'

        // Confirm karo city us country ki list me hai
        const cityKey = countryData.cities[matchedCityKey]
            ? matchedCityKey
            : Object.keys(countryData.cities)[0]

        const cityData = countryData.cities[cityKey]

        const today = new Date()
        const dateStr = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`

        const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${cityData.lat}&longitude=${cityData.lon}&method=4`
        const res = await fetch(url, { next: { revalidate: 300 } })
        const data = await res.json()

        if (data.code !== 200) return null

        const { timings, date } = data.data

        const prayerOrder = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
        const hindiNames = {
            Fajr: 'फज्र', Sunrise: 'सूर्योदय',
            Dhuhr: 'ज़ुहर', Asr: 'अस्र',
            Maghrib: 'मग़रिब', Isha: 'इशा',
        }

        // Next upcoming prayer find karo
        const nowMs = Date.now()
        let nextPrayer = null

        for (const name of prayerOrder) {
            const [h, m] = timings[name].split(':').map(Number)
            const prayerMs = new Date().setHours(h, m, 0, 0)
            if (prayerMs > nowMs) {
                const diffMs = prayerMs - nowMs
                const hours = Math.floor(diffMs / (1000 * 60 * 60))
                const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)
                nextPrayer = {
                    name,
                    nameHindi: hindiNames[name],
                    time: timings[name],
                    hoursLeft: hours,
                    minutesLeft: minutes,
                    secondsLeft: seconds,
                    totalSecondsLeft: Math.floor(diffMs / 1000),
                }
                break
            }
        }

        // Agar sab prayers guzar gayi to kal ka Fajr (approximate)
        if (!nextPrayer) {
            const [h, m] = timings['Fajr'].split(':').map(Number)
            const tomorrowFajr = new Date()
            tomorrowFajr.setDate(tomorrowFajr.getDate() + 1)
            tomorrowFajr.setHours(h, m, 0, 0)
            const diffMs = tomorrowFajr - new Date()
            const hours = Math.floor(diffMs / (1000 * 60 * 60))
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
            nextPrayer = {
                name: 'Fajr',
                nameHindi: 'फज्र',
                time: timings['Fajr'],
                hoursLeft: hours,
                minutesLeft: minutes,
                secondsLeft: 0,
                totalSecondsLeft: Math.floor(diffMs / 1000),
            }
        }

        return {
            country,
            city: cityKey,
            cityLabel: cityData.label,
            nextPrayer,
        }
    } catch (err) {
        console.error('getPrayerTimes error:', err)
        return null
    }
}