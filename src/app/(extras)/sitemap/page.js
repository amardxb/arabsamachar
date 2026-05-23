/* import { client } from "../../../../sanity/lib/client";
import Link from "next/link";

export const metadata = {
    title: "Sitemap - अरब समाचार | Arab Samachar",
    description: "हमारे इस पेज पर अरब समाचार वेबसाइट का पूरा साइटमैप दिया गया है। यहाँ आप सभी केटेगरी और पेजों की लिस्ट देख सकते हैं ताकि वेबसाइट को आसानी से नेविगेट किया जा सके।",  
    alternates: {
        canonical: 'https://www.arabsamachar.com/sitemap'
      }
}
 

export const revalidate = 60;

export default async function sitemap() {
    const baseurl = "https://www.arabsamachar.com";
    const user_sitemapQuery = `*[_type=='news'] | order(_updatedAt desc){ 
        category,
        heading,    
        "slug": slug.current,
        _updatedAt      
    }`;
    const sitemapData = await client.fetch(user_sitemapQuery);  

    // Grouping headings by category using reduce
    const categorizedHeadings = sitemapData.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});
    
    return (
        <div className="w-full min-h-screen md:w-[90%] lg:w-[75%] lg:m-auto">         
            {Object.entries(categorizedHeadings).map(([category, headings]) => (
                <div key={category}>
                    <h2 className="text-xl font-bold mt-8">{category.toUpperCase()} :</h2>
                    {headings.map((item, index) => (                        
                            <Link key ={index} href={`${baseurl}/${item.category}/${item.slug}`} className="text-blue-800" title={item.heading}>
                                <p className="text-bold pt-2 pb-2 pl-2 ml-4"><span>{index+1} - </span><span className="hover:underline">{item.heading}</span></p>
                            </Link>                      
                    ))}
                </div>
            ))}
        </div>       
    );
}
 */
 import { client } from "../../../../sanity/lib/client";
import Link from "next/link";

export const revalidate = 60;

export async function generateMetadata({ searchParams }) {
    const page = Number(searchParams?.page || 1);

    return {
        title: `Sitemap Page ${page} - अरब समाचार | Arab Samachar`,
        description:
            "अरब समाचार वेबसाइट का पूरा साइटमैप यहाँ उपलब्ध है। सभी केटेगरी की ताज़ा खबरें देखें।",
        alternates: {
            canonical: `https://www.arabsamachar.com/sitemap?page=${page}`,
        },
    };
}

export default async function SitemapPage({ searchParams }) {
    const baseurl = "https://www.arabsamachar.com";

    const page = Number(searchParams?.page || 1);
    const limit = 20;
    const start = (page - 1) * limit;
    const end = page * limit;

    const query = `*[_type=='news'] | order(_updatedAt desc){
        category,
        heading,
        "slug": slug.current,
        _updatedAt
    }`;

    const data = await client.fetch(query);

    // Group by category
    const categorized = data.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    // ✅ FIXED: check if next page exists correctly
    const hasNextPage = Object.values(categorized).some(
        (arr) => arr.length > page * limit
    );

    return (
        <div className="w-full min-h-screen md:w-[90%] lg:w-[75%] lg:m-auto">

            {Object.entries(categorized).map(([category, headings]) => {

                const paginated = headings.slice(start, end);

                // hide empty categories
                if (paginated.length === 0) return null;

                return (
                    <div key={category}>
                        <h2 className="text-xl font-bold mt-8">
                            {category.toUpperCase()} :
                        </h2>

                        {paginated.map((item, index) => (
                            <Link
                                key={index}
                                href={`${baseurl}/${item.category}/${item.slug}`}
                                className="text-blue-800"
                            >
                                <p className="pt-2 pb-2 pl-2 ml-4">
                                    <span>{start + index + 1} - </span>
                                    <span className="hover:underline">
                                        {item.heading}
                                    </span>
                                </p>
                            </Link>
                        ))}
                    </div>
                );
            })}

            {/* Pagination Controls */}
            <div className="flex gap-6 mt-10 justify-center items-center font-medium text-blue-700">

                {page > 1 ? (
                    <Link href={`/sitemap?page=${page - 1}`}>
                        ← Previous
                    </Link>
                ) : (
                    <span className="text-gray-400">← Previous</span>
                )}

                <span className="text-black font-bold">
                    Page {page}
                </span>

                {hasNextPage ? (
                    <Link href={`/sitemap?page=${page + 1}`}>
                        Next →
                    </Link>
                ) : (
                    <span className="text-gray-400">Next →</span>
                )}

            </div>

        </div>
    );
}