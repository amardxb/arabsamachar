import React from "react";

export default function SuggestionCard({ content,className}) {
  return (
    <div className={className}>
      <div className="flex justify-center items-center w-auto p-2 overflow-hidden relative text-xl font-bold ">
        {content}
      </div>
      <div className="flex flex-grow relative">
        <span className="absolute left-0 right-0 bg-[#c4132a] h-[2px] top-1/2  bg-opacity-100"></span>
      </div>
    </div>
  );
}

 
