"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useFestivalTheme } from "@/components/theme/FestivalThemeContext";

export default function FestivePicksSection() {
  const { activeFestival } = useFestivalTheme();

  const picks = [
    {
      name: "Class 10 All-in-One",
      sub: "Maths + Science + SST",
      icon: "📦",
      href: "/courses?class=Class+10",
      badge: "Festive Pack",
    },
    {
      name: "Class 12 Science",
      sub: "Physics, Chem & Bio",
      icon: "🔬",
      href: "/courses?class=Class+12",
      badge: "Target 95%+",
    },
    {
      name: "Commerce Sibling Pass",
      sub: "Accounts & Economics",
      icon: "📊",
      href: "/courses?class=Class+11",
      badge: "Dual Pass",
    },
    {
      name: "Fast Track Formula Notes",
      sub: "Free PDF Downloads",
      icon: "📑",
      href: "/ebooks",
      badge: "100% Free",
    },
    {
      name: "Hindi Medium Batches",
      sub: "Complete State Board",
      icon: "🇮🇳",
      href: "/courses?lang=Hindi",
      badge: "Hindi Special",
    },
    {
      name: "Olympiad Foundation",
      sub: "Class 9th Masterclass",
      icon: "🏆",
      href: "/courses?class=Class+9",
      badge: "Foundation",
    },
  ];

  return (
    <section className="py-12 bg-amber-50/40 border-b border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#B45309] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Festive Picks &amp; Gift Bundles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Curated Batches for the Season
            </h2>
          </div>

          <Link
            href="/courses"
            className="text-xs font-bold text-[#0F766E] hover:text-[#115E59] flex items-center gap-1 hover:underline"
          >
            <span>See All Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Circular / Card Carousel Grid matching Blinkit Festive Picks */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {picks.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="bg-white rounded-3xl p-4 text-center border border-amber-200/70 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-between space-y-3 group"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-100 to-amber-200 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-xs group-hover:scale-105 transition-transform">
                {item.icon}
              </div>

              <div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-amber-100/80 text-[#B45309] text-[9px] font-black uppercase mb-1">
                  {item.badge}
                </span>
                <h3 className="font-extrabold text-xs text-slate-900 group-hover:text-[#0F766E] transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {item.sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
