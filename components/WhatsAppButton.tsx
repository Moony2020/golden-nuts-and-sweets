"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/config";
import type { Language } from "@/lib/config";
import styles from "./WhatsAppButton.module.css";

interface WhatsAppButtonProps {
  locale: Language;
}

export default function WhatsAppButton({ locale }: WhatsAppButtonProps) {
  const [open, setOpen] = useState(true);
  const message =
    locale === "ar"
      ? "مرحباً، أرغب بالاستفسار عن منتجاتكم وأسعاركم."
      : locale === "ur"
        ? "السلام علیکم، میں آپ کی مصنوعات اور قیمتوں کے بارے میں پوچھنا چاہتا ہوں۔"
        : locale === "fr"
          ? "Bonjour, je souhaite m'informer sur vos produits et vos prix."
          : locale === "es"
            ? "Hola, quisiera informarme sobre sus productos y precios."
            : "Hello, I would like to inquire about your products and prices.";

  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;
  const teaser =
    locale === "ar"
      ? "مرحباً! هل تحتاج مساعدة في اختيار المنتجات أو الأسعار؟"
      : locale === "ur"
        ? "کیا آپ کو مصنوعات یا قیمتوں کے انتخاب میں مدد چاہیے؟"
        : locale === "fr"
          ? "Besoin d'aide pour choisir les produits ou les prix ?"
          : locale === "es"
            ? "Necesita ayuda para elegir productos o precios?"
            : "Need help choosing products or prices?";
  const cta = locale === "ar" ? "تحدث معنا الآن" : "Chat with us now";

  return (
    <div className={styles.wrapper}>
      {open && (
        <div className={styles.bubble}>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close WhatsApp message"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bubbleLink}
          >
            <p className={styles.bubbleText}>{teaser}</p>
            <span className={styles.bubbleCta}>
              {cta} <span className={styles.bubbleArrow} aria-hidden="true">&#8592;</span>
            </span>
          </a>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.fab}
        aria-label="Contact via WhatsApp"
      >
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.11 4.91A9.82 9.82 0 0 0 12.03 2C6.55 2 2.08 6.46 2.08 11.94c0 1.76.46 3.47 1.33 4.98L2 22l5.19-1.36a9.91 9.91 0 0 0 4.84 1.23h.01c5.48 0 9.94-4.46 9.94-9.94a9.86 9.86 0 0 0-2.88-7.02Zm-7.08 15.27h-.01a8.12 8.12 0 0 1-4.15-1.13l-.3-.18-3.08.81.82-3-.2-.31a8.12 8.12 0 0 1-1.25-4.34c0-4.49 3.65-8.14 8.14-8.14 2.17 0 4.21.84 5.75 2.38a8.08 8.08 0 0 1 2.38 5.76c0 4.49-3.65 8.14-8.14 8.14Zm4.46-6.08c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.42-1.35-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.48-.4-.41-.54-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.33.98 2.49c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
        </svg>
        <span className={styles.badge}>1</span>
      </a>
    </div>
  );
}
