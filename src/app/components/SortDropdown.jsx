"use client";
import { useRouter } from "next/navigation";

const SortDropdown = ({ currentSort, query }) => {
  const router = useRouter();

  const handleChange = (e) => {
    const params = new URLSearchParams({ q: query, sort: e.target.value, page: "1" });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <label htmlFor="sort" className="text-gray-500">
        क्रमबद्ध करें:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleChange}
        className="border border-gray-300 rounded px-2 py-1 outline-none"
      >
        <option value="score">प्रासंगिकता</option>
        <option value="newest">नवीनतम</option>
      </select>
    </div>
  );
};

export default SortDropdown;
