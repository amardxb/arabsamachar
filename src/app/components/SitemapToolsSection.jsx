'use client';

import { useState } from 'react';
import Link from 'next/link';

const countries = [
  { name: 'यूएई', slug: 'uae' },
  { name: 'सऊदी अरब', slug: 'saudi' },
  { name: 'क़तर', slug: 'qatar' },
  { name: 'ओमान', slug: 'oman' },
  { name: 'कुवैत', slug: 'kuwait' },
  { name: 'बहरीन', slug: 'bahrain' },
];

const baseurl = 'https://www.arabsamachar.com';

const toolCategories = [
  {
    id: 'gratuity',
    label: 'ग्रेच्युटी कैलकुलेटर',
    links: [
      { name: 'UAE ग्रेच्युटी कैलकुलेटर', href: `${baseurl}/tools/uae-gratuity-calculator` },
    ],
  },
  {
    id: 'gold-silver',
    label: 'सोना और चांदी का भाव',
    links: countries.map((c) => ({
      name: `${c.name} सोना और चांदी का भाव`,
      href: `${baseurl}/tools/gold-silver-rate/${c.slug}`,
    })),
  },
  {
    id: 'exchange-rate',
    label: 'मनी ट्रांसफर एक्सचेंज रेट',
    links: countries.map((c) => ({
      name: `${c.name} एक्सचेंज रेट`,
      href: `${baseurl}/tools/exchange-rate/${c.slug}`,
    })),
  },
  {
    id: 'weather',
    label: 'मौसम',
    links: countries.map((c) => ({
      name: `${c.name} मौसम`,
      href: `${baseurl}/tools/weather/${c.slug}`,
    })),
  },
];

export default function SitemapToolsSection() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mt-8">TOOLS :</h2>

      {toolCategories.map((cat, i) => (
        <div key={cat.id} className="ml-4">
          <button
            onClick={() => toggle(cat.id)}
            className="flex items-center gap-2 pt-2 pb-2 pl-2 text-blue-800 font-semibold w-full text-left"
          >
            <span>{i + 1} - </span>
            <span className="hover:underline">{cat.label}</span>
            <span className="ml-auto">{openId === cat.id ? '−' : '+'}</span>
          </button>

          {openId === cat.id && (
            <div className="ml-6 border-l border-gray-200 pl-3">
           {cat.links.map((link, j) => (
  <Link
    key={link.href}
    href={link.href}
    className="block pt-1.5 pb-1.5 text-blue-700 hover:underline text-sm"
  >
    {String.fromCharCode(97 + j)}. {link.name}
  </Link>
))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}