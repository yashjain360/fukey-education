"use client";

import React from "react";
import { Users, GraduationCap, Video, Award } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function StatsBanner() {
  const stats = [
    {
      icon: GraduationCap,
      value: siteConfig.stats.activeStudents,
      label: "Active Students Enrolled",
      color: "text-blue-500",
      bg: "bg-blue-50",
      anim: "animate-icon-float",
    },
    {
      icon: Video,
      value: siteConfig.stats.totalCourses,
      label: "CBSE & State Board Batches",
      color: "text-orange-500",
      bg: "bg-orange-50",
      anim: "animate-icon-pulse",
    },
    {
      icon: Users,
      value: siteConfig.stats.expertInstructors,
      label: "Gold Medalist Instructors",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      anim: "animate-icon-wiggle",
    },
    {
      icon: Award,
      value: siteConfig.stats.successRate,
      label: "Board Exam Success Rate",
      color: "text-purple-500",
      bg: "bg-purple-50",
      anim: "animate-icon-sparkle",
    },
  ];

  return (
    <div className="bg-[#050071] text-white py-12 border-b border-indigo-900" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-indigo-900/60">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4 first:pt-0 md:first:pt-4 group"
                data-aos="zoom-in"
                data-aos-delay={idx * 120}
              >
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3 shadow-md transition-transform group-hover:scale-115`}>
                  <Icon className={`w-7 h-7 ${stat.anim}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-300 font-medium max-w-[160px]">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
