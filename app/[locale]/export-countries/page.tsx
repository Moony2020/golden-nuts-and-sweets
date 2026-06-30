import Link from "next/link";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES } from "@/lib/config";
import type { Language } from "@/lib/config";
import styles from "../shared.module.css";
import local from "./countries.module.css";

interface Props {
  params: { locale: string };
}

function label(
  locale: Language,
  ar: string,
  en: string,
  extra?: { ur?: string; fr?: string; es?: string }
) {
  if (locale === "ar") return ar;
  if (locale === "ur") return extra?.ur ?? ar;
  if (locale === "fr") return extra?.fr ?? en;
  if (locale === "es") return extra?.es ?? en;
  return en;
}

const COUNTRIES: { flag: string; ar: string; en: string }[] = [
  { flag: "🇦🇪", ar: "الإمارات", en: "UAE" },
  { flag: "🇸🇦", ar: "السعودية", en: "Saudi Arabia" },
  { flag: "🇴🇲", ar: "عُمان", en: "Oman" },
  { flag: "🇶🇦", ar: "قطر", en: "Qatar" },
  { flag: "🇰🇼", ar: "الكويت", en: "Kuwait" },
  { flag: "🇧🇭", ar: "البحرين", en: "Bahrain" },
  { flag: "🇹🇷", ar: "تركيا", en: "Turkey" },
  { flag: "🇮🇳", ar: "الهند", en: "India" },
  { flag: "🇵🇰", ar: "باكستان", en: "Pakistan" },
  { flag: "🇪🇸", ar: "إسبانيا", en: "Spain" },
  { flag: "🇫🇷", ar: "فرنسا", en: "France" },
  { flag: "🇾🇪", ar: "اليمن", en: "Yemen" },
  { flag: "🇪🇬", ar: "مصر", en: "Egypt" },
  { flag: "🇯🇴", ar: "الأردن", en: "Jordan" },
  { flag: "🇨🇳", ar: "الصين", en: "China" },
];

export default function ExportCountriesPage({ params }: Props) {
  const locale = params.locale as Language;
  if (!Object.keys(SUPPORTED_LANGUAGES).includes(locale)) notFound();

  return (
    <div className={styles.wrap}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>{label(locale, "حضور عالمي", "Global Reach")}</span>
        <h1 className={styles.title}>
          {label(locale, "دول نستورد منها ونصدّر إليها", "Countries we import from & export to")}
        </h1>
        <p className={styles.lead}>
          {label(
            locale,
            "شبكة توريد عالمية تربطك بأجود المنتجات من 15 دولة حول العالم.",
            "A global supply network connecting you to premium products from 15 countries worldwide."
          )}
        </p>
      </section>

      <div className={local.countriesGrid}>
        {COUNTRIES.map((c) => (
          <div key={c.en} className={local.countryCard}>
            <span className={local.flag}>{c.flag}</span>
            <span className={local.countryName}>{label(locale, c.ar, c.en)}</span>
          </div>
        ))}
      </div>

      <section className={styles.cta}>
        <h2>{label(locale, "تبحث عن منتج من دولة معيّنة؟", "Looking for a product from a specific country?")}</h2>
        <p>{label(locale, "نوفّره لك عبر شبكتنا العالمية.", "We'll source it through our global network.")}</p>
        <Link href={`/${locale}/contact`} className={styles.ctaBtn}>
          {label(locale, "تواصل معنا", "Contact Us")} →
        </Link>
      </section>
    </div>
  );
}
