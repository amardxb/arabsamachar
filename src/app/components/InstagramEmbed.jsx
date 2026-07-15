// components/InstagramEmbed.jsx
'use client'

import { useEffect, useRef, useState } from 'react'

export default function InstagramEmbed({ value }) {
    const { url } = value
    const containerRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const hasProcessed = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '200px' }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!isVisible || hasProcessed.current) return

        let attempts = 0
        let cancelled = false

        const tryProcess = () => {
            if (cancelled || hasProcessed.current) return

            if (window.instgrm?.Embeds) {
                window.instgrm.Embeds.process()
                hasProcessed.current = true
            } else if (attempts < 20) {
                attempts++
                setTimeout(tryProcess, 300)
            }
        }

        tryProcess()

        return () => {
            cancelled = true
        }
    }, [isVisible])

    if (!url) return null

    const embedHtml = `
        <blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14" style="max-width:540px; width:100%; min-width:326px;"></blockquote>
    `

    return (
        <div className="my-6 flex justify-center min-h-[400px]">
            <div ref={containerRef} className="w-full max-w-[540px]">
                {isVisible ? (
                    <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
                ) : (
                    <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-md flex items-center justify-center text-sm text-gray-400">
                        Instagram पोस्ट लोड हो रहा है...
                    </div>
                )}
            </div>
        </div>
    )
}