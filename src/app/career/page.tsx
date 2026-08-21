"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function CareerPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="rounded-3xl bg-[#050071] text-white p-8 sm:p-12 shadow-xl text-center">
          <span className="px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 font-extrabold text-xs uppercase tracking-wider border border-orange-400/30">
            Join Our Faculty
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-3">Teach With Fukey Education</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2 font-medium">
            Are you passionate about simplifying complex CBSE and State Board subjects for Class 9th to 12th students? Join India&apos;s fastest growing educational platform.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Current Openings</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-sm">Senior Physics Faculty (Hindi &amp; English)</div>
                <div className="text-xs text-slate-500">Full-Time / Part-Time • Remote Live Classes</div>
              </div>
              <a
                href={`mailto:${siteConfig.supportEmail}?subject=Application for Senior Physics Faculty`}
                className="px-4 py-2 rounded-xl bg-[#5751E1] text-white font-bold text-xs"
              >
                Apply Now
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-sm">Mathematics Content &amp; Test Series Lead</div>
                <div className="text-xs text-slate-500">Class 10 &amp; 12 CBSE Expert</div>
              </div>
              <a
                href={`mailto:${siteConfig.supportEmail}?subject=Application for Mathematics Lead`}
                className="px-4 py-2 rounded-xl bg-[#5751E1] text-white font-bold text-xs"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
