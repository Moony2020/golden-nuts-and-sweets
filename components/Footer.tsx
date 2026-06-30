"use client";

import Link from "next/link";
import { COMPANY } from "@/lib/config";
import { getTranslation } from "@/lib/i18n";
import type { Language } from "@/lib/config";
import styles from "./Footer.module.css";

interface FooterProps {
  locale: Language;
}

export default function Footer({ locale }: FooterProps) {
  const t = getTranslation(locale);

  // Clean WhatsApp for link
  const cleanWhatsApp = "971547530333";
  const cleanPhone = "97142261930";

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Column (Right-most in RTL, Left-most in LTR) */}
          <div className={styles.columnBrand}>
            <div className={styles.brandHeader}>
              <img src={COMPANY.logo} alt={COMPANY.nameEn} className={styles.footerLogo} />
              <div className={styles.brandTitleContainer}>
                <h3 className={styles.columnTitle}>
                  {locale === "ar" || locale === "ur" ? COMPANY.nameAr : COMPANY.nameEn}
                </h3>
                <span className={styles.subText}>TRADING CO. LLC</span>
              </div>
            </div>
            <p className={styles.tagline}>
              {locale === "ar" || locale === "ur"
                ? "موزع بالجملة لأجود المواد الغذائية في دبي والإمارات."
                : "Wholesale distributor of the finest foodstuff in Dubai and the UAE."}
            </p>
            
            {/* Socials nested here as in the reference image */}
            <div className={styles.socialsInline}>
              <a href={`https://wa.me/${cleanWhatsApp}`} aria-label="WhatsApp" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.11 4.91A9.82 9.82 0 0 0 12.03 2C6.55 2 2.08 6.46 2.08 11.94c0 1.76.46 3.47 1.33 4.98L2 22l5.19-1.36a9.91 9.91 0 0 0 4.84 1.23h.01c5.48 0 9.94-4.46 9.94-9.94a9.86 9.86 0 0 0-2.88-7.02Zm-7.08 15.27h-.01a8.12 8.12 0 0 1-4.15-1.13l-.3-.18-3.08.81.82-3-.2-.31a8.12 8.12 0 0 1-1.25-4.34c0-4.49 3.65-8.14 8.14-8.14 2.17 0 4.21.84 5.75 2.38a8.08 8.08 0 0 1 2.38 5.76c0 4.49-3.65 8.14-8.14 8.14Zm4.46-6.08c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.42-1.35-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.48-.4-.41-.54-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.33.98 2.49c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/>
                </svg>
              </a>
              <a href={COMPANY.instagram} aria-label="Instagram" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href={COMPANY.facebook} aria-label="Facebook" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className={styles.column}>
            <h4 className={styles.columnHeading}>{t.footer.quickLinks}</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href={`/${locale}`}>{t.nav.home}</Link>
              </li>
              <li>
                <Link href={`/${locale}/products`}>{t.nav.products}</Link>
              </li>
              <li>
                <Link href={`/${locale}/about`}>{t.nav.about}</Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`}>{t.nav.contact}</Link>
              </li>
            </ul>
          </div>

          {/* Contact Column with Icons */}
          <div className={styles.column}>
            <h4 className={styles.columnHeading}>{t.footer.contact}</h4>
            <div className={styles.contactInfoList}>
              {/* Executive Line */}
              <div className={styles.contactItem}>
                <span className={styles.contactIconWhatsApp}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.11 4.91A9.82 9.82 0 0 0 12.03 2C6.55 2 2.08 6.46 2.08 11.94c0 1.76.46 3.47 1.33 4.98L2 22l5.19-1.36a9.91 9.91 0 0 0 4.84 1.23h.01c5.48 0 9.94-4.46 9.94-9.94a9.86 9.86 0 0 0-2.88-7.02Zm-7.08 15.27h-.01a8.12 8.12 0 0 1-4.15-1.13l-.3-.18-3.08.81.82-3-.2-.31a8.12 8.12 0 0 1-1.25-4.34c0-4.49 3.65-8.14 8.14-8.14 2.17 0 4.21.84 5.75 2.38a8.08 8.08 0 0 1 2.38 5.76c0 4.49-3.65 8.14-8.14 8.14Zm4.46-6.08c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.42-1.35-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.48-.4-.41-.54-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.33.98 2.49c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/>
                  </svg>
                </span>
                <a href={`https://wa.me/${cleanWhatsApp}`} target="_blank" rel="noopener noreferrer" dir="ltr" className={styles.contactLink}>
                  +971 54 753 0333
                </a>
              </div>
              {/* General Phone Line */}
              <div className={styles.contactItem}>
                <span className={styles.contactIconPhone}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </span>
                <a href={`tel:${cleanPhone}`} dir="ltr" className={styles.contactLink}>
                  +971 4 226 1930
                </a>
              </div>
              {/* Email */}
              <div className={styles.contactItem}>
                <span className={styles.contactIconMail}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <a href={`mailto:${COMPANY.email}`} className={styles.contactLink}>
                  {COMPANY.email}
                </a>
              </div>
              {/* Address */}
              <div className={styles.contactItem}>
                <span className={styles.contactIconPin}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <span className={styles.contactText}>
                  {locale === "ar" || locale === "ur" ? COMPANY.address : COMPANY.addressEn}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            {locale === "ar" || locale === "ur"
              ? `© 2024 ${COMPANY.nameAr} لتجارة المواد الغذائية ذ.م.م — جميع الحقوق محفوظة.`
              : `© 2024 ${COMPANY.nameEn} Foodstuff Trading Co. LLC — All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
