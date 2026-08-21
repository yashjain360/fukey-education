import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { sampleTests, MockTest } from "@/data/testsData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cls = searchParams.get("class");
    const subject = searchParams.get("subject");

    const db = await getDatabase();
    const query: any = {};
    if (cls && cls !== "All") query.class = cls;
    if (subject && subject !== "All") query.subject = subject;

    let tests = await db.collection("tests").find(query).toArray();

    if (tests.length === 0 && !cls && !subject) {
      await db.collection("tests").insertMany(
        sampleTests.map((t) => ({ ...t, createdAt: new Date() }))
      );
      tests = await db.collection("tests").find({}).toArray();
    }

    return NextResponse.json({ success: true, count: tests.length, tests });
  } catch (e) {
    return NextResponse.json({ success: true, count: sampleTests.length, tests: sampleTests });
  }
}
