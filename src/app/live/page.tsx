"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";

/** No single "the" live room exists anymore — this index resolves to wherever the signed-in user
 * actually has a live class right now, or falls back to their dashboard's Live Classes Hub. */
export default function LiveIndexPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const isInstructor = user?.role === "instructor" || user?.role === "admin";
    const fallback = isInstructor ? "/instructor/dashboard" : "/dashboard";

    if (!user) {
      router.replace(`/login?redirect=${encodeURIComponent("/live")}`);
      return;
    }

    (async () => {
      try {
        const query = isInstructor ? `instructorEmail=${encodeURIComponent(user.email)}` : "";
        const res = await fetch(`/api/live/classes?${query}`);
        const data = await res.json();
        const classes = data?.classes || [];
        const live = classes.filter((c: any) => c.status === "LIVE_NOW");

        if (live.length === 1) {
          router.replace(`/live/${live[0].roomId}`);
        } else {
          router.replace(fallback);
        }
      } catch {
        router.replace(fallback);
      }
    })();
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen bg-[#050071] flex flex-col items-center justify-center text-white space-y-4">
      <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      <p className="text-sm font-bold tracking-wide">Finding your live class…</p>
    </div>
  );
}
