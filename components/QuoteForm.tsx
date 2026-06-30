"use client";

import { useState } from "react";
import styles from "./Form.module.css";

interface Props {
  defaultProduct?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function QuoteForm({ defaultProduct = "" }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "حدث خطأ");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "تعذّر إرسال الطلب");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.done}>
        <h3>تم استلام طلبك ✅</h3>
        <p>سنتواصل معك في أقرب وقت لتزويدك بعرض السعر.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className="grid-2">
        <div className="field">
          <label htmlFor="customerName">الاسم *</label>
          <input id="customerName" name="customerName" required />
        </div>
        <div className="field">
          <label htmlFor="phone">رقم الهاتف *</label>
          <input id="phone" name="phone" type="tel" required dir="ltr" />
        </div>
      </div>

      <div className="grid-2">
        <div className="field">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input id="email" name="email" type="email" dir="ltr" />
        </div>
        <div className="field">
          <label htmlFor="companyName">اسم الشركة / المنشأة</label>
          <input id="companyName" name="companyName" />
        </div>
      </div>

      <div className="grid-2">
        <div className="field">
          <label htmlFor="productName">المنتج المطلوب</label>
          <input id="productName" name="productName" defaultValue={defaultProduct} />
        </div>
        <div className="field">
          <label htmlFor="quantity">الكمية التقريبية</label>
          <input id="quantity" name="quantity" placeholder="مثال: 50 كيس" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">تفاصيل إضافية</label>
        <textarea id="message" name="message" />
      </div>

      <button type="submit" className="btn btn-gold" disabled={status === "loading"}>
        {status === "loading" ? "جارٍ الإرسال..." : "إرسال الطلب"}
      </button>

      {status === "error" && <p className="form-note error">{error}</p>}
    </form>
  );
}
