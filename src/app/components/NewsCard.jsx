import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NewsCard({slug,alt,title,date,ImageclassName }) {
  return (
    <Link href={slug}>
      <div className="w-[485px] border-b h-24  min-w-1/2 flex flex-row justify-center items-center p-2 m-4">
        <div className="w-1/3 h-full overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/17042340/pexels-photo-17042340/free-photo-of-brunette-with-flower-in-mouth.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt={alt}
            width={120}
            height={60}
            className={ImageclassName}
            title={title}
          />
        </div>
        <div className="w-2/3   h-full flex flex-col  justify-between ">
          <h3 role="heading" className="text-[18px] hover:text-[]">
           {title}
          </h3>          
          <span className="text-[#7b7b7b] text-[12px]">
            {date}
          </span>
        </div>
      </div>
    </Link>
  );
}
