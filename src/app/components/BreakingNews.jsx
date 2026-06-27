import React from 'react';
import { TbArrowBigLeftLine } from "react-icons/tb";

export default function BreakingNews({text}) {
    return (
        <div className="  py-1 flex flex-row items-center justify-between relative z-0 mt-12 lg:w-[90%] m-auto  ">
            <div className='w-full flex flex-row h-10 items-center bg-red-600 rounded  pl-2 pr-2'>
                <span className='border-r-2 border-white flex flex-row text-center justify-between text-white font-bold text-[12px] overflow-wrap pr-2 mr-2 md:text-lg md:text-nowrap'> ब्रेकिंग न्यूज़ </span>
                <marquee className="text-white text-lg font-bold"><TbArrowBigLeftLine className='inline-block mr-6' size={25}/>{text}</marquee>
            </div>
        </div>
    );
}