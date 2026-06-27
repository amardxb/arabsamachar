'use client'

import { useEffect, useState } from 'react'

const currencies = ["INR", "PKR", "PHP", "LKR", "NPR", "BDT"]

export default function ExchangeHistoryTable({ country, currency }) {
  const [historyData, setHistoryData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/exchange-history?country=${country}`)
      .then((r) => r.json())
      .then((data) => {
        setHistoryData(data)
        setLoading(false)
      })
  }, [country])

  if (loading) {
    return <div className="p-5 text-center text-gray-500">Table load ho raha hai...</div>
  }

  if (!historyData.length) {
    return null
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    const day = d.getDate()
    const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th'
    const month = d.toLocaleString('en-US', { month: 'short' })
    return `${day}${suffix} ${month} ${d.getFullYear()}`
  }

  const sortedData = [...historyData].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="bg-[#0f172a] text-white px-4 py-3 font-bold text-sm">
        पिछले 30 दिन का Exchange Rate हिस्ट्री ({country?.toUpperCase()})
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
              {currencies.map((cur) => (
                <th key={cur} className="px-4 py-3 text-left font-semibold text-gray-700">{cur}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, i) => (
              <tr key={item.date} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-3 text-gray-800">{formatDate(item.date)}</td>
                {currencies.map((cur) => (
                  <td key={cur} className="px-4 py-3 text-gray-800">
                    {item[cur]?.toFixed(2) ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}