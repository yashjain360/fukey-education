"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight, BookOpen, Search } from "lucide-react";
import { blogsData } from "@/data/blogsData";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Board Exam Prep", "Syllabus 2026-27", "Career Guidance", "History & Heritage"];

  const filteredBlogs = blogsData.filter((b) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
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
              Exam Strategy &amp; Academic Insights
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Fukey Academic Blog
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Read actionable study plans, memory hacks for history dates, NCERT syllabus updates, and stream selection guides written by veteran educators.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="text-xs font-black text-slate-800">
            Total <span className="text-[#5751E1] text-sm">{filteredBlogs.length}</span> Articles Published
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search strategy guides, NCERT..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Articles Grid with Real Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Real Blog Header Image */}
                <div className="relative h-52 bg-slate-100 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-08-05-11-50-28-5198.png";
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white font-extrabold text-[10px] uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-base font-extrabold text-slate-900 group-hover:text-[#5751E1] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Link */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  By {post.author}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-[#5751E1] hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
