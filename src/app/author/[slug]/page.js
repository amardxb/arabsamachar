import { sanityFetch } from '../../../../sanity/lib/client';
import { imgUrl, urlForImage } from '../../../../sanity/lib/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlurImage from '@/app/components/BlurImage';
import TitleCard from '@/app/components/TitleCard';
import DateTimeCard from '@/app/components/DateTimeCard';

export const revalidate = 1800;

const SITE_URL = 'https://arabsamachar.com';

async function getAuthorData(slug) {
    return sanityFetch(
        `{
      "author": *[_type == "author" && slug.current == $slug][0]{
        name, role, bio, image, socialLinks
      },
      "posts": *[_type == "news" && authorRef->slug.current == $slug]
        | order(_createdAt desc)[0...10]{
        image, heading, title, date, category, description,
        "alt": image.alt, "slug": slug.current
      }
    }`,
        { slug },
        ['author', `author-${slug}`]
    );
}

// Pre-render known author pages at build time for faster TTFB + better crawlability
export async function generateStaticParams() {
    const slugs = await sanityFetch(
        `*[_type == "author"]{ "slug": slug.current }`,
        {},
        ['author']
    );
    return (slugs || []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
    const { author } = await getAuthorData(params.slug);
    if (!author) return {};

    const description =
        author.bio?.slice(0, 160) ||
        `${author.name} ke saare articles Arab Samachar par padhein.`;
    const ogImage = author.image ? urlForImage(author.image) : `${SITE_URL}/og-default.jpg`;
    const canonicalUrl = `${SITE_URL}/author/${params.slug}`;

    return {
        title: `${author.name} - Arab Samachar`,
        description,
        keywords: [author.name, author.role, 'Arab Samachar', 'Hindi news Gulf'].filter(Boolean),
        alternates: { canonical: canonicalUrl },
        robots: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
        },
        openGraph: {
            title: `${author.name} - Arab Samachar`,
            description,
            url: canonicalUrl,
            type: 'profile',
            siteName: 'Arab Samachar',
            images: [{ url: ogImage, width: 1200, height: 630, alt: author.name }],
        },
        twitter: {
            card: 'summary',
            title: `${author.name} - Arab Samachar`,
            description,
            images: [ogImage],
        },
    };
}

export default async function AuthorPage({ params }) {
    const { author, posts } = await getAuthorData(params.slug);
    if (!author) notFound();

    const canonicalUrl = `${SITE_URL}/author/${params.slug}`;

    const personJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: author.name,
        description: author.bio,
        jobTitle: author.role || undefined,
        image: author.image ? urlForImage(author.image) : undefined,
        url: canonicalUrl,
        sameAs: [
            author.socialLinks?.twitter,
            author.socialLinks?.linkedin,
            author.socialLinks?.facebook,
        ].filter(Boolean),
        worksFor: {
            '@type': 'Organization',
            name: 'Arab Samachar',
            url: SITE_URL,
        },
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Authors', item: `${SITE_URL}/author` },
            { '@type': 'ListItem', position: 3, name: author.name, item: canonicalUrl },
        ],
    };

    const itemListJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: posts.map((post, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE_URL}/${post.category}/${post.slug}`,
            name: post.heading,
        })),
    };

    return (
        <div className="w-[90%] mx-auto px-4 py-10 md:w-[75%]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {posts.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
                />
            )}

            {/* Visible breadcrumb for users + crawlers */}
            <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-4">
                <ol className="flex gap-1 flex-wrap">
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li>/</li>
                    <li aria-current="page" className="text-gray-700">{author.name}</li>
                </ol>
            </nav>

            <div className="flex flex-col md:flex-row gap-6 items-start">

                {/* Main content */}
                <main className="w-full md:w-[70%]">
                    <header className="flex items-center flex-col md:flex-row gap-4 mb-8 border-b border-gray-200 pb-6">
                        {author.image && (
                            <img
                                src={imgUrl(author.image, 192)}
                                alt={author.name}
                                width={96}
                                height={96}
                                className="w-24 h-24 rounded-full object-cover shrink-0"
                            />
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-[#0a112d]">{author.name}</h1>
                            {author.role && <p className="text-gray-600 text-sm">{author.role}</p>}
                            {author.bio && <p className="text-gray-700 mt-2 text-sm">{author.bio}</p>}

                            {(author.socialLinks?.twitter || author.socialLinks?.linkedin || author.socialLinks?.facebook) && (
                                <div className="flex gap-3 mt-3">
                                    {author.socialLinks?.twitter && (
                                        <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-xs text-[#c4132a] hover:underline">Twitter</a>
                                    )}
                                    {author.socialLinks?.linkedin && (
                                        <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-[#c4132a] hover:underline">LinkedIn</a>
                                    )}
                                    {author.socialLinks?.facebook && (
                                        <a href={author.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-xs text-[#c4132a] hover:underline">Facebook</a>
                                    )}
                                </div>
                            )}
                        </div>
                    </header>

                    <h2 className="text-md md:text-lg font-semibold mb-4 ml-1 text-[#0a112d]">
                        {author.name} के अन्य आर्टिकल -
                    </h2>

                    {/* Mobile-only in-feed ad, shown once above the article list since sidebar is hidden on mobile */}
                    {/* AdSense approval pending - placeholder shown, swap with <ins> block once approved */}
                    <div className="md:hidden mb-6">
                        <p className="text-[10px] text-gray-400 mb-1 text-center uppercase tracking-wide">
                            Advertisement
                        </p>
                        <div id="author-page-mobile-ad" className="w-full min-h-[100px] bg-gray-100 flex items-center justify-center rounded">
                            <span className="text-gray-400 text-xs">Ad space</span>
                        </div>
                    </div>

                    {posts.length === 0 && (
                        <p className="text-gray-500 text-sm">
                            {author.name} ke abhi koi article prakashit nahi hain.
                        </p>
                    )}

                    <div>
                        {posts.map((post, i) => (
                            <article key={i}>
                                <Link
                                    href={`/${post.category}/${post.slug}`}
                                    title={post?.heading}
                                    className="w-full flex flex-col md:flex-row-reverse mb-8 border rounded-xl relative p-2"
                                    prefetch={false}
                                >
                                    <div className="w-full md:w-1/3">
                                        <div className="relative w-full aspect-video overflow-hidden">
                                            <BlurImage
                                                src={imgUrl(post?.image, 480)}
                                                alt={post?.alt || post?.heading || 'Arab Samachar article image'}
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                loading={i < 3 ? 'eager' : 'lazy'}
                                                className="absolute inset-0 w-full h-full object-cover rounded"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-2/3 flex flex-col justify-between md:p-2">
                                        <TitleCard
                                            title={post?.heading ?? 'क्षमा करें, शीर्षक लाने में असमर्थ !!'}
                                            className="text-md md:text-lg font-bold md:text-2xl text-wrap line-clamp-3 md:line-clamp-2 break-words overflow-hidden pt-1 md:pt-0"
                                        />
                                        <p className="line-clamp-2 text-sm text-gray-600">
                                            {post?.description ?? 'क्षमा करें, विवरण लाने में असमर्थ !!'}
                                        </p>
                                        <div className="flex justify-between pr-2">
                                            <DateTimeCard postTime={post?.date} className="p-2 text-gray-400 text-[10px]" />
                                            <span className="text-[#c4132a] text-[10px]">{post?.category?.toUpperCase()}</span>
                                        </div>
                                    </div>
                                </Link>

                                {/* In-feed ad after every 4th article - AdSense approval pending, placeholder shown */}
                                {(i + 1) % 4 === 0 && i !== posts.length - 1 && (
                                    <div className="my-6">
                                        
                                        <div className="w-full min-h-[100px] bg-gray-100 flex items-center justify-center rounded">
                                            <span className="text-gray-400 text-xs">Ad space</span>
                                        </div>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </main>

                {/* Right sidebar ad - desktop only, sticky */}
                {/* AdSense approval pending - placeholder shown, swap with <ins> block + adsbygoogle.push script once approved */}
                <aside
                    className="hidden md:block w-[310px] shrink-0 sticky top-20 border-l border-gray-200 pl-4"
                    aria-label="Advertisement sidebar"
                >
                  
                    <div id="author-page-sidebar-ad" className="w-[300px] min-h-[600px] bg-gray-100 flex items-center justify-center rounded">
                        <span className="text-gray-400 text-sm">Ad space</span>
                    </div>
                </aside>

            </div>
        </div>
    );
}
