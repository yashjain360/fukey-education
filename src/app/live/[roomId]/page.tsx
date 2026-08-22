"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  PhoneOff,
  Users,
  ShieldCheck,
  Disc,
  ChevronLeft,
  Loader2,
  Lock,
  Clock,
  UserX,
  MoreVertical,
  Pin,
  PinOff,
  MessageSquareOff,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import WhiteboardCanvas from "@/components/live/WhiteboardCanvas";
import LiveChatDrawer from "@/components/live/LiveChatDrawer";
import DoubtQueueManager from "@/components/live/DoubtQueueManager";
import { useLiveKitRoom } from "@/components/live/useLiveKitRoom";
import { usePresenceBroadcast, usePresenceTracking, type PresenceState } from "@/components/live/usePresence";

interface LiveClassDoc {
  roomId: string;
  title: string;
  subject: string;
  targetClass: string;
  instructor: string;
  instructorEmail?: string;
  targetBatches?: string[];
  selectedStudents?: string[];
  status: string;
}

type EntryState = "loading" | "class-not-found" | "class-ended" | "not-enrolled" | "ready" | "token-error";

function authFetch(url: string, token: string | undefined, init: RequestInit = {}) {
  return fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
      ...(init.headers || {}),
    },
  });
}

/** Small attention indicator — green while a student's tab is visible and they've interacted
 * recently, amber once their tab is backgrounded, gray once they've gone idle at the keyboard.
 * No dot at all until their client's first broadcast arrives (instructor, or nothing heard yet). */
function PresenceDot({ state }: { state?: PresenceState }) {
  if (!state) return null;
  const color = state === "active" ? "bg-emerald-400" : state === "away" ? "bg-amber-400" : "bg-slate-400";
  const label = state === "active" ? "Attentive" : state === "away" ? "Tab backgrounded" : "Idle";
  return <span className={`w-1.5 h-1.5 rounded-full ${color} flex-shrink-0`} title={label} />;
}

export default function LiveRoomPage() {
  const params = useParams();
  const roomId = params?.roomId as string;
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [entryState, setEntryState] = useState<EntryState>("loading");
  const [liveClass, setLiveClass] = useState<LiveClassDoc | null>(null);
  const [entryError, setEntryError] = useState<string>("");
  const [liveKitAuth, setLiveKitAuth] = useState<{ token: string; wsUrl: string } | null>(null);
  const [activeMainView, setActiveMainView] = useState<"whiteboard" | "video">("whiteboard");
  const [recordingBusy, setRecordingBusy] = useState(false);
  const [openControlsFor, setOpenControlsFor] = useState<string | null>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [spotlightIdentity, setSpotlightIdentity] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(`/live/${roomId}`)}`);
    }
  }, [user, isLoading, router, roomId]);

  const isInstructor = user?.role === "instructor" || user?.role === "admin";

  // Fetch the class doc, then mint a token
  useEffect(() => {
    if (!user || !roomId) return;
    let cancelled = false;

    (async () => {
      try {
        const classRes = await fetch(`/api/live/classes?roomId=${encodeURIComponent(roomId)}`);
        const classData = await classRes.json();
        if (cancelled) return;

        if (!classData.success || !classData.liveClass) {
          setEntryState("class-not-found");
          return;
        }
        setLiveClass(classData.liveClass);

        if (classData.liveClass.status === "ended" || classData.liveClass.status === "completed") {
          setEntryState("class-ended");
          return;
        }

        const tokenRes = await authFetch("/api/live/token", user.token || user.email, {
          method: "POST",
          body: JSON.stringify({ roomId }),
        });
        const tokenData = await tokenRes.json();
        if (cancelled) return;

        if (!tokenData.success) {
          if (tokenRes.status === 410 || tokenData.code === "CLASS_ENDED") {
            setEntryState("class-ended");
          } else if (tokenRes.status === 403) {
            setEntryState("not-enrolled");
            setEntryError(tokenData.error || "You are not enrolled in this class");
          } else {
            setEntryState("token-error");
            setEntryError(tokenData.error || "Could not connect to the live classroom");
          }
          return;
        }

        setLiveKitAuth({ token: tokenData.token, wsUrl: tokenData.wsUrl });
        setEntryState("ready");
      } catch {
        if (!cancelled) {
          setEntryState("token-error");
          setEntryError("Network error connecting to the live classroom");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, roomId]);

  const liveKit = useLiveKitRoom({
    roomId,
    wsUrl: liveKitAuth?.wsUrl || "",
    token: liveKitAuth?.token || "",
    isInstructor,
    // The token route already grants every non-instructor participant mic-publish permission
    // (students unmute themselves for the doubt queue) — this just tells the local toggle button
    // it's allowed to try, matching what the server already granted.
    canPublishMic: true,
  });

  // Attention tracking: students broadcast tab-visibility + input-idle state; everyone tracks
  // everyone else's (only the instructor's UI shows it, but harmless either way).
  usePresenceBroadcast(liveKit.sendData, isInstructor);
  const presence = usePresenceTracking(liveKit.onData);

  // Spotlight: host-controlled — whoever the instructor pins takes the main stage for every
  // participant, broadcast the same way whiteboard strokes and chat are.
  useEffect(() => {
    return liveKit.onData("spotlight", (payload) => {
      const msg = payload as { identity: string | null };
      setSpotlightIdentity(msg.identity ?? null);
    });
  }, [liveKit.onData]);

  // If the pinned participant leaves, nobody's spotlighting an empty tile.
  useEffect(() => {
    if (spotlightIdentity && !liveKit.remoteParticipants.some((p) => p.identity === spotlightIdentity)) {
      setSpotlightIdentity(null);
    }
  }, [spotlightIdentity, liveKit.remoteParticipants]);

  const handlePin = useCallback(
    (identity: string | null) => {
      if (!isInstructor) return;
      setSpotlightIdentity(identity);
      liveKit.sendData("spotlight", { identity });
      setOpenControlsFor(null);
    },
    [isInstructor, liveKit.sendData]
  );

  const handleStartRecording = useCallback(async () => {
    if (!user?.token) return;
    setRecordingBusy(true);
    try {
      await authFetch("/api/live/recordings/start", user.token, {
        method: "POST",
        body: JSON.stringify({ roomId }),
      });
    } catch {
      // surfaced implicitly — the REC badge just won't light up (isRecording comes from the
      // room's own RecordingStatusChanged event, not this call's response)
    } finally {
      setRecordingBusy(false);
    }
  }, [user?.token, roomId]);

  const handleStopRecording = useCallback(async () => {
    if (!user?.token) return;
    setRecordingBusy(true);
    try {
      await authFetch("/api/live/recordings/stop", user.token, {
        method: "POST",
        body: JSON.stringify({ roomId }),
      });
    } catch {
      // ignore — dashboard's recordings list will self-heal the status on next fetch
    } finally {
      setRecordingBusy(false);
    }
  }, [user?.token, roomId]);

  const handleModerate = useCallback(
    async (targetIdentity: string, action: "mute-camera" | "mute-mic" | "allow-camera" | "allow-mic" | "remove") => {
      if (!user?.token) return;
      setOpenControlsFor(null);
      try {
        await authFetch("/api/live/moderate", user.token, {
          method: "POST",
          body: JSON.stringify({ roomId, targetIdentity, action }),
        });
      } catch {
        // the room's own track/mute events reflect the real state — nothing to reconcile here
      }
    },
    [user?.token, roomId]
  );

  const handleEndClass = async () => {
    if (isInstructor) {
      if (liveKit.isRecording) {
        await handleStopRecording();
      }
      try {
        await authFetch("/api/live/classes", user?.token, {
          method: "PATCH",
          body: JSON.stringify({ roomId, status: "ENDED" }),
        });
      } catch {
        // navigate away regardless — the class doc update isn't worth blocking on
      }
      liveKit.disconnect();
      router.push("/instructor/dashboard");
    } else {
      liveKit.disconnect();
      router.push("/dashboard");
    }
  };

  if (isLoading || entryState === "loading") {
    return (
      <div className="min-h-screen bg-[#050071] flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        <p className="text-sm font-bold tracking-wide">Connecting to Secure Live Studio...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050071] flex flex-col items-center justify-center p-6 text-white text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mx-auto border border-white/20">
          <ShieldCheck className="w-10 h-10 text-emerald-400" />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-black">Authentication Required</h2>
          <p className="text-sm text-indigo-200">
            Please log in to your Student or Faculty account to enter this live batch classroom.
          </p>
        </div>
        <Link
          href={`/login?redirect=/live/${roomId}`}
          className="px-8 py-3.5 rounded-2xl bg-white text-[#050071] font-black text-sm shadow-xl hover:bg-indigo-50 transition-all hover:scale-105"
        >
          Sign In to Enter Classroom
        </Link>
      </div>
    );
  }

  if (entryState === "class-ended") {
    return (
      <div className="min-h-screen bg-[#050071] flex flex-col items-center justify-center p-6 text-white text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto border border-amber-400/30">
          <Clock className="w-10 h-10" />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-black">This Live Class Has Concluded</h2>
          <p className="text-sm text-indigo-200">
            The interactive lecture and doubt session for <strong>{liveClass?.title || "this batch"}</strong> has already ended. You can view the full video recording, notes, and formula sheets from your student dashboard.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard?tab=recordings"
            className="px-6 py-3.5 rounded-2xl bg-white text-[#050071] font-black text-sm shadow-xl hover:bg-indigo-50 transition-all hover:scale-105"
          >
            View Class Recordings
          </Link>
          <Link
            href={isInstructor ? "/instructor/dashboard" : "/dashboard"}
            className="px-6 py-3.5 rounded-2xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all border border-white/20"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (entryState === "class-not-found" || entryState === "not-enrolled" || entryState === "token-error") {
    return (
      <div className="min-h-screen bg-[#050071] flex flex-col items-center justify-center p-6 text-white text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mx-auto border border-white/20">
          <Lock className="w-10 h-10 text-amber-300" />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-black">
            {entryState === "class-not-found" ? "Class Not Found" : entryState === "not-enrolled" ? "Not Enrolled" : "Connection Error"}
          </h2>
          <p className="text-sm text-indigo-200">
            {entryState === "class-not-found"
              ? "This live class doesn't exist or has already ended."
              : entryError}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {entryState === "token-error" && (
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all hover:scale-105 cursor-pointer shadow-lg"
            >
              Retry Connection
            </button>
          )}
          <Link
            href={isInstructor ? "/instructor/dashboard" : "/dashboard"}
            className="px-6 py-3.5 rounded-2xl bg-white text-[#050071] font-black text-sm shadow-xl hover:bg-indigo-50 transition-all hover:scale-105"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050071] min-h-screen text-white flex flex-col justify-between overflow-hidden">
      {/* Top Classroom Bar */}
      <header className="px-4 sm:px-6 py-3 bg-[#030045] border-b border-indigo-950 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleEndClass}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            title="Leave classroom"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  liveKit.connectionState === "connected" ? "bg-emerald-400 animate-ping" : "bg-amber-400 animate-pulse"
                }`}
              />
              <h1 className="text-sm sm:text-base font-black tracking-tight text-white">
                {liveClass?.title || "Live Classroom"}
              </h1>
            </div>
            <p className="text-[11px] text-indigo-300">
              Instructor: <strong className="text-white">{liveClass?.instructor}</strong> •{" "}
              {liveKit.remoteParticipants.length + 1} Connected
              {liveKit.connectionState !== "connected" && (
                <span className="ml-2 text-amber-300 font-bold">
                  {liveKit.connectionState === "failed" ? "Connection failed" : "Connecting…"}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Recording Badge & Layout Toggle */}
        <div className="flex items-center gap-3">
          {/* Cloud Auto-Recording Status */}
          {liveKit.isRecording ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-bold shadow-md animate-pulse">
              <Disc className="w-4 h-4 text-red-500 animate-spin" />
              <span>REC • GCS Cloud Auto-Save</span>
            </div>
          ) : isInstructor ? (
            <button
              type="button"
              onClick={handleStartRecording}
              disabled={recordingBusy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold shadow-md transition-colors cursor-pointer disabled:opacity-50"
            >
              {recordingBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Disc className="w-4 h-4 text-red-400" />}
              <span>Start Cloud Recording</span>
            </button>
          ) : null}

          {isInstructor && liveKit.isRecording && (
            <button
              type="button"
              onClick={handleStopRecording}
              disabled={recordingBusy}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              Stop Recording
            </button>
          )}

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => setActiveMainView("whiteboard")}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                activeMainView === "whiteboard" ? "bg-[#5751E1] text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              Whiteboard
            </button>
            <button
              type="button"
              onClick={() => setActiveMainView("video")}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                activeMainView === "video" ? "bg-[#5751E1] text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              Video Stream
            </button>
          </div>
        </div>
      </header>

      {/* Main Classroom Workspace */}
      <main className="flex-1 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-[1600px] mx-auto w-full">
        {/* Center Main Stage (Whiteboard or HD Video Grid) */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          <div className="flex-1 h-full min-h-[500px]">
            {activeMainView === "whiteboard" ? (
              <WhiteboardCanvas
                isInstructor={isInstructor}
                roomId={roomId}
                sendData={liveKit.sendData}
                onData={liveKit.onData}
              />
            ) : liveKit.activeScreenShare ? (
              <div className="w-full h-full min-h-[500px] bg-slate-950 rounded-3xl overflow-hidden border border-indigo-900 shadow-2xl flex flex-col gap-3 p-3">
                {/* Main stage: whoever is screen-sharing takes the full frame — a shared screen
                    and a camera feed are separate tracks, so they never fight over the same
                    <video> element the way they used to. */}
                <div className="flex-1 min-h-0 rounded-2xl bg-black overflow-hidden border border-white/10 relative">
                  <video
                    ref={
                      liveKit.activeScreenShare.isLocal
                        ? liveKit.localScreenShareEl
                        : liveKit.remoteParticipants.find((p) => p.identity === liveKit.activeScreenShare!.identity)
                            ?.attachScreenShare
                    }
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                  <span className="absolute top-3 left-3 text-[11px] font-bold text-white bg-black/60 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{liveKit.activeScreenShare.name} is sharing their screen</span>
                  </span>
                </div>

                {/* Camera thumbnail strip */}
                <div className="flex gap-2 h-20 sm:h-24 flex-shrink-0 overflow-x-auto">
                  <div className="relative aspect-video h-full rounded-xl bg-black/80 border border-white/20 overflow-hidden flex-shrink-0">
                    <video ref={liveKit.localCameraEl} autoPlay playsInline muted className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1.5 text-[9px] font-bold text-white bg-black/60 px-1 py-0.5 rounded">
                      You
                    </span>
                  </div>
                  {liveKit.remoteParticipants.map((p) => (
                    <div key={p.identity} className="relative aspect-video h-full rounded-xl bg-black overflow-hidden border border-white/10 flex-shrink-0">
                      <video ref={p.attachCamera} autoPlay playsInline className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1.5 text-[9px] font-bold text-white bg-black/60 px-1 py-0.5 rounded">
                        {p.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : spotlightIdentity && liveKit.remoteParticipants.find((p) => p.identity === spotlightIdentity) ? (
              (() => {
                const pinned = liveKit.remoteParticipants.find((p) => p.identity === spotlightIdentity)!;
                return (
                  <div className="w-full h-full min-h-[500px] bg-slate-950 rounded-3xl overflow-hidden border border-indigo-900 shadow-2xl flex flex-col gap-3 p-3">
                    {/* Main stage: the instructor's pinned participant, full-size, regardless of
                        who's currently speaking. */}
                    <div className="flex-1 min-h-0 rounded-2xl bg-black overflow-hidden border border-white/10 relative">
                      {pinned.isCameraMuted ? (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900">
                          <div className="w-20 h-20 rounded-full bg-[#5751E1] text-white font-black text-2xl flex items-center justify-center">
                            {pinned.name.slice(0, 1).toUpperCase()}
                          </div>
                        </div>
                      ) : (
                        <video ref={pinned.attachCamera} autoPlay playsInline className="w-full h-full object-contain" />
                      )}
                      <span className="absolute top-3 left-3 text-[11px] font-bold text-white bg-black/60 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        <Pin className="w-3.5 h-3.5 text-amber-300" />
                        <span>{pinned.name} is spotlighted</span>
                      </span>
                      {isInstructor && (
                        <button
                          type="button"
                          onClick={() => handlePin(null)}
                          className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 text-white text-[11px] font-bold cursor-pointer"
                        >
                          <PinOff className="w-3.5 h-3.5" />
                          <span>Unpin</span>
                        </button>
                      )}
                    </div>

                    {/* Camera thumbnail strip */}
                    <div className="flex gap-2 h-20 sm:h-24 flex-shrink-0 overflow-x-auto">
                      <div className="relative aspect-video h-full rounded-xl bg-black/80 border border-white/20 overflow-hidden flex-shrink-0">
                        <video ref={liveKit.localCameraEl} autoPlay playsInline muted className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1.5 text-[9px] font-bold text-white bg-black/60 px-1 py-0.5 rounded">
                          You
                        </span>
                      </div>
                      {liveKit.remoteParticipants
                        .filter((p) => p.identity !== spotlightIdentity)
                        .map((p) => (
                          <div key={p.identity} className="relative aspect-video h-full rounded-xl bg-black overflow-hidden border border-white/10 flex-shrink-0">
                            <video ref={p.attachCamera} autoPlay playsInline className="w-full h-full object-cover" />
                            <span className="absolute bottom-1 left-1.5 text-[9px] font-bold text-white bg-black/60 px-1 py-0.5 rounded">
                              {p.name}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="w-full h-full min-h-[500px] bg-slate-950 rounded-3xl overflow-hidden border border-indigo-900 shadow-2xl relative p-3">
                <div
                  className={`w-full h-full grid gap-3 ${
                    liveKit.remoteParticipants.length === 0
                      ? "grid-cols-1"
                      : liveKit.remoteParticipants.length === 1
                      ? "grid-cols-2"
                      : "grid-cols-2 sm:grid-cols-3"
                  }`}
                >
                  {liveKit.remoteParticipants.length === 0 && (
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-black flex items-center justify-center text-center">
                      <div className="space-y-2">
                        <Users className="w-8 h-8 text-indigo-400 mx-auto" />
                        <p className="text-xs text-indigo-300 font-semibold">Waiting for others to join…</p>
                      </div>
                    </div>
                  )}
                  {liveKit.remoteParticipants.map((p) => (
                    <div key={p.identity} className="relative rounded-2xl bg-black overflow-hidden border border-white/10">
                      {p.isCameraMuted ? (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900">
                          <div className="w-14 h-14 rounded-full bg-[#5751E1] text-white font-black text-lg flex items-center justify-center">
                            {p.name.slice(0, 1).toUpperCase()}
                          </div>
                        </div>
                      ) : (
                        <video ref={p.attachCamera} autoPlay playsInline className="w-full h-full object-cover" />
                      )}

                      <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <PresenceDot state={presence[p.identity]} />
                        {p.name}
                        {p.isSpeaking && !p.isMicMuted && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                        {p.isMicMuted ? <MicOff className="w-3 h-3 text-rose-400" /> : null}
                      </span>

                      {/* Instructor moderation controls */}
                      {isInstructor && (
                        <div className="absolute top-1.5 right-1.5">
                          <button
                            type="button"
                            onClick={() => setOpenControlsFor(openControlsFor === p.identity ? null : p.identity)}
                            className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white cursor-pointer"
                            title="Participant controls"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>

                          {openControlsFor === p.identity && (
                            <div className="absolute right-0 mt-1 w-44 rounded-xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden text-[11px] font-bold z-10">
                              <button
                                type="button"
                                onClick={() => handlePin(p.identity)}
                                className="w-full text-left px-3 py-2 hover:bg-white/10 text-white cursor-pointer flex items-center gap-2"
                              >
                                <Pin className="w-3.5 h-3.5" />
                                <span>Pin as Spotlight</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleModerate(p.identity, p.isMicMuted ? "allow-mic" : "mute-mic")}
                                className="w-full text-left px-3 py-2 hover:bg-white/10 text-white cursor-pointer flex items-center gap-2"
                              >
                                {p.isMicMuted ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                                <span>{p.isMicMuted ? "Allow Mic" : "Mute Mic"}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleModerate(p.identity, p.isCameraMuted ? "allow-camera" : "mute-camera")}
                                className="w-full text-left px-3 py-2 hover:bg-white/10 text-white cursor-pointer flex items-center gap-2"
                              >
                                {p.isCameraMuted ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
                                <span>{p.isCameraMuted ? "Allow Camera" : "Turn Off Camera"}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleModerate(p.identity, "remove")}
                                className="w-full text-left px-3 py-2 hover:bg-rose-600 text-rose-300 hover:text-white cursor-pointer flex items-center gap-2"
                              >
                                <UserX className="w-3.5 h-3.5" />
                                <span>Remove from Class</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Floating Self Camera PiP */}
                <div className="absolute bottom-4 right-4 w-40 sm:w-48 aspect-video rounded-2xl bg-black/80 border border-white/20 overflow-hidden shadow-2xl">
                  <video
                    ref={liveKit.localCameraEl}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
                    You ({isInstructor ? "Host" : "Student"})
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: 45+15 Signature Doubt Queue & Live Chat */}
        <div className="lg:col-span-4 flex flex-col gap-4 h-full">
          <DoubtQueueManager
            isInstructor={isInstructor}
            currentUserName={user.name}
            sendData={liveKit.sendData}
            onData={liveKit.onData}
            onModeChange={(mode) => setFocusMode(mode === "lecture")}
          />
          <div className="flex-1 min-h-[350px]">
            {/* Focus Mode: during the 45-min lecture phase, students lose the chat panel — one
                fewer thing pulling attention off the derivation on screen. Raise-hand stays
                available in the doubt queue above regardless of phase. Instructor always sees
                chat; they're the one running the class. */}
            {focusMode && !isInstructor ? (
              <div className="w-full h-full bg-slate-900 border border-indigo-900/60 rounded-3xl p-5 flex flex-col items-center justify-center text-center space-y-2 text-slate-400">
                <MessageSquareOff className="w-6 h-6" />
                <p className="text-xs font-bold">Focus Mode is on</p>
                <p className="text-[11px]">Chat reopens during the 15-min doubt session. Raise your hand above if you need faculty now.</p>
              </div>
            ) : (
              <LiveChatDrawer
                currentUserName={user.name}
                isInstructor={isInstructor}
                sendData={liveKit.sendData}
                onData={liveKit.onData}
              />
            )}
          </div>
        </div>
      </main>

      {/* Bottom Media Controls Bar */}
      <footer className="px-4 sm:px-6 py-3 bg-[#030045] border-t border-indigo-950 flex items-center justify-center gap-3 sm:gap-4 z-50">
        {/* Microphone Toggle */}
        <button
          type="button"
          onClick={liveKit.toggleMic}
          className={`p-3 sm:p-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-110 active:scale-90 cursor-pointer ${
            liveKit.isMicOn ? "bg-white/10 hover:bg-white/20 text-white" : "bg-rose-600 text-white"
          }`}
          title={liveKit.isMicOn ? "Mute Microphone" : "Unmute Microphone"}
        >
          {liveKit.isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>

        {/* Camera Toggle — instructor only; students never publish camera */}
        {isInstructor && (
          <button
            type="button"
            onClick={liveKit.toggleCamera}
            className={`p-3 sm:p-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-110 active:scale-90 cursor-pointer ${
              liveKit.isCameraOn ? "bg-white/10 hover:bg-white/20 text-white" : "bg-rose-600 text-white"
            }`}
            title={liveKit.isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
          >
            {liveKit.isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>
        )}

        {/* Screen Share Toggle (Instructor only) */}
        {isInstructor && (
          <button
            type="button"
            onClick={liveKit.toggleScreenShare}
            className={`p-3 sm:p-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-110 active:scale-90 cursor-pointer ${
              liveKit.isScreenSharing ? "bg-emerald-600 text-white" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
            title={liveKit.isScreenSharing ? "Stop Screen Share" : "Share Screen"}
          >
            {liveKit.isScreenSharing ? <MonitorOff className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
          </button>
        )}

        {/* Leave / End Class */}
        <button
          type="button"
          onClick={handleEndClass}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 hover:brightness-110 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <PhoneOff className="w-4 h-4" />
          <span>{isInstructor ? "End Live Class (Auto-Save to Cloud)" : "Leave Classroom"}</span>
        </button>
      </footer>
    </div>
  );
}
