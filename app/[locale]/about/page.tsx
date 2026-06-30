"use client";

import { useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SUPPORTED_LANGUAGES, COMPANY } from "@/lib/config";
import type { Language } from "@/lib/config";
import SmartImage from "@/components/SmartImage";
import { IMG } from "@/lib/images";
import styles from "./about.module.css";

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

export default function AboutPage({ params }: Props) {
  const locale = params.locale as Language;
  if (!Object.keys(SUPPORTED_LANGUAGES).includes(locale)) notFound();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.itemVisible);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    const items = document.querySelectorAll(`.${styles.timelineItem}`);
    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, [locale]);

  const stats = [
    ["1937", "عام التأسيس", "Founded"],
    ["85+", "سنة من الخبرة التراكمية", "Years of expertise"],
    ["10,000+", "عميل موثوق", "Trusted clients"],
    ["1,000+", "منتج نشط", "Active products"],
    ["4", "مستودعات متخصصة", "Specialized warehouses"],
    ["50+", "دولة في شبكتنا", "Countries in our network"],
  ];

  const pillars = [
    [
      "الثقة والمصداقية",
      "Trust & Reliability",
      "كل صفقة تُبنى على الشفافية، والاتساق، والتسليم الموثوق.",
      "Every deal is built on transparency, consistency, and dependable delivery."
    ],
    [
      "السرعة والكفاءة",
      "Speed & Efficiency",
      "تنفيذ سريع، وتنسيق واضح، وتداول آمن لجميع الشحنات.",
      "Fast execution, clear coordination, and safe handling across every shipment."
    ],
    [
      "الجودة أولاً",
      "Quality First",
      "نحن نقبل فقط المنتجات التي يتم الحصول عليها من موردين يستوفون معاييرنا الداخلية.",
      "We only accept products sourced from suppliers that meet our internal standards."
    ],
    [
      "الشراكة العالمية",
      "Global Partnership",
      "شبكة إقليمية موثوقة متصلة بأكثر من 50 سوقاً للتوريد والتجارة.",
      "A trusted regional network connected to more than 50 sourcing and trading markets."
    ],
  ];

  const leaders = [
    [
      "👔",
      "المدير العام - مدير مؤسس",
      "Founder & General Manager",
      "الرؤية الاستراتيجية والقيادة التنفيذية للمجموعة",
      "Strategic vision and executive leadership of the group",
      "+50 سنة خبرة",
      "+50 Years Exp"
    ],
    [
      "📈",
      "المدير التنفيذي - المبيعات والتسويق",
      "Executive Director - Sales & Marketing",
      "تطوير الأعمال والعملاء والشراكات الاستراتيجية",
      "Business development, client relations & strategic partnerships",
      "+15 سنة خبرة",
      "+15 Years Exp"
    ],
    [
      "🏅",
      "مدير المشتريات وإدارة الجودة",
      "Purchasing & Quality Manager",
      "ضمان الجودة وسلامة الغذاء وسلاسل التوريد",
      "Quality assurance, food safety & supply chain management",
      "+5 سنوات خبرة",
      "+5 Years Exp"
    ],
    [
      "💼",
      "المدير المالي والعمليات اللوجستية",
      "Financial Director & Logistics",
      "الإدارة المالية والشحن والتخليص الجمركي",
      "Financial management, shipping & customs clearance operations",
      "+15 سنة خبرة",
      "+15 Years Exp"
    ],
    [
      "⚙️",
      "مدير العمليات الداخلية",
      "Internal Operations Manager",
      "إدارة المستودعات والعمليات اليومية",
      "Warehouse management and daily internal operations",
      "+25 سنة خبرة",
      "+25 Years Exp"
    ],
  ];

  const milestones = [
    [
      "1937",
      "تأسيس المجموعة التجارية العائلية - بداية مسيرة التجارة الغذائية",
      "Establishment of the family business group - Beginning of foodstuff trading"
    ],
    [
      "1998",
      "أول صفقة تصدير دولية إلى دول الخليج العربي وتوسيع الشبكة",
      "First international export deal to GCC countries and network expansion"
    ],
    [
      "2002",
      "افتتاح مستودع مبرد ومنشأة تعبئة وتغليف متخصصة",
      "Opening a refrigerated warehouse and a specialized packing facility"
    ],
    [
      "2012",
      "التأسيس الرسمي في الإمارات العربية المتحدة - رويال هارفست للمواد الغذائية ذ.م.م",
      "Official incorporation in the UAE - Royal Harvest Foodstuff LLC"
    ],
    [
      "2015",
      "تجاوز 5,000 عميل نشط وفتح خطوط شحن مباشرة مع 15 دولة",
      "Exceeded 5,000 active clients and opened direct shipping links with 15 countries"
    ],
    [
      "2026",
      "شبكة تشغيل قوية تخدم المطاعم والفنادق والسوبرماركت والموزعين بالجملة",
      "A robust operating network serving restaurants, hotels, supermarkets, and wholesale distributors"
    ],
  ];

  const standards = [
    [
      "🏛️",
      "بلدية دبي",
      "Dubai Municipality",
      "معتمد من بلدية دبي في جودة الغذاء والسلامة",
      "Approved by Dubai Municipality for food safety and quality standards"
    ],
    [
      "🧾",
      "جمارك دبي",
      "Dubai Customs",
      "معتمد من دائرة الجمارك والموانئ في الإمارات",
      "Approved by the Customs and Ports Authority in the UAE"
    ],
    [
      "⚓",
      "موانئ دبي العالمية",
      "DP World",
      "شريك موانئ وشحن عالمي لعمليات التوريد والتخزين",
      "Global shipping and ports partner for supply chain operations"
    ],
    [
      "🏢",
      "اقتصادية دبي",
      "Dubai Economy (DED)",
      "مرخص من دائرة التنمية الاقتصادية في دبي",
      "Licensed by the Dubai Department of Economic Development"
    ],
    [
      "🌿",
      "شهادة الحلال",
      "Halal Certificate",
      "منتجاتنا معتمدة وفق معايير الحلال الدولية",
      "Our products are fully certified under international Halal standards"
    ],
  ];

  const operations = [
    [
      IMG.about.photo,
      IMG.about.fallback,
      "بنية تحتية لوجستية متكاملة",
      "Integrated Logistics Infrastructure",
      "4 مستودعات متخصصة في دبي - مبردة وجافة ومجهزة بأحدث أنظمة التخزين والتبريد، جاهزة للتوريد الفوري.",
      "4 specialized warehouses in Dubai - chilled, dry, and equipped with state-of-the-art storage systems, ready for instant supply."
    ],
    [
      IMG.warehouse.photo,
      IMG.warehouse.fallback,
      "عمليات الشحن والتخليص",
      "Shipping & Clearance Operations",
      "تنسيق مباشر مع الشحن البري والبحري والجوي، مع متابعة دقيقة للطلبات حتى التسليم النهائي.",
      "Direct coordination with land, sea, and air freight, with meticulous tracking until final delivery."
    ],
    [
      IMG.spices.photo,
      IMG.spices.fallback,
      "قسم فرز البهارات والتوابل",
      "Spices & Herbs Sorting Division",
      "فرز وتعبئة ومراجعة الجودة بمعايير صارمة قبل إدخال أي منتج إلى سلسلة التوريد.",
      "Sorting, packing, and quality review under strict standards before any product enters the supply chain."
    ],
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <SmartImage
          src={IMG.about.photo}
          fallback={IMG.about.fallback}
          alt="Company building and Dubai skyline"
          className={styles.heroBackground}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroInner}>
          <div className={styles.heroTextGroup}>
            <span className={styles.heroBadge}>{label(locale, "عن الشركة - منذ عام 1937", "About the company - Since 1937")}</span>
            <h1 className={styles.heroTitle}>
              {label(locale, "إرث تجاري يمتد منذ 1937 - قيادة عالمية في تجارة المواد الغذائية", "A trading legacy since 1937 - Global leadership in foodstuff trading")}
            </h1>
            <p className={styles.heroLead}>
              {label(
                locale,
                "من دبي إلى العالم - شريكك الموثوق في تجارة المواد الغذائية بالجملة، نعمل بمعايير جودة عالية وشبكة توريد واسعة تخدم أعمالك بثقة واستمرارية.",
                "From Dubai to the world, your trusted wholesale foodstuff partner with high standards and a dependable supply network."
              )}
            </p>
          </div>

          <div className={styles.statsGrid}>
            {stats.map(([value, arLabel, enLabel]) => (
              <div key={value} className={styles.statCard}>
                <strong>{value}</strong>
                <span>{label(locale, arLabel, enLabel)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.pillarsSection}>
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>{label(locale, "مرتكزاتنا", "Our Pillars")}</span>
          <h2 className={styles.sectionTitle}>{label(locale, "قيم تجعلنا شريكاً طويل الأمد", "Values that make us a long-term partner")}</h2>
        </div>

        <div className={styles.pillarsGrid}>
          {pillars.map(([arTitle, enTitle, arDesc, enDesc], index) => (
            <div key={index} className={styles.pillarCard}>
              <h3>{label(locale, arTitle, enTitle)}</h3>
              <p>{label(locale, arDesc, enDesc)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.leadershipSection}>
        <div className={styles.sectionIntroCentered}>
          <span className={styles.eyebrow}>{label(locale, "فريق الإدارة", "Leadership Team")}</span>
          <h2 className={styles.sectionTitleLight}>{label(locale, "قيادتنا التنفيذية", "Executive Leadership")}</h2>
        </div>

        <div className={styles.leadershipGrid}>
          {leaders.map(([icon, arTitle, enTitle, arSub, enSub, arExp, enExp], index) => (
            <article key={index} className={styles.leaderCard}>
              <div className={styles.leaderIcon}>{icon}</div>
              <h3>{label(locale, arTitle, enTitle)}</h3>
              <p>{label(locale, arSub, enSub)}</p>
              <span className={styles.experienceTag}>{label(locale, arExp, enExp)}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.timelineSection}>
        <div className={styles.sectionIntroCentered}>
          <span className={styles.eyebrow}>{label(locale, "رحلتنا", "Our Journey")}</span>
          <h2 className={styles.sectionTitle}>{label(locale, "مسيرة النجاح منذ 1937", "The success journey since 1937")}</h2>
        </div>

        <div className={styles.timeline}>
          {milestones.map(([year, arText, enText], index) => (
            <div key={year} className={`${styles.timelineItem} ${index % 2 === 0 ? styles.timelineRight : styles.timelineLeft}`}>
              <div className={styles.timelineCard}>
                <strong>{year}</strong>
                <p>{label(locale, arText, enText)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.standardsSection}>
        <div className={styles.sectionIntroCentered}>
          <span className={styles.eyebrow}>{label(locale, "معاييرنا", "Our Standards")}</span>
          <h2 className={styles.sectionTitleGold}>{label(locale, "معايير الجودة التي نعمل بها", "Quality standards we work by")}</h2>
        </div>

        <div className={styles.standardsGrid}>
          {standards.map(([icon, arTitle, enTitle, arDesc, enDesc], index) => (
            <div key={index} className={styles.standardCard}>
              <div className={styles.standardIcon}>{icon}</div>
              <h3>{label(locale, arTitle, enTitle)}</h3>
              <p>{label(locale, arDesc, enDesc)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.operationsSection}>
        <div className={styles.sectionIntroCentered}>
          <span className={styles.eyebrow}>{label(locale, "منشآتنا وعملياتنا", "Facilities & Operations")}</span>
          <h2 className={styles.sectionTitle}>{label(locale, "بنية تحتية لوجستية متكاملة", "Integrated logistics infrastructure")}</h2>
          <p className={styles.sectionLead}>
            {label(
              locale,
              "بنية تشغيل متكاملة تشمل التخزين، الفرز، التعبئة، والربط المباشر مع الشحن المحلي والدولي.",
              "An integrated operating backbone covering storage, sorting, packing, and direct local and global shipping links."
            )}
          </p>
        </div>

        <div className={styles.operationsGrid}>
          {operations.map(([src, fallback, arTitle, enTitle, arDesc, enDesc], index) => (
            <article key={index} className={styles.operationCard}>
              <SmartImage src={src} fallback={fallback} alt={label(locale, arTitle, enTitle)} className={styles.operationImage} />
              <div className={styles.operationOverlay}>
                <h3>{label(locale, arTitle, enTitle)}</h3>
                <p>{label(locale, arDesc, enDesc)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaLogo}>RH</div>
        <h2>{label(locale, "ابدأ شراكتك معنا اليوم", "Start your partnership with us today")}</h2>
        <p>
          {label(
            locale,
            "فريقنا جاهز لخدمتك 6 أيام في الأسبوع - تواصل معنا الآن وابدأ شراكتك مع فريق موثوق في توريد المواد الغذائية.",
            "Our team is ready to support you six days a week. Contact us now and start a dependable wholesale partnership."
          )}
        </p>
        <div className={styles.ctaActions}>
          <Link href={`/${locale}/contact`} className={styles.primaryCta}>
            {label(locale, "تواصل معنا", "Contact Us")}
          </Link>
          <Link href={`/${locale}/products`} className={styles.secondaryCta}>
            {label(locale, "استعرض المنتجات", "Browse Products")}
          </Link>
        </div>
      </section>
    </div>
  );
}
