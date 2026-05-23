import { memo } from 'react'
import { sanityFetch } from '../../sanity/lib/client'
import { imgUrl } from '../../sanity/lib/image'
import HeroCarosuel from './components/HeroCarosuel'
import ImageSlider from './components/ImageSlider'
import BlurImage from './components/BlurImage'
import Link from 'next/link'

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
  !(category in ['technology','auto','lifestyle','sports','entertainment'])
] | order(_createdAt desc)[0...60]${PROJ}`

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
  sanityFetch(homeQuery,      {}, ['home']),
  sanityFetch(sliderOneQuery, {}, ['home', 'slider1']),
  sanityFetch(sliderTwoQuery, {}, ['home', 'slider2']),
])

/* ─── DERIVED SLICES (module-level, computed once) ───────────────────────*/
const breakingNews = (carousel ?? []).filter(i => i.category === 'breaking').slice(0, 10)
const section1     = (carousel ?? []).slice(0,  10)
const section2     = (carousel ?? []).slice(10, 23)
const section3     = (carousel ?? []).slice(23, 33)
const section4     = (carousel ?? []).slice(33, 43)
const section5     = (carousel ?? []).slice(43, 53)
const heroCard     = (carousel ?? [])[53]
const sideCards    = (carousel ?? []).slice(54, 58)

/* ─── SLIDER CONFIG (stable object — not recreated each render) ──────────*/
const SLIDER_PROPS = {
  className: 'w-full h-[250px] mb-10',
  image_className: 'h-[130px] relative',
  dynamicBasis: 'h-[250px] m-auto items-center p-2 border basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6',
}

/* ─── CARD COMPONENTS ────────────────────────────────────────────────────*/

const SmallCard = memo(function SmallCard({ data }) {
  return (
    <Link
      href={`/${data.category}/${data.slug}`}
      className="border-b hover:shadow-lg flex flex-row items-center relative h-[100px] p-1"
      title={data?.heading}
      prefetch={false}
    >
      <div className="items-center w-[45%] max-w-[150px] h-[95px] relative overflow-hidden">
        <BlurImage
          src={imgUrl(data?.image, 320)}
          alt={data?.alt}
          sizes="150px"
          className="absolute duration-500 ease rounded transform-gpu hover:scale-110 transition hover:duration-700"
        />
      </div>
      <div className="w-[55%] text-wrap line-clamp-4 break-words overflow-hidden pl-1">
        <p>
          <span className="font-bold text-red-600">{data?.tag ? `${data.tag}: ` : 'टैग:'}</span>
          <span>{data?.heading ?? 'शीर्षक प्राप्त करने में असमर्थ'}</span>
        </p>
      </div>
    </Link>
  )
})

const SmallCardSpecial = memo(function SmallCardSpecial({ data }) {
  return (
    <Link
      href={`/${data.category}/${data.slug}`}
      className="border-b hover:shadow-lg flex flex-row items-center relative h-[100px] p-1"
      title={data?.heading}
      prefetch={false}
    >
      <div className="items-center w-[45%] max-w-[150px] h-[95px] relative overflow-hidden">
        <BlurImage
          src={imgUrl(data?.image, 320)}
          alt={data?.alt}
          sizes="150px"
          className="absolute duration-500 ease rounded transform-gpu hover:scale-110 transition hover:duration-700"
        />
      </div>
      <div className="w-[55%] text-wrap line-clamp-4 break-words overflow-hidden pl-1">
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
      className="border row-span-3 col-span-1 flex flex-col justify-between font-bold relative p-1 hover:shadow-lg"
      title={data?.heading}
      prefetch={false}
    >
      <div className="h-[220px] md:h-[220px] lg:h-[190px] xl:h-[210px] w-full relative overflow-hidden">
        <BlurImage
          src={imgUrl(data?.image, 640)}
          alt={data?.alt}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="absolute duration-500 ease rounded transform-gpu hover:scale-110 transition hover:duration-700"
        />
      </div>
      <div className="w-full text-wrap line-clamp-4 break-words overflow-hidden p-1 text-lg">
        <p>
          <span className="font-bold text-red-600">{data?.tag ? `${data.tag}: ` : 'टैग:'}</span>
          <span>{data?.heading ?? 'शीर्षक प्राप्त करने में असमर्थ'}</span>
        </p>
      </div>
    </Link>
  )
})

const HeroCardSpecial = memo(function HeroCardSpecial({ data }) {
  return (
    <Link
      href={`/${data.category}/${data.slug}`}
      className="bg-[#0a112d] border md:row-span-4 md:col-span-2 flex flex-col justify-between font-bold relative hover:shadow-lg"
      title={data?.heading}
      prefetch={false}
    >
      <div className="h-[240px] md:h-[440px] lg:h-[400px] xl:h-[410px] w-full relative overflow-hidden">
        <BlurImage
          src={imgUrl(data?.image, 960)}
          alt={data?.alt}
          sizes="(max-width: 768px) 100vw, 66vw"
          className="absolute duration-500 ease rounded transform-gpu hover:scale-110 transition hover:duration-700"
        />
      </div>
      <div className="w-full text-wrap line-clamp-4 break-words overflow-hidden p-1 text-lg">
        <p>
          <span className="font-bold text-yellow-200">{data?.tag ? `${data.tag}: ` : 'टैग:'}</span>
          <span className="text-white">{data?.heading ?? 'शीर्षक प्राप्त करने में असमर्थ'}</span>
        </p>
      </div>
    </Link>
  )
})

/* ─── SECTION COMPONENTS ─────────────────────────────────────────────────
   Named components outside Home() so React never remounts them.          */
const NewsSection = memo(function NewsSection({ items, special = false, firstPriority = false }) {
  return (
    <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 xl:grid-cols-4 gap-1 mb-10 mt-1 border-b-2 pb-5 pt-1">
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
    <main className="w-full flex min-h-screen flex-col items-center justify-between md:w-[95%] m-auto mt-4">
      <h1 className="text-md md:text-xl lg:text-3xl font-bold my-2 leading-snug">
        अरब समाचार – खाड़ी देशों की ताज़ा खबरें हिंदी में
      </h1>

      <HeroCarosuel carousel={breakingNews} />

      {/* ── Featured Stories ─────────────────────────────────────── */}
      <section className="w-[95%] m-auto mt-4 my-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold border-l-4 border-red-600 pl-3">
            🔥 Featured Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* BIG HERO CARD — priority because it's the LCP element */}
          {heroCard && (
            <Link
              href={`/${heroCard.category}/${heroCard.slug}`}
              className="md:col-span-2 row-span-2 relative group overflow-hidden rounded-lg"
              prefetch={false}
            >
              <div className="h-[250px] md:h-[400px] w-full relative overflow-hidden">
                <BlurImage
                  src={imgUrl(heroCard.image, 1200)}
                  alt={heroCard.alt}
                  priority               // above-the-fold LCP image
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="absolute group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent text-white p-4 w-full">
                <p className="inline-block bg-red-600/90 backdrop-blur px-2 py-1 rounded text-white font-bold text-xs">
                  {heroCard?.tag}
                </p>
                <h3 className="text-lg md:text-2xl font-bold line-clamp-2">{heroCard?.heading}</h3>
              </div>
            </Link>
          )}

          {/* SIDE SMALL CARDS */}
          <div className="flex flex-col gap-3">
            {sideCards.map((item, i) => (
              <Link
                key={i}
                href={`/${item.category}/${item.slug}`}
                className="flex gap-2 border hover:shadow-lg transition rounded overflow-hidden group"
                prefetch={false}
              >
                <div className="w-[35%] h-[95px] p-1 relative overflow-hidden">
                  <div className="w-full h-full relative rounded overflow-hidden">
                    <BlurImage
                      src={imgUrl(item.image, 320)}
                      alt={item.alt}
                      sizes="150px"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition"
                    />
                  </div>
                </div>
                <div className="w-[65%] p-2">
                  <p className="text-sm text-red-600 font-bold">{item?.tag}</p>
                  <p className="text-sm font-semibold line-clamp-3">{item?.heading}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── News Sections ────────────────────────────────────────── */}
      <section className="w-[95%] m-auto">
        {/* section1 hero is just below the featured section — give it priority */}
        <NewsSection items={section1} firstPriority />

        <ImageSlider news2={slider1} {...SLIDER_PROPS} />

        <NewsSection items={section2} special />
        <NewsSection items={section3} />

        <ImageSlider news2={slider2} {...SLIDER_PROPS} />

        <NewsSection items={section4} />
        <NewsSection items={section5} />
      </section>
    </main>
  )
}
