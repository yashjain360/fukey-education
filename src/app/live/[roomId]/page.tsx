"use client";

import React, { useState, useEffect, useRef } from "react";
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
  MessageSquare,
  PenTool,
  Sparkles,
  ShieldCheck,
  Disc,
  Clock,
  Layers,
  ChevronLeft,
  Volume2
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import WhiteboardCanvas from "@/components/live/WhiteboardCanvas";
import LiveChatDrawer from "@/components/live/LiveChatDrawer";
import DoubtQueueManager from "@/components/live/DoubtQueueManager";
import { triggerConfetti } from "@/lib/confetti";

export default function LiveRoomPage() {
  const params = useParams();
  const roomId = (params?.roomId as string) || "room-maths-10-quadratics";
  const { user } = useAuth();
  const router = useRouter();

  const isInstructor = user?.role === "instructor" || user?.role === "admin";
  const participantName = user?.name || (isInstructor ? "Pawan Gupta (Faculty)" : "Mayank Dubey (Student)");

  // Media States
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeMainView, setActiveMainView] = useState<"whiteboard" | "video">("whiteboard");
  const [isRecording, setIsRecording] = useState(true);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Video element refs for mock WebRTC streams
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Setup Local Camera Stream if supported
    if (typeof navigator !== "undefined" && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          // Camera permission denied or mock environment fallback
        });
    }

    const recTimer = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(recTimer);
  }, []);

  const formatRecordingTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleEndClass = async () => {
    if (isInstructor) {
      // Auto-save recording to database & cloud
      try {
        await fetch("/api/live/recordings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomId,
            title: "Class 10th Maths: Quadratic Equations Live Lecture",
            instructor: participantName,
            duration: `${Math.max(1, Math.floor(recordingSeconds / 60))} Mins`,
          }),
        });
        triggerConfetti();
      } catch (e) {}
      router.push("/instructor/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="bg-[#050071] min-h-screen text-white flex flex-col justify-between overflow-hidden">
      {/* Top Classroom Bar */}
      <header className="px-4 sm:px-6 py-3 bg-[#030045] border-b border-indigo-950 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href={isInstructor ? "/instructor/dashboard" : "/dashboard"}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            title="Leave classroom"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <h1 className="text-sm sm:text-base font-black tracking-tight text-white">
                Class 10th Maths: Quadratic Equations Live Batch
              </h1>
            </div>
            <p className="text-[11px] text-indigo-300">
              Instructor: <strong className="text-white">Pawan Gupta</strong> • 42 Students Connected
            </p>
          </div>
        </div>

        {/* Recording Badge & Layout Toggle */}
        <div className="flex items-center gap-3">
          {/* Cloud Auto-Recording Status */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-bold shadow-md animate-pulse">
            <Disc className="w-4 h-4 text-red-500 animate-spin" />
            <span>REC ({formatRecordingTime(recordingSeconds)}) • GCS Cloud Auto-Save</span>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl text-xs">
            <button
              onClick={() => setActiveMainView("whiteboard")}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                activeMainView === "whiteboard" ? "bg-[#5751E1] text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              Whiteboard
            </button>
            <button
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
              <WhiteboardCanvas isInstructor={isInstructor} roomId={roomId} />
            ) : (
              <div className="w-full h-full min-h-[500px] bg-slate-950 rounded-3xl overflow-hidden border border-indigo-900 shadow-2xl relative flex items-center justify-center">
                {/* Simulated Instructor WebRTC Feed */}
                <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
                  <div className="text-center space-y-3">
                    <div className="w-24 h-24 rounded-full bg-[#5751E1] text-white font-black text-3xl mx-auto flex items-center justify-center border-4 border-white/20 shadow-2xl">
                      PG
                    </div>
                    <div className="font-extrabold text-lg text-white">Faculty: Pawan Gupta</div>
                    <div className="text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                      <Volume2 className="w-4 h-4 animate-pulse" />
                      <span>Broadcasting 1080p 60fps Live Video</span>
                    </div>
                  </div>
                </div>

                {/* Floating Self Camera PiP */}
                <div className="absolute bottom-4 right-4 w-40 sm:w-48 aspect-video rounded-2xl bg-black/80 border border-white/20 overflow-hidden shadow-2xl">
                  <video
                    ref={localVideoRef}
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
          <DoubtQueueManager isInstructor={isInstructor} currentUserName={participantName} />
          <div className="flex-1 min-h-[350px]">
            <LiveChatDrawer currentUserName={participantName} isInstructor={isInstructor} />
          </div>
        </div>
      </main>

      {/* Bottom Media Controls Bar */}
      <footer className="px-4 sm:px-6 py-3 bg-[#030045] border-t border-indigo-950 flex items-center justify-center gap-3 sm:gap-4 z-50">
        {/* Microphone Toggle */}
        <button
          onClick={() => setIsMicOn(!isMicOn)}
          className={`p-3 sm:p-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-110 active:scale-90 cursor-pointer ${
            isMicOn ? "bg-white/10 hover:bg-white/20 text-white" : "bg-rose-600 text-white"
          }`}
          title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
        >
          {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>

        {/* Camera Toggle */}
        <button
          onClick={() => setIsCameraOn(!isCameraOn)}
          className={`p-3 sm:p-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-110 active:scale-90 cursor-pointer ${
            isCameraOn ? "bg-white/10 hover:bg-white/20 text-white" : "bg-rose-600 text-white"
          }`}
          title={isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
        >
          {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        {/* Screen Share Toggle (Instructor only) */}
        {isInstructor && (
          <button
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`p-3 sm:p-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-110 active:scale-90 cursor-pointer ${
              isScreenSharing ? "bg-emerald-600 text-white" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
            title={isScreenSharing ? "Stop Screen Share" : "Share Screen"}
          >
            {isScreenSharing ? <MonitorOff className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
          </button>
        )}

        {/* Leave / End Class */}
        <button
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
