export const CATEGORIES = [
  { slug: "nuts", ar: "المكسرات", en: "Nuts", fr: "Noix", ur: "میوہ جات", es: "Frutos Secos" },
  { slug: "pistachio", ar: "الفستق", en: "Pistachios", fr: "Pistaches", ur: "پستہ", es: "Pistachos" },
  { slug: "dried_fruits", ar: "الفواكه المجففة", en: "Dried Fruits", fr: "Fruits Secs", ur: "خشک میوہ جات", es: "Frutas Secas" },
  { slug: "dried_apricots", ar: "المشمش والخوخ المجفف", en: "Dried Apricots & Peaches", fr: "Abricots Secs", ur: "خوبانی", es: "Albaricoques Secos" },
  { slug: "grains_seeds", ar: "الحبوب والبذور", en: "Grains & Seeds", fr: "Céréales et Graines", ur: "اناج اور بیج", es: "Cereales y Semillas" },
  { slug: "spices", ar: "البهارات والهيل والزعفران", en: "Spices, Cardamom & Saffron", fr: "Épices et Safran", ur: "مصالحہ جات", es: "Especias y Azafrán" },
  { slug: "raisins_berries", ar: "الزبيب والكرزيات", en: "Raisins & Berries", fr: "Raisins et Baies", ur: "کشمش اور بیر", es: "Pasas y Bayas" },
  { slug: "dates_figs", ar: "التمور والتين", en: "Dates & Figs", fr: "Dattes et Figues", ur: "کھجوریں اور انجیر", es: "Dátiles y Higos" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

export function categoryLabel(slug: string, lang: string = "ar"): string {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return slug;
  return cat[lang as keyof typeof cat] ?? cat.en;
}

export const COMPANY = {
  nameAr: "رويال هارفست",
  nameEn: "Royal Harvest",
  slogan: "شريكك الموثوق في تجارة المواد الغذائية بالجملة",
  sloganEn: "Your Trusted Partner in Premium Foodstuff Trading",
  logo: "/images/logo.jpg",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+971 4 123 4567",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "971547530333",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "info@royalharvest.ae",
  address: "دبي، الإمارات العربية المتحدة",
  addressEn: "Dubai, United Arab Emirates",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  linkedin: "https://linkedin.com",
};

export const SUPPORTED_LANGUAGES = {
  en: { name: "English", dir: "ltr" },
  ar: { name: "العربية", dir: "rtl" },
  fr: { name: "Français", dir: "ltr" },
  ur: { name: "اردو", dir: "rtl" },
  es: { name: "Español", dir: "ltr" },
} as const;

export type Language = keyof typeof SUPPORTED_LANGUAGES;
