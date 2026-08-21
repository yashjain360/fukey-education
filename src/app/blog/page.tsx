"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { blogsData } from "@/data/blogsData";

export default function BlogPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-r from-pink-900 via-[#050071] to-[#1C1A4A] text-white p-8 sm:p-12 shadow-xl mb-12 relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 font-extrabold text-xs uppercase tracking-wider border border-pink-400/30">
              Insights &amp; Strategy
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Board Exam Preparation &amp; Academic Blog
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Read expert study strategies, syllabus analysis, revision timetables, and memory hacks directly from senior faculties.
            </p>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogsData.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-[#5751E1] font-bold">
                    {blog.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {blog.readTime}
                  </span>
                </div>

                <Link href={`/blog/${blog.slug}`}>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#5751E1] transition-colors leading-snug">
                    {blog.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {blog.excerpt}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
                  <User className="w-3.5 h-3.5 text-[#5751E1]" />
                  <span>By {blog.author} ({blog.authorRole})</span>
                  <span>•</span>
                  <span>{blog.date}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-xs font-bold text-[#5751E1] group-hover:text-indigo-700 flex items-center gap-1"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
