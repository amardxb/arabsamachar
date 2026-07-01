'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { detectUserCountry, mapToGulfCountry } from '@/lib/detectCountry';
import { getWeatherIcon, getWeatherLabel, isDayTime } from '@/lib/weatherCodeMap';

const countryNames = {
  uae: 'UAE', qatar: 'Qatar', saudi: 'Saudi Arabia',
  oman: 'Oman', kuwait: 'Kuwait', bahrain: 'Bahrain',
};

export default function HomeWeatherWidget({ asLink = true }) {
  const [weather, setWeather] = useState(null);
  const [country, setCountry] = useState('uae');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const code = await detectUserCountry();
const mapped = mapToGulfCountry(code) || 'uae';
setCountry(mapped);

      try {
        const res = await fetch(`/api/weather?country=${mapped}`, { cache: 'no-store' });
        const data = await res.json();
        setWeather(data.current);
      } catch (err) {
        console.error('Weather widget fetch failed:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div style={{ width: '36px', height: '36px' }} className="rounded-full bg-gray-100 animate-pulse" />
        <div className="hidden md:inline w-8 h-3 bg-gray-100 rounded animate-pulse" />
      </div>
    );
  }

  if (!weather) return null;

  const dayTime = isDayTime(weather.sunrise, weather.sunset, country);
  const iconName = getWeatherIcon(weather.weatherCode, dayTime);
  const label = getWeatherLabel(weather.weatherCode);

  const content = (
    <>
      <Image
        src={`/weather-icons/${iconName}.svg`}
        alt={label}
        width={36}
        height={36}
      />
     <span className="hidden md:inline text-xs text-gray-700">
  {Math.round(weather.temperature)}°c
</span>
    </>
  );

  if (!asLink) {
    // parent (e.g. WeatherToolLink) already renders the <Link> wrapper
    return (
      <span
        className="flex items-center gap-2"
        title={`${countryNames[country]} - ${label}`}
      >
        {content}
      </span>
    );
  }

  return (
    <Link
      href={`/tools/weather/${country}`}
      className="flex items-center gap-2 hover:opacity-80 transition"
      title={`${countryNames[country]} - ${label}`}
    >
      {content}
    </Link>
  );
}
