"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES, COMPANY } from "@/lib/config";
import type { Language } from "@/lib/config";
import styles from "./contact.module.css";

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

export default function ContactPage({ params }: Props) {
  const locale = params.locale as Language;
  if (!Object.keys(SUPPORTED_LANGUAGES).includes(locale)) notFound();

  // Departments Data
  const DEPARTMENTS = [
    {
      id: "executive",
      ar: "الإدارة التنفيذية",
      en: "Executive Management",
      phone: "+971 54 753 0333",
      cleanPhone: "971547530333",
    },
    {
      id: "sales",
      ar: "المبيعات",
      en: "Sales",
      phone: "+971 58 634 9451",
      cleanPhone: "971586349451",
    },
    {
      id: "accounts",
      ar: "الحسابات",
      en: "Accounts",
      phone: "+971 50 657 3340",
      cleanPhone: "971506573340",
    },
    {
      id: "general",
      ar: "الخط العام",
      en: "General Line",
      phone: "+971 4 226 1930",
      cleanPhone: "97142261930",
    },
  ];

  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    department: "sales", // default to sales
    product: "",
    notes: "",
  });

  const [newsletter, setNewsletter] = useState({ email: "", phone: "", name: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const updateNews = (k: keyof typeof newsletter) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewsletter((f) => ({ ...f, [k]: e.target.value }));

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const dept = DEPARTMENTS.find((d) => d.id === form.department) || DEPARTMENTS[1];
    
    let text = "";
    if (locale === "ar" || locale === "ur") {
      text = `*طلب جديد*\n\n*الاسم:* ${form.name}\n*رقم الواتساب:* ${form.whatsapp}\n*القسم المطلوب:* ${dept.ar}\n*المنتج:* ${form.product}\n*ملاحظات:* ${form.notes}`;
    } else {
      text = `*New Request*\n\n*Name:* ${form.name}\n*WhatsApp:* ${form.whatsapp}\n*Target Department:* ${dept.en}\n*Product:* ${form.product}\n*Notes:* ${form.notes}`;
    }

    const url = `https://wa.me/${dept.cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>
            {label(locale, "تواصل معنا", "Contact Us")}
          </span>
          <h1 className={styles.heroTitle}>
            {label(locale, "ابدأ التعاون معنا اليوم", "Start Collaborating With Us Today")}
          </h1>
          <p className={styles.heroText}>
            {label(
              locale,
              "فريقنا جاهز للرد على استفساراتكم وتلبية احتياجاتكم من المواد الغذائية بالجملة.",
              "Our team is ready to answer your inquiries and meet your wholesale foodstuff needs."
            )}
          </p>
        </div>
      </section>

      {/* DEPARTMENTS BAND */}
      <section className={styles.departmentsBand}>
        <div className={styles.departmentsGrid}>
          {DEPARTMENTS.map((dept) => (
            <div key={dept.id} className={styles.deptCard}>
              <div className={styles.deptHeader}>
                <h3 className={styles.deptTitle}>{label(locale, dept.ar, dept.en)}</h3>
                <span className={styles.deptIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.062-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
                  </svg>
                </span>
              </div>
              <div>
                <p className={styles.deptPhone}>{dept.phone}</p>
                <p className={styles.deptWhatsapp}>WhatsApp</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAP & FORM */}
      <section className={styles.contentSection}>
        {/* Map Column */}
        <div className={styles.mapColumn}>
          <div className={styles.mapBox}>
            <iframe
              src="https://maps.google.com/maps?q=Al%20Aweer%20Fruit%20and%20Vegetable%20Market%20Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className={styles.mapFrame}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className={styles.infoCardsRow}>
            <div className={styles.infoCard}>
              <h4 className={styles.infoCardTitle}>{label(locale, "الموقع", "Location")}</h4>
              <p className={styles.infoCardText}>
                {label(locale, "دبي، الإمارات العربية المتحدة", "Dubai, United Arab Emirates")}
              </p>
            </div>
            <div className={styles.infoCard}>
              <h4 className={styles.infoCardTitle}>{label(locale, "ساعات العمل", "Working Hours")}</h4>
              <p className={styles.infoCardText}>
                {label(locale, "الإثنين — السبت: 9 ص — 7 م", "Mon — Sat: 9 AM — 7 PM")}
              </p>
            </div>
          </div>
          <div className={styles.emailCard}>
            <h4 className={styles.infoCardTitle}>{label(locale, "البريد الإلكتروني", "Email")}</h4>
            <p className={styles.infoCardText}>{COMPANY.email}</p>
          </div>
        </div>

        {/* Form Column */}
        <form className={styles.formBox} onSubmit={handleFormSubmit}>
          <h2 className={styles.formTitle}>{label(locale, "أرسل طلبك", "Send Your Request")}</h2>
          <p className={styles.formSubtitle}>
            {label(locale, "الرجاء تعبئة النموذج أدناه للتواصل السريع:", "Please fill out the form below for quick contact:")}
          </p>

          <div className={styles.field}>
            <label>{label(locale, "الاسم واسم الشركة *", "Name and Company Name *")}</label>
            <input
              type="text"
              required
              placeholder={label(locale, "مثال: أحمد — مطعم السلام", "e.g. Ahmed — Al Salam Restaurant")}
              value={form.name}
              onChange={update("name")}
            />
          </div>

          <div className={styles.field}>
            <label>{label(locale, "رقم الواتساب *", "WhatsApp Number *")}</label>
            <input
              type="text"
              required
              dir="ltr"
              placeholder="+971 XX XXX XXXX"
              value={form.whatsapp}
              onChange={update("whatsapp")}
            />
          </div>

          <div className={styles.field}>
            <label>{label(locale, "القسم المعني *", "Target Department *")}</label>
            <div className={styles.radioGrid}>
              {DEPARTMENTS.map((dept) => (
                <label key={dept.id} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="department"
                    value={dept.id}
                    checked={form.department === dept.id}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className={styles.radioInput}
                  />
                  <div className={styles.radioCard}>
                    <h5>{label(locale, dept.ar, dept.en)}</h5>
                    <p>{dept.phone}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label>{label(locale, "نوع المنتج المطلوب", "Required Product Type")}</label>
            <input
              type="text"
              placeholder={label(locale, "مثال: أرز بسمتي، مكسرات، بهارات...", "e.g. Basmati Rice, Nuts, Spices...")}
              value={form.product}
              onChange={update("product")}
            />
          </div>

          <div className={styles.field}>
            <label>{label(locale, "ملاحظات إضافية", "Additional Notes")}</label>
            <textarea
              rows={3}
              placeholder={label(locale, "الكمية المطلوبة، تكرار الطلب، أي تفاصيل أخرى...", "Required quantity, frequency of orders, any other details...")}
              value={form.notes}
              onChange={update("notes")}
            />
          </div>

          <button type="submit" className={styles.whatsappSubmit}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.062-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
            </svg>
            {label(locale, "إرسال عبر واتساب", "Send via WhatsApp")}
          </button>
          <p className={styles.submitNote}>
            {label(locale, "سيتم فتح واتساب مع رسالة تحتوي على بياناتك", "WhatsApp will open with a message containing your details")}
          </p>
        </form>
      </section>

      {/* NEWSLETTER */}
      <section className={styles.newsletterBand}>
        <div className={styles.newsletterInner}>
          <span className={styles.newsletterEyebrow}>{label(locale, "ابق على اطلاع", "Stay Updated")}</span>
          <h2 className={styles.newsletterTitle}>{label(locale, "اشترك في قائمتنا البريدية", "Subscribe to Our Mailing List")}</h2>
          <p className={styles.newsletterText}>
            {label(locale, "احصل على أحدث عروض الجملة وأسعار الموسم وإشعارات المنتجات الجديدة مباشرة في بريدك.", "Get the latest wholesale offers, seasonal prices, and new product notifications right in your inbox.")}
          </p>

          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              className={styles.newsletterInput}
              placeholder={label(locale, "البريد الإلكتروني *", "Email Address *")}
              value={newsletter.email}
              onChange={updateNews("email")}
            />
            <div className={styles.newsletterRow}>
              <input
                type="text"
                className={styles.newsletterInput}
                placeholder={label(locale, "رقم واتساب (اختياري)", "WhatsApp Number (Optional)")}
                value={newsletter.phone}
                onChange={updateNews("phone")}
              />
              <input
                type="text"
                className={styles.newsletterInput}
                placeholder={label(locale, "اسمك أو اسم شركتك (اختياري)", "Name or Company Name (Optional)")}
                value={newsletter.name}
                onChange={updateNews("name")}
              />
            </div>
            <button type="submit" className={styles.newsletterSubmit}>
              ✉️ {label(locale, "اشترك الآن", "Subscribe Now")}
            </button>
            <span className={styles.newsletterPrivacy}>
              🔒 {label(locale, "لن نشارك بياناتك مع أي طرف ثالث. يمكنك إلغاء الاشتراك في أي وقت.", "We will never share your details with any third party. You can unsubscribe at any time.")}
            </span>
          </form>
        </div>
      </section>
    </div>
  );
}
