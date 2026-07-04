'use client'

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const lineColors = [
    '#16a34a', // green-600
    '#2563eb', // blue-600
    '#d97706', // amber-600
    '#dc2626', // red-600
]

const subunitConfig = {
    bahrain: { name: 'Fils' },
    oman: { name: 'Baisa' },
    kuwait: { name: 'Fils' },
}

export default function FuelRateChart({ data }) {
    if (!data?.history?.length) {
        return (
            <div className="w-full bg-gray-100 rounded-lg p-6 text-center text-gray-400 mt-6">
                चार्ट डेटा उपलब्ध नहीं है
            </div>
        )
    }

    const { history, currency, country } = data

    // Bahrain/Oman/Kuwait mein data Fils/Baisa (whole numbers, bade range) mein hai,
    // baaki countries mein major currency (decimals, 2-7 jaisa chhota range)
    const subunit = subunitConfig[country] || null
    const unitLabel = subunit ? subunit.name : currency

    // Chart ke liye data reverse karo — purana pehle, naya baad mein
    const chartData = [...history].reverse().slice(-6)

    // Fuel type keys — pehli entry se nikalo (label chhodke)
    const fuelKeys = Object.keys(chartData[0] || {}).filter(k => k !== 'label')

    // Y-axis tick format — subunit mein whole number, warna 2-decimal
    const formatTick = (v) => (subunit ? Math.round(v) : v.toFixed(2))

    // Y-axis domain — subunit ke liye data ke actual range ka ~15% buffer (chahe price 80 ho ya 250,
    // dono cases mein sahi proportion mein spread milega), major currency ke liye purana fixed 2-7 range
    const yDomain = subunit
        ? [
            (dataMin) => Math.max(0, Math.floor(dataMin - Math.max(dataMin * 0.15, 5))),
            (dataMax) => Math.ceil(dataMax + Math.max(dataMax * 0.15, 5)),
        ]
        : [2, (dataMax) => Math.max(5, Math.ceil(dataMax + 0.5))]

    return (
        <div className="w-full rounded-xl border border-green-200 overflow-hidden mt-6">

            {/* HEADER */}
            <div className="bg-[#0f172a] text-white px-4 py-3 flex items-center justify-between">
                <h2 className="font-bold text-sm md:text-base">
                    📈 मासिक फ्यूल रेट ट्रेंड
                </h2>
                <span className="text-xs text-gray-400">{unitLabel}/Ltr</span>
            </div>

            {/* CHART */}
            <div className="bg-white px-2 py-5">
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
                        <XAxis
                            dataKey="label"
                            tick={{ fontSize: 11, fill: '#6b7280' }}
                            tickLine={false}
                            axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: '#6b7280' }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={formatTick}
                            width={45}
                            domain={yDomain}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '8px',
                                border: '1px solid #d1fae5',
                                fontSize: '12px',
                            }}
                            formatter={(value, name) => [
                                `${unitLabel} ${formatTick(value)}`,
                                name,
                            ]}
                        />
                        <Legend
                            wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
                        />
                        {fuelKeys.map((key, i) => (
                            <Line
                                key={key}
                                type="monotone"
                                dataKey={key}
                                name={key}
                                stroke={lineColors[i % lineColors.length]}
                                strokeWidth={1}
                                dot={{ r: 2, fill: lineColors[i % lineColors.length] }}
                                activeDot={{ r: 3 }}
                                connectNulls={false}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    )
}
