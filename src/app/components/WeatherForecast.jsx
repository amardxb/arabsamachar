import Image from 'next/image';
import { getWeatherIcon, getWeatherLabel } from '@/lib/weatherCodeMap';

export default function WeatherForecast({ forecast }) {
  if (!forecast?.length) return null;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-3">7 दिन का मौसम पूर्वानुमान</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {forecast.map((day, i) => {
          const date = new Date(day.date);
          const dayName = i === 0
            ? 'आज'
            : date.toLocaleDateString('hi-IN', { weekday: 'short' });
          const dateLabel = date.toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' });
          const iconName = getWeatherIcon(day.weatherCode, true);
          const label = getWeatherLabel(day.weatherCode);

          return (
            <div
              key={day.date}
              className="bg-sky-50 rounded-lg p-3 text-center border border-sky-100"
            >
              <div className="text-xs font-semibold text-gray-700">{dayName}</div>
              <div className="text-[11px] text-gray-500 mb-1">{dateLabel}</div>
              <Image
                src={`/weather-icons/${iconName}.svg`}
                alt={label}
                width={36}
                height={36}
                className="mx-auto"
              />
              <div className="text-sm font-bold mt-1">{Math.round(day.maxTemp)}°</div>
              <div className="text-xs text-gray-500">{Math.round(day.minTemp)}°</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}