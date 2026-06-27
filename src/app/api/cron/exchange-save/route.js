import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const countryMap = {
  uae: 'aed',
  qatar: 'qar',
  saudi: 'sar',
  oman: 'omr',
  kuwait: 'kwd',
  bahrain: 'bhd',
}

export async function GET(req) {
  try {
    const secret = req.headers.get('x-cron-secret')
    if (secret !== process.env.CRON_SECRET) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const date = new Date()
      .toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' })

    const hour = new Date().getUTCHours()
    const slot = hour >= 9 ? 'evening' : 'morning'

    const results = []

    for (const [country, currencyCode] of Object.entries(countryMap)) {

      // Live rates fetch karo is local currency ke liye (base currency)
      const res = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyCode}.json`
      )
      const data = await res.json()
      const rates = data[currencyCode]

      if (!rates) {
        results.push({ country, error: 'No rates found' })
        continue
      }

      const exchangeData = {
        INR: rates.inr,
        PKR: rates.pkr,
        PHP: rates.php,
        LKR: rates.lkr,
        NPR: rates.npr,
        BDT: rates.bdt,
      }

      const existing = await client.fetch(
        `*[_type == "exchangeRate" && country == $country && date == $date && slot == $slot][0]`,
        { country, date, slot }
      )

      if (existing) {
        await client.patch(existing._id).set({
          rates: exchangeData
        }).commit()
        results.push({ country, date, slot, action: 'updated' })
      } else {
        await client.create({
          _type: 'exchangeRate',
          country,
          date,
          slot,
          rates: exchangeData,
        })
        results.push({ country, date, slot, action: 'created' })
      }
    }

    return Response.json({ success: true, results })

  } catch (err) {
    console.error('Exchange save error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}