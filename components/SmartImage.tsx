"use client";

import { useState } from "react";

interface SmartImageProps {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
}

/**
 * Loads a real (remote) photo, and falls back to a bundled local image
 * only if the remote one fails to load — so visuals are never broken,
 * even offline.
 */
export default function SmartImage({ src, fallback, alt, className }: SmartImageProps) {
  const [current, setCurrent] = useState(src);

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
    />
  );
}
