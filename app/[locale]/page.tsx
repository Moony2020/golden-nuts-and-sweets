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
  {
    slug: "sweets",
    img: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&q=80",
    title: {
      ar: "حلويات وملبسات",
      en: "Sweets & Confectionery",
      ur: "مٹھائیاں اور مٹھائیاں",
      fr: "Confiseries & Bonbons",
      es: "Dulces y Confitería"
    },
    desc: {
      ar: "دراجيه بالشوكولا، راحة ونوكا، ملبس، حلويات شرقية بأنواعها",
      en: "Chocolate dragées, Turkish delight, nougat, malban, assorted oriental sweets.",
      ur: "چاکلیٹ ڈریجی، ترکی کی خوشی، نوگٹ، ملبان، مختلف مشرقی مٹھائیاں۔",
      fr: "Dragées au chocolat, loukoum, nougat, malban, assortiment de pâtisseries orientales.",
      es: "Grageas de chocolate, delicias turcas, turrón, malban, dulces orientales variados."
    }
  },
  {
    slug: "spices",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    title: {
      ar: "بهارات وتوابل",
      en: "Spices & Seasonings",
      ur: "مصالحہ جات",
      fr: "Épices & Condiments",
      es: "Especias y Condimentos"
    },
    desc: {
      ar: "بهارات كاملة ومطحونة، كمون، كزبرة، فلفل، قرفة، هيل، زعفران وأكثر",
      en: "Whole and ground spices, cumin, coriander, pepper, cinnamon, cardamom, saffron, and more.",
      ur: "صابت اور پسی ہوئی مصالحے، زیرہ، دھنیا، کالی مرچ، دار چینی، الائچی، زعفران اور بہت کچھ۔",
      fr: "Épices entières et moulues, cumin, coriandre, poivre, cannelle, cardamome, safran, etc.",
      es: "Especias enteras y molidas, comino, cilantro, pimienta, canela, cardamomo, azafrán y más."
    }
  },
  {
    slug: "nuts",
    img: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80",
    title: {
      ar: "مكسرات ومحمصات",
      en: "Nuts & Roasters",
      ur: "گری دار میوے اور بھنے ہوئے",
      fr: "Noix & Torréfaction",
      es: "Nueces y Tostados"
    },
    desc: {
      ar: "كاجو، لوز، فستق، جوز، بندق، فول سوداني محمص وجميع أنواع المكسرات",
      en: "Cashews, almonds, pistachios, walnuts, hazelnuts, roasted peanuts, and all types of nuts.",
      ur: "کاجو، بادام، پستہ، اخروٹ، ہیزل نٹ، بھنی ہوئی مونگ پھلی، اور تمام قسم کے گری دار میوے۔",
      fr: "Noix de cajou, amandes, pistaches, noix, noisettes, cacahuètes grillées et tous types de noix.",
      es: "Anacardos, almendras, pistachos, nueces, avellanas, cacahuetes tostados y todo tipo de frutos secos."
    }
  },
  {
    slug: "grains",
    img: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80",
    title: {
      ar: "حبوب وبقول",
      en: "Grains & Pulses",
      ur: "اناج اور دالیں",
      fr: "Céréales & Légumineuses",
      es: "Cereales y Legumbres"
    },
    desc: {
      ar: "أرز، عدس، حمص، فول، قمح وجميع أنواع الحبوب والبقول المختارة",
      en: "Rice, lentils, chickpeas, fava beans, wheat, and all kinds of selected grains and pulses.",
      ur: "چاول، دالیں، چنے، باقلا، گندم، اور ہر قسم کے منتخب اناج اور دالیں۔",
      fr: "Riz, lentilles, pois chiches, fèves, blé et toutes sortes de céréales et légumineuses sélectionnées.",
      es: "Arroz, lentejas, garbanzos, habas, trigo y todo tipo de cereales y legumbres seleccionadas."
    }
  },
  {
    slug: "foodstuffs",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    title: {
      ar: "مواد غذائية متنوعة",
      en: "Various Foodstuffs",
      ur: "متنوعہ اشیائے خوردونوش",
      fr: "Aliments Divers",
      es: "Alimentos Varios"
    },
    desc: {
      ar: "زيوت، سكر، دقيق، معلبات، مواد تبريد ومجمدة وكل ما تحتاجه",
      en: "Oils, sugar, flour, canned goods, chilled and frozen foodstuffs, and everything you need.",
      ur: "تیل، چینی، آٹا، ڈبہ بند اشیاء، ٹھنڈی اور منجمد اشیائے خوردونوش، اور آپ کی ضرورت کی هر چیز۔",
      fr: "Huiles, sucre, farine, conserves, produits frais et surgelés, et tout ce dont vous avez besoin.",
      es: "Aceites, azúcar, harina, conservas, alimentos refrigerados y congelados, y todo lo que necesita."
    }
  },
  {
    slug: "mate",
    img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
    title: {
      ar: "متة خارطة",
      en: "Kharta Yerba Mate",
      ur: "خارطہ میٹ",
      fr: "Maté Kharta",
      es: "Mate Kharta"
    },
    desc: {
      ar: "جميع أنواع متة خارطة الخضراء - الماركة الأصلية المعتمدة بأحجام مختلفة",
      en: "All kinds of Kharta Green Yerba Mate - the certified original brand in various sizes.",
      ur: "خارطہ گرین میٹ کی تمام اقسام - مختلف سائز میں تصدیق شدہ اصل برانڈ۔",
      fr: "Toutes les variétés de Maté Vert Kharta - la marque originale certifiée en différentes tailles.",
      es: "Todo tipo de Mate Verde Kharta: la marca original certificada en varios tamaños."
    },
    badge: {
      ar: "مستورد وموزع",
      en: "Importer & Distributor",
      ur: "درآمد کنندہ اور ڈسٹری بیوٹر",
      fr: "Importateur & Distributeur",
      es: "Importador y Distribuidor"
    }
  },
  {
    slug: "coffee",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
    title: {
      ar: "قهوة وشاي",
      en: "Coffee & Tea",
      ur: "کافی اور چائے",
      fr: "Café & Thé",
      es: "Café y Té"
    },
    desc: {
      ar: "قهوة عربية وتركية وإسبريسو، شاي أسود وأخضر، مشروبات ساخنة متنوعة",
      en: "Arabic, Turkish, and espresso coffee, black and green tea, and assorted hot drinks.",
      ur: "عربی، ترکی، اور ایسپریسو کافی، کالی اور ہری چائے، اور مختلف گرم مشروبات۔",
      fr: "Café arabe, turc et expresso, thé noir et vert, et boissons chaudes assorties.",
      es: "Café árabe, turco y espresso, té negro y verde, y bebidas calientes variadas."
    }
  },
  {
    slug: "dried_fruits",
    img: "https://images.unsplash.com/photo-1608797178974-15b35a61d121?auto=format&fit=crop&w=600&q=80",
    title: {
      ar: "فواكه مجففة",
      en: "Dried Fruits",
      ur: "خشک میوہ جات",
      fr: "Fruits Secs",
      es: "Frutas Secas"
    },
    desc: {
      ar: "تين، مشمش، زبيب، برقوق، تمر، توت مجفف وتشكيلة واسعة",
      en: "Figs, apricots, raisins, prunes, dates, dried berries, and a wide selection.",
      ur: "انجیر، خوبانی، کشمش، آلو بخارا، کھجور، خشک بیر، اور ایک وسیع انتخاب۔",
      fr: "Figues, abricots, raisins, pruneaux, dattes, baies séchées et large sélection.",
      es: "Higos, albaricoques, pasas, ciruelas pasas, dátiles, bayas secas y una amplia selección."
    }
  }
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

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      initials: "س.ب",
      name: label(locale, "سامي البلوشي", "Sami Al Balooshi", { ur: "سامی البلوشی" }),
      title: label(locale, "مدير عام", "General Manager", { ur: "جنرل مینیجر" }),
      location: label(locale, "أبوظبي - المصفح", "Abu Dhabi - Mussafah", { ur: "ابوظہبی - المصفح" }),
      since: "2015",
      activity: label(locale, "مستورد وموزع جملة - الخليج", "Importer & Wholesale Distributor - Gulf", { ur: "درآمد کنندہ اور ہول سیل ڈسٹری بیوٹر - خلیج" }),
      quote: label(
        locale,
        "\"عشر سنوات من الشراكة مع العدل. بدأنا بحاوية واحدة شهرياً، واليوم نستورد 15 حاوية شهرياً ونوزع على أكثر من 200 عميل في الإمارات والكويت والبحرين. ووفرنا 30% مقارنة بالاستيراد المباشر\"",
        "\"Ten years of partnership with Al Adel. We started with one container per month, and today we import 15 containers per month and distribute to over 200 clients in the UAE, Kuwait, and Bahrain. We saved 30% compared to direct importing.\"",
        {
          ur: "\"العدل کے ساتھ شراکت کے دس سال۔ ہم نے ہر ماہ ایک کنٹینر سے شروعات کی تھی، اور آج ہم ماہانہ 15 کنٹینرز درآمد کرتے ہیں اور متحدہ عرب امارات، کویت اور بحرین میں 200 سے زائد کلائنٹس کو تقسیم کرتے ہیں۔ ہم نے براہ راست درآمد کے مقابلے میں 30 فیصد بچت کی ہے۔\"",
          fr: "\"Dix ans de partenariat avec Al Adel. Nous avons commencé avec un conteneur par mois, et aujourd'hui nous importons 15 conteneurs par mois et distribuons à plus de 200 clients aux EAU, au Koweït et à Bahreïn. Nous avons économisé 30% par rapport à l'importation directe.\"",
          es: "\"Diez años de asociación con Al Adel. Comenzamos con un contenedor por mes, y hoy importamos 15 contenedores por mes y distribuimos a más de 200 clientes en los EAU, Kuwait y Bahrein. Ahorramos un 30% en comparación con la importación directa.\""
        }
      ),
      badge: label(locale, "15 حاوية شهرياً — +200 عميل في الخليج", "15 Containers/Mo — +200 Clients in Gulf", {
        ur: "15 کنٹینر ماہانہ — خلیج میں +200 گاہک",
        fr: "15 Conteneurs/Mois — +200 Clients dans le Golfe",
        es: "15 Contenedores/Mes — +200 Clientes en el Golfo"
      }),
      stats: [
        { value: "+200", label: label(locale, "طلبات شهرياً", "Monthly Orders", { ur: "ماہانہ آرڈرز" }) },
        { value: "30%", label: label(locale, "توفير في التكاليف", "Cost Savings", { ur: "اخراجات کی بچت" }) },
        { value: "10", label: label(locale, "سنوات شراكة", "Years of Partnership", { ur: "شراکت داری کے سال" }) },
      ]
    },
    {
      initials: "ف.ع",
      name: label(locale, "فيصل العتيبي", "Faisal Al Otaibi", { ur: "فیصل العتیبی" }),
      title: label(locale, "مدير المشتريات", "Procurement Director", { ur: "ڈائریکٹر خریدار" }),
      location: label(locale, "الرياض - السلي", "Riyadh - Al Sulai", { ur: "ریاض - السلی" }),
      since: "2018",
      activity: label(locale, "سلسلة سوبرماركت - السعودية", "Supermarket Chain - KSA", { ur: "سپر مارکیٹ چین - سعودی عرب" }),
      quote: label(
        locale,
        "\"الجودة العالية والثبات في التوريد هما أهم ما يميز شركة العدل. نعتمد عليهم بشكل كامل لتأمين حصتنا السنوية من المكسرات والبهارات لجميع فروعنا في المملكة.\"",
        "\"High quality and consistency in supply are what characterize Al Adel. We rely on them completely to secure our annual share of nuts and spices for all our branches in the Kingdom.\"",
        {
          ur: "\"سپلائی میں اعلیٰ معیار اور تسلسل ہی العدل کی پہچان ہے۔ ہم پورے مملکت میں اپنی تمام شاخوں کے لیے گری دار میوے اور مصالحہ جات کا اپنا سالانہ حصہ حاصل کرنے کے لیے ان پر مکمل انحصار کرتے ہیں۔\"",
          fr: "\"La haute qualité et la régularité de l'approvisionnement sont ce qui caractérise Al Adel. Nous comptons entièrement sur eux pour sécuriser notre part annuelle de noix et d'épices pour toutes nos succursales dans le Royaume.\"",
          es: "\"La alta calidad y la consistencia en el suministro son lo que caracteriza a Al Adel. Confiamos en ellos por completo para asegurar nuestra participación anual de nueces y especias para todas nuestras sucursales en el Reino.\""
        }
      ),
      badge: label(locale, "تغطية 45 فرعاً — جودة غذائية مضمونة", "45 Branches Covered — Guaranteed Food Quality", {
        ur: "45 شاخیں کور کی گئیں — گارنٹی شدہ خوراک کا معیار",
        fr: "45 Succursales Couvertes — Qualité Alimentaire Garantie",
        es: "45 Sucursales Cubiertas — Calidad de Alimentos Garantizada"
      }),
      stats: [
        { value: "+150", label: label(locale, "طلبات شهرياً", "Monthly Orders", { ur: "ماہانہ آرڈرز" }) },
        { value: "25%", label: label(locale, "نمو المبيعات", "Sales Growth", { ur: "فروخت في المبيعات" }) },
        { value: "8", label: label(locale, "سنوات شراكة", "Years of Partnership", { ur: "شراکت داری کے سال" }) },
      ]
    },
    {
      initials: "م.ر",
      name: label(locale, "محمد رضا", "Mohamed Reda", { ur: "محمد رضا" }),
      title: label(locale, "المدير التنفيذي", "Executive Director", { ur: "ایگزیکٹو ڈائریکٹر" }),
      location: label(locale, "دبي - ديرة", "Dubai - Deira", { ur: "دبئی - دیرہ" }),
      since: "2020",
      activity: label(locale, "شركة كيتيرينغ وتعبئة", "Catering & Packing Co.", { ur: "کیٹرنگ اور پیکیجنگ کمپنی" }),
      quote: label(
        locale,
        "\"من خلال التعاون مع العدل في التعبئة الخاصة بعلامتنا، استطعنا مضاعفة مبيعاتنا والوصول لأسواق جديدة بفضل الجودة الفائقة والتصميم الاحترافي.\"",
        "\"Through collaboration with Al Adel for our private label packing, we were able to double our sales and reach new markets thanks to the superior quality and professional packaging.\"",
        {
          ur: "\"اپنے پرائیویٹ لیبل پیکیجنگ کے لیے العدل کے ساتھ تعاون کے ذریعے، ہم اعلیٰ معیار اور پیشہ ورانہ پیکیجنگ کی بدولت اپنی فروخت کو دوگنا کرنے اور نئی مارکیٹوں تک پہنچنے میں کامیاب رہے۔\"",
          fr: "\"Grâce à la collaboration avec Al Adel pour l'emballage de notre marque propre, nous avons pu doubler nos ventes et atteindre de nouveaux marchés grâce à une qualité supérieure et un emballage professionnel.\"",
          es: "\"A través de la colaboración con Al Adel para el envasado de nuestra marca privada, pudimos duplicar nuestras ventas y llegar a nuevos mercados gracias a la calidad superior y el embalaje profesional.\""
        }
      ),
      badge: label(locale, "علامة تجارية خاصة — نمو متسارع", "Private Label — Rapid Growth", {
        ur: "پرائیویٹ لیبل — تیز رفتار ترقی",
        fr: "Marque Propre — Croissance Rapide",
        es: "Marca Privada — Crecimiento Rápido"
      }),
      stats: [
        { value: "+100", label: label(locale, "طلبات شهرياً", "Monthly Orders", { ur: "ماہانہ آرڈرز" }) },
        { value: "40%", label: label(locale, "توفير التكاليف", "Cost Savings", { ur: "لاگت کی بچت" }) },
        { value: "6", label: label(locale, "سنوات شراكة", "Years of Partnership", { ur: "شراکت داری کے سال" }) },
      ]
    },
    {
      initials: "أ.ك",
      name: label(locale, "أحمد كمال", "Ahmed Kamal", { ur: "احمد کمال" }),
      title: label(locale, "مدير العمليات", "Operations Manager", { ur: "آپریشنز مینیجر" }),
      location: label(locale, "المنامة - الحد", "Manama - Hidd", { ur: "منامہ - الحد" }),
      since: "2021",
      activity: label(locale, "توزيع مواد غذائية - البحرين", "Food Distribution - Bahrain", { ur: "فوڈ ڈسٹری بیوشن - بحرین" }),
      quote: label(
        locale,
        "\"الالتزام التام بمواعيد الشحن والتخليص الجمركي يسهل عملنا جداً. شحناتنا تصل دائماً في الوقت المحدد وبحالة ممتازة دون أي تلف.\"",
        "\"Full commitment to shipping schedules and customs clearance makes our job very easy. Our shipments always arrive on time and in perfect condition without any damage.\"",
        {
          ur: "\"شپنگ کے نظام الاوقات اور کسٹمز کلیئرنس کے لیے مکمل عزم ہمارے کام کو بہت آسان بنا دیتا ہے۔ ہماری ترسيليں ہمیشہ وقت پر اور بغیر کسی نقصان کے کامل حالت میں پہنچتی ہے۔\"",
          fr: "\"Le plein engagement envers les calendriers d'expédition et le dédouanement rend notre travail très facile. Nos expéditions arrivent toujours à temps et en parfait état sans aucun dommage.\"",
          es: "\"El compromiso total con los horarios de envío y el despacho de aduanas facilita mucho nuestro trabajo. Nuestros envíos siempre llegan a tiempo y en perfectas condiciones sin ningún daño.\""
        }
      ),
      badge: label(locale, "شحن ملتزم 100% — سلاسل توريد آمنة", "100% Committed Shipping — Secure Supply Chains", {
        ur: "100% پرعزم شپنگ — محفوظ سپلائی چینز",
        fr: "Expédition Engagée à 100% — Chaînes d'Approvisionnement Sécurisées",
        es: "Envío Comprometido al 100% — Cadenas de Suministro Seguras"
      }),
      stats: [
        { value: "+80", label: label(locale, "طلبات شهرياً", "Monthly Orders", { ur: "ماہانہ آرڈرز" }) },
        { value: "15%", label: label(locale, "وفر لوجستي", "Logistics Savings", { ur: "لاجسٹکس کی بچت" }) },
        { value: "5", label: label(locale, "سنوات شراكة", "Years of Partnership", { ur: "شراکت داری کے سال" }) },
      ]
    }
  ];

  const countries = [
    {
      code: "TR",
      name: label(locale, "تركيا", "Turkey", { ur: "ترکی" }),
      products: label(locale, "المكسرات، الفواكه المجففة، البهارات", "Nuts, Dried Fruits, Spices", { ur: "گری دار میوے، خشک میوہ جات، مصالحے" })
    },
    {
      code: "IN",
      name: label(locale, "الهند", "India", { ur: "بھارت" }),
      products: label(locale, "البهارات، الأرز، العدس", "Spices, Rice, Lentils", { ur: "مصالحے، چاول، دالیں" })
    },
    {
      code: "AR",
      name: label(locale, "الأرجنتين", "Argentina", { ur: "ارجنٹائن" }),
      products: label(locale, "المتة، الصويا", "Yerba Mate, Soy", { ur: "میٹھے، سویا" })
    },
    {
      code: "BR",
      name: label(locale, "البرازيل", "Brazil", { ur: "برازیل" }),
      products: label(locale, "القهوة، المكسرات، السكر", "Coffee, Nuts, Sugar", { ur: "کافی، گری دار میوے، چینی" })
    },
    {
      code: "IR",
      name: label(locale, "إيران", "Iran", { ur: "ایران" }),
      products: label(locale, "الزعفران، الفستق، الزبيب", "Saffron, Pistachios, Raisins", { ur: "زعفران، پستہ، کشمش" })
    },
    {
      code: "SY",
      name: label(locale, "سوريا", "Syria", { ur: "شام" }),
      products: label(locale, "البهارات، الأعشاب، البقوليات", "Spices, Herbs, Legumes", { ur: "مصالحے، جڑی بوٹیاں، پھلیاں" })
    },
    {
      code: "PK",
      name: label(locale, "باكستان", "Pakistan", { ur: "پاکستان" }),
      products: label(locale, "الأرز، السمسم، العدس", "Rice, Sesame, Lentils", { ur: "چاول، تل، دالیں" })
    },
    {
      code: "VN",
      name: label(locale, "فيتنام", "Vietnam", { ur: "ویتنام" }),
      products: label(locale, "الكاجو، الفلفل الأسود", "Cashew, Black Pepper", { ur: "کاجو، کالی مرش" })
    },
    {
      code: "LK",
      name: label(locale, "سريلانكا", "Sri Lanka", { ur: "سری لنکا" }),
      products: label(locale, "القرفة، الشاي، القرنفل", "Cinnamon, Tea, Cloves", { ur: "دار چینی، چائے، لونگ" })
    },
    {
      code: "US",
      name: label(locale, "أمريكا", "United States", { ur: "امریکہ" }),
      products: label(locale, "اللوز، الجوز", "Almonds, Walnuts", { ur: "بادام، اخروٹ" })
    }
  ];

  const sourcingStats = [
    label(locale, "+20 دولة مصدر", "+20 Source Countries", { ur: "+20 درآمدی ممالک" }),
    label(locale, "1937 عام التأسيس", "Established since 1937", { ur: "1937 قیام کا سال" }),
    label(locale, "4 مستودعات متخصصة", "4 Specialized Warehouses", { ur: "4 خصوصی گودام" }),
    label(locale, "100% فحص مباشر من المصدر", "100% Direct Sourcing Inspection", { ur: "ماخذ پر 100٪ معائنہ" }),
    label(locale, "رخصة تجارية معتمدة", "Licensed Trading Entity", { ur: "مصدقہ تجارتی لائسنس" }),
    label(locale, "تغطية كاملة للإمارات", "Full UAE Coverage", { ur: "پورے امارات میں کوریج" }),
    label(locale, "%100 جودة مضمونة", "100% Quality Assured", { ur: "100٪ معیاری ضمانت" }),
    label(locale, "+25,000 عميل راضٍ", "+25,000 Happy Clients", { ur: "+25,000 مطمئن گاہک" }),
  ];

  const tickerCopies = [0, 1, 2, 3];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };



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
            <div key={`orig-${i}`} className={styles.feature}>
              <strong className={styles.featureValue}>{s.value}</strong>
              <span className={styles.featureLabel}>{s.desc}</span>
            </div>
          ))}
          {stats.map((s, i) => (
            <div key={`dup1-${i}`} className={`${styles.feature} ${styles.duplicateFeature}`}>
              <strong className={styles.featureValue}>{s.value}</strong>
              <span className={styles.featureLabel}>{s.desc}</span>
            </div>
          ))}
          {stats.map((s, i) => (
            <div key={`dup2-${i}`} className={`${styles.feature} ${styles.duplicateFeature}`}>
              <strong className={styles.featureValue}>{s.value}</strong>
              <span className={styles.featureLabel}>{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <section className={styles.partnersSection}>
        <div className={`${styles.sectionHeaderCentered} ${styles.reveal} ${styles.revealUp}`}>
          <span className={styles.sectionEyebrow}>
            {label(locale, "من نخدم", "Who We Serve", {
              ur: "ہم کس کی خدمت کرتے ہیں",
              fr: "Qui Nous Servons",
              es: "A Quiénes Servimos"
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
              {label(locale, "منتجاتنا", "Our Products", {
                ur: "ہماری مصنوعات",
                fr: "Nos Produits",
                es: "Nuestros Productos"
              })}
            </span>
            <h2 className={styles.sectionTitle}>
              {locale === "ar" ? (
                <>
                  تشكيلة واسعة <span className={styles.goldText}>من أجود المواد الغذائية</span>
                </>
              ) : (
                <>
                  A Wide Selection <span className={styles.goldText}>of Premium Foodstuffs</span>
                </>
              )}
            </h2>
            <p className={styles.sectionSubtitle}>
              {label(
                locale,
                "نوفر أكثر من 1,000 صنف من المواد الغذائية عالية الجودة لعملائنا في قطاع الأعمال",
                "We provide over 1,000 items of high-quality foodstuff for our business clients.",
                {
                  ur: "ہم اپنے کاروباری گاہکوں کے لیے 1,000 سے زائد اعلیٰ معیار کی اشیائے خورونوش فراہم کرتے ہیں۔",
                  fr: "Nous fournissons plus de 1 000 articles alimentaires de haute qualité à nos clients professionnels.",
                  es: "Ofreccemos más de 1,000 artículos de alimentos de alta calidad para nuestros clientes comerciales."
                }
              )}
            </p>
          </div>
          <Link href={`/${locale}/products`} className={styles.sectionLink}>
            {label(locale, "عرض كل المنتجات", "View All Products")} <span>←</span>
          </Link>
        </div>

        <div className={styles.categoriesGrid}>
          {FEATURED_CATEGORIES.map((cat, index) => {
            const catTitle = cat.title[locale as keyof typeof cat.title] ?? cat.title.en;
            const catDesc = cat.desc[locale as keyof typeof cat.desc] ?? cat.desc.en;
            const catBadge = cat.badge ? (cat.badge[locale as keyof typeof cat.badge] ?? cat.badge.en) : null;
            const isEven = index % 2 === 0;

            return (
              <div
                key={cat.slug}
                className={`${styles.categoryCard} ${styles.reveal} ${isEven ? styles.revealLeft : styles.revealRight} ${styles["stagger" + ((index % 4) + 1)]}`}
              >
                <div className={styles.categoryImageContainer}>
                  <SmartImage
                    src={cat.img}
                    fallback={CATEGORY_FALLBACK[cat.slug] ?? IMG.nuts.fallback}
                    alt={catTitle}
                    className={styles.categoryImage}
                  />
                  {catBadge && (
                    <span className={styles.categoryBadgeOverlay}>{catBadge}</span>
                  )}
                  <div className={styles.categoryImageOverlay}>
                    <h3 className={styles.categoryTitle}>{catTitle}</h3>
                  </div>
                </div>
                <div className={styles.categoryContent}>
                  <p className={styles.categoryDescription}>{catDesc}</p>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                      locale === "ar"
                        ? `مرحباً، أود الاستفسار عن منتجات قسم: ${catTitle}`
                        : `Hello, I would like to inquire about products in category: ${catTitle}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.categoryWhatsAppBtn}
                  >
                    <svg className={styles.waIconMini} viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.975 14.068.953 11.5.953c-5.44 0-9.865 4.371-9.87 9.802 0 1.696.449 3.353 1.302 4.811L1.95 21.056l5.7-1.493l-.003-.008zM17.47 14.397c-.3-.149-1.777-.878-2.042-.976-.264-.099-.456-.149-.648.149-.191.298-.741.976-.909 1.17-.168.196-.336.223-.637.074-.3-.149-1.265-.466-2.41-1.487-.89-.794-1.49-1.776-1.664-2.075-.175-.299-.019-.461.13-.609.135-.133.301-.351.451-.527.15-.176.2-.299.3-.499.1-.2.05-.376-.025-.524-.075-.15-.648-1.561-.889-2.141-.235-.568-.475-.49-.648-.499-.166-.008-.356-.01-.545-.01-.189 0-.498.07-.759.351-.26.281-1.002.978-1.002 2.385s1.02 2.761 1.162 2.951c.143.19 2.006 3.064 4.859 4.29c.679.29 1.209.465 1.623.596.682.217 1.3.187 1.79.114.545-.081 1.777-.727 2.027-1.43c.25-.702.25-1.303.175-1.43-.075-.126-.27-.201-.57-.35z"/>
                    </svg>
                    <span>{label(locale, "اطلب الآن عبر واتساب", "Order now via WhatsApp", { ur: "ابھی واٹس ایپ پر آرڈر کریں" })}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 02 - Kharta Yerba Mate Section */}
      <section className={styles.mateSection}>
        <div className={styles.mateContainer}>
          {/* Left Column (Product Gallery Collage) */}
          <div className={`${styles.mateGalleryCol} ${styles.reveal} ${styles.revealLeft}`}>
            <div className={styles.mateGrid}>
              {[
                "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=300&q=80",
                "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=300&q=80",
                "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=300&q=80",
                "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=300&q=80",
                "https://images.unsplash.com/photo-1627485601819-72c7b1150f75?auto=format&fit=crop&w=300&q=80",
                "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=300&q=80",
                "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80",
                "https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&w=300&q=80"
              ].map((img, idx) => (
                <div key={idx} className={styles.mateGridItem}>
                  <SmartImage
                    src={img}
                    fallback={IMG.coffee.fallback}
                    alt="Kharta Yerba Mate Pack"
                    className={styles.mateGridImg}
                  />
                </div>
              ))}
            </div>
            <div className={styles.mateBottomBanner}>
              <SmartImage
                src="https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80"
                fallback={IMG.grains.fallback}
                alt="Yerba Mate Shelf Selection"
                className={styles.mateBannerImg}
              />
            </div>
          </div>

          {/* Right Column (Text & Bullets) */}
          <div className={`${styles.mateTextCol} ${styles.reveal} ${styles.revealRight}`}>
            <span className={styles.mateGoldTag}>
              {label(locale, "★ مستورد وموزع معتمد", "★ Certified Importer & Distributor", { ur: "★ تصدیق شدہ درآمد کنندہ اور ڈسٹری بیوٹر" })}
            </span>
            <span className={styles.sectionEyebrow} style={{ marginTop: "12px" }}>
              {label(locale, "متة خارطة", "Kharta Yerba Mate", { ur: "خارطہ میٹ" })}
            </span>
            <h2 className={styles.mateMainTitle}>
              {locale === "ar" ? (
                <>
                  مستورد وموزع <span className={styles.goldText}>متة خارطة الخضراء</span>
                </>
              ) : (
                <>
                  Importer & Distributor <span className={styles.goldText}>of Kharta Yerba Mate</span>
                </>
              )}
            </h2>
            <p className={styles.mateDesc}>
              {label(
                locale,
                "نستورد ونوزع جميع أنواع وأحجام متة خارطة الخضراء الأصلية - الماركة الأكثر مبيعاً في الإمارات",
                "We import and distribute all types and sizes of original Kharta Green Yerba Mate - the best-selling brand in the UAE.",
                { ur: "ہم متحدہ عرب امارات میں سب سے زیادہ فروخت ہونے والے برانڈ - اصل خارطہ گرین میٹ کی تمام اقسام اور سائز درآمد اور تقسیم کرتے ہیں۔" }
              )}
            </p>

            <ul className={styles.mateBullets}>
              <li>{label(locale, "خارطة الخضراء الأصلية", "Original Kharta Green", { ur: "اصل خارطہ گرین" })}</li>
              <li>{label(locale, "خارطة عالية الخشونة", "Kharta High Coarseness", { ur: "خارطہ ہائی موٹائی" })}</li>
              <li>{label(locale, "خارطة بالأعشاب", "Kharta with Herbs", { ur: "جڑی بوٹیوں کے ساتھ خارطہ" })}</li>
              <li>{label(locale, "أحجام متعددة: 250g, 500g, 1kg", "Multiple sizes: 250g, 500g, 1kg", { ur: "مختلف سائز: 250 گرام، 500 گرام، 1 کلو گرام" })}</li>
            </ul>

            <a
              href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                locale === "ar"
                  ? "مرحباً، أود الطلب والاستفسار عن متة خارطة الخضراء بجميع أحجامها"
                  : "Hello, I would like to order and inquire about Kharta Yerba Mate in all sizes"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mateCtaBtn}
            >
              <svg className={styles.waIconMini} viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.975 14.068.953 11.5.953c-5.44 0-9.865 4.371-9.87 9.802 0 1.696.449 3.353 1.302 4.811L1.95 21.056l5.7-1.493l-.003-.008zM17.47 14.397c-.3-.149-1.777-.878-2.042-.976-.264-.099-.456-.149-.648.149-.191.298-.741.976-.909 1.17-.168.196-.336.223-.637.074-.3-.149-1.265-.466-2.41-1.487-.89-.794-1.49-1.776-1.664-2.075-.175-.299-.019-.461.13-.609.135-.133.301-.351.451-.527.15-.176.2-.299.3-.499.1-.2.05-.376-.025-.524-.075-.15-.648-1.561-.889-2.141-.235-.568-.475-.49-.648-.499-.166-.008-.356-.01-.545-.01-.189 0-.498.07-.759.351-.26.281-1.002.978-1.002 2.385s1.02 2.761 1.162 2.951c.143.19 2.006 3.064 4.859 4.29c.679.29 1.209.465 1.623.596.682.217 1.3.187 1.79.114.545-.081 1.777-.727 2.027-1.43c.25-.702.25-1.303.175-1.43-.075-.126-.27-.201-.57-.35z"/>
              </svg>
              <span>{label(locale, "اطلب الآن", "Order Now", { ur: "ابھی آرڈر کریں" })}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 03 - Why Choose Us Section */}
      <section className={styles.whyUsSection}>
        <div className={`${styles.sectionHeaderCentered} ${styles.reveal} ${styles.revealUp}`}>
          <span className={styles.sectionEyebrow}>
            {label(locale, "لماذا نحن", "Why Us", { ur: "ہم کیوں" })}
          </span>
          <h2 className={styles.whyUsTitle}>
            {locale === "ar" ? (
              <>
                لماذا يختارنا <span className={styles.goldText}>أكثر من 25,000 عميل راضٍ؟</span>
              </>
            ) : (
              <>
                Why Over <span className={styles.goldText}>25,000 Satisfied Clients</span> Choose Us?
              </>
            )}
          </h2>
        </div>

        <div className={styles.whyUsGrid}>
          {/* Card 1: Fast Delivery */}
          <div className={`${styles.whyCard} ${styles.reveal} ${styles.revealScale} ${styles.stagger1}`}>
            <div className={styles.whyIcon}>🚚</div>
            <h3 className={styles.whyCardTitle}>
              {label(locale, "توصيل سريع", "Fast Delivery", { ur: "تیز ترسیل" })}
            </h3>
            <p className={styles.whyCardDesc}>
              {label(
                locale,
                "نوصل لجميع أنحاء دبي والإمارات خلال 24-48 ساعة",
                "We deliver across Dubai and all UAE within 24-48 hours.",
                { ur: "ہم 24-48 گھنٹوں کے اندر دبئی اور تمام متحدہ عرب امارات میں فراہم کرتے ہیں۔" }
              )}
            </p>
          </div>

          {/* Card 2: Guaranteed Quality */}
          <div className={`${styles.whyCard} ${styles.reveal} ${styles.revealScale} ${styles.stagger2}`}>
            <div className={styles.whyIcon}>🛡️</div>
            <h3 className={styles.whyCardTitle}>
              {label(locale, "جودة مضمونة", "Guaranteed Quality", { ur: "گارنٹی شدہ معیار" })}
            </h3>
            <p className={styles.whyCardDesc}>
              {label(
                locale,
                "منتجات معتمدة ومرخصة من هيئة الغذاء والدواء الإماراتية",
                "Certified products licensed by UAE Food and Drug authorities.",
                { ur: "متحدہ عرب امارات کے فوڈ حکام کے ذریعہ لائسنس یافتہ مصنوعات۔" }
              )}
            </p>
          </div>

          {/* Card 3: Wholesale Prices */}
          <div className={`${styles.whyCard} ${styles.reveal} ${styles.revealScale} ${styles.stagger3}`}>
            <div className={styles.whyIcon}>💰</div>
            <h3 className={styles.whyCardTitle}>
              {label(locale, "أسعار الجملة", "Wholesale Prices", { ur: "تھوک قیمتیں" })}
            </h3>
            <p className={styles.whyCardDesc}>
              {label(
                locale,
                "أفضل الأسعار للكميات الكبيرة مع مرونة في شروط الدفع",
                "Best prices for large quantities with flexible payment terms.",
                { ur: "لچکدار ادائیگی کی شرائط کے ساتھ بڑی مقدار کے لیے بہترین قیمتیں۔" }
              )}
            </p>
          </div>

          {/* Card 4: Continuous Support */}
          <div className={`${styles.whyCard} ${styles.reveal} ${styles.revealScale} ${styles.stagger4}`}>
            <div className={styles.whyIcon}>📞</div>
            <h3 className={styles.whyCardTitle}>
              {label(locale, "دعم مستمر", "Continuous Support", { ur: "مسلسل سپورٹ" })}
            </h3>
            <p className={styles.whyCardDesc}>
              {label(
                locale,
                "فريق مبيعات متاح 6 أيام في الأسبوع للرد على استفساراتك",
                "Sales team available 6 days a week to answer your inquiries.",
                { ur: "آپ کے سوالات کے جوابات دینے کے لیے ہفتے میں 6 دن سیلز ٹیم دستیاب ہے۔" }
              )}
            </p>
          </div>
        </div>

        {/* Scrolling Ticker / Infinite Marquee */}
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {[0, 1, 2, 3].map((copy) => (
              <div key={`marquee-${copy}`} className={styles.marqueeContent} aria-hidden={copy > 0}>
                <span className={styles.marqueeItem}><span className={styles.marqueeBadge}>✓</span>{label(locale, "+30 سنة خبرة", "+30 Years of Experience", { ur: "+30 سال کا تجربہ" })}</span>
                <span className={styles.marqueeDot} aria-hidden="true">•</span>
                <span className={styles.marqueeItem}><span className={styles.marqueeBadge}>✓</span>{label(locale, "+25,000 عميل راضٍ", "+25,000 Satisfied Clients", { ur: "+25,000 مطمئن گاہک" })}</span>
                <span className={styles.marqueeDot} aria-hidden="true">•</span>
                <span className={styles.marqueeItem}><span className={styles.marqueeBadge}>✓</span>{label(locale, "جودة مضمونة 100%", "100% Guaranteed Quality", { ur: "100٪ گارنٹی شدہ معیار" })}</span>
                <span className={styles.marqueeDot} aria-hidden="true">•</span>
                <span className={styles.marqueeItem}><span className={styles.marqueeBadge}>✓</span>{label(locale, "تغطية كاملة للإمارات", "Full UAE Coverage", { ur: "متحدہ عرب امارات کی مکمل کوریج" })}</span>
                <span className={styles.marqueeDot} aria-hidden="true">•</span>
                <span className={styles.marqueeItem}><span className={styles.marqueeBadge}>✓</span>{label(locale, "رخصة تجارية معتمدة", "Certified Trade License", { ur: "تصدیق شدہ تجارتی لائسنس" })}</span>
                <span className={styles.marqueeDot} aria-hidden="true">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 - Success Stories / Partners Section */}
      <section className={styles.testimonialsSection}>
        <div className={`${styles.sectionHeaderCentered} ${styles.reveal} ${styles.revealUp}`}>
          <span className={styles.sectionEyebrow}>
            {label(locale, "قصص النجاح", "Success Stories", {
              ur: "کامیابی کی کہانیاں",
              fr: "Histoires de Réussite",
              es: "Historias de Éxito"
            })}
          </span>
          <h2 className={styles.testimonialsMainTitle}>
            {locale === "ar" ? (
              <>
                شركاء <span className={styles.goldText}>نجحوا</span> معنا
              </>
            ) : locale === "ur" ? (
              <>
                شرکاء جو <span className={styles.goldText}>کامیاب ہوئے</span> ہمارے ساتھ
              </>
            ) : locale === "fr" ? (
              <>
                Des Partenaires qui <span className={styles.goldText}>Réussissent</span> avec Nous
              </>
            ) : locale === "es" ? (
              <>
                Socios que <span className={styles.goldText}>Triunfan</span> con Nosotros
              </>
            ) : (
              <>
                Partners Who <span className={styles.goldText}>Succeed</span> With Us
              </>
            )}
          </h2>
          <p className={styles.sectionSubtitleCentered}>
            {label(
              locale,
              "تجار جملة وموزعون بنوا أعمالهم على الشراكة مع شركة العدل - أرقام حقيقية وتجارب موثقة",
              "Wholesalers and distributors built their businesses on partnership with Al Adel - real numbers and verified experiences.",
              {
                ur: "تھوک فروشوں اور تقسیم کاروں نے العدل کے ساتھ شراکت داری پر اپنے کاروبار بنائے - حقیقی اعداد و شمار اور تصدیق شدہ تجربات۔",
                fr: "Les grossistes et distributeurs ont bâti leur entreprise sur le partenariat avec Al Adel - des chiffres réels et des expériences vérifiées.",
                es: "Los mayoristas y distribuidores construyeron sus negocios sobre la asociación con Al Adel: números reales y experiencias verificadas."
              }
            )}
          </p>
        </div>

        <div className={`${styles.testimonialsContainer} ${styles.reveal} ${styles.revealScale}`}>
          {/* Left Column (Mini Stats, Rating, Avatars Selector, Switcher Arrows) */}
          <div className={styles.testimonialsLeftCol}>
            {/* 3 Stats Boxes */}
            <div className={styles.miniStatsRow}>
              {testimonials[activeTestimonial].stats.map((st, idx) => (
                <div key={idx} className={styles.miniStatBox}>
                  <strong>{st.value}</strong>
                  <span>{st.label}</span>
                </div>
              ))}
            </div>

            {/* Stars */}
            <div className={styles.starsRow}>★★★★★</div>

            {/* Avatars Selector */}
            <div className={styles.avatarsSelector}>
              {testimonials.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`${styles.avatarSelectorBtn} ${activeTestimonial === idx ? styles.avatarSelectorBtnActive : ""}`}
                  onClick={() => setActiveTestimonial(idx)}
                >
                  <div className={styles.avatarCircle}>{t.initials}</div>
                  <span className={styles.avatarName}>{t.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            {/* Switcher Arrows & Pagination Dots */}
            <div className={styles.sliderControls}>
              <button type="button" className={styles.arrowBtn} onClick={prevTestimonial} aria-label="Previous Testimonial">
                ‹
              </button>
              <div className={styles.paginationDots}>
                {testimonials.map((_, idx) => (
                  <span
                    key={idx}
                    className={`${styles.dot} ${activeTestimonial === idx ? styles.dotActive : ""}`}
                    onClick={() => setActiveTestimonial(idx)}
                  />
                ))}
              </div>
              <button type="button" className={styles.arrowBtn} onClick={nextTestimonial} aria-label="Next Testimonial">
                ›
              </button>
            </div>
          </div>

          {/* Right Column (Testimonial Quote Bubble & Author Details) */}
          <div className={styles.testimonialsRightCol}>
            <div className={styles.quoteBubble}>
              <span className={styles.quoteIcon}>“</span>
              <span className={styles.topBadge}>{testimonials[activeTestimonial].badge}</span>
              <p className={styles.quoteText}>{testimonials[activeTestimonial].quote}</p>

              <div className={styles.authorProfileRow}>
                <div className={styles.authorAvatarCircle}>
                  {testimonials[activeTestimonial].initials}
                </div>
                <div className={styles.authorProfileMeta}>
                  <h4 className={styles.authorName}>{testimonials[activeTestimonial].name}</h4>
                  <p className={styles.authorTitle}>
                    {testimonials[activeTestimonial].title} — {testimonials[activeTestimonial].location}
                  </p>
                </div>
              </div>

              <div className={styles.authorExtraDetails}>
                <div>
                  <span className={styles.detailLabel}>
                    {label(locale, "النشاط:", "Activity:", { ur: "سرگرمی:" })}
                  </span>{" "}
                  <span className={styles.detailVal}>{testimonials[activeTestimonial].activity}</span>
                </div>
                <div>
                  <span className={styles.detailLabel}>
                    {label(locale, "شريك منذ:", "Partner Since:", { ur: "شریک منذ:" })}
                  </span>{" "}
                  <span className={styles.detailVal}>{testimonials[activeTestimonial].since}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA below testimonials */}
        <div className={`${styles.testimonialsCtaRow} ${styles.reveal} ${styles.revealUp}`}>
          <Link href={`/${locale}/request-quote`} className={styles.testimonialsCtaBtn}>
            {label(locale, "ابدأ شراكتك معنا ←", "Start Your Partnership With Us →", { ur: "ہمارے ساتھ شراکت شروع کریں ←" })}
          </Link>
          <span className={styles.testimonialsCtaSub}>
            {label(locale, "انضم لأكثر من 500 عميل يثقون بنا", "Join over 500 clients who trust us", { ur: "500 سے زائد مطمئن گاہکوں میں شامل ہوں" })}
          </span>
        </div>
      </section>

      {/* Sourcing Countries Section */}
      <section className={styles.countriesSection}>
        <div className={`${styles.countriesHeader} ${styles.reveal} ${styles.revealUp}`}>
          <div className={styles.countriesTitleBlock}>
            <span className={styles.sectionEyebrow}>
              {label(locale, "دول المصدر", "Sourcing Countries", { ur: "درآمدی ممالک" })}
            </span>
            <h2 className={styles.countriesMainTitle}>
              {label(locale, "نستورد مباشرة من +20 دولة", "We Import Directly from +20 Countries", { ur: "+20 ممالک سے براہ راست درآمد" })}
            </h2>
          </div>
          <p className={styles.countriesHeaderDesc}>
            {label(
              locale,
              "من تركيا إلى البرازيل والهند — نضمن الجودة من المصدر حتى مستودعاتنا في دبي",
              "From Turkey to Brazil and India — we guarantee quality from the source to our warehouses in Dubai.",
              { ur: "ترکی سے لے کر برازیل اور بھارت تک — ہم ماخذ سے لے کر دبئی میں اپنے گوداموں تک معیار کی ضمانت دیتے ہیں۔" }
            )}
          </p>
        </div>

        {/* Scrolling horizontal track of countries */}
        <div className={`${styles.countriesTrackWrapper} ${styles.reveal} ${styles.revealScale}`}>
          <div className={styles.countriesTrack}>
            {tickerCopies.map((copy) => (
              <div key={`country-copy-${copy}`} className={styles.countriesGroup} aria-hidden={copy > 0}>
                {countries.map((c) => (
                  <div key={`${c.code}-${copy}`} className={styles.countryCard}>
                    <div className={styles.countryHeaderRow}>
                      <h3 className={styles.countryName}>{c.name}</h3>
                      <span className={styles.countryCodeBadge}>{c.code}</span>
                    </div>
                    <p className={styles.countryProducts}>{c.products}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Sourcing Stats Row */}
        <div className={`${styles.countriesStatsRow} ${styles.reveal} ${styles.revealUp}`}>
          <div className={styles.countriesStatsTrack}>
            {tickerCopies.map((copy) => (
              <div key={`stats-copy-${copy}`} className={styles.countriesStatsGroup} aria-hidden={copy > 0}>
                {sourcingStats.map((item, index) => (
                  <div key={`stat-${copy}-${index}`} className={styles.countriesStatCol}>
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

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
