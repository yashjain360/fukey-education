"use client";

import React from "react";
import Link from "next/link";
import { Bell, Calendar, ArrowRight, FileText, CheckCircle2, ShieldCheck } from "lucide-react";

export default function NewsPage() {
  const newsItems = [
    {
      id: "news-1",
      title: "RBI to Test New Plastic Money: Rs 10 and Rs 20 Notes",
      category: "National Economy & Current Affairs",
      date: "August 2026",
      source: "Official Central Bank Update",
      summary: "Reserve Bank of India announces trial run for polymer banknotes designed for enhanced longevity and security across select metro zones.",
      link: "/blog/how-to-study-for-board-exams-the-complete-guide"
    },
    {
      id: "news-2",
      title: "Uniform Civil Code in India 2026: Four Key States Moving Forward",
      category: "Constitutional & Civic Studies",
      date: "August 2026",
      source: "Legal Policy Watch",
      summary: "Comprehensive legislative review of UCC draft guidelines implemented in state assemblies; crucial topic for Class 10th & 12th Political Science students.",
      link: "/blog/class-9-social-science-new-ncert-syllabus-2026"
    },
    {
      id: "news-3",
      title: "Re-NEET UG 2026 Result Declared: Scorecard and Counselling Details",
      category: "Medical & Science Entrance",
      date: "August 2026",
      source: "National Testing Agency Circular",
      summary: "NTA publishes revised percentile rankings and announces centralized counselling dates for medical admissions across government colleges.",
      link: "/blog/neet-ug-2026-counselling-complete-guide"
    },
    {
      id: "news-4",
      title: "CBSE Rationalized Curriculum for 2026-27 Academic Session",
      category: "Board Circular",
      date: "August 2026",
      source: "CBSE Academic Branch",
      summary: "Detailed chapter-wise marks distribution released for Class 10th and 12th board exams with 50% competency-based question format.",
      link: "/courses"
    }
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-8 sm:p-12 shadow-xl mb-12 relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 font-extrabold text-xs uppercase tracking-wider border border-orange-400/30">
              Official Bulletins &amp; Circulars
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Academic News &amp; Circulars
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Stay ahead with verified notifications regarding CBSE date sheets, entrance exam schedules, and national academic policy changes.
            </p>
          </div>
        </div>

        {/* News List */}
        <div className="space-y-6">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-[#5751E1] font-bold text-[10px]">
                    {item.category}
                  </span>
                  <span className="text-slate-400">{item.date}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-semibold">{item.source}</span>
                </div>

                <h2 className="text-lg font-black text-slate-900 leading-snug">
                  {item.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="flex-shrink-0">
                <Link
                  href={item.link}
                  className="px-5 py-2.5 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
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
