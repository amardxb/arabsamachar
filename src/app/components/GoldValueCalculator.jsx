'use client'

import { useState } from 'react'

export default function GoldValueCalculator({ data, country }) {
  const [unit, setUnit] = useState('gram')
  const [weight, setWeight] = useState('')
  const [amount, setAmount] = useState('')
  const [purity, setPurity] = useState('24k')
  const [lastEdited, setLastEdited] = useState('weight')

  const TOLA_TO_GRAM = 11.6638

  const rateObj = data?.[purity] || {}
  const currentRate = rateObj.evening || rateObj.afternoon || rateObj.morning || 0

  const roundToQuarter = (value) => {
    if (value == null || value === "" || isNaN(value)) return "";
    return (Math.round(Number(value) * 4) / 4).toFixed(2);
  }

  const roundWeight = (value) => {
    if (value == null || value === "" || isNaN(value)) return "";
    return Number(value).toFixed(3);
  }

  const toGrams = (val) => unit === 'tola' ? parseFloat(val || 0) * TOLA_TO_GRAM : parseFloat(val || 0)
  const fromGrams = (gramsVal) => unit === 'tola' ? gramsVal / TOLA_TO_GRAM : gramsVal

  const handleWeightChange = (val) => {
    setWeight(val)
    setLastEdited('weight')
    if (val === '' || isNaN(val)) {
      setAmount('')
      return
    }
    const grams = toGrams(val)
    setAmount(roundToQuarter(grams * currentRate))
  }

  const handleAmountChange = (val) => {
    setAmount(val)
    setLastEdited('amount')
    if (val === '' || isNaN(val) || currentRate === 0) {
      setWeight('')
      return
    }
    const grams = parseFloat(val) / currentRate
    setWeight(roundWeight(fromGrams(grams)))
  }

  const handleUnitChange = (newUnit) => {
    const oldUnit = unit
    setUnit(newUnit)
    if (lastEdited === 'amount' && amount && currentRate > 0) {
      const grams = parseFloat(amount) / currentRate
      setWeight(roundWeight(newUnit === 'tola' ? grams / TOLA_TO_GRAM : grams))
    } else if (weight) {
      const grams = oldUnit === 'tola' ? parseFloat(weight) * TOLA_TO_GRAM : parseFloat(weight)
      setWeight(roundWeight(newUnit === 'tola' ? grams / TOLA_TO_GRAM : grams))
    }
  }

  const handlePurityChange = (newPurity) => {
    setPurity(newPurity)
    const newRateObj = data?.[newPurity] || {}
    const newRate = newRateObj.evening || newRateObj.afternoon || newRateObj.morning || 0

    if (lastEdited === 'weight' && weight) {
      setAmount(roundToQuarter(toGrams(weight) * newRate))
    } else if (lastEdited === 'amount' && amount && newRate > 0) {
      setWeight(roundWeight(fromGrams(parseFloat(amount) / newRate)))
    }
  }

  return (
    <div className="mt-8 rounded-2xl overflow-hidden shadow-lg mb-20">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#f5d98a] to-[#e8b84b] px-6 py-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/30 flex items-center justify-center text-xl">
          🪙
        </div>
        <h2 className="text-lg font-bold text-[#5c4314]">
          Gold Price Calculator
        </h2>
      </div>

      {/* Body */}
      <div className="bg-gradient-to-br from-[#fbe7b8] to-[#f3c969] p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Rate display */}
          <div>
            <label className="text-sm font-semibold text-[#5c4314] block mb-1">
              Spot Price ({purity.toUpperCase()})
            </label>
            <p className="text-xs text-[#8a6d2f] mb-2">Live rate per gram</p>
            <div className="bg-[#fffaf0] rounded-xl px-4 py-3 shadow-sm text-[#5c4314] font-semibold">
              {data?.currency} {currentRate.toFixed(2)}
            </div>
          </div>

          {/* Weight input */}
          <div>
            <label className="text-sm font-semibold text-[#5c4314] block mb-1">
              Weight
            </label>
            <p className="text-xs text-[#8a6d2f] mb-2">वजन डालें</p>
            <input
              type="number"
              value={weight}
              onChange={(e) => handleWeightChange(e.target.value)}
              placeholder="1"
              className="w-full bg-[#fffaf0] rounded-xl px-4 py-3 shadow-sm outline-none text-[#5c4314] font-medium"
            />
          </div>

          {/* Unit selector */}
          <div>
            <label className="text-sm font-semibold text-[#5c4314] block mb-1">
              Weight Unit
            </label>
            <select
              value={unit}
              onChange={(e) => handleUnitChange(e.target.value)}
              className="w-full bg-[#fffaf0] rounded-xl px-4 py-3 shadow-sm outline-none text-[#5c4314] font-medium appearance-none"
            >
              <option value="gram">Gram (g)</option>
              <option value="tola">Tola</option>
            </select>
          </div>

          {/* Purity selector */}
          <div>
            <label className="text-sm font-semibold text-[#5c4314] block mb-1">
              Purity
            </label>
            <select
              value={purity}
              onChange={(e) => handlePurityChange(e.target.value)}
              className="w-full bg-[#fffaf0] rounded-xl px-4 py-3 shadow-sm outline-none text-[#5c4314] font-medium appearance-none"
            >
              <option value="24k">24K</option>
              <option value="22k">22K</option>
              <option value="21k">21K</option>
              <option value="18k">18K</option>
              <option value="14k">14K</option>
            </select>
          </div>

        </div>

        {/* Amount input + result */}
        <div className="mt-5">
          <label className="text-sm font-semibold text-[#5c4314] block mb-1">
            Amount ({data?.currency})
          </label>
          <p className="text-xs text-[#8a6d2f] mb-2">कीमत डालें, वजन अपने आप निकलेगा</p>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="0.00"
            className="w-full bg-[#fffaf0] rounded-xl px-4 py-3 shadow-sm outline-none text-[#5c4314] font-medium"
          />
        </div>

        {/* Result summary */}
        <div className="mt-5 bg-[#5c4314] rounded-xl px-5 py-4 text-center">
          <div className="text-xs text-[#f3c969] mb-1">Total Value</div>
          <div className="text-2xl font-bold text-white">
            {data?.currency} {amount || "0.00"}
          </div>
        </div>

      </div>
    </div>
  )
}