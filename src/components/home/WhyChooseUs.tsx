"use client";

import React from "react";
import { Video, Clock, Award, FileText, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/components/providers/LanguageContext";

export default function WhyChooseUs() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Video,
      title: t("why.usp1_title", "Interactive Live Classes"),
      description: t("why.usp1_desc", "Step-by-step whiteboard derivations and problem-solving without pre-recorded video dumping."),
      color: "bg-blue-50 text-[#3B82F6]",
      anim: "animate-icon-float",
    },
    {
      icon: Clock,
      title: t("why.usp2_title", "15-Min Dedicated Doubt Rooms"),
      description: t("why.usp2_desc", "Ask your faculty questions directly via live voice and chat at the end of every lecture."),
      color: "bg-orange-50 text-[#FF6B00]",
      anim: "animate-icon-wiggle",
    },
    {
      icon: Award,
      title: t("why.usp3_title", "Gold Medalist Educators"),
      description: t("why.usp3_desc", "Learn from educators with 10+ years of proven track records producing state and district toppers."),
      color: "bg-emerald-50 text-[#10B981]",
      anim: "animate-icon-sparkle",
    },
    {
      icon: FileText,
      title: t("why.usp4_title", "Handwritten Formula PDFs"),
      description: t("why.usp4_desc", "Get chapter-wise formula summaries and solved past 10-year board questions for quick revision."),
      color: "bg-purple-50 text-[#A855F7]",
      anim: "animate-icon-pulse",
    },
  ];

  return (
    <section className="py-20 bg-slate-50/70 border-y border-slate-200/80" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Trophy Illustration & Badge */}
          <div className="lg:col-span-5 relative" data-aos="fade-right" data-aos-duration="800">
            <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-tr from-[#050071] via-[#1C1A4A] to-[#5751E1] p-8 text-white space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Award className="w-9 h-9 animate-icon-sparkle" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                  Fukey Excellence Guarantee
                </span>
                <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                  98.6% Student Success in CBSE &amp; State Boards
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our structured approach ensures every student masters key derivation formulas and scores in top percentiles.
                </p>
              </div>

              <div className="pt-4 border-t border-white/15 grid grid-cols-2 gap-4 text-xs font-bold">
                <div>
                  <div className="text-2xl font-black text-amber-300">650+</div>
                  <div className="text-slate-300 text-[11px]">Enrolled Aspirants</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-300">100%</div>
                  <div className="text-slate-300 text-[11px]">Live Interactivity</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Features Grid */}
          <div className="lg:col-span-7 space-y-8" data-aos="fade-left" data-aos-duration="850">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-indigo-100 text-[#5751E1] font-extrabold text-xs uppercase tracking-wider">
                {t("why.tag", "Why Fukey Education")}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#050071] tracking-tight">
                {t("why.title", "The Smarter Way to Prepare for Board Exams")}
              </h2>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                {t("why.desc", "We combine experienced subject leads with interactive pen-tablet whiteboards and comprehensive study materials.")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3 group hover:border-indigo-200"
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                  >
                    <div className={`w-12 h-12 rounded-2xl ${feat.color} flex items-center justify-center shadow-xs transition-transform group-hover:scale-110`}>
                      <Icon className={`w-6 h-6 ${feat.anim}`} />
                    </div>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-[#5751E1] transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
