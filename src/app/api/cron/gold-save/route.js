import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
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

const fx = {
  AED: 3.67,
  QAR: 3.64,
  SAR: 3.75,
  OMR: 0.385,
  KWD: 0.31,
  BHD: 0.38,
}

export async function GET(req) {
  // Secret check - unauthorized access se bachao
  // const secret = req.headers.get('x-cron-secret')
  // if (secret !== process.env.CRON_SECRET) {
  //   return Response.json({ error: 'Unauthorized' }, { status: 401 })
  // }

  try {
    // Gold spot price fetch karo
    const res = await fetch('https://api.gold-api.com/price/XAU/USD')
    const data = await res.json()
    const goldPerGramUSD = data.price / 31.1035

    // Silver spot price fetch karo
    const silverRes = await fetch('https://api.gold-api.com/price/XAG/USD')
    const silverData = await silverRes.json()
    const silverPerGramUSD = silverData.price / 31.1035

    // UAE date (YYYY-MM-DD)
    const date = new Date()
      .toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' })

    const results = []

    for (const [country, currency] of Object.entries(countryMap)) {
      const priceLocal = goldPerGramUSD * fx[currency]
      const retail = priceLocal * 1.035

      const silverPriceLocalPerGram = silverPerGramUSD * fx[currency]
      const silverRetailPerGram = silverPriceLocalPerGram * 1.035
      const silverRetailPerKg = silverRetailPerGram * 1000

      const prices = {
        gold24k: retail,
        gold22k: retail * 0.916,
        gold21k: retail * 0.875,
        gold18k: retail * 0.75,
        gold14k: retail * 0.585,
        silver999: silverRetailPerKg,
      }

      // Check karo aaj ka record already hai ya nahi
      const existing = await client.fetch(
        `*[_type == "goldPrice" && country == $country && date == $date][0]`,
        { country, date }
      )

      if (existing) {
        // Update karo
        await client.patch(existing._id).set(prices).commit()
        results.push({ country, date, action: 'updated' })
      } else {
        // Naya document banao
        await client.create({
          _type: 'goldPrice',
          country,
          date,
          ...prices,
        })
        results.push({ country, date, action: 'created' })
      }
    }

    return Response.json({ success: true, results })
  } catch (err) {
    console.error('Gold save error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}