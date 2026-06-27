'use client'

import { useEffect, useState } from 'react'

export default function GoldHistoryTable({ country }) {
  const [historyData, setHistoryData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/gold-history?country=${country}`)
      .then((r) => r.json())
      .then((data) => {
        setHistoryData(data)
        setLoading(false)
      })
  }, [country])

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
        Table load ho raha hai...
      </div>
    )
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
    <div className="w-full rounded-2xl overflow-hidden shadow-lg mt-16 mb-20">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#f5d98a] to-[#e8b84b] px-5 py-4">
        <div className="font-bold text-[#5c4314] text-[15px]">
          पिछले 30 दिन का गोल्ड रेट हिस्ट्री ({country?.toUpperCase()})
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-gradient-to-br from-[#fbe7b8] to-[#f3c969]">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#5c4314]/10">
              <th className="p-2.5 text-center font-bold text-[#5c4314]">Date</th>
              <th className="p-2.5 text-center font-bold text-[#5c4314]">24 Carat</th>
              <th className="p-2.5 text-center font-bold text-[#5c4314]">22 Carat</th>
              <th className="p-2.5 text-center font-bold text-[#5c4314]">21 Carat</th>
              <th className="p-2.5 text-center font-bold text-[#5c4314]">18 Carat</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, i) => (
              <tr
                key={item.date}
                className={`border-b border-[#e8b84b]/30 ${i % 2 === 0 ? "bg-[#fffaf0]/40" : "bg-transparent"}`}
              >
                <td className="p-2.5 text-center text-[#5c4314]">{formatDate(item.date)}</td>
                <td className="p-2.5 text-center text-[#5c4314]">{item['24k']?.toFixed(2)}</td>
                <td className="p-2.5 text-center text-[#5c4314]">{item['22k']?.toFixed(2)}</td>
                <td className="p-2.5 text-center text-[#5c4314]">{item['21k']?.toFixed(2)}</td>
                <td className="p-2.5 text-center text-[#8a6d2f]">{item['18k']?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
