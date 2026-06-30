import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES } from "@/lib/config";
import { getTranslation } from "@/lib/i18n";
import type { Language } from "@/lib/config";
import ProductsPageClient from "./ProductsPageClient";
import styles from "./products.module.css";

interface ProductsPageProps {
  params: {
    locale: string;
  };
}

function ProductsPageFallback({ locale }: { locale: Language }) {
  const t = getTranslation(locale);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t.products.title}</h1>
        <p className={styles.subtitle}>{t.products.search}</p>
      </div>
      <div className={styles.skeletonGrid}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.skeletonCard}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonSub} />
            <div className={styles.skeletonText} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage({ params }: ProductsPageProps) {
  const locale = params.locale as Language;

  if (!Object.keys(SUPPORTED_LANGUAGES).includes(locale)) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductsPageFallback locale={locale} />}>
      <ProductsPageClient locale={locale} />
    </Suspense>
  );
}
