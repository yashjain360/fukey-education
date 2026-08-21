import { AccessToken, EgressClient, RoomServiceClient, TrackSource } from "livekit-server-sdk";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set. Add it to .env.local — no dev/insecure fallback is used.`);
  }
  return value;
}

/** https:// URL for server-side LiveKit SDK clients (RoomService/Egress twirp calls). */
function apiKey() {
  return requiredEnv("LIVEKIT_API_KEY");
}
function apiSecret() {
  return requiredEnv("LIVEKIT_API_SECRET");
}
function httpUrl() {
  return requiredEnv("LIVEKIT_HTTP_URL");
}
/** wss:// URL handed to the browser client to connect with. */
function wsUrl() {
  return requiredEnv("LIVEKIT_URL");
}

export function getRoomServiceClient(): RoomServiceClient {
  return new RoomServiceClient(httpUrl(), apiKey(), apiSecret());
}

export function getEgressClient(): EgressClient {
  return new EgressClient(httpUrl(), apiKey(), apiSecret());
}

export interface MintAccessTokenOpts {
  identity: string;
  name: string;
  room: string;
  isInstructor: boolean;
  /** Students only: allow unmuting the microphone for the doubt queue. Camera/screen-share stay off
   * for students regardless of this flag — canPublishSources is exhaustive when set. */
  canPublishMic?: boolean;
}

export async function mintAccessToken(opts: MintAccessTokenOpts): Promise<{ token: string; wsUrl: string }> {
  const { identity, name, room, isInstructor, canPublishMic } = opts;

  const at = new AccessToken(apiKey(), apiSecret(), {
    identity,
    name,
    ttl: 60 * 60 * 4, // 4 hours
  });

  if (isInstructor) {
    at.addGrant({
      room,
      roomJoin: true,
      roomAdmin: true,
      roomRecord: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });
  } else {
    at.addGrant({
      room,
      roomJoin: true,
      canSubscribe: true,
      canPublishData: true,
      ...(canPublishMic ? { canPublishSources: [TrackSource.MICROPHONE] } : {}),
    });
  }

  return { token: await at.toJwt(), wsUrl: wsUrl() };
}
