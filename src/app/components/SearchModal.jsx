"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef(null);

  // Focus input automatically when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close modal on Escape key + lock background scroll
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
      setQuery("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32">
      {/* Fading background overlay */}
      <div
        className="fixed inset-0 bg-black/70 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Search box */}
      <div className="relative z-10 w-[95%] max-w-[800px] mx-auto bg-white rounded-md shadow-lg p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-gray-200 pb-2">
          <AiOutlineSearch size={22} className="text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="खबर खोजें..."
            className="w-full outline-none text-base text-gray-800"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="बंद करें"
            className="flex-shrink-0"
          >
            <AiOutlineClose size={22} className="text-gray-500 hover:text-gray-800" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
