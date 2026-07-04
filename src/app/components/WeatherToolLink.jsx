'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { detectUserCountry, mapToGulfCountry } from '@/lib/detectCountry';
import HomeWeatherWidget from './HomeWeatherWidget';

export const countryCityNames = {
  uae: 'दुबई',
  qatar: 'दोहा',
  saudi: 'रियाद',
  oman: 'मस्कट',
  kuwait: 'कुवैत सिटी',
  bahrain: 'मनामा',
};

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

export default function WeatherToolLink() {
  const [country, setCountry] = useState('uae');

  useEffect(() => {
    async function load() {
      const code = await detectUserCountry();
      setCountry(mapToGulfCountry(code) || 'uae');
    }
    load();
  }, []);

  return (
    <Link
      href={`/tools/weather/${country}`}
      className="group relative flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 py-1.5 text-black hover:text-slate-800 transition"
    >
      <Tooltip text={`${countryCityNames[country]} का मौसम`} />
      <span className="flex items-center justify-center">
        <HomeWeatherWidget asLink={false} />
      </span>
      <span className="sr-only md:hidden">{countryCityNames[country]}</span>
      <span className="hidden md:inline text-sm font-medium">{countryCityNames[country]}</span>
    </Link>
  );
}
