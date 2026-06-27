'use client'
import { useRef } from 'react'
import Image from 'next/image'
import TitleCard from './TitleCard'
import { imgUrl } from '../../../sanity/lib/image'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import {
  Carousel, CarouselContent, CarouselItem,
  CarouselNext, CarouselPrevious,
} from '@/components/ui/carousel'

export default function ImageSlider({ className, news2, image_className, dynamicBasis }) {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

  return (
    <div className={className}>
      <Carousel
        className="w-full m-auto mt-4"
        opts={{ align: 'center', loop: true }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="m-auto items-stretch">
          {news2.map((post, index) => (
            <CarouselItem className={dynamicBasis} key={index}>
              <Link href={`/${post.category}/${post.slug}`} className="h-full w-full flex flex-col" title={post?.heading}>
                <div className={image_className}>
                  <Image
                    src={imgUrl(post?.image, 320)}   // was full-size — now 320px
                    alt={post?.alt || 'news image'}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    className="rounded mb-2 absolute object-cover"
                  />
                </div>
                <div className="block w-full p-1 min-h-[90px] overflow-hidden flex-1">
                  <TitleCard
                    title={post?.heading}
                    className="font-bold text-sm line-clamp-4 text-ellipsis text-wrap overflow-hidden break-words"
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
