import Link from "next/link";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES } from "@/lib/config";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { IMG, BLOG_FALLBACKS } from "@/lib/images";
import type { Language } from "@/lib/config";
import SmartImage from "@/components/SmartImage";
import local from "./blog.module.css";

interface Props {
  params: { locale: string };
}

function label(locale: Language, ar: string, en: string) {
  if (locale === "ar" || locale === "ur") return ar;
  return en;
}

export default function BlogPage({ params }: Props) {
  const locale = params.locale as Language;
  if (!Object.keys(SUPPORTED_LANGUAGES).includes(locale)) notFound();

  const featured = BLOG_POSTS[0];
  const secondaryPosts = BLOG_POSTS.slice(1);

  return (
    <div className={local.page}>
      <section className={local.hero}>
        <span className={local.eyebrow}>{label(locale, "المدونة", "Blog & News")}</span>
        <h1 className={local.heroTitle}>{label(locale, "أخبار ورؤى من عالم تجارة الغذاء", "News & insights from the food trade")}</h1>
        <p className={local.heroLead}>
          {label(locale, "مقالات حول أسواق الجملة، الاستيراد والتصدير، ونصائح التوريد.", "Articles on wholesale markets, import/export, and supply tips.")}
        </p>
      </section>

      <section className={local.featuredSection}>
        <Link href={`/${locale}/blog/${featured.slug}`} className={local.featuredPost}>
          <div className={local.featuredMedia}>
            <SmartImage
              src={IMG.blog[0]}
              fallback={BLOG_FALLBACKS[0]}
              alt={label(locale, featured.titleAr, featured.titleEn)}
              className={local.featuredImage}
            />
            <div className={local.featuredOverlay}>
              <span className={local.featuredTag}>{featured.tag}</span>
              <h2 className={local.featuredTitle}>{label(locale, featured.titleAr, featured.titleEn)}</h2>
              <p className={local.featuredExcerpt}>{label(locale, featured.excerptAr, featured.excerptEn)}</p>
            </div>
          </div>
        </Link>
      </section>

      <section className={local.postsSection}>
        <div className={local.sectionHeading}>
          <span className={local.sectionLine} />
          <h2>{label(locale, "أحدث المقالات", "Latest Articles")}</h2>
        </div>

        <div className={local.posts}>
          {secondaryPosts.map((post, i) => (
            <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className={local.post}>
              <div className={local.postImage}>
                <SmartImage
                  src={IMG.blog[(i + 1) % IMG.blog.length]}
                  fallback={BLOG_FALLBACKS[(i + 1) % BLOG_FALLBACKS.length]}
                  alt={label(locale, post.titleAr, post.titleEn)}
                  className={local.postImageImg}
                />
                <span className={local.tag}>{post.tag}</span>
              </div>
              <div className={local.postBody}>
                <time className={local.date}>{post.date}</time>
                <h3 className={local.postTitle}>{label(locale, post.titleAr, post.titleEn)}</h3>
                <p className={local.postExcerpt}>{label(locale, post.excerptAr, post.excerptEn)}</p>
                <span className={local.readMore}>{label(locale, "اقرأ المزيد", "Read more")} &#8592;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
