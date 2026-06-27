// 'use client'
// import React from 'react';
// import Link from 'next/link';
// import Autoplay from "embla-carousel-autoplay";
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
// } from "@/components/ui/carousel"

// export default function HeroCarousel({ carousel, url }) {
//     const plugin = React.useRef(
//         Autoplay({ delay: 8000, stopOnInteraction: true })
//     )
//     return (
//         <>
//         <div className="hidden lg:flex flex-col items-center">
//             {carousel.length > 0 && (
//                 <Carousel className="bg-[#0a112d] text-white rounded h-[100px] md:h-[150px] text-center flex justify-center items-center md:pl-4 md:pr-4 mt-4 mb-4 w-[95%]"
//                     opts={{
//                         align: "center",
//                         loop: true,
//                         pagination: true,
//                     }}
//                     plugins={[plugin.current]}
//                     onMouseEnter={plugin.current.stop}
//                     onMouseLeave={plugin.current.reset}>
//                     <CarouselContent className=" ">
//                         {carousel.map((hero, index) => (
//                             <CarouselItem className="text-sm md:basis-1/1 lg:basis-1/1 md:text-3xl font-bold text-wrap line-clamp-2 break-words overflow-hidden p-4" key={index} >
//                                 <Link href={`/${hero.category}/${hero.slug}`}    className='hover:text-slate-200'>{hero?.heading}</Link>
//                             </CarouselItem>
//                         ))}
//                     </CarouselContent>
//                     <CarouselPrevious />
//                     <CarouselNext />
//                 </Carousel>
//             )}
//             </div>
//         </>
//     );
// }