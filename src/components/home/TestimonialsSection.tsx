"use client";

import React, { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonialsData } from "@/data/testimonialsData";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="py-20 bg-white border-t border-slate-100" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3" data-aos="fade-up">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-indigo-100 text-[#5751E1] font-extrabold text-xs uppercase tracking-wider">
            Student Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#050071] tracking-tight">
            What Our Students &amp; Parents Say
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Real feedback from students who achieved top scores in CBSE and State Board exams
          </p>
        </div>

        {/* Testimonial Card Slider */}
        <div className="max-w-3xl mx-auto" data-aos="zoom-in" data-aos-duration="800">
          <div className="bg-gradient-to-br from-indigo-50/80 via-white to-slate-50 rounded-3xl p-8 sm:p-12 border border-indigo-100 shadow-xl relative">
            <Quote className="w-12 h-12 text-[#5751E1]/20 absolute top-6 right-6" />

            <div className="space-y-6">
              {/* Rating stars */}
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed italic">
                &ldquo;{current.content}&rdquo;
              </p>

              {/* Author info */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/80">
                <div>
                  <div className="font-extrabold text-slate-900 text-base">{current.name}</div>
                  <div className="text-xs font-bold text-[#5751E1]">{current.role}</div>
                </div>

                {/* Slider controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-full bg-white hover:bg-[#5751E1] hover:text-white text-slate-700 border border-slate-200 shadow-xs transition-colors"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-white hover:bg-[#5751E1] hover:text-white text-slate-700 border border-slate-200 shadow-xs transition-colors"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
