import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SmallNewsCard(image_src, alt, className, title) {
  return (
    <Link href="/">
      <div className="w-[300px]   border-b h-24   flex flex-row justify-center items-center p-2 m-4">
        <div className="w-[100px] h-20 overflow-hidden relative">
          <Image
            src={image_src}
            alt={alt}
            layout="fill"
            objectFit="cover"
            className={
              "rounded-md  transition-transform duration-500 transform-gpu hover:scale-105"
            }
          />
        </div>
        <div className="w-2/3   h-full flex flex-col  justify-between ">
          <h3
            role="heading"
            className="text-[14px] pl-2 hover:text-[]"
            title={title}
          >{title}</h3>
        </div>
      </div>
    </Link>
  );
}
