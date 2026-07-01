import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPANY, SUPPORTED_LANGUAGES } from "@/lib/config";
import { getDirection } from "@/lib/i18n";
import type { Language } from "@/lib/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TopLoader from "@/components/TopLoader";
import "../globals.css";

export const metadata: Metadata = {
  title: `${COMPANY.nameEn} | Premium Foodstuff Trading`,
  description:
    "Your trusted wholesale foodstuff supplier. Premium grains, nuts, spices, coffee, and food products.",
};

interface Props {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function LocaleLayout({ children, params }: Props) {
  const locale = params.locale as Language;

  if (!Object.keys(SUPPORTED_LANGUAGES).includes(locale)) {
    notFound();
  }

  const direction = getDirection(locale);

  return (
    <div lang={locale} dir={direction}>
      <TopLoader />
      <Navbar locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}
