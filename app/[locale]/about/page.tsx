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

  const stats = [
    ["1937", "عام التأسيس", "Founded"],
    ["85+", "سنة من الخبرة التراكمية", "Years of expertise"],
    ["10,000+", "عميل موثوق", "Trusted clients"],
    ["1,000+", "منتج نشط", "Active products"],
    ["4", "مستودعات متخصصة", "Specialized warehouses"],
    ["50+", "دولة في شبكتنا", "Countries in our network"],
  ];

  const pillars = [
    ["الثقة والمصداقية", "Every deal is built on transparency, consistency, and dependable delivery."],
    ["السرعة والكفاءة", "Fast execution, clear coordination, and safe handling across every shipment."],
    ["الجودة أولاً", "We only accept products sourced from suppliers that meet our internal standards."],
    ["الشراكة العالمية", "A trusted regional network connected to more than 50 sourcing and trading markets."],
  ];

  const leaders = [
    ["👔", "المدير العام - مدير مؤسس", "الرؤية الاستراتيجية والقيادة التنفيذية", "+50 سنة خبرة"],
    ["📈", "المدير التنفيذي - المبيعات والتسويق", "تطوير الأعمال والعملاء والشراكات الاستراتيجية", "+15 سنة خبرة"],
    ["🏅", "مدير المشتريات وإدارة الجودة", "ضمان الجودة وسلامة الغذاء وسلاسل التوريد", "+5 سنوات خبرة"],
    ["💼", "المدير المالي والعمليات اللوجستية", "الإدارة المالية والشحن والتخليص الجمركي", "+15 سنة خبرة"],
    ["⚙️", "مدير العمليات الداخلية", "إدارة المستودعات والعمليات اليومية", "+25 سنة خبرة"],
  ];

  const milestones = [
    ["1937", "تأسيس المجموعة التجارية العائلية - بداية مسيرة التجارة الغذائية"],
    ["1998", "أول صفقة تصدير دولية إلى دول الخليج العربي وتوسيع الشبكة"],
    ["2002", "افتتاح مستودع مبرد ومنشأة تعبئة وتغليف متخصصة"],
    ["2012", "التأسيس الرسمي في الإمارات العربية المتحدة - رويال هارفست للمواد الغذائية ذ.م.م"],
    ["2015", "تجاوز 5,000 عميل نشط وفتح خطوط شحن مباشرة مع 15 دولة"],
    ["2026", "شبكة تشغيل قوية تخدم المطاعم والفنادق والسوبرماركت والموزعين بالجملة"],
  ];

  const standards = [
    ["🏛️", "Dubai Municipality", "معتمد من بلدية دبي في جودة الغذاء والسلامة"],
    ["🧾", "Customs", "معتمد من دائرة الجمارك والموانئ في الإمارات"],
    ["⚓", "DP World", "شريك موانئ وشحن عالمي لعمليات التوريد والتخزين"],
    ["🏢", "DED", "مرخص من دائرة التنمية الاقتصادية في دبي"],
    ["🌿", "Halal", "منتجاتنا معتمدة وفق معايير الحلال الدولية"],
  ];

  const operations = [
    [
      IMG.about.photo,
      IMG.about.fallback,
      "بنية تحتية لوجستية متكاملة",
      "4 مستودعات متخصصة في دبي - مبردة وجافة ومجهزة بأحدث أنظمة التخزين والتبريد، جاهزة للتوريد الفوري.",
    ],
    [
      IMG.warehouse.photo,
      IMG.warehouse.fallback,
      "عمليات الشحن والتخليص",
      "تنسيق مباشر مع الشحن البري والبحري والجوي، مع متابعة دقيقة للطلبات حتى التسليم النهائي.",
    ],
    [
      IMG.spices.photo,
      IMG.spices.fallback,
      "قسم فرز البهارات والتوابل",
      "فرز وتعبئة ومراجعة الجودة بمعايير صارمة قبل إدخال أي منتج إلى سلسلة التوريد.",
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
          {pillars.map(([title, enDesc], index) => (
            <div key={index} className={styles.pillarCard}>
              <h3>{label(locale, title, title)}</h3>
              <p>{label(locale, enDesc, enDesc)}</p>
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
          {leaders.map(([icon, title, subtitle, exp], index) => (
            <article key={index} className={styles.leaderCard}>
              <div className={styles.leaderIcon}>{icon}</div>
              <h3>{label(locale, title, title)}</h3>
              <p>{label(locale, subtitle, subtitle)}</p>
              <span className={styles.experienceTag}>{label(locale, exp, exp)}</span>
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
          {milestones.map(([year, textValue], index) => (
            <div key={year} className={`${styles.timelineItem} ${index % 2 === 0 ? styles.timelineRight : styles.timelineLeft}`}>
              <div className={styles.timelineCard}>
                <strong>{year}</strong>
                <p>{label(locale, textValue, textValue)}</p>
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
          {standards.map(([icon, title, desc], index) => (
            <div key={index} className={styles.standardCard}>
              <div className={styles.standardIcon}>{icon}</div>
              <h3>{title}</h3>
              <p>{label(locale, desc, desc)}</p>
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
          {operations.map(([src, fallback, title, desc], index) => (
            <article key={index} className={styles.operationCard}>
              <SmartImage src={src} fallback={fallback} alt={title} className={styles.operationImage} />
              <div className={styles.operationOverlay}>
                <h3>{label(locale, title, title)}</h3>
                <p>{label(locale, desc, desc)}</p>
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
