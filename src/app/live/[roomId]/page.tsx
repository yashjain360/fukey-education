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
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import WhiteboardCanvas from "@/components/live/WhiteboardCanvas";
import LiveChatDrawer from "@/components/live/LiveChatDrawer";
import DoubtQueueManager from "@/components/live/DoubtQueueManager";
import { useLiveKitRoom } from "@/components/live/useLiveKitRoom";

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

type EntryState = "loading" | "class-not-found" | "not-enrolled" | "ready" | "token-error";

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

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(`/live/${roomId}`)}`);
    }
  }, [user, isLoading, router, roomId]);

  const isInstructor = user?.role === "instructor" || user?.role === "admin";

  // Fetch the class doc, then mint a token — the token route is the real access gate (it repeats
  // this enrollment check server-side and 403s regardless of what happens here); this is only for a
  // clean "not enrolled" screen instead of a raw fetch failure.
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

        const tokenRes = await authFetch("/api/live/token", user.token, {
          method: "POST",
          body: JSON.stringify({ roomId }),
        });
        const tokenData = await tokenRes.json();
        if (cancelled) return;

        if (!tokenData.success) {
          if (tokenRes.status === 403) {
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
  });

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
        <Link
          href={isInstructor ? "/instructor/dashboard" : "/dashboard"}
          className="px-8 py-3.5 rounded-2xl bg-white text-[#050071] font-black text-sm shadow-xl hover:bg-indigo-50 transition-all hover:scale-105"
        >
          Back to Dashboard
        </Link>
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
                      <video ref={p.attachVideo} autoPlay playsInline className="w-full h-full object-cover" />
                      <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded flex items-center gap-1">
                        {p.name}
                        {p.isSpeaking && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Floating Self Camera PiP */}
                <div className="absolute bottom-4 right-4 w-40 sm:w-48 aspect-video rounded-2xl bg-black/80 border border-white/20 overflow-hidden shadow-2xl">
                  <video
                    ref={liveKit.localVideoEl}
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
          />
          <div className="flex-1 min-h-[350px]">
            <LiveChatDrawer
              currentUserName={user.name}
              isInstructor={isInstructor}
              sendData={liveKit.sendData}
              onData={liveKit.onData}
            />
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
