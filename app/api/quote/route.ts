import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { QuoteRequest } from "@/models/QuoteRequest";

export const dynamic = "force-dynamic";

// POST /api/quote
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.customerName || !body.phone) {
      return NextResponse.json(
        { error: "الاسم ورقم الهاتف حقول مطلوبة" },
        { status: 400 }
      );
    }

    const quote = await QuoteRequest.create(body);
    // مكان مناسب لاحقاً لإرسال إشعار إيميل/واتساب لصاحب الموقع
    return NextResponse.json({ success: true, quote }, { status: 201 });
  } catch (err) {
    console.error("POST /api/quote", err);
    return NextResponse.json({ error: "تعذّر إرسال الطلب" }, { status: 500 });
  }
}

// GET /api/quotes — لعرض الطلبات (تُحمى بكلمة سر/admin لاحقاً)
export async function GET() {
  try {
    await connectDB();
    const quotes = await QuoteRequest.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ quotes });
  } catch (err) {
    console.error("GET /api/quote", err);
    return NextResponse.json({ error: "تعذّر جلب الطلبات" }, { status: 500 });
  }
}
