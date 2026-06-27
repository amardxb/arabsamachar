'use client'

import { useState } from 'react'

const currencyInfo = {
  INR: { name: "INDIAN RUPEE", flag: "/flags/in.svg" },
  PHP: { name: "PHILIPPINE PESO", flag: "/flags/ph.svg" },
  PKR: { name: "PAKISTANI RUPEE", flag: "/flags/pk.svg" },
  BDT: { name: "BANGLADESHI TAKA", flag: "/flags/bd.svg" },
  LKR: { name: "SRI LANKAN RUPEE", flag: "/flags/lk.svg" },
  NPR: { name: "NEPALESE RUPEE", flag: "/flags/np.svg" },
}

export default function ExchangeTable({ data, country, currency }) {
  const [activeCurrency, setActiveCurrency] = useState(null)

  if (!data) {
    return <p className="text-gray-500">No data found for {country}</p>
  }

  const currencies = Object.keys(currencyInfo)

  const per1000 = (rate) => {
    if (rate == null) return null
    return (1000 / rate).toFixed(2)
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    const day = d.getDate()
    const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th'
    const month = d.toLocaleString('en-US', { month: 'short' })
    return `${day}${suffix} ${month} ${d.getFullYear()}`
  }

  return (
    <div className="mt-8 rounded-lg overflow-hidden border border-gray-200 bg-white">

      {/* TITLE */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-lg font-bold text-gray-900">
          {country?.toUpperCase()} Money Transfer Exchange Rates
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-gray-600">{formatDate(data.updated)}</span>
          <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            LIVE
          </span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Updated {Math.floor((Date.now() - new Date(data.updated)) / 60000)} minutes ago
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 border-t border-gray-200">
              <th className="p-3 text-left font-semibold text-gray-700">Currencies</th>
              <th className="p-3 text-left font-semibold text-gray-700">Morning</th>
              <th className="p-3 text-left font-semibold text-gray-700">Evening</th>
              <th className="p-3 text-left font-semibold text-gray-700">Yesterday</th>
            </tr>
          </thead>

          <tbody>
            {currencies.map((cur) => {
              const rates = data.rates?.[cur] || {}
              const info = currencyInfo[cur]

              return (
                <tr
                  key={cur}
                  onClick={() => setActiveCurrency(cur)}
                  className="border-t border-gray-200 cursor-pointer hover:bg-gray-50"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                        <img
                          src={info.flag}
                          alt={cur}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-[13px] leading-tight">{info.name}</div>
                        <div className="text-[11px] text-gray-500">({cur})</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="font-semibold text-gray-900">{rates.morning?.toFixed(2) ?? "-"}</div>
                    {rates.morning != null && (
                      <div className="text-[11px] text-gray-500">
                        {currency} {per1000(rates.morning)}<br/>/ 1000 {cur}
                      </div>
                    )}
                  </td>

                  <td className="p-3">
                    <div className="font-semibold text-gray-900">{rates.evening?.toFixed(2) ?? "-"}</div>
                    {rates.evening != null && (
                      <div className="text-[11px] text-gray-500">
                        {currency} {per1000(rates.evening)}<br/>/ 1000 {cur}
                      </div>
                    )}
                  </td>

                  <td className="p-3">
                    <div className="font-semibold text-gray-900">{rates.yesterday?.toFixed(2) ?? "-"}</div>
                    {rates.yesterday != null && (
                      <div className="text-[11px] text-gray-500">
                        {currency} {per1000(rates.yesterday)}<br/>/ 1000 {cur}
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER HINT */}
      <div className="px-4 py-3 text-xs text-gray-500 border-t border-gray-200">
        Click the currency type to view past 30 days rate
      </div>

    </div>
  )
}