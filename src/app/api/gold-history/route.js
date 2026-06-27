import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const country = searchParams.get('country')?.toLowerCase()

  // Last 30 days ki date calculate karo
  const from = new Date()
  from.setDate(from.getDate() - 30)
  const fromDate = from.toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' })

  const records = await client.fetch(
    `*[_type == "goldPrice" && country == $country && date >= $fromDate] | order(date asc)`,
    { country, fromDate }
  )

  // Chart ke liye format karo
  const chartData = records.map((r) => ({
    date: r.date,
    '24k': r.gold24k ? parseFloat(r.gold24k.toFixed(2)) : null,
    '22k': r.gold22k ? parseFloat(r.gold22k.toFixed(2)) : null,
    '21k': r.gold21k ? parseFloat(r.gold21k.toFixed(2)) : null,
    '18k': r.gold18k ? parseFloat(r.gold18k.toFixed(2)) : null,
    '14k': r.gold14k ? parseFloat(r.gold14k.toFixed(2)) : null,
  }))

  return Response.json(chartData)
}