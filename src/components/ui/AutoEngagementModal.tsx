"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Sparkles,
  Phone,
  Mail,
  User,
  GraduationCap,
  Bell,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Lock,
  Download,
  Flame,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { triggerConfetti } from "@/lib/confetti";

export default function AutoEngagementModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"enquiry" | "login" | "news" | "materials">("enquiry");
  const { user, isAuthenticated, loginWithGoogle } = useAuth();
  const router = useRouter();

  // Form states for enquiry
  const [studentName, setStudentName] = useState(user?.name || "");
  const [studentPhone, setStudentPhone] = useState(user?.phone || "");
  const [studentEmail, setStudentEmail] = useState(user?.email || "");
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [medium, setMedium] = useState("Hindi & English");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnquirySent, setIsEnquirySent] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.name) setStudentName(user.name);
      if (user.email) setStudentEmail(user.email);
      if (user.phone) setStudentPhone(user.phone);
    }
  }, [user]);

  useEffect(() => {
    // Intelligent non-annoying trigger logic
    const hasSeenModal = sessionStorage.getItem("fukey_auto_hub_dismissed");
    if (hasSeenModal) return;

    // 1. Time on page trigger: 18 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 18000);

    // 2. Exit Intent trigger (mouse moving out of top window)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !sessionStorage.getItem("fukey_auto_hub_dismissed")) {
        setIsOpen(true);
      }
    };

    // 3. Scroll depth trigger: 60% scroll
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 60 && !sessionStorage.getItem("fukey_auto_hub_dismissed")) {
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("fukey_auto_hub_dismissed", "true");
  };

  const handleGoogleFastFill = async () => {
    const profile = await loginWithGoogle();
    if (profile) {
      setStudentName(profile.name);
      setStudentEmail(profile.email);
      if (profile.phone) setStudentPhone(profile.phone);
      triggerConfetti();
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: studentName,
          phone: studentPhone,
          email: studentEmail,
          targetClass: selectedClass,
          medium: medium,
        }),
      });
      setIsEnquirySent(true);
      triggerConfetti();
    } catch (err) {
      setIsEnquirySent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const newsFeed = [
    {
      title: "CBSE Rationalized Curriculum 2026-27 Announced",
      badge: "Board Alert",
      desc: "50% competency-based questions for Class 10th & 12th board exams.",
      href: "/courses",
    },
    {
      title: "RBI Testing New Polymer Banknotes (Rs 10 & 20)",
      badge: "Current Affairs",
      desc: "Crucial national economic study update for Class 11 & 12 Commerce.",
      href: "/blog",
    },
    {
      title: "Re-NEET UG 2026 Scorecards & Percentile Released",
      badge: "Science & Medical",
      desc: "Centralized counselling cutoffs and government medical seat allocation.",
      href: "/news",
    },
  ];

  const studyMaterials = [
    {
      title: "Class 10th Maths Formula Handbook",
      type: "PDF Cheat-Sheet",
      size: "2.4 MB",
      href: "/ebooks",
    },
    {
      title: "Class 12th Physics Derivations Bank",
      type: "Solved eBook",
      size: "4.8 MB",
      href: "/ebooks",
    },
    {
      title: "Class 10th Science Topper Answer Copy",
      type: "Sample Papers",
      size: "3.1 MB",
      href: "/ebooks",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-indigo-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-5 sm:p-6 flex items-center justify-between relative">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo/logo-white.png"
                alt="Fukey Education Logo"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://fukeyeducation.com/uploads/custom-images/wsus-img-2025-11-10-12-04-32-8747.png";
                }}
              />
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[10px] font-extrabold border border-orange-400/30 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Admissions 2026-27</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
              Instant Academic Hub &amp; Live Help
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Tabs Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-3 sm:px-6 overflow-x-auto no-scrollbar gap-2 py-2">
          <button
            onClick={() => setActiveTab("enquiry")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "enquiry"
                ? "bg-[#050071] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-200/70"
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Admission Enquiry</span>
          </button>

          <button
            onClick={() => setActiveTab("login")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "login"
                ? "bg-[#050071] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-200/70"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>1-Click Login</span>
          </button>

          <button
            onClick={() => setActiveTab("news")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "news"
                ? "bg-[#050071] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-200/70"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>News &amp; Bulletins</span>
          </button>

          <button
            onClick={() => setActiveTab("materials")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "materials"
                ? "bg-[#050071] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-200/70"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Free Notes PDF</span>
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: ADMISSION ENQUIRY FORM */}
          {activeTab === "enquiry" && (
            <div className="space-y-5">
              {isEnquirySent ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Enquiry Received!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Our senior academic counselor will call you on <strong className="text-slate-900">{studentPhone}</strong> within 15 minutes to guide your board prep strategy.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={handleClose}
                      className="px-6 py-2.5 rounded-xl bg-[#050071] text-white font-bold text-xs"
                    >
                      Continue Exploring
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-slate-900 text-lg">Request Free Admission Callback &amp; Demo</h3>
                      <p className="text-xs text-slate-500">
                        Get free formula handbooks &amp; live trial class credentials sent to your WhatsApp.
                      </p>
                    </div>
                  </div>

                  {/* 1-Click Fast Fill with Google */}
                  <button
                    type="button"
                    onClick={handleGoogleFastFill}
                    className="w-full py-2.5 px-4 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Auto-Fill with Google (Name &amp; Email)</span>
                  </button>

                  <form onSubmit={handleEnquirySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Student Name *</label>
                        <input
                          type="text"
                          required
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="e.g. Mayank Dubey"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone *</label>
                        <input
                          type="tel"
                          required
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Target Class *</label>
                        <select
                          value={selectedClass}
                          onChange={(e) => setSelectedClass(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium cursor-pointer"
                        >
                          <option value="Class 9">Class 9th Foundation</option>
                          <option value="Class 10">Class 10th Board Target</option>
                          <option value="Class 11">Class 11th Science &amp; Commerce</option>
                          <option value="Class 12">Class 12th Board Target</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Language Medium *</label>
                        <select
                          value={medium}
                          onChange={(e) => setMedium(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium cursor-pointer"
                        >
                          <option value="Hindi & English">Hindi &amp; English (Bilingual)</option>
                          <option value="English Medium">English Medium</option>
                          <option value="Hindi Medium">Hindi Medium</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] text-white font-black text-xs shadow-lg shadow-indigo-950/20 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>{isSubmitting ? "Submitting Request..." : "Request Instant Callback & Free Trial"}</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          )}

          {/* TAB 2: 1-CLICK LOGIN */}
          {activeTab === "login" && (
            <div className="space-y-5 text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#050071] mx-auto flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg">Instant Student &amp; Instructor Login</h3>
                <p className="text-xs text-slate-500">
                  Access your enrolled batches, live classrooms, formula books, and test series.
                </p>
              </div>

              <div className="max-w-sm mx-auto space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    loginWithGoogle();
                    handleClose();
                    router.push("/dashboard");
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-400 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    href="/dashboard"
                    onClick={handleClose}
                    className="py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-[#5751E1] font-bold text-xs rounded-xl border border-indigo-200 text-center transition-colors"
                  >
                    Student Portal
                  </Link>
                  <Link
                    href="/instructor/dashboard"
                    onClick={handleClose}
                    className="py-2.5 px-3 bg-purple-50 hover:bg-purple-100 text-[#2D1B69] font-bold text-xs rounded-xl border border-purple-200 text-center transition-colors"
                  >
                    Instructor Studio
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LIVE NEWS FEED */}
          {activeTab === "news" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900 text-lg">Verified Academic Bulletins</h3>
                <Link
                  href="/news"
                  onClick={handleClose}
                  className="text-xs font-bold text-[#5751E1] hover:underline"
                >
                  View All News
                </Link>
              </div>

              <div className="space-y-3">
                {newsFeed.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={handleClose}
                    className="block p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-indigo-50/40 hover:border-indigo-200 transition-all space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-[#5751E1] font-extrabold text-[10px]">
                        {item.badge}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#5751E1] transition-colors" />
                    </div>
                    <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-[#5751E1] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FREE STUDY MATERIAL */}
          {activeTab === "materials" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900 text-lg">Instant Free Study Downloads</h3>
                <Link
                  href="/ebooks"
                  onClick={handleClose}
                  className="text-xs font-bold text-[#5751E1] hover:underline"
                >
                  Open eBook Library
                </Link>
              </div>

              <div className="space-y-3">
                {studyMaterials.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                        {item.type} • {item.size}
                      </div>
                      <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                    </div>

                    <Link
                      href={item.href}
                      onClick={handleClose}
                      className="px-4 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors flex-shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
