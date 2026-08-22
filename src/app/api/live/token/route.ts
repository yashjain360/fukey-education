import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { requireUser, AuthError } from "@/lib/serverAuth";
import { mintAccessToken } from "@/lib/livekitClient";

/** Mirrors the matching rule api/live/classes GET uses for `enrolledSlugs`: a class is open to a
 * student if it targets "all", targets one of the student's enrolled batch slugs, or is flagged as
 * an open masterclass. */
function studentCanJoin(liveClass: any, enrolledSlugs: string[]): boolean {
  const targetBatches: string[] = liveClass.targetBatches || [];
  const selectedStudents: string[] = liveClass.selectedStudents || [];

  if (targetBatches.includes("all")) return true;
  if (selectedStudents.includes("open_masterclass")) return true;
  return targetBatches.some((b) => enrolledSlugs.includes(b));
}

export async function POST(request: Request) {
  try {
    const user = await requireUser(request);
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

    if (liveClass.status === "ended" || liveClass.status === "completed") {
      return NextResponse.json(
        {
          success: false,
          error: "This live class has ended. You cannot join a completed session. Please access recorded lectures and study notes from your dashboard.",
          code: "CLASS_ENDED"
        },
        { status: 410 }
      );
    }

    const isStaff = user.role === "instructor" || user.role === "admin";
    // A non-admin instructor only gets host powers (roomAdmin/roomRecord) on their own class — an
    // instructor who isn't this class's owner is treated as a regular participant, same enrollment
    // gate as a student. Otherwise any instructor account could open and record any other
    // instructor's classroom.
    const isOwner = user.role === "admin" || (user.role === "instructor" && liveClass.instructorEmail === user.email);
    const isInstructor = isStaff && isOwner;

    if (!isInstructor) {
      const enrollments = await db
        .collection("enrollments")
        .find({ studentEmail: user.email.toLowerCase().trim() })
        .toArray();
      const enrolledSlugs = enrollments.map((e: any) => e.courseSlug).filter(Boolean);

      if (!studentCanJoin(liveClass, enrolledSlugs)) {
        return NextResponse.json(
          { success: false, error: "You are not enrolled in this class" },
          { status: 403 }
        );
      }
    }

    const { token, wsUrl } = await mintAccessToken({
      identity: user.id,
      name: user.name,
      room: roomId,
      isInstructor,
      canPublishMic: !isInstructor,
    });

    return NextResponse.json({
      success: true,
      token,
      wsUrl,
      identity: user.id,
      roomId,
      isInstructor,
    });
  } catch (error) {
    const status = error instanceof AuthError ? error.status : 500;
    return NextResponse.json({ success: false, error: String((error as Error)?.message || error) }, { status });
  }
}
