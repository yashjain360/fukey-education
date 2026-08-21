import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDatabase();
    const enquiries = await db.collection("enquiries").find({}).sort({ timestamp: -1 }).toArray();
    return NextResponse.json({ success: true, count: enquiries.length, enquiries });
  } catch (error) {
    return NextResponse.json({ success: false, enquiries: [], error: String(error) });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDatabase();

    const newEnquiry = {
      id: `ENQ-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      name: body.name || "Prospective Student",
      phone: body.phone || "+91 98765 43210",
      email: body.email || "student@example.com",
      targetClass: body.targetClass || "Class 10",
      medium: body.medium || "Hindi & English",
      subjectInterest: body.subjectInterest || "All Subjects",
      timestamp: new Date(),
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      status: "New Lead",
    };

    await db.collection("enquiries").insertOne(newEnquiry);

    // Also record as a lead order in users/orders for Admin console visibility
    const leadOrder = {
      no: Date.now(),
      invoice: newEnquiry.id,
      studentName: newEnquiry.name,
      studentEmail: newEnquiry.email,
      studentPhone: newEnquiry.phone,
      paid: "Free Demo / Lead",
      totalNumeric: 0,
      gateway: "Admission Enquiry Callback",
      status: "Enquiry Pending",
      date: newEnquiry.date,
      time: newEnquiry.time,
      items: [`Admission Callback: ${newEnquiry.targetClass} (${newEnquiry.medium})`],
      courseTitle: `Admissions Lead - ${newEnquiry.targetClass}`,
    };

    await db.collection("orders").insertOne(leadOrder);

    return NextResponse.json({ success: true, enquiry: newEnquiry });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
