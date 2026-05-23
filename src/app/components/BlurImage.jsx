"use client";

import Image from "next/image";
import { useState } from "react";

export default function BlurImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className = "",
}) {
  const fallback = "/fallback.png";

  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <Image
      src={imgSrc}
      alt={alt || "news image"}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className}`}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
}