import { TrackSource, TrackType } from "livekit-server-sdk";
import { getRoomServiceClient } from "@/lib/livekitClient";

export type ModerationSource = "camera" | "microphone";

function toTrackSource(source: ModerationSource): TrackSource {
  return source === "camera" ? TrackSource.CAMERA : TrackSource.MICROPHONE;
}

/** Finds the currently-published track (if any) of the given source for a participant. */
async function findTrackSid(room: string, identity: string, source: ModerationSource): Promise<string | null> {
  const svc = getRoomServiceClient();
  const info = await svc.getParticipant(room, identity);
  const wantedType = source === "camera" ? TrackType.VIDEO : TrackType.AUDIO;
  const wantedSource = toTrackSource(source);
  const track = info.tracks.find((t) => t.type === wantedType && t.source === wantedSource);
  return track?.sid ?? null;
}

/** Instructor-only, one-directional: mutes whatever the student currently has published (if
 * anything) and revokes their permission to publish that source again — so the student cannot
 * simply re-enable it client-side. This never *enables* anything; there's no server-side way to
 * force a participant to start capturing camera/mic they haven't opted into, by design (LiveKit
 * doesn't support it, and it shouldn't). */
export async function forceOff(room: string, identity: string, source: ModerationSource): Promise<void> {
  const svc = getRoomServiceClient();

  const trackSid = await findTrackSid(room, identity, source);
  if (trackSid) {
    await svc.mutePublishedTrack(room, identity, trackSid, true);
  }

  const info = await svc.getParticipant(room, identity);
  const current = info.permission?.canPublishSources ?? [];
  const nextSources = current.filter((s) => s !== toTrackSource(source));

  await svc.updateParticipant(room, identity, {
    permission: {
      canSubscribe: info.permission?.canSubscribe ?? true,
      canPublish: info.permission?.canPublish ?? true,
      canPublishData: info.permission?.canPublishData ?? true,
      canPublishSources: nextSources,
    },
  });
}

/** Restores a student's permission to publish this source — it does not turn anything on itself;
 * the student still has to click their own mic/camera toggle. This is what makes "close, not
 * open" hold: the instructor's actions only ever remove capability or mute, never activate a
 * device on someone else's behalf. */
export async function restorePermission(room: string, identity: string, source: ModerationSource): Promise<void> {
  const svc = getRoomServiceClient();
  const info = await svc.getParticipant(room, identity);
  const current = info.permission?.canPublishSources ?? [];
  const wanted = toTrackSource(source);
  if (current.includes(wanted)) return;

  await svc.updateParticipant(room, identity, {
    permission: {
      canSubscribe: info.permission?.canSubscribe ?? true,
      canPublish: info.permission?.canPublish ?? true,
      canPublishData: info.permission?.canPublishData ?? true,
      canPublishSources: [...current, wanted],
    },
  });
}

export async function removeParticipant(room: string, identity: string): Promise<void> {
  await getRoomServiceClient().removeParticipant(room, identity);
}
