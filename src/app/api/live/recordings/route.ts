import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { getSignedRecordingUrl } from "@/lib/gcsSignedUrl";
import { checkEgressStatus } from "@/lib/gcsRecording";

/** Same matching rule as api/live/classes GET / api/live/token: a recording is visible to a student
 * if its snapshot targetBatches includes "all" or one of the student's enrolled batch slugs. */
function studentCanSee(recording: any, enrolledSlugs: string[]): boolean {
  const targetBatches: string[] = recording.targetBatches || [];
  if (targetBatches.includes("all")) return true;
  return targetBatches.some((b) => enrolledSlugs.includes(b));
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");
    const instructorEmail = searchParams.get("instructorEmail");
    const enrolledSlugsParam = searchParams.get("enrolledSlugs");

    const db = await getDatabase();

    const query: any = {};
    if (roomId) query.roomId = roomId;
    if (instructorEmail) query.instructorEmail = instructorEmail.toLowerCase().trim();

    let recordings = await db.collection("recordings").find(query).sort({ startedAt: -1 }).toArray();

    // Self-heal any row still "processing" — egress finalizes asynchronously after /stop returns,
    // and this list route (polled by the dashboards) is where that eventually gets noticed instead
    // of a dedicated background poller.
    recordings = await Promise.all(
      recordings.map(async (r) => {
        if (r.status !== "processing" || !r.egressId) return r;
        try {
          const check = await checkEgressStatus(r.egressId);
          if (check.status === "processing") return r;

          const update =
            check.status === "ready"
              ? { status: "ready" as const, durationSec: check.durationSec, sizeBytes: check.sizeBytes }
              : { status: "failed" as const, error: check.error };
          await db.collection("recordings").updateOne({ _id: r._id }, { $set: update });
          return { ...r, ...update };
        } catch {
          return r; // GCS/egress env not configured yet — leave the row as "processing"
        }
      })
    );

    if (enrolledSlugsParam) {
      const enrolledSlugs = enrolledSlugsParam
        .split(",")
        .map((s) => s.trim().replace(/^-+|-+$/g, ""))
        .filter(Boolean);
      recordings = recordings.filter((r) => studentCanSee(r, enrolledSlugs));
    }

    const withUrls = await Promise.all(
      recordings.map(async (r) => {
        const { gcsPath, ...rest } = r as any;
        if (r.status === "ready" && gcsPath) {
          try {
            const videoUrl = await getSignedRecordingUrl(gcsPath);
            return { ...rest, videoUrl };
          } catch (err) {
            // Bucket/creds misconfigured after the fact — surface as a normal "not playable yet"
            // row instead of failing the whole list.
            return { ...rest, status: "failed", error: String((err as Error)?.message || err) };
          }
        }
        return rest;
      })
    );

    return NextResponse.json({ success: true, count: withUrls.length, recordings: withUrls });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
