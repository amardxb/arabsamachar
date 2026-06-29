import Image from 'next/image';
import { getWeatherIcon, getWeatherLabel, isDayTime } from '@/lib/weatherCodeMap';

export default function WeatherCard({ current, country }) {
  if (!current) {
    return (
      <div className="w-full bg-gradient-to-r from-sky-400 to-blue-700 rounded-lg p-6 text-white text-center">
        मौसम जानकारी उपलब्ध नहीं है
      </div>
    );
  }

 const dayTime = isDayTime(current.sunrise, current.sunset, country);
  const iconName = getWeatherIcon(current.weatherCode, dayTime);
  const label = getWeatherLabel(current.weatherCode);

  const dateStr = new Date().toLocaleDateString('hi-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div className="w-full bg-gradient-to-r from-sky-400 to-blue-800 rounded-lg overflow-hidden text-white">
      <div className="flex flex-col sm:flex-row">

        {/* LEFT: main temp block */}
        <div className="flex-1 p-6 flex flex-col items-center sm:items-start text-center sm:text-left">
          <Image
            src={`/weather-icons/${iconName}.svg`}
            alt={label}
            width={72}
            height={72}
          />
          <div className="text-5xl font-bold mt-2">{Math.round(current.temperature)}°</div>
          <div className="text-lg mt-1">{label}</div>
          <div className="text-sm opacity-80 mt-1">{dateStr}</div>
          <div className="text-sm opacity-80 mt-3">
            फील्स लाइक {Math.round(current.apparentTemperature)}°
          </div>
          <div className="flex justify-between w-full sm:w-auto sm:gap-8 mt-4 text-sm">
            <span>🌅 सूर्योदय {formatTime(current.sunrise)}</span>
            <span className="ml-4">🌇 सूर्यास्त {formatTime(current.sunset)}</span>
          </div>
        </div>

        {/* RIGHT: details */}
        <div className="flex sm:flex-col divide-x sm:divide-x-0 sm:divide-y divide-white/20 bg-black/10">
          <div className="flex-1 px-5 py-3 flex items-center gap-3">
            <span className="text-xl">💨</span>
            <div>
              <div className="text-xs opacity-80">हवा की गति</div>
              <div className="font-semibold">{current.windSpeed} km/h</div>
            </div>
          </div>
          <div className="flex-1 px-5 py-3 flex items-center gap-3">
            <span className="text-xl">💧</span>
            <div>
              <div className="text-xs opacity-80">नमी</div>
              <div className="font-semibold">{current.humidity}%</div>
            </div>
          </div>
          <div className="flex-1 px-5 py-3 flex items-center gap-3">
            <span className="text-xl">👁️</span>
            <div>
              <div className="text-xs opacity-80">विज़िबिलिटी</div>
              <div className="font-semibold">{current.visibility} km</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
