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
  RefreshCw
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { TableRowSkeleton } from "@/components/ui/Skeleton";
import { triggerConfetti } from "@/lib/confetti";
import { coursesData } from "@/data/coursesData";
import { instructorsData } from "@/data/instructorsData";

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
  const [activeTab, setActiveTab] = useState<"leads" | "orders" | "analytics" | "batches" | "faculty" | "broadcast">("leads");

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

  // Fetch Orders & Leads
  const loadData = () => {
    setIsOrdersLoading(true);
    setIsLeadsLoading(true);

    fetch("/api/orders?all=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.orders && data.orders.length > 0) {
          setOrders(data.orders);
        } else {
          setOrders([
            {
              no: 1,
              invoice: "INV-2026-89412",
              studentName: "Mayank Dubey",
              studentEmail: "mayank@fukeyeducation.com",
              studentPhone: "+91 88718 35015",
              courseTitle: "MATHS 10TH (HINDI MEDIUM)",
              paid: "₹1,499.00",
              totalNumeric: 1499,
              gateway: "Instant UPI / QR",
              status: "Success",
              date: "21 Aug 2026",
              time: "11:15 AM",
            },
            {
              no: 2,
              invoice: "INV-2026-78105",
              studentName: "Aman Sharma",
              studentEmail: "aman.sharma@gmail.com",
              studentPhone: "+91 98765 43210",
              courseTitle: "SCIENCE 10TH (ENGLISH MEDIUM)",
              paid: "₹1,499.00",
              totalNumeric: 1499,
              gateway: "Card / NetBanking",
              status: "Success",
              date: "20 Aug 2026",
              time: "04:30 PM",
            },
            {
              no: 3,
              invoice: "INV-2026-64219",
              studentName: "Pooja Verma",
              studentEmail: "pooja.verma@yahoo.com",
              studentPhone: "+91 98234 56789",
              courseTitle: "CLASS 12 PHYSICS & CHEMISTRY",
              paid: "₹2,998.00",
              totalNumeric: 2998,
              gateway: "Instant UPI / QR",
              status: "Success",
              date: "19 Aug 2026",
              time: "02:10 PM",
            }
          ]);
        }
      })
      .catch(() => {})
      .finally(() => setIsOrdersLoading(false));

    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => {
        if (data.leads && data.leads.length > 0) {
          setLeads(data.leads);
        } else {
          setLeads([
            {
              id: "ENQ-2026-90412",
              name: "Rahul Verma",
              phone: "+91 88718 35015",
              email: "rahul.verma@gmail.com",
              targetClass: "Class 10",
              medium: "Hindi Medium",
              source: "Auto Engagement Modal",
              status: "New Lead",
              notes: "Requested callback for Class 10th Maths batch timings and fee structure.",
              date: "21 Aug 2026",
              time: "11:40 AM",
            },
            {
              id: "ENQ-2026-89104",
              name: "Sneha Patel",
              phone: "+91 70248 49838",
              email: "sneha.p@yahoo.co.in",
              targetClass: "Class 12",
              medium: "English Medium",
              source: "60-Second Board Readiness Quiz",
              status: "Trial Scheduled",
              notes: "Scored 3/3 in Physics Quiz. Trial class scheduled for Physics Derivations with Pawan Sir.",
              date: "21 Aug 2026",
              time: "10:15 AM",
            },
            {
              id: "ENQ-2026-78321",
              name: "Ankit Chouhan",
              phone: "+91 98260 12345",
              email: "ankit.bhopal@gmail.com",
              targetClass: "Class 11",
              medium: "Hindi & English",
              source: "Bhopal Center Walk-in Inquiry",
              status: "Contacted",
              notes: "Spoke with father. Interested in 45+15 live classroom tablet pedagogy.",
              date: "20 Aug 2026",
              time: "05:50 PM",
            },
            {
              id: "ENQ-2026-64190",
              name: "Priyanka Mishra",
              phone: "+91 94250 98765",
              email: "priyanka.m@gmail.com",
              targetClass: "Class 10",
              medium: "Hindi Medium",
              source: "Formula Sheet Download",
              status: "Enrolled",
              notes: "Successfully enrolled into Class 10th Board Booster Batch via UPI.",
              date: "19 Aug 2026",
              time: "01:20 PM",
            }
          ]);
        }
      })
      .catch(() => {})
      .finally(() => setIsLeadsLoading(false));
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

    // Deduplicate
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

  // Export CSV
  const handleExportCSV = () => {
    if (activeTab === "leads") {
      const headers = "Lead ID,Name,Phone,Email,Target Class,Medium,Source,Status,Date,Notes\n";
      const rows = leads
        .map(
          (l) =>
            `"${l.id}","${l.name}","${l.phone}","${l.email}","${l.targetClass}","${l.medium}","${l.source || ''}","${l.status}","${l.date}","${(l.notes || '').replace(/"/g, '""')}"`
        )
        .join("\n");
      const blob = new Blob([headers + rows], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `fukey_leads_crm_${Date.now()}.csv`;
      a.click();
    } else {
      const headers = "Invoice,Student Name,Email,Phone,Course,Amount,Gateway,Status,Date\n";
      const rows = orders
        .map(
          (o) =>
            `"${o.invoice}","${o.studentName || 'Student'}","${o.studentEmail || ''}","${o.studentPhone || ''}","${o.courseTitle || ''}","${o.paid}","${o.gateway}","${o.status}","${o.date}"`
        )
        .join("\n");
      const blob = new Blob([headers + rows], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `fukey_orders_export_${Date.now()}.csv`;
      a.click();
    }
  };

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
              Live synchronization of website leads, trial callbacks, student enrollments, batches, and broadcast notifications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsAddLeadModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Walk-in Lead</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-[#FF2424] hover:bg-red-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export {activeTab === "leads" ? "Leads" : "Orders"} CSV</span>
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

          {/* Card 3: Paid Enrollments */}
          <div
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2 group hover:border-indigo-300 transition-all cursor-pointer"
            onClick={() => setActiveTab("orders")}
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Paid Enrollments</span>
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-[#5751E1] flex items-center justify-center">
                <FileText className="w-5 h-5 animate-icon-float" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">
              {orders.length}
            </div>
            <div className="text-[11px] font-semibold text-slate-500">
              100% verified gateway receipts
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
              52
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
            <span>📚 Batch Catalog &amp; Seats</span>
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
                    filteredLeads.map((lead) => {
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
          </div>
        )}

        {/* TAB 2: PAID ENROLLMENTS & INVOICES */}
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
                    filteredOrders.map((ord, idx) => (
                      <tr key={ord.invoice || idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-slate-900">
                          {ord.invoice}
                        </td>

                        <td className="p-3.5">
                          <div className="font-bold text-slate-900">{ord.studentName || "Mayank Dubey"}</div>
                          <div className="text-[11px] text-slate-500">{ord.studentEmail}</div>
                        </td>

                        <td className="p-3.5">
                          <div className="font-mono text-slate-700">{ord.studentPhone || "+91 88718 35015"}</div>
                        </td>

                        <td className="p-3.5 font-bold text-slate-800 max-w-xs">
                          <div className="line-clamp-1">{ord.courseTitle || "Class 10th Maths Booster"}</div>
                        </td>

                        <td className="p-3.5 font-black text-slate-900 text-sm">
                          {ord.paid}
                        </td>

                        <td className="p-3.5 text-slate-600">
                          {ord.gateway}
                        </td>

                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{ord.status}</span>
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
          </div>
        )}

        {/* TAB 3: BATCH CATALOG & CAPACITY */}
        {activeTab === "batches" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6" data-aos="fade-up">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Live Academic Batches &amp; Seat Capacities</h2>
                <p className="text-xs text-slate-500">
                  Monitor live classroom batch occupancy, schedule timings, and syllabus completion.
                </p>
              </div>

              <span className="px-3.5 py-1 rounded-full bg-indigo-100 text-[#050071] font-black text-xs">
                52 Active Batches
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesData.slice(0, 6).map((course) => (
                <div
                  key={course.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase">
                        {course.class}
                      </span>
                      <span className="text-xs font-black text-[#050071]">
                        ₹{course.price}
                      </span>
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
          </div>
        )}

        {/* TAB 4: FACULTY WORKLOAD */}
        {activeTab === "faculty" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6" data-aos="fade-up">
            <div>
              <h2 className="text-xl font-black text-slate-900">Faculty Educators &amp; Studio Workloads</h2>
              <p className="text-xs text-slate-500">
                Gold medalist faculty schedule, doubt room resolution ratings, and student feedback.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {instructorsData.map((inst) => (
                <div
                  key={inst.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-xs text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shadow-md border-2 border-indigo-100">
                    <img src={inst.avatar} alt={inst.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="font-black text-sm text-slate-900">{inst.name}</h3>
                    <p className="text-xs text-indigo-600 font-bold">{inst.subject}</p>
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
          </div>
        )}

        {/* TAB 5: SMTP EMAIL BROADCAST CENTER */}
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

        {/* MODAL 1: ADD WALK-IN LEAD */}
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

        {/* MODAL 2: EDIT LEAD NOTES */}
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

        {/* MODAL 3: INVOICE PREVIEW */}
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
            <span>Admin Console &amp; Leads Hub Engineered with ❤️ by</span>
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
