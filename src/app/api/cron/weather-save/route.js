export const dynamic = 'force-dynamic'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const countryCoords = {
  uae: { lat: 25.2048, lon: 55.2708 },
  qatar: { lat: 25.2854, lon: 51.5310 },
  saudi: { lat: 24.7136, lon: 46.6753 },
  oman: { lat: 23.5880, lon: 58.3829 },
  kuwait: { lat: 29.3759, lon: 47.9774 },
  bahrain: { lat: 26.2285, lon: 50.5860 },
}

export async function GET(req) {
  try {
    const secret = req.headers.get('x-cron-secret')
    if (secret !== process.env.CRON_SECRET) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const date = new Date()
      .toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' })

    const results = []

    for (const [country, { lat, lon }] of Object.entries(countryCoords)) {

     const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,visibility&daily=sunrise,sunset&timezone=auto&forecast_days=2`

const res = await fetch(url)
const data = await res.json()

if (!data?.current) {
  results.push({ country, error: 'No weather data found' })
  continue
}

// Aaj ki date (date variable) ka exact index daily.time array mein dhoondo
const dayIndex = data.daily.time.indexOf(date)
const idx = dayIndex !== -1 ? dayIndex : 0

const weatherData = {
  temperature: data.current.temperature_2m,
  apparentTemperature: data.current.apparent_temperature,
  humidity: data.current.relative_humidity_2m,
  windSpeed: data.current.wind_speed_10m,
  visibility: data.current.visibility ? Math.round(data.current.visibility / 1000) : null,
  weatherCode: data.current.weather_code,
  sunrise: data.daily.sunrise[idx],
  sunset: data.daily.sunset[idx],
}

      const existing = await client.fetch(
        `*[_type == "weatherData" && country == $country && date == $date][0]`,
        { country, date }
      )

      if (existing) {
        await client.patch(existing._id).set(weatherData).commit()
        results.push({ country, date, action: 'updated' })
      } else {
        await client.create({
          _type: 'weatherData',
          country,
          date,
          fetchedAt: new Date().toISOString(),
          ...weatherData,
        })
        results.push({ country, date, action: 'created' })
      }
    }

    return Response.json({ success: true, results })

  } catch (err) {
    console.error('Weather save error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
