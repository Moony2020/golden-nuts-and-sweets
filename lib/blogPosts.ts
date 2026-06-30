export interface BlogPost {
  slug: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  contentAr: string;
  contentEn: string;
  date: string;
  tag: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "global-food-trade-2024",
    titleAr: "اتجاهات تجارة الغذاء العالمية لعام 2024",
    titleEn: "Global Food Trade Trends for 2024",
    excerptAr: "نظرة على أهم التحولات في أسواق المواد الغذائية بالجملة هذا العام.",
    excerptEn: "A look at the key shifts in wholesale foodstuff markets this year.",
    contentAr:
      "يشهد قطاع تجارة المواد الغذائية بالجملة تحولات كبيرة مدفوعة بسلاسل التوريد العالمية وتغيّر أنماط الطلب. في هذا المقال نستعرض أبرز الاتجاهات التي تؤثر على المطاعم والفنادق وتجار الجملة، وكيف يمكن لشركتك الاستفادة منها للحصول على أفضل الأسعار والجودة.",
    contentEn:
      "The wholesale foodstuff sector is undergoing major shifts driven by global supply chains and changing demand patterns. In this article we review the top trends affecting restaurants, hotels, and wholesalers, and how your business can leverage them for the best pricing and quality.",
    date: "2024-03-12",
    tag: "Market Trends",
  },
  {
    slug: "import-export-updates",
    titleAr: "تحديثات الاستيراد والتصدير في الخليج",
    titleEn: "Import & Export Updates in the Gulf",
    excerptAr: "آخر المستجدات حول لوائح الاستيراد والتصدير للمواد الغذائية.",
    excerptEn: "The latest on foodstuff import and export regulations.",
    contentAr:
      "تتغيّر لوائح الاستيراد والتصدير باستمرار في دول الخليج، ما يؤثر على توقيت وتكلفة توريد المنتجات الغذائية. نقدّم لك ملخصاً عملياً لأحدث التحديثات وكيفية ضمان امتثال شحناتك ووصولها في الوقت المحدد.",
    contentEn:
      "Import and export regulations in the Gulf change frequently, affecting the timing and cost of supplying food products. We provide a practical summary of the latest updates and how to ensure your shipments stay compliant and arrive on time.",
    date: "2024-02-28",
    tag: "Import/Export",
  },
  {
    slug: "restaurant-supply-tips",
    titleAr: "نصائح لتوريد المطاعم بكفاءة",
    titleEn: "Tips for Efficient Restaurant Supply",
    excerptAr: "كيف تدير توريد مطعمك بأقل تكلفة وأعلى جودة.",
    excerptEn: "How to manage your restaurant supply at lower cost and higher quality.",
    contentAr:
      "إدارة التوريد بكفاءة هي مفتاح ربحية أي مطعم. نشارك معك نصائح عملية حول التخطيط للطلبات، والتفاوض مع الموردين، وتقليل الهدر، واختيار شريك توريد موثوق يضمن استمرارية أعمالك.",
    contentEn:
      "Efficient supply management is key to any restaurant's profitability. We share practical tips on order planning, supplier negotiation, reducing waste, and choosing a reliable supply partner that keeps your business running.",
    date: "2024-02-10",
    tag: "Restaurant Supply",
  },
  {
    slug: "premium-nuts-highlight",
    titleAr: "إضاءة على منتجات المكسرات الفاخرة",
    titleEn: "Spotlight: Premium Nuts Selection",
    excerptAr: "تعرّف على تشكيلتنا الفاخرة من المكسرات ومصادرها العالمية.",
    excerptEn: "Discover our premium nut selection and its global origins.",
    contentAr:
      "من اللوز الكاليفورني إلى الفستق الإيراني والكاجو الفيتنامي، تضم تشكيلتنا أجود أنواع المكسرات المختارة بعناية. نستعرض في هذا المقال مصادر منتجاتنا ومعايير الجودة التي نلتزم بها.",
    contentEn:
      "From Californian almonds to Iranian pistachios and Vietnamese cashews, our selection features the finest hand-picked nuts. In this article we review our product origins and the quality standards we uphold.",
    date: "2024-01-22",
    tag: "Product Highlight",
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
