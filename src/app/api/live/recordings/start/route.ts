import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { requireUser, requireInstructor, AuthError } from "@/lib/serverAuth";
import { startRecording } from "@/lib/gcsRecording";

export async function POST(request: Request) {
  try {
    const user = await requireUser(request);
    requireInstructor(user);

    const body = await request.json();
    const roomId: string | undefined = body?.roomId;
    if (!roomId) {
      return NextResponse.json({ success: false, error: "roomId is required" }, { status: 400 });
    }

    const db = await getDatabase();

    const liveClass = await db.collection("live_classes").findOne({ roomId });
    if (!liveClass) {
      return NextResponse.json({ success: false, error: "Live class not found" }, { status: 404 });
    }

    const isOwner = user.role === "admin" || liveClass.instructorEmail === user.email;
    if (!isOwner) {
      return NextResponse.json(
        { success: false, error: "Only this class's instructor (or an admin) can start recording" },
        { status: 403 }
      );
    }

    const existing = await db
      .collection("recordings")
      .findOne({ roomId, status: { $in: ["recording", "processing"] } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Recording already in progress for this room", recordingId: existing._id },
        { status: 409 }
      );
    }

    const { egressId, gcsPath } = await startRecording(roomId);

    const doc = {
      roomId,
      liveClassTitle: liveClass.title,
      subject: liveClass.subject,
      targetClass: liveClass.targetClass,
      targetBatches: liveClass.targetBatches || ["all"],
      instructor: liveClass.instructor,
      instructorEmail: liveClass.instructorEmail,
      egressId,
      status: "recording" as const,
      gcsPath,
      startedBy: user.email,
      startedAt: new Date(),
    };

    const result = await db.collection("recordings").insertOne(doc);

    return NextResponse.json({ success: true, recordingId: result.insertedId, egressId });
  } catch (error) {
    const status = error instanceof AuthError ? error.status : 500;
    return NextResponse.json({ success: false, error: String((error as Error)?.message || error) }, { status });
  }
}
