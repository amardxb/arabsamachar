import { createClient } from '@sanity/client'
import { buildSlots } from '@/lib/goldSlots'

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

const fx = {
  AED: 3.67,
  QAR: 3.64,
  SAR: 3.75,
  OMR: 0.385,
  KWD: 0.31,
  BHD: 0.38,
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const country = searchParams.get('country')?.toLowerCase()
  const currency = countryMap[country] || 'AED'

  // Yesterday ki date (UAE timezone)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayDate = yesterday.toLocaleDateString('en-CA', {
    timeZone: 'Asia/Dubai',
  })

  // Sanity se yesterday ka data fetch karo
  const savedYesterday = await client.fetch(
    `*[_type == "goldPrice" && country == $country && date == $date][0]`,
    { country, date: yesterdayDate }
  )

  // ───── GOLD ─────
  const res = await fetch('https://api.gold-api.com/price/XAU/USD')
  const data = await res.json()
  const goldPerGramUSD = data.price / 31.1035
  const priceLocal = goldPerGramUSD * fx[currency]
  const retail = priceLocal * 1.023

  // ───── SILVER ─────
  const silverRes = await fetch('https://api.gold-api.com/price/XAG/USD')
  const silverData = await silverRes.json()
  const silverPerGramUSD = silverData.price / 31.1035
  const silverPriceLocalPerGram = silverPerGramUSD * fx[currency]
  const silverRetailPerGram = silverPriceLocalPerGram * 1.023
  const silverRetailPerKg = silverRetailPerGram * 1000

  // Helper - yesterday value Sanity se ya fallback
  const getYesterday = (key, multiplier) => {
    if (savedYesterday?.[key]) return savedYesterday[key]
    return retail * multiplier * 0.99
  }

  const getSilverYesterday = () => {
    if (savedYesterday?.silver999) return savedYesterday.silver999
    return silverRetailPerKg * 0.99
  }

  const buildSlotsWithYesterday = (livePrice, yesterdayPrice) => {
    const slots = buildSlots(livePrice)
    return {
      ...slots,
      yesterday: yesterdayPrice,
    }
  }

  return Response.json({
    country,
    currency,
    '24k': buildSlotsWithYesterday(retail, getYesterday('gold24k', 1)),
    '22k': buildSlotsWithYesterday(retail * 0.9175, getYesterday('gold22k', 0.9175)),
    '21k': buildSlotsWithYesterday(retail * 0.877, getYesterday('gold21k', 0.877)),
    '18k': buildSlotsWithYesterday(retail * 0.752, getYesterday('gold18k', 0.752)),
    '14k': buildSlotsWithYesterday(retail * 0.586, getYesterday('gold14k', 0.586)),
    silver999: buildSlotsWithYesterday(silverRetailPerKg, getSilverYesterday()),
    updated: new Date().toISOString(),
  })
}