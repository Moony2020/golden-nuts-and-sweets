import type { Metadata } from "next";
import { Outfit, DM_Sans, Cairo, Playfair_Display } from "next/font/google";
import { COMPANY } from "@/lib/config";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: `${COMPANY.nameEn} | Premium Foodstuff Trading`,
  description:
    "Your trusted wholesale foodstuff supplier. We provide premium quality grains, nuts, spices, coffee, and food products to restaurants, hotels, and businesses across the region.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      suppressHydrationWarning
      className={`${outfit.variable} ${playfair.variable} ${dmSans.variable} ${cairo.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
