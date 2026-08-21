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
  Check,
  MessageSquare,
  Settings,
  Star,
  Users,
  Search,
  IndianRupee,
  DollarSign,
  TrendingUp,
  Receipt,
  FileSpreadsheet,
  Award
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useCart } from "@/components/cart/CartContext";
import { coursesData, Course } from "@/data/coursesData";
import { triggerConfetti } from "@/lib/confetti";
import { formatPrice } from "@/lib/utils";
import Pagination from "@/components/ui/Pagination";

export default function InstructorDashboardPage() {
  const { user, logout, switchRole } = useAuth();
  const { currency } = useCart();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "courses" | "live" | "questions" | "students" | "earnings" | "wishlist" | "settings"
  >("dashboard");
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [isLoading, setIsLoading] = useState(true);
  const [courseSearch, setCourseSearch] = useState("");

  // Tab Pagination States
  const [coursesPage, setCoursesPage] = useState(1);
  const [questionsPage, setQuestionsPage] = useState(1);
  const [studentsPage, setStudentsPage] = useState(1);
  const [earningsPage, setEarningsPage] = useState(1);
  const [wishlistPage, setWishlistPage] = useState(1);

  // Course Studio Modal State
  const [isCourseStudioOpen, setIsCourseStudioOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
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

  // Doubts Q&A State
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [replyText, setReplyText] = useState("");

  const [questionsQueue, setQuestionsQueue] = useState([
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
    },
    {
      id: "q-3",
      student: "Rohan Gupta",
      course: "Physics 12th (Optics)",
      question: "Will the upcoming mock test cover Ray Optics lens maker formula numericals?",
      time: "3 hours ago",
      answered: false
    }
  ]);

  // Students Engagement Roster
  const [studentsRoster, setStudentsRoster] = useState([
    { id: "s-1", name: "Aman Sharma", batch: "Maths 10th Hindi", attendance: "96%", testScore: "92%", status: "Active" },
    { id: "s-2", name: "Sneha Verma", batch: "Science 10th English", attendance: "100%", testScore: "98%", status: "Top Ranker" },
    { id: "s-3", name: "Pooja Patel", batch: "Maths 10th Hindi", attendance: "88%", testScore: "85%", status: "Active" },
    { id: "s-4", name: "Rohan Gupta", batch: "Physics 12th Optics", attendance: "92%", testScore: "90%", status: "Active" }
  ]);

  // Payout Settlements
  const [payouts, setPayouts] = useState([
    { id: "PAY-AUG-2026", month: "August 2026", amount: 48500, status: "Settled", date: "2026-08-01" },
    { id: "PAY-JUL-2026", month: "July 2026", amount: 52000, status: "Settled", date: "2026-07-01" }
  ]);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.courses && data.courses.length > 0) setCourses(data.courses);
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

  const handleSwitchToAdmin = () => {
    switchRole("admin");
    router.push("/admin");
  };

  const handleOpenReplyModal = (q: any) => {
    setSelectedQuestion(q);
    setReplyText("");
    setReplyModalOpen(true);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuestion || !replyText.trim()) return;

    setQuestionsQueue((prev) =>
      prev.map((q) => (q.id === selectedQuestion.id ? { ...q, answered: true } : q))
    );
    setReplyModalOpen(false);
    triggerConfetti();
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

  const filteredCourses = courses.filter((c) => {
    const q = courseSearch.toLowerCase();
    return (
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.subject.toLowerCase().includes(q) ||
      c.class.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-slate-50/60 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Top Header Banner */}
        <div
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2D1B69] via-[#1C1A4A] to-[#050071] border border-indigo-900 shadow-xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6"
          data-aos="fade-down"
          data-aos-duration="750"
        >
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
                <span>Senior Faculty Lead (Mathematics &amp; Science)</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
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

            <button
              onClick={handleSwitchToAdmin}
              className="px-4 py-3 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 font-bold text-xs transition-colors cursor-pointer"
            >
              Master Admin
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Navigation */}
          <div
            className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6"
            data-aos="fade-right"
          >
            <div className="space-y-1">
              <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-3 py-1">
                Faculty Studio
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
                  <span>Manage Courses ({courses.length})</span>
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
                  onClick={() => setActiveTab("questions")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer transition-all ${
                    activeTab === "questions"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Student Doubts ({questionsQueue.filter((q) => !q.answered).length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("students")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer transition-all ${
                    activeTab === "students"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Enrolled Students ({studentsRoster.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("earnings")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left cursor-pointer transition-all ${
                    activeTab === "earnings"
                      ? "bg-indigo-50 text-[#5751E1]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Honorarium &amp; Payouts</span>
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
                  <span>Curriculum Reference</span>
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
                <Settings className="w-4 h-4" />
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
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Faculty Overview</h2>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#EBF2FF] rounded-3xl p-5 flex flex-col items-center justify-center text-center space-y-1 border border-blue-100 shadow-xs">
                      <div className="w-10 h-10 rounded-full bg-[#D4E4FC] text-[#3B82F6] flex items-center justify-center mb-1">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="text-2xl font-black text-[#1E3A8A]">{courses.length} Batches</div>
                      <div className="text-[10px] font-extrabold text-[#3B82F6] uppercase">Published Courses</div>
                    </div>

                    <div className="bg-[#F8EFFF] rounded-3xl p-5 flex flex-col items-center justify-center text-center space-y-1 border border-purple-100 shadow-xs">
                      <div className="w-10 h-10 rounded-full bg-[#EAD4FC] text-[#A855F7] flex items-center justify-center mb-1">
                        <Video className="w-5 h-5" />
                      </div>
                      <div className="text-2xl font-black text-[#581C87]">42 Online</div>
                      <div className="text-[10px] font-extrabold text-[#A855F7] uppercase">Live Class Queue</div>
                    </div>

                    <div className="bg-emerald-50 rounded-3xl p-5 flex flex-col items-center justify-center text-center space-y-1 border border-emerald-100 shadow-xs">
                      <div className="w-10 h-10 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center mb-1">
                        <Star className="w-5 h-5 fill-current" />
                      </div>
                      <div className="text-2xl font-black text-emerald-900">4.9 / 5.0</div>
                      <div className="text-[10px] font-extrabold text-emerald-700 uppercase">Faculty Rating</div>
                    </div>

                    <div className="bg-[#FFF4EB] rounded-3xl p-5 flex flex-col items-center justify-center text-center space-y-1 border border-orange-100 shadow-xs">
                      <div className="w-10 h-10 rounded-full bg-[#FFE2CC] text-[#F97316] flex items-center justify-center mb-1">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div className="text-2xl font-black text-[#9A3412]">{formatPrice(100500, currency)}</div>
                      <div className="text-[10px] font-extrabold text-[#F97316] uppercase">Earned Honorarium</div>
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
                            onClick={() => handleOpenReplyModal(q)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#5751E1] hover:bg-indigo-700 text-white font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            {q.answered ? "Update Response" : "Reply to Student"}
                          </button>
                          {q.answered && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                              <Check className="w-3.5 h-3.5" />
                              <span>Answered</span>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COURSES CATALOG */}
            {activeTab === "courses" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Published Coaching Batches ({courses.length})</h2>
                    <p className="text-xs text-slate-500">Live synchronization with MongoDB Atlas</p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-56">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={courseSearch}
                        onChange={(e) => setCourseSearch(e.target.value)}
                        placeholder="Search batches..."
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                      />
                    </div>

                    <button
                      onClick={() => setIsCourseStudioOpen(true)}
                      className="px-4 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create Course</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses
                    .slice((coursesPage - 1) * 6, coursesPage * 6)
                    .map((c) => (
                      <div
                        key={c.id}
                        className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden border-b border-slate-100 flex items-center justify-center">
                          <img
                            src={c.thumbnail || "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-08-14-06-28-03-5696.png"}
                            alt={c.title}
                            className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-08-14-06-28-03-5696.png";
                            }}
                          />
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#050071] font-extrabold text-[10px] uppercase shadow-xs">
                            {c.class}
                          </span>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                          <div className="space-y-1.5">
                            <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                              {c.subject} • {c.language}
                            </div>
                            <Link href={`/course/${c.slug}`}>
                              <h3 className="font-extrabold text-slate-900 text-sm hover:text-[#5751E1] line-clamp-2 transition-colors">
                                {c.title}
                              </h3>
                            </Link>
                            <div className="text-xs text-slate-500 font-medium">
                              By <span className="text-slate-800 font-semibold">{c.instructor}</span>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <div className="font-black text-base text-[#050071]">
                              {formatPrice(c.price, currency)}
                            </div>
                            <Link
                              href={`/course/${c.slug}`}
                              target="_blank"
                              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#5751E1] hover:text-white text-slate-700 text-xs font-bold transition-all flex items-center gap-1"
                            >
                              <span>Preview</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <Pagination
                  currentPage={coursesPage}
                  totalItems={filteredCourses.length}
                  itemsPerPage={6}
                  onPageChange={(page) => setCoursesPage(page)}
                  pageSizeOptions={[6, 12, 24]}
                />
              </div>
            )}

            {/* TAB 3: LIVE CLASSES */}
            {activeTab === "live" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                      <span>Live Classroom Hub</span>
                    </h2>
                    <p className="text-xs text-slate-500">Launch interactive video lecture studios with digital whiteboard &amp; doubt rooms</p>
                  </div>

                  <Link
                    href="/live/room-maths-10-quadratics"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all hover:scale-105"
                  >
                    <Video className="w-4 h-4 animate-pulse" />
                    <span>Launch Studio Room</span>
                  </Link>
                </div>

                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#050071] to-[#1C1A4A] text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase border border-emerald-400/30">
                      Broadcasting Room
                    </span>
                    <span className="text-xs text-slate-300">42 Students Waiting</span>
                  </div>

                  <h3 className="font-extrabold text-lg">Class 10th Maths: Quadratic Equations</h3>
                  <p className="text-xs text-slate-300">Digital Pen-Tablet Whiteboard + 45-Min Lecture + 15-Min Live Doubt Queue</p>

                  <div className="pt-2">
                    <Link
                      href="/live/room-maths-10-quadratics"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF2424] hover:bg-red-700 text-white text-xs font-black transition-all hover:scale-105"
                    >
                      <Video className="w-4 h-4" />
                      <span>Enter Live Studio</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: LESSON QUESTIONS */}
            {activeTab === "questions" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Student Doubts &amp; Q&amp;A Queue</h2>
                  <p className="text-xs text-slate-500">Provide direct answers to enrolled board aspirants</p>
                </div>

                <div className="space-y-4">
                  {questionsQueue
                    .slice((questionsPage - 1) * 4, questionsPage * 4)
                    .map((q) => (
                      <div
                        key={q.id}
                        className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="font-bold text-slate-900">
                            {q.student} <span className="font-normal text-slate-500">({q.course})</span>
                          </div>
                          <span className="text-slate-400 text-[11px]">{q.time}</span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          &ldquo;{q.question}&rdquo;
                        </p>

                        <div className="pt-2 flex items-center justify-between">
                          <button
                            onClick={() => handleOpenReplyModal(q)}
                            className="px-4 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs transition-colors cursor-pointer"
                          >
                            {q.answered ? "Edit Reply" : "Answer Doubt"}
                          </button>
                          {q.answered && (
                            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Response Sent to Student</span>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>

                <Pagination
                  currentPage={questionsPage}
                  totalItems={questionsQueue.length}
                  itemsPerPage={4}
                  onPageChange={(page) => setQuestionsPage(page)}
                  pageSizeOptions={[4, 8, 12]}
                />
              </div>
            )}

            {/* TAB 5: ENROLLED STUDENTS ROSTER */}
            {activeTab === "students" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Enrolled Students Performance Roster</h2>
                    <p className="text-xs text-slate-500">Monitor student attendance streaks, test accuracy, and learning progress</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs">
                    {studentsRoster.length} Active Students
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 uppercase font-black tracking-wider text-[10px]">
                        <th className="pb-3">Student Name</th>
                        <th className="pb-3">Enrolled Batch</th>
                        <th className="pb-3">Live Attendance</th>
                        <th className="pb-3">Test Average</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentsRoster
                        .slice((studentsPage - 1) * 4, studentsPage * 4)
                        .map((s) => (
                          <tr key={s.id} className="hover:bg-slate-50">
                            <td className="py-3 font-extrabold text-slate-900">{s.name}</td>
                            <td className="py-3 text-slate-600">{s.batch}</td>
                            <td className="py-3 font-bold text-emerald-600">{s.attendance}</td>
                            <td className="py-3 font-bold text-indigo-600">{s.testScore}</td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                {s.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  currentPage={studentsPage}
                  totalItems={studentsRoster.length}
                  itemsPerPage={4}
                  onPageChange={(page) => setStudentsPage(page)}
                  pageSizeOptions={[4, 8, 12]}
                />
              </div>
            )}

            {/* TAB 6: HONORARIUM & PAYOUTS */}
            {activeTab === "earnings" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Faculty Honorarium &amp; Payout Statements</h2>
                  <p className="text-xs text-slate-500">Monthly compensation for live lecturing and doubt resolution</p>
                </div>

                <div className="space-y-3">
                  {payouts
                    .slice((earningsPage - 1) * 4, earningsPage * 4)
                    .map((p) => (
                      <div key={p.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-slate-600">{p.id}</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase">
                              {p.status}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-sm text-slate-900">{p.month} Settlement</h4>
                          <div className="text-xs text-slate-500">Disbursed on {p.date}</div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-black text-base text-[#050071]">{formatPrice(p.amount, currency)}</span>
                          <button
                            onClick={() => {
                              triggerConfetti();
                              alert(`Downloading Payout Settlement receipt for ${p.id}...`);
                            }}
                            className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-[#050071] hover:text-white text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Receipt className="w-3.5 h-3.5" />
                            <span>Receipt</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                <Pagination
                  currentPage={earningsPage}
                  totalItems={payouts.length}
                  itemsPerPage={4}
                  onPageChange={(page) => setEarningsPage(page)}
                  pageSizeOptions={[4, 8, 12]}
                />
              </div>
            )}

            {/* TAB 7: WISHLIST / REFERENCE */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Saved Courses &amp; Reference Batches</h2>
                  <p className="text-xs text-slate-500">Curated batches saved for curriculum reference</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses
                    .slice((wishlistPage - 1) * 6, wishlistPage * 6)
                    .map((c) => (
                      <div
                        key={c.id}
                        className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between group"
                      >
                        <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden border-b border-slate-100 flex items-center justify-center">
                          <img
                            src={c.thumbnail}
                            alt={c.title}
                            className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
                          />
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 text-[#050071] font-extrabold text-[10px] uppercase">
                            {c.class}
                          </span>
                        </div>

                        <div className="p-5 space-y-3">
                          <h3 className="font-extrabold text-slate-900 text-sm line-clamp-2">{c.title}</h3>
                          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                            <span className="font-black text-[#050071]">{formatPrice(c.price, currency)}</span>
                            <Link href={`/course/${c.slug}`} className="text-[#5751E1] font-bold hover:underline">
                              View
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
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Faculty Profile Settings</h2>
                  <p className="text-xs text-slate-500">Update educator credentials, bio, and board specialties</p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    triggerConfetti();
                    alert("Profile updated successfully!");
                  }}
                  className="space-y-4 text-xs max-w-xl"
                >
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name || "Pawan Gupta"}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      disabled
                      defaultValue={user?.email || "pawan@fukeyeducation.com"}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Helpline Phone Number</label>
                    <input
                      type="text"
                      defaultValue="+91 88718 35015"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Faculty Bio &amp; Achievements</label>
                    <textarea
                      rows={3}
                      defaultValue="Senior Mathematics Faculty Lead at Fukey Education Bhopal with 10+ years mentoring CBSE & MP Board top rankers."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs shadow-md transition-all hover:scale-105 cursor-pointer"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* MODAL: REPLY TO QUESTION */}
        {replyModalOpen && selectedQuestion && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Reply to {selectedQuestion.student}</h3>
                  <p className="text-[11px] text-slate-500">{selectedQuestion.course}</p>
                </div>
                <button onClick={() => setReplyModalOpen(false)} className="p-1.5 rounded-full bg-slate-100 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700">
                <strong>Question:</strong> &ldquo;{selectedQuestion.question}&rdquo;
              </div>

              <form onSubmit={handleSendReply} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Explanation / Derivation Answer</label>
                  <textarea
                    rows={4}
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write the step-by-step solution or formula breakdown..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReplyModalOpen(false)}
                    className="px-3 py-2 rounded-xl text-slate-600 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#050071] text-white font-bold shadow-md cursor-pointer"
                  >
                    Send Answer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Enrolled Fee ({currency === "USD" ? "$ USD" : "₹ Sale Price"})</label>
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

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Thumbnail Asset URL</label>
                  <input
                    type="text"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Overview &amp; Board Methodology</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium focus:outline-none"
                  />
                </div>

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
