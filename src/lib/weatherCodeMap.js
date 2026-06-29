// WMO Weather interpretation codes (Open-Meteo standard)
// Mapped to confirmed @meteocons/svg/fill slugs

export const weatherCodeMap = {
  0:  { label: 'साफ आसमान', icon: 'clear-day', iconNight: 'clear-night' },
  1:  { label: 'ज्यादातर साफ', icon: 'mostly-clear-day', iconNight: 'mostly-clear-night' },
  2:  { label: 'आंशिक रूप से बादल', icon: 'partly-cloudy-day', iconNight: 'partly-cloudy-night' },
  3:  { label: 'बादल छाए हुए', icon: 'overcast-day', iconNight: 'overcast-night' },
  45: { label: 'धुंध', icon: 'fog-day', iconNight: 'fog-night' },
  48: { label: 'घनी धुंध', icon: 'fog-day', iconNight: 'fog-night' },
  51: { label: 'हल्की बारिश की बूंदें', icon: 'drizzle', iconNight: 'drizzle' },
  53: { label: 'बारिश की बूंदें', icon: 'drizzle', iconNight: 'drizzle' },
  55: { label: 'घनी बूंदाबांदी', icon: 'overcast-day-drizzle', iconNight: 'overcast-night-drizzle' },
  56: { label: 'जमने वाली बूंदाबांदी', icon: 'sleet', iconNight: 'sleet' },
  57: { label: 'घनी जमने वाली बूंदाबांदी', icon: 'overcast-day-sleet', iconNight: 'overcast-night-sleet' },
  61: { label: 'हल्की बारिश', icon: 'partly-cloudy-day-rain', iconNight: 'partly-cloudy-night-rain' },
  63: { label: 'बारिश', icon: 'overcast-day-rain', iconNight: 'overcast-night-rain' },
  65: { label: 'भारी बारिश', icon: 'overcast-rain', iconNight: 'overcast-rain' },
  66: { label: 'जमने वाली बारिश', icon: 'sleet', iconNight: 'sleet' },
  67: { label: 'भारी जमने वाली बारिश', icon: 'overcast-sleet', iconNight: 'overcast-sleet' },
  71: { label: 'हल्की बर्फ', icon: 'partly-cloudy-day-snow', iconNight: 'partly-cloudy-night-snow' },
  73: { label: 'बर्फबारी', icon: 'overcast-day-snow', iconNight: 'overcast-night-snow' },
  75: { label: 'भारी बर्फबारी', icon: 'overcast-snow', iconNight: 'overcast-snow' },
  77: { label: 'बर्फ के कण', icon: 'snow', iconNight: 'snow' },
  80: { label: 'हल्की बारिश की झड़ी', icon: 'partly-cloudy-day-rain', iconNight: 'partly-cloudy-night-rain' },
  81: { label: 'बारिश की झड़ी', icon: 'overcast-day-rain', iconNight: 'overcast-night-rain' },
  82: { label: 'तेज़ बारिश की झड़ी', icon: 'overcast-rain', iconNight: 'overcast-rain' },
  85: { label: 'हल्की बर्फ़ की झड़ी', icon: 'partly-cloudy-day-snow', iconNight: 'partly-cloudy-night-snow' },
  86: { label: 'भारी बर्फ़ की झड़ी', icon: 'overcast-snow', iconNight: 'overcast-snow' },
  95: { label: 'तूफान', icon: 'thunderstorms-day', iconNight: 'thunderstorms-night' },
  96: { label: 'हल्के तूफान के साथ बर्फ़बारी', icon: 'thunderstorms-day-snow', iconNight: 'thunderstorms-night-snow' },
  99: { label: 'भारी तूफान के साथ बर्फ़बारी', icon: 'extreme-thunderstorms-day-snow', iconNight: 'extreme-thunderstorms-night-snow' },
};

export function getWeatherIcon(code, isDay = true) {
  const entry = weatherCodeMap[code];
  if (!entry) return 'not-available';
  return isDay ? entry.icon : entry.iconNight;
}

export function getWeatherLabel(code) {
  return weatherCodeMap[code]?.label || 'अज्ञात';
}

const countryOffsets = {
  uae: '+04:00',
  oman: '+04:00',
  qatar: '+03:00',
  saudi: '+03:00',
  kuwait: '+03:00',
  bahrain: '+03:00',
}

export function isDayTime(sunrise, sunset, country = 'uae') {
  const offset = countryOffsets[country] || '+04:00'
  const now = new Date()
  const sunriseUTC = new Date(sunrise + offset)
  const sunsetUTC = new Date(sunset + offset)
  return now >= sunriseUTC && now < sunsetUTC
}
