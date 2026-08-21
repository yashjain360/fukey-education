import { EncodedFileOutput, GCPUpload, EgressStatus } from "livekit-server-sdk";
import { getEgressClient } from "@/lib/livekitClient";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set. Add it to .env.local — cloud recording needs a GCS bucket + service-account key.`
    );
  }
  return value;
}

function bucketName(): string {
  return requiredEnv("GCS_RECORDINGS_BUCKET");
}

function serviceAccountJson(): string {
  // Validate it's actually JSON up front so a malformed value fails at start-time, not deep inside
  // the egress worker where the error is opaque.
  const raw = requiredEnv("GCS_SERVICE_ACCOUNT_JSON");
  try {
    JSON.parse(raw);
  } catch {
    throw new Error("GCS_SERVICE_ACCOUNT_JSON is not valid JSON.");
  }
  return raw;
}

/** Object key for a recording, sanitized the same way a filesystem-unsafe roomId would need to be.
 * Namespaced under fukey/ — the shared bucket also holds other products' assets
 * (brandepth/, thewebvale/, webverse/), same one-folder-per-product convention. */
export function buildRecordingPath(roomId: string, startedAt: number = Date.now()): string {
  const safeRoom = String(roomId).replace(/[^a-zA-Z0-9_-]/g, "-");
  return `fukey/live-recordings/${safeRoom}/${startedAt}.mp4`;
}

export async function startRecording(roomId: string): Promise<{ egressId: string; gcsPath: string }> {
  const gcsPath = buildRecordingPath(roomId);
  const bucket = bucketName();
  const credentials = serviceAccountJson();

  const egress = getEgressClient();
  const info = await egress.startRoomCompositeEgress(
    roomId,
    new EncodedFileOutput({
      filepath: gcsPath,
      output: {
        case: "gcp",
        value: new GCPUpload({ bucket, credentials }),
      },
    }),
    { layout: "speaker" }
  );

  if (!info.egressId) {
    throw new Error("LiveKit Egress did not return an egressId — recording may not have started.");
  }

  return { egressId: info.egressId, gcsPath };
}

export async function stopRecording(egressId: string): Promise<void> {
  await getEgressClient().stopEgress(egressId);
}

export interface EgressCheckResult {
  status: "processing" | "ready" | "failed";
  durationSec?: number;
  sizeBytes?: number;
  error?: string;
}

/** One-shot status check — no blocking loop. Egress finalizes (encodes + uploads) asynchronously
 * after StopEgress returns, so a serverless API route can't just await completion without risking
 * the platform's function-duration limit. Instead the caller (GET /api/live/recordings) calls this
 * once per list fetch for any row still "processing", which self-heals the status within a poll
 * cycle or two of the dashboard's own refresh interval — no dedicated poller process needed. */
export async function checkEgressStatus(egressId: string): Promise<EgressCheckResult> {
  const items = await getEgressClient().listEgress({ egressId });
  const info = items[0];

  if (!info) {
    return { status: "processing" };
  }

  if (info.status === EgressStatus.EGRESS_COMPLETE) {
    const file = info.fileResults?.[0];
    const durationSec =
      file && file.endedAt > file.startedAt
        ? Number((file.endedAt - file.startedAt) / BigInt(1_000_000_000))
        : undefined;

    return { status: "ready", durationSec, sizeBytes: file?.size ? Number(file.size) : undefined };
  }

  if (info.status === EgressStatus.EGRESS_FAILED || info.status === EgressStatus.EGRESS_ABORTED) {
    return { status: "failed", error: info.error || "Egress reported failure with no message" };
  }

  return { status: "processing" };
}
