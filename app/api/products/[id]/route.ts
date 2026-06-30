import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";

export const dynamic = "force-dynamic";

// GET /api/products/:id
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const product = await Product.findById(params.id).lean();
    if (!product) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (err) {
    console.error("GET /api/products/:id", err);
    return NextResponse.json({ error: "تعذّر جلب المنتج" }, { status: 500 });
  }
}

// PUT /api/products/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await req.json();
    const product = await Product.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (err) {
    console.error("PUT /api/products/:id", err);
    return NextResponse.json({ error: "تعذّر تحديث المنتج" }, { status: 500 });
  }
}

// DELETE /api/products/:id
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const product = await Product.findByIdAndDelete(params.id);
    if (!product) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/products/:id", err);
    return NextResponse.json({ error: "تعذّر حذف المنتج" }, { status: 500 });
  }
}
