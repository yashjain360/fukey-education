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
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
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

  const handleOpenCourseStudio = (course?: Course) => {
    if (course) {
      setEditingCourseId(course.id);
      setTitle(course.title);
      setSubTitle(course.subTitle || `Complete CBSE & State Board coaching for ${course.title}`);
      setTargetClass(course.class || "Class 10");
      setSubject(course.subject || "Mathematics");
      setLanguage(course.language || "Hindi & English");
      setPrice(course.price || 1499);
      setOriginalPrice(course.originalPrice || 2499);
      setInstructorName(course.instructor || user?.name || "Pawan Gupta");
      setInstructorRole(course.instructorRole || "Senior Board Faculty Lead");
      setDuration(course.duration || "60 Hours Live");
      setLessonsCount(course.lessonsCount || 45);
      setDescription(course.description || "Comprehensive live online board preparation batch mapped 100% to NCERT curriculum with daily 15-minute doubt solving.");
      setThumbnail(course.thumbnail || "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-08-14-06-28-03-5696.png");
      setFeatures(course.features && course.features.length > 0 ? course.features : [
        "100% NCERT Syllabus Coverage",
        "Live 1-on-1 Voice Doubt Room",
        "Handwritten Formula PDF Notes",
        "Weekly Board Pattern Mock Tests"
      ]);
    } else {
      setEditingCourseId(null);
      setTitle("");
      setSubTitle("");
      setTargetClass("Class 10");
      setSubject("Mathematics");
      setLanguage("Hindi & English");
      setPrice(1499);
      setOriginalPrice(2499);
      setInstructorName(user?.name || "Pawan Gupta");
      setInstructorRole("Senior Board Faculty Lead");
      setDuration("60 Hours Live");
      setLessonsCount(45);
      setDescription("Comprehensive live online board preparation batch mapped 100% to NCERT curriculum with daily 15-minute doubt solving.");
      setThumbnail("https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-08-14-06-28-03-5696.png");
      setFeatures([
        "100% NCERT Syllabus Coverage",
        "Live 1-on-1 Voice Doubt Room",
        "Handwritten Formula PDF Notes",
        "Weekly Board Pattern Mock Tests"
      ]);
    }
    setIsCourseStudioOpen(true);
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course batch?")) return;
    try {
      await fetch(`/api/courses?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      setCourses((prev) => prev.filter((c) => c.id !== id && c.slug !== id));
      triggerConfetti();
    } catch (err) {
      console.error("Course deletion failed", err);
    }
  };

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

  // Live Class Scheduling State
  const [liveClasses, setLiveClasses] = useState<any[]>([]);
  const [isCreateLiveModalOpen, setIsCreateLiveModalOpen] = useState(false);
  const [newLiveTitle, setNewLiveTitle] = useState("");
  const [newLiveSubject, setNewLiveSubject] = useState("Mathematics");
  const [newLiveClass, setNewLiveClass] = useState("Class 10");
  const [newLiveBatch, setNewLiveBatch] = useState("All Enrolled Batches");
  const [newLiveStudentTarget, setNewLiveStudentTarget] = useState("all_enrolled");
  const [newLiveScheduledTime, setNewLiveScheduledTime] = useState("Today • 5:00 PM IST");
  const [isCreatingLive, setIsCreatingLive] = useState(false);

  // Faculty Batch Tests State
  const [facultyTests, setFacultyTests] = useState<any[]>([]);
  const [isCreateTestModalOpen, setIsCreateTestModalOpen] = useState(false);
  const [newTestTitle, setNewTestTitle] = useState("");
  const [newTestClass, setNewTestClass] = useState("Class 10");
  const [newTestSubject, setNewTestSubject] = useState("Mathematics");
  const [newTestBatch, setNewTestBatch] = useState("all");
  const [newTestDuration, setNewTestDuration] = useState(60);
  const [newTestMarks, setNewTestMarks] = useState(40);
  const [newTestQText, setNewTestQText] = useState("");
  const [newTestOpt0, setNewTestOpt0] = useState("");
  const [newTestOpt1, setNewTestOpt1] = useState("");
  const [newTestOpt2, setNewTestOpt2] = useState("");
  const [newTestOpt3, setNewTestOpt3] = useState("");
  const [newTestCorrect, setNewTestCorrect] = useState(0);
  const [newTestExplanation, setNewTestExplanation] = useState("");
  const [isSubmittingTest, setIsSubmittingTest] = useState(false);

  useEffect(() => {
    if (!user) return;
    const isMasterAdmin = user.role === "admin";
    const instQuery = isMasterAdmin ? "" : `?instructor=${encodeURIComponent(user.name || "")}&instructorEmail=${encodeURIComponent(user.email || "")}`;

    fetch(`/api/courses${instQuery}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.courses && data.courses.length > 0) {
          setCourses(data.courses);
          setNewLiveBatch(data.courses[0]?.slug || "All Enrolled Batches");
          setNewTestBatch(data.courses[0]?.slug || "all");
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));

    fetch(`/api/live/classes${instQuery}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.classes && data.classes.length > 0) setLiveClasses(data.classes);
      })
      .catch(() => {});

    fetch(`/api/tests${instQuery}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.tests && data.tests.length > 0) setFacultyTests(data.tests);
      })
      .catch(() => {});
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/login");
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

  const handleOpenCreateTestModal = () => {
    setNewTestTitle("");
    setNewTestClass("Class 10");
    setNewTestSubject("Mathematics");
    setNewTestBatch(courses[0]?.slug || "all");
    setNewTestDuration(60);
    setNewTestMarks(40);
    setNewTestQText("");
    setNewTestOpt0("");
    setNewTestOpt1("");
    setNewTestOpt2("");
    setNewTestOpt3("");
    setNewTestCorrect(0);
    setNewTestExplanation("");
    setIsCreateTestModalOpen(true);
  };

  const handleCreateTestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestTitle.trim()) return;
    setIsSubmittingTest(true);

    try {
      const selectedBatchCourse = courses.find((c) => c.slug === newTestBatch);
      const testPayload = {
        title: newTestTitle.trim(),
        class: newTestClass,
        subject: newTestSubject,
        targetBatch: newTestBatch,
        courseSlug: newTestBatch,
        instructorName: user?.name || "Senior Faculty",
        instructorEmail: user?.email || "",
        duration: Number(newTestDuration),
        totalMarks: Number(newTestMarks),
        questions: newTestQText.trim() ? [
          {
            id: 1,
            question: newTestQText.trim(),
            options: [newTestOpt0 || "Option A", newTestOpt1 || "Option B", newTestOpt2 || "Option C", newTestOpt3 || "Option D"],
            correctAnswer: Number(newTestCorrect),
            explanation: newTestExplanation.trim() || "Correct answer explanation based on NCERT guidelines.",
            marks: Number(newTestMarks)
          }
        ] : undefined
      };

      const res = await fetch("/api/tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testPayload),
      });

      const data = await res.json();
      if (data.success && data.test) {
        setFacultyTests((prev) => [data.test, ...prev]);
        setIsCreateTestModalOpen(false);
        triggerConfetti();
      }
    } catch (err) {
      console.error("Test creation failed", err);
    } finally {
      setIsSubmittingTest(false);
    }
  };

  const handleOpenCreateLiveModal = () => {
    setNewLiveTitle("");
    setNewLiveSubject("Mathematics");
    setNewLiveClass("Class 10");
    setNewLiveBatch("All Enrolled Batches");
    setNewLiveStudentTarget("all_enrolled");
    setNewLiveScheduledTime("Today • 5:00 PM IST");
    setIsCreateLiveModalOpen(true);
  };

  const handleCreateLiveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingLive(true);

    try {
      const roomId = `room-${newLiveSubject.toLowerCase().replace(/[^a-z0-9]/g, "")}-${newLiveClass.replace(/[^0-9]/g, "")}-${Date.now().toString(36)}`;
      const res = await fetch("/api/live/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId,
          title: newLiveTitle,
          subject: newLiveSubject,
          targetClass: newLiveClass,
          targetBatches: [newLiveBatch],
          selectedStudents: [newLiveStudentTarget],
          medium: "Hindi & English",
          instructor: user?.name || "Pawan Gupta",
          status: "LIVE_NOW",
          scheduledTime: newLiveScheduledTime,
        }),
      });

      const data = await res.json();
      if (data.success && data.liveClass) {
        setLiveClasses((prev) => [data.liveClass, ...prev]);
        setIsCreateLiveModalOpen(false);
        triggerConfetti();
        router.push(`/live/${data.liveClass.roomId}`);
      }
    } catch (err) {
      console.error("Live class creation failed", err);
    } finally {
      setIsCreatingLive(false);
    }
  };

  const handleDeleteLiveClass = async (roomId: string) => {
    if (!confirm("Are you sure you want to end and delete this live classroom?")) return;
    try {
      await fetch(`/api/live/classes?roomId=${encodeURIComponent(roomId)}`, { method: "DELETE" });
      setLiveClasses((prev) => prev.filter((lc) => lc.roomId !== roomId));
      triggerConfetti();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const classNum = parseInt(targetClass.replace(/[^0-9]/g, ""), 10) || 10;
      const coursePayload = {
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
      };

      if (editingCourseId) {
        const res = await fetch("/api/courses", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingCourseId,
            ...coursePayload,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setCourses((prev) =>
            prev.map((c) => (c.id === editingCourseId ? { ...c, ...coursePayload } : c))
          );
          setIsCourseStudioOpen(false);
          triggerConfetti();
        }
      } else {
        const res = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...coursePayload,
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
      }
    } catch (err) {
      console.error("Course submission failed", err);
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

  if (!user || (user.role !== "instructor" && user.role !== "admin")) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 mx-auto flex items-center justify-center">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-black text-slate-900">Faculty Credentials Required</h2>
            <p className="text-xs text-slate-500">
              This area is restricted to verified Fukey Education faculty and instructors.
            </p>
          </div>
          <Link
            href="/login"
            className="w-full block py-3.5 rounded-xl bg-[#050071] hover:bg-indigo-900 text-white font-black text-xs shadow-md transition-all hover:scale-105"
          >
            Sign In as Instructor →
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
                {user?.name || "Faculty Member"}
              </h1>
              <div className="text-xs text-indigo-200 font-medium">
                {user?.email || "faculty@fukeyeducation.com"}
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

            <button
              onClick={handleOpenCreateTestModal}
              className="px-5 py-3 rounded-2xl bg-[#5751E1] hover:bg-indigo-600 text-white font-black text-xs shadow-lg shadow-indigo-900/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Create Batch Test</span>
            </button>

            <Link
              href="/live/room-maths-10-quadratics"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-black text-xs shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Video className="w-4 h-4 animate-icon-pulse" />
              <span>Launch Live Studio</span>
            </Link>
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
                      onClick={() => handleOpenCourseStudio()}
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
                        className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-indigo-300"
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
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleOpenCourseStudio(c)}
                                className="px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-[#5751E1] hover:text-white text-[#5751E1] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                                title="Edit Course Batch"
                              >
                                <Edit className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteCourse(c.id)}
                                className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer"
                                title="Delete Course"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <Link
                                href={`/course/${c.slug}`}
                                target="_blank"
                                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1"
                                title="Preview Page"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            </div>
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
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                      <span>Live Classroom Broadcast Hub</span>
                    </h2>
                    <p className="text-xs text-slate-500">Launch interactive video lecture studios with digital whiteboard, batch access control &amp; live doubt queues</p>
                  </div>

                  <button
                    onClick={handleOpenCreateLiveModal}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Schedule / Start Live Class</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(liveClasses.length > 0 ? liveClasses : [
                    {
                      roomId: "room-maths-10-quadratics",
                      title: "Class 10th Maths: Quadratic Equations & Board Short-cuts",
                      subject: "Mathematics",
                      targetClass: "Class 10",
                      targetBatches: ["Class 10th Complete Mathematics"],
                      selectedStudents: ["all_enrolled"],
                      scheduledTime: "Today • 5:00 PM",
                      status: "LIVE_NOW"
                    },
                    {
                      roomId: "room-physics-12-optics",
                      title: "Class 12th Physics: Ray Optics Derivations & Numerical Tricks",
                      subject: "Physics",
                      targetClass: "Class 12",
                      targetBatches: ["All Enrolled Batches"],
                      selectedStudents: ["all_enrolled"],
                      scheduledTime: "Today • 6:30 PM",
                      status: "UPCOMING"
                    }
                  ]).map((lc, idx) => (
                    <div
                      key={lc.roomId || idx}
                      className="p-6 rounded-3xl bg-gradient-to-br from-[#050071] to-[#1C1A4A] text-white space-y-4 flex flex-col justify-between shadow-md"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase border border-emerald-400/30">
                            {lc.status === "LIVE_NOW" ? "● Broadcasting Room" : "⏰ Scheduled Session"}
                          </span>
                          <button
                            onClick={() => handleDeleteLiveClass(lc.roomId)}
                            className="text-slate-400 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                            title="End / Delete Room"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <h3 className="font-extrabold text-base line-clamp-2">{lc.title}</h3>
                        <div className="text-xs text-indigo-200">
                          {lc.targetClass} • {lc.subject} • {lc.scheduledTime}
                        </div>

                        <div className="pt-2 flex flex-wrap gap-1.5 text-[10px]">
                          <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-slate-300">
                            Batch: {lc.targetBatches?.[0] || "All Enrolled"}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-emerald-300">
                            Access: {lc.selectedStudents?.[0] === "open_masterclass" ? "Open Public" : "Enrolled Students"}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-slate-300">45-Min Lecture + 15-Min Doubts</span>
                        <Link
                          href={`/live/${lc.roomId || "room-maths-10-quadratics"}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF2424] hover:bg-red-700 text-white text-xs font-black transition-all hover:scale-105"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Enter Studio</span>
                        </Link>
                      </div>
                    </div>
                  ))}
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

        {/* MODAL: CREATE / EDIT COURSE STUDIO */}
        {isCourseStudioOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-black text-slate-900">
                    {editingCourseId ? "Edit Academic Course Batch" : "Academic Course Creator Studio"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingCourseId ? "Update curriculum details, pricing, educator and learning highlights" : "Deploy a full CBSE / State Board curriculum batch to the platform catalog"}
                  </p>
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
                    {isSubmitting
                      ? editingCourseId
                        ? "Saving Batch..."
                        : "Publishing to Platform..."
                      : editingCourseId
                      ? "Save Batch Changes"
                      : "Publish Course to Catalog"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: SCHEDULE LIVE CLASS STUDIO */}
        {isCreateLiveModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                    <Video className="w-5 h-5 text-[#FF2424]" />
                    <span>Schedule / Start Live Interactive Class</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Broadcast high-definition video lecture with live doubt resolution
                  </p>
                </div>
                <button
                  onClick={() => setIsCreateLiveModalOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateLiveSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Session / Lecture Title</label>
                  <input
                    type="text"
                    required
                    value={newLiveTitle}
                    onChange={(e) => setNewLiveTitle(e.target.value)}
                    placeholder="e.g. Class 10th Maths: Quadratic Formula Derivations"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target Class</label>
                    <select
                      value={newLiveClass}
                      onChange={(e) => setNewLiveClass(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-bold focus:outline-none"
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
                      value={newLiveSubject}
                      onChange={(e) => setNewLiveSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-bold focus:outline-none"
                    >
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science (PCB)</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                      <option value="Social Science">Social Science</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Batch Selection</label>
                  <select
                    value={newLiveBatch}
                    onChange={(e) => setNewLiveBatch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-bold focus:outline-none"
                  >
                    <option value="All Enrolled Batches">All Enrolled Batches in {newLiveClass}</option>
                    {courses
                      .filter((c) => !newLiveClass || c.class === newLiveClass)
                      .map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.title}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Access Control</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setNewLiveStudentTarget("all_enrolled")}
                      className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                        newLiveStudentTarget === "all_enrolled"
                          ? "bg-[#050071] text-white border-[#050071]"
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      Enrolled Students Only
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewLiveStudentTarget("open_masterclass")}
                      className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                        newLiveStudentTarget === "open_masterclass"
                          ? "bg-[#050071] text-white border-[#050071]"
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      Open Free Masterclass
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Scheduled Date &amp; Time</label>
                  <input
                    type="text"
                    required
                    value={newLiveScheduledTime}
                    onChange={(e) => setNewLiveScheduledTime(e.target.value)}
                    placeholder="e.g. Today • 5:00 PM – 6:30 PM IST"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsCreateLiveModalOpen(false)}
                    className="px-3.5 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingLive}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#050071] to-[#FF2424] hover:brightness-110 text-white font-bold shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>{isCreatingLive ? "Creating Studio..." : "Create & Launch Studio"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: CREATE BATCH MOCK TEST */}
        {isCreateTestModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-600" />
                    <span>Create Batch Mock Exam &amp; Quiz</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Publish chapter mock tests with anti-cheating &amp; automated scorecards
                  </p>
                </div>
                <button
                  onClick={() => setIsCreateTestModalOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateTestSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Test Title</label>
                  <input
                    type="text"
                    required
                    value={newTestTitle}
                    onChange={(e) => setNewTestTitle(e.target.value)}
                    placeholder="e.g. Unit 1: Quadratic Equations Practice Test"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target Class</label>
                    <select
                      value={newTestClass}
                      onChange={(e) => setNewTestClass(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-bold focus:outline-none"
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
                      value={newTestSubject}
                      onChange={(e) => setNewTestSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-bold focus:outline-none"
                    >
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                      <option value="Accountancy">Accountancy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Course / Batch</label>
                  <select
                    value={newTestBatch}
                    onChange={(e) => setNewTestBatch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-bold focus:outline-none"
                  >
                    <option value="all">All Enrolled Students (Public Mock Test)</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.title} ({c.class})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Duration (Minutes)</label>
                    <input
                      type="number"
                      min="10"
                      max="180"
                      required
                      value={newTestDuration}
                      onChange={(e) => setNewTestDuration(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Total Marks</label>
                    <input
                      type="number"
                      min="5"
                      max="100"
                      required
                      value={newTestMarks}
                      onChange={(e) => setNewTestMarks(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-800">Sample Question Preview</div>
                  <input
                    type="text"
                    value={newTestQText}
                    onChange={(e) => setNewTestQText(e.target.value)}
                    placeholder="Question: What is the discriminant formula for ax² + bx + c = 0?"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newTestOpt0}
                      onChange={(e) => setNewTestOpt0(e.target.value)}
                      placeholder="Option A (e.g. b² - 4ac)"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium"
                    />
                    <input
                      type="text"
                      value={newTestOpt1}
                      onChange={(e) => setNewTestOpt1(e.target.value)}
                      placeholder="Option B (e.g. 2a - b)"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium"
                    />
                    <input
                      type="text"
                      value={newTestOpt2}
                      onChange={(e) => setNewTestOpt2(e.target.value)}
                      placeholder="Option C (e.g. 4ac - b²)"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium"
                    />
                    <input
                      type="text"
                      value={newTestOpt3}
                      onChange={(e) => setNewTestOpt3(e.target.value)}
                      placeholder="Option D (e.g. -b / 2a)"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsCreateTestModalOpen(false)}
                    className="px-3.5 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingTest}
                    className="px-5 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isSubmittingTest ? "Publishing Test..." : "Publish Batch Test"}</span>
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
