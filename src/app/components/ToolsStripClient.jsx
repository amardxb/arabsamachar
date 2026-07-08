'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import WeatherToolLink from './WeatherToolLink'
import { GoldWidget, ExchangeWidget, PrayerWidget, FuelWidget } from './HomeStripWidget'
import { Fuel } from 'lucide-react'


function Tooltip({ text }) {
    return (
        <span className="
            hidden md:block
            absolute -top-9 left-1/2 -translate-x-1/2
            bg-gray-800 text-white text-xs font-medium px-2.5 py-1.5 rounded
            whitespace-nowrap pointer-events-none
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200 z-50
            after:content-[''] after:absolute after:top-full after:left-1/2
            after:-translate-x-1/2 after:border-4
            after:border-transparent after:border-t-gray-800
        ">
            {text}
        </span>
    )
}

export default function ToolsStripClient() {
    const [data, setData] = useState(null)
    const [countdown, setCountdown] = useState(0)
    const [gulfCountry, setGulfCountry] = useState('uae')

    useEffect(() => {
        async function load() {
            try {
                const geoRes = await fetch('/api/geo')
                const geo = await geoRes.json()
                const country = geo.country || 'AE'
                const city = geo.city || 'Dubai'

                const res = await fetch(
                    `/api/homepage-strip?country=${country}&city=${encodeURIComponent(city)}`,
                    { cache: 'no-store' }
                )
                const json = await res.json()
                setData(json)
                setGulfCountry(json.country || 'uae')

                if (json?.prayer?.nextPrayer?.totalSecondsLeft) {
                    setCountdown(json.prayer.nextPrayer.totalSecondsLeft)
                }
            } catch (err) {
                console.error('ToolsStripClient error:', err)
            }
        }
        load()
    }, [])

    useEffect(() => {
        if (countdown <= 0) return
        const timer = setInterval(() => {
            setCountdown(prev => prev > 0 ? prev - 1 : 0)
        }, 1000)
        return () => clearInterval(timer)
    }, [countdown])

    return (
        <div className="max-w-screen-xl mx-auto grid grid-cols-6 md:flex md:justify-between divide-x md:divide-x-0 divide-white/10 text-black">

            {/* Gold */}
            <Link
                href="/tools/gold-silver-rate/uae"
                className="group relative flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 py-1.5 text-black hover:text-slate-800 transition"
            >
                <Tooltip text="आज सोना चांदी रेट" />
                <span className="flex items-center justify-center w-[24px] h-[24px] md:w-[30px] md:h-[30px]">
    <Image
        src="/gold_silver_coin.webp"
        alt="Gold and Silver Coins"
        width={30}
        height={30}
        className="w-[24px] h-auto md:w-[30px]"
    />
</span>
                <span className="sr-only md:hidden">सोना/चांदी</span>
                <GoldWidget gold={data?.gold} fallback="सोना/चांदी" />
            </Link>

            {/* Gratuity */}
            <Link
                href="/tools/uae-gratuity-calculator"
                className="group relative flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 py-1.5 text-black hover:text-slate-800 transition"
            >
                <Tooltip text="UAE ग्रेच्युटी कैलकुलेटर" />
                <span className="flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] md:w-[25px] md:h-[25px]">
                        <rect x="4" y="2" width="16" height="20" rx="2" fill="#4F8EF7" />
                        <rect x="6.5" y="4.5" width="11" height="4" rx="0.5" fill="#DCEAFF" />
                        <circle cx="8.5" cy="12" r="1.3" fill="#FFFFFF" />
                        <circle cx="12" cy="12" r="1.3" fill="#FFFFFF" />
                        <circle cx="15.5" cy="12" r="1.3" fill="#FFFFFF" />
                        <circle cx="8.5" cy="16" r="1.3" fill="#FFFFFF" />
                        <circle cx="12" cy="16" r="1.3" fill="#FFFFFF" />
                        <circle cx="15.5" cy="16" r="1.3" fill="#FFFFFF" />
                    </svg>
                </span>
                <span className="sr-only md:hidden">ग्रेच्युटी कैलकुलेटर</span>
                <span className="hidden md:inline text-sm font-medium">ग्रेच्युटी कैलकुलेटर</span>
            </Link>

            {/* Exchange Rate */}
            <Link
                href="/tools/exchange-rate/uae"
                className="group relative flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 py-1.5 text-black hover:text-slate-800 transition"
            >
                <Tooltip text="INR एक्सचेंज रेट" />
                <span className="flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] md:w-[25px] md:h-[25px]">
                        <circle cx="12" cy="12" r="10" fill="#16A34A" stroke="#15803D" strokeWidth="1" />
                        <circle cx="12" cy="12" r="8" fill="none" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.4" />
                        <text
                            x="12"
                            y="17"
                            textAnchor="middle"
                            fontSize="15"
                            fill="#FFFFFF"
                            fontWeight="200"
                            fontFamily="Arial, sans-serif"
                        >
                            ₹
                        </text>
                    </svg>
                </span>
                <span className="sr-only md:hidden">एक्सचेंज रेट</span>
                <ExchangeWidget exchange={data?.exchange} fallback="एक्सचेंज रेट" />
            </Link>

            {/* Prayer Time */}
            <Link
                href="/tools/prayer-time/uae"
                className="group relative flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 py-1.5 text-black hover:text-slate-800 transition"
            >
                <Tooltip text="नमाज़ का समय" />
                <span className="flex items-center justify-center w-[24px] h-[24px] md:w-[30px] md:h-[30px]">
                    <Image
                        src="/prayer-time.png"
                        alt="Gulf Prayer Time"
                        width={30}
                        height={30}
                        className="w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                    />
                </span>
                <span className="sr-only md:hidden">नमाज़</span>
                <PrayerWidget
                    prayer={data?.prayer}
                    fallback="नमाज़"
                   
                />
            </Link>

            {/* Fuel */}
            <Link
                href={`/tools/fuel-rates/${gulfCountry}`}
                className="group relative flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 py-1.5 text-black hover:text-slate-800 transition"
            >
                <Tooltip text="पेट्रोल / डीजल रेट" />
                
                <span className="flex items-center justify-center w-[18px] h-[18px] md:w-[22px] md:h-[22px]">
                    <Fuel className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] text-green-600" />
                </span>
                <span className="sr-only md:hidden">पेट्रोल</span>
                <FuelWidget fuel={data?.fuel} fallback="पेट्रोल" />
            </Link>

            {/* Weather */}
            <WeatherToolLink />
        </div>
    )
}
