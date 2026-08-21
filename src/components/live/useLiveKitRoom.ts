"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Room,
  RoomEvent,
  Track,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  ConnectionState,
} from "livekit-client";

export interface RemoteParticipantView {
  identity: string;
  name: string;
  isSpeaking: boolean;
  attachVideo: (el: HTMLVideoElement | null) => void;
}

export interface UseLiveKitRoomOpts {
  roomId: string;
  wsUrl: string;
  token: string;
  isInstructor: boolean;
  /** Students only — whether this participant is allowed to unmute for the doubt queue. */
  canPublishMic?: boolean;
}

export interface UseLiveKitRoomResult {
  connectionState: "connecting" | "connected" | "disconnected" | "failed";
  localVideoEl: (el: HTMLVideoElement | null) => void;
  remoteParticipants: RemoteParticipantView[];
  isCameraOn: boolean;
  isMicOn: boolean;
  isScreenSharing: boolean;
  toggleCamera: () => void;
  toggleMic: () => void;
  toggleScreenShare: () => void;
  isRecording: boolean;
  sendData: (topic: string, payload: unknown) => void;
  onData: (topic: string, handler: (payload: unknown, fromIdentity: string) => void) => () => void;
  disconnect: () => void;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function useLiveKitRoom(opts: UseLiveKitRoomOpts): UseLiveKitRoomResult {
  const { roomId, wsUrl, token, isInstructor, canPublishMic } = opts;

  const roomRef = useRef<Room | null>(null);
  const localVideoElRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoElRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const dataHandlersRef = useRef<Map<string, Set<(payload: unknown, fromIdentity: string) => void>>>(
    new Map()
  );

  const [connectionState, setConnectionState] = useState<UseLiveKitRoomResult["connectionState"]>(
    "connecting"
  );
  const [remoteParticipants, setRemoteParticipants] = useState<RemoteParticipantView[]>([]);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const attachVideoFor = useCallback((identity: string, track?: RemoteTrack) => {
    const el = remoteVideoElRefs.current.get(identity);
    if (el && track && track.kind === Track.Kind.Video) {
      track.attach(el);
    }
  }, []);

  const buildParticipantView = useCallback(
    (p: RemoteParticipant): RemoteParticipantView => ({
      identity: p.identity,
      name: p.name || p.identity,
      isSpeaking: p.isSpeaking,
      attachVideo: (el) => {
        if (el) {
          remoteVideoElRefs.current.set(p.identity, el);
          // A track may already be subscribed by the time this element mounts.
          p.videoTrackPublications.forEach((pub) => {
            if (pub.track) pub.track.attach(el);
          });
        } else {
          remoteVideoElRefs.current.delete(p.identity);
        }
      },
    }),
    []
  );

  const refreshParticipants = useCallback(
    (room: Room) => {
      setRemoteParticipants(Array.from(room.remoteParticipants.values()).map(buildParticipantView));
    },
    [buildParticipantView]
  );

  useEffect(() => {
    if (!wsUrl || !token || !roomId) return;

    const room = new Room();
    roomRef.current = room;
    let cancelled = false;

    room
      .on(RoomEvent.Connected, () => {
        if (cancelled) return;
        setConnectionState("connected");
        refreshParticipants(room);
      })
      .on(RoomEvent.Disconnected, () => {
        if (cancelled) return;
        setConnectionState("disconnected");
      })
      .on(RoomEvent.ConnectionStateChanged, (state: ConnectionState) => {
        if (cancelled) return;
        if (state === ConnectionState.Connected) setConnectionState("connected");
        else if (state === ConnectionState.Disconnected) setConnectionState("disconnected");
        else if (state === ConnectionState.Reconnecting) setConnectionState("connecting");
      })
      .on(RoomEvent.ParticipantConnected, () => refreshParticipants(room))
      .on(RoomEvent.ParticipantDisconnected, () => refreshParticipants(room))
      .on(RoomEvent.ActiveSpeakersChanged, () => refreshParticipants(room))
      .on(RoomEvent.TrackSubscribed, (track: RemoteTrack, _pub: RemoteTrackPublication, participant: RemoteParticipant) => {
        attachVideoFor(participant.identity, track);
        refreshParticipants(room);
      })
      .on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack) => {
        track.detach();
      })
      .on(RoomEvent.RecordingStatusChanged, (recording: boolean) => {
        if (cancelled) return;
        setIsRecording(recording);
      })
      .on(RoomEvent.LocalTrackPublished, (pub) => {
        if (pub.track && pub.track.kind === Track.Kind.Video && localVideoElRef.current) {
          pub.track.attach(localVideoElRef.current);
        }
      })
      .on(RoomEvent.DataReceived, (payload, participant, _kind, topic) => {
        if (!topic) return;
        const handlers = dataHandlersRef.current.get(topic);
        if (!handlers || handlers.size === 0) return;
        try {
          const parsed = JSON.parse(decoder.decode(payload));
          handlers.forEach((h) => h(parsed, participant?.identity || ""));
        } catch {
          // ignore malformed payloads
        }
      });

    room
      .connect(wsUrl, token)
      .then(async () => {
        if (cancelled) return;
        if (isInstructor) {
          try {
            await room.localParticipant.setCameraEnabled(true);
            setIsCameraOn(true);
          } catch {
            // camera permission denied — instructor can still toggle manually later
          }
          try {
            await room.localParticipant.setMicrophoneEnabled(true);
            setIsMicOn(true);
          } catch {
            // mic permission denied
          }
        }
      })
      .catch(() => {
        if (!cancelled) setConnectionState("failed");
      });

    return () => {
      cancelled = true;
      room.disconnect();
      roomRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, wsUrl, token, isInstructor]);

  const localVideoEl = useCallback((el: HTMLVideoElement | null) => {
    localVideoElRef.current = el;
    if (!el) return;
    const room = roomRef.current;
    const camPub = room?.localParticipant.getTrackPublication(Track.Source.Camera);
    if (camPub?.track) camPub.track.attach(el);
  }, []);

  const toggleCamera = useCallback(() => {
    const room = roomRef.current;
    if (!room) return;
    const next = !isCameraOn;
    room.localParticipant
      .setCameraEnabled(next)
      .then(() => setIsCameraOn(next))
      .catch(() => {});
  }, [isCameraOn]);

  const toggleMic = useCallback(() => {
    const room = roomRef.current;
    if (!room) return;
    if (!isInstructor && !isMicOn && !canPublishMic) return; // not granted mic publish permission
    const next = !isMicOn;
    room.localParticipant
      .setMicrophoneEnabled(next)
      .then(() => setIsMicOn(next))
      .catch(() => {});
  }, [isMicOn, isInstructor, canPublishMic]);

  const toggleScreenShare = useCallback(() => {
    const room = roomRef.current;
    if (!room || !isInstructor) return;
    const next = !isScreenSharing;
    room.localParticipant
      .setScreenShareEnabled(next)
      .then(() => setIsScreenSharing(next))
      .catch(() => {});
  }, [isScreenSharing, isInstructor]);

  const sendData = useCallback((topic: string, payload: unknown) => {
    const room = roomRef.current;
    if (!room) return;
    room.localParticipant.publishData(encoder.encode(JSON.stringify(payload)), { reliable: true, topic });
  }, []);

  const onData = useCallback((topic: string, handler: (payload: unknown, fromIdentity: string) => void) => {
    if (!dataHandlersRef.current.has(topic)) dataHandlersRef.current.set(topic, new Set());
    dataHandlersRef.current.get(topic)!.add(handler);
    return () => {
      dataHandlersRef.current.get(topic)?.delete(handler);
    };
  }, []);

  const disconnect = useCallback(() => {
    roomRef.current?.disconnect();
  }, []);

  return {
    connectionState,
    localVideoEl,
    remoteParticipants,
    isCameraOn,
    isMicOn,
    isScreenSharing,
    toggleCamera,
    toggleMic,
    toggleScreenShare,
    isRecording,
    sendData,
    onData,
    disconnect,
  };
}
