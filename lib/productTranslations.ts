export type TranslatedProduct = {
  name: string;
  description: string;
  shortDescription?: string;
  packaging?: string;
  originCountry?: string;
};

export const PRODUCT_TRANSLATIONS: Record<string, Record<string, TranslatedProduct>> = {
  "premium-raw-almonds": {
    en: {
      name: "Premium Raw Almonds",
      description: "High-quality raw almonds from California. Perfect for restaurants and food businesses.",
      shortDescription: "Premium California almonds",
      packaging: "25 kg sacks",
      originCountry: "USA"
    },
    ar: {
      name: "لوز خام ممتاز",
      description: "لوز خام عالي الجودة من كاليفورنيا. مثالي للمطاعم ومصنعي الأغذية.",
      shortDescription: "لوز كاليفورنيا الممتاز",
      packaging: "أكياس 25 كجم",
      originCountry: "الولايات المتحدة الأمريكية"
    },
    ur: {
      name: "پریمیم خام بادام",
      description: "کیلیفورنیا سے اعلیٰ معیار کے خام بادام۔ ریستوراں اور فوڈ بزنس کے لیے بہترین۔",
      shortDescription: "پریمیم کیلیفورنیا بادام",
      packaging: "25 کلوگرام کی بوریاں",
      originCountry: "امریکہ"
    },
    fr: {
      name: "Amandes crues premium",
      description: "Amandes crues de haute qualité en provenance de Californie. Parfait pour les restaurants.",
      shortDescription: "Amandes de Californie premium",
      packaging: "Sacs de 25 kg",
      originCountry: "États-Unis"
    },
    es: {
      name: "Almendras crudas premium",
      description: "Almendras crudas de alta calidad de California. Perfectas para restaurantes.",
      shortDescription: "Almendras premium de California",
      packaging: "Sacos de 25 kg",
      originCountry: "EE. UU."
    }
  },
  "luxury-roasted-pistachios": {
    en: {
      name: "Luxury Roasted Pistachios",
      description: "Roasted and salted premium pistachio nuts.",
      shortDescription: "Roasted premium pistachios",
      packaging: "10 kg boxes",
      originCountry: "Iran"
    },
    ar: {
      name: "فستق محمص فاخر",
      description: "فستق حلبي محمص ومملح بدرجة جودة ممتازة.",
      shortDescription: "فستق محمص ممتاز",
      packaging: "صناديق 10 كجم",
      originCountry: "إيران"
    },
    ur: {
      name: "لگژری بھنے ہوئے پستے",
      description: "بھنے اور نمکین پریمیم پستے۔",
      shortDescription: "بھنے ہوئے پریمیم پستے",
      packaging: "10 کلوگرام کے ڈبے",
      originCountry: "ایران"
    },
    fr: {
      name: "Pistaches grillées de luxe",
      description: "Pistaches grillées et salées de qualité supérieure.",
      shortDescription: "Pistaches grillées de qualité supérieure",
      packaging: "Boîtes de 10 kg",
      originCountry: "Iran"
    },
    es: {
      name: "Pistachos tostados de lujo",
      description: "Pistachos tostados y salados de calidad superior.",
      shortDescription: "Pistachos tostados de primera calidad",
      packaging: "Cajas de 10 kg",
      originCountry: "Irán"
    }
  },
  "jumbo-cashew-nuts": {
    en: {
      name: "Jumbo Cashew Nuts",
      description: "Premium large raw cashew nuts.",
      shortDescription: "Large raw cashews",
      packaging: "20 kg boxes",
      originCountry: "Vietnam"
    },
    ar: {
      name: "كاجو جامبو",
      description: "حبات كاجو خام كبيرة وممتازة.",
      shortDescription: "كاجو خام كبير",
      packaging: "صناديق 20 كجم",
      originCountry: "فيتنام"
    },
    ur: {
      name: "جمبو کاجو",
      description: "اعلیٰ معیار کے بڑے خام کاجو۔",
      shortDescription: "بڑے خام کاجو",
      packaging: "20 کلوگرام کے ڈبے",
      originCountry: "ویتنام"
    },
    fr: {
      name: "Noix de cajou géantes",
      description: "Noix de cajou crues géantes de première qualité.",
      shortDescription: "Noix de cajou crues géantes",
      packaging: "Boîtes de 20 kg",
      originCountry: "Vietnam"
    },
    es: {
      name: "Castañas de cajú jumbo",
      description: "Nueces de cajú crudas grandes y de primera calidad.",
      shortDescription: "Castañas de cajú crudas gigantes",
      packaging: "Cajas de 20 kg",
      originCountry: "Vietnam"
    }
  },
  "mixed-dried-fruits": {
    en: {
      name: "Mixed Dried Fruits",
      description: "A premium blend of tropical and Mediterranean dried fruits.",
      shortDescription: "Premium mixed dried fruits",
      packaging: "10 kg bulk boxes",
      originCountry: "Thailand"
    },
    ar: {
      name: "فواكه مجففة مشكلة",
      description: "مزيج فاخر من الفواكه المجففة الاستوائية والمتوسطية.",
      shortDescription: "فواكه مجففة مشكلة ممتازة",
      packaging: "صناديق 10 كجم",
      originCountry: "تايلاند"
    },
    ur: {
      name: "مکس خشک میوہ جات",
      description: "ٹرپیکل اور میڈیٹرینین خشک میوہ جات کا ایک پریمیم مرکب۔",
      shortDescription: "پریمیم مکس خشک میوہ جات",
      packaging: "10 کلو کے بلک باکس",
      originCountry: "تھائی لینڈ"
    },
    fr: {
      name: "Mélange de fruits secs",
      description: "Un mélange haut de gamme de fruits secs tropicaux et méditerranéens.",
      shortDescription: "Mélange de fruits secs premium",
      packaging: "Boîtes de 10 kg",
      originCountry: "Thaïlande"
    },
    es: {
      name: "Frutas secas mixtas",
      description: "Una mezcla premium de frutas secas tropicales y mediterráneas.",
      shortDescription: "Frutas secas mixtas de primera calidad",
      packaging: "Cajas de 10 kg",
      originCountry: "Tailandia"
    }
  },
  "turkish-dried-apricots": {
    en: {
      name: "Turkish Dried Apricots",
      description: "Soft, sweet, and bright orange dried apricots.",
      shortDescription: "Soft sweet dried apricots",
      packaging: "5 kg trays",
      originCountry: "Turkey"
    },
    ar: {
      name: "مشمش مجفف تركي",
      description: "مشمش مجفف طري وحلو ذو لون برتقالي زاهٍ.",
      shortDescription: "مشمش مجفف حلو وطري",
      packaging: "أطباق 5 كجم",
      originCountry: "تركيا"
    },
    ur: {
      name: "ترکش خشک خوبانی",
      description: "نرم، میٹھی اور چمکدار نارنجی خشک خوبانی۔",
      shortDescription: "نرم میٹھی خشک خوبانی",
      packaging: "5 کلوگرام کی ٹرے",
      originCountry: "ترکی"
    },
    fr: {
      name: "Abricots secs de Turquie",
      description: "Abricots secs doux, sucrés et orange vif.",
      shortDescription: "Abricots secs doux et sucrés",
      packaging: "Plateaux de 5 kg",
      originCountry: "Turquie"
    },
    es: {
      name: "Damascos secos turcos",
      description: "Damascos secos suaves, dulces y de color naranja brillante.",
      shortDescription: "Damascos secos suaves y dulces",
      packaging: "Bandejas de 5 kg",
      originCountry: "Turquía"
    }
  },
  "golden-sella-basmati": {
    en: {
      name: "Golden Sella Basmati Rice",
      description: "Extra-long grain parboiled basmati rice.",
      shortDescription: "Golden sella basmati",
      packaging: "39 kg bags",
      originCountry: "India"
    },
    ar: {
      name: "أرز بسمتي سيلا ذهبي",
      description: "أرز بسمتي حبة طويلة جداً شبه مطبوخ.",
      shortDescription: "أرز بسمتي سيلا ذهبي",
      packaging: "أكياس 39 كجم",
      originCountry: "الهند"
    },
    ur: {
      name: "گولڈن سیلا باسمتی چاول",
      description: "اضافی لمبا دانہ ابلا ہوا باسمتی چاول۔",
      shortDescription: "گولڈن سیلا باسمتی",
      packaging: "39 کلوگرام کے تھیلے",
      originCountry: "بھارت"
    },
    fr: {
      name: "Riz Basmati Golden Sella",
      description: "Riz basmati précuit à grain extra-long.",
      shortDescription: "Riz basmati sella doré",
      packaging: "Sacs de 39 kg",
      originCountry: "Inde"
    },
    es: {
      name: "Arroz Basmati Golden Sella",
      description: "Arroz basmati parboiled de grano extra largo.",
      shortDescription: "Arroz basmati sella dorado",
      packaging: "Sacos de 39 kg",
      originCountry: "India"
    }
  },
  "pure-saffron-threads": {
    en: {
      name: "Pure Saffron Threads",
      description: "Super Negin saffron from Iran. Premium quality for luxury culinary use.",
      shortDescription: "Iranian Super Negin saffron",
      packaging: "1 kg / 5 kg",
      originCountry: "Iran"
    },
    ar: {
      name: "خيوط الزعفران النقي",
      description: "زعفران سوبر نيغين من إيران. جودة فائقة للاستخدام الطهي الفاخر.",
      shortDescription: "زعفران سوبر نيغين إيراني",
      packaging: "1 كجم / 5 كجم",
      originCountry: "إيران"
    },
    ur: {
      name: "خالص زعفران کے دھاگے",
      description: "ایران سے سپر نیگین زعفران۔ لگژری کھانا پکانے کے استعمال کے لیے پریمیم کوالٹی۔",
      shortDescription: "ایرانی سپر نیگین زعفران",
      packaging: "1 کلوگرام / 5 کلوگرام",
      originCountry: "ایران"
    },
    fr: {
      name: "Fils de safran pur",
      description: "Safran Super Negin d'Iran. Qualité premium pour un usage culinaire de luxe.",
      shortDescription: "Safran Super Negin iranien",
      packaging: "1 kg / 5 kg",
      originCountry: "Iran"
    },
    es: {
      name: "Hilos de azafrán puro",
      description: "Azafrán Super Negin de Irán. Calidad premium para uso culinario de lujo.",
      shortDescription: "Azafrán Super Negin iraní",
      packaging: "1 kg / 5 kg",
      originCountry: "Irán"
    }
  },
  "green-cardamom": {
    en: {
      name: "Green Cardamom Jumbo",
      description: "Jumbo green cardamom pods, premium aromatic grade.",
      shortDescription: "Jumbo green cardamom",
      packaging: "5 kg boxes",
      originCountry: "Guatemala"
    },
    ar: {
      name: "هيل أخضر جامبو",
      description: "حبات هيل أخضر جامبو، درجة عطرية ممتازة.",
      shortDescription: "هيل أخضر جامبو",
      packaging: "صناديق 5 كجم",
      originCountry: "غواتيمالا"
    },
    ur: {
      name: "سبز الائچی جمبو",
      description: "جمبو سبز الائچی کی پھلیاں، پریمیم خوشبودار گریڈ۔",
      shortDescription: "جمبو سبز الائچی",
      packaging: "5 کلوگرام کے ڈبے",
      originCountry: "گوئٹے مالا"
    },
    fr: {
      name: "Cardamome verte géante",
      description: "Gousses de cardamome verte géantes, qualité aromatique supérieure.",
      shortDescription: "Cardamome verte géante",
      packaging: "Boîtes de 5 kg",
      originCountry: "Guatemala"
    },
    es: {
      name: "Cardamomo verde jumbo",
      description: "Vainas de cardamomo verde gigante, grado aromático premium.",
      shortDescription: "Cardamomo verde gigante",
      packaging: "Cajas de 5 kg",
      originCountry: "Guatemala"
    }
  },
  "jumbo-golden-raisins": {
    en: {
      name: "Jumbo Golden Raisins",
      description: "Large, sweet golden raisins for baking and snacking.",
      shortDescription: "Large sweet golden raisins",
      packaging: "10 kg boxes",
      originCountry: "Iran"
    },
    ar: {
      name: "زبيب ذهبي جامبو",
      description: "زبيب ذهبي كبير وحلو للخبز والوجبات الخفيفة.",
      shortDescription: "زبيب ذهبي حلو وكبير",
      packaging: "صناديق 10 كجم",
      originCountry: "إيران"
    },
    ur: {
      name: "جمبو سنہری کشمش",
      description: "بیکنگ اور سنیکنگ کے لیے بڑی، میٹھی سنہری کشمش۔",
      shortDescription: "بڑی میٹھی سنہری کشمش",
      packaging: "10 کلوگرام کے ڈبے",
      originCountry: "ایران"
    },
    fr: {
      name: "Raisins secs dorés géants",
      description: "Grands raisins dorés et sucrés pour la pâtisserie et le goûter.",
      shortDescription: "Raisins dorés doux et géants",
      packaging: "Boîtes de 10 kg",
      originCountry: "Iran"
    },
    es: {
      name: "Pasas de uva rubias jumbo",
      description: "Pasas de uva rubias grandes y dulces para repostería y aperitivos.",
      shortDescription: "Pasas rubias grandes y dulces",
      packaging: "Cajas de 10 kg",
      originCountry: "Irán"
    }
  },
  "premium-medjool-dates": {
    en: {
      name: "Premium Medjool Dates",
      description: "Large, soft Medjool dates from the Middle East.",
      shortDescription: "Large Medjool dates",
      packaging: "10 kg boxes",
      originCountry: "Saudi Arabia"
    },
    ar: {
      name: "تمور مجدول فاخرة",
      description: "تمور مجدول طرية وكبيرة من الشرق الأوسط.",
      shortDescription: "تمور مجدول كبيرة",
      packaging: "صناديق 10 كجم",
      originCountry: "المملكة العربية السعودية"
    },
    ur: {
      name: "پریمیم مجھول کھجوریں",
      description: "مشرق وسطیٰ سے بڑی، نرم مجھول کھجوریں۔",
      shortDescription: "بڑی مجھول کھجوریں",
      packaging: "10 کلوگرام کے ڈبے",
      originCountry: "سعودی عرب"
    },
    fr: {
      name: "Dattes Medjool Premium",
      description: "Grandes dattes Medjool moelleuses du Moyen-Orient.",
      shortDescription: "Grandes dattes Medjool",
      packaging: "Boîtes de 10 kg",
      originCountry: "Arabie Saoudite"
    },
    es: {
      name: "Dátiles Medjool Premium",
      description: "Dátiles Medjool grandes y suaves del Medio Oriente.",
      shortDescription: "Dátiles Medjool grandes",
      packaging: "Cajas de 10 kg",
      originCountry: "Arabia Saudita"
    }
  },
  "dried-black-figs": {
    en: {
      name: "Dried Black Figs",
      description: "Naturally dried black figs, rich in fiber.",
      shortDescription: "Natural dried figs",
      packaging: "5 kg boxes",
      originCountry: "Turkey"
    },
    ar: {
      name: "تين أسود مجفف",
      description: "تين أسود مجفف طبيعياً، غني بالألياف.",
      shortDescription: "تين مجفف طبيعي",
      packaging: "صناديق 5 كجم",
      originCountry: "تركيا"
    },
    ur: {
      name: "خشک سیاہ انجیر",
      description: "قدرتی طور پر خشک سیاہ انجیر، فائبر سے بھرپور۔",
      shortDescription: "قدرتی خشک انجیر",
      packaging: "5 کلوگرام کے ڈبے",
      originCountry: "ترکی"
    },
    fr: {
      name: "Figues noires séchées",
      description: "Figues noires séchées naturellement, riches en fibres.",
      shortDescription: "Figues séchées naturelles",
      packaging: "Boîtes de 5 kg",
      originCountry: "Turquie"
    },
    es: {
      name: "Higos negros secos",
      description: "Higos negros secos naturalmente, ricos en fibra.",
      shortDescription: "Higos secos naturales",
      packaging: "Cajas de 5 kg",
      originCountry: "Turquía"
    }
  },
  "chia-seeds-bulk": {
    en: {
      name: "Chia Seeds Bulk",
      description: "High-quality black chia seeds for health food products.",
      shortDescription: "Bulk black chia seeds",
      packaging: "25 kg sacks",
      originCountry: "Mexico"
    },
    ar: {
      name: "بذور الشيا بالجملة",
      description: "بذور شيا سوداء عالية الجودة لمنتجات الأغذية الصحية.",
      shortDescription: "بذور شيا سوداء بالجملة",
      packaging: "أكياس 25 كجم",
      originCountry: "المكسيك"
    },
    ur: {
      name: "چیا بیج بلک",
      description: "صحت بخش غذائی مصنوعات کے لیے اعلیٰ معیار کے سیاہ چیا بیج۔",
      shortDescription: "بلک سیاہ چیا بیج",
      packaging: "25 کلوگرام کی بوریاں",
      originCountry: "میکسیکو"
    },
    fr: {
      name: "Graines de Chia en vrac",
      description: "Graines de chia noires de haute qualité pour les produits alimentaires sains.",
      shortDescription: "Graines de chia noires en vrac",
      packaging: "Sacs de 25 kg",
      originCountry: "Mexique"
    },
    es: {
      name: "Semillas de Chía al por mayor",
      description: "Semillas de chía negra de alta calidad para productos alimenticios saludables.",
      shortDescription: "Semillas de chía negra al por mayor",
      packaging: "Sacos de 25 kg",
      originCountry: "México"
    }
  }
};

export function getLocalizedProduct(
  product: {
    slug: string;
    name: string;
    description: string;
    shortDescription?: string;
    packaging?: string;
    originCountry?: string;
  },
  locale: string
) {
  const trans = PRODUCT_TRANSLATIONS[product.slug]?.[locale];
  if (trans) {
    return {
      name: trans.name,
      description: trans.description,
      shortDescription: trans.shortDescription || trans.description,
      packaging: trans.packaging || product.packaging,
      originCountry: trans.originCountry || product.originCountry
    };
  }
  return {
    name: product.name,
    description: product.description,
    shortDescription: product.shortDescription || product.description,
    packaging: product.packaging,
    originCountry: product.originCountry
  };
}
