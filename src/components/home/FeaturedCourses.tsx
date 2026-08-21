"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { coursesData, Course } from "@/data/coursesData";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/utils";
import { CourseCardSkeleton } from "@/components/ui/Skeleton";

export default function FeaturedCourses() {
  const [selectedTab, setSelectedTab] = useState<string>("All Courses");
  const { addToCart, isInCart, toggleWishlist, isInWishlist, currency } = useCart();
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>(coursesData);

  useEffect(() => {
    // Fetch from MongoDB API endpoint with fallback
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

  const tabs = ["All Courses", "Class 9", "Class 10", "Class 11", "Class 12"];

  const filteredCourses = courses.filter((c) => {
    if (selectedTab === "All Courses") return true;
    return c.class === selectedTab;
  });

  const displayCount = 4;
  const maxIndex = Math.max(0, filteredCourses.length - displayCount);

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const visibleCourses = filteredCourses.slice(startIndex, startIndex + displayCount);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-indigo-100/80 text-[#5751E1] font-extrabold text-xs uppercase tracking-wider">
            Top Class Courses
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#050071] tracking-tight">
            Explore Our Worlds Featured Courses
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Check out the most demanding courses right now for CBSE &amp; State Board classes
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setSelectedTab(tab);
                setStartIndex(0);
              }}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold ${
                selectedTab === tab
                  ? "bg-[#5751E1] text-white shadow-md"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Course Cards Carousel Grid / Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleCourses.map((course) => {
                const inCart = isInCart(course.id);
                const inWishlist = isInWishlist(course.id);

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between overflow-hidden"
                  >
                    {/* Real Course Thumbnail Banner with Wishlist Button */}
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
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
                        className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
                          inWishlist
                            ? "bg-rose-500 text-white"
                            : "bg-white/90 hover:bg-white text-slate-700"
                        }`}
                        aria-label="Toggle Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    {/* Course Details Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                          {course.subject}: {course.class}
                        </div>

                        <Link href={`/course/${course.slug}`}>
                          <h3 className="font-extrabold text-slate-900 text-sm hover:text-[#5751E1] line-clamp-2">
                            {course.title}
                          </h3>
                        </Link>

                        <div className="text-xs text-slate-500 font-medium">
                          By <span className="text-slate-800 font-semibold">{course.instructor}</span>
                        </div>
                      </div>

                      {/* Price & Action Row */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => addToCart(course)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
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
                          <div className="font-black text-base text-[#050071]">
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

            {/* Carousel Arrows */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className="p-3 rounded-full bg-slate-100 hover:bg-[#5751E1] hover:text-white disabled:opacity-40 disabled:hover:bg-slate-100 disabled:hover:text-slate-700 text-slate-700 shadow-sm"
                aria-label="Previous courses"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={startIndex >= maxIndex}
                className="p-3 rounded-full bg-slate-100 hover:bg-[#5751E1] hover:text-white disabled:opacity-40 disabled:hover:bg-slate-100 disabled:hover:text-slate-700 text-slate-700 shadow-sm"
                aria-label="Next courses"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#050071] hover:bg-indigo-900 text-white text-xs font-extrabold shadow-md"
          >
            <span>View All 52+ Real Courses &amp; Batches</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
