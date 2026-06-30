import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ContactMessage } from "@/models/ContactMessage";

export const dynamic = "force-dynamic";

// POST /api/contact
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.name || !body.message) {
      return NextResponse.json(
        { error: "الاسم والرسالة حقول مطلوبة" },
        { status: 400 }
      );
    }

    const contact = await ContactMessage.create(body);
    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (err) {
    console.error("POST /api/contact", err);
    return NextResponse.json({ error: "تعذّر إرسال الرسالة" }, { status: 500 });
  }
}

// GET /api/contacts
export async function GET() {
  try {
    await connectDB();
    const contacts = await ContactMessage.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ contacts });
  } catch (err) {
    console.error("GET /api/contact", err);
    return NextResponse.json({ error: "تعذّر جلب الرسائل" }, { status: 500 });
  }
}
