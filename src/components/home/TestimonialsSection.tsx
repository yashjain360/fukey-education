"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Aman Sharma",
      class: "Class 10 CBSE (98.4%)",
      quote: "Pawan Gupta sir's Mathematics tricks and the NCERT Exemplar sessions made geometry and trigonometry my strongest subjects. Scored 99 in Maths!",
      rating: 5
    },
    {
      name: "Sneha Patel",
      class: "Class 12 CBSE Science (97.8%)",
      quote: "Kratika ma'am's organic chemistry roadmap notes and Vivek sir's physics derivation guides saved me during the last 2 months before board exams.",
      rating: 5
    },
    {
      name: "Rohan Verma",
      class: "Class 12 Commerce (96.2%)",
      quote: "The Hindi medium support was exceptional. Arya sir and Soumya ma'am explained accountancy balance sheets in crystal-clear logic.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs uppercase tracking-wider">
            Student Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Hear From Our Board Toppers
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Real feedback from students across India who transformed their marks with Fukey Education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-indigo-400 opacity-60" />
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">{r.name}</div>
                  <div className="text-[11px] text-emerald-600 font-bold">{r.class}</div>
                </div>
                <div className="flex text-amber-500">
                  {"★".repeat(r.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
