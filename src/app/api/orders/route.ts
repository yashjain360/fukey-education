import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") || "mayank@fukeyeducation.com";

    const db = await getDatabase();
    const user = await db.collection("users").findOne({ email });
    const orders = user?.orders || [];
    return NextResponse.json({ success: true, orders, source: "mongodb" });
  } catch (error) {
    return NextResponse.json({ success: false, orders: [], error: String(error) });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDatabase();
    const newOrder = {
      no: Date.now(),
      invoice: `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      paid: `₹${body.total?.toLocaleString() || "1,499.00"}`,
      gateway: body.paymentMethod === "upi" ? "UPI / PhonePe" : "Card / NetBanking",
      status: "Success",
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      items: body.items || [],
      studentEmail: body.email || "mayank@fukeyeducation.com",
    };

    await db.collection("orders").insertOne(newOrder);
    await db.collection("users").updateOne(
      { email: newOrder.studentEmail },
      { $push: { orders: newOrder } as any },
      { upsert: true }
    );

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
