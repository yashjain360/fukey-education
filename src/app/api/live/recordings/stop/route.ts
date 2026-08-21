import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { requireUser, requireInstructor, AuthError } from "@/lib/serverAuth";
import { stopRecording, checkEgressStatus } from "@/lib/gcsRecording";

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
    const recording = await db.collection("recordings").findOne({ roomId, status: "recording" });

    if (!recording) {
      return NextResponse.json(
        { success: false, error: "No active recording for this room" },
        { status: 404 }
      );
    }

    const isOwner = user.role === "admin" || recording.instructorEmail === user.email;
    if (!isOwner) {
      return NextResponse.json(
        { success: false, error: "Only this class's instructor (or an admin) can stop recording" },
        { status: 403 }
      );
    }

    await db
      .collection("recordings")
      .updateOne({ _id: recording._id }, { $set: { status: "processing", endedAt: new Date() } });

    try {
      await stopRecording(recording.egressId);
    } catch (err) {
      // Egress may have already stopped itself (room closed) — still worth an immediate status
      // check below rather than failing the whole request.
      console.error("stopEgress call failed, checking status anyway:", err);
    }

    // Egress finalizes (encodes + uploads) asynchronously after Stop returns, so this route doesn't
    // block waiting for it — a single immediate check catches the fast case, and GET
    // /api/live/recordings self-heals any row still "processing" on every subsequent fetch.
    const check = await checkEgressStatus(recording.egressId);
    if (check.status !== "processing") {
      const update =
        check.status === "ready"
          ? { status: "ready", durationSec: check.durationSec, sizeBytes: check.sizeBytes }
          : { status: "failed", error: check.error };
      await db.collection("recordings").updateOne({ _id: recording._id }, { $set: update });
    }

    const final = await db.collection("recordings").findOne({ _id: recording._id });
    return NextResponse.json({ success: true, recording: final });
  } catch (error) {
    const status = error instanceof AuthError ? error.status : 500;
    return NextResponse.json({ success: false, error: String((error as Error)?.message || error) }, { status });
  }
}
