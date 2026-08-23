"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, ThumbsUp, Sparkles, ExternalLink } from "lucide-react";
import { googleReviewsData } from "@/data/testimonialsData";
import { siteConfig } from "@/data/siteConfig";
import { useTranslation } from "@/components/providers/LanguageContext";

export default function TestimonialsSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All Reviews");
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});
  const { t } = useTranslation();

  const filters = [
    { label: t("courses.all", "All Reviews"), value: "All Reviews" },
    { label: "Class 10 CBSE", value: "Class 10 CBSE" },
    { label: "Class 12 Boards", value: "Class 12 Boards" },
    { label: "Class 9 & 11", value: "Class 9 & 11" },
    { label: "Parents", value: "Parents" },
  ];

  const filteredReviews = googleReviewsData.filter((r) => {
    if (selectedFilter === "All Reviews") return true;
    return r.classCategory === selectedFilter;
  });

  const handleLike = (id: string) => {
    setHelpfulMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section className="py-14 sm:py-20 bg-slate-50/70 border-t border-slate-200/80" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        {/* Section Header & Google Badge Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6" data-aos="fade-up">
          <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-extrabold text-[11px] sm:text-xs">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{t("reviews.tag", "Google & Justdial Verified Reviews")}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#050071] tracking-tight">
              {t("reviews.title", "Real Experiences From Board Toppers & Parents")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              {t("reviews.desc", "Read transparent feedback from students and parents across Madhya Pradesh and CBSE schools experiencing our 100% live interactive methodology.")}
            </p>
          </div>

          {/* Overall Rating Scorecard */}
          <div
            className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-md flex items-center gap-4 sm:gap-5 flex-shrink-0"
            data-aos="zoom-in"
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 leading-none">5.0</div>
              <div className="flex items-center gap-0.5 justify-center mt-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current animate-icon-sparkle" />
                ))}
              </div>
              <div className="text-[10px] text-slate-400 font-bold mt-1">{t("reviews.ratings_count", "21+ Verified Ratings")}</div>
            </div>

            <div className="h-10 sm:h-12 w-px bg-slate-200" />

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{t("reviews.recommended", "100% Recommended")}</span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500">Live Doubt Clearing Quality</div>
              <a
                href={siteConfig.socials.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] sm:text-[11px] font-bold text-[#5751E1] hover:underline inline-flex items-center gap-1"
              >
                <span>{t("reviews.write", "Write a Review")}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 px-1 sm:px-0" data-aos="fade-up">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setSelectedFilter(f.value)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                selectedFilter === f.value
                  ? "bg-[#050071] text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Google Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((item, idx) => {
            const addedLikes = helpfulMap[item.id] || 0;
            const totalHelpful = item.helpfulCount + addedLikes;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
                data-aos="fade-up"
                data-aos-delay={(idx % 3) * 100}
              >
                <div className="space-y-3">
                  {/* Top Reviewer Info & Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl ${item.avatarColor} text-white font-black text-sm flex items-center justify-center shadow-md flex-shrink-0`}>
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                          <span>{item.name}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-50" />
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">{item.role}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Score Highlight Pill if available */}
                  {item.score && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-extrabold text-[10px] border border-emerald-200">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>{item.score}</span>
                    </div>
                  )}

                  {/* Review Content */}
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                {/* Footer Review Meta & Helpful Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-500">
                    <svg className="w-3 h-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>{item.source} • {item.date}</span>
                  </div>

                  <button
                    onClick={() => handleLike(item.id)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-[#5751E1] text-slate-500 font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    title="Mark review as helpful"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{totalHelpful}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
