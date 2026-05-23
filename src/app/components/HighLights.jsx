import React from 'react';
import { TbNorthStar } from "react-icons/tb";

export default function HighLights({ highlights_data, className }) {
  // Check if highlights_data exists and is not empty
  if (!highlights_data || !Array.isArray(highlights_data) || highlights_data.length === 0) {
    // If data is not available, return null
    return null;
  }
  return (    
    <div className={className}>
      <div className="transform skew-x-12 bg-red-600 h-8 text-center w-auto top-[-16px] left-[-10px]  text-lg  absolute p-1 text-white font-bold">
        <span className='p-2 '>हाइलाइट्स</span>
      </div>
      <ul className='leading-10 font-bold'>
        {highlights_data.map((data, index) => (
          <li key={index} className="flex items-start gap-3">
  <TbNorthStar
    className="mt-2 flex-shrink-0 text-red-600"
    size={15}
  />  
  <span className="leading-7">
    {data}
  </span>
</li>
         
        ))}
      </ul>
    </div>
  );
}


