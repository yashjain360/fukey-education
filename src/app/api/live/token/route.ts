import { NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roomId, participantName, participantId, isInstructor } = body;

    if (!roomId || !participantName) {
      return NextResponse.json({ success: false, error: "Room ID and Participant Name are required" }, { status: 400 });
    }

    const apiKey = process.env.LIVEKIT_API_KEY || "devkey";
    const apiSecret = process.env.LIVEKIT_API_SECRET || "secret_fukey_livekit_2026_dev_key";
    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || process.env.LIVEKIT_SERVER_URL || process.env.LIVEKIT_URL || "wss://meetings.thewebvale.com";

    // Create Access Token
    const identity = participantId || `user_${Math.random().toString(36).substring(2, 9)}`;
    const at = new AccessToken(apiKey, apiSecret, {
      identity,
      name: participantName,
      ttl: 60 * 60 * 4, // 4 hours valid
    });

    // Grant room permissions
    at.addGrant({
      room: roomId,
      roomJoin: true,
      canPublish: isInstructor ? true : false, // students can publish when unmuted/doubt room
      canPublishData: true,
      canSubscribe: true,
      roomAdmin: isInstructor ? true : false,
      roomRecord: isInstructor ? true : false,
    });

    const token = await at.toJwt();

    return NextResponse.json({
      success: true,
      token,
      wsUrl,
      identity,
      roomId,
      isInstructor: Boolean(isInstructor),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
