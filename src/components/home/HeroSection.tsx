"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { triggerConfetti } from "@/lib/confetti";
import { useTranslation } from "@/components/providers/LanguageContext";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/40 via-white to-indigo-50/30 pt-10 pb-20 border-b border-slate-100">
      {/* Decorative Tricolor Gradient Waves */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gradient-to-br from-orange-200/40 via-white to-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Tricolor top micro-bar */}
      <div className="absolute top-0 left-0 right-0 h-1 tricolor-ribbon" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6" data-aos="fade-right" data-aos-duration="800">
            {/* Live Online Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF2424] text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-red-500/20 animate-pulse"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>{t("hero.badge")}</span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#06042E] tracking-tight leading-[1.1]"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              {t("hero.title_part1")} <br />
              <span className="bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] bg-clip-text text-transparent">
                {t("hero.title_part2")}
              </span>{" "}
              {t("hero.title_part3")}
            </h1>

            {/* Subheading */}
            <p
              className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {t("hero.desc")}
            </p>

            {/* Key Benefit Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2" data-aos="fade-up" data-aos-delay="250">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 animate-icon-pulse" />
                <span>{t("hero.feature_live")}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 animate-icon-pulse" />
                <span>{t("hero.feature_doubt")}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 animate-icon-pulse" />
                <span>{t("hero.feature_ncert")}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className="flex flex-wrap items-center gap-4 pt-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Link
                href="/courses"
                className="px-8 py-4 rounded-2xl bg-[#050071] hover:bg-[#5751E1] text-white font-extrabold text-sm shadow-xl shadow-indigo-950/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group cursor-pointer"
              >
                <span>{t("hero.btn_courses")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => {
                  triggerConfetti();
                  const target = document.getElementById("featured-courses");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF2424] to-red-700 text-white font-extrabold text-sm shadow-lg shadow-red-950/20 hover:brightness-110 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-yellow-300 animate-icon-sparkle" />
                <span>{t("hero.btn_sale")}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive 3D Batch Card */}
          <div className="lg:col-span-5 relative" data-aos="fade-left" data-aos-duration="850">
            <div className="relative z-10 rounded-3xl overflow-hidden bg-gradient-to-br from-[#050071] via-[#1C1A4A] to-[#2D1B69] text-white p-6 sm:p-8 shadow-2xl border border-indigo-500/20 space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{t("hero.card_live")}</span>
                </span>
                <span className="text-xs font-bold text-orange-300">Class 10th &amp; 12th Target Batch</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black leading-tight text-white">
                  {t("hero.card_course")}
                </h3>
                <p className="text-xs text-indigo-200">
                  {t("hero.card_faculty")}
                </p>
              </div>

              {/* Classroom Progress Card */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Live Attendance Capacity</span>
                  <span className="text-emerald-400">94% Full</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                  <div className="w-[94%] h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full" />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-300 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified NCERT Curriculum</span>
                </div>
                <span className="font-bold text-white">{t("hero.card_enrolled")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
