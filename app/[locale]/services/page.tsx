import Link from "next/link";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES } from "@/lib/config";
import type { Language } from "@/lib/config";
import styles from "./services.module.css";

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

export default function ServicesPage({ params }: Props) {
  const locale = params.locale as Language;
  if (!Object.keys(SUPPORTED_LANGUAGES).includes(locale)) notFound();

  const services = [
    ["🏪", "توريد المواد الغذائية بالجملة", "Wholesale Foodstuff Supply", "تغطية مرنة لطلبات السوبرماركت والموزعين والمتاجر.", "Flexible supply for retailers, distributors, and wholesale buyers."],
    ["🍽️", "توريد المطاعم والفنادق", "Restaurant & Hotel Supply", "أصناف منتقاة بعقود توريد ثابتة وجودة مناسبة للتشغيل اليومي.", "Selected assortments with dependable contracts for daily operations."],
    ["☕", "توريد الكافيتريات والمقاهي", "Cafe & Cafeteria Supply", "قهوة، سكر، بهارات، مكسرات، وحلول تشغيل متكاملة.", "Coffee, sugar, spices, nuts, and complete support lines."],
    ["🌍", "الاستيراد والتصدير", "Import & Export", "تنسيق شحنات دولية مع متابعة الوثائق والتخليص والجداول الزمنية.", "International shipments with documentation, clearance, and schedule control."],
    ["🏷️", "العلامة التجارية الخاصة", "Private Label", "دعم التعبئة والعلامة والهوية التجارية للمنتجات المخصصة.", "Packaging, labeling, and private product identity support."],
    ["📦", "تنسيق الطلبات الكبيرة", "Bulk Order Coordination", "حلول مرنة للطلبيات الموسمية والطلبات المجدولة طويلة الأمد.", "Flexible handling for seasonal and scheduled bulk orders."],
  ];

  const sectors = [
    ["المطاعم", "Restaurants"],
    ["الفنادق", "Hotels"],
    ["السوبرماركت", "Supermarkets"],
    ["الضيافة والتموين", "Hospitality & Catering"],
    ["الموزعون", "Distributors"],
    ["المقاهي", "Cafes"],
  ];

  const process = [
    ["01", "استلام الطلب", "Receive Requirements"],
    ["02", "اختيار الأصناف", "Select Assortment"],
    ["03", "التعبئة والتجهيز", "Pack & Prepare"],
    ["04", "الشحن والتسليم", "Ship & Deliver"],
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>{label(locale, "خدماتنا", "Our Services")}</span>
          <h1 className={styles.title}>{label(locale, "حلول توريد غذائي متكاملة لأعمالك", "Integrated food supply solutions for your business")}</h1>
          <p className={styles.lead}>
            {label(locale, "من التوريد بالجملة إلى الاستيراد والتصدير والعلامة الخاصة، نقدّم خدمات تشغيلية وتجارية مصممة لقطاع الغذاء.", "From wholesale supply to import/export and private label, we provide commercial and operational services tailored to the food sector.")}
          </p>

          <div className={styles.heroStats}>
            <div><strong>6+</strong><span>{label(locale, "مسارات خدمة", "Service Tracks")}</span></div>
            <div><strong>50+</strong><span>{label(locale, "دولة توريد", "Supply Markets")}</span></div>
            <div><strong>10K+</strong><span>{label(locale, "عميل ومشتري", "Clients & Buyers")}</span></div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {services.map(([icon, arTitle, enTitle, arText, enText], index) => (
            <article key={index} className={styles.card}>
              <div className={styles.cardIcon}>{icon}</div>
              <h3>{label(locale, arTitle, enTitle)}</h3>
              <p>{label(locale, arText, enText)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.processBand}>
        <div className={styles.processInner}>
          {process.map(([num, arText, enText]) => (
            <div key={num} className={styles.processStep}>
              <strong>{num}</strong>
              <span>{label(locale, arText, enText)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>{label(locale, "القطاعات التي نخدمها", "Sectors We Serve")}</span>
          <h2 className={styles.sectionTitle}>{label(locale, "خدمات مخصصة لعملاء الجملة", "Tailored services for wholesale clients")}</h2>
        </div>

        <div className={styles.sectors}>
          {sectors.map(([arText, enText]) => (
            <div key={arText} className={styles.sectorChip}>{label(locale, arText, enText)}</div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>{label(locale, "تحتاج خدمة مخصصة؟", "Need a tailored service?")}</h2>
        <p>{label(locale, "تواصل مع فريقنا للحصول على عرض سعر مجاني وخطة توريد مناسبة لاحتياجاتك.", "Talk to our team for a free quote and a supply plan tailored to your needs.")}</p>
        <div className={styles.ctaActions}>
          <Link href={`/${locale}/request-quote`} className={styles.primaryBtn}>{label(locale, "اطلب عرض سعر", "Request a Quote")}</Link>
          <Link href={`/${locale}/contact`} className={styles.secondaryBtn}>{label(locale, "تواصل معنا", "Contact Us")}</Link>
        </div>
      </section>
    </div>
  );
}
