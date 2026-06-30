import Link from "next/link";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES } from "@/lib/config";
import { getPost } from "@/lib/blogPosts";
import { IMG, BLOG_FALLBACKS } from "@/lib/images";
import type { Language } from "@/lib/config";
import SmartImage from "@/components/SmartImage";
import { BLOG_POSTS } from "@/lib/blogPosts";
import styles from "../../shared.module.css";
import local from "../blog.module.css";

interface Props {
  params: { locale: string; slug: string };
}

function label(locale: Language, ar: string, en: string) {
  if (locale === "ar" || locale === "ur") return ar;
  return en;
}

export default function BlogDetailPage({ params }: Props) {
  const locale = params.locale as Language;
  if (!Object.keys(SUPPORTED_LANGUAGES).includes(locale)) notFound();

  const post = getPost(params.slug);
  if (!post) notFound();

  const idx = Math.max(0, BLOG_POSTS.findIndex((p) => p.slug === post.slug));

  return (
    <div className={styles.wrap}>
      <article className={local.article}>
        <Link href={`/${locale}/blog`} className={local.back}>
          ← {label(locale, "العودة للمدونة", "Back to Blog")}
        </Link>
        <span className={local.articleTag}>{post.tag}</span>
        <h1 className={local.articleTitle}>{label(locale, post.titleAr, post.titleEn)}</h1>
        <time className={local.articleDate}>{post.date}</time>
        <SmartImage
          src={IMG.blog[idx % IMG.blog.length]}
          fallback={BLOG_FALLBACKS[idx % BLOG_FALLBACKS.length]}
          alt={label(locale, post.titleAr, post.titleEn)}
          className={local.articleBanner}
        />
        <div className={local.articleContent}>{label(locale, post.contentAr, post.contentEn)}</div>
      </article>
    </div>
  );
}
