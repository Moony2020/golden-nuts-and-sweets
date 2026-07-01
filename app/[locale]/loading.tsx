import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.screen}>
      <div className={styles.spinner}>
        <div className={styles.ringOuter} />
        <div className={styles.ringInner} />
        <span className={styles.star}>✦</span>
      </div>
      <div className={styles.brand}>
        <span className={styles.brandName}>Golden Foodstuff</span>
        <span className={styles.brandSub}>Trading Co.</span>
      </div>
      <div className={styles.bar}>
        <div className={styles.barFill} />
      </div>
    </div>
  );
}
