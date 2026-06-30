import Link from 'next/link';
import WeatherToolLink from './WeatherToolLink';
import Image from 'next/image';

const tools = [
  {
    name: 'gold-silver',
    label: 'सोना/चांदी',
    href: '/tools/gold-silver-rate/uae',
   icon: (
  <Image
    src="/gold_silver_coin.webp"
    alt="Gold Bar"
    width={30}
    height={30}
  />
),
  },
  {
    name: 'gratuity',
    label: 'ग्रेच्युटी कैलकुलेटर',
    href: '/tools/uae-gratuity-calculator',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '25px', height: '25px' }}>
        <rect x="4" y="2" width="16" height="20" rx="2" fill="#4F8EF7" />
        <rect x="6.5" y="4.5" width="11" height="4" rx="0.5" fill="#DCEAFF" />
        <circle cx="8.5" cy="12" r="1.3" fill="#FFFFFF" />
        <circle cx="12" cy="12" r="1.3" fill="#FFFFFF" />
        <circle cx="15.5" cy="12" r="1.3" fill="#FFFFFF" />
        <circle cx="8.5" cy="16" r="1.3" fill="#FFFFFF" />
        <circle cx="12" cy="16" r="1.3" fill="#FFFFFF" />
        <circle cx="15.5" cy="16" r="1.3" fill="#FFFFFF" />
      </svg>
    ),
  },
 {
  name: 'exchange-rate',
  label: 'एक्सचेंज रेट',
  href: '/tools/exchange-rate/uae',
  icon: (
    <svg viewBox="0 0 24 24" style={{ width: '25px', height: '25px' }}>
      <circle cx="12" cy="12" r="10" fill="#16A34A" stroke="#15803D" strokeWidth="1" />
      <circle cx="12" cy="12" r="8" fill="none" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.4" />
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontSize="15"
        fill="#FFFFFF"
        fontWeight="200"
        fontFamily="Arial, sans-serif"
      >
        ₹
      </text>
    </svg>
  ),
  },
 {
    name: 'prayer-time',
    label: 'नमाज़',
    href: '/tools/prayer-time/uae',
   icon: (
     <Image
       src="/prayer-time.png"
       alt="Gulf Prayer Time"
       width={30}
       height={30}
     />
   ),
  },
];

export default function ToolsStrip() {
  return (
    <div className="w-full border-b-[1px] border-gray-100 md:mt-2">
      <div className="max-w-screen-xl mx-auto grid grid-cols-5  divide-x divide-white/10 text-black">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 py-1.5 md:py-1.5 text-black hover:bg-white/5 hover:text-[#c4132a] transition"
          >
           <span className="[&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-4 md:[&>svg]:h-4">
  {tool.icon}
</span>
<span className="sr-only md:hidden">{tool.label}</span>
<span className="hidden md:inline text-sm font-medium">
  {tool.label}
</span>
          </Link>
        ))}
        <WeatherToolLink />
      </div>
    </div>
  );
}
