import { searchArticles } from "@/lib/searchArticles";
import SearchResultCard from "@/app/components/SearchResultCard";
import SearchPagination from "@/app/components/SearchPagination";
import TrendingSidebar, { getTrendingArticles } from "@/app/components/TrendingSidebar";
import SearchBarInline from "@/app/components/SearchBarInline";
import SortDropdown from "@/app/components/SortDropdown";
import { searchStaticTools } from "@/lib/staticTools";
import Link from "next/link";

const SITE_URL = "https://www.arabsamachar.com"; //  

export async function generateMetadata({ searchParams }) {
    const q = searchParams?.q || "";
    const title = q
        ? `"${q}" के लिए खोज परिणाम | Arab Samachar`
        : "खोजें | Arab Samachar - Gulf और भारत की ताज़ा हिंदी खबरें";
    const description = q
        ? `Arab Samachar पर "${q}" से जुड़ी सभी ताज़ा खबरें, अपडेट्स और विश्लेषण पढ़ें।`
        : "Arab Samachar पर Gulf, UAE, भारत और दुनिया भर की खबरें खोजें - वीजा, बिजनेस, मौसम, खेल और मनोरंजन से जुड़ी हर जानकारी।";

    return {
        title,
        description,
        alternates: {
            canonical: q
                ? `${SITE_URL}/search?q=${encodeURIComponent(q)}`
                : `${SITE_URL}/search`,
        },

        robots: {
            index: false,
            follow: true,
        },
        openGraph: {
            title,
            description,
            url: q ? `${SITE_URL}/search?q=${encodeURIComponent(q)}` : `${SITE_URL}/search`,
            siteName: "Arab Samachar",
            locale: "hi_IN",
            type: "website",
        },
    };
}

export default async function SearchPage({ searchParams }) {
    const query = searchParams?.q || "";
    const sort = searchParams?.sort === "newest" ? "newest" : "score";
    const page = parseInt(searchParams?.page) || 1;

    const [{ results, total, totalPages }, trendingArticles] = await Promise.all([
        query ? searchArticles({ query, sort, page }) : { results: [], total: 0, totalPages: 0 },
        getTrendingArticles(),
    ]);

    // Static tool pages (weather, gold-rate, exchange-rate, prayer-time, gratuity)
    // Sanity ka hissa nahi hain, isliye alag se JS list mein search hota hai
    const matchedTools = query ? searchStaticTools(query) : [];

    // WebSite + SearchAction schema - ye Google ko "Sitelinks Search Box"
    // dikhane ke liye enable karta hai (Google Rich Results Test mein pass hota hai)
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Arab Samachar",
        url: SITE_URL,
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <div className="max-w-6xl mx-auto px-4 pb-8 pt-6     sm:mt-12">
            {/* JSON-LD: Sitelinks Search Box schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />

            <h1 className="text-3xl font-extrabold mb-6">Search</h1>

            {/* Search input - top, editable */}
            <SearchBarInline defaultValue={query} />

            {/* Ad slot - desktop only, top banner jaisa badi news sites mein hota hai */}
            <div className="hidden sm:block my-6">
                {/* Yahan apna actual AdSense <ins> tag daalna, jaise:
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        ></ins>
            
        */}
                <div className="w-full h-24 bg-gray-50 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm">
                    Ads
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 mt-6">
                {/* Left: Result count + sort + cards */}
                <div>
                    {query && (
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                            <p className="text-gray-600 text-sm">
                                <span className="font-semibold">{total}</span> परिणाम मिले "{query}" के लिए
                            </p>
                            <SortDropdown currentSort={sort} query={query} />
                        </div>
                    )}

                    {/* Static tool matches - jaise weather, gold rate, gratuity calculator */}
                    {matchedTools.length > 0 && (
                        <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                                संबंधित टूल्स
                            </h2>
                            <ul className="space-y-2">
                                {matchedTools.map((tool) => (
                                    <li key={tool.url}>
                                        <Link
                                            href={tool.url}
                                            className="text-[#0a112d] font-semibold hover:underline"
                                        >
                                            {tool.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {query && results.length === 0 && matchedTools.length === 0 && (
                        <p className="text-center text-gray-400 py-16">
                            कोई खबर नहीं मिली। कोई और शब्द आज़माएं।
                        </p>
                    )}

                    {results.map((article) => (
                        <SearchResultCard key={article._id} article={article} />
                    ))}

                    {query && results.length > 0 && (
                        <SearchPagination
                            currentPage={page}
                            totalPages={totalPages}
                            query={query}
                            sort={sort}
                        />
                    )}
                </div>

                {/* Right: Trending sidebar */}
                <aside>
                    <TrendingSidebar articles={trendingArticles} />
                </aside>
            </div>
        </div>
    );
}
