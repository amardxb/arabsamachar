'use client'

import { useState, useCallback } from 'react'

const countryFuelTypes = {
    uae: ['Super 98', 'Special 95', 'E-Plus 91', 'Diesel'],
    saudi: ['Gasoline 98', 'Super 95', 'Premium 91', 'Diesel'],
    qatar: ['Super 95', 'Premium 91', 'Diesel'],
    kuwait: ['Ultra 98', 'Super 95', 'Premium 91', 'Diesel'],
    oman: ['Mogas 98', 'Mogas 95', 'Mogas 91', 'Diesel'],
    bahrain: ['Super 98', 'Mumtaz 95', 'Jayyid 91', 'Diesel'],
}

// Jin countries mein Sanity ke andar price SUBUNIT (Fils/Baisa) mein stored hai.
// Calculation ke liye ye raw price ko major currency (BHD/OMR/KWD) mein convert kiya jaata hai,
// taaki Amount input/output hamesha major currency mein rahe (jaisa transaction mein bola jaata hai).
// Per-litre price display ke liye original Fils/Baisa hi dikhaya jaata hai (jaisa log usually bolte hain).
const subunitConfig = {
    bahrain: { name: 'Fils', majorCode: 'BHD', divisor: 1000 },
    oman: { name: 'Baisa', majorCode: 'OMR', divisor: 1000 },
    kuwait: { name: 'Fils', majorCode: 'KWD', divisor: 1000 },
}

const quickFillAmounts = {
    default: [20, 50, 100, 200, 500],
    subunit: [1000, 2000, 5000, 10000, 20000],
}

export default function FuelCalculator({ data, country }) {
    const fuelTypes = countryFuelTypes[country] || countryFuelTypes.uae
    const { rates = [], currency = 'AED' } = data || {}

    const subunit = subunitConfig[country] || null
    // Amount hamesha major currency (BHD/OMR/KWD) mein hi rahega — kyunki transaction/payment
    // isi mein hoti hai, Fils/Baisa sirf per-litre price bolne ka tareeka hai
    const amountLabel = currency
    const fills = quickFillAmounts.default

    const getPriceForType = useCallback((fuelType) => {
        const found = rates.find(r => r.fuelType === fuelType)
        return found?.currentPrice ?? null
    }, [rates])

    // Raw price jo Sanity se aaya (subunit countries ke liye Fils/Baisa mein)
    const getRawPrice = getPriceForType

    // Calculation ke liye price hamesha MAJOR unit (BHD/OMR/KWD) mein convert karo
    const getMajorPrice = useCallback((fuelType) => {
        const raw = getPriceForType(fuelType)
        if (raw === null) return null
        return subunit ? raw / subunit.divisor : raw
    }, [getPriceForType, subunit])

    const [selectedFuel, setSelectedFuel] = useState(fuelTypes[1] || fuelTypes[0]) // default Special 95 / Super 95
    const [amount, setAmount] = useState('')   // hamesha major currency (BHD/OMR/KWD) mein
    const [litres, setLitres] = useState('')   // litre value
    const [lastEdited, setLastEdited] = useState('amount')

    const rawPrice = getRawPrice(selectedFuel)     // display ke liye (Fils/Baisa mein, jaisa Sanity mein hai)
    const currentPrice = getMajorPrice(selectedFuel) // calculation ke liye (BHD/OMR/KWD mein)

    // Jab fuel type change ho — same lastEdited field maintain karo, doosri recalculate karo
    const handleFuelChange = (newFuel) => {
        setSelectedFuel(newFuel)
        const price = getMajorPrice(newFuel)
        if (!price) return

        if (lastEdited === 'amount' && amount) {
            setLitres((parseFloat(amount) / price).toFixed(2))
        } else if (lastEdited === 'litres' && litres) {
            setAmount((parseFloat(litres) * price).toFixed(subunit ? 3 : 2))
        }
    }

    const handleAmountChange = (val) => {
        setAmount(val)
        setLastEdited('amount')
        if (!currentPrice || val === '') { setLitres(''); return }
        const num = parseFloat(val)
        if (!isNaN(num)) setLitres((num / currentPrice).toFixed(2))
    }

    const handleLitresChange = (val) => {
        setLitres(val)
        setLastEdited('litres')
        if (!currentPrice || val === '') { setAmount(''); return }
        const num = parseFloat(val)
        if (!isNaN(num)) setAmount((num * currentPrice).toFixed(subunit ? 3 : 2))
    }

    const fuelEmoji = (type) => {
        if (type.toLowerCase().includes('diesel')) return '🚛'
        if (type.includes('98')) return '⭐'
        return '⛽'
    }

    // Per-litre price display — subunit countries (Bahrain/Oman/Kuwait) mein Fils/Baisa
    // ke whole-number mein dikhega (jaisa log bolte hain — "164 Fils/Ltr"),
    // baaki countries mein normal 2-decimal major currency
    const priceUnitLabel = subunit ? subunit.name : currency
    const formatDisplayPrice = (fuelType) => {
        const raw = getRawPrice(fuelType)
        if (raw === null || raw === undefined) return null
        return subunit ? Math.round(raw) : raw.toFixed(2)
    }

    return (
        <div className="w-full rounded-xl overflow-hidden border border-green-200 shadow-sm mt-10">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-green-700 to-emerald-600 px-5 py-1">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">⛽</span>
                    <div>
                        <h2 className="text-white font-bold text-base md:text-lg leading-tight">
                            फ्यूल कैलकुलेटर
                        </h2>
                        <p className="text-green-100 text-xs mt-0.5">
                            {rawPrice
                                ? `${selectedFuel} — ${formatDisplayPrice(selectedFuel)} ${priceUnitLabel}/Ltr`
                                : 'रेट उपलब्ध नहीं'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-b from-green-50 to-white px-5 py-5">

                {/* FUEL TYPE SELECTOR */}
                <div className="mb-5">
                    <label className="block text-xs font-semibold text-green-800 uppercase tracking-wide mb-2">
                        फ्यूल टाइप चुनें
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {fuelTypes.map((type) => {
                            const displayPrice = formatDisplayPrice(type)
                            return (
                                <button
                                    key={type}
                                    onClick={() => handleFuelChange(type)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${selectedFuel === type
                                        ? 'bg-green-700 text-white border-green-700 shadow-sm'
                                        : 'bg-white text-green-800 border-green-300 hover:border-green-500 hover:bg-green-50'
                                        }`}
                                >
                                    <span>{fuelEmoji(type)}</span>
                                    <span>{type}</span>
                                    {displayPrice && (
                                        <span className={`text-xs ${selectedFuel === type ? 'text-green-200' : 'text-green-600'}`}>
                                            {displayPrice}
                                        </span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* TWO WAY CALCULATOR */}
                {currentPrice ? (
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-center">

                        {/* AMOUNT INPUT */}
                        <div className="bg-white rounded-xl border border-green-200 p-4 shadow-sm">
                            <label className="block text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                                💵 राशि ({amountLabel})
                            </label>
                            <input
                                type="number"
                                min="0"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => handleAmountChange(e.target.value)}
                                className="w-full text-2xl font-bold text-gray-800 outline-none border-none bg-transparent placeholder-gray-300"
                            />
                            <div className="mt-2 pt-2 border-t border-green-100">
                                <span className="text-xs text-gray-500">
                                    {amountLabel} में कुल खर्च
                                </span>
                            </div>
                        </div>

                        {/* DIVIDER */}
                        <div className="flex items-center justify-center">
                            <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center shadow-md">
                                <span className="text-white text-sm font-bold">⇌</span>
                            </div>
                        </div>

                        {/* LITRES INPUT */}
                        <div className="bg-white rounded-xl border border-green-200 p-4 shadow-sm">
                            <label className="block text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                                🛢️ लीटर (Ltr)
                            </label>
                            <input
                                type="number"
                                min="0"
                                placeholder="0.00"
                                value={litres}
                                onChange={(e) => handleLitresChange(e.target.value)}
                                className="w-full text-2xl font-bold text-gray-800 outline-none border-none bg-transparent placeholder-gray-300"
                            />
                            <div className="mt-2 pt-2 border-t border-green-100">
                                <span className="text-xs text-gray-500">
                                    {selectedFuel} लीटर में
                                </span>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="text-center py-6 text-gray-400 text-sm">
                        इस महीने का रेट अभी उपलब्ध नहीं है
                    </div>
                )}

                {/* QUICK FILL BUTTONS */}
                {currentPrice && (
                    <div className="mt-4">
                        <p className="text-xs text-green-700 font-semibold uppercase tracking-wide mb-2">
                            Quick Fill →
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {fills.map((amt) => (
                                <button
                                    key={amt}
                                    onClick={() => handleAmountChange(String(amt))}
                                    className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full border border-green-200 hover:bg-green-200 transition"
                                >
                                    {amountLabel} {amt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* FOOTER NOTE */}
            <div className="bg-green-50 border-t border-green-100 px-5 py-2.5">
                <p className="text-xs text-green-700">
                    📌 रेट {data?.currentMonth || 'इस महीने'} के अनुसार है। वास्तविक कीमत पेट्रोल स्टेशन पर अलग हो सकती है।
                </p>
            </div>

        </div>
    )
}
