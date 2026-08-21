"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Gift, ArrowRight, Heart, Award, BookOpen, ShieldCheck } from "lucide-react";
import { useFestivalTheme } from "@/components/theme/FestivalThemeContext";
import { useCart } from "@/components/cart/CartContext";

export default function BlinkitFestiveHero() {
  const { activeFestival } = useFestivalTheme();
  const { applyCoupon } = useCart();

  if (activeFestival.id !== "rakshabandhan" && activeFestival.id !== "independence_day" && activeFestival.id !== "diwali") {
    return null;
  }

  const isRakhi = activeFestival.id === "rakshabandhan";

  const festiveTiles = isRakhi
    ? [
        {
          title: "Courses for Sister",
          subtitle: "Classes 9th–12th Masterclasses",
          tag: "Top Rated",
          href: "/courses?lang=English",
          icon: "🎓",
          bg: "bg-gradient-to-b from-[#FEF3C7] to-[#FDE68A]",
          textColor: "text-[#78350F]",
        },
        {
          title: "Courses for Brother",
          subtitle: "Board Target & Fast-Track",
          tag: "Bestseller",
          href: "/courses?lang=Hindi",
          icon: "📚",
          bg: "bg-gradient-to-b from-[#CCFBF1] to-[#99F6E4]",
          textColor: "text-[#115E59]",
        },
        {
          title: "Free NCERT & Notes",
          subtitle: "Color Formula Cheat-Sheets",
          tag: "100% Free",
          href: "/ebooks",
          icon: "📖",
          bg: "bg-gradient-to-b from-[#FCE7F3] to-[#FBCFE8]",
          textColor: "text-[#831843]",
        },
        {
          title: "1-on-1 Faculty Doubt Pass",
          subtitle: "Personal Mentor Support",
          tag: "Limited Seats",
          href: "/instructors",
          icon: "👨‍🏫",
          bg: "bg-gradient-to-b from-[#E0E7FF] to-[#C7D2FE]",
          textColor: "text-[#312E81]",
        },
      ]
    : [
        {
          title: "Class 10th Board Target",
          subtitle: "Maths & Science Full Syllabus",
          tag: "40% OFF",
          href: "/courses?class=Class+10",
          icon: "🎯",
          bg: "bg-gradient-to-b from-[#FFEDD5] to-[#FED7AA]",
          textColor: "text-[#7C2D12]",
        },
        {
          title: "Class 12th Board Target",
          subtitle: "Physics, Chemistry & Biology",
          tag: "Top Rated",
          href: "/courses?class=Class+12",
          icon: "🔬",
          bg: "bg-gradient-to-b from-[#DCFCE7] to-[#BBF7D0]",
          textColor: "text-[#14532D]",
        },
        {
          title: "Free NCERT eBooks",
          subtitle: "Derivation Handbooks",
          tag: "Free PDF",
          href: "/ebooks",
          icon: "📑",
          bg: "bg-gradient-to-b from-[#E0F2FE] to-[#BAE6FD]",
          textColor: "text-[#0C4A6E]",
        },
        {
          title: "Expert Faculty Directory",
          subtitle: "Gold Medalist Teachers",
          tag: "Verified",
          href: "/instructors",
          icon: "⭐",
          bg: "bg-gradient-to-b from-[#F3E8FF] to-[#E9D5FF]",
          textColor: "text-[#581C87]",
        },
      ];

  return (
    <div className="relative bg-gradient-to-b from-[#042F2E] via-[#0F766E] to-[#115E59] text-white pt-6 pb-12 overflow-hidden border-b-4 border-[#D97706]/40">
      {/* Decorative Scalloped Floral Toran Header (Blinkit style) */}
      <div className="absolute top-0 inset-x-0 h-3 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FDE047] via-[#D97706] to-transparent opacity-60" />

      {/* Background Decorative Floral / Mandala Watermark */}
      <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        {/* Top Powered / Festival Celebration Bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs border-b border-emerald-500/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#D97706] text-white font-extrabold text-[10px] tracking-wider uppercase shadow-xs">
              {activeFestival.badge}
            </span>
            <span className="text-emerald-100 font-semibold text-xs">
              {activeFestival.tagline}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-emerald-200">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Official CBSE Curriculum</span>
            </span>
            <span className="hidden sm:inline text-emerald-400">•</span>
            <span className="hidden sm:inline text-amber-300 font-bold">Use Coupon: RAKHI40</span>
          </div>
        </div>

        {/* Hero Festive Banner Card (Exact match to Blinkit Hero Card) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] text-slate-900 p-6 sm:p-8 shadow-2xl border-2 border-[#D97706]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-[11px] font-extrabold text-[#B45309] uppercase tracking-widest flex items-center justify-center md:justify-start gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Rakshabandhan Special Learning Celebration</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#78350F] tracking-tight">
              Gift Your Sibling the Gift of Board Exam Success
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 max-w-xl font-medium leading-relaxed">
              Celebrate the bond of love and protection with the gift that lasts a lifetime: high-yield live interactive coaching for Classes 9th to 12th at flat <span className="font-extrabold text-[#B45309]">40% OFF</span>.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link
                href="/courses"
                onClick={() => applyCoupon("RAKHI40")}
                className="px-6 py-3 rounded-2xl bg-[#0F766E] hover:bg-[#115E59] text-white font-extrabold text-xs shadow-lg shadow-teal-950/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Gift className="w-4 h-4 text-amber-300" />
                <span>Claim Rakhi 40% Off Offer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="text-xs font-bold text-[#92400E] bg-amber-100/80 px-3 py-2 rounded-xl border border-amber-300/60">
                Starts at just <span className="text-[#B45309] font-black text-sm">₹1,499</span> <span className="line-through text-slate-400 text-xs">₹2,499</span>
              </div>
            </div>
          </div>

          {/* Right Festive Rakhi Visual Graphic */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex-shrink-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#D97706] to-[#F59E0B] p-1 shadow-xl flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#FFFBEB] flex flex-col items-center justify-center text-center p-3">
                <span className="text-4xl sm:text-5xl mb-1">🪢</span>
                <span className="text-[10px] font-black text-[#B45309] uppercase tracking-wider">
                  Rakhi Utsav
                </span>
                <span className="text-[9px] font-extrabold text-emerald-800">
                  Special Pass
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Featured Gift Category Tiles (Matching Blinkit 4 Cards layout) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {festiveTiles.map((tile, idx) => (
            <Link
              key={idx}
              href={tile.href}
              className={`${tile.bg} p-4 sm:p-5 rounded-2xl shadow-md border border-amber-200/60 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                  {tile.icon}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/80 text-[10px] font-extrabold text-slate-800 shadow-xs">
                  {tile.tag}
                </span>
              </div>

              <div>
                <h3 className={`font-black text-xs sm:text-sm ${tile.textColor} line-clamp-1`}>
                  {tile.title}
                </h3>
                <p className="text-[11px] text-slate-600 font-medium line-clamp-1 mt-0.5">
                  {tile.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
