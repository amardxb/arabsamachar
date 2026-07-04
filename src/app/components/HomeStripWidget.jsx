'use client'

function TrendArrow({ trend, invert = false }) {
    // invert=true ka matlab: "up" ke liye red, "down" ke liye green
    // (Fuel ke liye — buyer ke perspective se price kam hona achhi khabar hai)
    const upColor = invert ? 'text-red-500' : 'text-green-600'
    const downColor = invert ? 'text-green-600' : 'text-red-500'

    if (trend === 'up') return (
        <sup className={`text-[10px] ${upColor} font-bold ml-0.5`}>▲</sup>
    )
    if (trend === 'down') return (
        <sup className={`text-[10px] ${downColor} font-bold ml-0.5`}>▼</sup>
    )
    return null
}

function formatCountdown(seconds) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function GoldWidget({ gold, fallback }) {
    return (
        <span className="hidden md:inline text-sm font-medium">
            {gold
                ? <>{gold.rate.toFixed(2)}<TrendArrow trend={gold.trend} invert /></>
                : fallback
            }
        </span>
    )
}

export function ExchangeWidget({ exchange, fallback }) {
    return (
        <span className="hidden md:inline text-sm font-medium">
            {exchange
                ? <>{exchange.rate.toFixed(2)}<TrendArrow trend={exchange.trend} /></>
                : fallback
            }
        </span>
    )
}

export function PrayerWidget({ prayer, fallback, countdown }) {
    return (
        <span className="hidden md:inline text-sm font-medium">
            {prayer?.nextPrayer
                ? `${prayer.nextPrayer.nameHindi} ${formatCountdown(countdown)}`
                : fallback
            }
        </span>
    )
}
export function FuelWidget({ fuel, fallback }) {
    return (
        <span className="hidden md:flex md:flex-col md:items-start leading-tight">
            {fuel
                ? <>
                    {/* <span className="text-sm font-medium">{fuel.fuelType}</span> */}
                    <span className="text-sm text-gray-600 flex items-center">
                        {/* {fuel.currency} */}
                        {fuel.currentPrice?.toFixed(2)}
                        <TrendArrow trend={fuel.trend} invert />
                    </span>
                </>
                : <span className="text-sm font-medium">{fallback}</span>
            }
        </span>
    )
}
