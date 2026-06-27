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
    `*[_type == "exchangeRate" && country == $country && date >= $fromDate] | order(date asc)`,
    { country, fromDate }
  )

  // Har date ke liye sirf ek record rakho (evening preferred, warna morning)
  const dateMap = {}
  records.forEach((r) => {
    if (!dateMap[r.date] || r.slot === 'evening') {
      dateMap[r.date] = r
    }
  })

  // Chart/table ke liye format karo
  const chartData = Object.values(dateMap)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((r) => ({
      date: r.date,
      INR: r.rates?.INR ?? null,
      PKR: r.rates?.PKR ?? null,
      PHP: r.rates?.PHP ?? null,
      LKR: r.rates?.LKR ?? null,
      NPR: r.rates?.NPR ?? null,
      BDT: r.rates?.BDT ?? null,
    }))

  return Response.json(chartData)
}