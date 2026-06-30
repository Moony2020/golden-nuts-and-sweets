import { connectDB } from "./db";
import { Product, type ProductType } from "@/models/Product";

// نسخة مبسّطة من المنتج جاهزة للعرض (بدون كائنات Mongo)
export interface PlainProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  originCountry: string;
  packaging: string;
  available: boolean;
}

function toPlain(p: ProductType): PlainProduct {
  return {
    _id: String(p._id),
    name: p.name,
    slug: p.slug,
    category: p.category,
    description: p.description ?? "",
    image: p.image ?? "",
    originCountry: p.originCountry ?? "",
    packaging: p.packaging ?? "",
    available: p.available ?? true,
  };
}

export async function getProducts(category?: string): Promise<PlainProduct[]> {
  try {
    await connectDB();
    const filter = category ? { category } : {};
    const docs = await Product.find(filter).sort({ createdAt: -1 }).lean<ProductType[]>();
    return docs.map(toPlain);
  } catch (err) {
    console.error("getProducts", err);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<PlainProduct | null> {
  try {
    await connectDB();
    const doc = await Product.findOne({ slug }).lean<ProductType>();
    return doc ? toPlain(doc) : null;
  } catch (err) {
    console.error("getProductBySlug", err);
    return null;
  }
}
