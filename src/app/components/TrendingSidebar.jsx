import Link from "next/link";
import { client } from "../../../sanity/lib/client";

export async function getTrendingArticles() {
  // NOTE: Abhi "trending" ke liye view-count tracking system nahi hai,
  // isliye fallback ke roop mein latest 6 articles use kar rahe hain.
  const articles = await client.fetch(
    `*[_type == "news"] | order(date desc) [0...6] {
      _id,
      title,
      slug,
      category,
      date
    }`
  );
  return articles;
}

const TrendingSidebar = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mt-2">
      <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-4">
        चर्चित खबरें -
      </h2>
      <ul className="divide-y divide-gray-200">
        {articles.map((article) => (
          <li key={article._id} className="py-3 h-[70px] flex items-start">
            <Link
              href={`/${article.category}/${article.slug.current}`}
              className="text-sm font-semibold text-gray-800 hover:text-gray-600 leading-snug line-clamp-2"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingSidebar;
