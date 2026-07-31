"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBarInline = ({ defaultValue = "" }) => {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-stretch gap-1">
      {/* Input box - hamesha visible, width flexible */}
      <div className="flex-1 flex items-center gap-3 border border-gray-300 rounded-lg px-5 py-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="खबर खोजें..."
          className="w-full outline-none text-base"
        />
        {/* Icon-in-input: sirf mobile par (md se neeche), kyunki md+ par alag button hai */}
        <button type="submit" aria-label="खोजें" className="md:hidden flex-shrink-0">
          <AiOutlineSearch size={22} className="text-gray-500" />
        </button>
      </div>

      {/* Alag "खोजें" button - sirf md (768px) aur usse upar */}
      <button
        type="submit"
        className="hidden md:flex items-center justify-center px-16 rounded-lg bg-[#0a112d] text-white font-semibold text-md hover:bg-[#0a112d]/90 transition-colors flex-shrink-0"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBarInline;
