import Link from "next/link";
import { categoryLabel } from "@/lib/config";
import type { PlainProduct } from "@/lib/data";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: PlainProduct }) {
  return (
    <article className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.imageWrap}>
        {product.image ? (
          // نستخدم img عادي لأن مصادر الصور قد تكون خارجية وغير معروفة مسبقاً
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <div className={styles.placeholder}>صورة المنتج</div>
        )}
        {!product.available && <span className={styles.badge}>غير متوفّر حالياً</span>}
      </Link>

      <div className={styles.body}>
        <span className={styles.category}>{categoryLabel(product.category)}</span>
        <h3 className={styles.name}>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        {product.description && (
          <p className={styles.desc}>{product.description.slice(0, 90)}</p>
        )}
        <Link
          href={`/quote?product=${encodeURIComponent(product.name)}`}
          className="btn btn-gold"
        >
          اطلب عرض سعر
        </Link>
      </div>
    </article>
  );
}
