"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY, SUPPORTED_LANGUAGES } from "@/lib/config";
import { getTranslation } from "@/lib/i18n";
import type { Language } from "@/lib/config";
import styles from "./Navbar.module.css";

interface NavbarProps {
  locale: Language;
}

export default function Navbar({ locale }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const t = getTranslation(locale);

  function switchLanguage(newLocale: string) {
    // Replace the leading locale segment, keep the rest of the path.
    const segments = (pathname || `/${locale}`).split("/");
    segments[1] = newLocale;
    window.location.href = segments.join("/") || `/${newLocale}`;
  }

  const navLinks = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/products`, label: t.nav.products },
    { href: `/${locale}/catalog`, label: t.nav.catalog },
    { href: `/${locale}/services`, label: t.nav.services },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.inner}`}>
        <Link href={`/${locale}`} className={styles.brand} onClick={() => setOpen(false)}>
          <img src={COMPANY.logo} alt={COMPANY.nameEn} className={styles.logoImg} />
          <span className={styles.logoText}>
            {locale === "ar" || locale === "ur"
              ? COMPANY.nameAr
              : locale === "fr"
                ? "Royal Harvest"
                : locale === "es"
                  ? "Royal Harvest"
                  : COMPANY.nameEn}
          </span>
        </Link>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.activeNavLink : ""}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={`https://wa.me/971547530333?text=${encodeURIComponent(
              locale === "ar" || locale === "ur"
                ? "مرحباً، أود تقديم طلب لشراء بعض المنتجات."
                : "Hello, I would like to place an order."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.navLink} ${styles.navOrderBtn}`}
            onClick={() => setOpen(false)}
          >
            {locale === "ar"
              ? "اطلب الآن"
              : locale === "ur"
                ? "ابھی آرڈر کریں"
                : locale === "fr"
                  ? "Commander"
                  : locale === "es"
                    ? "Ordenar Ahora"
                    : "Order Now"}
          </a>
        </nav>

        {/* Language Switcher and CTA */}
        <div className={styles.actions}>
          <a
            href={`https://wa.me/971547530333?text=${encodeURIComponent(
              locale === "ar" || locale === "ur"
                ? "مرحباً، أود تقديم طلب لشراء بعض المنتجات."
                : "Hello, I would like to place an order."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            {locale === "ar"
              ? "اطلب الآن"
              : locale === "ur"
                ? "ابھی آرڈر کریں"
                : locale === "fr"
                  ? "Commander"
                  : locale === "es"
                    ? "Ordenar Ahora"
                    : "Order Now"}
          </a>

          {/* Search Link */}
          <Link href={`/${locale}/search`} className={styles.searchLink} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>


          {/* Custom Language Dropdown */}
          <div className={styles.languageSwitcher} onMouseLeave={() => setLangOpen(false)}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={styles.languageBtn}
              aria-label="Select language"
            >
              {/* Globe Icon */}
              <svg className={styles.globeIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              
              <span className={styles.langLabel}>{SUPPORTED_LANGUAGES[locale].name}</span>
              <span className={styles.countryCode}>
                {locale === "en" ? "GB" : locale === "ar" ? "AE" : locale === "ur" ? "PK" : locale.toUpperCase()}
              </span>

              {/* Dropdown Arrow */}
              <span className={`${styles.dropdownArrow} ${langOpen ? styles.dropdownArrowOpen : ""}`} aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
              </span>
            </button>

            {langOpen && (
              <div className={styles.langDropdown}>
                {Object.entries(SUPPORTED_LANGUAGES).map(([code, { name }]) => (
                  <button
                    key={code}
                    onClick={() => {
                      switchLanguage(code);
                      setLangOpen(false);
                    }}
                    className={`${styles.langOption} ${locale === code ? styles.langOptionActive : ""}`}
                  >
                    <span className={styles.langName}>{name}</span>
                    <span className={styles.langCode}>
                      {code === "en" ? "GB" : code === "ar" ? "AE" : code === "ur" ? "PK" : code.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className={styles.burger}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
