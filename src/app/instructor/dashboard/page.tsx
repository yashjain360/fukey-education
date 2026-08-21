"use client";

import React, { useState, useEffect } from "react";
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
  Database,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Edit,
  X,
  Layers,
  Clock,
  ShieldCheck,
  Check
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useModal } from "@/components/ui/CustomModal";
import { coursesData, Course } from "@/data/coursesData";
import { triggerConfetti } from "@/lib/confetti";
import { formatPrice } from "@/lib/utils";

export default function InstructorDashboardPage() {
  const { user, logout, switchRole } = useAuth();
  const { openModal } = useModal();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "courses" | "live" | "questions" | "settings"
  >("dashboard");
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [isLoading, setIsLoading] = useState(true);

  // New Course Studio Modal State
  const [isCourseStudioOpen, setIsCourseStudioOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Course Form Fields
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [targetClass, setTargetClass] = useState("Class 10");
  const [subject, setSubject] = useState("Mathematics");
  const [language, setLanguage] = useState("Hindi & English");
  const [price, setPrice] = useState(1499);
  const [originalPrice, setOriginalPrice] = useState(2499);
  const [instructorName, setInstructorName] = useState(user?.name || "Pawan Gupta");
  const [instructorRole, setInstructorRole] = useState("Senior Board Faculty Lead");
  const [duration, setDuration] = useState("60 Hours Live");
  const [lessonsCount, setLessonsCount] = useState(45);
  const [description, setDescription] = useState("Comprehensive live online board preparation batch mapped 100% to NCERT curriculum with daily 15-minute doubt solving.");
  const [thumbnail, setThumbnail] = useState("https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-08-14-06-28-03-5696.png");
  const [features, setFeatures] = useState<string[]>([
    "100% NCERT Syllabus Coverage",
    "Live 1-on-1 Voice Doubt Room",
    "Handwritten Formula PDF Notes",
    "Weekly Board Pattern Mock Tests"
  ]);
  const [newFeatureText, setNewFeatureText] = useState("");

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.courses && data.courses.length > 0) {
          setCourses(data.courses);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSwitchToStudent = () => {
    switchRole("student");
    router.push("/dashboard");
  };

  const handleReplyQuestion = (q: any) => {
    openModal({
      type: "reply",
      title: `Reply to ${q.student}`,
      subtitle: `Subject: ${q.course}`,
      data: q,
    });
  };

  const handleAddFeature = () => {
    if (newFeatureText.trim()) {
      setFeatures((prev) => [...prev, newFeatureText.trim()]);
      setNewFeatureText("");
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleCreateCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const classNum = parseInt(targetClass.replace(/[^0-9]/g, ""), 10) || 10;
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          subTitle: subTitle || `Complete CBSE & State Board coaching for ${title}`,
          class: targetClass,
          classNum,
          subject,
          language,
          price: Number(price),
          originalPrice: Number(originalPrice),
          discountPercent: Math.round(((originalPrice - price) / originalPrice) * 100) || 40,
          instructor: instructorName,
          instructorRole,
          duration,
          lessonsCount: Number(lessonsCount),
          description,
          thumbnail,
          features,
          curriculum: [
            {
              moduleTitle: "Unit 1: Core Concepts & NCERT Derivations",
              duration: "20 Hours",
              topics: ["Live Lecture 1: Foundational Theory", "Live Lecture 2: Board Derivations", "Live Doubt Room"]
            },
            {
              moduleTitle: "Unit 2: Previous Year Question Analysis (PYQs)",
              duration: "25 Hours",
              topics: ["10-Year Question Bank Solving", "Speed & Accuracy Tricks"]
            },
            {
              moduleTitle: "Unit 3: Full Syllabus Mock Tests & Formula Revision",
              duration: "15 Hours",
              topics: ["Full Length Test Discussion", "Final Exam Strategy & Mark Booster"]
            }
          ]
        }),
      });

      const data = await res.json();
      if (data.success && data.course) {
        setCourses((prev) => [data.course, ...prev]);
        setIsCourseStudioOpen(false);
        triggerConfetti();
        // Reset form
        setTitle("");
        setSubTitle("");
        router.push(`/course/${data.course.slug}`);
      }
    } catch (err) {
      console.error("Course creation failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        {/* Top Header Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#2D1B69] border border-indigo-900 shadow-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-20 h-20 rounded-full border-4 border-white/80 overflow-hidden bg-indigo-100 flex-shrink-0 shadow-lg relative">
              <div className="w-full h-full bg-[#5751E1] flex items-center justify-center text-white font-black text-2xl">
                {user?.name ? user.name.charAt(0) : "P"}
              </div>
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {user?.name || "Pawan Gupta"}
              </h1>
              <div className="text-xs text-indigo-200 font-medium">
                {user?.email || "pawan@fukeyeducation.com"}
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[10px] font-bold border border-orange-400/30">
                <ShieldCheck className="w-3 h-3 text-orange-400" />
                <span>Verified Senior Educator</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsCourseStudioOpen(true)}
              className="px-6 py-3 rounded-2xl bg-[#FF2424] hover:bg-red-700 text-white font-black text-xs shadow-lg shadow-red-900/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Course</span>
            </button>

            <Link
              href="/live/room-maths-10-quadratics"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-black text-xs shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Video className="w-4 h-4 animate-icon-pulse" />
              <span>Launch Live Studio</span>
            </Link>

            <button
              onClick={handleSwitchToStudent}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs transition-colors cursor-pointer"
            >
              Student View
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Navigation */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-3 py-1">
                Faculty Portal
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer ${
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
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer ${
                    activeTab === "courses"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Manage Courses ({courses.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("questions")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer ${
                    activeTab === "questions"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Student Doubts Queue</span>
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
          <div className="lg:col-span-9 space-y-8">
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Overview</h2>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-[#EBF2FF] rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-2 border border-blue-100">
                      <div className="w-16 h-16 rounded-full bg-[#D4E4FC] text-[#3B82F6] flex items-center justify-center mb-2">
                        <GraduationCap className="w-8 h-8" />
                      </div>
                      <div className="text-5xl font-black text-[#1E3A8A]">
                        {courses.length}
                      </div>
                      <div className="text-xs font-extrabold text-[#3B82F6] uppercase tracking-wider">
                        Published Academic Batches
                      </div>
                    </div>

                    <div className="bg-[#F8EFFF] rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-2 border border-purple-100">
                      <div className="w-16 h-16 rounded-full bg-[#EAD4FC] text-[#A855F7] flex items-center justify-center mb-2">
                        <Video className="w-8 h-8" />
                      </div>
                      <div className="text-5xl font-black text-[#581C87]">
                        42
                      </div>
                      <div className="text-xs font-extrabold text-[#A855F7] uppercase tracking-wider">
                        Active Students in Live Queue
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
                            className="px-3.5 py-1.5 rounded-xl bg-[#5751E1] hover:bg-indigo-700 text-white font-bold text-[11px] transition-colors cursor-pointer"
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
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Published Coaching Batches</h2>
                    <p className="text-xs text-slate-500">Live synchronization with MongoDB Atlas</p>
                  </div>
                  <button
                    onClick={() => setIsCourseStudioOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Course</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((c) => (
                    <div
                      key={c.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3 group hover:border-indigo-300 transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase">
                            {c.class} • {c.subject}
                          </span>
                          <span className="font-black text-sm text-[#050071]">
                            ₹{c.price}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">{c.title}</h3>
                        <p className="text-xs text-slate-500">Instructor: {c.instructor}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Active Enrollment</span>
                        </span>
                        <Link
                          href={`/course/${c.slug}`}
                          target="_blank"
                          className="font-bold text-[#5751E1] hover:underline flex items-center gap-1"
                        >
                          <span>View Public Page</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MODAL: CREATE COURSE STUDIO */}
        {isCourseStudioOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-black text-slate-900">Academic Course Creator Studio</h3>
                  <p className="text-xs text-slate-500">Deploy a full CBSE / State Board curriculum batch to the platform catalog</p>
                </div>
                <button
                  onClick={() => setIsCourseStudioOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateCourseSubmit} className="space-y-4 text-xs">
                {/* Title */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course / Batch Headline</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. CLASS 10TH COMPLETE SCIENCE (PHYSICS, CHEMISTRY & BIOLOGY)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Class & Subject */}
                <div className="grid grid-cols-2 gap-3">
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
                    <label className="block font-bold text-slate-700 mb-1">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold focus:outline-none"
                    >
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science (PCB Combined)</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                      <option value="Social Science">Social Science</option>
                      <option value="Accountancy">Accountancy</option>
                      <option value="Business Studies">Business Studies</option>
                      <option value="Economics">Economics</option>
                    </select>
                  </div>
                </div>

                {/* Medium & Language */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Teaching Medium</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold focus:outline-none"
                    >
                      <option value="Hindi">Hindi Medium</option>
                      <option value="English">English Medium</option>
                      <option value="Hindi & English">Hindi &amp; English (Bilingual)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g. 60 Hours Live"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none"
                    />
                  </div>
                </div>

                {/* Pricing: Sale Price & Original Price */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Enrolled Fee (₹ Sale Price)</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-black text-indigo-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">MRP / Slashed Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Faculty Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Educator / Faculty Lead</label>
                    <input
                      type="text"
                      required
                      value={instructorName}
                      onChange={(e) => setInstructorName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Total Lessons Count</label>
                    <input
                      type="number"
                      value={lessonsCount}
                      onChange={(e) => setLessonsCount(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none"
                    />
                  </div>
                </div>

                {/* Thumbnail URL */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Thumbnail Asset URL</label>
                  <input
                    type="text"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Overview &amp; Board Methodology</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium focus:outline-none"
                  />
                </div>

                {/* Key Features List Builder */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Key Highlights &amp; Inclusions</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newFeatureText}
                      onChange={(e) => setNewFeatureText(e.target.value)}
                      placeholder="Add highlight (e.g. Daily Handwritten Formula PDF Notes)..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-3.5 py-2 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold text-xs cursor-pointer"
                    >
                      Add
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {features.map((feat, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{feat}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCourseStudioOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] hover:brightness-110 text-white font-black shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? "Publishing to Platform..." : "Publish Course to Catalog"}
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
