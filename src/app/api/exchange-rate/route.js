import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const countryMap = {
  uae: 'AED',
  qatar: 'QAR',
  saudi: 'SAR',
  oman: 'OMR',
  kuwait: 'KWD',
  bahrain: 'BHD',
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const country = searchParams.get('country')?.toLowerCase()
  const currency = countryMap[country] || 'AED'

  // Aaj ki date (UAE timezone)
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' })

  // Kal ki date
  const yesterdayObj = new Date()
  yesterdayObj.setDate(yesterdayObj.getDate() - 1)
  const yesterdayDate = yesterdayObj.toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' })

  // Aaj ke morning + evening dono slots fetch karo
  const todayRecords = await client.fetch(
    `*[_type == "exchangeRate" && country == $country && date == $today]`,
    { country, today }
  )

  // Kal ka koi bhi ek record (evening preferred, warna morning) fetch karo "yesterday" ke liye
  const yesterdayRecords = await client.fetch(
    `*[_type == "exchangeRate" && country == $country && date == $yesterdayDate] | order(slot desc)`,
    { country, yesterdayDate }
  )

  const morningRecord = todayRecords.find(r => r.slot === 'morning')
  const eveningRecord = todayRecords.find(r => r.slot === 'evening')
  const yesterdayRecord = yesterdayRecords[0] // evening agar hai, warna morning

  const currencyKeys = ['INR', 'PKR', 'PHP', 'LKR', 'NPR', 'BDT']

  const result = {}
  currencyKeys.forEach((key) => {
    result[key] = {
      morning: morningRecord?.rates?.[key] ?? null,
      evening: eveningRecord?.rates?.[key] ?? null,
      yesterday: yesterdayRecord?.rates?.[key] ?? null,
    }
  })

  return Response.json({
    country,
    currency,
    rates: result,
    updated: new Date().toISOString(),
  })
}