"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Atom, Calculator, Briefcase, Award } from "lucide-react";
import { categoriesData } from "@/data/categoriesData";
import { useTranslation } from "@/components/providers/LanguageContext";

export default function CategoriesSection() {
  const { t } = useTranslation();

  const iconMap: Record<string, any> = {
    calculator: { icon: Calculator, anim: "animate-icon-pulse" },
    atom: { icon: Atom, anim: "animate-icon-spin-slow" },
    book: { icon: BookOpen, anim: "animate-icon-float" },
    briefcase: { icon: Briefcase, anim: "animate-icon-wiggle" },
    award: { icon: Award, anim: "animate-icon-sparkle" },
  };

  return (
    <section className="py-20 bg-slate-50/60" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4" data-aos="fade-up">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-orange-100 text-[#FF2424] font-extrabold text-xs uppercase tracking-wider">
              {t("cat.tag", "Explore Academic Streams")}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#050071] tracking-tight">
              {t("cat.title", "Top Categories & Board Classes")}
            </h2>
            <p className="text-sm text-slate-500 font-medium max-w-lg">
              {t("cat.desc", "Structured CBSE & State Board curriculums mapped to standard NCERT textbooks.")}
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#5751E1] hover:text-[#050071] transition-all hover:scale-105 active:scale-95 self-start md:self-auto"
          >
            <span>{t("cat.browse_all", "Browse All Batches")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesData.map((cat, idx) => {
            const mapped = iconMap[cat.icon] || { icon: BookOpen, anim: "animate-icon-float" };
            const Icon = mapped.icon;

            return (
              <Link
                key={cat.id}
                href={`/courses?class=${encodeURIComponent(cat.title)}`}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group hover:scale-102 active:scale-98"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#5751E1] group-hover:bg-[#5751E1] group-hover:text-white transition-colors flex items-center justify-center">
                    <Icon className={`w-7 h-7 ${mapped.anim}`} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-[#5751E1] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-400">{cat.coursesCount} {t("cat.active_batches", "Active Batches")}</span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#FF2424] group-hover:text-white flex items-center justify-center text-slate-600 transition-all group-hover:scale-110">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
