import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { coursesData } from "@/data/coursesData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cls = searchParams.get("class");
    const lang = searchParams.get("lang");
    const subject = searchParams.get("subject");

    const db = await getDatabase();
    const query: Record<string, any> = {};
    if (cls) query.class = cls;
    if (lang && lang !== "All") query.language = lang;
    if (subject && subject !== "All") query.subject = subject;

    const courses = await db.collection("courses").find(query).toArray();
    if (courses && courses.length > 0) {
      return NextResponse.json({ success: true, count: courses.length, courses, source: "mongodb" });
    }
    return NextResponse.json({ success: true, count: coursesData.length, courses: coursesData, source: "fallback" });
  } catch (error) {
    return NextResponse.json({ success: true, count: coursesData.length, courses: coursesData, source: "fallback", error: String(error) });
  }
}
