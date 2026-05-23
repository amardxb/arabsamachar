import Image from "next/image";
import React from "react";

export default function NewsImageCard({ src, alt, className }) {
  return (
    <Image
      src={src}
      alt={alt}
      layout="fill"
      objectFit="cover"
      className={className}
    />
  );
}
