import { GoogleAnalytics } from '@next/third-parties/google'
import { Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BreakingNews from './components/BreakingNews'
import { sanityFetch } from '../../sanity/lib/client'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'react-hot-toast'
import Link from 'next/link'
import NewsletterMobileModal from './components/NewsletterMobileModal'

/* ─── FONT ────────────────────────────────────────────────────────────────
   display:'swap' is already set — browser shows fallback font immediately
   and swaps once Noto Sans Devanagari is ready (no invisible text).
   preload:true (default) injects <link rel="preload"> for the woff2.     */
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  display: 'swap',
  weight: ['400', '700'],     // only load weights you actually use
  variable: '--font-devanagari',
})

export const metadata = {
  metadataBase: new URL('https://www.arabsamachar.com'),
  title: {
    default: 'अरब समाचार | UAE, Gulf, India Hindi News',
    template: '%s | अरब समाचार',
  },
  description:
    'Arab Samachar पर पढ़ें ताज़ा हिंदी खबरें – UAE, Gulf, India और दुनिया की ब्रेकिंग न्यूज़, टेक, स्पोर्ट्स, लाइफस्टाइल और फाइनेंस अपडेट्स।',
  openGraph: {
    title: 'अरब समाचार | Arab Samachar ताज़ा विश्व समाचार | Breaking World News',
    description:
      'Arab Samachar पर पढ़ें ताज़ा हिंदी खबरें – UAE, Gulf, India और दुनिया की ब्रेकिंग न्यूज़, टेक, स्पोर्ट्स, लाइफस्टाइल और फाइनेंस अपडेट्स।',
    url: 'https://www.arabsamachar.com/',
    type: 'website',
    siteName: 'Arab Samachar',
    locale: 'hi_IN',
    images: [{ url: '/arabsamacharwidelogo.jpg', width: 1200, height: 630, alt: 'Arab Samachar Hindi News' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: { icon: '/favicon.ico', shortcut: '/favicon.ico', apple: '/apple-touch-icon.png' },
  twitter: {
    card: 'summary_large_image',
    title: 'Arab Samachar',
    description: 'Latest Hindi & Gulf Breaking News',
    images: [{ url: '/arabsamacharwidelogo.jpg', width: 1200, height: 630, alt: 'Arab Samachar Hindi News' }],
  },
}

/* ─── BREAKING NEWS QUERY ────────────────────────────────────────────────
   Fetches only 3 fields — fast, cheap, and cached indefinitely
   (revalidated on-demand via webhook when new breaking news is published). */
const breakingQuery = `*[_type=='news' && isBreaking == true]
| order(_createdAt desc)[0]{
  heading,
  "slug": slug.current,
  category
}`

/* ─── STRUCTURED DATA ────────────────────────────────────────────────────
   Moved outside the component so the objects are created once at
   module level, not on every request.                                     */
const orgSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Arab Samachar',
  url: 'https://www.arabsamachar.com',
  logo: 'https://www.arabsamachar.com/arabsamacharwidelogo.jpg',
})

const websiteSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Arab Samachar',
  url: 'https://www.arabsamachar.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.arabsamachar.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
})

export default async function RootLayout({ children }) {
  // This fetch is cached indefinitely and revalidated on-demand
  const breakingText = await sanityFetch(breakingQuery, {}, ['breaking-news'])

  return (
    <html lang="hi">
      <body className={notoDevanagari.className}>
        {/* Structured data — inline JSON-LD (no extra HTTP request) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: orgSchema }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteSchema }} />

        <Navbar />

        {breakingText?.slug ? (
          <BreakingNews
            text={breakingText.heading || 'ताज़ा समाचार'}
            href={`/${breakingText.category}/${breakingText.slug}`}
          />
        ) : (
          <BreakingNews text="ताज़ा समाचार" />
        )}

        {children}

        {/* GoogleAnalytics with strategy="lazyOnload" (default in @next/third-parties)
            fires AFTER the page is interactive — does NOT block FCP/LCP/TBT.
            This was the original code's biggest TBT killer.                 */}
        <GoogleAnalytics gaId="G-BK1NC8WCM9" />
        <SpeedInsights />
        <Footer />
        newslettermodal
        <NewsletterMobileModal />
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
