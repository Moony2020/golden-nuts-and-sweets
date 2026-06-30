"use client";

import { useEffect, useState, useRef } from "react";
import styles from "@/app/[locale]/home.module.css";

interface AnimatedStatsProps {
  customersLabel: string;
  experienceLabel: string;
  productsLabel: string;
}

export default function AnimatedStats({
  customersLabel,
  experienceLabel,
  productsLabel,
}: AnimatedStatsProps) {
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.statsSection}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statNumber}>
            +<CountUp target={10000} duration={2000} start={triggered} />
          </div>
          <div className={styles.statLabel}>{customersLabel}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statNumber}>
            <CountUp target={12} duration={2000} start={triggered} />
          </div>
          <div className={styles.statLabel}>{experienceLabel}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📦</div>
          <div className={styles.statNumber}>
            +<CountUp target={1000} duration={2000} start={triggered} />
          </div>
          <div className={styles.statLabel}>{productsLabel}</div>
        </div>
      </div>
    </section>
  );
}

function CountUp({
  target,
  duration,
  start,
}: {
  target: number;
  duration: number;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration, start]);

  return <>{count.toLocaleString()}</>;
}
