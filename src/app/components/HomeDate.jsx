'use client'

import { useState, useEffect } from 'react'

const days = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"]
const months = [
  "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
  "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
]

function getPeriod(hours) {
  if (hours >= 4 && hours < 12) return "सुबह"
  if (hours >= 12 && hours < 16) return "दोपहर"
  if (hours >= 16 && hours < 19) return "शाम"
  return "रात"
}

function getHindiDateTime() {
  const now = new Date()

  const dayName = days[now.getDay()]
  const date = now.getDate()
  const month = months[now.getMonth()]
  const year = now.getFullYear()

  const hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const period = getPeriod(hours)

  let displayHours = hours % 12
  if (displayHours === 0) displayHours = 12
  const displayHoursStr = displayHours.toString().padStart(2, "0")

  return `${dayName}, ${date} ${month} ${year} | ${period} ${displayHoursStr}:${minutes}`
}

export default function HomeDate() {
  const [dateTime, setDateTime] = useState(getHindiDateTime)

  useEffect(() => {
    setDateTime(getHindiDateTime())
    const interval = setInterval(() => {
      setDateTime(getHindiDateTime())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <p className="text-sm text-gray-500 mt-2" suppressHydrationWarning>
      {dateTime}
    </p>
  )
}