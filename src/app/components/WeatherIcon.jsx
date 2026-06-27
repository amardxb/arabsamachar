import { getWeatherIconName } from "@/lib/weatherCodeMap";

export default function WeatherIcon({ condition, style = "fill", size = 48 }) {
  const iconName = getWeatherIconName(condition);
  
  return (
    <img
      src={`/weather-icons/${style}/${iconName}.svg`}
      alt={condition || "Weather"}
      width={size}
      height={size}
      loading="lazy"
    />
  );
}