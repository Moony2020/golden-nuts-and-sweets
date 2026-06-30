import Link from "next/link";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES, categoryLabel } from "@/lib/config";
import { getProductBySlug } from "@/lib/data";
import { whatsappLink } from "@/lib/whatsapp";
import { getLocalizedProduct } from "@/lib/productTranslations";
import type { Language } from "@/lib/config";
import styles from "./details.module.css";

interface Props {
  params: { locale: string; slug: string };
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

export default async function ProductDetailsPage({ params }: Props) {
  const locale = params.locale as Language;
  if (!Object.keys(SUPPORTED_LANGUAGES).includes(locale)) notFound();

  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const localProd = getLocalizedProduct(product, locale);

  const waMsg = label(
    locale,
    `مرحباً، أرغب بالاستفسار عن: ${localProd.name}`,
    `Hello, I'd like to inquire about: ${localProd.name}`
  );

  return (
    <div className={styles.wrap}>
      <Link href={`/${locale}/products`} className={styles.back}>
        ← {label(locale, "العودة للمنتجات", "Back to Products")}
      </Link>

      <div className={styles.grid}>
        <div className={styles.imageWrap}>
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image} alt={localProd.name} className={styles.image} />
          ) : (
            <div className={styles.placeholder}>{label(locale, "صورة المنتج", "Product image")}</div>
          )}
          {!product.available && (
            <span className={styles.badge}>{label(locale, "غير متوفّر حالياً", "Currently unavailable")}</span>
          )}
        </div>

        <div className={styles.info}>
          <span className={styles.category}>{categoryLabel(product.category, locale)}</span>
          <h1 className={styles.name}>{localProd.name}</h1>
          {localProd.description && <p className={styles.desc}>{localProd.description}</p>}

          <div className={styles.specs}>
            {localProd.originCountry && (
              <div className={styles.spec}>
                <span className={styles.specLabel}>{label(locale, "بلد المنشأ", "Origin")}</span>
                <span className={styles.specValue}>{localProd.originCountry}</span>
              </div>
            )}
            {localProd.packaging && (
              <div className={styles.spec}>
                <span className={styles.specLabel}>{label(locale, "التعبئة", "Packaging")}</span>
                <span className={styles.specValue}>{localProd.packaging}</span>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <Link
              href={`/${locale}/request-quote?product=${encodeURIComponent(localProd.name)}&category=${product.category}`}
              className={styles.quoteBtn}
            >
              {label(locale, "اطلب عرض سعر", "Request a Quote")}
            </Link>
            <a
              href={whatsappLink(waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waBtn}
            >
              💬 {label(locale, "استفسار عبر واتساب", "Ask on WhatsApp")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
