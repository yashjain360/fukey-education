"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Heart, ArrowRight, Check, Filter, BookOpen } from "lucide-react";
import { coursesData, Course } from "@/data/coursesData";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/utils";
import { CourseCardSkeleton } from "@/components/ui/Skeleton";
import Pagination from "@/components/ui/Pagination";

function CoursesContent() {
  const searchParams = useSearchParams();
  const initialClass = searchParams.get("class") || "";
  const initialLang = searchParams.get("lang") || "";
  const initialInstructor = searchParams.get("instructor") || searchParams.get("instructorEmail") || "";
  const initialSubject = searchParams.get("subject") || "";

  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedClasses, setSelectedClasses] = useState<string[]>(
    initialClass ? [initialClass] : []
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    initialLang ? (initialLang.toLowerCase().includes("hindi") ? "Hindi" : initialLang.toLowerCase().includes("eng") ? "English" : initialLang) : "All"
  );
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject || "All");
  const [selectedInstructor, setSelectedInstructor] = useState<string>(initialInstructor || "");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);

  const { addToCart, isInCart, toggleWishlist, isInWishlist, currency } = useCart();

  useEffect(() => {
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

  // Sync state if URL search parameters change
  useEffect(() => {
    const cls = searchParams.get("class");
    const lng = searchParams.get("lang");
    const inst = searchParams.get("instructor") || searchParams.get("instructorEmail");
    const subj = searchParams.get("subject");

    if (cls) setSelectedClasses([cls]);
    if (lng) setSelectedLanguage(lng.toLowerCase().includes("hindi") ? "Hindi" : lng.toLowerCase().includes("eng") ? "English" : lng);
    if (inst) setSelectedInstructor(inst);
    if (subj) setSelectedSubject(subj);
  }, [searchParams]);

  const handleClassToggle = (cls: string) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedClasses([]);
    setSelectedLanguage("All");
    setSelectedSubject("All");
    setSelectedInstructor("");
    setSearchQuery("");
    setSortBy("latest");
    setCurrentPage(1);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.search) {
        window.history.replaceState({}, "", url.pathname);
      }
    }
  };

  const hasActiveFilters =
    selectedClasses.length > 0 ||
    selectedLanguage !== "All" ||
    selectedSubject !== "All" ||
    selectedInstructor !== "" ||
    searchQuery.trim() !== "";

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        // Class filter
        if (selectedClasses.length > 0) {
          const matchClass = selectedClasses.some((sc) => {
            const scNum = sc.replace(/\D/g, "");
            const cNum = (course.class || "").replace(/\D/g, "") || String(course.classNum || "");
            return sc === course.class || (scNum && cNum && scNum === cNum);
          });
          if (!matchClass) return false;
        }

        // Language filter (English / Hindi / All)
        if (selectedLanguage !== "All") {
          const targetLang = selectedLanguage.toLowerCase().trim();
          const cLang = (course.language || "").toLowerCase().trim();
          if (!cLang.includes(targetLang) && !targetLang.includes(cLang)) {
            return false;
          }
        }

        // Subject filter
        if (selectedSubject !== "All") {
          const targetSub = selectedSubject.toLowerCase().trim();
          const cSub = (course.subject || "").toLowerCase().trim();
          if (cSub !== targetSub) {
            return false;
          }
        }

        // Instructor filter
        if (selectedInstructor.trim()) {
          const targetInst = selectedInstructor.toLowerCase().trim();
          const cInst = (course.instructor || "").toLowerCase().trim();
          if (!cInst.includes(targetInst) && !targetInst.includes(cInst)) {
            return false;
          }
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = (course.title || "").toLowerCase().includes(q);
          const matchInst = (course.instructor || "").toLowerCase().includes(q);
          const matchSub = (course.subject || "").toLowerCase().includes(q);
          const matchClass = (course.class || "").toLowerCase().includes(q);
          if (!matchTitle && !matchInst && !matchSub && !matchClass) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "popular") return (b.studentsEnrolled || 0) - (a.studentsEnrolled || 0);
        return 0;
      });
  }, [courses, selectedClasses, selectedLanguage, selectedSubject, selectedInstructor, searchQuery, sortBy]);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCourses, currentPage, itemsPerPage]);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8" data-aos="fade-down" data-aos-duration="700">
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
              Explore 52+ real CBSE and State Board courses for Classes 9th, 10th, 11th &amp; 12th with expert faculty guidance.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Active Faculty Filter Badge if Filtered */}
        {selectedInstructor && (
          <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-900">
                Filtered by Faculty: <strong className="text-[#050071]">{selectedInstructor}</strong>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-800 text-[10px] font-black">
                {filteredCourses.length} Batches
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedInstructor("");
                if (typeof window !== "undefined") {
                  const url = new URL(window.location.href);
                  url.searchParams.delete("instructor");
                  url.searchParams.delete("instructorEmail");
                  window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
                }
              }}
              className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
            >
              Clear Faculty Filter ✕
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filters */}
          <div className="lg:col-span-3 space-y-6" data-aos="fade-right" data-aos-duration="800">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                  <Filter className="w-4 h-4 text-[#5751E1]" />
                  <span>Filter Courses</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] font-bold text-rose-500 hover:underline cursor-pointer"
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
                        onChange={() => {
                          setSelectedLanguage(lang);
                          setCurrentPage(1);
                        }}
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
                  onChange={(e) => {
                    setSelectedSubject(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
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
          <div className="lg:col-span-9 space-y-6" data-aos="fade-left" data-aos-duration="850">
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
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search in courses..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="latest">Latest Batches</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-rose-600 hover:underline text-left cursor-pointer"
                >
                  Reset All Filters
                </button>
              )}
            </div>

            {/* Course Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <CourseCardSkeleton key={n} />
                ))}
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-extrabold text-slate-800 text-base">No Matching Courses Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try resetting your active filters or searching with different keywords.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedCourses.map((course, idx) => {
                    const inCart = isInCart(course.id);
                    const inWish = isInWishlist(course.id);

                    return (
                      <div
                        key={course.id}
                        className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-indigo-300"
                        data-aos="fade-up"
                        data-aos-delay={(idx % 6) * 80}
                      >
                        {/* Course Thumbnail */}
                        <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden border-b border-slate-100 flex items-center justify-center">
                          <img
                            src={course.thumbnail || "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-08-14-06-28-03-5696.png"}
                            alt={course.title}
                            className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-08-14-06-28-03-5696.png";
                            }}
                          />

                          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#050071] font-extrabold text-[10px] uppercase shadow-xs">
                            {course.class}
                          </span>

                          <button
                            onClick={() => toggleWishlist(course)}
                            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-all cursor-pointer ${
                              inWish
                                ? "bg-rose-500 text-white shadow-md"
                                : "bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500"
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${inWish ? "fill-current" : ""}`} />
                          </button>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[11px] font-bold text-indigo-600">
                              <span>{course.subject}</span>
                              <span className="text-slate-400 font-medium">{course.language}</span>
                            </div>

                            <Link href={`/course/${course.slug}`}>
                              <h3 className="font-extrabold text-slate-900 text-sm hover:text-[#5751E1] line-clamp-2 transition-colors">
                                {course.title}
                              </h3>
                            </Link>

                            <div className="text-xs text-slate-500 font-medium">
                              By <span className="text-slate-800 font-semibold">{course.instructor}</span>
                            </div>
                          </div>

                          {/* Footer Pricing & CTA */}
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <button
                              onClick={() => addToCart(course)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                                inCart
                                  ? "bg-emerald-600 text-white shadow-xs"
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

                {/* Pagination Component */}
                <Pagination
                  currentPage={currentPage}
                  totalItems={filteredCourses.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                  onItemsPerPageChange={(size) => setItemsPerPage(size)}
                  pageSizeOptions={[6, 9, 18, 36]}
                />
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
