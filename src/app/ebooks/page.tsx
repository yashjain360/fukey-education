"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Download, Star, CheckCircle2, FileText, Search, Sparkles } from "lucide-react";
import { ebooksData, EBook } from "@/data/ebooksData";
import { useModal } from "@/components/ui/CustomModal";

export default function EbooksPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { openModal } = useModal();

  const categories = ["All", "Science", "Mathematics", "Commerce", "Humanities"];

  const handleDownload = (eb: EBook) => {
    openModal({
      type: "download",
      title: `Download ${eb.title}`,
      subtitle: `${eb.class} • ${eb.subject} (${eb.fileSize})`,
    });
  };

  const filteredEbooks = ebooksData.filter((eb) => {
    if (selectedCategory !== "All" && !eb.class.includes(selectedCategory) && !eb.subject.includes(selectedCategory)) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        eb.title.toLowerCase().includes(q) ||
        eb.subject.toLowerCase().includes(q) ||
        eb.author.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-8 sm:p-12 shadow-xl mb-12 relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 font-extrabold text-xs uppercase tracking-wider border border-orange-400/30">
              Free NCERT &amp; Exam Preparation
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Study eBooks &amp; Formula Banks
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Download curated chapter-wise revision notes, mind maps, formula handbooks, and previous 10 years solved board question papers for Classes 9th to 12th.
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#5751E1] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, formulas, NCERT..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* eBooks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEbooks.map((eb) => (
            <div
              key={eb.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-indigo-50 text-[#5751E1] font-extrabold text-[11px]">
                    {eb.class}
                  </span>
                  <span className="text-xs font-bold text-slate-400">{eb.fileSize}</span>
                </div>

                <h2 className="text-base font-extrabold text-slate-900 line-clamp-2">
                  {eb.title}
                </h2>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {eb.description}
                </p>

                <div className="text-[11px] text-slate-600 space-y-1">
                  <div>Author: <span className="font-semibold text-slate-800">{eb.author}</span></div>
                  <div>Pages: <span className="font-semibold text-slate-800">{eb.pages} Pages</span></div>
                  <div>Downloads: <span className="font-semibold text-slate-800">{eb.downloadsCount.toLocaleString()}+</span></div>
                </div>
              </div>

              <button
                onClick={() => handleDownload(eb)}
                className="w-full py-3 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Free PDF</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
