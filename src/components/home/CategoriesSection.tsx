"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Calculator, FlaskConical, TrendingUp, Compass, Languages, ArrowRight } from "lucide-react";

export default function CategoriesSection() {
  const categories = [
    {
      title: "Class 9th Foundation",
      desc: "Mathematics, Science & Social Science foundation builders for Class 9 students.",
      count: "12 Courses",
      icon: BookOpen,
      color: "from-blue-600 to-indigo-700",
      href: "/courses?class=Class+9"
    },
    {
      title: "Class 10th Board Target",
      desc: "Comprehensive CBSE Board exam preparation with complete NCERT & Exemplar solutions.",
      count: "14 Courses",
      icon: Calculator,
      color: "from-emerald-600 to-teal-700",
      href: "/courses?class=Class+10"
    },
    {
      title: "Class 11th Stream Special",
      desc: "Science (PCM/PCB), Commerce (Accounts/Economics), and Humanities core curricula.",
      count: "16 Courses",
      icon: FlaskConical,
      color: "from-purple-600 to-indigo-800",
      href: "/courses?class=Class+11"
    },
    {
      title: "Class 12th Board & Competitive",
      desc: "High-yield Physics, Chemistry, Maths, Biology, Economics & Accountancy board mastery.",
      count: "18 Courses",
      icon: TrendingUp,
      color: "from-rose-600 to-red-700",
      href: "/courses?class=Class+12"
    },
    {
      title: "Hindi Medium Batches",
      desc: "Dedicated Hindi medium coaching with bilingual clarity and Hindi terminology notes.",
      count: "24 Batches",
      icon: Languages,
      color: "from-amber-600 to-orange-700",
      href: "/courses?lang=Hindi"
    },
    {
      title: "English Medium Batches",
      desc: "100% English medium live lectures, answer-writing templates & mock tests.",
      count: "28 Batches",
      icon: Compass,
      color: "from-sky-600 to-blue-700",
      href: "/courses?lang=English"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-700 font-extrabold text-xs uppercase tracking-wider">
            Trending Categories
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Categories
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Check out our tailored learning categories designed to help every student excel in Class 9th to 12th.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={cat.href}
                className="p-6 rounded-3xl bg-white border border-slate-100 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                  <span>Explore Batches</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
