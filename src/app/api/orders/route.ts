import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const all = searchParams.get("all");

    const db = await getDatabase();

    // If Admin requests all orders
    if (all === "true" || !email) {
      const orders = await db.collection("orders").find({}).sort({ no: -1 }).toArray();
      return NextResponse.json({ success: true, count: orders.length, orders });
    }

    // Student specific orders
    const user = await db.collection("users").findOne({ email });
    const userOrders = user?.orders || [];
    const directOrders = await db.collection("orders").find({ studentEmail: email }).sort({ no: -1 }).toArray();

    const merged = [...userOrders, ...directOrders].filter(
      (v, i, a) => a.findIndex((t) => t.invoice === v.invoice) === i
    );

    return NextResponse.json({ success: true, orders: merged.length > 0 ? merged : userOrders });
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
      studentName: body.studentName || "Mayank Dubey",
      studentEmail: body.studentEmail || body.email || "mayank@fukeyeducation.com",
      studentPhone: body.studentPhone || body.phone || "+91 88718 35015",
      paid: `₹${(body.total || 1499).toLocaleString("en-IN")}`,
      totalNumeric: body.total || 1499,
      gateway: body.paymentMethod === "upi" ? "Instant UPI / QR" : "Card / NetBanking",
      status: "Success",
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      items: body.items || ["Class 10th & 12th Board Booster Batch"],
      courseTitle: body.courseTitle || (body.items && body.items[0]?.course?.title) || "CBSE Target Board Batch 2026",
    };

    await db.collection("orders").insertOne(newOrder);

    // Update user record with the new order and profile
    await db.collection("users").updateOne(
      { email: newOrder.studentEmail },
      {
        $set: {
          name: newOrder.studentName,
          email: newOrder.studentEmail,
          phone: newOrder.studentPhone,
          updatedAt: new Date(),
        },
        $push: { orders: newOrder } as any,
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
