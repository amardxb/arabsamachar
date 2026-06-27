import { getUAEHour } from "@/lib/time"

export function buildSlots(price) {
  const hour = getUAEHour()

  return {
    morning: price,
    afternoon: hour >= 12 ? price * 1.002 : null,
    evening: hour >= 17 ? price * 1.004 : null,
    yesterday: price * 0.99,
  }
}