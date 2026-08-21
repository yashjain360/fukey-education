"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, Share2, Sparkles } from "lucide-react";
import { blogsData } from "@/data/blogsData";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-4">
        <h1 className="text-3xl font-black text-slate-800">Article Not Found</h1>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5751E1] text-white font-bold text-xs"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#5751E1] hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all articles</span>
        </Link>

        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-4 border-b border-slate-100 pb-8">
            <span className="px-3.5 py-1 rounded-full bg-indigo-50 text-[#5751E1] font-extrabold text-xs">
              {blog.category}
            </span>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <User className="w-4 h-4 text-[#5751E1]" />
                <span>{blog.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{blog.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {blog.content}
          </div>

          <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Published by <strong className="text-slate-800">Fukey Education Academic Editorial</strong>
            </div>
            <Link
              href="/courses"
              className="px-5 py-2.5 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white text-xs font-bold transition-colors"
            >
              Explore Live Batches
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
