import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDatabase();
    const leads = await db.collection("enquiries").find({}).sort({ timestamp: -1 }).toArray();
    return NextResponse.json({ success: true, count: leads.length, leads });
  } catch (error) {
    return NextResponse.json({ success: false, leads: [], error: String(error) });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Lead ID is required" }, { status: 400 });
    }

    const db = await getDatabase();
    const updateFields: any = { updatedAt: new Date() };
    if (status !== undefined) updateFields.status = status;
    if (notes !== undefined) updateFields.notes = notes;

    await db.collection("enquiries").updateOne(
      { id: id },
      { $set: updateFields }
    );

    // Also update matching order if present
    await db.collection("orders").updateOne(
      { invoice: id },
      { $set: { status: status || "Updated" } }
    );

    return NextResponse.json({ success: true, updated: updateFields });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDatabase();

    const newLead = {
      id: `LEAD-${Date.now().toString().slice(-6)}`,
      name: body.name || "New Student",
      phone: body.phone || "+91 88718 35015",
      email: body.email || "student@fukeyeducation.com",
      targetClass: body.targetClass || "Class 10",
      medium: body.medium || "Hindi & English",
      source: body.source || "Admin Direct Entry",
      status: body.status || "New Lead",
      notes: body.notes || "Walk-in offline admission inquiry at Kolar Road Center",
      timestamp: new Date(),
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    };

    await db.collection("enquiries").insertOne(newLead);
    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
