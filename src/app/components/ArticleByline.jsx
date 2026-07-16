import Link from 'next/link';
import { imgUrl } from '../../../../sanity/lib/image'; // apna actual relative path daalo

export default function ArticleByline({ author, authorRef, publishedAt }) {
    const hasLinkedAuthor = Boolean(authorRef?.slug);

    return (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            {hasLinkedAuthor && authorRef.image && (
                <img
                    src={imgUrl(authorRef.image, 64)}
                    alt={authorRef.name}
                    className="w-8 h-8 rounded-full object-cover"
                />
            )}
            <span>
                Published by{' '}
                {hasLinkedAuthor ? (
                    <Link href={`/author/${authorRef.slug}`} className="font-semibold text-[#0a112d] hover:underline">
                        {authorRef.name}
                    </Link>
                ) : (
                    <span className="font-semibold text-[#0a112d]">{author}</span>
                )}
            </span>
            {publishedAt && (
                <>
                    <span>·</span>
                    <time dateTime={publishedAt}>
                        {new Date(publishedAt).toLocaleDateString('hi-IN', {
                            day: 'numeric', month: 'long', year: 'numeric',
                        })}
                    </time>
                </>
            )}
        </div>
    );
}