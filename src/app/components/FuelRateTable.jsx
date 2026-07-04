const subunitConfig = {
    bahrain: { name: 'Fils' },
    oman: { name: 'Baisa' },
    kuwait: { name: 'Fils' },
}

export default function FuelRateTable({ data }) {
    if (!data?.rates?.length) {
        return (
            <div className="w-full bg-gray-100 rounded-lg p-6 text-center text-gray-400">
                डेटा उपलब्ध नहीं है
            </div>
        )
    }

    const { rates, currency, currentMonth, previousMonth, country } = data

    // Bahrain/Oman/Kuwait ke liye heading mein Fils/Baisa dikhega, baaki countries mein normal currency
    const subunit = subunitConfig[country] || null
    const unitLabel = subunit ? subunit.name : currency

    // Subunit countries mein price whole number (Fils/Baisa) hai, decimal nahi chahiye
    const formatPrice = (price) => {
        if (price === null || price === undefined) return '—'
        return subunit ? Math.round(price) : price.toFixed(2)
    }

    return (
        <div className="w-full overflow-hidden rounded-lg border border-gray-200">
            <div className="bg-[#0f172a] text-white px-4 py-2">
                <h2 className="font-bold text-sm md:text-base">
                    पेट्रोल / डीजल रेट ({unitLabel}/Ltr)
                </h2>
                {currentMonth && (
                    <p className="text-xs text-gray-400 mt-0.5">{currentMonth}</p>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-700">
                                {currentMonth || 'Current'}
                            </th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-700">
                                {previousMonth || 'Previous'}
                            </th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-700">Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rates.map((row, i) => (
                            <tr key={row.fuelType} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 py-4 font-medium text-gray-800">{row.fuelType}</td>
                                <td className="px-4 py-4 text-center font-bold text-gray-900">
                                    {formatPrice(row.currentPrice)}
                                </td>
                                <td className="px-4 py-4 text-center text-gray-600">
                                    {formatPrice(row.previousPrice)}
                                </td>
                                <td className="px-4 py-4 text-center">
                                    {row.change !== null ? (
                                        <span className={`inline-flex items-center gap-1 font-semibold ${row.change > 0 ? 'text-red-600' : row.change < 0 ? 'text-green-600' : 'text-gray-500'
                                            }`}>
                                            <span>{Math.abs(row.change)}%</span>
                                            <span className="relative -top-[2px] text-xs leading-none">
                                                {row.change > 0 ? '↑' : row.change < 0 ? '↓' : '—'}
                                            </span>
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">—</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
