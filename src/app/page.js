import { memo } from 'react'
import { sanityFetch } from '../../sanity/lib/client'
import { imgUrl } from '../../sanity/lib/image' 
import BlurImage from './components/BlurImage'
import Link from 'next/link'
import Image from 'next/image'
import HomeDate from './components/HomeDate'
import ToolsStrip from './components/ToolsStrip'
import ImageSlider from './components/ImageSlider'



export const revalidate = false // cache forever, revalidated on-demand via webhook

export const metadata = {
  title: 'अरब समाचार | Arab Samachar हिंदी समाचार | Hindi News',
  openGraph: {
    url: 'https://www.arabsamachar.com',
    type: 'website',
    locale: 'hi_IN',
    images: ['https://www.arabsamachar.com/arabsamacharwidelogo.jpg'],
  },
  alternates: { canonical: 'https://www.arabsamachar.com' },
}

/* ─── GROQ QUERIES ───────────────────────────────────────────────────────
   Shared projection — defined once, reused in all three queries.         */
const PROJ = `{
  image, category,
  "alt": image.alt,
  tag, heading,
  "slug": slug.current
}`

const homeQuery = `*[_type=='news' &&
  !(category in ['technology','auto','lifestyle','sports'])
] | order(_createdAt desc)[0...65]${PROJ}`

const sliderOneQuery = `*[_type=='news' &&
  category in ['technology','auto','lifestyle']
] | order(_createdAt desc)[0...10]${PROJ}`

const sliderTwoQuery = `*[_type=='news' &&
  category in ['sports','entertainment']
] | order(_createdAt desc)[0...10]${PROJ}`

/* ─── PARALLEL FETCH ─────────────────────────────────────────────────────
   All three Sanity requests fire simultaneously.
   Saves 400-900 ms vs sequential awaits on a cold Vercel lambda.         */
const [carousel, slider1, slider2] = await Promise.all([
  sanityFetch(homeQuery, {}, ['home']),
  sanityFetch(sliderOneQuery, {}, ['home', 'slider1']),
  sanityFetch(sliderTwoQuery, {}, ['home', 'slider2']),
])

/* ─── DERIVED SLICES (module-level, computed once) ───────────────────────*/
// const breakingNews = (carousel ?? []).filter(i => i.category === 'breaking').slice(0, 10)
const section1 = (carousel ?? []).slice(0, 15)
const section2 = (carousel ?? []).slice(15, 24)
const section3 = (carousel ?? []).slice(24, 35)
const section4 = (carousel ?? []).slice(35, 46)
const section5 = (carousel ?? []).slice(46, 57)
// const heroCard = (carousel ?? [])[51]
// const sideCards = (carousel ?? []).slice(54, 58)

/* ─── SLIDER CONFIG (stable object — not recreated each render) ──────────*/
 
const SLIDER_PROPS = {
  className: 'w-full mb-10',

  // Exact 16:9
  image_className:
    'relative w-full aspect-video overflow-hidden rounded flex-shrink-0',

  
    dynamicBasis:
  'm-auto p-2 border basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 flex flex-col gap-2 h-full',
}

/* ─── CARD COMPONENTS ────────────────────────────────────────────────────*/

const SmallCard = memo(function SmallCard({ data }) {
  return (
    <Link
      href={`/${data.category}/${data.slug}`}
      title={data?.heading}
      prefetch={false}
      className="
        border-b
        flex
        items-center
        gap-2
        py-1
        hover:shadow-lg
      "
    >
      {/* 16:9 */}
      <div className="w-[42%] aspect-video relative overflow-hidden rounded shrink-0">
        <BlurImage
          src={imgUrl(data?.image, 320)}
          alt={data?.alt}
          sizes="150px"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
        />
      </div>

      <div className="flex-1">
        <p className="text-sm min-[480px]:max-md:text-lg line-clamp-4 text-ellipsis text-wrap overflow-hidden break-words">
          <span className="font-bold text-red-600">
            {data?.tag ? `${data.tag}: ` : 'टैग:'}
          </span>

          <span>
            {data?.heading}
          </span>
        </p>
      </div>
    </Link>
  )
})

const SmallCardSpecial = memo(function SmallCardSpecial({ data }) {
  return (
    <Link
      href={`/${data.category}/${data.slug}`}
      className="border-b hover:shadow-lg flex flex-row items-center relative p-1"
      title={data?.heading}
      prefetch={false}
    >
      <div className="w-[47%] max-w-[150px] aspect-video relative overflow-hidden flex-shrink-0">
        <BlurImage
          src={imgUrl(data?.image, 320)}
          alt={data?.alt}
          sizes="150px"
          className="absolute inset-0 w-full h-full object-cover duration-500 ease rounded transform-gpu hover:scale-105 transition hover:duration-700"
        />
      </div>
      <div className="w-[53%] text-wrap line-clamp-4 break-words overflow-hidden pl-1 text-sm">
        <p>
          <span className="font-bold text-red-600">{data?.tag ? `${data.tag}: ` : 'टैग:'}</span>
          <span>{data?.heading ?? 'शीर्षक प्राप्त करने में असमर्थ'}</span>
        </p>
      </div>
    </Link>
  )
})

const HeroCard = memo(function HeroCard({ data, priority = false }) {
  return (
    <Link
      href={`/${data.category}/${data.slug}`}
      title={data?.heading}
      prefetch={false}
      className="
        border-b
       col-span-1
        row-span-1
        md:col-span-2
        md:row-span-5
        flex
        flex-col
        gap-3
        py-2       
        hover:shadow-lg
      "
    >
      {/* 16:9 */}
      <div className="relative w-full aspect-video overflow-hidden rounded">
        <BlurImage
          src={imgUrl(data?.image, 640)}
          alt={data?.alt}
          priority={priority}
          sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            hover:scale-105            
          "
        />
      </div>

      <div className="px-2">
        <p className="line-clamp-3">
          <span className="font-bold text-red-600 text-md md:text-xl lg:text-2xl">
            {data?.tag ? `${data.tag}: ` : 'टैग:'}
          </span>

          <span className="text-md md:text-xl lg:text-2xl font-bold leading-snug">
            {data?.heading}
          </span>
        </p>
      </div>
    </Link>
  )
})

const HeroCardSpecial = memo(function HeroCardSpecial({ data }) {
  return (
    <Link
      href={`/${data.category}/${data.slug}`}
      className="md:col-span-2 md:row-span-4 border flex flex-col justify-between font-bold relative hover:shadow-lg rounded-lg overflow-hidden group mt-4"
      title={data?.heading}
      prefetch={false}
    >
      <div className="w-full aspect-video relative overflow-hidden ">
        <BlurImage
          src={imgUrl(data?.image, 960)}
          alt={data?.alt}
          sizes="(max-width: 768px) 100vw, 66vw"
          className="absolute inset-0 w-full h-full object-cover duration-500 ease transform-gpu group-hover:scale-105 transition group-hover:duration-700"
        />
      </div>
      <div className="w-full text-wrap line-clamp-4 break-words overflow-hidden p-2">
        <p>
          <span className="font-bold text-red-600 text-md md:text-xl lg:text-2xl">{data?.tag ? `${data.tag}: ` : 'टैग:'}</span>
          <span className="font-bold text-md md:text-xl lg:text-2xl">{data?.heading ?? 'शीर्षक प्राप्त करने में असमर्थ'}</span>
        </p>
      </div>
    </Link>
  )
})

/* ─── SECTION COMPONENTS ─────────────────────────────────────────────────
   Named components outside Home() so React never remounts them.          */
const NewsSection = memo(function NewsSection({ items, special = false, firstPriority = false }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 xl:grid-cols-4 gap-x-4 gap-y-1
     mb-4 border-b-2 pb-5  ">
      {items.map((data, i) => {
        if (special) {
          return i === 1
            ? <HeroCardSpecial key={i} data={data} />
            : <SmallCardSpecial key={i} data={data} />
        }
        return i === 0
          ? <HeroCard key={i} data={data} priority={firstPriority} />
          : <SmallCard key={i} data={data} />
      })}
    </div>
  )
})

/* ─── PAGE ───────────────────────────────────────────────────────────────*/
export default function Home() {
  return (
    <>
      <main className="w-full flex min-h-screen flex-col items-center justify-between md:w-[95%] m-auto ">
        <h1 className="sr-only">
          अरब समाचार – खाड़ी देशों की ताज़ा खबरें हिंदी में
        </h1>
        <div className="hidden lg:flex flex-col items-center md:mt-2">
          <Image
  src="/arab-samachar-heading.png"
  alt="अरब समाचार – खाड़ी देशों की ताज़ा खबरें हिंदी में"
  width={767}
  height={149}
  priority
  className="mx-auto w-[320px] h-auto"
/>
          <HomeDate />
        </div>
        {/* <HeroCarosuel carousel={breakingNews} /> */}

        {/* ── tool strip ─────────────────────────────────────── */}
        <section className="w-[95%] m-auto">          
              <ToolsStrip />       
        </section>

        {/* ── News Sections ────────────────────────────────────────── */}
        <section className="w-[95%] m-auto">
          {/* section1 — Featured Stories ka extension, no separate heading needed */}
          <h2 className="text-lg md:text-xl font-bold border-l-4 border-red-600 pl-3 whitespace-nowrap md:w-1/4 mt-2 mb-2">
            <span aria-hidden="true">🔥</span> Featured Stories
          </h2>
          <NewsSection items={section1} firstPriority />

          <h2 className="text-lg md:text-xl font-bold border-l-4 border-red-600 pl-3 whitespace-nowrap md:w-1/4  ">
            <span aria-hidden="true">⚡</span> बड़ी खबरें
          </h2>
          <ImageSlider news2={slider1} {...SLIDER_PROPS} className="mb-4" />

          <h2 className="text-lg md:text-xl font-bold border-l-4 border-red-600 pl-3 whitespace-nowrap md:w-1/4  ">
            <span aria-hidden="true">👀</span> ज़रूर पढ़ें
          </h2>
          <NewsSection items={section2} special />

          <h2 className="text-lg md:text-xl font-bold border-l-4 border-red-600 pl-3 whitespace-nowrap md:w-1/4  ">
            <span aria-hidden="true">📌</span> चुनी गई खबरें
          </h2>
          <NewsSection items={section3} />

          <h2 className="text-lg md:text-xl font-bold border-l-4 border-red-600 pl-3 whitespace-nowrap md:w-1/4  ">
            <span aria-hidden="true">🌍</span> दुनिया भर से
          </h2>
          <ImageSlider news2={slider2} {...SLIDER_PROPS} className="mb-4" />

          <h2 className="text-lg md:text-xl font-bold border-l-4 border-red-600 pl-3 whitespace-nowrap md:w-1/4 ">
            <span aria-hidden="true">🗞️</span> और खबरें
          </h2>
          <NewsSection items={section4} />

          <h2 className="text-lg md:text-xl font-bold border-l-4 border-red-600 pl-3 whitespace-nowrap md:w-1/4  ">
            <span aria-hidden="true">⭐</span> खास खबरें
          </h2>
          <NewsSection items={section5} />
        </section>
      </main>
    </>
  )
}
