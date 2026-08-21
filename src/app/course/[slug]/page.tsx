"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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
  Check,
  Play,
  Download,
  HelpCircle,
  Radio,
  FileSpreadsheet,
  GraduationCap,
  Lock
} from "lucide-react";
import { coursesData, Course } from "@/data/coursesData";
import { useCart } from "@/components/cart/CartContext";
import { useAuth } from "@/components/auth/AuthContext";
import { formatPrice } from "@/lib/utils";
import { triggerConfetti } from "@/lib/confetti";
import { downloadStudyNote } from "@/lib/pdfDownloader";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = (params?.slug as string) || "";
  const cleanSlug = rawSlug.replace(/^[-]+|[-]+$/g, "");

  const course =
    coursesData.find(
      (c) =>
        c.slug === cleanSlug ||
        c.slug === rawSlug ||
        c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^[-]+|[-]+$/g, "") === cleanSlug
    ) || coursesData[0];

  const { user, isAuthenticated } = useAuth();
  const { addToCart, isInCart, toggleWishlist, isInWishlist, currency } = useCart();
  
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeLesson, setActiveLesson] = useState({
    unitIndex: 0,
    topicIndex: 0,
    title: course?.curriculum?.[0]?.topics?.[0] || "Introduction to NCERT Board Curriculum",
  });
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState("1.0x");
  const [notesDownloaded, setNotesDownloaded] = useState(false);

  // Check enrollment in MongoDB Atlas
  useEffect(() => {
    if (user?.email) {
      if (user.role === "admin" || user.role === "instructor") {
        setIsEnrolled(true);
        return;
      }

      fetch(`/api/enrollments?email=${encodeURIComponent(user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.enrollments && Array.isArray(data.enrollments)) {
            const hasEnrolled = data.enrollments.some(
              (e: any) =>
                e.courseSlug === cleanSlug ||
                e.courseSlug === rawSlug ||
                (e.courseTitle && e.courseTitle.toLowerCase() === course.title.toLowerCase())
            );
            if (hasEnrolled) setIsEnrolled(true);
          }
        })
        .catch(() => {});
    }
  }, [user, cleanSlug, rawSlug, course.title]);

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
    router.push("/checkout");
  };

  const handleDownloadNotes = () => {
    if (course) {
      downloadStudyNote(course.title, course.subject, course.class);
    }
    setNotesDownloaded(true);
    triggerConfetti();
    setTimeout(() => setNotesDownloaded(false), 3000);
  };

  const relatedCourses = coursesData
    .filter((c) => c.id !== course.id && (c.class === course.class || c.subject === course.subject))
    .slice(0, 3);

  return (
    <div className="bg-slate-50/60 min-h-screen pb-24">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#2D1B69] text-white pt-10 pb-16 border-b border-indigo-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-amber-400 truncate max-w-xs">{course.title}</span>
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

                {isEnrolled && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black flex items-center gap-1 shadow-lg shadow-emerald-500/20 animate-pulse">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Enrolled Student Pass (Active)</span>
                  </span>
                )}
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

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                <span className="text-slate-400">Lead Faculty:</span>
                <span className="font-bold text-white bg-indigo-900/60 px-3 py-1 rounded-lg border border-indigo-700/50">
                  {course.instructor} ({course.instructorRole})
                </span>

                {isEnrolled && (
                  <Link
                    href={`/live/room-${cleanSlug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold shadow-md hover:scale-105 transition-all"
                  >
                    <Radio className="w-3.5 h-3.5 animate-ping" />
                    <span>Join Live Interactive Classroom Studio</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details or Enrolled Player */}
          <div className="lg:col-span-8 space-y-8">
            {/* ENROLLED CLASSROOM LEARNING STUDIO (FOR ACTIVE STUDENTS) */}
            {isEnrolled ? (
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-900 shadow-2xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      <GraduationCap className="w-4 h-4" />
                      <span>Active Classroom Player</span>
                    </div>
                    <h2 className="text-xl font-black text-white">{activeLesson.title}</h2>
                    <p className="text-xs text-slate-400">
                      Unit {activeLesson.unitIndex + 1} • Lecture {activeLesson.topicIndex + 1} • NCERT Board Alignment 2026-27
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPlaybackSpeed(playbackSpeed === "1.0x" ? "1.5x" : playbackSpeed === "1.5x" ? "2.0x" : "1.0x")}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Speed: {playbackSpeed}
                    </button>
                    <Link
                      href={`/live/room-${cleanSlug}`}
                      className="px-4 py-1.5 rounded-xl bg-[#FF2424] hover:bg-red-700 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>Live Doubt Room</span>
                    </Link>
                  </div>
                </div>

                {/* HD Video Lecture Player Simulation */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video border border-slate-800 flex items-center justify-center group shadow-inner">
                  {isPlayingVideo ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4 bg-radial from-slate-900 to-black">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center animate-pulse">
                        <Video className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-white">Streaming Lecture Broadcast</h3>
                        <p className="text-xs text-slate-400 max-w-md mx-auto">
                          {activeLesson.title} — Recorded HD Backup with Live Board Derivations
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => setIsPlayingVideo(false)}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
                        >
                          Pause Lecture
                        </button>
                        <button
                          onClick={handleDownloadNotes}
                          className="px-4 py-2 rounded-xl bg-[#5751E1] hover:bg-indigo-600 text-xs font-bold text-white transition-colors flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{notesDownloaded ? "PDF Downloaded!" : "Download Lecture Notes PDF"}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6 space-y-4">
                      <div
                        onClick={() => setIsPlayingVideo(true)}
                        className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#5751E1] to-[#FF2424] text-white flex items-center justify-center mx-auto shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all"
                      >
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-extrabold text-white">Start Interactive Video Lecture</h4>
                        <p className="text-xs text-slate-400">Click to start streaming {activeLesson.title}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Learning Tools Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <button
                    onClick={handleDownloadNotes}
                    className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-left space-y-1 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                      <FileText className="w-4 h-4" />
                      <span>PDF Document</span>
                    </div>
                    <div className="font-extrabold text-xs text-white">Handwritten Color Notes</div>
                    <div className="text-[10px] text-slate-400">Formula sheets &amp; board derivations</div>
                  </button>

                  <Link
                    href={`/test/maths-10-sample-01`}
                    className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-left space-y-1 transition-all hover:scale-[1.02] block"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-sky-400">
                      <Award className="w-4 h-4" />
                      <span>Exam Center</span>
                    </div>
                    <div className="font-extrabold text-xs text-white">Chapter Practice Mock Test</div>
                    <div className="text-[10px] text-slate-400">Live timer &amp; performance scorecard</div>
                  </Link>

                  <Link
                    href={`/live/room-${cleanSlug}`}
                    className="p-4 rounded-2xl bg-gradient-to-br from-emerald-900/40 to-teal-900/40 hover:brightness-110 border border-emerald-700/40 text-left space-y-1 transition-all hover:scale-[1.02] block"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                      <Radio className="w-4 h-4" />
                      <span>Live 1-on-1</span>
                    </div>
                    <div className="font-extrabold text-xs text-white">Faculty Doubt Studio</div>
                    <div className="text-[10px] text-emerald-300">Raise hand &amp; ask doubts live</div>
                  </Link>
                </div>
              </div>
            ) : null}

            {/* Overview Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">Course Overview &amp; Batch Objectives</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {course.description}
              </p>

              {/* Course Highlights */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Included in this Academic Program</h3>
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

            {/* Curriculum Accordion / Lesson Selector */}
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
                        className="w-full p-4 text-left flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer"
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
                            <div
                              key={tIdx}
                              onClick={() => {
                                if (isEnrolled) {
                                  setActiveLesson({ unitIndex: idx, topicIndex: tIdx, title: t });
                                  setIsPlayingVideo(true);
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }
                              }}
                              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                                activeLesson.title === t && isEnrolled
                                  ? "border-[#5751E1] bg-indigo-50/70 text-[#050071] font-bold"
                                  : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                              } ${isEnrolled ? "cursor-pointer" : ""}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <Video className={`w-3.5 h-3.5 ${activeLesson.title === t && isEnrolled ? "text-[#5751E1]" : "text-slate-400"}`} />
                                <span>{t}</span>
                              </div>
                              {isEnrolled ? (
                                <span className="text-[10px] font-extrabold text-[#5751E1] flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-indigo-200">
                                  <Play className="w-3 h-3 fill-current" />
                                  <span>Play Lecture</span>
                                </span>
                              ) : (
                                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                  <Lock className="w-3 h-3" />
                                  <span>Locked</span>
                                </span>
                              )}
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
                        className="w-full p-4 text-left flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer"
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

          {/* Right Column: Sticky Pricing or Active Student Card */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-xl space-y-5">
              {/* Graphic Course Thumbnail Preview */}
              <div className="h-44 rounded-2xl bg-gradient-to-tr from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-orange-500 px-2 py-0.5 rounded">
                    {isEnrolled ? "Student Pass Active" : "Freedom 40% Off"}
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
                <div className="text-center relative z-10">
                  <div className="text-xl font-black">{course.subject}</div>
                  <div className="text-xs text-orange-300 font-semibold">{course.class}</div>
                </div>
                <div className="text-[10px] text-center text-slate-300 relative z-10">
                  Full 1-Year Live &amp; Recorded Access
                </div>
              </div>

              {isEnrolled ? (
                /* ENROLLED STUDENT ACTION CARD */
                <div className="space-y-4">
                  <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/70 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-black text-emerald-800">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>You Own this Academic Batch</span>
                    </div>
                    <p className="text-[11px] text-emerald-700">
                      Your enrollment is verified. You have unrestricted access to all video lectures, notes PDFs, and chapter test series.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>Course Progress</span>
                      <span className="text-[#5751E1]">32% Completed</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-500 to-[#5751E1] h-2 rounded-full w-1/3 transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <Link
                      href={`/live/room-${cleanSlug}`}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-black text-xs shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
                    >
                      <Radio className="w-4 h-4" />
                      <span>Join Live Classroom Studio</span>
                    </Link>

                    <Link
                      href="/dashboard"
                      className="w-full py-3 rounded-2xl bg-[#050071] hover:bg-indigo-900 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all text-center"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Back to Student Dashboard</span>
                    </Link>
                  </div>
                </div>
              ) : (
                /* UNENROLLED PRICING & CHECKOUT CARD */
                <>
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

                  <div className="space-y-3 pt-2">
                    <button
                      onClick={handleEnrollNow}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] hover:brightness-110 text-white font-extrabold text-sm shadow-xl shadow-indigo-950/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Enroll in Live Batch Now</span>
                    </button>

                    <button
                      onClick={() => addToCart(course)}
                      className={`w-full py-3.5 rounded-2xl border-2 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
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
                </>
              )}

              {/* Guarantee badges */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Instant portal login &amp; batch access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Senior faculty doubt mentorship</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                  <span>Weekly board test series &amp; scorecards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
