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

export default function GoldChart({ country, currency }) {
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCarats, setActiveCarats] = useState(['24k'])

  useEffect(() => {
    fetch(`/api/gold-history?country=${country}`)
      .then((r) => r.json())
      .then((data) => {
        setChartData(data)
        setLoading(false)
      })
  }, [country])

  const caratOptions = ['24k', '22k', '21k', '18k', '14k']
  const colors = {
    '24k': '#f59e0b',
    '22k': '#d97706',
    '21k': '#b45309',
    '18k': '#92400e',
    '14k': '#78350f',
  }

  const borderColors = {
    '24k': 'border-[#f59e0b]',
    '22k': 'border-[#d97706]',
    '21k': 'border-[#b45309]',
    '18k': 'border-[#92400e]',
    '14k': 'border-[#78350f]',
  }

  const toggleCarat = (carat) => {
    setActiveCarats((prev) =>
      prev.includes(carat)
        ? prev.filter((c) => c !== carat)
        : [...prev, carat]
    )
  }

  if (loading) {
    return (
      <div className="p-5 text-center text-gray-500">
        Chart load ho raha hai...
      </div>
    )
  }

  if (!chartData.length) {
    return (
      <div className="p-5 text-center text-gray-500">
        अभी पर्याप्त डेटा नहीं है। कल से chart दिखेगा।
      </div>
    )
  }

  return (
    <div className="w-full border border-gray-200 rounded-[10px] overflow-hidden bg-white font-sans mt-16 mb-16">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#f5d98a] to-[#e8b84b] text-[#5c4314] px-4 py-3.5 font-bold text-[15px]">
        📈 पिछले 30 दिन - Gold Trend ({country?.toUpperCase()})
      </div>

      {/* Carat toggles */}
      <div className="px-4 py-3 flex gap-2 flex-wrap border-b border-gray-200 bg-gray-50">
        {caratOptions.map((carat) => (
          <button
            key={carat}
            onClick={() => toggleCarat(carat)}
            className={`px-3 py-1 rounded-full border-2 font-semibold text-[13px] cursor-pointer ${borderColors[carat]} ${
              activeCarats.includes(carat) ? "text-white" : "bg-white"
            }`}
            style={{
              backgroundColor: activeCarats.includes(carat) ? colors[carat] : undefined,
              color: activeCarats.includes(carat) ? "#fff" : colors[carat],
            }}
          >
            {carat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
              tickFormatter={(val) => val.slice(5)}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              tickFormatter={(val) => val.toFixed(0)}
              width={55}
            />
            <Tooltip
              formatter={(val, name) => [
                `${currency} ${val.toFixed(2)}`,
                name.toUpperCase(),
              ]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            {caratOptions
              .filter((c) => activeCarats.includes(c))
              .map((carat) => (
                <Line
                  key={carat}
                  type="monotone"
                  dataKey={carat}
                  stroke={colors[carat]}
                  strokeWidth={2}
                  dot={false}
                  name={carat}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="px-4 py-2.5 text-[11px] text-gray-500 bg-gray-50 border-t border-gray-200">
        ⚡ प्रतिदिन सुबह 9 बजे अपडेट होता है | संदर्भ मात्र
      </div>
    </div>
  )
}