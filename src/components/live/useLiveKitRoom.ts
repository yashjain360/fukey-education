"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Room,
  RoomEvent,
  Track,
  Participant,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  TrackPublication,
  ConnectionState,
} from "livekit-client";

export interface RemoteParticipantView {
  identity: string;
  name: string;
  isSpeaking: boolean;
  isMicMuted: boolean;
  isCameraMuted: boolean;
  hasScreenShare: boolean;
  attachCamera: (el: HTMLVideoElement | null) => void;
  attachScreenShare: (el: HTMLVideoElement | null) => void;
}

export interface ActiveScreenShare {
  identity: string;
  name: string;
  isLocal: boolean;
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
  localCameraEl: (el: HTMLVideoElement | null) => void;
  localScreenShareEl: (el: HTMLVideoElement | null) => void;
  remoteParticipants: RemoteParticipantView[];
  /** Whoever is currently sharing their screen (local or remote), or null. Only one active share
   * is surfaced — the room's own UI (and typical LiveKit deployments) expect at most one at a
   * time; if two happen simultaneously the most recently (un)published one wins. */
  activeScreenShare: ActiveScreenShare | null;
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
  const localCameraElRef = useRef<HTMLVideoElement | null>(null);
  const localScreenElRef = useRef<HTMLVideoElement | null>(null);
  const remoteCameraElRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const remoteScreenElRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const dataHandlersRef = useRef<Map<string, Set<(payload: unknown, fromIdentity: string) => void>>>(
    new Map()
  );

  const [connectionState, setConnectionState] = useState<UseLiveKitRoomResult["connectionState"]>(
    "connecting"
  );
  const [remoteParticipants, setRemoteParticipants] = useState<RemoteParticipantView[]>([]);
  const [activeScreenShare, setActiveScreenShare] = useState<ActiveScreenShare | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const buildParticipantView = useCallback((p: RemoteParticipant): RemoteParticipantView => {
    const camPub = p.getTrackPublication(Track.Source.Camera);
    const micPub = p.getTrackPublication(Track.Source.Microphone);
    const screenPub = p.getTrackPublication(Track.Source.ScreenShare);

    return {
      identity: p.identity,
      name: p.name || p.identity,
      isSpeaking: p.isSpeaking,
      isMicMuted: !micPub || micPub.isMuted,
      isCameraMuted: !camPub || camPub.isMuted,
      hasScreenShare: !!screenPub && !screenPub.isMuted,
      attachCamera: (el) => {
        if (el) {
          remoteCameraElRefs.current.set(p.identity, el);
          if (camPub?.track) camPub.track.attach(el);
        } else {
          remoteCameraElRefs.current.delete(p.identity);
        }
      },
      attachScreenShare: (el) => {
        if (el) {
          remoteScreenElRefs.current.set(p.identity, el);
          if (screenPub?.track) screenPub.track.attach(el);
        } else {
          remoteScreenElRefs.current.delete(p.identity);
        }
      },
    };
  }, []);

  const refreshParticipants = useCallback(
    (room: Room) => {
      setRemoteParticipants(Array.from(room.remoteParticipants.values()).map(buildParticipantView));
    },
    [buildParticipantView]
  );

  /** Recomputes who (if anyone) is actively screen-sharing, across local + all remotes. */
  const refreshActiveScreenShare = useCallback((room: Room) => {
    const localScreenPub = room.localParticipant.getTrackPublication(Track.Source.ScreenShare);
    if (localScreenPub && !localScreenPub.isMuted) {
      setActiveScreenShare({ identity: room.localParticipant.identity, name: "You", isLocal: true });
      return;
    }

    for (const p of room.remoteParticipants.values()) {
      const pub = p.getTrackPublication(Track.Source.ScreenShare);
      if (pub && !pub.isMuted) {
        setActiveScreenShare({ identity: p.identity, name: p.name || p.identity, isLocal: false });
        return;
      }
    }

    setActiveScreenShare(null);
  }, []);

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
        refreshActiveScreenShare(room);
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
      .on(RoomEvent.ParticipantDisconnected, () => {
        refreshParticipants(room);
        refreshActiveScreenShare(room);
      })
      .on(RoomEvent.ActiveSpeakersChanged, () => refreshParticipants(room))
      .on(RoomEvent.TrackSubscribed, (track: RemoteTrack, pub: RemoteTrackPublication, participant: RemoteParticipant) => {
        if (track.source === Track.Source.Camera) {
          const el = remoteCameraElRefs.current.get(participant.identity);
          if (el) track.attach(el);
        } else if (track.source === Track.Source.ScreenShare) {
          const el = remoteScreenElRefs.current.get(participant.identity);
          if (el) track.attach(el);
        }
        refreshParticipants(room);
        refreshActiveScreenShare(room);
      })
      .on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack) => {
        track.detach();
      })
      .on(RoomEvent.TrackMuted, (_pub: TrackPublication, _participant: Participant) => {
        refreshParticipants(room);
        refreshActiveScreenShare(room);
      })
      .on(RoomEvent.TrackUnmuted, (_pub: TrackPublication, _participant: Participant) => {
        refreshParticipants(room);
        refreshActiveScreenShare(room);
      })
      .on(RoomEvent.RecordingStatusChanged, (recording: boolean) => {
        if (cancelled) return;
        setIsRecording(recording);
      })
      .on(RoomEvent.LocalTrackPublished, (pub) => {
        if (!pub.track) return;
        if (pub.source === Track.Source.Camera && localCameraElRef.current) {
          pub.track.attach(localCameraElRef.current);
        } else if (pub.source === Track.Source.ScreenShare && localScreenElRef.current) {
          pub.track.attach(localScreenElRef.current);
        }
        refreshActiveScreenShare(room);
      })
      // A forced server-side mute (instructor moderation) doesn't go through our own
      // toggleMic/toggleCamera calls, so the local on/off state has to be kept in sync from the
      // room's own authoritative publication state, not just from our own button clicks.
      .on(RoomEvent.LocalTrackUnpublished, (pub) => {
        if (pub.source === Track.Source.Camera) setIsCameraOn(false);
        if (pub.source === Track.Source.Microphone) setIsMicOn(false);
        refreshActiveScreenShare(room);
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

  const localCameraEl = useCallback((el: HTMLVideoElement | null) => {
    localCameraElRef.current = el;
    if (!el) return;
    const camPub = roomRef.current?.localParticipant.getTrackPublication(Track.Source.Camera);
    if (camPub?.track) camPub.track.attach(el);
  }, []);

  const localScreenShareEl = useCallback((el: HTMLVideoElement | null) => {
    localScreenElRef.current = el;
    if (!el) return;
    const screenPub = roomRef.current?.localParticipant.getTrackPublication(Track.Source.ScreenShare);
    if (screenPub?.track) screenPub.track.attach(el);
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
    localCameraEl,
    localScreenShareEl,
    remoteParticipants,
    activeScreenShare,
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
