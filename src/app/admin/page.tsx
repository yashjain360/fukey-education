"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  TrendingUp,
  Users,
  GraduationCap,
  FileText,
  DollarSign,
  Phone,
  Mail,
  CheckCircle2,
  Download,
  Search,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Filter,
  Plus,
  Send,
  Clock,
  BookOpen,
  Award,
  Edit,
  Eye,
  Check,
  X,
  RefreshCw,
  Trash2,
  FileCode,
  PenTool
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { TableRowSkeleton } from "@/components/ui/Skeleton";
import { triggerConfetti } from "@/lib/confetti";
import { coursesData, Course } from "@/data/coursesData";
import { instructorsData } from "@/data/instructorsData";
import { blogsData, BlogPost } from "@/data/blogsData";
import Pagination from "@/components/ui/Pagination";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  targetClass: string;
  medium: string;
  source?: string;
  status: "New Lead" | "Contacted" | "Trial Scheduled" | "Enrolled" | "Closed";
  notes?: string;
  date: string;
  time?: string;
}

interface Order {
  no: number | string;
  invoice: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseTitle: string;
  paid: string;
  totalNumeric: number;
  gateway: string;
  status: string;
  date: string;
  time?: string;
}

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"leads" | "orders" | "blogs" | "batches" | "faculty" | "broadcast">("leads");

  // Tab Pagination States
  const [leadsPage, setLeadsPage] = useState(1);
  const [ordersPage, setOrdersPage] = useState(1);
  const [blogsPage, setBlogsPage] = useState(1);
  const [coursesPage, setCoursesPage] = useState(1);
  const [facultyPage, setFacultyPage] = useState(1);

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const [orderSearch, setOrderSearch] = useState("");

  // Leads State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLeadsLoading, setIsLeadsLoading] = useState(true);
  const [leadSearch, setLeadSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  // Blogs State (Dynamic CRUD)
  const [blogs, setBlogs] = useState<BlogPost[]>(blogsData);
  const [isBlogsLoading, setIsBlogsLoading] = useState(true);
  const [blogSearch, setBlogSearch] = useState("");
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Academic Strategy & Board Prep");
  const [blogAuthor, setBlogAuthor] = useState("Fukey Academic Team");
  const [blogReadTime, setBlogReadTime] = useState("5 min read");
  const [blogImage, setBlogImage] = useState("/images/blogs/blog_board-pariksha-ki-taiyari-kaise-karen.webp");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [isSavingBlog, setIsSavingBlog] = useState(false);

  // Courses State (Dynamic CRUD)
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseClass, setNewCourseClass] = useState("Class 10");
  const [newCourseSubject, setNewCourseSubject] = useState("Mathematics");
  const [newCourseInstructor, setNewCourseInstructor] = useState("Pawan Gupta");
  const [newCoursePrice, setNewCoursePrice] = useState(1499);
  const [isSavingCourse, setIsSavingCourse] = useState(false);

  // Modals State
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState<Lead | null>(null);
  const [leadNotesText, setLeadNotesText] = useState("");

  // Form State for Add Walk-in Lead
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("+91 ");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadClass, setNewLeadClass] = useState("Class 10");
  const [newLeadMedium, setNewLeadMedium] = useState("Hindi Medium");
  const [newLeadNotes, setNewLeadNotes] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // Broadcast State
  const [broadcastAudience, setBroadcastAudience] = useState<"all_leads" | "enrolled" | "custom">("all_leads");
  const [broadcastSubject, setBroadcastSubject] = useState("Important Notice: Class 10th & 12th Board Live Revision Schedule");
  const [broadcastMessage, setBroadcastMessage] = useState("Dear Student,\n\nPlease find your upcoming live interactive batch schedule for CBSE & State Board revision.\n\nClasses commence sharp at 5:00 PM today on the Fukey Live Portal.\n\nTeam Fukey Education");
  const [isSendingBroadcast, setIsSendingBroadcast] = useState(false);
  const [broadcastSuccessCount, setBroadcastSuccessCount] = useState<number | null>(null);

  // Load All Dynamic Data
  const loadData = () => {
    setIsOrdersLoading(true);
    setIsLeadsLoading(true);
    setIsBlogsLoading(true);

    fetch("/api/orders?all=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.orders && data.orders.length > 0) setOrders(data.orders);
      })
      .catch(() => {})
      .finally(() => setIsOrdersLoading(false));

    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => {
        if (data.leads && data.leads.length > 0) setLeads(data.leads);
      })
      .catch(() => {})
      .finally(() => setIsLeadsLoading(false));

    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs && data.blogs.length > 0) setBlogs(data.blogs);
      })
      .catch(() => {})
      .finally(() => setIsBlogsLoading(false));

    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.courses && data.courses.length > 0) setCourses(data.courses);
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update Lead Status via PATCH
  const handleUpdateLeadStatus = async (leadId: string, newStatus: Lead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );

    try {
      await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      triggerConfetti();
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  // Save Lead Notes
  const handleSaveNotes = async () => {
    if (!selectedLeadForNotes) return;

    setLeads((prev) =>
      prev.map((l) => (l.id === selectedLeadForNotes.id ? { ...l, notes: leadNotesText } : l))
    );

    try {
      await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedLeadForNotes.id, notes: leadNotesText }),
      });
      setIsNotesModalOpen(false);
      triggerConfetti();
    } catch (e) {
      console.error("Failed to save notes", e);
    }
  };

  // Add Walk-in Lead Submit
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);

    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newLeadName,
          phone: newLeadPhone,
          email: newLeadEmail,
          targetClass: newLeadClass,
          medium: newLeadMedium,
          notes: newLeadNotes,
          source: "Bhopal Offline Admin Walk-in",
          status: "New Lead",
        }),
      });

      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => [data.lead, ...prev]);
        setIsAddLeadModalOpen(false);
        setNewLeadName("");
        setNewLeadPhone("+91 ");
        setNewLeadEmail("");
        setNewLeadNotes("");
        triggerConfetti();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Blog CRUD Operations
  const handleOpenBlogModal = (blogToEdit?: BlogPost) => {
    if (blogToEdit) {
      setEditingBlog(blogToEdit);
      setBlogTitle(blogToEdit.title);
      setBlogCategory(blogToEdit.category);
      setBlogAuthor(blogToEdit.author);
      setBlogReadTime(blogToEdit.readTime);
      setBlogImage(blogToEdit.image);
      setBlogExcerpt(blogToEdit.excerpt);
      setBlogContent(blogToEdit.content);
    } else {
      setEditingBlog(null);
      setBlogTitle("");
      setBlogCategory("Academic Strategy & Board Prep");
      setBlogAuthor("Fukey Academic Team");
      setBlogReadTime("5 min read");
      setBlogImage("/images/blogs/blog_board-pariksha-ki-taiyari-kaise-karen.webp");
      setBlogExcerpt("");
      setBlogContent("");
    }
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingBlog(true);

    try {
      if (editingBlog) {
        // Update Blog
        const res = await fetch("/api/blogs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingBlog.id,
            title: blogTitle,
            category: blogCategory,
            author: blogAuthor,
            readTime: blogReadTime,
            image: blogImage,
            excerpt: blogExcerpt,
            content: blogContent,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setBlogs((prev) =>
            prev.map((b) => (b.id === editingBlog.id ? { ...b, title: blogTitle, category: blogCategory, author: blogAuthor, excerpt: blogExcerpt, content: blogContent, image: blogImage, readTime: blogReadTime } : b))
          );
          setIsBlogModalOpen(false);
          triggerConfetti();
        }
      } else {
        // Create Blog
        const res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: blogTitle,
            category: blogCategory,
            author: blogAuthor,
            readTime: blogReadTime,
            image: blogImage,
            excerpt: blogExcerpt,
            content: blogContent,
          }),
        });
        const data = await res.json();
        if (data.success && data.blog) {
          setBlogs((prev) => [data.blog, ...prev]);
          setIsBlogModalOpen(false);
          triggerConfetti();
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingBlog(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await fetch(`/api/blogs?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      setBlogs((prev) => prev.filter((b) => b.id !== id && b.slug !== id));
      triggerConfetti();
    } catch (err) {
      console.error(err);
    }
  };

  // Course Batch CRUD
  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCourse(true);

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newCourseTitle,
          class: newCourseClass,
          classNum: parseInt(newCourseClass.replace(/[^0-9]/g, ""), 10) || 10,
          subject: newCourseSubject,
          instructor: newCourseInstructor,
          price: Number(newCoursePrice),
          originalPrice: Number(newCoursePrice) + 1000,
        }),
      });
      const data = await res.json();
      if (data.success && data.course) {
        setCourses((prev) => [data.course, ...prev]);
        setIsCourseModalOpen(false);
        setNewCourseTitle("");
        triggerConfetti();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingCourse(false);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course batch?")) return;
    try {
      await fetch(`/api/courses?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      setCourses((prev) => prev.filter((c) => c.id !== id && c.slug !== id));
      triggerConfetti();
    } catch (err) {
      console.error(err);
    }
  };

  // Send Broadcast via SMTP
  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingBroadcast(true);

    let recipients: string[] = [];
    if (broadcastAudience === "all_leads") {
      recipients = leads.map((l) => l.email).filter(Boolean);
    } else if (broadcastAudience === "enrolled") {
      recipients = orders.map((o) => o.studentEmail).filter(Boolean);
    } else {
      recipients = ["mayank@fukeyeducation.com", "info@fukeyeducation.com"];
    }

    recipients = Array.from(new Set(recipients));

    try {
      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients,
          subject: broadcastSubject,
          message: broadcastMessage,
          audienceType: broadcastAudience,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBroadcastSuccessCount(data.deliveredCount || recipients.length);
        triggerConfetti();
      }
    } catch (err) {
      console.error("Broadcast failed", err);
    } finally {
      setIsSendingBroadcast(false);
    }
  };

  const totalRevenue = orders.reduce((acc, curr) => {
    const num = curr.totalNumeric || parseInt(String(curr.paid).replace(/[^0-9]/g, ""), 10) || 1499;
    return acc + num;
  }, 0);

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const q = leadSearch.toLowerCase();
    const matchesSearch =
      !q ||
      (l.name && l.name.toLowerCase().includes(q)) ||
      (l.phone && l.phone.toLowerCase().includes(q)) ||
      (l.email && l.email.toLowerCase().includes(q)) ||
      (l.id && l.id.toLowerCase().includes(q));

    const matchesClass = classFilter === "All Classes" || l.targetClass === classFilter;
    const matchesStatus = statusFilter === "All Statuses" || l.status === statusFilter;

    return matchesSearch && matchesClass && matchesStatus;
  });

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const q = orderSearch.toLowerCase();
    return (
      !q ||
      (o.studentName && o.studentName.toLowerCase().includes(q)) ||
      (o.studentEmail && o.studentEmail.toLowerCase().includes(q)) ||
      (o.studentPhone && o.studentPhone.toLowerCase().includes(q)) ||
      (o.invoice && o.invoice.toLowerCase().includes(q)) ||
      (o.courseTitle && o.courseTitle.toLowerCase().includes(q))
    );
  });

  // Filtered Blogs
  const filteredBlogs = blogs.filter((b) => {
    const q = blogSearch.toLowerCase();
    return (
      !q ||
      (b.title && b.title.toLowerCase().includes(q)) ||
      (b.category && b.category.toLowerCase().includes(q)) ||
      (b.author && b.author.toLowerCase().includes(q))
    );
  });

  return (
    <div className="bg-slate-50/70 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Admin Header Banner */}
        <div
          className="bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#2D1B69] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          data-aos="fade-down"
          data-aos-duration="750"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img
                src="/images/logo/logo-white.png"
                alt="Fukey Education"
                className="h-7 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://fukeyeducation.com/uploads/custom-images/wsus-img-2025-11-10-12-04-32-8747.png";
                }}
              />
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-400/30 uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3" />
                <span>Master Admin &amp; CRM Hub</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Fukey Education Platform Admin
            </h1>
            <p className="text-xs text-slate-300">
              Live synchronization of website leads, blog posts, course batches, financial receipts, and broadcast notices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleOpenBlogModal()}
              className="px-3.5 py-2 rounded-xl bg-[#5751E1] hover:bg-indigo-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Write Blog</span>
            </button>

            <button
              onClick={() => setIsAddLeadModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Walk-in Lead</span>
            </button>

            <button
              onClick={loadData}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <Link
              href="/dashboard"
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Student View</span>
            </Link>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Gross Revenue */}
          <div
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2 group hover:border-emerald-300 transition-all"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Total Revenue</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-5 h-5 animate-icon-pulse" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% this week</span>
            </div>
          </div>

          {/* Card 2: Website Leads Pipeline */}
          <div
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2 group hover:border-orange-300 transition-all cursor-pointer"
            onClick={() => setActiveTab("leads")}
            data-aos="zoom-in"
            data-aos-delay="150"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Active Website Leads</span>
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#FF2424] flex items-center justify-center">
                <Users className="w-5 h-5 animate-icon-wiggle" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">
              {leads.length}
            </div>
            <div className="text-[11px] font-semibold text-slate-500">
              {leads.filter((l) => l.status === "New Lead").length} requiring immediate callback
            </div>
          </div>

          {/* Card 3: Dynamic Blogs Published */}
          <div
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2 group hover:border-sky-300 transition-all cursor-pointer"
            onClick={() => setActiveTab("blogs")}
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Published Blogs</span>
              <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
                <PenTool className="w-5 h-5 animate-icon-float" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">
              {blogs.length}
            </div>
            <div className="text-[11px] font-semibold text-slate-500">
              100% Dynamic MongoDB backing
            </div>
          </div>

          {/* Card 4: Active Batches */}
          <div
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2 group hover:border-purple-300 transition-all cursor-pointer"
            onClick={() => setActiveTab("batches")}
            data-aos="zoom-in"
            data-aos-delay="250"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Live Batches</span>
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 animate-icon-sparkle" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">
              {courses.length}
            </div>
            <div className="text-[11px] font-semibold text-slate-500">
              Classes 9th to 12th CBSE &amp; MP Board
            </div>
          </div>
        </div>

        {/* Master Admin Interactive Tabs Bar */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "leads"
                ? "bg-[#050071] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>🎯 Website Leads Pipeline</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === "leads" ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-700"
            }`}>
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "blogs"
                ? "bg-[#050071] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>📝 Blog &amp; Article CRUD</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === "blogs" ? "bg-sky-500 text-white" : "bg-slate-200 text-slate-700"
            }`}>
              {blogs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "orders"
                ? "bg-[#050071] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>💳 Paid Enrollments &amp; Invoices</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === "orders" ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-700"
            }`}>
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("batches")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "batches"
                ? "bg-[#050071] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>📚 Course &amp; Batch Manager</span>
          </button>

          <button
            onClick={() => setActiveTab("faculty")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "faculty"
                ? "bg-[#050071] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>👨‍🏫 Faculty Workload</span>
          </button>

          <button
            onClick={() => setActiveTab("broadcast")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "broadcast"
                ? "bg-[#050071] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>📢 SMTP Broadcaster</span>
          </button>
        </div>

        {/* TAB 1: WEBSITE LEADS & CRM PIPELINE */}
        {activeTab === "leads" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6" data-aos="fade-up">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>Admissions &amp; Lead Management Pipeline</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#FF2424] text-xs font-black">
                    Live CRM
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  Instant capture from Auto Engagement Modals, 60s Concept Quizzes, Formula Downloads, and Contact Forms.
                </p>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="All Classes">All Classes</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="All Statuses">All Statuses</option>
                  <option value="New Lead">🟡 New Lead</option>
                  <option value="Contacted">🔵 Contacted</option>
                  <option value="Trial Scheduled">🟣 Trial Scheduled</option>
                  <option value="Enrolled">🟢 Enrolled</option>
                  <option value="Closed">⚪ Closed</option>
                </select>

                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    placeholder="Search leads by name, phone..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#EBF2FF] text-[#1E3A8A] font-extrabold uppercase tracking-wider">
                    <th className="p-3.5 rounded-l-xl">Lead ID</th>
                    <th className="p-3.5">Student / Parent</th>
                    <th className="p-3.5">Contact &amp; 1-Click Action</th>
                    <th className="p-3.5">Target Stream</th>
                    <th className="p-3.5">Lead Source</th>
                    <th className="p-3.5">Pipeline Stage</th>
                    <th className="p-3.5">Counselor Remarks</th>
                    <th className="p-3.5 rounded-r-xl">Date &amp; Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {isLeadsLoading ? (
                    <>
                      <TableRowSkeleton />
                      <TableRowSkeleton />
                      <TableRowSkeleton />
                    </>
                  ) : filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-10 text-slate-400 font-semibold">
                        No leads matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads
                      .slice((leadsPage - 1) * 10, leadsPage * 10)
                      .map((lead) => {
                        const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
                        const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${lead.name}, thank you for inquiring at Fukey Education Bhopal for ${lead.targetClass}! Are you available for a 5-minute live trial class orientation?`)}`;

                        return (
                          <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3.5 font-mono font-bold text-slate-900">
                              {lead.id}
                            </td>

                            <td className="p-3.5">
                              <div className="font-bold text-slate-900">{lead.name}</div>
                              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                                <Mail className="w-3 h-3 text-slate-400" />
                                <span className="truncate max-w-[150px]">{lead.email}</span>
                              </div>
                            </td>

                            <td className="p-3.5">
                              <div className="flex items-center gap-2">
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs transition-all hover:scale-105 active:scale-95"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  <span>WhatsApp</span>
                                </a>

                                <a
                                  href={`tel:${lead.phone}`}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-[#050071] transition-colors"
                                  title="Call Student"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                              </div>
                              <div className="text-[10px] text-slate-400 mt-1 font-mono">{lead.phone}</div>
                            </td>

                            <td className="p-3.5">
                              <div className="font-bold text-slate-800">{lead.targetClass}</div>
                              <div className="text-[11px] text-indigo-600 font-semibold">{lead.medium}</div>
                            </td>

                            <td className="p-3.5 text-slate-600 text-[11px]">
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                                {lead.source || "Website Hub"}
                              </span>
                            </td>

                            <td className="p-3.5">
                              <select
                                value={lead.status}
                                onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as Lead["status"])}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border focus:outline-none cursor-pointer ${
                                  lead.status === "New Lead"
                                    ? "bg-amber-50 text-amber-800 border-amber-300"
                                    : lead.status === "Contacted"
                                    ? "bg-blue-50 text-blue-800 border-blue-300"
                                    : lead.status === "Trial Scheduled"
                                    ? "bg-purple-50 text-purple-800 border-purple-300"
                                    : lead.status === "Enrolled"
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                    : "bg-slate-100 text-slate-700 border-slate-300"
                                }`}
                              >
                                <option value="New Lead">🟡 New Lead</option>
                                <option value="Contacted">🔵 Contacted</option>
                                <option value="Trial Scheduled">🟣 Trial Scheduled</option>
                                <option value="Enrolled">🟢 Enrolled</option>
                                <option value="Closed">⚪ Closed</option>
                              </select>
                            </td>

                            <td className="p-3.5 max-w-xs">
                              <div
                                onClick={() => {
                                  setSelectedLeadForNotes(lead);
                                  setLeadNotesText(lead.notes || "");
                                  setIsNotesModalOpen(true);
                                }}
                                className="text-[11px] text-slate-600 line-clamp-2 hover:text-[#5751E1] cursor-pointer flex items-center gap-1 group"
                                title="Click to edit notes"
                              >
                                <span>{lead.notes || "Add counselor remarks..."}</span>
                                <Edit className="w-3 h-3 text-slate-400 group-hover:text-[#5751E1] flex-shrink-0" />
                              </div>
                            </td>

                            <td className="p-3.5 text-slate-500 text-[11px]">
                              <div>{lead.date}</div>
                              {lead.time && <div className="text-slate-400">{lead.time}</div>}
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={leadsPage}
              totalItems={filteredLeads.length}
              itemsPerPage={10}
              onPageChange={(page) => setLeadsPage(page)}
              pageSizeOptions={[10, 25, 50]}
            />
          </div>
        )}

        {/* TAB 2: BLOG & ARTICLE MANAGER (DYNAMIC CRUD) */}
        {activeTab === "blogs" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6" data-aos="fade-up">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>Dynamic Blog &amp; Article Manager</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 text-xs font-black">
                    MongoDB Backed
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  Publish, edit, and manage board exam study guides, NCERT strategy articles, and career posts.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  onClick={() => handleOpenBlogModal()}
                  className="px-4 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Post</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs
                .slice((blogsPage - 1) * 6, blogsPage * 6)
                .map((blog) => (
                  <div
                    key={blog.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs flex flex-col justify-between group hover:border-indigo-300 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 text-[10px] font-black text-[#050071]">
                          {blog.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 line-clamp-2">{blog.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{blog.excerpt}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="text-slate-400 text-[11px]">By {blog.author}</div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenBlogModal(blog)}
                          className="p-1.5 rounded-lg bg-indigo-50 hover:bg-[#5751E1] hover:text-white text-[#5751E1] transition-colors cursor-pointer"
                          title="Edit Blog"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer"
                          title="Delete Blog"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="View Published Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <Pagination
              currentPage={blogsPage}
              totalItems={filteredBlogs.length}
              itemsPerPage={6}
              onPageChange={(page) => setBlogsPage(page)}
              pageSizeOptions={[6, 12, 24]}
            />
          </div>
        )}

        {/* TAB 3: PAID ENROLLMENTS & INVOICES */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6" data-aos="fade-up">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Live Student Enrollments &amp; Checkout Invoices</h2>
                <p className="text-xs text-slate-500">
                  Official financial records, payment gateway IDs, and batch enrollment invoices.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search invoice, student, phone..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#EBF2FF] text-[#1E3A8A] font-extrabold uppercase tracking-wider">
                    <th className="p-3.5 rounded-l-xl">Invoice</th>
                    <th className="p-3.5">Student Details</th>
                    <th className="p-3.5">Phone</th>
                    <th className="p-3.5">Enrolled Batch</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Gateway</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5 rounded-r-xl">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {isOrdersLoading ? (
                    <>
                      <TableRowSkeleton />
                      <TableRowSkeleton />
                      <TableRowSkeleton />
                    </>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-10 text-slate-400 font-semibold">
                        No matching student orders found.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders
                      .slice((ordersPage - 1) * 10, ordersPage * 10)
                      .map((ord, idx) => (
                        <tr key={ord.invoice || idx} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-slate-900">
                            {ord.invoice}
                          </td>

                          <td className="p-3.5">
                            <div className="font-bold text-slate-900">{ord.studentName}</div>
                            <div className="text-[11px] text-slate-500">{ord.studentEmail}</div>
                          </td>

                          <td className="p-3.5 font-mono text-slate-600 text-[11px]">
                            {ord.studentPhone}
                          </td>

                          <td className="p-3.5 font-semibold text-slate-800">
                            {ord.courseTitle}
                          </td>

                          <td className="p-3.5 font-black text-[#050071]">
                            {ord.paid}
                          </td>

                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[10px]">
                              {ord.gateway}
                            </span>
                          </td>

                          <td className="p-3.5">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-extrabold text-[10px]">
                              {ord.status}
                            </span>
                          </td>

                          <td className="p-3.5 text-slate-500 text-[11px]">
                            <div>{ord.date}</div>
                          </td>

                          <td className="p-3.5">
                            <button
                              onClick={() => {
                                setSelectedInvoice(ord);
                                setIsInvoiceModalOpen(true);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-[#5751E1] hover:text-white text-[#5751E1] font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Invoice</span>
                            </button>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={ordersPage}
              totalItems={filteredOrders.length}
              itemsPerPage={10}
              onPageChange={(page) => setOrdersPage(page)}
              pageSizeOptions={[10, 25, 50]}
            />
          </div>
        )}

        {/* TAB 4: BATCH CATALOG & CAPACITY */}
        {activeTab === "batches" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6" data-aos="fade-up">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Live Academic Batches &amp; Seat Capacities</h2>
                <p className="text-xs text-slate-500">
                  Monitor live classroom batch occupancy, schedule timings, and syllabus completion.
                </p>
              </div>

              <button
                onClick={() => setIsCourseModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Live Batch</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .slice((coursesPage - 1) * 6, coursesPage * 6)
                .map((course) => (
                  <div
                    key={course.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase">
                          {course.class}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-[#050071]">
                            ₹{course.price}
                          </span>
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                            title="Delete Batch"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500">Instructor: {course.instructor}</p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-600">Batch Capacity</span>
                        <span className="text-emerald-600">92% Filled</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="w-[92%] h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <Pagination
              currentPage={coursesPage}
              totalItems={courses.length}
              itemsPerPage={6}
              onPageChange={(page) => setCoursesPage(page)}
              pageSizeOptions={[6, 12, 24]}
            />
          </div>
        )}

        {/* TAB 5: FACULTY WORKLOAD */}
        {activeTab === "faculty" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6" data-aos="fade-up">
            <div>
              <h2 className="text-xl font-black text-slate-900">Faculty Educators &amp; Studio Workloads</h2>
              <p className="text-xs text-slate-500">
                Gold medalist faculty schedule, doubt room resolution ratings, and student feedback.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {instructorsData
                .slice((facultyPage - 1) * 4, facultyPage * 4)
                .map((inst) => (
                  <div
                    key={inst.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-xs text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shadow-md border-2 border-indigo-100">
                      <img src={inst.photo || inst.image || "/images/instructors/kratika-rathore.webp"} alt={inst.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="font-black text-sm text-slate-900">{inst.name}</h3>
                      <p className="text-xs text-indigo-600 font-bold">{inst.role || inst.department}</p>
                      <p className="text-[11px] text-slate-400">{inst.experience} Experience</p>
                    </div>

                    <div className="w-full pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs font-bold">
                      <div className="p-2 rounded-xl bg-slate-50">
                        <div className="text-slate-900 font-black">{inst.coursesCount}</div>
                        <div className="text-[10px] text-slate-400">Batches</div>
                      </div>
                      <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
                        <div className="font-black">{inst.rating} ★</div>
                        <div className="text-[10px]">Rating</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <Pagination
              currentPage={facultyPage}
              totalItems={instructorsData.length}
              itemsPerPage={4}
              onPageChange={(page) => setFacultyPage(page)}
              pageSizeOptions={[4, 8, 12]}
            />
          </div>
        )}

        {/* TAB 6: SMTP EMAIL BROADCAST CENTER */}
        {activeTab === "broadcast" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6" data-aos="fade-up">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Direct SMTP Broadcaster</span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black">
                  info@thewebvale.com
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Send official timetable notices, batch announcements, and exam tips directly to leads or enrolled students.
              </p>
            </div>

            {broadcastSuccessCount !== null && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in">
                <span>Successfully dispatched broadcast to {broadcastSuccessCount} recipients via SMTP!</span>
                <button onClick={() => setBroadcastSuccessCount(null)} className="text-emerald-600 hover:text-emerald-900">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <form onSubmit={handleSendBroadcast} className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Audience</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setBroadcastAudience("all_leads")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      broadcastAudience === "all_leads"
                        ? "bg-[#050071] text-white border-[#050071]"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    All Website Leads ({leads.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setBroadcastAudience("enrolled")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      broadcastAudience === "enrolled"
                        ? "bg-[#050071] text-white border-[#050071]"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    Enrolled Students ({orders.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setBroadcastAudience("custom")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      broadcastAudience === "custom"
                        ? "bg-[#050071] text-white border-[#050071]"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    Admin Test List
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Announcement Subject</label>
                <input
                  type="text"
                  required
                  value={broadcastSubject}
                  onChange={(e) => setBroadcastSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Message Body</label>
                <textarea
                  rows={5}
                  required
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSendingBroadcast}
                className="px-6 py-3 rounded-xl bg-[#5751E1] hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSendingBroadcast ? "Dispatching Emails..." : "Send Official Broadcast"}</span>
              </button>
            </form>
          </div>
        )}

        {/* MODAL: BLOG CREATE & EDIT */}
        {isBlogModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {editingBlog ? "Edit Board Strategy Article" : "Write & Publish New Article"}
                  </h3>
                  <p className="text-xs text-slate-500">Live dynamic publishing to Fukey Education knowledge base</p>
                </div>
                <button
                  onClick={() => setIsBlogModalOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Article Headline / Title</label>
                  <input
                    type="text"
                    required
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="e.g. 5 Memory Tricks to Master Class 10th Trigonometry"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold focus:outline-none"
                    >
                      <option value="Academic Strategy & Board Prep">Academic Strategy &amp; Board Prep</option>
                      <option value="NCERT Syllabus">NCERT Syllabus</option>
                      <option value="Study Strategies">Study Strategies</option>
                      <option value="Career Guidance">Career Guidance</option>
                      <option value="Inventions & GK">Inventions &amp; GK</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Author Name</label>
                    <input
                      type="text"
                      required
                      value={blogAuthor}
                      onChange={(e) => setBlogAuthor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Read Time Estimate</label>
                    <input
                      type="text"
                      value={blogReadTime}
                      onChange={(e) => setBlogReadTime(e.target.value)}
                      placeholder="e.g. 4 min read"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Cover Image URL</label>
                    <input
                      type="text"
                      value={blogImage}
                      onChange={(e) => setBlogImage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Short Excerpt (SEO Summary)</label>
                  <textarea
                    rows={2}
                    required
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    placeholder="Brief 2-sentence synopsis for social sharing..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Article Body &amp; Markdown</label>
                  <textarea
                    rows={8}
                    required
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    placeholder="Write detailed subject concepts, study tips, or derivations..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500 font-medium font-mono text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBlogModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingBlog}
                    className="px-6 py-2.5 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {isSavingBlog ? "Publishing..." : editingBlog ? "Save Changes" : "Publish Article"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: CREATE COURSE BATCH */}
        {isCourseModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-black text-base text-slate-900">Create New Academic Batch</h3>
                <button onClick={() => setIsCourseModalOpen(false)} className="p-1.5 rounded-full bg-slate-100">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Batch Name</label>
                  <input
                    type="text"
                    required
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                    placeholder="e.g. CLASS 10TH SCIENCE CRASH COURSE"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Class</label>
                    <select
                      value={newCourseClass}
                      onChange={(e) => setNewCourseClass(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-bold"
                    >
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={newCourseSubject}
                      onChange={(e) => setNewCourseSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Instructor</label>
                    <input
                      type="text"
                      required
                      value={newCourseInstructor}
                      onChange={(e) => setNewCourseInstructor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Fee (₹ INR)</label>
                    <input
                      type="number"
                      required
                      value={newCoursePrice}
                      onChange={(e) => setNewCoursePrice(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCourseModalOpen(false)}
                    className="px-3 py-2 rounded-xl text-slate-600 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingCourse}
                    className="px-5 py-2 rounded-xl bg-[#050071] text-white font-bold shadow-md"
                  >
                    {isSavingCourse ? "Saving..." : "Create Batch"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD WALK-IN LEAD */}
        {isAddLeadModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-black text-slate-900">Add Offline Walk-in Admission Lead</h3>
                  <p className="text-xs text-slate-500">Record inquiries from Bhopal center visits or incoming calls</p>
                </div>
                <button
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student / Parent Full Name</label>
                  <input
                    type="text"
                    required
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    placeholder="e.g. Vikas Sharma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="text"
                      required
                      value={newLeadPhone}
                      onChange={(e) => setNewLeadPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={newLeadEmail}
                      onChange={(e) => setNewLeadEmail(e.target.value)}
                      placeholder="vikas@gmail.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target Class</label>
                    <select
                      value={newLeadClass}
                      onChange={(e) => setNewLeadClass(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold focus:outline-none"
                    >
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Medium</label>
                    <select
                      value={newLeadMedium}
                      onChange={(e) => setNewLeadMedium(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold focus:outline-none"
                    >
                      <option value="Hindi Medium">Hindi Medium</option>
                      <option value="English Medium">English Medium</option>
                      <option value="Hindi & English">Hindi &amp; English (Bilingual)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Counselor Discussion Notes</label>
                  <textarea
                    rows={3}
                    value={newLeadNotes}
                    onChange={(e) => setNewLeadNotes(e.target.value)}
                    placeholder="e.g. Visited center with father. Wants offline doubt session on Sunday..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddLeadModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    {isSubmittingLead ? "Saving..." : "Save Walk-in Lead"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: EDIT LEAD NOTES */}
        {isNotesModalOpen && selectedLeadForNotes && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Counselor Notes: {selectedLeadForNotes.name}</h3>
                  <p className="text-[11px] text-slate-500">{selectedLeadForNotes.targetClass} • {selectedLeadForNotes.phone}</p>
                </div>
                <button
                  onClick={() => setIsNotesModalOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <textarea
                  rows={4}
                  value={leadNotesText}
                  onChange={(e) => setLeadNotesText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsNotesModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="px-5 py-2 rounded-xl bg-[#050071] hover:bg-indigo-900 text-white text-xs font-bold shadow-sm"
                >
                  Save Remarks
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: INVOICE PREVIEW */}
        {isInvoiceModalOpen && selectedInvoice && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/logo/logo-main.png"
                    alt="Fukey Education"
                    className="h-8 w-auto object-contain"
                  />
                  <div>
                    <div className="text-[10px] font-black uppercase text-indigo-600">Official Receipt</div>
                    <div className="font-mono font-bold text-xs text-slate-900">{selectedInvoice.invoice}</div>
                  </div>
                </div>

                <button
                  onClick={() => setIsInvoiceModalOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50">
                  <div>
                    <span className="text-slate-400 text-[11px]">Billed To</span>
                    <div className="font-bold text-slate-900 mt-0.5">{selectedInvoice.studentName}</div>
                    <div className="text-slate-500">{selectedInvoice.studentPhone}</div>
                    <div className="text-slate-500">{selectedInvoice.studentEmail}</div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[11px]">Date &amp; Gateway</span>
                    <div className="font-bold text-slate-900 mt-0.5">{selectedInvoice.date}</div>
                    <div className="text-slate-500">{selectedInvoice.gateway}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {selectedInvoice.status}
                    </span>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="bg-slate-100 p-3 font-bold text-slate-700 flex justify-between">
                    <span>Enrolled Course / Batch</span>
                    <span>Amount</span>
                  </div>
                  <div className="p-3 flex justify-between font-semibold text-slate-900">
                    <span>{selectedInvoice.courseTitle}</span>
                    <span className="font-black text-[#050071]">{selectedInvoice.paid}</span>
                  </div>
                </div>

                <div className="p-3 bg-indigo-50/60 rounded-xl text-[11px] text-slate-600 space-y-1">
                  <div><strong>Offline Studio:</strong> Guru Kripa Tower, Kolar Road, Bhopal (M.P.)</div>
                  <div><strong>Support Helpline:</strong> +91 88718 35015 / +91 70248 49838</div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-[#050071] hover:bg-indigo-900 text-white text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Subtle TheWebVale Portal Branding */}
        <div className="text-center pt-4">
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span>Admin Console &amp; Dynamic Content Hub Engineered with ❤️ by</span>
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
    </div>
  );
}
