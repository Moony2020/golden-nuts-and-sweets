"use client";

import { useState } from "react";
import styles from "./Form.module.css";

const DEPARTMENTS = [
  { id: "executive", title: "Executive Management", phone: "+971547530333", displayPhone: "+971 54 753 0333" },
  { id: "sales", title: "Sales", phone: "+971586349451", displayPhone: "+971 58 634 9451" },
  { id: "accounts", title: "Accounts", phone: "+971506573340", displayPhone: "+971 50 657 3340" },
  { id: "general", title: "General Line", phone: "+97142261930", displayPhone: "+971 4 226 1930" }
];

export default function ContactForm() {
  const [selectedDept, setSelectedDept] = useState("sales");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const name = formData.get("name") as string;
    const phone = formData.get("whatsappNumber") as string;
    const productType = formData.get("productType") as string;
    
    const dept = DEPARTMENTS.find(d => d.id === selectedDept) || DEPARTMENTS[1];

    let message = `Hello, I have a request:\n\n*Name & Company:* ${name}\n*WhatsApp Number:* ${phone}\n`;
    if (productType) {
      message += `*Required Product Type:* ${productType}\n`;
    }

    const whatsappUrl = `https://wa.me/${dept.phone.replace("+", "")}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, "_blank");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Send Your Request</h2>
        <p className={styles.formSubtitle}>Please fill out the form below for quick contact:</p>
      </div>

      <div className="field">
        <label htmlFor="name" className={styles.formLabel}>Name and Company Name *</label>
        <input id="name" name="name" placeholder="e.g. Ahmed — Al Salam Restaurant" required className={styles.formInput} />
      </div>
      
      <div className="field">
        <label htmlFor="whatsappNumber" className={styles.formLabel}>WhatsApp Number *</label>
        <input id="whatsappNumber" name="whatsappNumber" type="tel" dir="ltr" placeholder="+971 XX XXX XXXX" required className={styles.formInput} />
      </div>

      <div className="field">
        <label className={styles.formLabel}>Target Department *</label>
        <div className={styles.departmentGrid}>
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              type="button"
              className={`${styles.deptButton} ${selectedDept === dept.id ? styles.active : ""}`}
              onClick={() => setSelectedDept(dept.id)}
            >
              <span className={styles.deptTitle}>{dept.title}</span>
              <span className={styles.deptPhone}>{dept.displayPhone}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="productType" className={styles.formLabel}>Required Product Type</label>
        <input id="productType" name="productType" placeholder="e.g. Basmati Rice, Almonds" className={styles.formInput} />
      </div>

      <button type="submit" className={styles.submitButton}>
        Send via WhatsApp
      </button>
    </form>
  );
}
