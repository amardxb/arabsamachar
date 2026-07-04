const subunitConfig = {
    bahrain: { name: 'Fils' },
    oman: { name: 'Baisa' },
    kuwait: { name: 'Fils' },
}

export default function FuelRateHistoryTable({ data }) {
    if (!data?.history?.length) {
        return (
            <div className="w-full bg-gray-100 rounded-lg p-6 text-center text-gray-400 mt-6">
                इतिहास डेटा उपलब्ध नहीं है
            </div>
        )
    }

    const { history, currency, currentMonth, country } = data

    // Bahrain/Oman/Kuwait ke liye Fils/Baisa, baaki countries mein normal currency
    const subunit = subunitConfig[country] || null
    const unitLabel = subunit ? subunit.name : currency

    // Subunit countries mein whole number, baaki mein 2-decimal
    const formatPrice = (val) => {
        if (val === null || val === undefined) return '—'
        return subunit ? Math.round(val) : val.toFixed(2)
    }

    // Fuel type keys — label chhodke
    const fuelKeys = Object.keys(history[0] || {}).filter(k => k !== 'label')

    return (
        <div className="w-full rounded-xl border border-gray-200 overflow-hidden mt-6">

            {/* HEADER */}
            <div className="bg-[#0f172a] text-white px-4 py-3">
                <h2 className="font-bold text-sm md:text-base">
                    मासिक फ्यूल रेट इतिहास ({unitLabel}/Ltr)
                </h2>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                                महीना
                            </th>
                            {fuelKeys.map((key) => (
                                <th
                                    key={key}
                                    className="px-4 py-3 text-center font-semibold text-gray-700 whitespace-nowrap"
                                >
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((row, i) => {
                            const isCurrent = row.label === currentMonth
                            return (
                                <tr
                                    key={row.label}
                                    className={
                                        isCurrent
                                            ? 'bg-green-50 border-l-4 border-green-500'
                                            : i % 2 === 0
                                                ? 'bg-white'
                                                : 'bg-gray-50'
                                    }
                                >
                                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                                        {row.label}
                                        {isCurrent && (
                                            <span className="ml-2 text-xs bg-green-600 text-white px-1.5 py-0.5 rounded">
                                                Current
                                            </span>
                                        )}
                                    </td>
                                    {fuelKeys.map((key) => (
                                        <td
                                            key={key}
                                            className="px-4 py-3 text-center text-gray-700 tabular-nums"
                                        >
                                            {formatPrice(row[key])}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
