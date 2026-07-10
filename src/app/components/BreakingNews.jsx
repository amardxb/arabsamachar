import React from 'react';
import Link from "next/link";
import { TbArrowBigLeftLine, TbMail } from "react-icons/tb";

export default function BreakingNews({ text, href }) {
    const TextContent = (
        <span className="inline-flex items-center">
            <TbArrowBigLeftLine className="inline-block mr-6" size={20} />
            {text}
        </span>
    );

    return (
        <span className="py-1 flex flex-row items-center justify-between relative z-0 mt-12 lg:w-[90%] m-auto">
            <span className="w-full flex flex-row h-10 items-center bg-red-600 rounded pl-2 pr-2">
                <span className="border-r-2 border-white flex flex-row text-center justify-between text-white font-bold overflow-wrap pr-2 mr-2 text-xs md:text-lg md:text-nowrap pt-1">
                    ब्रेकिंग
                </span>

                <div className="flex-1 overflow-hidden">
                    <marquee className="text-white text-xs md:text-lg font-bold pt-4">
                        {href ? (
                            <Link href={href} className="inline-flex items-center">
                                {TextContent}
                            </Link>
                        ) : (
                            TextContent
                        )}
                    </marquee>
                </div>

                <Link
                    href="/newsletter"
                    className="shrink-0 ml-2 flex items-center justify-center md:border-2 border-white text-white rounded-sm font-bold whitespace-nowrap hover:bg-white hover:text-red-600 transition px-2 py-1 md:px-3 md:py-1.5 text-xs"
                >
                    <TbMail size={20} className="md:hidden" />
                    <span className="hidden md:inline">NEWSLETTER</span>
                </Link>
            </span>
        </span>
    );
}