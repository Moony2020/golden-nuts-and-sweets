"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SmartImage from "@/components/SmartImage";
import { CATEGORIES } from "@/lib/config";
import { getTranslation } from "@/lib/i18n";
import { IMG } from "@/lib/images";
import type { Language } from "@/lib/config";
import type { ProductType } from "@/models/Product";
import { getLocalizedProduct } from "@/lib/productTranslations";
import styles from "./products.module.css";

interface ProductsPageClientProps {
  locale: Language;
}

type CategoryVisual = {
  src: string;
  fallback: string;
  sampleCount: number;
  arDesc: string;
  enDesc: string;
};

const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  nuts: {
    src: "/images/hero-nuts.jpg",
    fallback: IMG.nuts.fallback,
    sampleCount: 58,
    arDesc: "لوز، فستق، كاجو، جوز ومكسرات مختارة من أفضل المصادر.",
    enDesc: "Almonds, pistachios, cashews, walnuts, and premium mixed nuts.",
  },
  grains: {
    src: IMG.grains.photo,
    fallback: IMG.grains.fallback,
    sampleCount: 24,
    arDesc: "حبوب مختارة بعناية للاستخدام التجاري والتموين اليومي.",
    enDesc: "Carefully selected grains for wholesale kitchens and daily trade.",
  },
  rice: {
    src: IMG.grains.photo,
    fallback: IMG.grains.fallback,
    sampleCount: 18,
    arDesc: "أرز بسمتي، طويل الحبة، وأصناف متعددة للمطاعم والسوبرماركت.",
    enDesc: "Basmati, long-grain, and specialty rice for foodservice and retail.",
  },
  oils: {
    src: IMG.about.photo,
    fallback: IMG.grains.fallback,
    sampleCount: 11,
    arDesc: "زيوت غذائية مختارة تشمل الزيتون والسمسم وغيرها.",
    enDesc: "Selected edible oils including olive, sesame, and blended options.",
  },
  spices: {
    src: IMG.spices.photo,
    fallback: IMG.spices.fallback,
    sampleCount: 49,
    arDesc: "بهارات كاملة ومطحونة بنكهات أصلية وتوريد ثابت.",
    enDesc: "Whole and ground spices with authentic flavor and steady supply.",
  },
  pulses: {
    src: IMG.grains.photo,
    fallback: IMG.grains.fallback,
    sampleCount: 12,
    arDesc: "عدس، حمص، فاصوليا وبقول متنوعة لاحتياجات المطابخ التجارية.",
    enDesc: "Lentils, chickpeas, beans, and pulses for commercial kitchens.",
  },
  dates: {
    src: "/images/hero-nuts.jpg",
    fallback: IMG.nuts.fallback,
    sampleCount: 32,
    arDesc: "تمور فاخرة ومجففات عالية الجودة بعروض جملة مرنة.",
    enDesc: "Premium dates and dried fruits with flexible wholesale supply.",
  },
  coffee: {
    src: IMG.coffee.photo,
    fallback: IMG.coffee.fallback,
    sampleCount: 9,
    arDesc: "حبوب قهوة مختارة ومحمصة بعناية للمقاهي والضيافة.",
    enDesc: "Selected coffee beans and roasts for cafes and hospitality.",
  },
  tea: {
    src: IMG.coffee.photo,
    fallback: IMG.coffee.fallback,
    sampleCount: 14,
    arDesc: "شاي أسود وأخضر وأعشاب بتغليف مناسب للتوريد التجاري.",
    enDesc: "Black, green, and herbal teas packed for reliable trade supply.",
  },
  beverages: {
    src: IMG.about.photo,
    fallback: IMG.grains.fallback,
    sampleCount: 16,
    arDesc: "مشروبات مختارة للتجزئة والضيافة والطلبات المؤسسية.",
    enDesc: "Beverage lines for retail, hospitality, and institutional orders.",
  },
  canned: {
    src: IMG.warehouse.photo,
    fallback: IMG.coffee.fallback,
    sampleCount: 17,
    arDesc: "معلبات غذائية مناسبة للمتاجر والمطاعم وسلاسل التوريد.",
    enDesc: "Canned food selections for retailers, restaurants, and supply chains.",
  },
  sweets: {
    src: "/images/hero-nuts.jpg",
    fallback: IMG.nuts.fallback,
    sampleCount: 31,
    arDesc: "حلويات شرقية ومجففات ومكسرات فاخرة للهدايا والضيافة.",
    enDesc: "Eastern sweets, dried treats, and premium nuts for gifting and hospitality.",
  },
  frozen: {
    src: IMG.warehouse.photo,
    fallback: IMG.coffee.fallback,
    sampleCount: 8,
    arDesc: "أغذية مجمدة مختارة بحلول توريد ملائمة للجملة.",
    enDesc: "Selected frozen foods with wholesale-ready supply solutions.",
  },
  sauces: {
    src: IMG.about.photo,
    fallback: IMG.grains.fallback,
    sampleCount: 13,
    arDesc: "صلصات وتتبيلات بأصناف متعددة للمطاعم وخطوط البيع.",
    enDesc: "Sauces and seasonings for restaurants and retail product lines.",
  },
};

const SHOWCASE_CARDS = [
  {
    id: "nuts",
    filterSlug: "nuts",
    count: 58,
    icon: "🥜",
    arTitle: "المكسرات",
    enTitle: "Nuts",
    frTitle: "Noix",
    urTitle: "میوہ جات",
    esTitle: "Frutos Secos",
    arDesc: "لوز، كاجو، جوز ومكسرات مختارة من أفضل المصادر العالمية.",
    enDesc: "Almonds, cashews, walnuts, and premium nuts from top global sources.",
    frDesc: "Amandes, cajous, noix et fruits à coque de qualité supérieure des meilleures sources mondiales.",
    urDesc: "بادام، کاجو، اخروٹ اور دنیا کے بہترین ذرائع سے منتخب کردہ پریمیم گری دار میوے.",
    esDesc: "Almendras, anacardos, nueces y frutos secos premium de las mejores fuentes globales.",
    image: "/images/hero-nuts.jpg",
    fallback: IMG.nuts.fallback,
  },
  {
    id: "pistachio",
    filterSlug: "nuts",
    count: 13,
    icon: "🌰",
    arTitle: "الفستق",
    enTitle: "Pistachios",
    frTitle: "Pistaches",
    urTitle: "پستہ",
    esTitle: "Pistachos",
    arDesc: "فستق حلبي، إيراني، تركي بأفضل درجات الجودة للبيع بالجملة.",
    enDesc: "Premium Aleppo, Iranian, and Turkish pistachios for wholesale.",
    frDesc: "Pistaches d'Alep, iraniennes et turques de première qualité pour la vente en gros.",
    urDesc: "تھوک فروشی کے لیے پریمیم حلبی، ایرانی اور ترکی پستے بہترین معیار میں۔",
    esDesc: "Pistachos de Alepo, iraníes y turcos de primera calidad para venta al por mayor.",
    image: "/images/hero-nuts.jpg",
    fallback: IMG.nuts.fallback,
  },
  {
    id: "dried_fruits",
    filterSlug: "dates",
    count: 40,
    icon: "🍎",
    arTitle: "الفواكه المجففة",
    enTitle: "Dried Fruits",
    frTitle: "Fruits Secs",
    urTitle: "خشک میوہ جات",
    esTitle: "Frutas Secas",
    arDesc: "تشكيلة من الفواكه المجففة الطبيعية عالية الجودة.",
    enDesc: "A selection of high-quality natural dried fruits.",
    frDesc: "Une sélection de fruits secs naturels de haute qualité.",
    urDesc: "اعلیٰ معیار کے قدرتی خشک میوہ جات کا ایک وسیع انتخاب۔",
    esDesc: "Una selección de frutas secas naturales de alta calidad.",
    image: "/images/hero-nuts.jpg",
    fallback: IMG.nuts.fallback,
  },
  {
    id: "dried_apricots",
    filterSlug: "dates",
    count: 21,
    icon: "🍑",
    arTitle: "المشمش والخوخ المجفف",
    enTitle: "Dried Apricots & Peaches",
    frTitle: "Abricots et Pêches Secs",
    urTitle: "خوبانی اور خشک آڑو",
    esTitle: "Albaricoques y Melocotones Secos",
    arDesc: "قمر الدين سوري، مشمش تركي، جامبو مشمش أفغاني وخوخ مجفف.",
    enDesc: "Syrian apricot sheets, Turkish apricots, Afghan jumbo apricots, and dried peaches.",
    frDesc: "Pâtes d'abricot syriennes, abricots turcs, abricots jumbo afghans et pêches séchées.",
    urDesc: "شامی خوبانی کی چادریں، ترکی خوبانی، افغانی جمبو خوبانی اور خشک آڑو۔",
    esDesc: "Láminas de albaricoques sirios, albaricoques turcos, albaricoques jumbo afganos y melocotones secos.",
    image: "/images/hero-nuts.jpg",
    fallback: IMG.nuts.fallback,
  },
  {
    id: "grains_seeds",
    filterSlug: "grains",
    count: 24,
    icon: "🌾",
    arTitle: "الحبوب والبذور",
    enTitle: "Grains & Seeds",
    frTitle: "Céréales et Graines",
    urTitle: "اناج اور بیج",
    esTitle: "Cereales y Semillas",
    arDesc: "سمسم، حبة البركة، يانسون، فول، كمون وحبوب تجارية متنوعة.",
    enDesc: "Sesame, nigella, anise, beans, cumin, and various commercial grains.",
    frDesc: "Sésame, nigelle, anis, haricots, cumin et diverses céréales commerciales.",
    urDesc: "تل، کلونجی، سونف، لوبیا، زیرہ اور مختلف تجارتی اناج۔",
    esDesc: "Sésamo, nigella, anís, alubias, comino y varios granos comerciales.",
    image: IMG.grains.photo,
    fallback: IMG.grains.fallback,
  },
  {
    id: "spices",
    filterSlug: "spices",
    count: 49,
    icon: "🌶️",
    arTitle: "البهارات والهيل والزعفران",
    enTitle: "Spices, Cardamom & Saffron",
    frTitle: "Épices, Cardamome et Safran",
    urTitle: "مصالحہ جات، الائچی اور زعفران",
    esTitle: "Especias, Cardamomo y Azafrán",
    arDesc: "بهارات هندية وسورية، هيل هندي وغواتيمالي، وزعفران نيغين.",
    enDesc: "Indian and Syrian spices, Indian and Guatemalan cardamom, plus Negin saffron.",
    frDesc: "Épices indiennes et syriennes, cardamome indienne et guatémaltèque, et safran Negin.",
    urDesc: "ہندوستانی اور شامی مصالحے، ہندوستانی اور گوئٹے مالا کی الائچی، اور نگین زعفران۔",
    esDesc: "Especias indias y sirias, cardamomo indio y guatemalteco, y azafrán Negin.",
    image: IMG.spices.photo,
    fallback: IMG.spices.fallback,
  },
  {
    id: "raisins_berries",
    filterSlug: "dates",
    count: 12,
    icon: "🍇",
    arTitle: "الزبيب والكرزيات",
    enTitle: "Raisins & Berries",
    frTitle: "Raisins et Baies",
    urTitle: "کشمش اور بیر",
    esTitle: "Pasas y Bayas",
    arDesc: "زبيب ذهبي وتشيلي، زبيب ملاير — توت بري وكرز مجفف.",
    enDesc: "Golden, Chilean, and Malayer raisins with cranberries and dried cherries.",
    frDesc: "Raisins dorés, chiliens et Malayer avec canneberges et cerises séchées.",
    urDesc: "سنہری، چلی اور ملیر کشمش کے ساتھ کرین بیری اور خشک چیری۔",
    esDesc: "Pasas doradas, chilenas y Malayer con arándanos y cerezas secas.",
    image: "/images/hero-nuts.jpg",
    fallback: IMG.nuts.fallback,
  },
  {
    id: "dates_figs",
    filterSlug: "dates",
    count: 32,
    icon: "🌴",
    arTitle: "التمور والتين",
    enTitle: "Dates & Figs",
    frTitle: "Dattes et Figues",
    urTitle: "کھجوریں اور انجیر",
    esTitle: "Dátiles y Higos",
    arDesc: "تمور مجدول فلسطيني وسعودي — تين سوري طبيعي، مطبق وأفغاني.",
    enDesc: "Medjool dates from Palestine and Saudi, with natural and pressed Syrian figs.",
    frDesc: "Dattes Medjool de Palestine et d'Arabie saoudite, avec figues syriennes naturelles et pressées.",
    urDesc: "فلسطین اور سعودی عرب کی مجدول کھجوریں، اور قدرتی اور دبائے ہوئے شامی انجیر۔",
    esDesc: "Dátiles Medjool de Palestina y Arabia Saudita, con higos sirios naturales y prensados.",
    image: "/images/hero-nuts.jpg",
    fallback: IMG.nuts.fallback,
  },
] as const;

function text(
  locale: Language,
  ar: string,
  en: string,
  fr?: string,
  ur?: string,
  es?: string
) {
  if (locale === "ar") return ar;
  if (locale === "ur") return ur || ar;
  if (locale === "fr") return fr || en;
  if (locale === "es") return es || en;
  return en;
}

function categoryName(locale: Language, slug: string) {
  const category = CATEGORIES.find((item) => item.slug === slug);
  if (!category) return slug;

  if (locale === "ar") return category.ar;
  if (locale === "ur") return category.ur;
  if (locale === "fr") return category.fr;
  if (locale === "es") return category.es;
  return category.en;
}

export default function ProductsPageClient({ locale }: ProductsPageClientProps) {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const t = getTranslation(locale);
  const categoryFromQuery = searchParams?.get("category") || "";

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
  }, [locale, filteredProducts, loading]);

  useEffect(() => {
    setSelectedCategory(categoryFromQuery);
  }, [categoryFromQuery]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    let next = products;

    if (selectedCategory) {
      next = next.filter((product) => product.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      next = next.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          (product.shortDescription || "").toLowerCase().includes(query)
      );
    }

    setFilteredProducts(next);
  }, [products, searchQuery, selectedCategory]);

  const totalItems = products.length || 320;
  const selectedCategoryName = selectedCategory ? categoryName(locale, selectedCategory) : null;

  function selectCategory(slug: string) {
    setSelectedCategory(slug);
    setTimeout(() => {
      document.getElementById("product-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  return (
    <div className={styles.page}>


      <section className={styles.showcaseSection}>
        <div className={`${styles.sectionHeading} ${styles.reveal} ${styles.revealUp}`}>
          <div>
            <span className={styles.eyebrow}>{text(locale, "الأقسام الرئيسية", "Main Categories", "Catégories Principales", "اہم اقسام", "Categorías Principales")}</span>
            <h2 className={styles.sectionTitle}>{text(locale, "استعرض مجموعات المنتجات", "Browse Product Collections", "Parcourir les Collections", "مصنوعات کے مجموعے براؤز کریں", "Explorar Colecciones de Productos")}</h2>
          </div>
        </div>

        <div className={styles.categoryGrid}>
          {SHOWCASE_CARDS.map((card, index) => {
            const liveCount = products.filter((product) => product.category === card.filterSlug).length;
            const count = liveCount || card.count;

            return (
              <button
                key={card.id}
                type="button"
                className={`${styles.categoryCard} ${selectedCategory === card.filterSlug ? styles.categoryCardActive : ""} ${styles.reveal} ${styles.revealScale} ${styles["stagger" + ((index % 4) + 1)]}`}
                onClick={() => selectCategory(card.filterSlug)}
              >
                <div className={styles.categoryImageWrap}>
                  <SmartImage
                    src={card.image}
                    fallback={card.fallback}
                    alt={text(locale, card.arTitle, card.enTitle, card.frTitle, card.urTitle, card.esTitle)}
                    className={styles.categoryImage}
                  />
                  <span className={styles.categoryCount}>
                    +{count} {text(locale, "صنف", "items", "articles", "اشیاء", "artículos")}
                  </span>
                  <div className={styles.categoryOverlay}>
                    <h3 className={styles.categoryTitle}>
                      {text(locale, card.arTitle, card.enTitle, card.frTitle, card.urTitle, card.esTitle)} <span className={styles.categoryIcon}>{card.icon}</span>
                    </h3>
                  </div>
                </div>

                <div className={styles.categoryBody}>
                  <p className={styles.categoryDesc}>{text(locale, card.arDesc, card.enDesc, card.frDesc, card.urDesc, card.esDesc)}</p>
                  <span className={styles.categoryAction}>{text(locale, "عرض المنتجات", "Browse Products", "Parcourir les Produits", "مصنوعات دیکھیں", "Explorar Productos")} &#8592;</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section id="product-results" className={styles.resultsSection}>
        <div className={`${styles.resultsHeader} ${styles.reveal} ${styles.revealUp}`}>
          <div>
            <span className={styles.eyebrow}>{text(locale, "نتائج الكتالوج", "Catalog Results", "Résultats du Catalogue", "کیٹلاگ کے نتائج", "Resultados del Catálogo")}</span>
            <h2 className={styles.resultsTitle}>
              {selectedCategoryName || text(locale, "كل المنتجات", "All Products", "Tous les Produits", "تمام مصنوعات", "Todos los Productos")}
            </h2>
            <p className={styles.resultsLead}>
              {selectedCategoryName
                ? text(
                    locale,
                    `نتائج مفلترة ضمن ${selectedCategoryName}.`,
                    `Filtered results in ${selectedCategoryName}.`,
                    `Résultats filtrés dans ${selectedCategoryName}.`,
                    `${selectedCategoryName} میں فلٹر شدہ نتائج۔`,
                    `Resultados filtrados en ${selectedCategoryName}.`
                  )
                : text(
                    locale,
                    "ابحث أو صف بحسب الفئة للوصول إلى المنتجات المناسبة بسرعة.",
                    "Search or filter by category to find the right products faster.",
                    "Recherchez ou filtrez par catégorie pour trouver les bons produits plus rapidement.",
                    "صحیح مصنوعات کو تیزی سے تلاش کرنے کے لیے زمرہ کے لحاظ سے تلاش کریں یا فلٹر کریں۔",
                    "Busque o filtre por categoría para encontrar los productos adecuados más rápido."
                  )}
            </p>
          </div>

          <input
            type="text"
            placeholder={t.products.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchBar}
          />
        </div>

        <div className={styles.filterChips}>
          <button
            type="button"
            className={`${styles.filterChip} ${selectedCategory === "" ? styles.filterChipActive : ""}`}
            onClick={() => setSelectedCategory("")}
          >
            {text(locale, "الكل", "All", "Tout", "سب", "Todo")}
          </button>

          {CATEGORIES.map((category) => (
            <button
              key={category.slug}
              type="button"
              className={`${styles.filterChip} ${selectedCategory === category.slug ? styles.filterChipActive : ""}`}
              onClick={() => setSelectedCategory(category.slug)}
            >
              {categoryName(locale, category.slug)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className={styles.loadingState}>{text(locale, "جاري تحميل المنتجات...", "Loading products...", "Chargement des produits...", "مصنوعات لوڈ ہو رہی ہیں...", "Cargando productos...")}</div>
        ) : filteredProducts.length > 0 ? (
          <div className={styles.productGrid}>
            {filteredProducts.map((product, index) => {
              const localProd = getLocalizedProduct(product, locale);
              return (
                <article
                  key={product._id.toString()}
                  className={`${styles.productCard} ${styles.reveal} ${styles.revealScale} ${styles["stagger" + ((index % 4) + 1)]}`}
                >
                  <div className={styles.productImageContainer}>
                    <SmartImage
                      src={product.image || CATEGORY_VISUALS[product.category]?.src || CATEGORY_VISUALS.nuts.src}
                      fallback={CATEGORY_VISUALS[product.category]?.fallback || CATEGORY_VISUALS.nuts.fallback}
                      alt={localProd.name}
                      className={styles.productImage}
                    />
                    <span className={styles.productCategory}>{categoryName(locale, product.category)}</span>
                  </div>
                  <div className={styles.productBody}>
                    <h3 className={styles.productName}>{localProd.name}</h3>
                    <p className={styles.productDescription}>{localProd.shortDescription || localProd.description}</p>

                    <div className={styles.productMeta}>
                      <span className={styles.productPackaging}>{localProd.packaging || text(locale, "تعبئة متعددة", "Flexible packaging", "Emballage flexible", "لچکدار پیکیجنگ", "Embalaje flexible")}</span>
                      <Link href={`/${locale}/products/${product.slug}`} className={styles.productCta}>
                        {text(locale, "عرض التفاصيل", "View Details", "Voir les Détails", "تفصیلات دیکھیں", "Ver Detalles")} &#8592;
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.noProducts}>
            <h3 className={styles.noProductsTitle}>{text(locale, "لم نجد منتجات مطابقة", "No matching products found", "Aucun produit correspondant trouvé", "کوئی مماثل مصنوعات نہیں ملی", "No se encontraron productos coincidentes")}</h3>
            <p className={styles.noProductsText}>
              {text(
                locale,
                "جرّب تغيير البحث أو اختيار فئة مختلفة، أو تواصل معنا لنوفر لك المنتج المطلوب.",
                "Try another search or category, or contact us and we will source the product for you.",
                "Essayez une autre recherche ou catégorie, ou contactez-nous et nous trouverons le produit pour vous.",
                "کوئی دوسرا تلاش یا زمرہ آزمائیں، یا ہم سے رابطہ کریں اور ہم آپ کے لیے پروڈکٹ فراہم کریں گے۔",
                "Intente otra búsqueda o categoría, o contáctenos y buscaremos el producto por usted."
              )}
            </p>
            <Link href={`/${locale}/contact`} className={styles.noProductsAction}>
              {text(locale, "تواصل معنا", "Contact Us", "Contactez-nous", "ہم سے رابطہ کریں", "Contáctenos")}
            </Link>
          </div>
        )}
      </section>

      <section className={`${styles.ctaBand} ${styles.reveal} ${styles.revealScale}`}>
        <h2 className={styles.ctaBandTitle}>{text(locale, "هل تبحث عن منتج معين؟", "Looking for a specific product?", "Vous recherchez un produit spécifique ?", "کیا آپ کسی خاص پروڈکٹ کو تلاش کر رہے ہیں؟", "¿Busca un producto específico?")}</h2>
        <p className={styles.ctaBandText}>
          {text(
            locale,
            "تواصل معنا مباشرة على واتساب وسنوفر لك ما تحتاجه.",
            "Message us directly on WhatsApp and we will help you source it.",
            "Envoyez-nous un message directement sur WhatsApp et nous vous aiderons à le trouver.",
            "ہمیں براہ راست واٹس ایپ پر پیغام بھیجیں اور ہم اسے حاصل کرنے میں آپ کی مدد کریں گے۔",
            "Envíenos un mensaje directamente por WhatsApp y le ayudaremos a conseguirlo."
          )}
        </p>
        <Link href={`/${locale}/contact`} className={styles.ctaBandButton}>
          {text(locale, "تواصل معنا الآن", "Contact Us Now", "Contactez-nous Maintenant", "ابھی ہم سے رابطہ کریں", "Contáctenos Ahora")}
        </Link>
      </section>
    </div>
  );
}
