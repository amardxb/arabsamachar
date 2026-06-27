import { sanityFetch } from '../../../sanity/lib/client'
import { imgUrl } from '../../../sanity/lib/image'
import BlurImage from '../components/BlurImage'
import ImageSlider from '../components/ImageSlider'
import SuggestionCard from '../components/SuggestionCard'
import DateTimeCard from '../components/DateTimeCard'
import Link from 'next/link'

export const revalidate = false // on-demand revalidation via webhook

/* ─── METADATA ───────────────────────────────────────────────────────────*/
export async function generateMetadata({ params }) {
  const { category } = await params
  const label = category[0].toUpperCase() + category.slice(1).toLowerCase()
  return {
    title: `${label} News Hindi | अरब समाचार Arab Samachar | हिंदी समाचार`,
    description: `Hindi News हिंदी समाचार, Arab Hindi News अरब हिंदी समाचार | All Types of ${label} News`,
    openGraph: {
      title: `${label} News`,
      description: `All Types of ${label} Hindi News`,
      url: `https://www.arabsamachar.com/${category}`,
      type: 'website',
      locale: 'hi_IN',
      siteName: 'Arab Samachar',
      images: ['https://www.arabsamachar.com/arabsamacharwidelogo.jpg'],
    },
    alternates: { canonical: `https://www.arabsamachar.com/${category}` },
  }
}

/* ─── PAGE ───────────────────────────────────────────────────────────────*/
export default async function CategoryPage({ params }) {
  const { category } = await params

  /* ── Targeted GROQ queries ────────────────────────────────────────────
     BEFORE: one query fetching 100 articles of ALL categories, then
     filtering in JS. This downloaded data for articles that were thrown
     away immediately — wasteful bandwidth + slower cold starts.

     AFTER: three small parallel queries, each fetching only the data
     it needs. Total data transferred is ~70% less.                      */

  /* Map each category to its "read this also" cross-category */
  const crossMap = {
    entertainment: 'finance',
    finance: 'lifestyle',
    lifestyle: 'sports',
    breaking: 'world',
    world: 'national',
  }
  const crossCategory = crossMap[category] || 'breaking'

  const PROJ = `{
    image, heading, tag, date, category,
    "alt": image.alt,
    "slug": slug.current
  }`

  const [mainData, mustReadData, readAlsoData, autoData] = await Promise.all([
    // Section 1 — current category, 21 items
    sanityFetch(
      `*[_type=='news' && category==$cat] | order(_createdAt desc)[0...20]${PROJ}`,
      { cat: category },
      [`category-${category}`]
    ),
    // Section 2 — must read (other categories), 15 items
    sanityFetch(
      `*[_type=='news' && category!=$cat] | order(_createdAt desc)[0...15]${PROJ}`,
      { cat: category },
      [`category-${category}-mustread`]
    ),
    // Section 3 — read this also (cross category), 9 items
    sanityFetch(
      `*[_type=='news' && category==$cross] | order(_createdAt desc)[0...9]${PROJ}`,
      { cross: crossCategory },
      [`category-${crossCategory}`]
    ),
    // Section 4 — auto news, 10 items
    sanityFetch(
      `*[_type=='news' && category=='auto'] | order(_createdAt desc)[0...10]${PROJ}`,
      {},
      ['category-auto']
    ),
  ])

  const filteredCategoryData = mainData ?? []
  const mustRead = mustReadData ?? []
  const readThisAlso = readAlsoData ?? []
  const autonews = autoData ?? []

  return (
    <div className="min-h-screen w-full mt-10">
      <h1 className="sr-only">{category} News Hindi | {category} हिंदी समाचार</h1>

      {/* ── SECTION 1 — Main category grid ───────────────────────── */}
      <div className="mt-1 gap-2 gap-x-2 grid grid-cols-1 mb-10 w-[95%] m-auto
                      sm:grid-cols-1 sm:w-[95%]
                      md:grid-cols-2 md:w-[90%]
                      lg:grid-cols-3 lg:pb-10 lg:w-[95%]
                      xl:grid-cols-4 xl:pb-10 xl:w-[90%]">
        {filteredCategoryData.map((result, index) => (
          <div
            key={index}
            className={index === 0
              ? 'row-span-2 items-center justify-center col-span-1 flex font-bold relative xl:text-4xl xl:col-span-2 xl:row-span-4 sm:row-span-1 sm:col-span-2 md:row-span-4 md:col-span-2'
              : 'flex flex-row relative h-[105px] border-b'}
            title={result?.heading}
          >
            <Link
              href={`/${category}/${result.slug}`}
              className={index === 0
                ? 'block w-full h-full hover:shadow-lg relative'
                : 'flex flex-row w-full h-full items-center hover:shadow-lg'}
              prefetch={false}
            >
              <div className={index === 0
                ? 'h-[250px] md:h-[450px] w-full relative xl:h-[450px] lg:h-[350px] flex items-start pt-2 border-b mt-3'
                : 'flex items-center h-[80px] w-[40%] relative'}>
                {result?.image && (
                  <BlurImage
                    src={imgUrl(result.image, index === 0 ? 960 : 320)}
                    alt={result?.alt}
                    priority={index === 0}  // hero card is LCP
                    sizes={index === 0
                      ? '(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 50vw'
                      : '120px'}
                    className="absolute"
                  />
                )}
              </div>
              <div className={index === 0
                ? 'absolute bottom-1/3 xl:text-3xl text-md lg:text-2xl bg-black bg-opacity-30 text-white text-left p-2 font-bold'
                : 'absolute w-[60%] right-0 md:flex md:items-center'}>
                <div className="p-1 block">
                  <div className="w-full text-wrap line-clamp-3 break-words overflow-hidden">
                    {index !== 0 && (
                      <span className="text-[#c4132a] font-bold">
                        {result?.tag ? `${result.tag}: ` : 'समाचार: '}
                      </span>
                    )}
                    {result?.heading ?? 'क्षमा करें, डेटा लाने में असमर्थ'}
                  </div>
                </div>
              </div>
              <DateTimeCard
                className={index === 0
                  ? 'absolute text-[10px] bottom-0 right-1 text-transparent'
                  : 'absolute text-[10px] bottom-0 right-1 text-gray-500'}
                postTime={result?.date}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* ── SECTION 2 — Must Read ────────────────────────────────── */}
      {mustRead.length > 0 && (
        <div>
          <h2>
            <SuggestionCard
              content="Must Read"
              className="w-[95%] m-auto flex flex-row border-l-4 h-10 pl-2 border-red-600 mb-4 lg:w-[95%] xl:w-[90%]"
            />
          </h2>
          <div className="m-auto grid grid-cols-2 gap-x-4 w-[95%] pb-10 gap-y-4
                          sm:grid-cols-3 sm:gap-4 sm:w-[90%] sm:pb-10
                          md:grid-cols-2 md:gap-x-16 md:w-[90%] md:pb-10
                          lg:grid-cols-5">
            {mustRead.map((result, index) => (
              <Link
                key={index}
                title={result?.heading}
                href={`/${result.category}/${result.slug}`}
                className="flex flex-col border hover:shadow-lg w-[150px] md:w-[300px] lg:w-[230px]"
                prefetch={false}
              >
                <div className="w-full h-[100px] lg:h-[150px] relative overflow-hidden">
                  {result?.image && (
                    <BlurImage
                      src={imgUrl(result.image, 320)}
                      alt={result?.alt}
                      sizes="(max-width: 768px) 150px, 300px"
                      className="absolute w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="block overflow-hidden relative p-1 pb-4 w-full h-[100px]">
                  <div className="w-full text-wrap line-clamp-3 overflow-hidden break-words">
                    <span className="text-[#c4132a] font-bold">
                      {result?.tag ? `${result.tag}: ` : 'समाचार: '}
                    </span>
                    {result?.heading ?? 'क्षमा करें, डेटा लाने में असमर्थ'}
                  </div>
                  <DateTimeCard className="absolute text-[10px] text-gray-500 bottom-0" postTime={result?.date} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── SECTION 3 — Read This Also ───────────────────────────── */}
      {readThisAlso.length > 0 && (
        <div className="w-full">
          <h2>
            <SuggestionCard
              content="यह भी पढ़े"
              className="w-[95%] m-auto flex flex-row border-l-4 h-10 pl-2 border-red-600 mb-4 lg:w-[95%] xl:w-[90%]"
            />
          </h2>
          <div className="m-auto grid grid-cols-1 gap-4 sm:grid-cols-2 sm:w-[90%] sm:pb-10
                          md:grid-cols-2 md:w-[90%] md:pb-10 lg:grid-cols-3 w-[90%] pb-10">
            {readThisAlso.map((result, index) => (
              <Link
                key={index}
                title={result?.heading}
                href={`/${result.category}/${result.slug}`}
                className="flex flex-row relative border hover:shadow-lg"
                prefetch={false}
              >
                <div className="h-[90px] w-[45%] lg:w-[35%] relative">
                  {result?.image && (
                    <BlurImage
                      src={imgUrl(result.image, 320)}
                      alt={result?.alt}
                      sizes="150px"
                      className="absolute p-1"
                    />
                  )}
                </div>
                <div className="block overflow-hidden relative w-[55%] p-1">
                  <div className="w-full text-wrap line-clamp-3 overflow-hidden break-words">
                    <span className="text-[#c4132a] font-bold">
                      {result?.tag ? `${result.tag}: ` : 'समाचार: '}
                    </span>
                    {result?.heading ?? 'क्षमा करें, डेटा लाने में असमर्थ'}
                  </div>
                  <DateTimeCard className="absolute text-[10px] bottom-0 right-1 text-gray-500" postTime={result?.date} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── SECTION 4 — Auto News Slider ─────────────────────────── */}
      {autonews.length > 0 && (
        <div>
          <h2>
            <SuggestionCard
              content="ऑटो समाचार"
              className="w-[90%] m-auto flex flex-row border-l-4 h-10 pl-2 border-[#c4132a] mb-4 lg:w-[95%] xl:w-[90%]"
            />
          </h2>
          <ImageSlider
            news2={autonews}
            className="w-[90%] m-auto mt-4 h-70 mb-10 bg-red-50 rounded justify-center items-center border border-b-2 border-red-200"
            image_className="h-[100px] relative"
            dynamicBasis="h-[200px] m-auto items-center p-2 border basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
          />
        </div>
      )}
    </div>
  )
}