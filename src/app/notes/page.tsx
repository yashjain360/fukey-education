"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Search,
  BookOpen,
  Star,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { triggerConfetti } from "@/lib/confetti";
import Pagination from "@/components/ui/Pagination";

interface ChapterNote {
  id: string;
  title: string;
  class: string;
  subject: string;
  pages: number;
  fileSize: string;
  author: string;
  rating: number;
  downloadsCount: number;
}

export default function NotesLibraryPage() {
  const [notes, setNotes] = useState<ChapterNote[]>([]);
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => {
        if (data.notes) setNotes(data.notes);
      })
      .catch(() => {});
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      if (selectedClass !== "All" && n.class !== selectedClass) return false;
      if (selectedSubject !== "All" && n.subject !== selectedSubject) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          n.subject.toLowerCase().includes(q) ||
          n.author.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [notes, selectedClass, selectedSubject, searchQuery]);

  const paginatedNotes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredNotes.slice(start, start + itemsPerPage);
  }, [filteredNotes, currentPage, itemsPerPage]);

  const handleDownload = (title: string) => {
    triggerConfetti();
    alert(`Downloading "${title}" PDF...`);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Banner */}
        <div
          className="rounded-3xl bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-8 sm:p-12 shadow-xl relative overflow-hidden"
          data-aos="fade-down"
          data-aos-duration="750"
        >
          <div className="relative z-10 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-400/30">
              Gold Medalist Faculty Curated
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Chapter Notes &amp; Formula Cheatsheets
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Concise revision summaries, step-by-step mathematical derivations, chemical reaction charts, and NCERT solved examples for board exam prep.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
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
              placeholder="Search formula notes..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedNotes.map((note, idx) => (
            <div
              key={note.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group hover:border-indigo-300"
              data-aos="fade-up"
              data-aos-delay={(idx % 3) * 100}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase">
                    {note.class} • {note.subject}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">{note.fileSize}</span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#5751E1] line-clamp-2 transition-colors">
                  {note.title}
                </h3>

                <div className="text-xs text-slate-500 font-medium">
                  Curated by <span className="font-bold text-slate-800">{note.author}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{note.rating} ★ ({note.downloadsCount}+ downloads)</span>
                </span>

                <button
                  onClick={() => handleDownload(note.title)}
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
          totalItems={filteredNotes.length}
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
