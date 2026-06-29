import Image from "next/image";

export default function BlurImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className = "",
}) {
  return (
    <Image
      src={src || "/fallback.png"}
      alt={alt || "news image"}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className}`}
    />
  );
}
