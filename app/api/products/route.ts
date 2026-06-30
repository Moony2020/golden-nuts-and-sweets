import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";

export const dynamic = "force-dynamic";

// GET /api/products?category=grains
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;

    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(products);
  } catch (err) {
    console.error("GET /api/products", err);
    return NextResponse.json({ error: "تعذّر جلب المنتجات" }, { status: 500 });
  }
}

// POST /api/products
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.name || !body.slug || !body.category) {
      return NextResponse.json(
        { error: "الاسم والـ slug والتصنيف حقول مطلوبة" },
        { status: 400 }
      );
    }

    const product = await Product.create(body);
    return NextResponse.json({ product }, { status: 201 });
  } catch (err: unknown) {
    console.error("POST /api/products", err);
    // خطأ تكرار slug
    if (err && typeof err === "object" && "code" in err && err.code === 11000) {
      return NextResponse.json({ error: "هذا الـ slug مستخدم مسبقاً" }, { status: 409 });
    }
    return NextResponse.json({ error: "تعذّر إنشاء المنتج" }, { status: 500 });
  }
}
