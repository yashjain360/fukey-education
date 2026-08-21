import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { requireUser, requireInstructor, AuthError } from "@/lib/serverAuth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");
    const instructor = searchParams.get("instructor");
    const instructorEmail = searchParams.get("instructorEmail");
    const enrolledSlugs = searchParams.get("enrolledSlugs");
    const targetBatch = searchParams.get("targetBatch") || searchParams.get("batch");
    const targetClass = searchParams.get("class");

    const db = await getDatabase();

    if (roomId) {
      const liveClass = await db.collection("live_classes").findOne({ roomId });
      if (liveClass) return NextResponse.json({ success: true, liveClass });
      return NextResponse.json({ success: false, error: "Classroom not found" }, { status: 404 });
    }

    const query: any = {};
    if (targetClass && targetClass !== "All") query.targetClass = targetClass;

    // Faculty filter
    if (instructor || instructorEmail) {
      const orList: any[] = [];
      if (instructor) orList.push({ instructor: new RegExp(instructor, "i") });
      if (instructorEmail) orList.push({ instructorEmail: instructorEmail.toLowerCase() });
      if (orList.length > 0) query.$or = orList;
    }

    // Student filter
    if (enrolledSlugs) {
      const slugList = enrolledSlugs.split(",").map((s) => s.trim().replace(/^[-]+|[-]+$/g, "")).filter(Boolean);
      query.$or = [
        { targetBatches: "all" },
        { targetBatches: { $in: ["all", ...slugList] } },
        { selectedStudents: "open_masterclass" }
      ];
    } else if (targetBatch && targetBatch !== "all") {
      query.targetBatches = { $in: ["all", targetBatch] };
    }

    const classes = await db.collection("live_classes").find(query).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, count: classes.length, classes });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser(request);
    requireInstructor(user);

    const body = await request.json();
    const db = await getDatabase();

    const roomId = body.roomId || `room-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const newClass = {
      roomId,
      title: body.title || "Live Interactive Lecture",
      subject: body.subject || "Mathematics",
      targetClass: body.targetClass || "Class 10",
      targetBatches: body.targetBatches || ["all"],
      selectedStudents: body.selectedStudents || ["all"],
      medium: body.medium || "Hindi & English",
      // instructor/instructorEmail come from the authenticated caller, not the request body — this
      // is also what /api/live/recordings/start uses to verify a "start recording" request comes
      // from the class's own owner.
      instructor: user.name,
      instructorEmail: user.email,
      instructorAvatar: body.instructorAvatar || undefined,
      status: body.status || "LIVE_NOW",
      scheduledTime: body.scheduledTime || "Live Now",
      participantsCount: 1,
      isRecording: false,
      mode: "45_15_HYBRID",
      createdAt: new Date(),
    };

    await db.collection("live_classes").insertOne(newClass);
    return NextResponse.json({ success: true, liveClass: newClass });
  } catch (error) {
    const status = error instanceof AuthError ? error.status : 500;
    return NextResponse.json({ success: false, error: String((error as Error)?.message || error) }, { status });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await requireUser(request);
    requireInstructor(user);

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
    const status = error instanceof AuthError ? error.status : 500;
    return NextResponse.json({ success: false, error: String((error as Error)?.message || error) }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireUser(request);
    requireInstructor(user);

    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");
    if (!roomId) return NextResponse.json({ success: false, error: "roomId is required" }, { status: 400 });

    const db = await getDatabase();
    await db.collection("live_classes").deleteOne({ roomId });

    return NextResponse.json({ success: true, deletedRoomId: roomId });
  } catch (error) {
    const status = error instanceof AuthError ? error.status : 500;
    return NextResponse.json({ success: false, error: String((error as Error)?.message || error) }, { status });
  }
}
