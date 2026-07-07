'use client'

import { useState, useEffect, useRef } from 'react'

const sourceCurrencyMap = {
  uae: { code: "AED", flag: "/flags/ae.svg", name: "UAE" },
  saudi: { code: "SAR", flag: "/flags/sa.svg", name: "Saudi Arabia" },
  qatar: { code: "QAR", flag: "/flags/qa.svg", name: "Qatar" },
  oman: { code: "OMR", flag: "/flags/om.svg", name: "Oman" },
  bahrain: { code: "BHD", flag: "/flags/bh.svg", name: "Bahrain" },
  kuwait: { code: "KWD", flag: "/flags/kw.svg", name: "Kuwait" },
}

const currencyInfo = {
  INR: { name: "Indian Rupee", flag: "/flags/in.svg" },
  PHP: { name: "Philippine Peso", flag: "/flags/ph.svg" },
  PKR: { name: "Pakistani Rupee", flag: "/flags/pk.svg" },
  BDT: { name: "Bangladeshi Taka", flag: "/flags/bd.svg" },
  LKR: { name: "Sri Lankan Rupee", flag: "/flags/lk.svg" },
  NPR: { name: "Nepalese Rupee", flag: "/flags/np.svg" },
}

export default function ExchangeValueCalculator({ data, country }) {
  const source = sourceCurrencyMap[country] || { code: "AED", flag: "/flags/ae.svg" }
  const targetOptions = Object.keys(currencyInfo)

  const [target, setTarget] = useState("INR")
  const [sourceAmount, setSourceAmount] = useState("1000")
  const [targetAmount, setTargetAmount] = useState("")
  const [editingSide, setEditingSide] = useState("source")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Fallback chain: evening -> morning -> yesterday -> null
  const getRate = (currency) => {
    const r = data?.rates?.[currency]
    if (!r) return null
    return r.evening ?? r.morning ?? r.yesterday ?? null
  }

  const rate = getRate(target)

  useEffect(() => {
    if (!rate) return
    if (editingSide === "source") {
      setTargetAmount((Number(sourceAmount || 0) * rate).toFixed(2))
    } else {
      setSourceAmount((Number(targetAmount || 0) / rate).toFixed(2))
    }
  }, [target, rate])

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const updateSource = (value) => {
    setEditingSide("source")
    setSourceAmount(value)
    if (!rate || !value) {
      setTargetAmount("")
      return
    }
    setTargetAmount((Number(value) * rate).toFixed(2))
  }

  const updateTarget = (value) => {
    setEditingSide("target")
    setTargetAmount(value)
    if (!rate || !value) {
      setSourceAmount("")
      return
    }
    setSourceAmount((Number(value) / rate).toFixed(2))
  }

  if (!data) return null

  return (
    <div className="mt-8 rounded-xl overflow-hidden border border-[#1c2f4d] bg-[#0B1E3D]">

      {/* HEADER */}
      <div className="px-5 py-3 bg-[#0e2548] border-b border-[#1c2f4d]">
        <span className="text-[12px] text-[#d7ddea]">
          {rate
            ? `1 ${source.code} = ${rate.toFixed(4)} ${target}`
            : "Rate unavailable"}
        </span>
      </div>

      {/* BODY */}
      <div className="bg-[#F7F5F0] p-5">

        <h3 className="text-[15px] font-semibold text-[#0B1E3D] mb-5">
          Send Money Calculator
        </h3>

        {/* SOURCE */}
        <label htmlFor="source-amount" className="text-[11px] uppercase text-[#7f7868]">You Send</label>

        <div className="mt-2 rounded-lg border bg-white p-4 flex gap-3">
          <div className="flex items-center gap-2 bg-[#0B1E3D] px-3 py-2 rounded">
            <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
              <img src={source.flag} alt={`${source.name} flag`} className="w-full h-full object-cover" />               
            </div>
            <span className="text-white text-sm">{source.code}</span>
          </div>

          <input
            id="source-amount"
            type="number"
            value={sourceAmount}
            onChange={(e) => updateSource(e.target.value)}
            className="flex-1 text-right text-2xl outline-none"
            aria-label={`Amount in ${source.code} you send`}
          />
        </div>

        {/* ARROW */}
        <div className="flex justify-center py-5">
          <div className="w-8 h-8 rounded-full bg-[#0B1E3D] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3l4 4-4 4" />
              <path d="M3 7h18" />
              <path d="M7 21l-4-4 4-4" />
              <path d="M21 17H3" />
            </svg>
          </div>
        </div>

        {/* TARGET */}
        <label htmlFor="target-amount" className="text-[11px] uppercase text-[#7f7868]">Receiver Gets</label>

        <div className="mt-2 rounded-lg border bg-white p-4 flex gap-3 relative" ref={dropdownRef}>

          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded bg-[#ece6d7] px-3 py-2 font-semibold"
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            aria-label={`Select target currency, currently ${target}`}
          >
            <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
              <img src={currencyInfo[target].flag} alt={target} className="w-full h-full object-cover" />
            </div>
            <span>{target}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {dropdownOpen && (
            <div
              role="listbox"
              className="absolute bottom-full left-0 mb-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-48 max-h-60 overflow-y-auto"
            >
              {targetOptions.map((cur) => (
                <button
                  key={cur}
                  type="button"
                  role="option"
                  aria-selected={target === cur}
                  onClick={() => {
                    setTarget(cur)
                    setDropdownOpen(false)
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-left"
                >
                  <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                    <img src={currencyInfo[cur].flag} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-medium">{cur}</span>
                  <span className="text-xs text-gray-400">{currencyInfo[cur].name}</span>
                </button>
              ))}
            </div>
          )}
          <input
            id="target-amount"
            type="number"
            value={targetAmount}
            onChange={(e) => updateTarget(e.target.value)}
            className="flex-1 text-right text-2xl outline-none text-green-600"
            aria-label={`Amount in ${target} receiver gets`}
          />
        </div>

        <p className="mt-4 text-[11px] text-[#8b8473]">
          यह अनुमानित रेट है। फाइनल अमाउंट एक्सचेंज हाउस की रेट और सर्विस चार्ज पर निर्भर करेगा.
        </p>

      </div>
    </div>
  )
}
