import React from 'react'

export default function ReadTimeBadge({ readTime }) {
  if (!readTime) return null

  return (
    <div className="flex flex-row items-center gap-1 text-[12px] md:text-sm text-green-700 font-medium">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      {readTime}
    </div>
  )
}