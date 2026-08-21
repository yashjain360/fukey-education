"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, User, FileText, ArrowRight, Sparkles } from "lucide-react";
import { coursesData, Course } from "@/data/coursesData";
import { instructorsData, Instructor } from "@/data/instructorsData";
import { ebooksData, Ebook } from "@/data/ebooksData";
import { blogsData, BlogPost } from "@/data/blogsData";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "courses" | "instructors" | "ebooks" | "blogs">("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredCourses = q
    ? coursesData.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q) ||
          c.class.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.language.toLowerCase().includes(q)
      )
    : coursesData.slice(0, 6);

  const filteredInstructors = q
    ? instructorsData.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.role.toLowerCase().includes(q) ||
          i.specialties.some((s) => s.toLowerCase().includes(q))
      )
    : instructorsData.slice(0, 3);

  const filteredEbooks = q
    ? ebooksData.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.subject.toLowerCase().includes(q) ||
          e.class.toLowerCase().includes(q)
      )
    : ebooksData.slice(0, 3);

  const filteredBlogs = q
    ? blogsData.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q)
      )
    : blogsData.slice(0, 2);

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, subjects, instructors, ebooks, class 9-12..."
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100/70 border-b border-slate-200/60 text-xs overflow-x-auto">
          {(["all", "courses", "instructors", "ebooks", "blogs"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full capitalize font-semibold transition-all ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-4 space-y-5">
          {/* Courses */}
          {(activeTab === "all" || activeTab === "courses") && filteredCourses.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Courses ({filteredCourses.length})
                </span>
                <Link
                  href="/courses"
                  onClick={onClose}
                  className="text-indigo-600 hover:underline flex items-center gap-1"
                >
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCourses.slice(0, 6).map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelect(`/course/${c.slug}`)}
                    className="p-2.5 rounded-xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer transition-all flex items-start gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-700 font-bold text-xs">
                      {c.classNum}th
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-slate-800 text-xs truncate group-hover:text-indigo-600">
                        {c.title}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{c.instructor}</span>
                        <span>•</span>
                        <span className="font-semibold text-emerald-600">₹{c.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructors */}
          {(activeTab === "all" || activeTab === "instructors") && filteredInstructors.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-600" /> Expert Faculty ({filteredInstructors.length})
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredInstructors.map((inst) => (
                  <div
                    key={inst.id}
                    onClick={() => handleSelect(`/instructors`)}
                    className="p-2.5 rounded-xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center">
                      {inst.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-xs group-hover:text-indigo-600">
                        {inst.name}
                      </div>
                      <div className="text-[11px] text-slate-500">{inst.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ebooks */}
          {(activeTab === "all" || activeTab === "ebooks") && filteredEbooks.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-orange-500" /> Free eBooks & Notes
                </span>
                <Link href="/ebooks" onClick={onClose} className="text-indigo-600 hover:underline">
                  Browse eBooks
                </Link>
              </div>
              <div className="space-y-1.5">
                {filteredEbooks.map((eb) => (
                  <div
                    key={eb.id}
                    onClick={() => handleSelect(`/ebooks`)}
                    className="p-2 rounded-lg hover:bg-orange-50/50 border border-slate-100 flex items-center justify-between cursor-pointer group"
                  >
                    <div className="text-xs font-medium text-slate-800 group-hover:text-orange-600">
                      {eb.title}
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded">
                      FREE PDF
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blogs */}
          {(activeTab === "all" || activeTab === "blogs") && filteredBlogs.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Articles & Strategy
                </span>
              </div>
              <div className="space-y-1.5">
                {filteredBlogs.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => handleSelect(`/blog/${b.slug}`)}
                    className="p-2 rounded-lg hover:bg-pink-50/50 border border-slate-100 cursor-pointer group"
                  >
                    <div className="text-xs font-semibold text-slate-800 group-hover:text-pink-600">
                      {b.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{b.excerpt}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredCourses.length === 0 &&
            filteredInstructors.length === 0 &&
            filteredEbooks.length === 0 &&
            filteredBlogs.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-slate-400 mt-1">
                  Try searching for Maths, Class 10, Physics, Hindi, or Pawan Gupta.
                </p>
              </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="bg-white px-1.5 py-0.5 rounded border shadow-xs">↑</kbd> <kbd className="bg-white px-1.5 py-0.5 rounded border shadow-xs">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="bg-white px-1.5 py-0.5 rounded border shadow-xs">↵</kbd> to select
            </span>
          </div>
          <span className="text-indigo-600 font-semibold">Fukey Instant Search</span>
        </div>
      </div>
    </div>
  );
}
