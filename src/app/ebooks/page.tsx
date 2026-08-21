"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, FileText, Star, BookOpen, CheckCircle, Sparkles } from "lucide-react";
import { ebooksData, Ebook } from "@/data/ebooksData";
import { triggerConfetti } from "@/lib/confetti";

export default function EbooksPage() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (eb: Ebook) => {
    setDownloadingId(eb.id);
    triggerConfetti();
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Downloading "${eb.title}" (${eb.fileSize}) successfully!`);
    }, 1200);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-[#050071] to-[#1C1A4A] text-white p-8 sm:p-12 shadow-xl mb-12 relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs uppercase tracking-wider border border-emerald-400/30">
              Free Study Vault
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Free NCERT Solutions &amp; Formula eBooks
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Download high-yield revision handbooks, derivation formula banks, and chapter-wise question banks curated by top Fukey Education faculty.
            </p>
          </div>
        </div>

        {/* Ebooks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ebooksData.map((eb) => (
            <div
              key={eb.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-[#5751E1] font-bold text-xs">
                    {eb.class}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs">
                    100% FREE PDF
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900 line-clamp-2">
                    {eb.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {eb.description}
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{eb.pages}</div>
                    <div className="text-[10px] text-slate-400 uppercase">Pages</div>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{eb.fileSize}</div>
                    <div className="text-[10px] text-slate-400 uppercase">Size</div>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{eb.downloads.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400 uppercase">Downloads</div>
                  </div>
                </div>
              </div>

              {/* Download Action */}
              <div className="mt-6">
                <button
                  onClick={() => handleDownload(eb)}
                  disabled={downloadingId === eb.id}
                  className="w-full py-3.5 rounded-2xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  <span>
                    {downloadingId === eb.id ? "Preparing PDF..." : "Download Free eBook"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
