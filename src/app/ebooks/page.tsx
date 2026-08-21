"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Download, BookOpen, Search, Star, CheckCircle2 } from "lucide-react";
import { ebooksData, Ebook } from "@/data/ebooksData";
import Pagination from "@/components/ui/Pagination";

export default function EbooksPage() {
  const [ebooks, setEbooks] = useState<Ebook[]>(ebooksData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const subjects = ["All", "Mathematics", "Science", "Physics", "Chemistry", "Social Science"];

  const filteredEbooks = useMemo(() => {
    return ebooks.filter((eb) => {
      if (selectedCategory !== "All" && eb.subject !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          eb.title.toLowerCase().includes(q) ||
          eb.subject.toLowerCase().includes(q) ||
          eb.class.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [ebooks, selectedCategory, searchQuery]);

  const paginatedEbooks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEbooks.slice(start, start + itemsPerPage);
  }, [filteredEbooks, currentPage, itemsPerPage]);

  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Banner */}
        <div
          className="rounded-3xl bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-8 sm:p-12 shadow-xl mb-10 relative overflow-hidden"
          data-aos="fade-down"
          data-aos-duration="750"
        >
          <div className="relative z-10 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 font-extrabold text-xs uppercase tracking-wider border border-orange-400/30">
              NCERT Solved Handbooks
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Curated eBooks &amp; Study Notes Library
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Free formula handbooks, solved chapter notes, and sample question papers for CBSE &amp; State Boards Classes 9th–12th.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div
          className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
          data-aos="fade-up"
        >
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {subjects.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#050071] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in eBooks..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* eBooks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedEbooks.map((ebook, idx) => (
            <div
              key={ebook.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              data-aos="fade-up"
              data-aos-delay={(idx % 6) * 90}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px] uppercase">
                    {ebook.price === 0 ? "Free PDF" : `₹${ebook.price}`}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">{ebook.fileSize || "3.2 MB"}</span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base line-clamp-2">
                  {ebook.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {ebook.description}
                </p>

                <div className="text-xs text-slate-600">
                  Subject: <span className="font-bold text-slate-800">{ebook.subject}</span> • {ebook.pages} Pages
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#050071]">{ebook.class}</span>
                <button
                  onClick={() => {
                    alert(`Downloading "${ebook.title}"...`);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredEbooks.length}
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
