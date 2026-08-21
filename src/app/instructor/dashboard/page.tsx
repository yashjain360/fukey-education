"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutGrid,
  GraduationCap,
  Video,
  HelpCircle,
  Heart,
  User,
  LogOut,
  Plus,
  ArrowRight,
  Database
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useModal } from "@/components/ui/CustomModal";
import { coursesData } from "@/data/coursesData";

export default function InstructorDashboardPage() {
  const { user, logout, switchRole } = useAuth();
  const { openModal } = useModal();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "courses" | "live" | "questions" | "wishlist" | "settings"
  >("dashboard");
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSwitchToStudent = () => {
    switchRole("student");
    router.push("/dashboard");
  };

  const handleCreateLiveClass = () => {
    openModal({
      type: "create_class",
      title: "Schedule Live Lecture",
    });
  };

  const handleReplyQuestion = (q: any) => {
    openModal({
      type: "reply",
      title: `Reply to ${q.student}`,
      subtitle: `Subject: ${q.course}`,
      data: q,
    });
  };

  const handleNewCourse = () => {
    openModal({
      type: "info",
      title: "Course Studio Ready",
      subtitle: "You can create curriculum modules, upload video lectures, and set pricing.",
      confirmText: "Launch Studio",
    });
  };

  const instructorCourses = coursesData.slice(0, 2);

  const questionsQueue = [
    {
      id: "q-1",
      student: "Aman Sharma",
      course: "Maths 10th (Hindi)",
      question: "Sir, what is the fastest method to solve word problems on Quadratic Equations in board exams?",
      time: "10 mins ago",
      answered: false
    },
    {
      id: "q-2",
      student: "Sneha Verma",
      course: "Science 10th (English)",
      question: "Could you please review the chemical equation balancing on slide 24?",
      time: "1 hour ago",
      answered: true
    }
  ];

  return (
    <div className="bg-slate-50/60 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Top Header Banner with Doodle Motif (Matching Screenshot 1) */}
        <div className="relative rounded-3xl overflow-hidden bg-[#2D1B69] border border-indigo-900 shadow-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-20 h-20 rounded-full border-4 border-white/80 overflow-hidden bg-indigo-100 flex-shrink-0 shadow-lg relative">
              <div className="w-full h-full bg-[#5751E1] flex items-center justify-center text-white font-black text-2xl">
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
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[10px] font-bold border border-orange-400/30">
                <span>Verified Senior Educator</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <button
              onClick={handleSwitchToStudent}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs transition-colors"
            >
              Switch to Student View
            </button>
            <button
              onClick={handleCreateLiveClass}
              className="px-6 py-3 rounded-2xl bg-[#FF2424] hover:bg-red-700 text-white font-extrabold text-xs shadow-lg shadow-red-900/30 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Live Class</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Navigation (Matching Screenshot 1) */}
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
                  onClick={() => setActiveTab("courses")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left ${
                    activeTab === "courses"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Courses</span>
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
                  onClick={() => setActiveTab("questions")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left ${
                    activeTab === "questions"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Lesson Questions</span>
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

          {/* Right Main Content Area (Matching Screenshot 1) */}
          <div className="lg:col-span-9 space-y-8">
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Dashboard</h2>

                  {/* 2 Stat Cards (Matching Screenshot 1) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Card 1: Total Courses */}
                    <div className="bg-[#EBF2FF] rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-2 border border-blue-100">
                      <div className="w-16 h-16 rounded-full bg-[#D4E4FC] text-[#3B82F6] flex items-center justify-center mb-2">
                        <GraduationCap className="w-8 h-8" />
                      </div>
                      <div className="text-5xl font-black text-[#1E3A8A]">
                        {user?.instructorCoursesCount || 2}
                      </div>
                      <div className="text-xs font-extrabold text-[#3B82F6] uppercase tracking-wider">
                        Total Courses
                      </div>
                    </div>

                    {/* Card 2: Pending Courses */}
                    <div className="bg-[#F8EFFF] rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-2 border border-purple-100">
                      <div className="w-16 h-16 rounded-full bg-[#EAD4FC] text-[#A855F7] flex items-center justify-center mb-2">
                        <GraduationCap className="w-8 h-8" />
                      </div>
                      <div className="text-5xl font-black text-[#581C87]">
                        {user?.pendingCoursesCount || 0}
                      </div>
                      <div className="text-xs font-extrabold text-[#A855F7] uppercase tracking-wider">
                        Pending Courses
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lesson Doubt Questions Queue */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900">Recent Student Doubts &amp; Questions</h3>
                    <span className="text-xs font-bold text-slate-400">{questionsQueue.length} Inquiries</span>
                  </div>

                  <div className="space-y-3">
                    {questionsQueue.map((q) => (
                      <div
                        key={q.id}
                        className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="font-bold text-slate-800">
                            {q.student} <span className="font-normal text-slate-500">in {q.course}</span>
                          </div>
                          <span className="text-slate-400">{q.time}</span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">{q.question}</p>
                        <div className="pt-2 flex items-center gap-2">
                          <button
                            onClick={() => handleReplyQuestion(q)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#5751E1] hover:bg-indigo-700 text-white font-bold text-[11px] transition-colors"
                          >
                            Reply to Student
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-slate-900">Manage Published Courses</h2>
                  <button
                    onClick={handleNewCourse}
                    className="px-4 py-2 rounded-xl bg-[#050071] text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Course</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {instructorCourses.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-sm text-slate-900">{c.title}</div>
                        <div className="text-xs text-slate-500">{c.class} • {c.studentsEnrolled} Students Enrolled</div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                        Published
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
