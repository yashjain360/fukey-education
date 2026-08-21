import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");
    const db = await getDatabase();

    const query: any = {};
    if (roomId) query.roomId = roomId;

    const recordings = await db.collection("recordings").find(query).sort({ recordedAt: -1 }).toArray();
    return NextResponse.json({ success: true, count: recordings.length, recordings });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDatabase();

    const newRecording = {
      id: `rec-${Date.now()}`,
      roomId: body.roomId || "room-maths-10-quadratics",
      title: body.title || "Live Lecture Auto-Recording",
      subject: body.subject || "Mathematics",
      targetClass: body.targetClass || "Class 10",
      instructor: body.instructor || "Pawan Gupta",
      videoUrl: body.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      duration: body.duration || "58 Mins",
      sizeMb: body.sizeMb || 240,
      cloudBucket: process.env.GCS_RECORDINGS_BUCKET || "fukey-live-recordings",
      recordedAt: new Date(),
      dateFormatted: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    };

    await db.collection("recordings").insertOne(newRecording);
    return NextResponse.json({ success: true, recording: newRecording });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
