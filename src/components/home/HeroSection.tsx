"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Play } from "lucide-react";
import { triggerConfetti } from "@/lib/confetti";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-slate-50/80 pt-12 pb-20 border-b border-slate-100">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Online Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF2424] text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-red-500/20">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Live Online Coaching</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#06042E] tracking-tight leading-[1.1]">
              Classes For <br />
              <span className="bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] bg-clip-text text-transparent">
                Class 9th to 12th
              </span>{" "}
              Students.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              Expert CBSE &amp; State Board Online Coaching for Classes 9–12. Learn Anytime, Anywhere with India&apos;s Top Faculty, Live Doubt Resolution, and Complete NCERT Notes.
            </p>

            {/* Key Benefit Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% NCERT Syllabus</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Hindi &amp; English Medium</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Live + HD Recordings</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/courses"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] hover:brightness-110 text-white font-extrabold text-sm shadow-xl shadow-indigo-950/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Explore All Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={triggerConfetti}
                className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-slate-200 shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>View Special Admissions Offers</span>
              </button>
            </div>

            {/* Social Proof Bar */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-200/60 text-slate-600">
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
                <div className="flex items-center gap-1 text-amber-500">
                  {"★".repeat(5)}
                  <span className="font-bold text-slate-900 ml-1">4.95 / 5.0</span>
                </div>
                <div>Trusted by <span className="font-bold text-indigo-700">650+ Active Students</span></div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-tr from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-6 sm:p-8">
              {/* Tag */}
              <div className="flex items-center justify-between mb-6">
                <div className="px-3 py-1 rounded-full bg-white/10 text-orange-300 font-bold text-xs border border-white/10 flex items-center gap-1.5">
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
                  <div className="text-xs font-bold text-indigo-200">Featured Batch</div>
                  <div className="text-xl font-black text-white">Class 10th &amp; 12th Board Booster</div>
                  <p className="text-xs text-slate-300">
                    Live lectures, complete handwritten notes, formula cheat-sheets, and 10 mock test papers.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-emerald-400 font-black text-lg">₹1,499.00</span>
                    <span className="text-xs text-slate-400 line-through">₹2,499.00</span>
                  </div>
                </div>

                {/* Micro Stats in card */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xl font-black text-amber-300">100%</div>
                    <div className="text-[11px] text-slate-300">NCERT Coverage</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xl font-black text-emerald-300">Top Rank</div>
                    <div className="text-[11px] text-slate-300">Board Results</div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Instant Portal Access</span>
                </div>
                <Link
                  href="/courses"
                  className="text-xs font-bold text-orange-300 hover:text-white flex items-center gap-1 transition-colors"
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
