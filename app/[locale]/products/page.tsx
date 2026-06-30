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
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        {locale === "ar" || locale === "ur" ? "جاري التحميل..." : "Loading..."}
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
