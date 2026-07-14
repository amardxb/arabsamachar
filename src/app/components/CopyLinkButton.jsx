'use client'

import { useState } from 'react'

export default function CopyLinkButton({ url }) {
    const [copied, setCopied] = useState(false)

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Copy failed:', err)
        }
    }

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-800 border border-gray-300 rounded-full px-4 py-1.5 transition-colors duration-300 hover:bg-gray-800 hover:text-white"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342a3 3 0 100 2.316m0-2.316a3 3 0 010 2.316m0-2.316l6.632 3.316m-6.632-5.632l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            {copied ? 'लिंक कॉपी हुआ' : 'Share'}
        </button>
    )
}