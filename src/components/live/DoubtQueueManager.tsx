"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock, Hand, Mic, UserCheck } from "lucide-react";
import { triggerConfetti } from "@/lib/confetti";

type DoubtQueueMsg =
  | { type: "raise-hand"; id: string; name: string; topic: string }
  | { type: "lower-hand"; name: string }
  | { type: "approve-speaker"; name: string }
  | { type: "mute-speaker" }
  | { type: "mode-switch"; mode: "lecture" | "doubt"; secondsRemaining: number };

interface DoubtQueueProps {
  isInstructor: boolean;
  currentUserName: string;
  sendData: (topic: string, payload: unknown) => void;
  onData: (topic: string, handler: (payload: unknown) => void) => () => void;
}

const LECTURE_SECONDS = 45 * 60;
const DOUBT_SECONDS = 15 * 60;

export default function DoubtQueueManager({ isInstructor, currentUserName, sendData, onData }: DoubtQueueProps) {
  const [mode, setMode] = useState<"lecture" | "doubt">("lecture");
  const [secondsRemaining, setSecondsRemaining] = useState(LECTURE_SECONDS);
  const [handRaised, setHandRaised] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);
  const [queue, setQueue] = useState<{ id: string; name: string; topic: string }[]>([]);

  // Each client ticks its own local countdown between broadcasts (avoids a re-render storm from
  // every participant's timer firing a network message every second) but resyncs the instant a
  // fresh mode-switch arrives, so nobody's timer can drift out of agreement.
  const tickingRef = useRef(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!tickingRef.current) return;
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return onData("doubt-queue", (payload) => {
      const msg = payload as DoubtQueueMsg;
      switch (msg.type) {
        case "raise-hand":
          setQueue((prev) => (prev.some((q) => q.name === msg.name) ? prev : [...prev, { id: msg.id, name: msg.name, topic: msg.topic }]));
          break;
        case "lower-hand":
          setQueue((prev) => prev.filter((q) => q.name !== msg.name));
          break;
        case "approve-speaker":
          setActiveSpeaker(msg.name);
          setQueue((prev) => prev.filter((q) => q.name !== msg.name));
          break;
        case "mute-speaker":
          setActiveSpeaker(null);
          break;
        case "mode-switch":
          setMode(msg.mode);
          setSecondsRemaining(msg.secondsRemaining);
          break;
      }
    });
  }, [onData]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleToggleHand = () => {
    if (!handRaised) {
      const entry = { id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, name: currentUserName, topic: "Doubt query" };
      setQueue((prev) => [...prev, entry]);
      sendData("doubt-queue", { type: "raise-hand", ...entry } as DoubtQueueMsg);
      setHandRaised(true);
      triggerConfetti();
    } else {
      setQueue((prev) => prev.filter((q) => q.name !== currentUserName));
      sendData("doubt-queue", { type: "lower-hand", name: currentUserName } as DoubtQueueMsg);
      setHandRaised(false);
    }
  };

  const handleApproveSpeaker = (name: string) => {
    setActiveSpeaker(name);
    setQueue((prev) => prev.filter((q) => q.name !== name));
    sendData("doubt-queue", { type: "approve-speaker", name } as DoubtQueueMsg);
    triggerConfetti();
  };

  const handleMuteSpeaker = () => {
    setActiveSpeaker(null);
    sendData("doubt-queue", { type: "mute-speaker" } as DoubtQueueMsg);
  };

  const handleModeSwitch = () => {
    const nextMode = mode === "lecture" ? "doubt" : "lecture";
    const nextSeconds = nextMode === "doubt" ? DOUBT_SECONDS : LECTURE_SECONDS;
    setMode(nextMode);
    setSecondsRemaining(nextSeconds);
    sendData("doubt-queue", { type: "mode-switch", mode: nextMode, secondsRemaining: nextSeconds } as DoubtQueueMsg);
  };

  // Instructor drives the countdown-triggered auto-switch and broadcasts it; students just receive.
  useEffect(() => {
    if (!isInstructor) return;
    if (secondsRemaining > 0) return;

    const nextMode = mode === "lecture" ? "doubt" : "lecture";
    const nextSeconds = nextMode === "doubt" ? DOUBT_SECONDS : LECTURE_SECONDS;
    setMode(nextMode);
    setSecondsRemaining(nextSeconds);
    sendData("doubt-queue", { type: "mode-switch", mode: nextMode, secondsRemaining: nextSeconds } as DoubtQueueMsg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsRemaining, isInstructor]);

  return (
    <div className="bg-slate-900 border border-indigo-900/60 rounded-3xl p-5 text-white space-y-4 shadow-xl">
      {/* 45+15 Signature Pedagogy Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="space-y-0.5">
          <div className="text-[10px] font-black text-amber-300 uppercase tracking-wider">
            Signature 45+15 Model
          </div>
          <h4 className="font-extrabold text-xs text-slate-100">
            {mode === "lecture" ? "Live Tablet Lecture Mode" : "1-on-1 Dedicated Doubt Room"}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-400 animate-icon-pulse" />
          <span className="font-mono font-black text-sm text-emerald-400">
            {formatTimer(secondsRemaining)}
          </span>
        </div>
      </div>

      {/* Mode Status Pill */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${mode === "lecture" ? "bg-blue-400" : "bg-emerald-400"} animate-ping`} />
          <span className="font-bold">
            {mode === "lecture" ? "45 Mins: Faculty Derivation" : "15 Mins: Voice Doubt Answering"}
          </span>
        </div>

        {isInstructor && (
          <button
            type="button"
            onClick={handleModeSwitch}
            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[10px] font-bold transition-colors cursor-pointer"
          >
            Switch to {mode === "lecture" ? "15-Min Doubt" : "Lecture"}
          </button>
        )}
      </div>

      {/* Live Speaker / Mic Granted */}
      {activeSpeaker && (
        <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="font-bold">Live Speaking: {activeSpeaker}</span>
          </div>
          {isInstructor && (
            <button
              onClick={handleMuteSpeaker}
              className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-bold"
            >
              Mute
            </button>
          )}
        </div>
      )}

      {/* Student Hand Raise Action */}
      {!isInstructor && (
        <button
          type="button"
          onClick={handleToggleHand}
          className={`w-full py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102 active:scale-95 cursor-pointer ${
            handRaised
              ? "bg-amber-500 text-slate-950"
              : "bg-gradient-to-r from-[#5751E1] to-[#FF2424] text-white"
          }`}
        >
          <Hand className="w-4 h-4" />
          <span>{handRaised ? "Hand Raised (In Doubt Queue)" : "Raise Hand for 1-on-1 Voice Doubt"}</span>
        </button>
      )}

      {/* Doubt Queue for Instructor */}
      {isInstructor && (
        <div className="space-y-2">
          <div className="text-[11px] font-extrabold text-slate-400 flex justify-between">
            <span>Student Doubt Queue ({queue.length})</span>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto">
            {queue.length === 0 ? (
              <div className="text-[11px] text-slate-500 text-center py-2">No pending doubts in queue.</div>
            ) : (
              queue.map((q) => (
                <div
                  key={q.id}
                  className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-200">{q.name}</div>
                    <div className="text-[10px] text-slate-400">{q.topic}</div>
                  </div>

                  <button
                    onClick={() => handleApproveSpeaker(q.name)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <UserCheck className="w-3 h-3" />
                    <span>Unmute</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
