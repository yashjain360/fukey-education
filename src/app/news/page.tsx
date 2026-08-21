"use client";

import React from "react";
import Link from "next/link";
import { Bell, Calendar, ChevronRight, Sparkles } from "lucide-react";

export default function NewsPage() {
  const newsItems = [
    {
      title: "CBSE Announces Updated Sample Papers for Board Exam 2026-27",
      date: "August 19, 2026",
      tag: "CBSE Official",
      desc: "Central Board of Secondary Education has released official subject-wise model question papers emphasizing competency-based questions."
    },
    {
      title: "Fukey Education Launches Freedom Sale 40% Off on All Batches",
      date: "August 15, 2026",
      tag: "Special Offer",
      desc: "Avail 40% instant reduction on all live coaching batches for Classes 9th to 12th using coupon code FREEDOM40."
    },
    {
      title: "Free All-India Sunday Mock Test Series for Class 10 & 12",
      date: "August 10, 2026",
      tag: "Mock Test",
      desc: "Participate in simulated online test series and get detailed ranking, analytics, and 1-on-1 mentor guidance."
    }
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="rounded-3xl bg-[#050071] text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 font-extrabold text-xs uppercase tracking-wider">
            Notices &amp; Announcements
          </span>
          <h1 className="text-3xl font-black mt-2">Academic News &amp; Circulars</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Stay updated with the latest circulars from CBSE, State Boards, and Fukey Education.
          </p>
        </div>

        <div className="space-y-4">
          {newsItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-[#5751E1] font-bold">
                  {item.tag}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900">{item.title}</h2>
              <p className="text-xs text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
