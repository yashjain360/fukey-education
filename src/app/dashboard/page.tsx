"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  ShieldCheck
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useModal } from "@/components/ui/CustomModal";
import { coursesData } from "@/data/coursesData";
import { DashboardMetricSkeleton, TableRowSkeleton } from "@/components/ui/Skeleton";

export default function StudentDashboardPage() {
  const { user, logout, switchRole } = useAuth();
  const { openModal } = useModal();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "orders" | "live" | "courses" | "wishlist" | "reviews" | "quizzes" | "settings"
  >("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/orders?email=${encodeURIComponent(user?.email || "mayank@fukeyeducation.com")}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.orders && data.orders.length > 0) {
          setOrders(data.orders);
        } else {
          setOrders([
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
          ]);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSwitchToInstructor = () => {
    switchRole("instructor");
    router.push("/instructor/dashboard");
  };

  const handleDownloadInvoice = (invoice: string) => {
    openModal({
      type: "download",
      title: `Official Invoice Receipt`,
      subtitle: `Invoice #${invoice} • Paid via Verified Gateway`,
    });
  };

  const handleDownloadNotes = (title: string) => {
    openModal({
      type: "download",
      title: `Chapter Revision Notes PDF`,
      subtitle: `Complete formula sheets and solved examples for ${title}`,
    });
  };

  const handleJoinLiveRoom = () => {
    openModal({
      type: "video",
      title: "Class 10th Maths: Quadratic Equations",
      subtitle: "Faculty: Pawan Gupta • Live Interactive Lecture",
    });
  };

  const enrolledCourses = coursesData.slice(0, 2);

  return (
    <div className="bg-slate-50/60 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Top Header Banner with Doodle Motif (Matching Screenshot 2) */}
        <div className="relative rounded-3xl overflow-hidden bg-[#2D1B69] border border-indigo-900 shadow-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-20 h-20 rounded-full border-4 border-white/80 overflow-hidden bg-indigo-100 flex-shrink-0 shadow-lg relative">
              <div className="w-full h-full bg-[#5751E1] flex items-center justify-center text-white font-black text-2xl">
                {user?.name ? user.name.charAt(0) : "M"}
              </div>
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {user?.name || "Mayank Dubey"}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Verified Student Pass 2026-27</span>
                </span>
              </div>
              <div className="text-xs text-indigo-200 font-medium">
                {user?.email || "mayank@fukeyeducation.com"}
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-800/60 text-indigo-200 text-[10px] font-bold">
                <span>CBSE Target Batch Active</span>
              </div>
            </div>
          </div>

          {/* Right Action: Instructor Dashboard Switcher */}
          <div className="relative z-10">
            <button
              onClick={handleSwitchToInstructor}
              className="px-6 py-3 rounded-2xl bg-[#FF2424] hover:bg-red-700 text-white font-extrabold text-xs shadow-lg shadow-red-900/30 flex items-center gap-2"
            >
              <span>Instructor Dashboard</span>
              <ArrowRight className="w-4 h-4" />
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
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left ${
                    activeTab === "dashboard"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left ${
                    activeTab === "orders"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Order History</span>
                </button>

                <button
                  onClick={() => setActiveTab("live")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left ${
                    activeTab === "live"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Live Classes</span>
                </button>

                <button
                  onClick={() => setActiveTab("courses")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left ${
                    activeTab === "courses"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Enrolled Courses</span>
                </button>

                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left ${
                    activeTab === "wishlist"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </button>

                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left ${
                    activeTab === "reviews"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reviews</span>
                </button>

                <button
                  onClick={() => setActiveTab("quizzes")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left ${
                    activeTab === "quizzes"
                      ? "bg-indigo-50 text-[#5751E1]"
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
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left ${
                  activeTab === "settings"
                    ? "bg-indigo-50 text-[#5751E1]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 text-left"
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

                  {/* 3 Metric Cards / Skeletons (Matching Screenshot 2) */}
                  {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <DashboardMetricSkeleton />
                      <DashboardMetricSkeleton />
                      <DashboardMetricSkeleton />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {/* Card 1: Enrolled Courses */}
                      <div className="bg-[#EBF2FF] rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-2 border border-blue-100">
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
                      <div className="bg-[#F8EFFF] rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-2 border border-purple-100">
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
                      <div className="bg-[#FDF0F6] rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-2 border border-pink-100">
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
                  )}
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
                        <tr className="bg-[#EBF2FF] text-[#1E3A8A] font-extrabold uppercase">
                          <th className="p-3.5 rounded-l-xl">No</th>
                          <th className="p-3.5">Invoice</th>
                          <th className="p-3.5">Paid</th>
                          <th className="p-3.5">Gateway</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 rounded-r-xl">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                          <>
                            <TableRowSkeleton />
                            <TableRowSkeleton />
                          </>
                        ) : orders.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="text-center py-8 text-slate-400 font-medium">
                              No orders found!
                            </td>
                          </tr>
                        ) : (
                          orders.map((ord, idx) => (
                            <tr key={ord.invoice || idx} className="hover:bg-slate-50">
                              <td className="p-3.5 font-bold text-slate-700">{idx + 1}</td>
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
                                  onClick={() => handleDownloadInvoice(ord.invoice)}
                                  className="px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-[#5751E1] font-bold text-[11px] flex items-center gap-1"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span>Receipt</span>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Subtle TheWebVale Portal Branding */}
                <div className="text-center pt-2">
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                    <span>Engineered with ❤️ by</span>
                    <a
                      href="https://thewebvale.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-slate-600 hover:text-[#5751E1] transition-colors underline decoration-slate-300 underline-offset-2"
                    >
                      TheWebVale
                    </a>
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
                      className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-4"
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
                          className="px-4 py-2 rounded-xl bg-[#050071] text-white font-bold text-xs flex items-center gap-1.5"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Lecture</span>
                        </Link>
                        <button
                          onClick={() => handleDownloadNotes(c.title)}
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
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-black text-xs">
                    ● LIVE NOW
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-[#050071] text-white space-y-4 shadow-lg">
                  <div className="text-xs text-orange-300 font-extrabold uppercase tracking-wider">
                    Class 10th CBSE Mathematics
                  </div>
                  <h3 className="text-xl font-black">Chapter 4: Quadratic Equations - Fast Track Shortcuts</h3>
                  <div className="text-xs text-indigo-200">
                    Faculty: Pawan Gupta • Today 5:00 PM – 6:30 PM IST
                  </div>
                  <button
                    onClick={handleJoinLiveRoom}
                    className="px-6 py-3 rounded-xl bg-[#FF2424] hover:bg-red-700 text-white font-black text-xs shadow-md flex items-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Live Class Now</span>
                  </button>
                </div>
              </div>
            )}

            {/* Fallback for other tabs */}
            {(activeTab === "orders" || activeTab === "wishlist" || activeTab === "reviews" || activeTab === "quizzes" || activeTab === "settings") && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-black text-slate-900 capitalize">{activeTab} Details</h2>
                <p className="text-xs text-slate-500">
                  Manage your academic records, reviews, and profile settings seamlessly.
                </p>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600">
                  All active certificates and test results are automatically synchronized with your official student portal.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
