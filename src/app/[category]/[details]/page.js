import { sanityFetch } from '../../../../sanity/lib/client'
import { imgUrl, urlForImage } from '../../../../sanity/lib/image'
import { PortableText } from '@portabletext/react'
import { components } from '@/app/components/CustomComponent'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import BlurImage from '@/app/components/BlurImage'
import ImageSlider from '@/app/components/ImageSlider'
import SuggestionCard from '@/app/components/SuggestionCard'
import Share from '@/app/components/Share'
import Intro from '@/app/components/Intro'
import TitleCard from '@/app/components/TitleCard'
import DateTimeCard from '@/app/components/DateTimeCard'
import HighLights from '@/app/components/HighLights'
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getReadTime } from '@/lib/readTime'
import ReadTimeBadge from '@/app/components/ReadTimeBadge'
import ArticleFAQ from '@/app/components/ArticleFAQ'

export const revalidate = false
export const dynamicParams = true

/* ─── METADATA ───────────────────────────────────────────────────────────*/
export async function generateMetadata({ params }) {
  const { category, details: slug } = await params
  const meta = await sanityFetch(
    `*[_type=='news' && slug.current==$slug][0]{ title, description, image }`,
    { slug },
    [`article-${slug}`]
  )
  if (!meta) {
  notFound();
}

  const ogImage = meta?.image ? urlForImage(meta.image) : 'https://www.arabsamachar.com/arabsamacharwidelogo.jpg'
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://www.arabsamachar.com/${category}/${slug}`,
      type: 'website',
      siteName: 'Arab Samachar',
      locale: 'hi_IN',
      images: [ogImage],
    },
    alternates: { canonical: `https://www.arabsamachar.com/${category}/${slug}` },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  }
}

/* ─── STATIC PARAMS ──────────────────────────────────────────────────────
   Only project category + slug — smallest possible payload for build.    */
export async function generateStaticParams() {
  const articles = await sanityFetch(
    `*[_type=='news']{ category, "slug": slug.current }`,
    {},
    ['articles']
  )
  return (articles ?? []).map(a => ({ category: a.category, details: a.slug }))
}

/* ─── PAGE ───────────────────────────────────────────────────────────────*/
export default async function ArticlePage({ params }) {
  const { category, details: slug } = await params
  const label = category[0].toUpperCase() + category.slice(1).toLowerCase()

  /* ── Parallel fetch ─────────────────────────────────────────────────
     BEFORE: 3 sequential awaits = 3× network round-trips.
     AFTER:  all 3 fire simultaneously.                                */
  const [news_content, relatedRaw, mixRaw] = await Promise.all([
    // Article content
    sanityFetch(
      `*[_type=='news' && slug.current==$slug][0]{
        image, intro, "caption":image.caption, "alt":image.alt,
        content, tag, _updatedAt, title, description,
       heading, "highlight":highlight[], author, date, "faq":faq[]{ question, answer }
        }`,
      { slug },
      [`article-${slug}`]
    ),
    // Related articles (same category)
    sanityFetch(
      `*[_type=='news' && category==$cat && slug.current!=$slug]
       | order(_createdAt desc)[0...8]{
         image, heading, title, date, category,
         "alt":image.alt, "slug":slug.current
       }`,
      { cat: category, slug },
      [`category-${category}`]
    ),
    // Mixed articles (other categories)
    sanityFetch(
      `*[_type=='news' && category!=$cat && slug.current!=$slug]
       | order(_createdAt desc)[0...15]{
         image, heading, title, date, category, description,
         "alt":image.alt, "slug":slug.current
       }`,
      { cat: category, slug },
      ['home']
    ),
  ])

  if (!news_content) return notFound()

  const carosuelNews = relatedRaw ?? []
  const sidebarNews  = (mixRaw ?? []).slice(0, 6)
  const bottomNews   = (mixRaw ?? []).slice(6, 15)

  /* ── Structured data ──────────────────────────────────────────────*/
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.arabsamachar.com' },
      { '@type': 'ListItem', position: 2, name: category, item: `https://www.arabsamachar.com/${category}` },
      { '@type': 'ListItem', position: 3, name: news_content?.title, item: `https://www.arabsamachar.com/${category}/${slug}` },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.arabsamachar.com/${category}/${slug}` },
    headline: news_content?.title || news_content?.heading,
    description: news_content?.description,
    image: [news_content?.image ? urlForImage(news_content.image) : 'https://www.arabsamachar.com/arabsamacharwidelogo.jpg'],
    author: { '@type': 'Person', name: news_content?.author || 'Arab Samachar' },
    publisher: {
      '@type': 'Organization',
      name: 'Arab Samachar',
      logo: { '@type': 'ImageObject', url: 'https://www.arabsamachar.com/arabsamacharwidelogo.jpg' },
    },
    datePublished: news_content?.date,
    dateModified: news_content?._updatedAt,
  }
 const faqs = news_content?.faq || []

const faqSchema = faqs.length
  ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    }
  : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(faqSchema)
    }}
  />
)}

      <div className="min-h-screen relative w-full flex m-auto justify-center mt-4">

        {/* ── Sidebar ───────────────────────────────────────────── */}
        <aside className="w-0 lg:w-[25%] h-screen lg:visible invisible sticky top-0 left-0 pt-2 overflow-y-auto mb-12">
          {sidebarNews.length > 0 && (
            <SuggestionCard
              content="ट्रेंडिंग न्यूज़"
              className="w-[95%] flex flex-row border-l-4 h-10 border-[#c4132a] p-2 m-auto mb-4 mt-1"
            />
          )}
          {sidebarNews.map((post, i) => (
            <Link
              key={i}
              href={`/${post.category}/${post.slug}`}
              title={post?.heading ?? 'क्षमा करें, शीर्षक लाने में असमर्थ !!'}
              className="w-[94%] border-b flex flex-row items-start gap-y-6 justify-between p-2 m-auto mb-2 border"
              prefetch={false}
            >
              <div className="w-[40%] aspect-video relative flex-shrink-0">
                <BlurImage
                  src={imgUrl(post.image, 160)}
                  alt={post?.alt}
                  sizes="100px"
                  className="rounded-sm absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <TitleCard
                title={post?.heading ?? 'क्षमा करें, शीर्षक लाने में असमर्थ !!'}
                className=" pl-2 w-[60%] text-md leading-[1.4] text-wrap break-words overflow-hidden line-clamp-3"
                style={{ maxHeight: 'calc(1.4em * 3)' }}
              />
            </Link>
          ))}
        </aside>

        {/* ── Main article ──────────────────────────────────────── */}
        <main className="w-full lg:w-[55%] h-auto pb-40 pt-2 pl-4 pr-4 border-l border-r">
          <Breadcrumb className="mt-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#C4132A] hover:text-blue-600">Hindi News</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#C4132A]" />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${category}`} className="text-[#C4132A] truncate hover:text-blue-600" title={label}>
                  {label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="md:visible invisible">{news_content?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <article>
            <div className="w-full mt-0 md:mt-4 lg:mt-6 pl-0">
              <h1 className="text-2xl md:text-3xl font-bold mb-6">
                 {news_content?.heading ?? 'शीर्षक प्राप्त करने में असमर्थ !!'}
              </h1>
              <div>
               <div className="flex items-center gap-2 flex-wrap text-[12px] md:text-sm leading-none">
  
  <span>Published by:</span>

  <span className="text-[#c4132a] font-bold">
    {news_content?.author ?? 'Arab Samachar'}
  </span>

  <span className="text-gray-400">•</span>

  <div className="flex items-center gap-1 leading-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 shrink-0 translate-y-[0px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>

    <span className="relative top-[1px] text-green-700 font-medium">
      {getReadTime(news_content?.content)}
    </span>
  </div>

</div>
                <div className="flex flex-col md:flex-row md:gap-4">
                  <div className="flex flex-row text-[12px] md:text-sm">
                    <span>Posted on: </span>
                    <DateTimeCard postTime={news_content?.date ?? 'दिनांक अनुपलब्ध'} className="pl-2 text-[12px] md:text-sm" />
                  </div>
                  <div className="flex flex-row text-[12px] md:text-sm">
                    <span>Updated on:</span>
                    <DateTimeCard postTime={news_content?._updatedAt ?? 'दिनांक अनुपलब्ध'} className="pl-2 text-[12px] md:text-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full md:justify-end flex-row ml-2">
              <Share url={`https://www.arabsamachar.com/${category}/${slug}`} />
            </div>

            <HighLights
              highlights_data={news_content?.highlight}
              className="mt-10 mb-6 relative w-full bg-gray-100 border border-gray-300 h-auto m-auto md:w-[90%] lg:w-[80%] p-4 rounded"
            />
            <Intro intro_content={news_content?.intro} />

            {/* Article hero image — priority=true because it's the LCP */}
            <div className="mt-4 w-full relative aspect-video" title={news_content?.heading}>
              <BlurImage
                src={imgUrl(news_content?.image, 960)}
                alt={news_content?.alt}
                priority
                sizes="(max-width: 768px) 100vw, 55vw"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <p className="relative text-center mb-4 text-[14px] md:text-md" title="Image caption">
              {news_content?.caption}
            </p>

            <PortableText value={news_content?.content} components={components} />
            <ArticleFAQ faqs={news_content?.faq || []} />
          </article>

          <hr className="mt-6" />
          <div className="w-full flex justify-end mt-6">
            <Share url={`https://www.arabsamachar.com/${category}/${slug}`} />
          </div>

        {carosuelNews.length > 0 && (
            <ImageSlider
              className="w-full mb-10"
              image_className="relative w-full aspect-video overflow-hidden rounded flex-shrink-0"
              dynamicBasis="m-auto p-2 border basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 flex flex-col gap-2"
              news2={carosuelNews}
            />
)}

          {/* Bottom related articles */}
          <div className="w-full mt-20">
            {bottomNews.map((post, i) => (
              <Link
                key={i}
                href={`/${post.category}/${post.slug}`}
                title={post?.heading}
                className="w-full flex flex-col md:flex-row mb-8 border rounded-xl relative p-2"
                prefetch={false}
              >
                <div className="w-full md:w-1/3">
                  <div className="relative w-full aspect-video overflow-hidden">
                    <BlurImage
                      src={imgUrl(post?.image, 480)}
                      alt={post?.alt}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="absolute inset-0 w-full h-full object-cover rounded"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-between pl-2">
                  <TitleCard
                    title={post?.heading ?? 'क्षमा करें, शीर्षक लाने में असमर्थ !!'}
                    className="text-xl font-bold md:text-2xl text-wrap line-clamp-2 break-words overflow-hidden"
                  />
                  <div className="p-2">
                    <p className="line-clamp-2 text-gray-600">{post?.description ?? 'क्षमा करें, विवरण लाने में असमर्थ !!'}</p>
                  </div>
                  <div className="flex justify-between pr-2">
                    <DateTimeCard postTime={post?.date} className="p-2 text-gray-400 text-[10px]" />
                    <span className="text-[#c4132a] text-[10px]">{post?.category?.toUpperCase()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>

        <div className="hidden lg:block w-0 lg:w-[20%] h-screen sticky top-0 left-0 pt-2 overflow-y-auto" />
      </div>
    </>
  )
}
