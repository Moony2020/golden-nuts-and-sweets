"use client";

import { useEffect } from "react";
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

  // Scroll Reveal Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const revealElements = document.querySelectorAll(`.${styles.reveal}`);
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [locale]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={`${styles.heroMeta} ${styles.reveal} ${styles.revealUp}`}>
            <span>{label(locale, "الكتالوج", "Catalog")}</span>
          </div>
          <div className={styles.heroGrid}>
            <div className={`${styles.heroStats} ${styles.reveal} ${styles.revealUp} ${styles.stagger1}`}>
              <div><strong>+320</strong><span>{label(locale, "منتج", "Products")}</span></div>
              <div><strong>14</strong><span>{label(locale, "فئة", "Categories")}</span></div>
              <div><strong>PDF</strong><span>{label(locale, "تحميل مباشر", "Direct Download")}</span></div>
            </div>
            <div className={`${styles.heroCopy} ${styles.reveal} ${styles.revealUp} ${styles.stagger2}`}>
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
        <div className={`${styles.sectionHeader} ${styles.reveal} ${styles.revealUp}`}>
          <span className={styles.eyebrow}>{label(locale, "تصنيفات الكتالوج", "Catalog Categories")}</span>
          <h2 className={styles.sectionTitle}>{label(locale, "الوصول السريع إلى أصنافنا", "Quick access to our assortments")}</h2>
        </div>

        <div className={styles.grid}>
          {CATEGORIES.map((category, index) => {
            const isEven = index % 2 === 0;
            return (
              <Link
                key={category.slug}
                href={`/${locale}/products?category=${category.slug}`}
                className={`${styles.card} ${styles.reveal} ${isEven ? styles.revealLeft : styles.revealRight} ${styles["stagger" + ((index % 4) + 1)]}`}
              >
                <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className={styles.cardTitle}>{locale === "ar" ? category.ar : locale === "ur" ? category.ur : locale === "fr" ? category.fr : locale === "es" ? category.es : category.en}</h3>
                <p className={styles.cardText}>{label(locale, "اعرض منتجات هذا التصنيف وانتقل إلى التفاصيل الكاملة.", "View products in this category and jump to full details.")}</p>
                <span className={styles.cardAction}>{label(locale, "عرض المنتجات", "Browse Products")} &#8592;</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={`${styles.notes} ${styles.reveal} ${styles.revealScale}`}>
        <div className={styles.noteCard}>
          <h3>{label(locale, "ملاحظة مهمة", "Important Note")}</h3>
          <p>{label(locale, "يفتح الكتالوج كصفحة جاهزة للطباعة. يمكنك حفظه مباشرة كملف PDF أو مشاركته مع فريق المشتريات.", "The catalog opens as a print-ready page. You can save it directly as a PDF or share it with your procurement team.")}</p>
        </div>
      </section>
    </div>
  );
}
