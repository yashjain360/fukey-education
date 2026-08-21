"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Award, Users, BookOpen, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Hero Section */}
        <div
          className="rounded-3xl bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-8 sm:p-14 shadow-xl relative overflow-hidden"
          data-aos="fade-down"
          data-aos-duration="750"
        >
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 font-extrabold text-xs uppercase tracking-wider border border-orange-400/30">
              Our Vision &amp; Mission
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Empowering India&apos;s Students to Score 95%+ in Board Examinations
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              Fukey Education was founded with a singular conviction: every student across CBSE and State Boards deserves access to master pedagogy, simplified formula memorization, and structured test preparation.
            </p>
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3 hover:shadow-lg transition-all"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#050071] flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">100% NCERT Framework</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every chapter lecture, exemplar breakdown, and practice sheet is directly synchronized with the official latest syllabus.
            </p>
          </div>

          <div
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3 hover:shadow-lg transition-all"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Mentorship By Top Faculty</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our educators are gold medalists and veteran teachers with over a decade of track records producing state and national toppers.
            </p>
          </div>

          <div
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3 hover:shadow-lg transition-all"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Interactive Doubt Resolution</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Live Q&amp;A sessions, one-on-one WhatsApp academic counselor support, and timed test series simulations.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6" data-aos="fade-right" data-aos-duration="800">
            <h2 className="text-3xl sm:text-4xl font-black text-[#050071] tracking-tight">
              Bridging Classroom Theory With Board Exam Success
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Based in India, Fukey Education connects students in Classes 9th, 10th, 11th, and 12th with structured Hindi and English medium online courses. We focus on simplifying the most difficult derivations, chemical reactions, mathematical equations, and economics curves.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Over 650+ Active Students currently enrolled</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Comprehensive test series with detailed answer analysis</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Instant access to digital formula notes &amp; PDF handbooks</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#050071] hover:bg-indigo-900 text-white font-bold text-xs shadow-md"
              >
                <span>Browse All Batches</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6" data-aos="fade-left" data-aos-duration="850">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-indigo-950 p-8 text-white space-y-6">
              <div className="text-2xl font-black">Our Commitment to Quality</div>
              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <p>
                  We believe no student should be left behind due to geographical constraints or lack of quality teachers in their local area.
                </p>
                <p>
                  With Fukey Education, every lecture is broadcasted in crystal-clear audio and video, accompanied by handwritten PDF notes written right after class.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-center">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-3xl font-black text-amber-300">52+</div>
                  <div className="text-[11px] text-slate-300">Active Batches</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-3xl font-black text-emerald-300">95%+</div>
                  <div className="text-[11px] text-slate-300">Target Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
