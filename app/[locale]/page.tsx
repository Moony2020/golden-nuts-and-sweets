import Link from "next/link";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES, COMPANY } from "@/lib/config";
import { getTranslation } from "@/lib/i18n";
import type { Language } from "@/lib/config";
import SmartImage from "@/components/SmartImage";
import { IMG } from "@/lib/images";
import styles from "./home.module.css";

const CATEGORY_FALLBACK: Record<string, string> = {
  coffee: IMG.coffee.fallback,
  grains: IMG.grains.fallback,
  nuts: IMG.nuts.fallback,
  spices: IMG.spices.fallback,
};

interface Props {
  params: {
    locale: string;
  };
}

const CATEGORY_IMAGES = {
  coffee: IMG.coffee.photo,
  grains: IMG.grains.photo,
  nuts: IMG.nuts.photo,
  spices: IMG.spices.photo,
} as const;

const HERO_CATEGORIES = [
  { slug: "coffee", img: CATEGORY_IMAGES.coffee },
  { slug: "grains", img: CATEGORY_IMAGES.grains },
  { slug: "nuts", img: CATEGORY_IMAGES.nuts },
];

const FEATURED_CATEGORIES = [
  { slug: "nuts", img: CATEGORY_IMAGES.nuts },
  { slug: "spices", img: CATEGORY_IMAGES.spices },
  { slug: "coffee", img: CATEGORY_IMAGES.coffee },
];

function label(locale: Language, ar: string, en: string, extra?: { ur?: string; fr?: string; es?: string }) {
  if (locale === "ar") return ar;
  if (locale === "ur") return extra?.ur ?? ar;
  if (locale === "fr") return extra?.fr ?? en;
  if (locale === "es") return extra?.es ?? en;
  return en;
}

export default function HomePage({ params }: Props) {
  const locale = params.locale as Language;

  if (!Object.keys(SUPPORTED_LANGUAGES).includes(locale)) {
    notFound();
  }

  const t = getTranslation(locale);
  const heroLocale: Language = locale === "ar" ? "ar" : "en";
  const heroTranslation = getTranslation(heroLocale);
  const compactHeroText = locale !== "ar" && locale !== "en";
  const englishHeroText = heroLocale === "en";

  const catName = (slug: string) => {
    const map: Record<string, [string, string]> = {
      coffee: ["القهوة", "Coffee"],
      grains: ["الحبوب", "Grains"],
      nuts: ["المكسرات", "Nuts"],
      spices: ["البهارات", "Spices"],
    };
    const [ar, en] = map[slug] ?? [slug, slug];
    return label(locale, ar, en);
  };

  const features = [
    { icon: "🚚", text: label(locale, "شحن إلى جميع الدول", "Worldwide Shipping") },
    { icon: "📦", text: label(locale, "تغليف خاص بدون تلف", "Damage-Free Packing") },
    { icon: "🤝", text: label(locale, "توريد مباشر بلا وسطاء", "Direct Sourcing") },
    { icon: "🛒", text: label(locale, "طلب سهل ودفع آمن", "Easy & Secure Orders") },
    { icon: "🏆", text: label(locale, "أسعار تنافسية وجودة مضمونة", "Best Price & Quality") },
  ];

  return (
    <>
      <section className={styles.hero}>
        <SmartImage
          src="/images/hero-nuts.jpg"
          fallback={IMG.nuts.fallback}
          alt="Premium nuts selection"
          className={styles.heroBackground}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroTexture} />
        <div className={styles.heroInner}>
          <div className={`${styles.heroContent} ${compactHeroText ? styles.heroContentCompact : ""} ${styles.animateUp}`}>
            <div className={styles.heroMeta}>
              <span className={styles.heroMetaLabel}>
                {label(heroLocale, "دبي، الإمارات العربية المتحدة", "Dubai, United Arab Emirates")}
              </span>
              <span className={styles.heroMetaDivider} />
              <span className={styles.heroMetaText}>
                {heroLocale === "ar" ? COMPANY.nameAr : COMPANY.nameEn}
              </span>
            </div>

            <span className={styles.heroBadge}>
              ✦ {label(heroLocale, "جودة عالمية موثوقة", "Trusted Global Quality")}
            </span>

            <h1 className={`${styles.heroHeadline} ${compactHeroText ? styles.heroHeadlineCompact : ""} ${englishHeroText ? styles.heroHeadlineEnglish : ""}`}>
              {label(heroLocale, "شريكك الموثوق", "Your trusted")}{" "}
              <span className={styles.heroHighlight}>
                {label(heroLocale, "في تجارة المواد الغذائية بالجملة", "wholesale partner")}
              </span>
            </h1>

            <p className={`${styles.heroSubheadline} ${compactHeroText ? styles.heroSubheadlineCompact : ""}`}>
              {heroTranslation.hero.subheadline}
            </p>

            <div className={styles.heroCtas}>
              <Link href={`/${locale}/request-quote`} className={styles.ctaPrimary}>
                {label(heroLocale, "اطلب عرض سعر", "Request a Quote")}
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                className={styles.ctaWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                {heroTranslation.hero.contactWhatsApp}
              </a>
              <Link href={`/${locale}/products`} className={styles.ctaSecondary}>
                {heroTranslation.hero.browseProducts}
              </Link>
            </div>

            <div className={styles.heroCategories}>
              {HERO_CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${locale}/products?category=${c.slug}`}
                  className={styles.heroCategory}
                >
                  <SmartImage
                    src={c.img}
                    fallback={CATEGORY_FALLBACK[c.slug]}
                    alt={catName(c.slug)}
                    className={styles.heroCategoryImg}
                  />
                  <span className={styles.heroCategoryLabel}>{catName(c.slug)}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={styles.features}>
        <div className={styles.featuresInner}>
          {features.map((f, i) => (
            <div key={i} className={styles.feature}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <span className={styles.featureText}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      <section className={styles.categoriesSection}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionEyebrow}>
              {label(locale, "تشكيلتنا", "Our Selection")}
            </span>
            <h2 className={styles.sectionTitle}>{t.categories.title}</h2>
            <p className={styles.sectionSubtitle}>{t.categories.subtitle}</p>
          </div>
          <Link href={`/${locale}/products`} className={styles.sectionLink}>
            {label(locale, "عرض كل المنتجات", "View All Products")} <span>←</span>
          </Link>
        </div>

        <div className={styles.categoriesGrid}>
          {FEATURED_CATEGORIES.map((cat) => (
            <div key={cat.slug} className={styles.categoryCard}>
              <div className={styles.categoryImageContainer}>
                <SmartImage
                  src={cat.img}
                  fallback={CATEGORY_FALLBACK[cat.slug]}
                  alt={catName(cat.slug)}
                  className={styles.categoryImage}
                />
                <div className={styles.categoryImageOverlay}>
                  <h3 className={styles.categoryTitle}>{catName(cat.slug)}</h3>
                </div>
              </div>
              <div className={styles.categoryContent}>
                <p className={styles.categoryDescription}>
                  {label(
                    locale,
                    "تشكيلة فاخرة مختارة بعناية من أجود المصادر العالمية.",
                    "A premium selection, carefully sourced from the finest origins worldwide."
                  )}
                </p>
                <Link href={`/${locale}/products?category=${cat.slug}`} className={styles.categoryAction}>
                  {label(locale, "تصفح المنتجات", "Browse Products")} <span>←</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>👥</div>
            <div className={styles.statNumber}>10K+</div>
            <div className={styles.statLabel}>{t.stats.customers}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⭐</div>
            <div className={styles.statNumber}>88</div>
            <div className={styles.statLabel}>{t.stats.experience}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📦</div>
            <div className={styles.statNumber}>1K+</div>
            <div className={styles.statLabel}>{t.stats.products}</div>
          </div>
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <h2 className={styles.ctaBannerTitle}>
          {label(
            locale,
            "لطلب الجملة أو استشارة مجانية، تواصل معنا الآن!",
            "For wholesale orders or a free consultation, contact us now!"
          )}
        </h2>
        <a href={`tel:${COMPANY.phone}`} className={styles.ctaPhone}>
          <span>📞</span> {COMPANY.phone}
        </a>
      </section>
    </>
  );
}
