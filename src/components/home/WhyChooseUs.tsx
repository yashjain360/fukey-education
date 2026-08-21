"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Sparkles, Video, Users, BookOpen, Clock, ArrowRight } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      icon: Video,
      title: "Interactive Live Classes with Recording Access",
      desc: "Attend structured live sessions and re-watch high-definition recordings anytime for quick revision.",
    },
    {
      icon: Users,
      title: "24/7 Dedicated Doubt Clarification",
      desc: "Get doubts answered by faculty within minutes via live Q&A sessions and dedicated student portal groups.",
    },
    {
      icon: BookOpen,
      title: "Full NCERT Syllabus & Free Formula Handbooks",
      desc: "Download chapter-wise color notes, formula sheets, and 10-year previous board question banks.",
    },
    {
      icon: Clock,
      title: "Weekly Chapter Quizzes & Mock Test Series",
      desc: "Track exam readiness with timed mock tests modeled on the latest CBSE competency format.",
    },
  ];

  return (
    <section className="py-20 bg-[#050071] text-white overflow-hidden relative" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-6 space-y-6" data-aos="fade-right" data-aos-duration="800">
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-orange-500/20 text-orange-300 font-extrabold text-xs uppercase tracking-wider border border-orange-400/30">
              Why Fukey Education
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              India&apos;s Most Trusted Online Platform for Class 9th to 12th
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              We bridge classroom concepts with board-scoring strategies. Our curriculum simplifies tough formulas in Physics, Chemistry, Maths, and Commerce into easy-to-remember methods.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {points.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition-colors"
                    data-aos="zoom-in"
                    data-aos-delay={idx * 100}
                  >
                    <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-300 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-xs text-white leading-snug">{p.title}</div>
                    <div className="text-[11px] text-slate-300 leading-relaxed">{p.desc}</div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4" data-aos="fade-up" data-aos-delay="300">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#FF2424] hover:bg-red-700 text-white font-extrabold text-xs shadow-xl transition-all hover:scale-105"
              >
                <span>Start Learning Today</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column Visual Graphic */}
          <div className="lg:col-span-6" data-aos="fade-left" data-aos-duration="850">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#1C1A4A] to-[#2D1B69] border-4 border-white/10 p-8 shadow-2xl text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 mx-auto flex items-center justify-center text-3xl shadow-xl">
                🏆
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">Board Exam Results Guarantee</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Over 94.8% of students who completed our Class 10th and 12th test series scored above 90% marks in their board examinations.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-2xl font-black text-amber-300">95%+</div>
                  <div className="text-[10px] text-slate-300">Toppers Rate</div>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-2xl font-black text-emerald-300">100%</div>
                  <div className="text-[10px] text-slate-300">NCERT Solved</div>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-2xl font-black text-sky-300">24/7</div>
                  <div className="text-[10px] text-slate-300">Doubt Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
