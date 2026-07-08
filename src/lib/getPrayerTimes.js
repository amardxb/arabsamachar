import { prayerCountries } from '@/lib/prayerCities'

const cityNameMap = {
    'dubai': 'dubai',
    'abu dhabi': 'abu-dhabi',
    'sharjah': 'sharjah',
    'ajman': 'ajman',
    'fujairah': 'fujairah',
    'ras al-khaimah': 'rak',
    'ras al khaimah': 'rak',
    'umm al-quwain': 'umm-al-quwain',
    'umm al quwain': 'umm-al-quwain',
    'riyadh': 'riyadh',
    'mecca': 'makkah',
    'makkah': 'makkah',
    'dammam': 'dammam',
    'doha': 'doha',
    'muscat': 'muscat',
    'kuwait city': 'kuwait-city',
    'kuwait': 'kuwait-city',
    'manama': 'manama',
}

const countryDefaultCity = {
    uae: 'dubai',
    saudi: 'riyadh',
    qatar: 'doha',
    oman: 'muscat',
    kuwait: 'kuwait-city',
    bahrain: 'manama',
}

const countryUtcOffset = {
    uae: 4,
    saudi: 3,
    qatar: 3,
    oman: 4,
    kuwait: 3,
    bahrain: 3,
}

function buildPrayerDateUTC(timeStr, offsetHours, dayOffset = 0) {
    const [h, m] = timeStr.split(':').map(Number)
    const now = new Date()
    return new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + dayOffset,
        h - offsetHours,
        m,
        0,
        0
    ))
}

export async function getPrayerTimes(country = 'uae', vercelCity = null) {
    try {
        const countryData = prayerCountries[country] || prayerCountries.uae
        const offset = countryUtcOffset[country] ?? 4

        const normalizedCity = vercelCity?.toLowerCase().trim()
        const matchedCityKey = cityNameMap[normalizedCity] || countryDefaultCity[country] || 'dubai'

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

        const { timings } = data.data

        const prayerOrder = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
        const hindiNames = {
            Fajr: 'फज्र', Sunrise: 'सूर्योदय',
            Dhuhr: 'ज़ुहर', Asr: 'अस्र',
            Maghrib: 'मग़रिब', Isha: 'इशा',
        }

        const nowMs = Date.now()
        let nextPrayer = null

        for (const name of prayerOrder) {
            const prayerMs = buildPrayerDateUTC(timings[name], offset).getTime()
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

        if (!nextPrayer) {
            const tomorrowFajrMs = buildPrayerDateUTC(timings['Fajr'], offset, 1).getTime()
            const diffMs = tomorrowFajrMs - nowMs
            const hours = Math.floor(diffMs / (1000 * 60 * 60))
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)
            nextPrayer = {
                name: 'Fajr',
                nameHindi: 'फज्र',
                time: timings['Fajr'],
                hoursLeft: hours,
                minutesLeft: minutes,
                secondsLeft: seconds,
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