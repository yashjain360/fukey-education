"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Heart, ArrowRight, Check, Filter, BookOpen } from "lucide-react";
import { coursesData, Course } from "@/data/coursesData";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/utils";
import { CourseCardSkeleton } from "@/components/ui/Skeleton";

function CoursesContent() {
  const searchParams = useSearchParams();
  const initialClass = searchParams.get("class") || "";
  const initialLang = searchParams.get("lang") || "";

  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedClasses, setSelectedClasses] = useState<string[]>(
    initialClass ? [initialClass] : []
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    initialLang ? initialLang : "All"
  );
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("latest");

  const { addToCart, isInCart, toggleWishlist, isInWishlist, currency } = useCart();

  useEffect(() => {
    // Fetch live from MongoDB endpoint
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.courses && data.courses.length > 0) {
          setCourses(data.courses);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleClassToggle = (cls: string) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
  };

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        // Class filter
        if (selectedClasses.length > 0 && !selectedClasses.includes(course.class)) {
          return false;
        }
        // Language filter
        if (selectedLanguage !== "All" && course.language !== selectedLanguage) {
          return false;
        }
        // Subject filter
        if (selectedSubject !== "All" && course.subject !== selectedSubject) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = course.title.toLowerCase().includes(q);
          const matchInst = course.instructor.toLowerCase().includes(q);
          const matchSub = course.subject.toLowerCase().includes(q);
          if (!matchTitle && !matchInst && !matchSub) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0; // default latest
      });
  }, [courses, selectedClasses, selectedLanguage, selectedSubject, searchQuery, sortBy]);

  const uniqueSubjects = [
    "All",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Science",
    "Social Science",
    "Economics",
    "Accountancy",
    "Business Studies",
    "History",
    "Geography",
    "Political Science"
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-[#050071] to-[#1C1A4A] text-white p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="text-xs font-semibold text-indigo-200 flex items-center gap-2">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-orange-400 font-bold">Courses</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              All Online Coaching Courses
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Explore 52+ real CBSE and State Board courses for Classes 9th, 10th, 11th &amp; 12th powered by MongoDB Atlas.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filters */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                  <Filter className="w-4 h-4 text-[#5751E1]" />
                  <span>Filter Courses</span>
                </div>
                {(selectedClasses.length > 0 || selectedLanguage !== "All" || selectedSubject !== "All") && (
                  <button
                    onClick={() => {
                      setSelectedClasses([]);
                      setSelectedLanguage("All");
                      setSelectedSubject("All");
                      setSearchQuery("");
                    }}
                    className="text-[11px] font-bold text-rose-500 hover:underline"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Categories / Class Filter */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Categories (Class)
                </div>
                <div className="space-y-2">
                  {["Class 9", "Class 10", "Class 11", "Class 12"].map((cls) => (
                    <label
                      key={cls}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer hover:text-indigo-600 select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedClasses.includes(cls)}
                        onChange={() => handleClassToggle(cls)}
                        className="w-4 h-4 rounded text-[#5751E1] border-slate-300 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span>{cls}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Language Filter */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Language Medium
                </div>
                <div className="space-y-2">
                  {["All", "English", "Hindi"].map((lang) => (
                    <label
                      key={lang}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer hover:text-indigo-600 select-none"
                    >
                      <input
                        type="radio"
                        name="language_filter"
                        checked={selectedLanguage === lang}
                        onChange={() => setSelectedLanguage(lang)}
                        className="w-4 h-4 text-[#5751E1] border-slate-300 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span>{lang === "All" ? "All Languages" : `${lang} Medium`}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subject Dropdown */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Subject Focus
                </div>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-indigo-500"
                >
                  {uniqueSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Main Course Grid */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Search & Sort Control Bar */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-black text-slate-800">
                Total <span className="text-[#5751E1] text-sm">{filteredCourses.length}</span> Courses Found
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search in courses..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="latest">Sort By: Latest to Oldest</option>
                  <option value="rating">Sort By: Top Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Courses Grid / Skeleton */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CourseCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-3">
                <BookOpen className="w-12 h-12 text-indigo-400 mx-auto opacity-60" />
                <div className="text-lg font-bold text-slate-800">No courses match your criteria</div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try unchecking some filters or searching for another subject or teacher.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  const inCart = isInCart(course.id);
                  const inWishlist = isInWishlist(course.id);

                  return (
                    <div
                      key={course.id}
                      className="bg-white rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Real Course Thumbnail Banner */}
                      <div className="relative h-44 bg-slate-100 overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-08-14-06-28-03-5696.png";
                          }}
                        />

                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-2.5 py-1 rounded-lg bg-black/60 text-white font-extrabold text-[10px] uppercase tracking-wider">
                            {course.class}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleWishlist(course)}
                          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                            inWishlist
                              ? "bg-rose-500 text-white"
                              : "bg-white/90 hover:bg-white text-slate-700"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${inWishlist ? "fill-current" : ""}`} />
                        </button>
                      </div>

                      {/* Course Details */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                            {course.subject}: {course.class}
                          </div>

                          <Link href={`/course/${course.slug}`}>
                            <h3 className="font-bold text-slate-900 text-sm hover:text-[#5751E1] line-clamp-2">
                              {course.title}
                            </h3>
                          </Link>

                          <div className="text-xs text-slate-500">
                            By <span className="text-slate-800 font-semibold">{course.instructor}</span>
                          </div>
                        </div>

                        {/* Price & Action Row */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => addToCart(course)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                              inCart
                                ? "bg-emerald-600 text-white"
                                : "bg-[#FF2424] hover:bg-red-700 text-white shadow-sm"
                            }`}
                          >
                            {inCart ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>In Cart</span>
                              </>
                            ) : (
                              <>
                                <span>Add To Cart</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>

                          <div className="text-right">
                            <div className="font-black text-sm text-[#050071]">
                              {formatPrice(course.price, currency)}
                            </div>
                            <div className="text-[10px] text-slate-400 line-through">
                              {formatPrice(course.originalPrice, currency)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading courses...</div>}>
      <CoursesContent />
    </Suspense>
  );
}
