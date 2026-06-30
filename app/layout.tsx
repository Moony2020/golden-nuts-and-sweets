import type { Metadata } from "next";
// Removed Google Fonts to fix build timeout

import { COMPANY } from "@/lib/config";
import "./globals.css";

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
    >
      <body>{children}</body>
    </html>
  );
}
