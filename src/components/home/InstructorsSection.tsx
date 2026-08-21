"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star, Award, GraduationCap, CheckCircle2 } from "lucide-react";
import { instructorsData } from "@/data/instructorsData";

export default function InstructorsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-indigo-50/40 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-indigo-100 text-[#5751E1] font-extrabold text-xs uppercase tracking-wider">
              Skilled Introduce
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#050071] tracking-tight leading-tight">
              Our Top Class &amp; Expert Instructors In One Place
            </h2>

            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Combines the ideas of empowered learning and top-tier instruction for students. Emphasizes both instructor expertise, proven track records of producing board toppers, and personalized student mentoring.
            </p>

            <div className="space-y-2.5 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>M.Sc. &amp; Gold Medalist Subject Matter Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>10+ Years of CBSE &amp; State Board Pedagogy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dedicated 1-on-1 Doubt Solving Mentorship</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/instructors"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#5751E1] hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xl shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all"
              >
                <span>See All Instructors</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Instructor Circles Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {instructorsData.slice(0, 4).map((inst, idx) => (
                <Link
                  key={inst.id}
                  href={`/instructors`}
                  className="p-5 rounded-3xl bg-white border border-slate-100 hover:border-indigo-300 shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-4 group"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#050071] via-[#5751E1] to-[#FF6B00] p-0.5 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-indigo-50 rounded-full flex items-center justify-center font-black text-lg text-indigo-700">
                      {inst.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-[#5751E1] transition-colors truncate">
                      {inst.name}
                    </h3>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {inst.role}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-[11px]">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{inst.rating}</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 font-medium">{inst.studentsCount}+ students</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
