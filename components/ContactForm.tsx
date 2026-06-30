"use client";

import { useState } from "react";
import styles from "./Form.module.css";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
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
      setError(err instanceof Error ? err.message : "تعذّر إرسال الرسالة");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.done}>
        <h3>تم إرسال رسالتك ✅</h3>
        <p>شكراً لتواصلك معنا، سنردّ عليك قريباً.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className="grid-2">
        <div className="field">
          <label htmlFor="c-name">الاسم *</label>
          <input id="c-name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="c-phone">رقم الهاتف</label>
          <input id="c-phone" name="phone" type="tel" dir="ltr" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="c-email">البريد الإلكتروني</label>
        <input id="c-email" name="email" type="email" dir="ltr" />
      </div>

      <div className="field">
        <label htmlFor="c-message">الرسالة *</label>
        <textarea id="c-message" name="message" required />
      </div>

      <button type="submit" className="btn btn-gold" disabled={status === "loading"}>
        {status === "loading" ? "جارٍ الإرسال..." : "إرسال الرسالة"}
      </button>

      {status === "error" && <p className="form-note error">{error}</p>}
    </form>
  );
}
