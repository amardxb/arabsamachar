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

export default function WeatherToolLink() {
  const [country, setCountry] = useState('uae'); // default fallback
 

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
     className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 py-1.5 md:py-1.5 text-black hover:bg-white/5 hover:text-[#c4132a] transition"
    >
     <span className="[&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-4 md:[&>svg]:h-4">
  <HomeWeatherWidget asLink={false} />
</span>
      <span className="hidden md:inline text-sm font-medium">{countryCityNames[country]}</span>
      
    </Link>
  );
}
