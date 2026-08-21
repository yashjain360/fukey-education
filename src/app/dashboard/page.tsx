"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutGrid,
  FileText,
  Video,
  GraduationCap,
  Heart,
  MessageSquare,
  Lightbulb,
  User,
  LogOut,
  ArrowRight,
  Download,
  Play,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { coursesData } from "@/data/coursesData";
import { triggerConfetti } from "@/lib/confetti";

export default function StudentDashboardPage() {
  const { user, logout, switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "orders" | "live" | "courses" | "wishlist" | "reviews" | "quizzes" | "settings"
  >("dashboard");
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSwitchToInstructor = () => {
    switchRole("instructor");
    router.push("/instructor/dashboard");
  };

  const orders = [
    {
      no: 1,
      invoice: "INV-2026-89412",
      paid: "₹1,499.00",
      gateway: "UPI / PhonePe",
      status: "Success",
      date: "21 Aug 2026",
      courseTitle: "MATHS 10TH (HINDI)",
    },
    {
      no: 2,
      invoice: "INV-2026-78105",
      paid: "₹1,499.00",
      gateway: "Razorpay / Card",
      status: "Success",
      date: "14 Aug 2026",
      courseTitle: "SCIENCE 10TH (ENGLISH)",
    }
  ];

  const enrolledCourses = coursesData.slice(0, 2);

  return (
    <div className="bg-slate-50/60 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Top Header Banner with Doodle Motif (Matching Screenshot 2) */}
        <div className="relative rounded-3xl overflow-hidden bg-[#2D1B69] border border-indigo-900 shadow-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Abstract Doodle Pattern SVG Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-20 h-20 rounded-full border-4 border-white/80 overflow-hidden bg-indigo-100 flex-shrink-0 shadow-lg relative">
              <div className="w-full h-full bg-gradient-to-tr from-indigo-700 to-purple-600 flex items-center justify-center text-white font-black text-2xl">
                {user?.name ? user.name.charAt(0) : "M"}
              </div>
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {user?.name || "Mayank Dubey"}
              </h1>
              <div className="text-xs text-indigo-200 font-medium">
                {user?.email || "mayank@fukeyeducation.com"}
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active Student Pass 2026-27</span>
              </div>
            </div>
          </div>

          {/* Right Action: Instructor Dashboard Switcher */}
          <div className="relative z-10">
            <button
              onClick={handleSwitchToInstructor}
              className="px-6 py-3 rounded-2xl bg-[#FF2424] hover:bg-red-700 text-white font-extrabold text-xs shadow-lg shadow-red-900/30 flex items-center gap-2 group transition-all hover:scale-105 active:scale-95"
            >
              <span>Instructor Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Dashboard Grid Layout (Sidebar + Main Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Navigation (Matching Screenshot 2) */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-3 py-1">
                Welcome, {user?.name || "Mayank Dubey"}
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                    activeTab === "dashboard"
                      ? "bg-indigo-50 text-[#5751E1] shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                    activeTab === "orders"
                      ? "bg-indigo-50 text-[#5751E1] shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Order History</span>
                </button>

                <button
                  onClick={() => setActiveTab("live")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                    activeTab === "live"
                      ? "bg-indigo-50 text-[#5751E1] shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Live Classes</span>
                  <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </button>

                <button
                  onClick={() => setActiveTab("courses")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                    activeTab === "courses"
                      ? "bg-indigo-50 text-[#5751E1] shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Enrolled Courses</span>
                </button>

                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                    activeTab === "wishlist"
                      ? "bg-indigo-50 text-[#5751E1] shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </button>

                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                    activeTab === "reviews"
                      ? "bg-indigo-50 text-[#5751E1] shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reviews</span>
                </button>

                <button
                  onClick={() => setActiveTab("quizzes")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                    activeTab === "quizzes"
                      ? "bg-indigo-50 text-[#5751E1] shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>My Quiz Attempts</span>
                </button>
              </nav>
            </div>

            {/* USER Section */}
            <div className="pt-4 border-t border-slate-100 space-y-1">
              <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-3 py-1">
                User
              </div>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                  activeTab === "settings"
                    ? "bg-indigo-50 text-[#5751E1] shadow-xs"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-9 space-y-8">
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Dashboard</h2>

                  {/* 3 Metric Cards (Matching Screenshot 2) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Card 1: Enrolled Courses */}
                    <div className="bg-[#EBF2FF] rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-2 border border-blue-100 shadow-xs">
                      <div className="w-14 h-14 rounded-full bg-[#D4E4FC] text-[#3B82F6] flex items-center justify-center mb-1">
                        <GraduationCap className="w-7 h-7" />
                      </div>
                      <div className="text-4xl font-black text-[#1E3A8A]">
                        {enrolledCourses.length}
                      </div>
                      <div className="text-[11px] font-extrabold text-[#3B82F6] uppercase tracking-wider">
                        Enrolled Courses
                      </div>
                    </div>

                    {/* Card 2: Quiz Attempts */}
                    <div className="bg-[#F8EFFF] rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-2 border border-purple-100 shadow-xs">
                      <div className="w-14 h-14 rounded-full bg-[#EAD4FC] text-[#A855F7] flex items-center justify-center mb-1">
                        <Lightbulb className="w-7 h-7" />
                      </div>
                      <div className="text-4xl font-black text-[#581C87]">
                        {user?.quizAttemptsCount || 0}
                      </div>
                      <div className="text-[11px] font-extrabold text-[#A855F7] uppercase tracking-wider">
                        Quiz Attempts
                      </div>
                    </div>

                    {/* Card 3: Total Reviews */}
                    <div className="bg-[#FDF0F6] rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-2 border border-pink-100 shadow-xs">
                      <div className="w-14 h-14 rounded-full bg-[#FBD7E8] text-[#EC4899] flex items-center justify-center mb-1">
                        <MessageSquare className="w-7 h-7" />
                      </div>
                      <div className="text-4xl font-black text-[#831843]">
                        {user?.totalReviewsCount?.toLocaleString() || "3,300"}
                      </div>
                      <div className="text-[11px] font-extrabold text-[#EC4899] uppercase tracking-wider">
                        Your Total Reviews
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order History Table (Matching Screenshot 2) */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900">Order History</h3>
                    <span className="text-xs font-bold text-slate-400">{orders.length} Invoices</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-[#EBF2FF] text-[#1E3A8A] font-extrabold uppercase rounded-2xl">
                          <th className="p-3.5 rounded-l-xl">No</th>
                          <th className="p-3.5">Invoice</th>
                          <th className="p-3.5">Paid</th>
                          <th className="p-3.5">Gateway</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 rounded-r-xl">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.map((ord) => (
                          <tr key={ord.no} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3.5 font-bold text-slate-700">{ord.no}</td>
                            <td className="p-3.5 font-mono font-semibold text-slate-800">{ord.invoice}</td>
                            <td className="p-3.5 font-black text-slate-900">{ord.paid}</td>
                            <td className="p-3.5 text-slate-600">{ord.gateway}</td>
                            <td className="p-3.5">
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                {ord.status}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <button
                                onClick={() => {
                                  triggerConfetti();
                                  alert(`Downloading receipt for ${ord.invoice}`);
                                }}
                                className="px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-[#5751E1] font-bold text-[11px] flex items-center gap-1"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Receipt</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Enrolled Courses Tab */}
            {activeTab === "courses" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-xl font-black text-slate-900">My Active Batches</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {enrolledCourses.map((c) => (
                    <div
                      key={c.id}
                      className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-[#5751E1] font-bold">
                          {c.class}
                        </span>
                        <span className="text-emerald-600 font-bold">● Active 100%</span>
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900">{c.title}</h3>
                      <div className="text-xs text-slate-500">Instructor: {c.instructor}</div>

                      <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                        <Link
                          href={`/course/${c.slug}`}
                          className="px-4 py-2 rounded-xl bg-[#050071] text-white font-bold text-xs flex items-center gap-1.5 hover:bg-indigo-900 transition-colors"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Lecture</span>
                        </Link>
                        <button
                          onClick={() => alert("Downloading chapter notes PDF...")}
                          className="text-xs font-bold text-indigo-600 hover:underline"
                        >
                          Notes PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live Classes Tab */}
            {activeTab === "live" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-slate-900">Today&apos;s Live Classroom Schedule</h2>
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-black text-xs animate-pulse">
                    ● LIVE NOW
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-gradient-to-r from-[#050071] to-[#5751E1] text-white space-y-4 shadow-lg">
                  <div className="text-xs text-orange-300 font-extrabold uppercase tracking-wider">
                    Class 10th CBSE Mathematics
                  </div>
                  <h3 className="text-xl font-black">Chapter 4: Quadratic Equations - Fast Track Shortcuts</h3>
                  <div className="text-xs text-indigo-200">
                    Faculty: Pawan Gupta • Today 5:00 PM – 6:30 PM IST
                  </div>
                  <button
                    onClick={() => {
                      triggerConfetti();
                      alert("Connecting to live video lecture room...");
                    }}
                    className="px-6 py-3 rounded-xl bg-[#FF2424] hover:bg-red-700 text-white font-black text-xs shadow-md flex items-center gap-2 transition-all hover:scale-105"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Live Class Now</span>
                  </button>
                </div>
              </div>
            )}

            {/* Default fallback for other tabs */}
            {(activeTab === "orders" || activeTab === "wishlist" || activeTab === "reviews" || activeTab === "quizzes" || activeTab === "settings") && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-black text-slate-900 capitalize">{activeTab} Details</h2>
                <p className="text-xs text-slate-500">
                  Manage your academic records, reviews, and profile settings seamlessly.
                </p>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600">
                  All active certificates and test results are automatically synchronized with your student portal.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
