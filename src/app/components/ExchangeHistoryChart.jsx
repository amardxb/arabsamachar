'use client'

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const currencyInfo = {
  INR: { name: "Indian Rupee", color: "#8b5cf6" },
  PKR: { name: "Pakistani Rupee", color: "#06b6d4" },
  PHP: { name: "Philippine Peso", color: "#f59e0b" },
  LKR: { name: "Sri Lankan Rupee", color: "#10b981" },
  NPR: { name: "Nepalese Rupee", color: "#ef4444" },
  BDT: { name: "Bangladeshi Taka", color: "#6366f1" },
}

export default function ExchangeHistoryChart({ country, currency }) {
  const [historyData, setHistoryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCurrencies, setActiveCurrencies] = useState(['INR'])

  useEffect(() => {
    fetch(`/api/exchange-history?country=${country}`)
      .then((r) => r.json())
      .then((data) => {
        setHistoryData(data)
        setLoading(false)
      })
  }, [country])

  const toggleCurrency = (cur) => {
    setActiveCurrencies((prev) =>
      prev.includes(cur) ? prev.filter((c) => c !== cur) : [...prev, cur]
    )
  }

  if (loading) {
    return (
      <div className="p-5 text-center text-gray-500">
        Chart load ho raha hai...
      </div>
    )
  }

  if (!historyData.length) {
    return (
      <div className="p-5 text-center text-gray-500">
        अभी पर्याप्त डेटा नहीं है। कल से chart दिखेगा।
      </div>
    )
  }

  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white mt-8">

      {/* Header */}
      <div className="bg-[#0f172a] px-4 py-3.5 font-bold text-[15px] text-white">
        📈 पिछले 30 दिन - Exchange Rate Trend ({country?.toUpperCase()})
      </div>

      {/* Currency toggles */}
      <div className="px-4 py-3 flex gap-2 flex-wrap border-b border-gray-200 bg-gray-50">
        {Object.keys(currencyInfo).map((cur) => (
          <button
            key={cur}
            onClick={() => toggleCurrency(cur)}
            className="px-3 py-1 rounded-full border-2 font-semibold text-[13px] cursor-pointer"
            style={{
              borderColor: currencyInfo[cur].color,
              backgroundColor: activeCurrencies.includes(cur) ? currencyInfo[cur].color : "#fff",
              color: activeCurrencies.includes(cur) ? "#fff" : currencyInfo[cur].color,
            }}
          >
            {cur}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
              tickFormatter={(val) => val.slice(5)}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              domain={['auto', 'auto']}
              width={50}
            />
            <Tooltip
              formatter={(val, name) => [`${val?.toFixed(2)}`, name]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            {Object.keys(currencyInfo)
              .filter((c) => activeCurrencies.includes(c))
              .map((cur) => (
                <Line
                  key={cur}
                  type="monotone"
                  dataKey={cur}
                  stroke={currencyInfo[cur].color}
                  strokeWidth={2}
                  dot={false}
                  name={cur}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="px-4 py-2.5 text-[11px] text-gray-500 bg-gray-50 border-t border-gray-200">
        ⚡ Rate {currency} में, प्रतिदिन अपडेट होता है
      </div>
    </div>
  )
}