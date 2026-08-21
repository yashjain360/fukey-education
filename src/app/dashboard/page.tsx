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
  Check
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useModal } from "@/components/ui/CustomModal";
import { useCart } from "@/components/cart/CartContext";
import { coursesData } from "@/data/coursesData";
import { triggerConfetti } from "@/lib/confetti";
import { formatPrice } from "@/lib/utils";

export default function StudentDashboardPage() {
  const { user, logout, switchRole, loginWithGoogle } = useAuth();
  const { currency } = useCart();
  const { openModal } = useModal();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "orders" | "live" | "courses" | "wishlist" | "reviews" | "quizzes" | "settings"
  >("dashboard");

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

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSwitchToInstructor = () => {
    switchRole("instructor");
    router.push("/instructor/dashboard");
  };

  const handleDownloadNotes = (title: string) => {
    triggerConfetti();
    alert(`Downloading "${title}" Study Notes PDF...`);
  };

  const handleJoinLiveRoom = () => {
    router.push("/live/room-maths-10-quadratics");
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

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    triggerConfetti();
    alert("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const enrolledCourses = coursesData.slice(0, 2);

  return (
    <div className="bg-slate-50/60 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Top Header Banner */}
        <div
          className="relative rounded-3xl overflow-hidden bg-[#2D1B69] border border-indigo-900 shadow-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
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
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {profileName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Verified Student Pass 2026-27</span>
                </span>
              </div>
              <div className="text-xs text-indigo-200 font-medium">
                {profileEmail}
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-800/60 text-indigo-200 text-[10px] font-bold">
                <span>{targetBoard} {targetClass} • {medium}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <button
              onClick={handleSwitchToInstructor}
              className="px-6 py-3 rounded-2xl bg-[#FF2424] hover:bg-red-700 text-white font-extrabold text-xs shadow-lg shadow-red-900/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Switch to Faculty View</span>
              <ArrowRight className="w-4 h-4" />
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
                Student Portal
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
                  <span>Enrolled Batches (2)</span>
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
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer transition-all ${
                    activeTab === "wishlist"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Saved Courses ({coursesData.slice(0, 3).length})</span>
                </button>

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
              </nav>
            </div>

            {/* USER Section */}
            <div className="pt-4 border-t border-slate-100 space-y-1">
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
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Dashboard Overview</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-[#EBF2FF] rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-1 border border-blue-100">
                      <div className="w-12 h-12 rounded-full bg-[#D4E4FC] text-[#3B82F6] flex items-center justify-center mb-1">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div className="text-3xl font-black text-[#1E3A8A]">2</div>
                      <div className="text-[11px] font-extrabold text-[#3B82F6] uppercase">Enrolled Batches</div>
                    </div>

                    <div className="bg-[#F8EFFF] rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-1 border border-purple-100">
                      <div className="w-12 h-12 rounded-full bg-[#EAD4FC] text-[#A855F7] flex items-center justify-center mb-1">
                        <Award className="w-6 h-6" />
                      </div>
                      <div className="text-3xl font-black text-[#581C87]">94.2%</div>
                      <div className="text-[11px] font-extrabold text-[#A855F7] uppercase">Mock Test Percentile</div>
                    </div>

                    <div className="bg-[#FFF4EB] rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-1 border border-orange-100">
                      <div className="w-12 h-12 rounded-full bg-[#FFE2CC] text-[#F97316] flex items-center justify-center mb-1">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div className="text-3xl font-black text-[#9A3412]">48 Hrs</div>
                      <div className="text-[11px] font-extrabold text-[#F97316] uppercase">Live Class Attendance</div>
                    </div>
                  </div>
                </div>

                {/* Enrolled Courses */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900">Your Active Coaching Batches</h3>
                    <Link href="/courses" className="text-xs font-bold text-[#5751E1] hover:underline">
                      Explore More Courses
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {enrolledCourses.map((c) => (
                      <div key={c.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-[#5751E1] font-bold">
                            {c.class} • {c.subject}
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
                            className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                          >
                            Notes PDF
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
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
                  {enrolledCourses.map((c) => (
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
                          className="px-4 py-2 rounded-xl bg-[#050071] text-white font-bold text-xs flex items-center gap-1.5"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Enter Classroom</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: LIVE CLASSES */}
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
                    className="px-6 py-3 rounded-xl bg-[#FF2424] hover:bg-red-700 text-white font-black text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Live Class Now</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: WISHLIST */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Saved Wishlist Batches</h2>
                  <p className="text-xs text-slate-500">Batches shortlisted for your upcoming board preparation</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coursesData.slice(0, 3).map((c) => (
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
              </div>
            )}

            {/* TAB 5: COMPREHENSIVE PROFILE SETTINGS */}
            {activeTab === "settings" && (
              <div className="space-y-8 animate-in fade-in">
                {/* Personal Information & Academic Preferences */}
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
                    {/* Avatar Preset Selector */}
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
                            placeholder="Enter image URL or choose preset below..."
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
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold focus:outline-none"
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
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold focus:outline-none"
                        >
                          <option value="CBSE">CBSE Board</option>
                          <option value="MP Board">MP Board</option>
                          <option value="State Board">Other State Board</option>
                          <option value="ICSE">ICSE Board</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Academic Dream Goal &amp; Target</label>
                      <input
                        type="text"
                        value={targetGoal}
                        onChange={(e) => setTargetGoal(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    {/* Alert Toggles */}
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <h4 className="font-bold text-slate-800">Class &amp; Exam Notifications</h4>
                      <div className="flex flex-wrap items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={whatsappAlerts}
                            onChange={(e) => setWhatsappAlerts(e.target.checked)}
                            className="w-4 h-4 rounded text-indigo-600 focus:ring-0"
                          />
                          <span>Send Live Class Reminders on WhatsApp</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emailAlerts}
                            onChange={(e) => setEmailAlerts(e.target.checked)}
                            className="w-4 h-4 rounded text-indigo-600 focus:ring-0"
                          />
                          <span>Email Notification for Mock Test Results</span>
                        </label>
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

                {/* Password & Security Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-indigo-600" />
                      <span>Security &amp; Password Update</span>
                    </h3>
                    <p className="text-xs text-slate-500">Protect your student portal with a strong password</p>
                  </div>

                  <form onSubmit={handleSavePassword} className="space-y-4 text-xs max-w-lg">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">New Password</label>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Confirm Password</label>
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all hover:scale-105 cursor-pointer"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
