"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES, CATEGORIES } from "@/lib/config";
import type { Language } from "@/lib/config";
import styles from "./quote.module.css";

interface Props {
  params: { locale: string };
}

function label(
  locale: Language,
  ar: string,
  en: string,
  extra?: { ur?: string; fr?: string; es?: string }
) {
  if (locale === "ar") return ar;
  if (locale === "ur") return extra?.ur ?? ar;
  if (locale === "fr") return extra?.fr ?? en;
  if (locale === "es") return extra?.es ?? en;
  return en;
}

function RequestQuotePageContent({ locale }: { locale: Language }) {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    companyName: "",
    country: "",
    productName: searchParams?.get("product") || "",
    category: searchParams?.get("category") || "",
    quantity: "",
    message: "",
  });

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({
        customerName: "",
        phone: "",
        email: "",
        companyName: "",
        country: "",
        productName: "",
        category: "",
        quantity: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={styles.wrap}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>{label(locale, "طلب عرض سعر", "Request a Quote")}</span>
        <h1 className={styles.title}>
          {label(locale, "احصل على أفضل سعر للجملة", "Get the best wholesale price")}
        </h1>
        <p className={styles.lead}>
          {label(
            locale,
            "املأ النموذج وسيتواصل معك فريق المبيعات بعرض سعر مخصّص.",
            "Fill in the form and our sales team will reach out with a tailored quote."
          )}
        </p>
      </section>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>{label(locale, "الاسم الكامل", "Full Name")} *</label>
            <input type="text" required value={form.customerName} onChange={update("customerName")} />
          </div>
          <div className={styles.field}>
            <label>{label(locale, "رقم الهاتف", "Phone")} *</label>
            <input type="tel" dir="ltr" required value={form.phone} onChange={update("phone")} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>{label(locale, "البريد الإلكتروني", "Email")}</label>
            <input type="email" value={form.email} onChange={update("email")} />
          </div>
          <div className={styles.field}>
            <label>{label(locale, "اسم الشركة", "Company")}</label>
            <input type="text" value={form.companyName} onChange={update("companyName")} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>{label(locale, "الدولة", "Country")}</label>
            <input type="text" value={form.country} onChange={update("country")} />
          </div>
          <div className={styles.field}>
            <label>{label(locale, "التصنيف", "Category")}</label>
            <select value={form.category} onChange={update("category")}>
              <option value="">{label(locale, "اختر تصنيفاً", "Select a category")}</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {locale === "ar" ? c.ar : locale === "ur" ? c.ur : locale === "fr" ? c.fr : locale === "es" ? c.es : c.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>{label(locale, "اسم المنتج", "Product Name")}</label>
            <input type="text" value={form.productName} onChange={update("productName")} />
          </div>
          <div className={styles.field}>
            <label>{label(locale, "الكمية المطلوبة", "Quantity")}</label>
            <input type="text" value={form.quantity} onChange={update("quantity")} placeholder={label(locale, "مثال: 100 كرتون", "e.g. 100 cartons")} />
          </div>
        </div>

        <div className={styles.field}>
          <label>{label(locale, "ملاحظات إضافية", "Additional Notes")}</label>
          <textarea rows={4} value={form.message} onChange={update("message")} />
        </div>

        <button type="submit" className={styles.submit} disabled={status === "sending"}>
          {status === "sending"
            ? label(locale, "جارٍ الإرسال...", "Sending...")
            : label(locale, "إرسال الطلب", "Submit Request")}
        </button>

        {status === "sent" && (
          <p className={styles.success}>
            {label(locale, "تم استلام طلبك! سيتواصل معك فريقنا قريباً.", "Request received! Our team will contact you soon.")}
          </p>
        )}
        {status === "error" && (
          <p className={styles.errorMsg}>
            {label(locale, "حدث خطأ. حاول مرة أخرى.", "Something went wrong. Please try again.")}
          </p>
        )}
      </form>
    </div>
  );
}

export default function RequestQuotePage({ params }: Props) {
  const locale = params.locale as Language;

  if (!Object.keys(SUPPORTED_LANGUAGES).includes(locale)) notFound();

  return (
    <Suspense fallback={<div className={styles.wrap} />}>
      <RequestQuotePageContent locale={locale} />
    </Suspense>
  );
}
