"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES, CATEGORIES } from "@/lib/config";
import type { Language } from "@/lib/config";
import { getLocalizedProduct } from "@/lib/productTranslations";
import styles from "./search.module.css";

interface Props {
  params: { locale: string };
}

interface ProductType {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDescription?: string;
  image?: string;
  originCountry?: string;
  packaging?: string;
}

function label(locale: Language, ar: string, en: string) {
  return locale === "ar" || locale === "ur" ? ar : en;
}

export default function SearchPage({ params }: Props) {
  const locale = params.locale as Language;
  if (!Object.keys(SUPPORTED_LANGUAGES).includes(locale)) notFound();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const suggestions = [
    { ar: "كاجو", en: "Cashew" },
    { ar: "بهارات", en: "Spices" },
    { ar: "قهوة", en: "Coffee" },
    { ar: "متة", en: "Mate" },
    { ar: "حاويات", en: "Containers" }
  ];

  const comma = locale === "ar" || locale === "ur" ? "، " : ", ";
  const trailing = "...";

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!query) {
      setFilteredProducts([]);
      return;
    }

    const q = query.toLowerCase();
    const matches = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.shortDescription || "").toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
    setFilteredProducts(matches);
  }, [query, products]);

  function getCategoryLabel(catSlug: string) {
    const found = CATEGORIES.find((c) => c.slug === catSlug);
    if (!found) return catSlug;
    return label(locale, found.ar, found.en);
  }

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>{label(locale, "البحث في الموقع", "Search the Site")}</h1>
        </div>
      </section>

      {/* SEARCH BOX — white card overlapping hero */}
      <section className={styles.searchSection}>
        <div className={styles.searchBox}>
          <div className={styles.inputWrapper}>
            <span className={styles.searchIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              autoFocus
              className={styles.searchInput}
              placeholder={label(locale, "ابحث عن منتج، مقال، أو خدمة...", "Search for a product, article, or service...")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className={styles.subtext}>
            <span>{label(locale, "ابحث عن: ", "Search for: ")}</span>
            <span className={styles.suggestions}>
              {suggestions.map((s, idx) => (
                <span key={idx}>
                  <button
                    onClick={() => setQuery(label(locale, s.ar, s.en))}
                    className={styles.suggestionLink}
                  >
                    {label(locale, s.ar, s.en)}
                  </button>
                  {idx < suggestions.length - 1 ? comma : trailing}
                </span>
              ))}
            </span>
          </div>
        </div>
      </section>

      {/* RESULTS DISPLAY — only show when query is active */}
      {query && (
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>
              {label(locale, `نتائج البحث عن "${query}" (${filteredProducts.length})`, `Search results for "${query}" (${filteredProducts.length})`)}
            </h2>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              {label(locale, "جاري البحث...", "Searching...")}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {filteredProducts.map((product) => {
                const localProd = getLocalizedProduct(product, locale);
                return (
                  <article key={product._id} className={styles.productCard}>
                    <div className={styles.productImageContainer}>
                      <img
                        src={product.image || "/images/hero-nuts.jpg"}
                        alt={localProd.name}
                        className={styles.productImage}
                      />
                      <span className={styles.productCategory}>{getCategoryLabel(product.category)}</span>
                    </div>

                    <div className={styles.productBody}>
                      <h3 className={styles.productName}>{localProd.name}</h3>
                      <p className={styles.productDescription}>{localProd.shortDescription || localProd.description}</p>

                      <div className={styles.productMeta}>
                        <span className={styles.productPackaging}>{localProd.packaging || label(locale, "تعبئة مرنة", "Flexible packaging")}</span>
                        <Link href={`/${locale}/products/${product.slug}`} className={styles.productCta}>
                          {label(locale, "عرض التفاصيل", "View Details")} &#8592;
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className={styles.noProducts}>
              <h3 className={styles.noProductsTitle}>{label(locale, "لم نجد نتائج مطابقة", "No matching results found")}</h3>
              <p className={styles.noProductsText}>
                {label(locale, "جرّب استخدام كلمات أخرى أو تواصل معنا لمساعدتك.", "Try using other words or contact us for help.")}
              </p>
              <Link href={`/${locale}/contact`} className={styles.noProductsAction}>
                {label(locale, "تواصل معنا", "Contact Us")}
              </Link>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
