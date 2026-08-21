"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { useFestivalTheme } from "@/components/theme/FestivalThemeContext";

export default function HeroSection() {
  const { activeFestival } = useFestivalTheme();

  const isRakhi = activeFestival.id === "rakshabandhan";
  const isIndep = activeFestival.id === "independence_day";
  const isDiwali = activeFestival.id === "diwali";

  // Dynamic Background and Side Accent Styling based on active festival
  const bgTheme = isRakhi
    ? "bg-gradient-to-b from-[#042F2E] via-[#0F766E] to-[#134E4A] text-white"
    : isIndep
    ? "bg-gradient-to-b from-orange-50/60 via-white to-emerald-50/40 text-slate-900"
    : isDiwali
    ? "bg-gradient-to-b from-[#451A03] via-[#78350F] to-[#92400E] text-white"
    : "bg-gradient-to-b from-indigo-50/60 via-white to-slate-50 text-slate-900";

  return (
    <section className={`relative overflow-hidden ${bgTheme} pt-12 pb-20 border-b border-slate-200/50 transition-colors duration-500`}>
      {/* 1. Blinkit-Style Top Festive Floral / Scalloped Ribbon */}
      {isRakhi && (
        <>
          <div className="absolute top-0 inset-x-0 h-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FDE047] via-[#D97706] to-transparent opacity-70" />
          {/* Subtle Toran Garland Motif */}
          <div className="absolute top-1 inset-x-0 flex justify-around opacity-30 pointer-events-none text-amber-300 text-xs">
            <span>🏵️</span><span>✨</span><span>🪢</span><span>✨</span><span>🏵️</span><span>✨</span><span>🪢</span><span>✨</span><span>🏵️</span>
          </div>
        </>
      )}

      {/* 2. Side Floral / Mandala Background Watermarks (Matching Blinkit sides) */}
      {isRakhi && (
        <>
          <div className="absolute -left-20 top-1/4 w-80 h-80 rounded-full bg-[#D97706]/15 blur-2xl pointer-events-none" />
          <div className="absolute -right-20 top-1/3 w-80 h-80 rounded-full bg-[#FDE047]/15 blur-2xl pointer-events-none" />
        </>
      )}

      {isIndep && (
        <>
          <div className="absolute -left-20 top-1/4 w-80 h-80 rounded-full bg-[#FF9933]/15 blur-2xl pointer-events-none" />
          <div className="absolute -right-20 top-1/3 w-80 h-80 rounded-full bg-[#138808]/15 blur-2xl pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Consistent Clean Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Online / Festival Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D97706] text-white text-xs font-black uppercase tracking-wider shadow-sm">
              <span>{activeFestival.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Live Online Coaching</span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${isRakhi || isDiwali ? "text-white" : "text-[#06042E]"}`}>
              Classes For <br />
              <span className={isRakhi ? "text-[#FDE047]" : isDiwali ? "text-[#FDE047]" : "bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] bg-clip-text text-transparent"}>
                Class 9th to 12th
              </span>{" "}
              Students.
            </h1>

            {/* Subheading */}
            <p className={`text-base sm:text-lg font-medium leading-relaxed max-w-xl ${isRakhi || isDiwali ? "text-emerald-100" : "text-slate-600"}`}>
              Expert CBSE &amp; State Board Online Coaching for Classes 9–12. Learn Anytime, Anywhere with India&apos;s Top Faculty, Live Doubt Resolution, and Complete NCERT Notes.
            </p>

            {/* Key Benefit Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className={`flex items-center gap-2 text-xs font-bold ${isRakhi || isDiwali ? "text-slate-100" : "text-slate-700"}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% NCERT Syllabus</span>
              </div>
              <div className={`flex items-center gap-2 text-xs font-bold ${isRakhi || isDiwali ? "text-slate-100" : "text-slate-700"}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Hindi &amp; English Medium</span>
              </div>
              <div className={`flex items-center gap-2 text-xs font-bold ${isRakhi || isDiwali ? "text-slate-100" : "text-slate-700"}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Live + HD Recordings</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/courses"
                className={`px-8 py-4 rounded-2xl font-extrabold text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-105 ${
                  isRakhi
                    ? "bg-[#D97706] hover:bg-amber-600 text-white shadow-amber-950/30"
                    : "bg-[#050071] hover:bg-[#5751E1] text-white shadow-indigo-950/20"
                }`}
              >
                <span>Explore All Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/courses"
                className={`px-6 py-4 rounded-2xl font-bold text-sm border-2 flex items-center gap-2 transition-all hover:scale-105 ${
                  isRakhi
                    ? "bg-white/10 hover:bg-white/20 text-white border-amber-300/40"
                    : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200"
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isRakhi ? "Claim Rakhi 40% OFF" : "Claim 40% Festive Offer"}</span>
              </Link>
            </div>

            {/* Social Proof Bar */}
            <div className={`flex items-center gap-4 pt-4 border-t ${isRakhi || isDiwali ? "border-emerald-700/60 text-emerald-100" : "border-slate-200/60 text-slate-600"}`}>
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                  K
                </div>
                <div className="w-9 h-9 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                  P
                </div>
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                  A
                </div>
                <div className="w-9 h-9 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                  V
                </div>
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-1 text-amber-300">
                  {"★".repeat(5)}
                  <span className="font-bold ml-1">4.95 / 5.0</span>
                </div>
                <div>Trusted by <span className="font-bold underline decoration-amber-400">650+ Active Students</span></div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic Banner */}
          <div className="lg:col-span-5 relative">
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl border-4 p-6 sm:p-8 ${
              isRakhi
                ? "border-amber-400/50 bg-gradient-to-tr from-[#042F2E] via-[#0F766E] to-[#115E59] text-white"
                : "border-white bg-gradient-to-tr from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white"
            }`}>
              {/* Saffron & Green Accent Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl" />

              {/* Tag */}
              <div className="flex items-center justify-between mb-6">
                <div className="px-3 py-1 rounded-full bg-white/10 text-amber-300 font-bold text-xs border border-white/10 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Admissions Open 2026-27</span>
                </div>
                <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  CBSE / State Boards
                </span>
              </div>

              {/* Center Graphic Card */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                  <div className="text-xs font-bold text-amber-300">
                    {isRakhi ? "🪢 Rakshabandhan Special Batch" : "Featured Batch"}
                  </div>
                  <div className="text-xl font-black text-white">Class 10th &amp; 12th Board Booster</div>
                  <p className="text-xs text-slate-200">
                    Live lectures, complete handwritten notes, formula cheat-sheets, and 10 mock test papers.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-amber-300 font-black text-lg">₹1,499.00</span>
                    <span className="text-xs text-slate-300 line-through">₹2,499.00</span>
                  </div>
                </div>

                {/* Micro Stats in card */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xl font-black text-amber-300">100%</div>
                    <div className="text-[11px] text-slate-200">NCERT Coverage</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xl font-black text-emerald-300">40% OFF</div>
                    <div className="text-[11px] text-slate-200">Festive Code: RAKHI40</div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Instant Portal Access</span>
                </div>
                <Link
                  href="/courses"
                  className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  Join Batch <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
