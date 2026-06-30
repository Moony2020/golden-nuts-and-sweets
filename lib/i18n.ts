import { Language, SUPPORTED_LANGUAGES } from "./config";

type TranslationKeys = {
  nav: {
    home: string;
    products: string;
    about: string;
    services: string;
    catalog: string;
    blog: string;
    contact: string;
    requestQuote: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    browseProducts: string;
    downloadCatalog: string;
    contactWhatsApp: string;
  };
  stats: {
    customers: string;
    experience: string;
    products: string;
  };
  categories: {
    title: string;
    subtitle: string;
  };
  products: {
    title: string;
    search: string;
    filters: string;
    orderQuantity: string;
    requestQuote: string;
  };
  footer: {
    company: string;
    tagline: string;
    quickLinks: string;
    policies: string;
    contact: string;
    copyright: string;
  };
};

const translations: Record<Language, TranslationKeys> = {
  en: require("./translations/en.json"),
  ar: require("./translations/ar.json"),
  fr: require("./translations/fr.json"),
  ur: require("./translations/ur.json"),
  es: require("./translations/es.json"),
};

export function getTranslation(lang: Language): TranslationKeys {
  return translations[lang] || translations.en;
}

export function isValidLanguage(lang: string): lang is Language {
  return lang in SUPPORTED_LANGUAGES;
}

export function getDirection(lang: Language): "ltr" | "rtl" {
  return SUPPORTED_LANGUAGES[lang].dir as "ltr" | "rtl";
}

export function getLanguageName(lang: Language): string {
  return SUPPORTED_LANGUAGES[lang].name;
}
