"use client";

import React from "react";
import Link from "next/link";
import { Star, Award, GraduationCap, Users, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { instructorsData } from "@/data/instructorsData";

export default function InstructorsPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Banner */}
        <div
          className="rounded-3xl bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-8 sm:p-12 shadow-xl mb-12 relative overflow-hidden"
          data-aos="fade-down"
          data-aos-duration="750"
        >
          <div className="relative z-10 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 font-extrabold text-xs uppercase tracking-wider border border-orange-400/30">
              World Class Faculty
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Meet Our Expert Instructors
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Learn from India&apos;s most accomplished subject matter experts, gold medalists, and seasoned educators who have mentored thousands of board exam toppers.
            </p>
          </div>
        </div>

        {/* Faculty Grid with Real Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {instructorsData.map((inst, idx) => (
            <div
              key={inst.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
              data-aos="fade-up"
              data-aos-delay={(idx % 4) * 100}
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-indigo-100 flex-shrink-0 shadow-md bg-indigo-50">
                    <img
                      src={inst.photo || inst.image || "/images/instructors/kratika-rathore.webp"}
                      alt={inst.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl font-extrabold text-slate-900">{inst.name}</h2>
                    <div className="text-xs font-bold text-[#5751E1]">{inst.role}</div>
                    <div className="text-xs text-slate-500">{inst.qualification} • {inst.experience}</div>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs pt-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{inst.rating}</span>
                      <span className="text-slate-400">({inst.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {inst.bio}
                </p>

                {/* Specialties */}
                <div>
                  <div className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wider">
                    Core Specializations
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {inst.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Achievements */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100/80 space-y-1 text-xs text-indigo-950 font-medium">
                  {inst.achievements.map((ach, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#5751E1] flex-shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  {inst.coursesCount} Active Batches
                </span>
                <Link
                  href={`/courses`}
                  className="px-5 py-2.5 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Batches</span>
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
