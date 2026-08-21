"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  Star,
  Clock,
  BookOpen,
  FileText,
  Users,
  CheckCircle2,
  Share2,
  Heart,
  ShoppingCart,
  ChevronDown,
  ShieldCheck,
  Award,
  Video,
  Sparkles,
  ArrowRight,
  Check
} from "lucide-react";
import { coursesData, Course } from "@/data/coursesData";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/utils";
import { triggerConfetti } from "@/lib/confetti";

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const course = coursesData.find((c) => c.slug === slug);

  const { addToCart, isInCart, toggleWishlist, isInWishlist, currency } = useCart();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-4">
        <h1 className="text-3xl font-black text-slate-800">Course Not Found</h1>
        <p className="text-slate-500">The course you are looking for does not exist or has been relocated.</p>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5751E1] text-white font-bold text-xs"
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  const inCart = isInCart(course.id);
  const inWishlist = isInWishlist(course.id);

  const handleEnrollNow = () => {
    triggerConfetti();
    if (!inCart) {
      addToCart(course);
    }
  };

  const relatedCourses = coursesData
    .filter((c) => c.id !== course.id && (c.class === course.class || c.subject === course.subject))
    .slice(0, 3);

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      {/* Top Banner Header */}
      <div className="bg-[#050071] text-white pt-10 pb-16 border-b border-indigo-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-orange-400 truncate max-w-xs">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30 text-xs font-extrabold uppercase tracking-wider">
                  {course.class}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                  {course.language} Medium
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold">
                  CBSE &amp; State Boards
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl font-medium">
                {course.subTitle}
              </p>

              {/* Meta details */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white">{course.rating}</span>
                  <span className="text-slate-400">({course.reviewsCount} reviews)</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>{course.studentsEnrolled}+ Students Enrolled</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-sky-400" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3 text-xs">
                <span className="text-slate-400">Instructed by:</span>
                <span className="font-bold text-white bg-indigo-900/60 px-3 py-1 rounded-lg border border-indigo-700/50">
                  {course.instructor} ({course.instructorRole})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details & Curriculum */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">Course Overview</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {course.description}
              </p>

              {/* Course Highlights */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-3">What You Will Learn &amp; Receive</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Curriculum &amp; Syllabus Breakdown</h2>
                  <p className="text-xs text-slate-500 mt-0.5">3 Comprehensive Units • 64+ Hours Total</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {course.curriculum.map((mod, idx) => {
                  const isOpen = activeAccordion === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setActiveAccordion(isOpen ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition-colors"
                      >
                        <div className="font-bold text-xs sm:text-sm text-slate-900">
                          {mod.moduleTitle}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                            {mod.duration}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-white space-y-2 text-xs text-slate-600 border-t border-slate-100">
                          {mod.topics.map((t, tIdx) => (
                            <div key={tIdx} className="flex items-center gap-2.5 py-1">
                              <Video className="w-3.5 h-3.5 text-[#5751E1]" />
                              <span>{t}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
              <div className="space-y-3 pt-2">
                {course.faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition-colors"
                      >
                        <span className="font-bold text-xs sm:text-sm text-slate-900">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-white text-xs text-slate-600 border-t border-slate-100 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Pricing & Enrollment Card */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-xl space-y-5">
              {/* Graphic Course Thumbnail Preview */}
              <div className="h-44 rounded-2xl bg-gradient-to-tr from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-orange-500 px-2 py-0.5 rounded">
                    Freedom 40% Off
                  </span>
                  <button
                    onClick={() => toggleWishlist(course)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      inWishlist ? "bg-rose-500 text-white" : "bg-white/20 text-white"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
                  </button>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black">{course.subject}</div>
                  <div className="text-xs text-orange-300 font-semibold">{course.class}</div>
                </div>
                <div className="text-[10px] text-center text-slate-300">
                  Full 1-Year Live Access
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-[#050071]">
                    {formatPrice(course.price, currency)}
                  </span>
                  <span className="text-base text-slate-400 line-through font-medium">
                    {formatPrice(course.originalPrice, currency)}
                  </span>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Save 40%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Inclusive of all live sessions, notes PDFs &amp; test series
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleEnrollNow}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] hover:brightness-110 text-white font-extrabold text-sm shadow-xl shadow-indigo-950/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Enroll in Live Batch Now</span>
                </button>

                <button
                  onClick={() => addToCart(course)}
                  className={`w-full py-3.5 rounded-2xl border-2 font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    inCart
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-slate-300 hover:border-indigo-600 text-slate-800 hover:bg-indigo-50"
                  }`}
                >
                  {inCart ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Added in Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 text-indigo-600" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantee badges */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Instant portal login &amp; batch access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>Verified course completion certificate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
