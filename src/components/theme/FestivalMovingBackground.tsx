"use client";

import React from "react";
import { useFestivalTheme } from "./FestivalThemeContext";

export default function FestivalMovingBackground() {
  const { activeFestival } = useFestivalTheme();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Top Festival Ribbon */}
      <div
        className="w-full h-1"
        style={{
          background: activeFestival.bannerGradient,
        }}
      />

      {/* Floating Independence Day Kites & Embellishments */}
      {activeFestival.id === "independence_day" && (
        <>
          {/* Floating Kite 1 (Saffron) */}
          <div
            className="absolute top-24 left-[5%] opacity-40 animate-bounce"
            style={{ animationDuration: "6s" }}
          >
            <div className="w-10 h-10 bg-[#FF9933] rotate-45 rounded-sm shadow-md border border-white/60 relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/70 -translate-y-1/2" />
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/70 -translate-x-1/2" />
              {/* Kite Tail */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-400" />
            </div>
          </div>

          {/* Floating Kite 2 (Green) */}
          <div
            className="absolute top-48 right-[8%] opacity-35 animate-bounce"
            style={{ animationDuration: "8s" }}
          >
            <div className="w-12 h-12 bg-[#138808] rotate-45 rounded-sm shadow-md border border-white/60 relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/70 -translate-y-1/2" />
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/70 -translate-x-1/2" />
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-400" />
            </div>
          </div>

          {/* Floating Kite 3 (Tricolor White/Navy) */}
          <div
            className="absolute top-[65%] left-[8%] opacity-30 animate-bounce"
            style={{ animationDuration: "7s" }}
          >
            <div className="w-8 h-8 bg-white rotate-45 rounded-sm shadow-sm border border-slate-300 relative flex items-center justify-center">
              <div className="w-3 h-3 rounded-full border border-[#000080]" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-slate-400" />
            </div>
          </div>
        </>
      )}

      {/* Floating Glowing Ambient Orbs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: activeFestival.primaryColor }}
      />
      <div
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: activeFestival.secondaryColor }}
      />
      <div
        className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: activeFestival.accentColor }}
      />
    </div>
  );
}
