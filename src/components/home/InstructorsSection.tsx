"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { instructorsData } from "@/data/instructorsData";

export default function InstructorsSection() {
  return (
    <section className="py-20 bg-white" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3" data-aos="fade-up">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-indigo-100 text-[#5751E1] font-extrabold text-xs uppercase tracking-wider">
            Faculty Directory
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#050071] tracking-tight">
            Learn From Expert Subject Specialists
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Dedicated educators with 10+ years experience mentoring board toppers
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructorsData.slice(0, 4).map((inst, idx) => (
            <div
              key={inst.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              data-aos="fade-up"
              data-aos-delay={idx * 120}
            >
              {/* Photo */}
              <div className="relative aspect-square bg-slate-100 overflow-hidden">
                <img
                  src={inst.photo || inst.image || "/images/instructors/kratika-rathore.webp"}
                  alt={inst.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white font-extrabold text-[10px] uppercase tracking-wider">
                    {inst.department || inst.role.split(" ")[0]}
                  </span>
                </div>
              </div>

              {/* Bio Details */}
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#5751E1] transition-colors">
                    {inst.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                    {inst.designation || inst.role}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{inst.rating}</span>
                  </div>
                  <div className="text-slate-500 font-semibold">
                    {inst.coursesCount} Active Batches
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="200">
          <Link
            href="/instructors"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#050071] hover:bg-indigo-900 text-white text-xs font-extrabold shadow-md"
          >
            <span>View All 8 Faculty Educators</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
