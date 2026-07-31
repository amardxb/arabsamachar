import Link from "next/link";
import Image from "next/image";
import { imgUrl } from "../../../sanity/lib/image";

const SearchResultCard = ({ article }) => {
  return (
    <Link
      href={`/${article.category}/${article.slug.current}`}
      className="block py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
    >
      {/* Mobile layout: sirf title + image side by side */}
      <div className="flex sm:hidden gap-3 items-start">
        <h3 className="flex-1 text-sm  text-gray-900 leading-snug line-clamp-3">
          {article.title}
        </h3>
        {article.image && (
          <div className="relative w-28 aspect-video flex-shrink-0 rounded overflow-hidden">
            <Image
              src={imgUrl(article.image, 320)}
              alt={article.title}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Desktop layout: text block left, image right */}
      <div className="hidden sm:flex gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 leading-snug">
            {article.title}
          </h3>
          {article.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {article.description}
            </p>
          )}
          {article.readTime > 0 && (
            <span className="text-xs text-gray-400 mt-2 block">
              {article.readTime} मिनट पढ़ें
            </span>
          )}
        </div>

        {article.image && (
          <div className="relative w-40 aspect-video flex-shrink-0 rounded overflow-hidden">
            <Image
              src={imgUrl(article.image, 320)}
              alt={article.title}
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default SearchResultCard;
