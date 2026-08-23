"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutGrid,
  FileText,
  Video,
  GraduationCap,
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
  ExternalLink,
  Receipt,
  FileSpreadsheet
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useModal } from "@/components/ui/CustomModal";
import ToastNotification from "@/components/ui/ToastNotification";
import { useCart } from "@/components/cart/CartContext";
import { coursesData, Course } from "@/data/coursesData";
import { triggerConfetti } from "@/lib/confetti";
import { formatPrice } from "@/lib/utils";
import Pagination from "@/components/ui/Pagination";

export default function StudentDashboardPage() {
  const { user, logout, switchRole, updateUser, isLoading: isAuthLoading } = useAuth();
  const { currency } = useCart();
  const { openModal } = useModal();
  const router = useRouter();

  type TabType = "dashboard" | "courses" | "live" | "recordings" | "tests" | "orders" | "settings";
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.replaceState(null, "", url.toString());
      localStorage.setItem("fukey_student_active_tab", tab);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tabParam = new URLSearchParams(window.location.search).get("tab") as TabType;
      const validTabs: TabType[] = ["dashboard", "courses", "live", "recordings", "tests", "orders", "settings"];
      if (tabParam && validTabs.includes(tabParam)) {
        setActiveTab(tabParam);
      } else {
        const savedTab = localStorage.getItem("fukey_student_active_tab") as TabType;
        if (savedTab && validTabs.includes(savedTab)) {
          setActiveTab(savedTab);
        }
      }
    }
  }, []);

  // Tab Pagination States
  const [coursesPage, setCoursesPage] = useState(1);
  const [ordersPage, setOrdersPage] = useState(1);

  // Dynamic state
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [studentGoals, setStudentGoals] = useState([
    { id: "g1", title: "Complete Quadratic Equations NCERT Derivations", done: true },
    { id: "g2", title: "Attempt Chapter 4 Science Chemical Reactions Mock Test", done: false },
    { id: "g3", title: "Revise Ray Optics 10-Year Board PYQs", done: false },
    { id: "g4", title: "Attend Saturday 5:00 PM Live Doubt Clearance Room", done: false }
  ]);
  const [newGoalText, setNewGoalText] = useState("");

  // Profile Settings Form State
  const [profileName, setProfileName] = useState(user?.name || "Student");
  const [profileEmail, setProfileEmail] = useState(user?.email || "");
  const [profilePhone, setProfilePhone] = useState(user?.phone || "");
  const [targetClass, setTargetClass] = useState("Class 10");
  const [targetBoard, setTargetBoard] = useState("CBSE");
  const [medium, setMedium] = useState("Hindi & English (Bilingual)");
  const [targetGoal, setTargetGoal] = useState("Score 95%+ in Board Examination 2026-27");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80");
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.name) setProfileName(user.name);
      if (user.email) setProfileEmail(user.email);
      if (user.phone !== undefined) setProfilePhone(user.phone || "");
      if (user.avatar) setAvatarUrl(user.avatar);
    }
  }, [user]);

  // Orders State
  const [orders, setOrders] = useState<any[]>([
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

  // Real Student Enrollments & Orders State from MongoDB
  const [studentEnrollments, setStudentEnrollments] = useState<any[]>([]);
  const [testHistory, setTestHistory] = useState<any[]>([]);
  const [liveClasses, setLiveClasses] = useState<any[]>([]);
  const [recordings, setRecordings] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.courses && data.courses.length > 0) setCourses(data.courses);
      })
      .catch(() => {});

    // Wait for auth to actually resolve before fetching anything personalized. Firing an
    // unfiltered /api/live/classes request during the brief window where `user` is still null
    // (before the session cookie loads) used to flash every live class — including ones this
    // student isn't enrolled in and can't join — for one render before the real, filtered fetch
    // replaced it. This page also redirects a genuinely logged-out visitor to /login, so there's
    // no legitimate anonymous case left to fetch a fallback list for.
    if (isAuthLoading) return;

    if (user?.email) {
      // 1. Fetch real student enrollments
      fetch(`/api/enrollments?email=${encodeURIComponent(user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.enrollments) {
            setStudentEnrollments(data.enrollments);
            const enrolledSlugs = data.enrollments.map((e: any) => e.courseSlug).filter(Boolean).join(",");

            // Fetch batch-targeted live classes
            fetch(`/api/live/classes${enrolledSlugs ? `?enrolledSlugs=${encodeURIComponent(enrolledSlugs)}` : ""}`)
              .then((res) => res.json())
              .then((lcData) => {
                if (lcData.classes) setLiveClasses(lcData.classes);
              })
              .catch(() => {});

            // Fetch past lectures (recordings) for the same enrolled batches
            fetch(`/api/live/recordings${enrolledSlugs ? `?enrolledSlugs=${encodeURIComponent(enrolledSlugs)}` : ""}`)
              .then((res) => res.json())
              .then((recData) => {
                if (recData.recordings) setRecordings(recData.recordings);
              })
              .catch(() => {});
          }
        })
        .catch(() => {});

      // 2. Fetch real student orders
      fetch(`/api/orders?email=${encodeURIComponent(user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.orders && data.orders.length > 0) setOrders(data.orders);
        })
        .catch(() => {});

      // 3. Fetch student test history
      fetch(`/api/tests/history?email=${encodeURIComponent(user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.history) setTestHistory(data.history);
        })
        .catch(() => {});
    }
  }, [user?.email, isAuthLoading]);

  const handleLogout = () => {
    logout();
    router.push("/login");
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

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (user) {
        await updateUser({
          name: profileName,
          phone: profilePhone,
          avatar: avatarUrl,
        });
      }
      triggerConfetti();
      showToast("Profile and Academic Settings successfully updated!");
    } catch (err) {
      showToast("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const enrolledCourses = studentEnrollments;

  if (!user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-indigo-100 text-[#050071] mx-auto flex items-center justify-center">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-black text-slate-900">Student Portal Sign In Required</h2>
            <p className="text-xs text-slate-500">
              Please sign in with your student credentials to view your enrolled batches, live lectures, and reports.
            </p>
          </div>
          <Link
            href="/login"
            className="w-full block py-3.5 rounded-xl bg-[#050071] hover:bg-indigo-900 text-white font-black text-xs shadow-md transition-all hover:scale-105"
          >
            Sign In to Student Dashboard →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/60 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Top Header Banner */}
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
                  {user.name || profileName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Verified Student Pass 2026-27</span>
                </span>
              </div>
              <div className="text-xs text-indigo-200 font-medium">
                {user.email || profileEmail} • {user.phone || profilePhone}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-800/60 text-indigo-200 text-[10px] font-bold">
                <span>{targetBoard} {targetClass} • {medium}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
            {liveClasses.some((c) => c.status === "LIVE_NOW") ? (
              <Link
                href={`/live/${liveClasses.find((c) => c.status === "LIVE_NOW")!.roomId}`}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Video className="w-4 h-4 animate-icon-pulse" />
                <span>Join Live Class</span>
              </Link>
            ) : (
              <button
                onClick={() => handleTabChange("live")}
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>No Live Class Right Now</span>
              </button>
            )}
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
                  onClick={() => handleTabChange("dashboard")}
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
                  onClick={() => handleTabChange("courses")}
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
                  onClick={() => handleTabChange("live")}
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
                  onClick={() => handleTabChange("recordings")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer transition-all ${
                    activeTab === "recordings"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Past Lectures ({recordings.length})</span>
                </button>

                <button
                  onClick={() => handleTabChange("tests")}
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
                  onClick={() => handleTabChange("orders")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer transition-all ${
                    activeTab === "orders"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Invoices &amp; Orders ({orders.length})</span>
                </button>

              </nav>
            </div>

            {/* USER Section */}
            <div className="pt-4 border-t border-slate-100 space-y-1">
              <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-3 py-1">
                Account
              </div>

              <button
                onClick={() => handleTabChange("settings")}
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

                {/* Live Class Radar Card — only shown when a batch of this student's is actually broadcasting */}
                {liveClasses.some((c) => c.status === "LIVE_NOW") && (() => {
                  const live = liveClasses.find((c) => c.status === "LIVE_NOW");
                  return (
                    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <span className="px-3 py-1 rounded-full bg-red-500 text-white font-black text-[10px] uppercase tracking-wider animate-pulse flex items-center gap-1.5 w-fit">
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                          <span>Live Classroom Broadcasting Now</span>
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black">{live.title}</h3>
                        <p className="text-xs text-indigo-200">
                          Senior Faculty: {live.instructor} • 45-Min Lecture + 15-Min 1-on-1 Voice Doubt Room
                        </p>
                      </div>

                      <Link
                        href={`/live/${live.roomId}`}
                        className="px-6 py-3.5 rounded-2xl bg-[#FF2424] hover:bg-red-700 text-white font-black text-xs shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                      >
                        <Video className="w-4 h-4" />
                        <span>Join Live Lecture Room</span>
                      </Link>
                    </div>
                  );
                })()}

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

                {enrolledCourses.length === 0 ? (
                  <div className="text-center py-12 px-4 rounded-3xl border-2 border-dashed border-slate-200 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-black text-slate-900">No Enrolled Batches Yet</h3>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        You have not been enrolled in any academic batches yet. Browse verified CBSE and State Board courses to get started.
                      </p>
                    </div>
                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs shadow-md transition-all hover:scale-105"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Browse Available Batches</span>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {enrolledCourses
                        .slice((coursesPage - 1) * 4, coursesPage * 4)
                        .map((c) => (
                          <div key={c.id || c.courseSlug} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-[#5751E1] font-bold">
                                {c.class || "Class 10"} • {c.subject || "Academic"}
                              </span>
                              <span className="text-emerald-600 font-bold">● Active</span>
                            </div>
                            <h3 className="font-extrabold text-sm text-slate-900">{c.courseTitle || c.title}</h3>
                            <div className="text-xs text-slate-500">Faculty: {c.instructor || "Senior Faculty"}</div>

                            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                              <Link
                                href={`/course/${(c.courseSlug || c.slug || "class-10th-complete-mathematics").replace(/^[-]+|[-]+$/g, "")}`}
                                className="px-4 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105"
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
                  </>
                )}
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
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-black text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                    <span>BROADCASTING</span>
                  </span>
                </div>

                <div className="space-y-4">
                  {liveClasses.length === 0 ? (
                    <div className="text-center py-12 px-4 rounded-3xl border-2 border-dashed border-slate-200 space-y-2">
                      <Video className="w-8 h-8 text-slate-300 mx-auto" />
                      <h3 className="text-sm font-black text-slate-900">No Live Class Scheduled Right Now</h3>
                      <p className="text-xs text-slate-500">Check back closer to your batch's scheduled time.</p>
                    </div>
                  ) : (
                    liveClasses.map((lc, idx) => (
                      <div
                        key={lc.roomId || idx}
                        className="p-6 rounded-3xl bg-[#050071] text-white space-y-3 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-orange-300 font-extrabold uppercase tracking-wider">
                              {lc.targetClass || "Class 10"} • {lc.subject}
                            </span>
                            {lc.status === "LIVE_NOW" && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-[10px] font-black uppercase">
                                ● Live Now
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg sm:text-xl font-black">{lc.title}</h3>
                          <div className="text-xs text-indigo-200">
                            Faculty: {lc.instructor} • {lc.scheduledTime}
                          </div>
                        </div>

                        <Link
                          href={`/live/${lc.roomId}`}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF2424] hover:bg-red-700 text-white font-black text-xs shadow-md transition-all hover:scale-105 whitespace-nowrap cursor-pointer"
                        >
                          <Video className="w-4 h-4" />
                          <span>Join Live Studio</span>
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 3B: PAST LECTURES (RECORDINGS) */}
            {activeTab === "recordings" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Past Lectures</h2>
                  <p className="text-xs text-slate-500">Cloud recordings of live classes from your enrolled batches</p>
                </div>

                {recordings.length === 0 ? (
                  <div className="text-center py-12 px-4 rounded-3xl border-2 border-dashed border-slate-200 space-y-2">
                    <Clock className="w-8 h-8 text-slate-300 mx-auto" />
                    <h3 className="text-sm font-black text-slate-900">No Recordings Yet</h3>
                    <p className="text-xs text-slate-500">Recordings of your live classes will show up here once a session ends.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recordings.map((rec) => (
                      <div key={rec._id || rec.roomId} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-[#5751E1] font-bold text-xs">
                              {rec.targetClass} • {rec.subject}
                            </span>
                            <h3 className="font-extrabold text-sm text-slate-900 mt-1.5">{rec.liveClassTitle}</h3>
                            <div className="text-xs text-slate-500">
                              Faculty: {rec.instructor} •{" "}
                              {rec.startedAt ? new Date(rec.startedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : ""}
                            </div>
                          </div>
                          {rec.status !== "ready" && (
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                                rec.status === "failed" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {rec.status === "recording" ? "Recording…" : rec.status === "processing" ? "Processing…" : "Failed"}
                            </span>
                          )}
                        </div>

                        {rec.status === "ready" && rec.videoUrl && (
                          // eslint-disable-next-line jsx-a11y/media-has-caption
                          <video controls src={rec.videoUrl} className="w-full rounded-xl bg-black" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: ONLINE TEST SERIES & PERFORMANCE HISTORY */}
            {activeTab === "tests" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
                {/* Available Tests */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-black text-slate-900">Available Board Mock Tests</h2>
                      <p className="text-xs text-slate-500">Proctored assessments with anti-cheating security, rough scratchpad, and formula sheet</p>
                    </div>
                    <Link
                      href="/test-series"
                      className="text-xs font-bold text-[#5751E1] hover:underline"
                    >
                      View Full Catalog →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase">
                          Class 10 • Mathematics
                        </span>
                        <div className="font-extrabold text-sm text-slate-900">
                          Full Chapter Test (Quadratic Equations & AP)
                        </div>
                        <div className="text-xs text-slate-500">45 Minutes • 20 Marks • Anti-Cheating Monitored</div>
                      </div>
                      <div className="pt-2">
                        <Link
                          href="/test/test-maths-10-quadratics"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#050071] to-[#5751E1] text-white font-bold text-xs shadow-sm hover:scale-102 transition-all"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Start Assessment</span>
                        </Link>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-extrabold uppercase">
                          Class 10 • Science
                        </span>
                        <div className="font-extrabold text-sm text-slate-900">
                          Chemical Reactions & Equations Board Mock
                        </div>
                        <div className="text-xs text-slate-500">60 Minutes • 25 Marks • Anti-Cheating Monitored</div>
                      </div>
                      <div className="pt-2">
                        <Link
                          href="/test/test-maths-10-quadratics"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#050071] to-[#5751E1] text-white font-bold text-xs shadow-sm hover:scale-102 transition-all"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Start Assessment</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Completed Test History & Performance Analytics */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">Completed Test History &amp; Scorecards</h3>
                      <p className="text-xs text-slate-500">Detailed question-by-question breakdown, accuracy percentage, and state percentile rank</p>
                    </div>
                    <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      {testHistory.length > 0 ? `${testHistory.length} Attempts Logged` : "1 Attempt Logged"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {(testHistory.length > 0 ? testHistory : [
                      {
                        id: "res-sample-1",
                        testId: "test-maths-10-quadratics",
                        testTitle: "Class 10th Mathematics: Quadratic Equations & AP Mock",
                        totalScore: 16,
                        maxScore: 20,
                        percentage: 80,
                        accuracy: 80,
                        percentile: 94.2,
                        correctCount: 4,
                        incorrectCount: 1,
                        unattemptedCount: 0,
                        securityStrikes: 0,
                        integrityPassed: true,
                        timeTakenSeconds: 960,
                        submittedAt: "2026-08-20T14:30:00Z"
                      }
                    ]).map((h, idx) => (
                      <div
                        key={h.id || idx}
                        className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-300 transition-all"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                              ✓ {h.integrityPassed !== false ? "Integrity Verified" : "Strikes Logged"}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                              {new Date(h.submittedAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                              })}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-sm text-slate-900">
                            {h.testTitle || "Class 10th Mathematics Assessment"}
                          </h4>
                          <div className="text-xs text-slate-500 flex items-center gap-3">
                            <span>Score: <strong className="text-[#050071] font-black">{h.totalScore} / {h.maxScore}</strong></span>
                            <span>•</span>
                            <span>Accuracy: <strong className="text-emerald-600 font-bold">{h.accuracy}%</strong></span>
                            <span>•</span>
                            <span>Percentile: <strong className="text-indigo-600 font-bold">{h.percentile}th</strong></span>
                          </div>
                        </div>

                        <Link
                          href={`/test/${h.testId || "test-maths-10-quadratics"}`}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#050071] hover:text-white text-slate-700 text-xs font-bold transition-all text-center"
                        >
                          Review Solution
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
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
                    .map((o, idx) => {
                      // Real order docs (from /api/orders) use invoice/courseTitle/totalNumeric/gateway
                      // — o.id/o.course/o.amount/o.paymentMode only exist on the hardcoded fallback
                      // seed data. Falling back across both shapes so a real order doesn't render
                      // blank fields (and doesn't collide on a shared `undefined` key).
                      const orderRef = o.invoice || o.id;
                      const title = o.courseTitle || o.course;
                      const amount = o.totalNumeric ?? o.amount;
                      const paymentLabel = o.gateway || o.paymentMode;

                      return (
                        <div key={orderRef || o._id || idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-slate-600">{orderRef}</span>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase">
                                {o.status}
                              </span>
                            </div>
                            <h4 className="font-extrabold text-sm text-slate-900">{title}</h4>
                            <div className="text-xs text-slate-500">{o.date} • {paymentLabel}</div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-black text-base text-[#050071]">{formatPrice(amount, currency)}</span>
                            <Link
                              href={`/invoice/${orderRef}`}
                              target="_blank"
                              className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-[#050071] hover:text-white text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <Receipt className="w-3.5 h-3.5" />
                              <span>View / Download Invoice</span>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
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
                          placeholder="e.g. +91 98765 43210"
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

        {/* REUSABLE TOAST NOTIFICATION */}
        <ToastNotification
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      </div>
    </div>
  );
}
