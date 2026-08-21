"use client";

import React from "react";
import Link from "next/link";
import { Bell, Calendar, ArrowRight, Sparkles, ExternalLink, ShieldCheck } from "lucide-react";
import { blogsData } from "@/data/blogsData";

export default function NewsPage() {
  const newsItems = [
    {
      id: "news-1",
      title: "CBSE Rationalized Syllabus & 50% Competency Exam Pattern 2026-27 Announced",
      badge: "CBSE Official Alert",
      date: "21 Aug 2026",
      desc: "Central Board confirms critical changes to Class 10 & 12 question papers focusing on application-based case studies.",
      href: "/courses",
    },
    {
      id: "news-2",
      title: "Reserve Bank of India Testing New Polymer Banknotes (Rs 10 & 20)",
      badge: "Current Affairs & Economics",
      date: "19 Aug 2026",
      desc: "Special analysis for Class 11 and 12 Commerce students studying Indian Economic Development and Money & Banking.",
      href: "/blog",
    },
    {
      id: "news-3",
      title: "Re-NEET UG 2026 Revised Cutoffs & Centralized Medical Counselling Schedule",
      badge: "Medical & Science Alert",
      date: "17 Aug 2026",
      desc: "Comprehensive guidance handbook for Class 12 Biology and NEET aspirants detailing state-wise quota seat allocations.",
      href: "/blog",
    },
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Banner */}
        <div
          className="rounded-3xl bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-8 sm:p-12 shadow-xl relative overflow-hidden"
          data-aos="fade-down"
          data-aos-duration="750"
        >
          <div className="relative z-10 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 font-extrabold text-xs uppercase tracking-wider border border-orange-400/30">
              Live Academic Feed
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Academic News &amp; Circulars
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Real-time circulars from CBSE, State Education Boards, National Testing Agency, and official ministry notices.
            </p>
          </div>
        </div>

        {/* Live News Bulletins */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#5751E1] font-bold text-[10px] uppercase">
                    {item.badge}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">{item.date}</span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Notice</span>
                </span>
                <Link
                  href={item.href}
                  className="text-xs font-bold text-[#5751E1] hover:underline flex items-center gap-1"
                >
                  <span>Read Notice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
