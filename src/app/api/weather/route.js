 
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
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
  const { searchParams } = new URL(req.url)
  const validCountries = Object.keys(countryCoords)
  const requested = searchParams.get('country')?.toLowerCase()
  const country = validCountries.includes(requested) ? requested : 'uae'

  const coords = countryCoords[country] || countryCoords.uae
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' })

  const current = await client.fetch(
    `*[_type == "weatherData" && country == $country && date == $today][0]`,
    { country, today },
    { next: { revalidate: 0 } }
  )

  const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,weather_code,sunrise,sunset&timezone=auto&forecast_days=7`
  const forecastRes = await fetch(forecastUrl, { cache: 'no-store' })
  const forecastData = await forecastRes.json()
  const forecast = forecastData.daily.time.map((dateStr, i) => ({
    date: dateStr,
    maxTemp: forecastData.daily.temperature_2m_max[i],
    minTemp: forecastData.daily.temperature_2m_min[i],
    apparentMax: forecastData.daily.apparent_temperature_max[i],
    apparentMin: forecastData.daily.apparent_temperature_min[i],
    weatherCode: forecastData.daily.weather_code[i],
    sunrise: forecastData.daily.sunrise[i],
    sunset: forecastData.daily.sunset[i],
  }))

  return Response.json({
    country,
    current: current || null,
    forecast,
    updated: new Date().toISOString(),
  })
}
