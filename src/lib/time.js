export function getUAEHour() {
  const now = new Date()
  return new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Dubai" })
  ).getHours()
}