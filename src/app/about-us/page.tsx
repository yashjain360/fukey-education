"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ShieldCheck, Target, Heart, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function AboutUsPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-8 sm:p-14 shadow-xl relative overflow-hidden text-center max-w-4xl mx-auto">
          <div className="relative z-10 space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 font-extrabold text-xs uppercase tracking-wider border border-orange-400/30">
              Our Vision &amp; Heritage
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Democratizing High-Quality Education for Every Indian Student
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
              Fukey Education was built to bridge the educational divide by delivering top-tier online live coaching, bilingual instruction, and comprehensive NCERT mastery for Classes 9th to 12th at affordable rates.
            </p>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-[#5751E1] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To empower every student in Class 9-12 with deep conceptual understanding, high-scoring exam techniques, and continuous faculty mentorship regardless of their geographical location.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">100% Quality Invariant</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every course module strictly adheres to the newest NCERT &amp; CBSE frameworks. We ensure 24/7 doubt resolution, comprehensive handwritten notes, and verified assessments.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Bilingual Empathy</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We proudly celebrate India&apos;s linguistic diversity by providing dedicated Hindi and English medium coaching batches, ensuring zero student is left behind due to language barriers.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="bg-[#1C1A4A] rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-indigo-900">
            <div>
              <div className="text-4xl font-black text-white">{siteConfig.stats.activeStudents}</div>
              <div className="text-xs text-slate-300 mt-1 font-semibold">Active Students</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-4xl font-black text-amber-300">{siteConfig.stats.facultyCourses}</div>
              <div className="text-xs text-slate-300 mt-1 font-semibold">Faculty Courses</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-4xl font-black text-emerald-300">{siteConfig.stats.bestProfessors}</div>
              <div className="text-xs text-slate-300 mt-1 font-semibold">Gold Medalist Faculty</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-4xl font-black text-pink-300">{siteConfig.stats.awardsAchieved}</div>
              <div className="text-xs text-slate-300 mt-1 font-semibold">Excellence Awards</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
