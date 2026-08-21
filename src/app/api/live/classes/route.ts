import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");
    const db = await getDatabase();

    if (roomId) {
      const liveClass = await db.collection("live_classes").findOne({ roomId });
      if (liveClass) return NextResponse.json({ success: true, liveClass });
      return NextResponse.json({ success: false, error: "Classroom not found" }, { status: 404 });
    }

    let classes = await db.collection("live_classes").find({}).sort({ createdAt: -1 }).toArray();

    // If empty, initialize default live classes
    if (classes.length === 0) {
      const initialClasses = [
        {
          roomId: "room-maths-10-quadratics",
          title: "Class 10th Maths: Quadratic Equations & Board Short-cuts",
          subject: "Mathematics",
          targetClass: "Class 10",
          medium: "Hindi & English",
          instructor: "Pawan Gupta",
          instructorAvatar: "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-06-15-02-14-08-1645.webp",
          status: "LIVE_NOW",
          scheduledTime: "Today • 5:00 PM",
          participantsCount: 42,
          isRecording: true,
          mode: "45_15_HYBRID",
          createdAt: new Date(),
        },
        {
          roomId: "room-physics-12-optics",
          title: "Class 12th Physics: Ray Optics Derivations & Numerical Tricks",
          subject: "Physics",
          targetClass: "Class 12",
          medium: "English Medium",
          instructor: "Arya Dubey",
          instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
          status: "UPCOMING",
          scheduledTime: "Today • 6:30 PM",
          participantsCount: 28,
          isRecording: false,
          mode: "45_15_HYBRID",
          createdAt: new Date(),
        }
      ];
      await db.collection("live_classes").insertMany(initialClasses);
      classes = await db.collection("live_classes").find({}).sort({ createdAt: -1 }).toArray();
    }

    return NextResponse.json({ success: true, count: classes.length, classes });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDatabase();

    const roomId = body.roomId || `room-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const newClass = {
      roomId,
      title: body.title || "Live Interactive Lecture",
      subject: body.subject || "Mathematics",
      targetClass: body.targetClass || "Class 10",
      medium: body.medium || "Hindi & English",
      instructor: body.instructor || "Pawan Gupta",
      instructorAvatar: body.instructorAvatar || "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-06-15-02-14-08-1645.webp",
      status: "LIVE_NOW",
      scheduledTime: body.scheduledTime || "Live Now",
      participantsCount: 1,
      isRecording: true,
      mode: "45_15_HYBRID",
      createdAt: new Date(),
    };

    await db.collection("live_classes").insertOne(newClass);
    return NextResponse.json({ success: true, liveClass: newClass });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { roomId, ...updates } = body;
    if (!roomId) return NextResponse.json({ success: false, error: "roomId is required" }, { status: 400 });

    const db = await getDatabase();
    await db.collection("live_classes").updateOne(
      { roomId },
      { $set: { ...updates, updatedAt: new Date() } }
    );

    return NextResponse.json({ success: true, updated: updates });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
