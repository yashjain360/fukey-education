import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { requireUser, requireInstructor, AuthError } from "@/lib/serverAuth";
import { forceOff, restorePermission, removeParticipant } from "@/lib/livekitModeration";

type Action = "mute-camera" | "mute-mic" | "allow-camera" | "allow-mic" | "remove";

const VALID_ACTIONS: Action[] = ["mute-camera", "mute-mic", "allow-camera", "allow-mic", "remove"];

export async function POST(request: Request) {
  try {
    const user = await requireUser(request);
    requireInstructor(user);

    const body = await request.json();
    const { roomId, targetIdentity, action } = body as { roomId?: string; targetIdentity?: string; action?: Action };

    if (!roomId || !targetIdentity || !action || !VALID_ACTIONS.includes(action)) {
      return NextResponse.json(
        { success: false, error: "roomId, targetIdentity, and a valid action are required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const liveClass = await db.collection("live_classes").findOne({ roomId });
    if (!liveClass) {
      return NextResponse.json({ success: false, error: "Live class not found" }, { status: 404 });
    }

    const isOwner = user.role === "admin" || liveClass.instructorEmail === user.email;
    if (!isOwner) {
      return NextResponse.json(
        { success: false, error: "Only this class's instructor (or an admin) can moderate it" },
        { status: 403 }
      );
    }

    switch (action) {
      case "mute-camera":
        await forceOff(roomId, targetIdentity, "camera");
        break;
      case "mute-mic":
        await forceOff(roomId, targetIdentity, "microphone");
        break;
      case "allow-camera":
        await restorePermission(roomId, targetIdentity, "camera");
        break;
      case "allow-mic":
        await restorePermission(roomId, targetIdentity, "microphone");
        break;
      case "remove":
        await removeParticipant(roomId, targetIdentity);
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const status = error instanceof AuthError ? error.status : 500;
    return NextResponse.json({ success: false, error: String((error as Error)?.message || error) }, { status });
  }
}
