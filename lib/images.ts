/**
 * Central image map. `photo` is a real remote photo; `fallback` is a bundled
 * local SVG used automatically (via <SmartImage/>) if the photo fails to load.
 * To force a specific local photo, drop a file in /public/images and point
 * `photo` at it (e.g. "/images/photo-nuts.jpg").
 */
export const IMG = {
  nuts: {
    photo: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80",
    fallback: "/images/cat-nuts.svg",
  },
  coffee: {
    photo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    fallback: "/images/cat-coffee.svg",
  },
  grains: {
    photo: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=900&q=80",
    fallback: "/images/cat-grains.svg",
  },
  spices: {
    photo: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
    fallback: "/images/cat-spices.svg",
  },
  heroNuts: {
    photo: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=1100&q=80&hero=nuts",
    fallback: "/images/hero-nuts.svg",
  },
  about: {
    photo: "/images/about-hero.jpg",
    fallback: "/images/cat-grains.svg",
  },
  warehouse: {
    photo: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1100&q=80",
    fallback: "/images/cat-coffee.svg",
  },
  blog: [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80",
  ],
} as const;

export const BLOG_FALLBACKS = [
  "/images/cat-grains.svg",
  "/images/cat-coffee.svg",
  "/images/cat-spices.svg",
  "/images/cat-nuts.svg",
];
