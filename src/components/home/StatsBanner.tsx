"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";

export default function StatsBanner() {
  const stats = [
    { value: siteConfig.stats.activeStudents, label: "Active Students" },
    { value: siteConfig.stats.facultyCourses, label: "Faculty Courses" },
    { value: siteConfig.stats.bestProfessors, label: "Best Professors" },
    { value: siteConfig.stats.awardsAchieved, label: "Award Achieved" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
      <div className="rounded-3xl bg-[#1C1A4A] text-white p-8 shadow-2xl border border-indigo-900/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-indigo-900">
          {stats.map((st, idx) => (
            <div key={idx} className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-1 bg-gradient-to-r from-white via-indigo-100 to-orange-200 bg-clip-text text-transparent">
                {st.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wide">
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
