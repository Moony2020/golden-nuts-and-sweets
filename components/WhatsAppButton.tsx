"use client";

import { useState, useEffect } from "react";
import { COMPANY } from "@/lib/config";
import type { Language } from "@/lib/config";
import styles from "./WhatsAppButton.module.css";

interface WhatsAppButtonProps {
  locale: Language;
}

export default function WhatsAppButton({ locale }: WhatsAppButtonProps) {
  const [open, setOpen] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Language translation helper
  const translate = (
    ar: string,
    en: string,
    ur: string,
    fr: string,
    es: string
  ) => {
    if (locale === "ar") return ar;
    if (locale === "ur") return ur;
    if (locale === "fr") return fr;
    if (locale === "es") return es;
    return en;
  };

  const titleText = translate(
    "تحدث مع فريق المبيعات",
    "Chat with Sales Team",
    "سیلز ٹیم سے بات کریں",
    "Discutez avec l'équipe",
    "Chatea con el equipo"
  );

  const subtitleText = translate(
    "يرد عادة خلال دقائق",
    "Typically replies within minutes",
    "عام طور پر منٹوں میں جواب دیتے ہیں",
    "Répond en quelques minutes",
    "Responde en unos minutos"
  );

  const welcomeMessage = translate(
    "👋 أهلاً بك في شركة العدل للمواد الغذائية! كيف يمكننا مساعدتك؟ نحن متخصصون في توريد المواد الغذائية بالجملة للمطاعم والكافيتريات والسوبرماركت.",
    "👋 Welcome to Al Adel Foodstuff Trading! How can we help you? We specialize in wholesale foodstuff supply for restaurants, cafeterias, and supermarkets.",
    "👋 العدل فوڈ اسٹف ٹریڈنگ میں خوش آمدید! ہم آپ کی کیا مدد کر سکتے ہیں؟ ہم ریستوراں، کیفے ٹیریا اور سپر مارکیٹوں کے لیے ہول سیل فوڈ سپلائی میں مہارت رکھتے ہیں۔",
    "👋 Bienvenue chez Al Adel Foodstuff Trading ! Comment pouvons-nous vous aider ? Nous sommes spécialisés dans la vente en gros de produits alimentaires pour restaurants, cafétérias et supermarchés.",
    "👋 ¡Bienvenido a Al Adel Foodstuff Trading! ¿Cómo podemos ayudarle? Nos especializamos en el suministro mayorista de alimentos para restaurantes, cafeterías y supermercados."
  );

  const selectTopicLabel = translate(
    "اختر موضوع الاستفسار",
    "Choose inquiry topic",
    "پوچھ گچھ کا موضوع منتخب کریں",
    "Choisissez le sujet",
    "Elija el tema"
  );

  const placeholderText = translate(
    "اكتب رسالتك...",
    "Type your message...",
    "اپنا پیغام لکھیں...",
    "Écrivez votre message...",
    "Escriba su mensaje..."
  );

  const poweredText = translate(
    "مدعوم بواتساب",
    "Powered by WhatsApp",
    "واٹس ایپ کے تعاون سے",
    "Propulsé par WhatsApp",
    "Desarrollado por WhatsApp"
  );

  const defaultWhatsappMessage = translate(
    "مرحباً، أرغب بالاستفسار عن منتجاتكم وأسعاركم.",
    "Hello, I would like to inquire about your products and prices.",
    "السلام علیکم، میں آپ کی مصنوعات اور قیمتوں کے بارے میں پوچھنا چاہتا ہوں۔",
    "Bonjour, je souhaite m'informer sur vos produits et vos prix.",
    "Hola, quisiera informarme sobre sus productos y precios."
  );

  const chips = [
    {
      label: translate("🌾 استفسار عن المنتجات", "🌾 Product Inquiry", "🌾 مصنوعات کا سوال", "🌾 Demande de produits", "🌾 Consulta de productos"),
      text: translate(
        "أرغب بالاستفسار عن المنتجات والأسعار المتوفرة.",
        "I would like to inquire about the products and available prices.",
        "میں دستیاب مصنوعات اور قیمتوں کے بارے میں پوچھ گچھ کرنا چاہتا ہوں۔",
        "Je souhaite m'informer sur les produits et les prix disponibles.",
        "Quisiera consultar sobre los productos y precios disponibles."
      ),
    },
    {
      label: translate("🚢 شحن بالحاويات", "🚢 Container Shipping", "🚢 کنٹینر شپنگ", "🚢 Expédition par conteneur", "🚢 Envío por contenedor"),
      text: translate(
        "مرحباً، أرغب بالاستفسار عن تفاصيل الشحن بالحاويات والتصدير.",
        "Hello, I would like to inquire about container shipping and export details.",
        "ہیلو، میں کنٹینر شپنگ اور برآمدی تفصیلات کے بارے میں پوچھ گچھ کرنا چاہتا ہوں۔",
        "Bonjour, je souhaite me renseigner sur l'expédition par conteneur et l'exportation.",
        "Hola, me gustaría consultar sobre los detalles del envío de contenedores y exportación."
      ),
    },
    {
      label: translate("🍽️ خدمات المطاعم", "🍽️ Restaurant Services", "🍽️ ریستوراں کی خدمات", "🍽️ Services de restauration", "🍽️ Servicios para restaurantes"),
      text: translate(
        "أرغب بالاستفسار عن خدمات التوريد وعقود المطاعم والفنادق.",
        "I would like to inquire about supply services and contracts for restaurants and hotels.",
        "میں سپلائی کی خدمات اور ریستورانوں اور ہوٹلوں کے معاہدوں کے بارے میں پوچھ گچھ کرنا چاہتا ہوں۔",
        "Je souhaite m'informer sur les services de livraison et les contrats de restauration.",
        "Quisiera consultar sobre los servicios de suministro y contratos para restaurantes."
      ),
    },
    {
      label: translate("📊 عروض الجملة", "📊 Wholesale Offers", "📊 ہول سیل آفرز", "📊 Offres de gros", "📊 Ofertas al por mayor"),
      text: translate(
        "مرحباً، أرغب بالاطلاع على أحدث عروض وأسعار الجملة لديكم.",
        "Hello, I would like to check your latest wholesale offers and prices.",
        "ہیلو، میں آپ کی تازہ ترین ہول سیل آفرز اور قیمتیں دیکھنا چاہتا ہوں۔",
        "Bonjour, je souhaite consulter vos dernières offres de gros et tarifs.",
        "Hola, me gustaría consultar sus últimas ofertas y precios al por mayor."
      ),
    },
  ];

  const handleSendCustom = () => {
    if (!typedMessage.trim()) return;
    const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(typedMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setTypedMessage("");
  };

  const handleSendChip = (text: string) => {
    const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleFabClick = () => {
    setOpen(true);
  };

  if (!mounted) return null;

  return (
    <div className={styles.wrapper}>
      {open && (
        <div className={styles.chatBox}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerProfile}>
              <div className={styles.avatar}>
                <span>AE</span>
                <span className={styles.statusIndicator} />
              </div>
              <div className={styles.headerInfo}>
                <h4 className={styles.headerTitle}>{titleText}</h4>
                <p className={styles.headerSubtitle}>{subtitleText}</p>
              </div>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close Chat"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className={styles.chatBody}>
            <div className={styles.messageRow}>
              <div className={styles.msgAvatar}>AE</div>
              <div className={styles.messageBubble}>
                <p>{welcomeMessage}</p>
                <span className={styles.msgTime}>
                  {new Date().toLocaleTimeString(locale === "ar" ? "ar-AE" : "en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
              </div>
            </div>

            <div className={styles.topicSelector}>
              <span className={styles.topicLabel}>{selectTopicLabel}</span>
              <div className={styles.chipsContainer}>
                {chips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={styles.topicChip}
                    onClick={() => handleSendChip(chip.text)}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.chatFooter}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.messageInput}
                placeholder={placeholderText}
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendCustom();
                }}
              />
              <button
                type="button"
                className={styles.sendBtn}
                onClick={handleSendCustom}
                aria-label="Send WhatsApp message"
              >
                <svg viewBox="0 0 24 24" className={styles.sendIcon}>
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
            <div className={styles.attribution}>
              <svg viewBox="0 0 24 24" className={styles.whatsappAttributionIcon}>
                <path d="M19.11 4.91A9.82 9.82 0 0 0 12.03 2C6.55 2 2.08 6.46 2.08 11.94c0 1.76.46 3.47 1.33 4.98L2 22l5.19-1.36a9.91 9.91 0 0 0 4.84 1.23h.01c5.48 0 9.94-4.46 9.94-9.94a9.86 9.86 0 0 0-2.88-7.02Zm-7.08 15.27h-.01a8.12 8.12 0 0 1-4.15-1.13l-.3-.18-3.08.81.82-3-.2-.31a8.12 8.12 0 0 1-1.25-4.34c0-4.49 3.65-8.14 8.14-8.14 2.17 0 4.21.84 5.75 2.38a8.08 8.08 0 0 1 2.38 5.76c0 4.49-3.65 8.14-8.14 8.14Zm4.46-6.08c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.42-1.35-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.48-.4-.41-.54-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.33.98 2.49c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
              </svg>
              <span>{poweredText}</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Buttons layout */}
      <div className={styles.buttonGroup}>
        {!open && (
          <button
            type="button"
            className={styles.fab}
            onClick={handleFabClick}
            aria-label="Open WhatsApp Chat"
          >
            <svg viewBox="0 0 24 24" className={styles.icon}>
              <path d="M19.11 4.91A9.82 9.82 0 0 0 12.03 2C6.55 2 2.08 6.46 2.08 11.94c0 1.76.46 3.47 1.33 4.98L2 22l5.19-1.36a9.91 9.91 0 0 0 4.84 1.23h.01c5.48 0 9.94-4.46 9.94-9.94a9.86 9.86 0 0 0-2.88-7.02Zm-7.08 15.27h-.01a8.12 8.12 0 0 1-4.15-1.13l-.3-.18-3.08.81.82-3-.2-.31a8.12 8.12 0 0 1-1.25-4.34c0-4.49 3.65-8.14 8.14-8.14 2.17 0 4.21.84 5.75 2.38a8.08 8.08 0 0 1 2.38 5.76c0 4.49-3.65 8.14-8.14 8.14Zm4.46-6.08c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.42-1.35-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.48-.4-.41-.54-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.33.98 2.49c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
            </svg>
          </button>
        )}

        {false && (
          <button
            type="button"
            className={styles.closeFab}
            onClick={() => setOpen(false)}
            aria-label="Close Chatbox"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
