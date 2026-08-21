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
  HelpCircle,
  Clock,
  User,
  LogOut,
  ArrowRight,
  Play,
  Download,
  Calendar,
  Sparkles,
  Award,
  CheckCircle2,
  Lock,
  Save,
  Bell,
  Phone,
  Mail,
  ShieldCheck,
  Camera,
  Check,
  Flame,
  Target,
  BookOpen,
  TrendingUp,
  ChevronRight,
  Plus,
  Send,
  X,
  ExternalLink,
  Receipt,
  FileSpreadsheet
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useModal } from "@/components/ui/CustomModal";
import { useCart } from "@/components/cart/CartContext";
import { coursesData, Course } from "@/data/coursesData";
import { triggerConfetti } from "@/lib/confetti";
import { formatPrice } from "@/lib/utils";
import Pagination from "@/components/ui/Pagination";

export default function StudentDashboardPage() {
  const { user, logout, switchRole } = useAuth();
  const { currency } = useCart();
  const { openModal } = useModal();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "courses" | "live" | "tests" | "doubts" | "orders" | "wishlist" | "settings"
  >("dashboard");

  // Tab Pagination States
  const [coursesPage, setCoursesPage] = useState(1);
  const [doubtsPage, setDoubtsPage] = useState(1);
  const [ordersPage, setOrdersPage] = useState(1);
  const [wishlistPage, setWishlistPage] = useState(1);

  // Dynamic state
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [studentGoals, setStudentGoals] = useState([
    { id: "g1", title: "Complete Quadratic Equations NCERT Derivations", done: true },
    { id: "g2", title: "Attempt Chapter 4 Science Chemical Reactions Mock Test", done: false },
    { id: "g3", title: "Revise Ray Optics 10-Year Board PYQs", done: false },
    { id: "g4", title: "Attend Saturday 5:00 PM Live Doubt Clearance Room", done: false }
  ]);
  const [newGoalText, setNewGoalText] = useState("");

  // Ask Doubt Modal State
  const [askDoubtOpen, setAskDoubtOpen] = useState(false);
  const [doubtSubject, setDoubtSubject] = useState("Mathematics");
  const [doubtQuestion, setDoubtQuestion] = useState("");
  const [doubtList, setDoubtList] = useState([
    {
      id: "d-1",
      subject: "Mathematics",
      question: "Sir, in Quadratic Equations, when discriminant D < 0, how do we write the final board step?",
      status: "Answered by Pawan Gupta",
      answer: "Write: 'Since D = b² - 4ac < 0, no real roots exist for this equation.' Full marks are awarded for this exact phrasing.",
      time: "Yesterday"
    },
    {
      id: "d-2",
      subject: "Science",
      question: "Difference between exothermic and endothermic reaction with 2 real-life examples?",
      status: "Faculty Reviewing...",
      answer: null,
      time: "2 hours ago"
    }
  ]);

  // Profile Settings Form State
  const [profileName, setProfileName] = useState(user?.name || "Mayank Dubey");
  const [profileEmail, setProfileEmail] = useState(user?.email || "mayank@fukeyeducation.com");
  const [profilePhone, setProfilePhone] = useState(user?.phone || "+91 88718 35015");
  const [targetClass, setTargetClass] = useState("Class 10");
  const [targetBoard, setTargetBoard] = useState("CBSE");
  const [medium, setMedium] = useState("Hindi & English (Bilingual)");
  const [targetGoal, setTargetGoal] = useState("Score 95%+ in Board Examination 2026-27");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80");
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Orders State
  const [orders, setOrders] = useState([
    {
      id: "ORD-2026-9812",
      date: "2026-08-14",
      course: "Class 10th Complete Mathematics (Hindi Medium)",
      amount: 1499,
      status: "Completed",
      paymentMode: "UPI (Google Pay)"
    },
    {
      id: "ORD-2026-7734",
      date: "2026-08-10",
      course: "Class 10th Science Master Batch (Physics, Chemistry & Biology)",
      amount: 2499,
      status: "Completed",
      paymentMode: "Razorpay / Cards"
    }
  ]);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.courses && data.courses.length > 0) setCourses(data.courses);
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSwitchToInstructor = () => {
    switchRole("instructor");
    router.push("/instructor/dashboard");
  };

  const handleSwitchToAdmin = () => {
    switchRole("admin");
    router.push("/admin");
  };

  const handleToggleGoal = (id: string) => {
    setStudentGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g))
    );
    triggerConfetti();
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoalText.trim()) {
      setStudentGoals((prev) => [
        ...prev,
        { id: `g-${Date.now()}`, title: newGoalText.trim(), done: false }
      ]);
      setNewGoalText("");
      triggerConfetti();
    }
  };

  const handleAskDoubtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtQuestion.trim()) return;

    setDoubtList((prev) => [
      {
        id: `d-${Date.now()}`,
        subject: doubtSubject,
        question: doubtQuestion.trim(),
        status: "Faculty Reviewing...",
        answer: null,
        time: "Just now"
      },
      ...prev
    ]);
    setDoubtQuestion("");
    setAskDoubtOpen(false);
    triggerConfetti();
    alert("Your doubt has been submitted to the faculty lead!");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (user) {
        const updatedUser = {
          ...user,
          name: profileName,
          phone: profilePhone,
          avatar: avatarUrl,
        };
        localStorage.setItem("fukey_auth_user", JSON.stringify(updatedUser));
      }
      triggerConfetti();
      alert("Profile and Academic Settings successfully updated!");
    } finally {
      setIsSaving(false);
    }
  };

  const enrolledCourses = courses.slice(0, 2);

  return (
    <div className="bg-slate-50/60 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Top Header Banner with Dynamic Role Switchers */}
        <div
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#5751E1] border border-indigo-900 shadow-xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6"
          data-aos="fade-down"
          data-aos-duration="750"
        >
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-20 h-20 rounded-full border-4 border-white/80 overflow-hidden bg-indigo-100 flex-shrink-0 shadow-lg relative">
              <img
                src={avatarUrl}
                alt="Student Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";
                }}
              />
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {profileName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Verified Student Pass 2026-27</span>
                </span>
              </div>
              <div className="text-xs text-indigo-200 font-medium">
                {profileEmail} • {profilePhone}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-800/60 text-indigo-200 text-[10px] font-bold">
                <span>{targetBoard} {targetClass} • {medium}</span>
              </div>
            </div>
          </div>

          {/* Quick Universal Role Switchers */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setAskDoubtOpen(true)}
              className="px-5 py-3 rounded-2xl bg-[#FF2424] hover:bg-red-700 text-white font-extrabold text-xs shadow-lg shadow-red-900/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Ask Faculty Doubt</span>
            </button>

            <Link
              href="/live/room-maths-10-quadratics"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Video className="w-4 h-4 animate-icon-pulse" />
              <span>Join Live Class</span>
            </Link>

            <button
              onClick={handleSwitchToInstructor}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Faculty Portal
            </button>

            <button
              onClick={handleSwitchToAdmin}
              className="px-4 py-3 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 font-bold text-xs transition-colors cursor-pointer"
            >
              Master Admin
            </button>
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Navigation */}
          <div
            className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6"
            data-aos="fade-right"
          >
            <div className="space-y-1">
              <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-3 py-1">
                Student Learning Center
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer transition-all ${
                    activeTab === "dashboard"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Dashboard Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab("courses")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer transition-all ${
                    activeTab === "courses"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Enrolled Batches ({enrolledCourses.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("live")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer transition-all ${
                    activeTab === "live"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Live Classes Hub</span>
                </button>

                <button
                  onClick={() => setActiveTab("tests")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer transition-all ${
                    activeTab === "tests"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Online Test Series</span>
                </button>

                <button
                  onClick={() => setActiveTab("doubts")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer transition-all ${
                    activeTab === "doubts"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>My Doubts ({doubtList.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer transition-all ${
                    activeTab === "orders"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Invoices &amp; Orders ({orders.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer transition-all ${
                    activeTab === "wishlist"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Saved Courses ({courses.slice(0, 3).length})</span>
                </button>
              </nav>
            </div>

            {/* USER Section */}
            <div className="pt-4 border-t border-slate-100 space-y-1">
              <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-3 py-1">
                Account
              </div>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer transition-all ${
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
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-9 space-y-8" data-aos="fade-left">
            {/* TAB 1: DASHBOARD OVERVIEW */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Learning Dashboard</h2>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#EBF2FF] rounded-3xl p-5 flex flex-col items-center justify-center text-center space-y-1 border border-blue-100">
                      <div className="w-10 h-10 rounded-full bg-[#D4E4FC] text-[#3B82F6] flex items-center justify-center mb-1">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="text-2xl font-black text-[#1E3A8A]">{enrolledCourses.length} Batches</div>
                      <div className="text-[10px] font-extrabold text-[#3B82F6] uppercase">Enrolled Courses</div>
                    </div>

                    <div className="bg-[#F8EFFF] rounded-3xl p-5 flex flex-col items-center justify-center text-center space-y-1 border border-purple-100">
                      <div className="w-10 h-10 rounded-full bg-[#EAD4FC] text-[#A855F7] flex items-center justify-center mb-1">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="text-2xl font-black text-[#581C87]">94.2%</div>
                      <div className="text-[10px] font-extrabold text-[#A855F7] uppercase">Mock Test Percentile</div>
                    </div>

                    <div className="bg-[#FFF4EB] rounded-3xl p-5 flex flex-col items-center justify-center text-center space-y-1 border border-orange-100">
                      <div className="w-10 h-10 rounded-full bg-[#FFE2CC] text-[#F97316] flex items-center justify-center mb-1">
                        <Flame className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="text-2xl font-black text-[#9A3412]">7 Days 🔥</div>
                      <div className="text-[10px] font-extrabold text-[#F97316] uppercase">Study Streak</div>
                    </div>

                    <div className="bg-emerald-50 rounded-3xl p-5 flex flex-col items-center justify-center text-center space-y-1 border border-emerald-100">
                      <div className="w-10 h-10 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center mb-1">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="text-2xl font-black text-emerald-900">48 Hrs</div>
                      <div className="text-[10px] font-extrabold text-emerald-700 uppercase">Live Attendance</div>
                    </div>
                  </div>
                </div>

                {/* Live Class Radar Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full bg-red-500 text-white font-black text-[10px] uppercase tracking-wider animate-pulse flex items-center gap-1.5 w-fit">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <span>Live Classroom Broadcasting Now</span>
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black">
                      Class 10th Maths: Quadratic Equations
                    </h3>
                    <p className="text-xs text-indigo-200">
                      Senior Faculty: Pawan Gupta • 45-Min Lecture + 15-Min 1-on-1 Voice Doubt Room
                    </p>
                  </div>

                  <Link
                    href="/live/room-maths-10-quadratics"
                    className="px-6 py-3.5 rounded-2xl bg-[#FF2424] hover:bg-red-700 text-white font-black text-xs shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Live Lecture Room</span>
                  </Link>
                </div>

                {/* Interactive Goal Tracker */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <Target className="w-5 h-5 text-indigo-600" />
                        <span>Daily Board Preparation Checkpoints</span>
                      </h3>
                      <p className="text-xs text-slate-500">Tick off tasks as you complete video lessons and revision notes</p>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      {studentGoals.filter((g) => g.done).length} / {studentGoals.length} Completed
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {studentGoals.map((goal) => (
                      <div
                        key={goal.id}
                        onClick={() => handleToggleGoal(goal.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          goal.done
                            ? "bg-emerald-50/50 border-emerald-200 text-slate-500 line-through"
                            : "bg-slate-50 border-slate-200 text-slate-800 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                              goal.done ? "bg-emerald-500 border-emerald-600 text-white" : "border-slate-400"
                            }`}
                          >
                            {goal.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-semibold">{goal.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleAddGoal} className="flex gap-2 pt-2">
                    <input
                      type="text"
                      value={newGoalText}
                      onChange={(e) => setNewGoalText(e.target.value)}
                      placeholder="Add custom target (e.g. Solve 20 questions on Trigonometry)..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Target</span>
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 2: ENROLLED COURSES */}
            {activeTab === "courses" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Enrolled Batches &amp; Learning Progress</h2>
                  <p className="text-xs text-slate-500">Access video lectures, formula sheets, and chapter tests</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {enrolledCourses
                    .slice((coursesPage - 1) * 4, coursesPage * 4)
                    .map((c) => (
                      <div key={c.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-[#5751E1] font-bold">
                            {c.class} • {c.subject}
                          </span>
                          <span className="text-emerald-600 font-bold">● Active</span>
                        </div>
                        <h3 className="font-extrabold text-sm text-slate-900">{c.title}</h3>
                        <div className="text-xs text-slate-500">Faculty: {c.instructor}</div>

                        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                          <Link
                            href={`/course/${c.slug}`}
                            className="px-4 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs flex items-center gap-1.5"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Enter Classroom</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>

                <Pagination
                  currentPage={coursesPage}
                  totalItems={enrolledCourses.length}
                  itemsPerPage={4}
                  onPageChange={(page) => setCoursesPage(page)}
                  pageSizeOptions={[4, 8, 12]}
                />
              </div>
            )}

            {/* TAB 3: LIVE CLASSES */}
            {activeTab === "live" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Today&apos;s Live Classroom Schedule</h2>
                    <p className="text-xs text-slate-500">Interactive live streaming with digital whiteboard and 1-on-1 audio doubt queue</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-black text-xs">
                    ● BROADCASTING
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
                  <Link
                    href="/live/room-maths-10-quadratics"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF2424] hover:bg-red-700 text-white font-black text-xs shadow-md transition-all hover:scale-105"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Live Studio Now</span>
                  </Link>
                </div>
              </div>
            )}

            {/* TAB 4: ONLINE TEST SERIES */}
            {activeTab === "tests" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Board Mock Test Series</h2>
                    <p className="text-xs text-slate-500">Proctored assessments with anti-cheating security and percentile rank</p>
                  </div>
                  <Link
                    href="/test-series"
                    className="text-xs font-bold text-[#5751E1] hover:underline"
                  >
                    View All Tests
                  </Link>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-extrabold text-sm text-slate-900">
                      Class 10th Mathematics: Full Chapter Test (Quadratic Equations)
                    </div>
                    <div className="text-xs text-slate-500">45 Minutes • 20 Marks • Anti-Cheating Monitored</div>
                  </div>
                  <Link
                    href="/test/test-maths-10-quadratics"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#050071] to-[#5751E1] text-white font-bold text-xs shadow-sm"
                  >
                    Start Test
                  </Link>
                </div>
              </div>
            )}

            {/* TAB 5: MY DOUBTS & Q&A */}
            {activeTab === "doubts" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">My Doubts &amp; Faculty Answers</h2>
                    <p className="text-xs text-slate-500">Track responses from senior board faculties</p>
                  </div>
                  <button
                    onClick={() => setAskDoubtOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#050071] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ask New Doubt</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {doubtList
                    .slice((doubtsPage - 1) * 4, doubtsPage * 4)
                    .map((d) => (
                      <div key={d.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                            {d.subject}
                          </span>
                          <span className="text-slate-400 text-[11px]">{d.time}</span>
                        </div>

                        <p className="text-xs font-bold text-slate-900">Q: {d.question}</p>

                        {d.answer ? (
                          <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                            <div className="font-bold text-emerald-800">Faculty Response:</div>
                            <div>{d.answer}</div>
                          </div>
                        ) : (
                          <div className="text-[11px] text-amber-700 font-semibold flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                            <span>Assigned to faculty lead for step-by-step resolution...</span>
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                <Pagination
                  currentPage={doubtsPage}
                  totalItems={doubtList.length}
                  itemsPerPage={4}
                  onPageChange={(page) => setDoubtsPage(page)}
                  pageSizeOptions={[4, 8, 12]}
                />
              </div>
            )}

            {/* TAB 6: INVOICES & ORDERS */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Enrolled Batches &amp; Official Invoices</h2>
                  <p className="text-xs text-slate-500">Tax invoices and payment verification receipts</p>
                </div>

                <div className="space-y-3">
                  {orders
                    .slice((ordersPage - 1) * 4, ordersPage * 4)
                    .map((o) => (
                      <div key={o.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-slate-600">{o.id}</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase">
                              {o.status}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-sm text-slate-900">{o.course}</h4>
                          <div className="text-xs text-slate-500">{o.date} • {o.paymentMode}</div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-black text-base text-[#050071]">{formatPrice(o.amount, currency)}</span>
                          <button
                            onClick={() => {
                              triggerConfetti();
                              alert(`Downloading GST Invoice receipt for ${o.id}...`);
                            }}
                            className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-[#050071] hover:text-white text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Receipt className="w-3.5 h-3.5" />
                            <span>Invoice PDF</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                <Pagination
                  currentPage={ordersPage}
                  totalItems={orders.length}
                  itemsPerPage={4}
                  onPageChange={(page) => setOrdersPage(page)}
                  pageSizeOptions={[4, 8, 12]}
                />
              </div>
            )}

            {/* TAB 7: WISHLIST */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Saved Wishlist Batches</h2>
                  <p className="text-xs text-slate-500">Batches shortlisted for your upcoming board preparation</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses
                    .slice((wishlistPage - 1) * 6, wishlistPage * 6)
                    .map((c) => (
                      <div
                        key={c.id}
                        className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
                      >
                        <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden border-b border-slate-100 flex items-center justify-center">
                          <img src={c.thumbnail} alt={c.title} className="w-full h-full object-contain p-1" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white text-[#050071] font-extrabold text-[10px] uppercase">
                            {c.class}
                          </span>
                        </div>
                        <div className="p-5 space-y-3">
                          <h3 className="font-extrabold text-sm text-slate-900 line-clamp-2">{c.title}</h3>
                          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                            <span className="font-black text-[#050071]">{formatPrice(c.price, currency)}</span>
                            <Link href={`/course/${c.slug}`} className="text-[#5751E1] font-bold hover:underline">
                              Enroll Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <Pagination
                  currentPage={wishlistPage}
                  totalItems={courses.length}
                  itemsPerPage={6}
                  onPageChange={(page) => setWishlistPage(page)}
                  pageSizeOptions={[6, 12, 18]}
                />
              </div>
            )}

            {/* TAB 8: PROFILE SETTINGS */}
            {activeTab === "settings" && (
              <div className="space-y-8 animate-in fade-in">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-black text-slate-900">Student Profile &amp; Board Preferences</h2>
                      <p className="text-xs text-slate-500">Customize your name, contact phone, and target examination board</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                      ID: {user?.id || "STU-8821"}
                    </span>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-5 text-xs">
                    <div className="space-y-2">
                      <label className="block font-bold text-slate-700">Profile Photo / Avatar</label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#5751E1] shadow-md flex-shrink-0">
                          <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            placeholder="Enter image URL..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Email Address (Verified)</label>
                        <input
                          type="email"
                          disabled
                          value={profileEmail}
                          className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-500 font-medium cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">WhatsApp / Phone Number</label>
                        <input
                          type="text"
                          required
                          value={profilePhone}
                          onChange={(e) => setProfilePhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Class Level</label>
                        <select
                          value={targetClass}
                          onChange={(e) => setTargetClass(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold focus:outline-none"
                        >
                          <option value="Class 9">Class 9</option>
                          <option value="Class 10">Class 10</option>
                          <option value="Class 11">Class 11</option>
                          <option value="Class 12">Class 12</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Target Board</label>
                        <select
                          value={targetBoard}
                          onChange={(e) => setTargetBoard(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold focus:outline-none"
                        >
                          <option value="CBSE">CBSE Board</option>
                          <option value="MP Board">MP Board</option>
                          <option value="State Board">Other State Board</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-3 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] hover:brightness-110 text-white font-extrabold text-xs shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        {isSaving ? "Saving Preferences..." : "Save Profile Preferences"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MODAL: ASK DOUBT */}
        {askDoubtOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-extrabold text-base text-slate-900">Ask Faculty Doubt</h3>
                  <p className="text-xs text-slate-500">Get step-by-step mathematical &amp; scientific explanations</p>
                </div>
                <button onClick={() => setAskDoubtOpen(false)} className="p-1.5 rounded-full bg-slate-100 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAskDoubtSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={doubtSubject}
                    onChange={(e) => setDoubtSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold focus:outline-none"
                  >
                    <option value="Mathematics">Mathematics (Pawan Gupta)</option>
                    <option value="Science">Science (Kratika Rathore)</option>
                    <option value="Physics">Physics (Arya Dubey)</option>
                    <option value="Chemistry">Chemistry (Bhoopendra)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Question / Derivation Query</label>
                  <textarea
                    rows={4}
                    required
                    value={doubtQuestion}
                    onChange={(e) => setDoubtQuestion(e.target.value)}
                    placeholder="Type your question or NCERT problem statement..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setAskDoubtOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold shadow-md cursor-pointer"
                  >
                    Submit Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
