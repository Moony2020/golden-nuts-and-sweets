# موقع شركة مواد غذائية — Next.js Full-Stack

موقع كتالوج لشركة تجارة مواد غذائية بالجملة. مبني بالكامل على **Next.js** (واجهة + API بنفس المشروع)، مع **MongoDB**. بدون تسجيل دخول، بدون دفع، بدون سلة — فقط كتالوج + طلب عرض سعر + تواصل + زر واتساب.

## الـ Stack

- **Next.js 14** (App Router) + **TypeScript** — الواجهة والـ API معاً
- **MongoDB** + **Mongoose**
- **CSS Modules** (دعم RTL كامل)

> ملاحظة: لا يوجد Express منفصل. كل الـ API داخل Next.js تحت `app/api`. هذا يعني نشر واحد فقط واستضافة أرخص.

## التشغيل محلياً

```bash
# 1) تثبيت الحزم
npm install

# 2) إعداد متغيرات البيئة
cp .env.example .env.local
# ثم عبّئ MONGODB_URI ورقم الواتساب داخل .env.local

# 3) (اختياري) تعبئة منتجات تجريبية
npm run seed

# 4) تشغيل التطوير
npm run dev
```

الموقع يعمل على: http://localhost:3000

## متغيرات البيئة (.env.local)

| المتغير | الوصف |
|---|---|
| `MONGODB_URI` | رابط الاتصال من MongoDB Atlas |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | رقم الواتساب بصيغة دولية بدون + (مثال: `971547530333`) |
| `NEXT_PUBLIC_COMPANY_NAME` | اسم الشركة الظاهر في الموقع |

## الصفحات

| المسار | الصفحة |
|---|---|
| `/` | الرئيسية (هيرو + تصنيفات + منتجات مميزة) |
| `/products` | كل المنتجات + فلترة بالتصنيف |
| `/products/[slug]` | تفاصيل المنتج |
| `/about` | من نحن |
| `/quote` | طلب عرض سعر |
| `/contact` | تواصل معنا |

## الـ API

| الميثود والمسار | الوظيفة |
|---|---|
| `GET /api/products` | كل المنتجات (يدعم `?category=`) |
| `POST /api/products` | إضافة منتج |
| `GET /api/products/:id` | منتج واحد |
| `PUT /api/products/:id` | تعديل منتج |
| `DELETE /api/products/:id` | حذف منتج |
| `POST /api/quote` | إرسال طلب عرض سعر |
| `GET /api/quote` | عرض كل الطلبات |
| `POST /api/contact` | إرسال رسالة تواصل |
| `GET /api/contact` | عرض كل الرسائل |

## إدارة المنتجات

حالياً **لا توجد لوحة تحكم (admin panel)**. تُضاف المنتجات بإحدى طريقتين:

1. سكربت الـ seed: `npm run seed`
2. عبر الـ API مباشرة، مثال:

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"سكر أبيض","slug":"white-sugar","category":"grains","packaging":"كيس 50 كجم","origin":"البرازيل"}'
```

> أي إضافة/تعديل للمنتجات تتم من جهة المطوّر. لوحة تحكم لإدارة المنتجات والطلبات من المتصفح تُضاف لاحقاً كميزة منفصلة.

## النشر

موصى به **Vercel** (مجاني للبداية):

1. ارفع المشروع على GitHub
2. اربطه بـ Vercel
3. أضِف متغيرات البيئة في إعدادات المشروع على Vercel
4. Deploy

استخدم **MongoDB Atlas** لقاعدة البيانات (خطة مجانية متاحة).

## ملاحظات

- تصميم RTL عربي بالكامل، ألوان: أخضر داكن / ذهبي / كريمي.
- صور المنتجات تُحفظ كروابط (URL) في حقل `image`. ارفع الصور على أي خدمة (Cloudinary مثلاً) وضع الرابط.
- لإرسال إشعار إيميل عند كل طلب: أضف منطق الإرسال داخل `app/api/quote/route.ts` بعد `QuoteRequest.create`.
- لإضافة صورة خلفية للهيرو: ضع الصورة في `public/hero.jpg` وعدّل `.hero` في `app/home.module.css`.
