"use client";

import { useEffect, useRef, useState } from "react";

export type PresenceState = "active" | "away" | "idle";

const IDLE_MS = 60_000;
const HEARTBEAT_MS = 20_000;

/** Students broadcast their own attention state — tab visibility + input idle detection — over the
 * data channel. There's no LiveKit-native concept of this; it's the same pattern chat/whiteboard
 * already use. Instructors don't broadcast their own (nobody's watching for it). */
export function usePresenceBroadcast(sendData: (topic: string, payload: unknown) => void, isInstructor: boolean) {
  const lastStateRef = useRef<PresenceState>("active");

  useEffect(() => {
    if (isInstructor) return;

    let idleTimer: ReturnType<typeof setTimeout>;

    const broadcast = (state: PresenceState) => {
      if (state === lastStateRef.current) return;
      lastStateRef.current = state;
      sendData("presence", { state });
    };

    const resetIdle = () => {
      if (document.visibilityState === "hidden") return;
      broadcast("active");
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => broadcast("idle"), IDLE_MS);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        clearTimeout(idleTimer);
        broadcast("away");
      } else {
        resetIdle();
      }
    };

    const activityEvents: (keyof WindowEventMap)[] = ["mousemove", "keydown", "click", "touchstart", "scroll"];
    activityEvents.forEach((evt) => window.addEventListener(evt, resetIdle, { passive: true }));
    document.addEventListener("visibilitychange", onVisibility);
    resetIdle();

    // A periodic heartbeat means the instructor's view self-heals even if a state-change broadcast
    // was dropped, without needing per-second traffic.
    const heartbeat = setInterval(() => sendData("presence", { state: lastStateRef.current }), HEARTBEAT_MS);

    return () => {
      activityEvents.forEach((evt) => window.removeEventListener(evt, resetIdle));
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(idleTimer);
      clearInterval(heartbeat);
    };
  }, [sendData, isInstructor]);
}

/** Tracks every other participant's broadcast presence state, keyed by identity. */
export function usePresenceTracking(
  onData: (topic: string, handler: (payload: unknown, fromIdentity: string) => void) => () => void
): Record<string, PresenceState> {
  const [presence, setPresence] = useState<Record<string, PresenceState>>({});

  useEffect(() => {
    return onData("presence", (payload, fromIdentity) => {
      const msg = payload as { state: PresenceState };
      if (!fromIdentity || !msg?.state) return;
      setPresence((prev) => (prev[fromIdentity] === msg.state ? prev : { ...prev, [fromIdentity]: msg.state }));
    });
  }, [onData]);

  return presence;
}
