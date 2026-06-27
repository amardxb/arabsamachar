'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import BlurImage from './BlurImage'
import { imgUrl } from '../../../sanity/lib/image'
import DateTimeCard from './DateTimeCard'

export default function HeroCarousel({ slides, category }) {
    const [index, setIndex] = useState(0)
    const timerRef = useRef(null)

    // Auto-slide every 4 seconds
    useEffect(() => {
        if (!slides || slides.length === 0) return

        timerRef.current = setInterval(() => {
            setIndex((i) => (i + 1) % slides.length)
        }, 4000)

        return () => clearInterval(timerRef.current)
    }, [slides])

    if (!slides || slides.length === 0) return null

    const slide = slides[index]

    const goNext = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIndex((i) => (i + 1) % slides.length)
    }

    const goPrev = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIndex((i) => (i - 1 + slides.length) % slides.length)
    }

    return (
        <Link
            key={slide.slug}
            href={`/${category}/${slide.slug}`}
            title={slide?.heading}
            prefetch={false}
            className="relative block w-full aspect-video md:row-span-2 rounded-lg overflow-hidden border group"
        >
            {slide?.image && (
                <BlurImage
                    key={slide.slug}
                    src={imgUrl(slide.image, 960)}
                    alt={slide?.alt}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 33vw"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}
            {/* baaki sab same */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Prev / Next arrows */}
            <button
                onClick={goPrev}
                aria-label="Previous"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-7 h-7 flex items-center justify-center text-sm z-10"
            >
                ‹
            </button>
            <button
                onClick={goNext}
                aria-label="Next"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-7 h-7 flex items-center justify-center text-sm z-10"
            >
                ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-10 left-0 w-full flex justify-center gap-1 z-10">
                {slides.map((_, i) => (
                    <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/40'
                            }`}
                    />
                ))}
            </div>

            {/* Tag + heading */}
            <div className="absolute bottom-0 left-0 w-full p-3">
                <span className="text-white text-xs font-bold block mb-1">
                    {slide?.tag || 'समाचार'}
                </span>
                <p className="text-white font-bold text-md md:text-lg line-clamp-2">
                    {slide?.heading ?? 'क्षमा करें, डेटा लाने में असमर्थ'}
                </p>
            </div>

            <DateTimeCard
                className="absolute text-[10px] bottom-1 right-2 text-white/70"
                postTime={slide?.date}
            />
        </Link>
    )
}