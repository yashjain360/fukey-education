"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  Award,
  BookOpen,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  Lock
} from "lucide-react";
import { MockTest, sampleTests } from "@/data/testsData";
import { useAuth } from "@/components/auth/AuthContext";
import Pagination from "@/components/ui/Pagination";

export default function TestSeriesCatalogPage() {
  const { user } = useAuth();
  const [tests, setTests] = useState<MockTest[]>(sampleTests);
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    if (user?.email) {
      fetch(`/api/enrollments?email=${encodeURIComponent(user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          const enrolledSlugs = data.enrollments && Array.isArray(data.enrollments)
            ? data.enrollments.map((e: any) => e.courseSlug).filter(Boolean).join(",")
            : "";

          fetch(`/api/tests${enrolledSlugs ? `?enrolledSlugs=${encodeURIComponent(enrolledSlugs)}` : ""}`)
            .then((res) => res.json())
            .then((testData) => {
              if (testData.tests && testData.tests.length > 0) setTests(testData.tests);
            })
            .catch(() => {});
        })
        .catch(() => {
          fetch("/api/tests")
            .then((res) => res.json())
            .then((data) => {
              if (data.tests && data.tests.length > 0) setTests(data.tests);
            })
            .catch(() => {});
        });
    } else {
      fetch("/api/tests")
        .then((res) => res.json())
        .then((data) => {
          if (data.tests && data.tests.length > 0) setTests(data.tests);
        })
        .catch(() => {});
    }
  }, [user?.email]);

  const filteredTests = useMemo(() => {
    return tests.filter((t) => {
      if (selectedClass !== "All" && t.class !== selectedClass) return false;
      if (selectedSubject !== "All" && t.subject !== selectedSubject) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [tests, selectedClass, selectedSubject, searchQuery]);

  const paginatedTests = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTests.slice(start, start + itemsPerPage);
  }, [filteredTests, currentPage, itemsPerPage]);

  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Banner */}
        <div
          className="rounded-3xl bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-6 sm:p-12 shadow-xl relative overflow-hidden"
          data-aos="fade-down"
          data-aos-duration="750"
        >
          <div className="relative z-10 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[11px] sm:text-xs uppercase tracking-wider border border-emerald-400/30 flex items-center gap-1.5 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Anti-Cheating Proctored Assessment Engine</span>
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              CBSE &amp; State Board Online Test Series
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Real examination simulations with fullscreen locking, tab-switch security detection, instant percentile ranking, and step-by-step NCERT derivations.
            </p>
          </div>
        </div>

        {/* Security Guard Guarantee Strip */}
        <div
          className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs"
          data-aos="fade-up"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900">Anti-Cheating Security Enforced</div>
              <div className="text-slate-500 text-[11px]">3-Strike Tab-Switch Detector • Fullscreen Lock • Copy-Paste Disabled</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900">Instant AI Report Card &amp; Percentile</div>
              <div className="text-slate-500 text-[11px]">Detailed faculty explanations &amp; NCERT chapter citations</div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
            {["All", "Class 9", "Class 10", "Class 11", "Class 12"].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedClass === cls
                    ? "bg-[#050071] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tests by topic..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Test Series Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTests.map((test, idx) => (
            <div
              key={test.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-indigo-300"
              data-aos="fade-up"
              data-aos-delay={(idx % 3) * 100}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                <img
                  src={test.thumbnail}
                  alt={test.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#050071] font-extrabold text-[10px] uppercase shadow-xs">
                  {test.pattern}
                </span>
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] uppercase shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Proctored</span>
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                    {test.class} • {test.subject}
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#5751E1] line-clamp-2 transition-colors">
                    {test.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                    {test.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs font-bold">
                  <div className="p-2 rounded-xl bg-slate-50">
                    <div className="text-slate-900 font-black flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-500" />
                      <span>{test.durationMinutes}m</span>
                    </div>
                    <div className="text-[10px] text-slate-400">Duration</div>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-50">
                    <div className="text-slate-900 font-black">{test.totalQuestions}</div>
                    <div className="text-[10px] text-slate-400">Questions</div>
                  </div>

                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
                    <div className="font-black">{test.totalMarks} Marks</div>
                    <div className="text-[10px]">Total Score</div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/test/${test.id}`}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] hover:brightness-110 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Secure Test Session</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredTests.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 100, behavior: "smooth" });
          }}
          onItemsPerPageChange={(size) => setItemsPerPage(size)}
          pageSizeOptions={[6, 12, 24]}
        />
      </div>
    </div>
  );
}
