"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES, COMPANY } from "@/lib/config";
import { getTranslation } from "@/lib/i18n";
import type { Language } from "@/lib/config";
import SmartImage from "@/components/SmartImage";
import { IMG } from "@/lib/images";
import AnimatedStats from "@/components/AnimatedStats";
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

  const [scrollY, setScrollY] = useState(0);

  // Parallax Scroll Effect on Hero Background
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer scroll reveals
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

  const stats = [
    {
      value: label(locale, "+10,000 عميل", "+10,000 Clients", {
        ur: "+10,000 گاہک",
        fr: "+10 000 Clients",
        es: "+10,000 Clientes"
      }),
      desc: label(locale, "عميل موثوق في الإمارات", "Trusted UAE Clients", {
        ur: "متحدہ عرب امارات میں قابل اعتماد گاہک",
        fr: "Clients de confiance aux EAU",
        es: "Clientes de confianza en EAU"
      })
    },
    {
      value: label(locale, "منذ 1937", "Since 1937", {
        ur: "1937 سے",
        fr: "Depuis 1937",
        es: "Desde 1937"
      }),
      desc: label(locale, "88 عاماً من الخبرة", "88 Years of Experience", {
        ur: "88 سال کا تجربہ",
        fr: "88 ans d'expérience",
        es: "88 años de experiencia"
      })
    },
    {
      value: label(locale, "+1,000 منتج", "+1,000 Products", {
        ur: "+1,000 مصنوعات",
        fr: "+1 000 Produits",
        es: "+1,000 Productos"
      }),
      desc: label(locale, "يتداول شبه يومياً", "Traded almost daily", {
        ur: "تقریباً روزانہ تجارت کی جاتی ہے",
        fr: "Négocié presque quotidiennement",
        es: "Comercializado casi a diario"
      })
    },
    {
      value: label(locale, "6 أيام", "6 Days", {
        ur: "6 دن",
        fr: "6 Jours",
        es: "6 Días"
      }),
      desc: label(locale, "توصيل أسبوعي", "Weekly Delivery", {
        ur: "ہفتہ وار ترسیل",
        fr: "Livraison hebdomadaire",
        es: "Entrega semanal"
      })
    }
  ];

  const partners = [
    {
      icon: "⚙️",
      title: label(locale, "المطاحن", "Mills", { ur: "آٹا ملز", fr: "Moulins", es: "Molinos" }),
      desc: label(
        locale,
        "حبوب وبذور بالجملة للمطاحن - قمح، ذرة، أرز، سميد، دقيق بأعلى معايير الجودة والنقاء",
        "Wholesale grains and seeds for mills - wheat, corn, rice, semolina, and flour with the highest standards of quality and purity.",
        {
          ur: "ملز کے لیے ہول سیل اناج اور بیج - گندم، مکئی، چاول، سوجی اور آٹا اعلیٰ ترین معیار اور پاکیزگی کے ساتھ۔",
          fr: "Grains et semences en gros pour moulins - blé, maïs, riz, semoule et farine avec les normes de qualité les plus élevées.",
          es: "Granos y semillas al por mayor para molinos: trigo, maíz, arroz, sémola y harina con los más altos estándares de calidad y pureza."
        }
      )
    },
    {
      icon: "☕",
      title: label(locale, "المحامص", "Roasters", { ur: "بھوننے والے", fr: "Torréfacteurs", es: "Tostadores" }),
      desc: label(
        locale,
        "مكسرات خام وبهارات بالجملة للمحامص - جاهزة للتحميص والتعبئة بعلامتك التجارية الخاصة",
        "Raw nuts and wholesale spices for roasters - ready for roasting and packaging with your private label.",
        {
          ur: "بھوننے والوں کے لیے خام گری دار میوے اور ہول سیل مصالحے - آپ کے نجی لیبل کے ساتھ بھوننے اور پیکنگ کے لیے تیار۔",
          fr: "Noix brutes et épices en gros pour torréfacteurs - prêtes à être torréfiées et emballées sous votre propre marque.",
          es: "Nueces crudas y especias al por mayor para tostadores: listas para tostar y envasar con su marca privada."
        }
      )
    },
    {
      icon: "🛒",
      title: label(locale, "محلات السوبرماركت", "Supermarkets", { ur: "سپر مارکیٹس", fr: "Supermarchés", es: "Supermercados" }),
      desc: label(
        locale,
        "تشكيلة واسعة من المنتجات المعبأة والجاهزة للعرض - مناسبة لجميع أحجام السوبرماركت في الإمارات",
        "A wide selection of packaged and shelf-ready products - suitable for all supermarket sizes in the UAE.",
        {
          ur: "پیک شدہ اور شیلف کے لیے تیار مصنوعات کا ایک وسیع انتخاب - متحدہ عرب امارات میں تمام سپر مارکیٹ سائز کے لیے موزوں۔",
          fr: "Une large sélection de produits emballés et prêts à l'étalage - adaptés à toutes les tailles de supermarchés aux EAU.",
          es: "Una amplia selección de productos envasados y listos para la venta, adecuados para todos los tamaños de supermercados en los EAU."
        }
      )
    },
    {
      icon: "🍽️",
      title: label(locale, "المطاعم والكافيهات", "Restaurants & Cafes", { ur: "ریستوراں اور کیفے", fr: "Restaurants & Cafés", es: "Restaurantes y Cafés" }),
      desc: label(
        locale,
        "من المطاعم الشعبية إلى الفاخرة - بهارات، مكسرات، حبوب، متة وقهوة بأسعار الجملة",
        "From casual to fine dining - spices, nuts, grains, mate, and coffee at wholesale prices.",
        {
          ur: "عام سے لے کر عمدہ ڈائننگ تک - مصالحے، گری دار میوے، اناج، میٹھے اور کافی ہول سیل قیمتوں پر۔",
          fr: "De la restauration rapide à la haute gastronomie - épices, noix, grains, maté et café aux prix de gros.",
          es: "Desde restaurantes casuales hasta alta cocina: especias, nueces, granos, mate y café a precios de mayorista."
        }
      )
    },
    {
      icon: "🏨",
      title: label(locale, "الفنادق والمنتجعات", "Hotels & Resorts", { ur: "ہوٹل اور ریزورٹس", fr: "Hôtels & Complexes", es: "Hoteles y Resorts" }),
      desc: label(
        locale,
        "مواد غذائية بجودة فندقية - بهارات، مكسرات، حبوب، متة وقهوة للفنادق والمنتجعات الفاخرة",
        "Hotel-quality foodstuffs - spices, nuts, grains, mate, and coffee for luxury hotels and resorts.",
        {
          ur: "ہوٹل کے معیار کا اشیائے خوردونوش - لگژری ہوٹلوں اور ریزورٹس کے لیے مصالحے، گری دار میوے، اناج، میٹھے اور کافی۔",
          fr: "Denrées alimentaires de qualité hôtelière - épices, noix, grains, maté et café pour hôtels et complexes de luxe.",
          es: "Alimentos de calidad hotelera: especias, nueces, granos, mate y café para hoteles y complejos turísticos de lujo."
        }
      )
    },
    {
      icon: "🧑‍🍳",
      title: label(locale, "شركات الكيتريغ", "Catering Companies", { ur: "کیٹرنگ کمپنیاں", fr: "Sociétés de Restauration", es: "Empresas de Catering" }),
      desc: label(
        locale,
        "كميات كبيرة بأسعار الجملة لتلبية احتياجات الفعاليات والمناسبات الكبرى في الإمارات والخليج",
        "Large quantities at wholesale prices to meet the needs of major events and occasions in the UAE and Gulf.",
        {
          ur: "متحدہ عرب امارات اور خلیج میں بڑے اجتماعات اور تقریبات کی ضروریات کو پورا کرنے کے لیے ہول سیل قیمتوں پر بھاری مقدار۔",
          fr: "De grandes quantités aux prix de gros pour répondre aux besoins des grands événements et occasions aux EAU et dans le Golfe.",
          es: "Grandes cantidades a precios de mayorista para satisfacer las necesidades de eventos y ocasiones importantes en los EAU y el Golfo."
        }
      )
    },
    {
      icon: "🍬",
      title: label(locale, "محلات الحلويات", "Sweet Shops", { ur: "مٹھائی کی دکانیں", fr: "Confiseries", es: "Tiendas de Dulces" }),
      desc: label(
        locale,
        "المكسرات المحمصة، الدراجيه، الراحة، النوكا، الملبس - كل ما يحتاجه الحلواني المحترف بأسعار الجملة",
        "Roasted nuts, dragées, Turkish delight, nougat, malban - everything a professional pastry chef needs at wholesale prices.",
        {
          ur: "بھنے ہوئے گری دار میوے، ڈریجی، ترکی کی لذت، نوگٹ، ملبان - ہول سیل قیمتوں پر وہ سب کچھ جو ایک پیشہ ور پیسٹری شیف کو ضرورت ہے۔",
          fr: "Noix torréfiées, dragées, loukoum, nougat, malban - tout ce dont un chef pâtissier professionnel a besoin aux prix de gros.",
          es: "Nueces tostadas, grageas, delicias turcas, turrón, malban: todo lo que un pastelero profesional necesita a precios de mayorista."
        }
      )
    },
    {
      icon: "🎁",
      title: label(locale, "محلات الهدايا", "Gift Shops", { ur: "تحفے کی دکانیں", fr: "Boutiques de Cadeaux", es: "Tiendas de Regalos" }),
      desc: label(
        locale,
        "مكسرات فاخرة وفواكه مجففة وحلويات مميزة - مثالية لمحلات الهدايا والمناسبات الخاصة والأعياد",
        "Premium nuts, dried fruits, and unique sweets - ideal for gift shops, special occasions, and holidays.",
        {
          ur: "پریمیم گری دار میوے، خشک میوہ جات، اور منفرد مٹھائیاں - تحفے کی دکانوں، خاص مواقع اور تعطیلات کے لیے بہترین۔",
          fr: "Noix de qualité supérieure, fruits secs et confiseries uniques - idéales pour les boutiques de cadeaux, les occasions spéciales et les fêtes.",
          es: "Nueces premium, frutas secas y dulces únicos: ideales para tiendas de regalos, ocasiones especiales y días festivos."
        }
      )
    },
    {
      icon: "🚚",
      title: label(locale, "الموزعون الإقليميون", "Regional Distributors", { ur: "علاقائی تقسیم کار", fr: "Distributeurs Régionaux", es: "Distribuidores Regionales" }),
      desc: label(
        locale,
        "شراكات توزيع استراتيجية في الإمارات والخليج والمنطقة - دعم لوجستي كامل وأسعار خاصة للموزعين المعتمدين",
        "Strategic distribution partnerships in the UAE, Gulf, and region - full logistical support and special prices for authorized distributors.",
        {
          ur: "متحدہ عرب امارات، خلیج اور خطے میں اسٹریٹجک تقسیم کار شراکتیں - مجاز تقسیم کاروں کے لیے مکمل لاجسٹک سپورٹ اور خصوصی قیمتیں۔",
          fr: "Partenariats de distribution stratégiques aux EAU, dans le Golfe et la région - assistance logistique complète et tarifs préférentiels pour les distributeurs agréés.",
          es: "Asociaciones estratégicas de distribución en los EAU, el Golfo y la región: soporte logístico completo y precios especiales para distribuidores autorizados."
        }
      )
    },
    {
      icon: "📦",
      title: label(locale, "تجار الجملة", "Wholesale Traders", { ur: "تھوک تاجر", fr: "Grossistes", es: "Comerciantes Mayoristas" }),
      desc: label(
        locale,
        "كميات كبيرة بأسعار تنافسية لتجار الجملة - توريد منتظم وعقود طويلة الأمد مع ضمان الجودة والكميات",
        "Large quantities at competitive prices for wholesalers - regular supply and long-term contracts with guaranteed quality and volume.",
        {
          ur: "ہول سیلرز کے لیے مسابقتی قیمتوں پر بھاری مقدار - ضمانت شدہ معیار اور مقدار کے ساتھ باقاعدہ فراہمی اور طویل مدتی معاہدے۔",
          fr: "Grandes quantités à prix compétitifs pour les grossistes - approvisionnement régulier et contrats à long terme avec garantie de qualité et de volume.",
          es: "Grandes cantidades a precios competitivos para mayoristas: suministro regular y contratos a largo plazo con calidad y volumen garantizados."
        }
      )
    }
  ];

  return (
    <>
      <section className={styles.hero}>
        <SmartImage
          src="/images/hero-nuts.jpg"
          fallback={IMG.nuts.fallback}
          alt="Premium nuts selection"
          className={styles.heroBackground}
          style={{
            transform: `scale(1.08) translateY(${scrollY * 0.18}px)`,
            transition: "transform 0.1s ease-out"
          }}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroTexture} />
        <div className={styles.heroInner}>
          <div className={`${styles.heroContent} ${compactHeroText ? styles.heroContentCompact : ""} ${styles.animateUp}`}>
            <div className={styles.heroMeta}>
              <span className={styles.heroMetaLabel}>
                {label(locale, "دبي، الإمارات العربية المتحدة", "Dubai, United Arab Emirates", {
                  ur: "دبئی، متحدہ عرب امارات",
                  fr: "Dubaï, Émirats Arabes Unis",
                  es: "Dubái, Emiratos Árabes Unidos"
                })}
              </span>
              <span className={styles.heroMetaDivider} />
              <span className={styles.heroMetaText}>
                {locale === "ar" ? COMPANY.nameAr : COMPANY.nameEn}
              </span>
            </div>

            <span className={styles.heroBadge}>
              ✦ {label(locale, "جودة عالمية موثوقة", "Trusted Global Quality", {
                ur: "قابل اعتماد عالمی معیار",
                fr: "Qualité globale de confiance",
                es: "Calidad global de confianza"
              })}
            </span>

            <h1 className={`${styles.heroHeadline} ${compactHeroText ? styles.heroHeadlineCompact : ""} ${locale === "en" ? styles.heroHeadlineEnglish : ""}`}>
              {label(locale, "شريكك الموثوق", "Your trusted", {
                ur: "تھوک فروشی میں آپ کا",
                fr: "Votre partenaire de confiance",
                es: "Su socio de confianza"
              })}{" "}
              <span className={styles.heroHighlight}>
                {label(locale, "في تجارة المواد الغذائية بالجملة", "wholesale partner", {
                  ur: "قابل اعتماد شریک کار",
                  fr: "en commerce de gros",
                  es: "en comercio mayorista"
                })}
              </span>
            </h1>

            <p className={`${styles.heroSubheadline} ${compactHeroText ? styles.heroSubheadlineCompact : ""}`}>
              {t.hero.subheadline}
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
          {stats.map((s, i) => (
            <div
              key={i}
              className={`${styles.feature} ${styles.reveal} ${styles.revealUp} ${styles["stagger" + ((i % 4) + 1)]}`}
            >
              <strong className={styles.featureValue}>{s.value}</strong>
              <span className={styles.featureLabel}>{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <section className={styles.partnersSection}>
        <div className={`${styles.sectionHeaderCentered} ${styles.reveal} ${styles.revealUp}`}>
          <span className={styles.sectionEyebrow}>
            {label(locale, "02 - من نخدم", "02 - Who We Serve", {
              ur: "02 - ہم کس کی خدمت کرتے ہیں",
              fr: "02 - Qui Nous Servons",
              es: "02 - A Quiénes Servimos"
            })}
          </span>
          <h2 className={styles.partnersTitle}>
            {locale === "ar" ? (
              <>
                شركاؤنا <span className={styles.goldText}>في النجاح</span>
              </>
            ) : locale === "ur" ? (
              <>
                کامیابی میں <span className={styles.goldText}>ہمارے شراکت دار</span>
              </>
            ) : locale === "fr" ? (
              <>
                Nos Partenaires <span className={styles.goldText}>dans le Succès</span>
              </>
            ) : locale === "es" ? (
              <>
                Nuestros Socios <span className={styles.goldText}>en el Éxito</span>
              </>
            ) : (
              <>
                Our Partners <span className={styles.goldText}>in Success</span>
              </>
            )}
          </h2>
          <p className={styles.sectionSubtitleCentered}>
            {label(
              locale,
              "نخدم طيفاً واسعاً من قطاعات الأغذية في الإمارات والمنطقة - من المطاعم الفاخرة إلى تجار الجملة والموزعين الإقليميين",
              "We serve a wide spectrum of food sectors in the UAE and the region - from fine dining to wholesale traders and regional distributors.",
              {
                ur: "ہم متحدہ عرب امارات اور خطے میں فوڈ سیکٹرز کی ایک وسیع رینج کی خدمت کرتے ہیں - عمدہ ڈائننگ سے لے کر ہول سیل تاجروں اور علاقائی تقسیم کاروں تک۔",
                fr: "Nous servons un large éventail de secteurs alimentaires aux EAU et dans la région - de la haute gastronomie aux grossistes et distributeurs régionaux.",
                es: "Servimos a una amplia gama de sectores alimentarios en los EAU y la región: desde restaurantes de lujo hasta comerciantes mayoristas y distribuidores regionales."
              }
            )}
          </p>
        </div>

        <div className={styles.partnersGrid}>
          {partners.map((partner, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`${styles.partnerCard} ${styles.reveal} ${isEven ? styles.revealLeft : styles.revealRight} ${styles["stagger" + ((index % 4) + 1)]}`}
              >
                <div className={styles.partnerIcon}>{partner.icon}</div>
                <h3 className={styles.partnerCardTitle}>{partner.title}</h3>
                <p className={styles.partnerCardDesc}>{partner.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.categoriesSection}>
        <div className={`${styles.sectionHeader} ${styles.reveal} ${styles.revealUp}`}>
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
          {FEATURED_CATEGORIES.map((cat, index) => (
            <div
              key={cat.slug}
              className={`${styles.categoryCard} ${styles.reveal} ${styles.revealScale} ${styles["stagger" + ((index % 3) + 1)]}`}
            >
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

      <AnimatedStats
        customersLabel={t.stats.customers}
        experienceLabel={t.stats.experience}
        productsLabel={t.stats.products}
      />

      <section className={`${styles.ctaBanner} ${styles.reveal} ${styles.revealScale}`}>
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
