import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { instructorsData } from "@/data/instructorsData";

export async function GET() {
  try {
    const db = await getDatabase();
    const instructors = await db.collection("instructors").find({}).toArray();
    if (instructors && instructors.length > 0) {
      return NextResponse.json({ success: true, count: instructors.length, instructors, source: "mongodb" });
    }
    return NextResponse.json({ success: true, count: instructorsData.length, instructors: instructorsData, source: "fallback" });
  } catch (error) {
    return NextResponse.json({ success: true, count: instructorsData.length, instructors: instructorsData, source: "fallback", error: String(error) });
  }
}
