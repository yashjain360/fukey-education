"use client";

import React from "react";
import { Video, FileText, CheckCircle, Clock, Smartphone, Award } from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    {
      title: "Interactive Live Classes",
      desc: "Two-way live interactive lectures where students can ask questions via mic and chat instantly.",
      icon: Video,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "HD Recording Backups",
      desc: "Never miss a concept with lifetime unlimited access to 1080p recorded lectures of every class.",
      icon: Clock,
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      title: "Handwritten Color Notes",
      desc: "Concise, high-yield chapter summaries, formula sheets, and solved NCERT questions in downloadable PDF.",
      icon: FileText,
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      title: "Weekly Mock Test Series",
      desc: "Strictly timed CBSE pattern test papers with instant grading and detailed answer explanation keys.",
      icon: Award,
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Bilingual Pedagogy",
      desc: "Clear explanations in both Hindi and English ensuring zero language barriers for any student.",
      icon: CheckCircle,
      color: "bg-amber-100 text-amber-700"
    },
    {
      title: "Mobile & Web Access",
      desc: "Seamless learning on any smartphone, tablet, laptop, or smart TV with offline downloading.",
      icon: Smartphone,
      color: "bg-pink-100 text-pink-700"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs uppercase tracking-wider">
            The Fukey Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Top Students Choose Fukey Education
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Designed from the ground up to give CBSE and State Board students an unfair advantage in exam prep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50/70 border border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${b.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
