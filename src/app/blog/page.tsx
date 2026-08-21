"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, User, ArrowRight, Search, BookOpen, Clock, Tag } from "lucide-react";
import { BlogPost, blogsData } from "@/data/blogsData";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(blogsData);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Academic Strategy & Board Prep",
    "NCERT Syllabus",
    "Study Strategies",
    "Career Guidance",
    "Inventions & GK"
  ];

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs && data.blogs.length > 0) {
          setBlogs(data.blogs);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const filteredBlogs = blogs.filter((b) => {
    if (selectedCategory !== "All" && b.category !== selectedCategory) return false;
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
        <div
          className="rounded-3xl bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-8 sm:p-12 shadow-xl mb-10 relative overflow-hidden"
          data-aos="fade-down"
          data-aos-duration="750"
        >
          <div className="relative z-10 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 font-extrabold text-xs uppercase tracking-wider border border-orange-400/30">
              Official Knowledge Hub
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Academic Articles &amp; Exam Guides
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Proven board preparation techniques, NCERT curriculum revisions, and memory shortcuts written by veteran subject leads.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div
          className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
          data-aos="fade-up"
        >
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#5751E1] text-white shadow-sm"
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
              placeholder="Search blogs, topics..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, idx) => (
            <article
              key={blog.id || idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-indigo-300"
              data-aos="fade-up"
              data-aos-delay={(idx % 3) * 100}
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#050071] font-extrabold text-[10px] uppercase shadow-xs">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6 pt-0 space-y-3">
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-orange-500" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${blog.slug}`}>
                    <h2 className="text-lg font-black text-slate-900 group-hover:text-[#5751E1] transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-medium">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <div className="w-7 h-7 rounded-full bg-indigo-50 text-[#050071] flex items-center justify-center font-black text-[10px]">
                    {blog.author.charAt(0)}
                  </div>
                  <span className="truncate max-w-[120px]">{blog.author}</span>
                </div>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#5751E1] hover:text-[#050071] transition-all hover:scale-105 active:scale-95"
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
