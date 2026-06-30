import Link from "next/link";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES, CATEGORIES } from "@/lib/config";
import type { Language } from "@/lib/config";
import styles from "./catalog.module.css";

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

export default function CatalogPage({ params }: Props) {
  const locale = params.locale as Language;
  if (!Object.keys(SUPPORTED_LANGUAGES).includes(locale)) notFound();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroMeta}>
            <span className={styles.heroLine} />
            <span>{label(locale, "01 - الكتالوج", "01 - Catalog")}</span>
          </div>
          <div className={styles.heroGrid}>
            <div className={styles.heroStats}>
              <div><strong>+320</strong><span>{label(locale, "منتج", "Products")}</span></div>
              <div><strong>14</strong><span>{label(locale, "فئة", "Categories")}</span></div>
              <div><strong>PDF</strong><span>{label(locale, "تحميل مباشر", "Direct Download")}</span></div>
            </div>
            <div className={styles.heroCopy}>
              <h1 className={styles.title}>{label(locale, "كتالوج المنتجات", "Product Catalog")}</h1>
              <p className={styles.lead}>{label(locale, "تصفح فئات المنتجات وحمّل الكتالوج الكامل أو انتقل مباشرة إلى المنتجات التفصيلية.", "Browse product categories and download the complete catalog or jump directly to detailed products.")}</p>
              <div className={styles.actions}>
                <a href="/api/catalog/download" className={styles.primaryBtn}>{label(locale, "تحميل الكتالوج (PDF)", "Download Catalog (PDF)")}</a>
                <Link href={`/${locale}/products`} className={styles.outlineBtn}>{label(locale, "تصفح المنتجات", "Browse Products")}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>{label(locale, "تصنيفات الكتالوج", "Catalog Categories")}</span>
          <h2 className={styles.sectionTitle}>{label(locale, "الوصول السريع إلى أصنافنا", "Quick access to our assortments")}</h2>
        </div>

        <div className={styles.grid}>
          {CATEGORIES.map((category, index) => (
            <Link key={category.slug} href={`/${locale}/products?category=${category.slug}`} className={styles.card}>
              <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
              <h3 className={styles.cardTitle}>{locale === "ar" ? category.ar : locale === "ur" ? category.ur : locale === "fr" ? category.fr : locale === "es" ? category.es : category.en}</h3>
              <p className={styles.cardText}>{label(locale, "اعرض منتجات هذا التصنيف وانتقل إلى التفاصيل الكاملة.", "View products in this category and jump to full details.")}</p>
              <span className={styles.cardAction}>{label(locale, "عرض المنتجات", "Browse Products")} &#8592;</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.notes}>
        <div className={styles.noteCard}>
          <h3>{label(locale, "ملاحظة مهمة", "Important Note")}</h3>
          <p>{label(locale, "يفتح الكتالوج كصفحة جاهزة للطباعة. يمكنك حفظه مباشرة كملف PDF أو مشاركته مع فريق المشتريات.", "The catalog opens as a print-ready page. You can save it directly as a PDF or share it with your procurement team.")}</p>
        </div>
      </section>
    </div>
  );
}
