"use client";

import { useState, useRef, useEffect } from "react";

interface SmartImageProps {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Loads a real (remote) photo, and falls back to a bundled local image
 * only if the remote one fails to load — so visuals are never broken,
 * even offline.
 */
export default function SmartImage({ src, fallback, alt, className, style }: SmartImageProps) {
  const [current, setCurrent] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      // Clear previous inline styles to prevent accumulation
      imgRef.current.removeAttribute("style");
      if (style) {
        Object.assign(imgRef.current.style, style);
      }
    }
  }, [style]);

  return (
    <img
      ref={imgRef}
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
