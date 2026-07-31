"use client";
import { useRouter } from "next/navigation";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

const SearchPagination = ({ currentPage, totalPages, query, sort }) => {
  const router = useRouter();

  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    const params = new URLSearchParams({ q: query, sort, page: page.toString() });
    router.push(`/search?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  // Simple window: current page ke aas-paas 2 pages dikhao, + first/last
  const pages = [];
  const windowSize = 2;
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - windowSize && i <= currentPage + windowSize)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  const btnBase =
    "w-9 h-9 flex items-center justify-center rounded border text-sm flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100";

  return (
    <div className="flex justify-center items-center gap-1.5 mt-8 flex-wrap">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="पिछला पेज"
        className={btnBase}
      >
        <AiOutlineDoubleLeft size={16} />
      </button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={`dots-${idx}`} className="w-9 h-9 flex items-center justify-center text-gray-400">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`${btnBase} ${p === currentPage
                ? "bg-[#0a112d] text-white border-[#0a112d]"
                : ""
              }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="अगला पेज"
        className={btnBase}
      >
        <AiOutlineDoubleRight size={16} />
      </button>
    </div>
  );
};

export default SearchPagination;
