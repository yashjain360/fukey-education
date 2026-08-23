"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  PenTool,
  Image as ImageIcon
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { TableRowSkeleton } from "@/components/ui/Skeleton";
import { triggerConfetti } from "@/lib/confetti";
import { coursesData, Course } from "@/data/coursesData";
import { instructorsData, Instructor } from "@/data/instructorsData";
import { blogsData, BlogPost } from "@/data/blogsData";
import Pagination from "@/components/ui/Pagination";
import RichTextEditor from "@/components/ui/RichTextEditor";
import CustomConfirmModal from "@/components/ui/CustomConfirmModal";
import ToastNotification from "@/components/ui/ToastNotification";

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
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  type AdminTab = "leads" | "orders" | "blogs" | "batches" | "faculty" | "broadcast";
  const [activeTab, setActiveTab] = useState<AdminTab>("leads");

  useEffect(() => {
    if (!isAuthLoading && (!user || user.role !== "admin")) {
      router.replace("/login?redirect=/admin");
    }
  }, [user, isAuthLoading, router]);

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.replaceState(null, "", url.toString());
      localStorage.setItem("fukey_admin_active_tab", tab);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tabParam = new URLSearchParams(window.location.search).get("tab") as AdminTab;
      const validTabs: AdminTab[] = ["leads", "orders", "blogs", "batches", "faculty", "broadcast"];
      if (tabParam && validTabs.includes(tabParam)) {
        setActiveTab(tabParam);
      } else {
        const savedTab = localStorage.getItem("fukey_admin_active_tab") as AdminTab;
        if (savedTab && validTabs.includes(savedTab)) {
          setActiveTab(savedTab);
        }
      }
    }
  }, []);

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
  const [isImageBrowserOpen, setIsImageBrowserOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Academic Strategy & Board Prep");
  const [blogAuthor, setBlogAuthor] = useState("Fukey Academic Team");
  const [blogReadTime, setBlogReadTime] = useState("5 min read");
  const [blogImage, setBlogImage] = useState("/images/blogs/blog_board-pariksha-ki-taiyari-kaise-karen.webp");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [isSavingBlog, setIsSavingBlog] = useState(false);

  const PRESET_BLOG_IMAGES = [
    {
      title: "Board Exam Preparation & Strategy",
      url: "/images/blogs/blog_board-pariksha-ki-taiyari-kaise-karen.webp",
      category: "Academic Strategy",
    },
    {
      title: "Class 9 Social Science NCERT Guide",
      url: "/images/blogs/blog_class-9-social-science-ncert-guide.webp",
      category: "Social Science",
    },
    {
      title: "Class 10 Mathematics Formula Sheet",
      url: "/images/blogs/blog_class-10-maths-formula-sheet.webp",
      category: "Mathematics",
    },
    {
      title: "Class 12 Physics Core Derivations",
      url: "/images/blogs/blog_class-12-physics-derivations-guide.webp",
      category: "Physics",
    },
    {
      title: "Class 10 Science Important Chemical Reactions",
      url: "/images/blogs/blog_cbse-class-10-science-important-reactions.webp",
      category: "Chemistry",
    },
    {
      title: "Class 12 Biology Diagrams & Physiology",
      url: "/images/blogs/blog_class-12-biology-diagrams-mastery.webp",
      category: "Biology",
    },
    {
      title: "Class 11 Accountancy Partnership & Balance Sheets",
      url: "/images/blogs/blog_class-11-accountancy-partnership-guide.webp",
      category: "Commerce",
    },
    {
      title: "History Dates & Chronology Timelines",
      url: "/images/blogs/blog_how-to-remember-history-dates-timeline.webp",
      category: "Humanities",
    },
    {
      title: "Board Exam Hall Room Checklist",
      url: "/images/blogs/blog_board-exam-room-checklist.webp",
      category: "Exam Tips",
    },
  ];

  // Courses State (Dynamic CRUD)
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseClass, setNewCourseClass] = useState("Class 10");
  const [newCourseSubject, setNewCourseSubject] = useState("Mathematics");
  const [newCourseInstructor, setNewCourseInstructor] = useState("Pawan Gupta");
  const [newCoursePrice, setNewCoursePrice] = useState(1499);
  const [isSavingCourse, setIsSavingCourse] = useState(false);

  // Faculty State (Dynamic CRUD)
  const [instructors, setInstructors] = useState<Instructor[]>(instructorsData);
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [editingFacultyId, setEditingFacultyId] = useState<string | null>(null);
  const [facultyName, setFacultyName] = useState("");
  const [facultyRole, setFacultyRole] = useState("");
  const [facultyDepartment, setFacultyDepartment] = useState("Science");
  const [facultyExperience, setFacultyExperience] = useState("5+ Years Experience");
  const [facultyQualification, setFacultyQualification] = useState("M.Sc., B.Ed.");
  const [facultyPhoto, setFacultyPhoto] = useState("/images/instructors/kratika-rathore.webp");
  const [facultyRating, setFacultyRating] = useState(4.9);
  const [facultyCoursesCount, setFacultyCoursesCount] = useState(4);
  const [facultyBio, setFacultyBio] = useState("");
  const [isSavingFaculty, setIsSavingFaculty] = useState(false);

  // Custom Confirm Modal & Toast State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    onConfirm: () => Promise<void> | void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

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

  // Broadcast State (Multi-Audience Targeting)
  type BroadcastAudience =
    | "all_leads"
    | "enrolled"
    | "faculty"
    | "class_9"
    | "class_10"
    | "class_11"
    | "class_12"
    | "custom";
  const [broadcastAudience, setBroadcastAudience] = useState<BroadcastAudience>("all_leads");
  const [customEmails, setCustomEmails] = useState("");
  const [broadcastSubject, setBroadcastSubject] = useState("Important Notice: Class 10th & 12th Board Live Revision Schedule");
  const [broadcastMessage, setBroadcastMessage] = useState("Dear Student,\n\nPlease find your upcoming live interactive batch schedule for CBSE & State Board revision.\n\nClasses commence sharp at 5:00 PM today on the Fukey Live Portal.\n\nTeam Fukey Education");
  const [isSendingBroadcast, setIsSendingBroadcast] = useState(false);
  const [broadcastSuccessCount, setBroadcastSuccessCount] = useState<number | null>(null);
  // Course Assignment to Student State
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignStudentEmail, setAssignStudentEmail] = useState("");
  const [assignStudentName, setAssignStudentName] = useState("");
  const [assignCourseSlug, setAssignCourseSlug] = useState("");
  const [isAssigningCourse, setIsAssigningCourse] = useState(false);

  const handleOpenAssignModal = () => {
    setAssignStudentEmail("");
    setAssignStudentName("");
    setAssignCourseSlug(courses[0]?.slug || "class-10th-complete-mathematics");
    setIsAssignModalOpen(true);
  };

  const handleAssignCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignStudentEmail.trim()) return;
    setIsAssigningCourse(true);

    try {
      const selectedCourse = courses.find((c) => c.slug === assignCourseSlug) || courses[0];
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentEmail: assignStudentEmail.trim(),
          studentName: assignStudentName.trim() || assignStudentEmail.split("@")[0],
          courseSlug: assignCourseSlug,
          courseTitle: selectedCourse?.title || "Academic Board Batch",
          courseId: selectedCourse?.id || assignCourseSlug,
          assignedBy: "admin",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsAssignModalOpen(false);
        triggerConfetti();
        showToast(`Successfully assigned ${selectedCourse?.title || "Course"} to ${assignStudentEmail}!`);
      }
    } catch (err) {
      console.error("Course assignment failed", err);
    } finally {
      setIsAssigningCourse(false);
    }
  };

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
        if (data.courses && data.courses.length > 0) {
          const uniqueMap = new Map<string, any>();
          data.courses.forEach((c: any) => {
            const key = c.slug || c.id;
            if (key && !uniqueMap.has(key)) {
              uniqueMap.set(key, c);
            }
          });
          setCourses(Array.from(uniqueMap.values()));
        }
      })
      .catch(() => {});

    fetch("/api/instructors")
      .then((res) => res.json())
      .then((data) => {
        if (data.instructors && data.instructors.length > 0) setInstructors(data.instructors);
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

  const handleDeleteBlog = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Blog Post?",
      message: "Are you sure you want to delete this educational article? It will be removed immediately from the public website and blog index.",
      confirmText: "Delete Post",
      onConfirm: async () => {
        // 1. Instant live optimistic UI update
        setBlogs((prev) => prev.filter((b) => b.id !== id && b.slug !== id));
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        triggerConfetti();
        showToast("Blog post successfully deleted.");

        // 2. Background database delete
        try {
          await fetch(`/api/blogs?id=${encodeURIComponent(id)}`, { method: "DELETE" });
        } catch (err) {
          console.error("Blog deletion failed", err);
        }
      },
    });
  };

  // Course Batch CRUD
  const handleOpenCourseModal = (course?: Course) => {
    if (course) {
      setEditingCourseId(course.id);
      setNewCourseTitle(course.title);
      setNewCourseClass(course.class || "Class 10");
      setNewCourseSubject(course.subject || "Mathematics");
      setNewCourseInstructor(course.instructor || "Pawan Gupta");
      setNewCoursePrice(course.price || 1499);
    } else {
      setEditingCourseId(null);
      setNewCourseTitle("");
      setNewCourseClass("Class 10");
      setNewCourseSubject("Mathematics");
      setNewCourseInstructor("Pawan Gupta");
      setNewCoursePrice(1499);
    }
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCourse(true);

    try {
      const classNum = parseInt(newCourseClass.replace(/[^0-9]/g, ""), 10) || 10;
      if (editingCourseId) {
        const res = await fetch("/api/courses", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingCourseId,
            title: newCourseTitle,
            class: newCourseClass,
            classNum,
            subject: newCourseSubject,
            instructor: newCourseInstructor,
            price: Number(newCoursePrice),
            originalPrice: Number(newCoursePrice) + 1000,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setCourses((prev) =>
            prev.map((c) =>
              c.id === editingCourseId
                ? {
                    ...c,
                    title: newCourseTitle,
                    class: newCourseClass,
                    classNum,
                    subject: newCourseSubject,
                    instructor: newCourseInstructor,
                    price: Number(newCoursePrice),
                    originalPrice: Number(newCoursePrice) + 1000,
                  }
                : c
            )
          );
          setIsCourseModalOpen(false);
          triggerConfetti();
        }
      } else {
        const res = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newCourseTitle,
            class: newCourseClass,
            classNum,
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
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingCourse(false);
    }
  };

  const handleDeleteCourse = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Course Batch?",
      message: "Are you sure you want to delete this course batch? It will be removed immediately from the platform catalog.",
      confirmText: "Delete Batch",
      onConfirm: async () => {
        // 1. Instant live optimistic UI update (removes exactly 1 entry)
        setCourses((prev) => {
          const index = prev.findIndex((c) => c.id === id || c.slug === id);
          if (index === -1) return prev;
          const next = [...prev];
          next.splice(index, 1);
          return next;
        });
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        triggerConfetti();
        showToast("Course batch successfully deleted.");

        // 2. Background database delete
        try {
          await fetch(`/api/courses?id=${encodeURIComponent(id)}`, { method: "DELETE" });
        } catch (err) {
          console.error(err);
        }
      },
    });
  };

  // Faculty Educators CRUD
  const handleOpenFacultyModal = (inst?: Instructor) => {
    if (inst) {
      setEditingFacultyId(inst.id);
      setFacultyName(inst.name);
      setFacultyRole(inst.role || inst.designation || "Senior Faculty");
      setFacultyDepartment(inst.department || "Academic Department");
      setFacultyExperience(inst.experience || "5+ Years Experience");
      setFacultyQualification(inst.qualification || "Post Graduate / B.Ed.");
      setFacultyPhoto(inst.photo || inst.image || "/images/instructors/kratika-rathore.webp");
      setFacultyRating(inst.rating || 4.9);
      setFacultyCoursesCount(inst.coursesCount || 4);
      setFacultyBio(inst.bio || "");
    } else {
      setEditingFacultyId(null);
      setFacultyName("");
      setFacultyRole("Senior Subject Faculty");
      setFacultyDepartment("Mathematics");
      setFacultyExperience("5+ Years Experience");
      setFacultyQualification("M.Sc., B.Ed. (Gold Medalist)");
      setFacultyPhoto("/images/instructors/pawan-gupta.webp");
      setFacultyRating(4.95);
      setFacultyCoursesCount(4);
      setFacultyBio("Passionate board exam mentor dedicated to 100% concept clarity and doubt solving.");
    }
    setIsFacultyModalOpen(true);
  };

  const handleSaveFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingFaculty(true);

    try {
      const payload = {
        name: facultyName,
        role: facultyRole,
        designation: facultyRole,
        department: facultyDepartment,
        experience: facultyExperience,
        qualification: facultyQualification,
        photo: facultyPhoto,
        image: facultyPhoto,
        rating: Number(facultyRating),
        coursesCount: Number(facultyCoursesCount),
        bio: facultyBio,
      };

      if (editingFacultyId) {
        const res = await fetch("/api/instructors", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingFacultyId, ...payload }),
        });
        const data = await res.json();
        if (data.success) {
          setInstructors((prev) =>
            prev.map((inst) => (inst.id === editingFacultyId ? { ...inst, ...payload } : inst))
          );
          setIsFacultyModalOpen(false);
          triggerConfetti();
          showToast("Faculty profile updated successfully.");
        }
      } else {
        const res = await fetch("/api/instructors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success && data.instructor) {
          setInstructors((prev) => [data.instructor, ...prev]);
          setIsFacultyModalOpen(false);
          triggerConfetti();
          showToast("New faculty member added to directory.");
        }
      }
    } catch (err) {
      console.error("Save faculty failed", err);
    } finally {
      setIsSavingFaculty(false);
    }
  };

  const handleDeleteFaculty = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Remove Faculty Member?",
      message: "Are you sure you want to remove this educator from the faculty directory?",
      confirmText: "Remove Profile",
      onConfirm: async () => {
        // 1. Instant live optimistic UI update
        setInstructors((prev) => prev.filter((inst) => inst.id !== id));
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        triggerConfetti();
        showToast("Faculty member profile removed.");

        // 2. Background database delete
        try {
          await fetch(`/api/instructors?id=${encodeURIComponent(id)}`, { method: "DELETE" });
        } catch (err) {
          console.error(err);
        }
      },
    });
  };

  // Send Official Broadcast Notification
  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingBroadcast(true);

    let recipients: string[] = [];
    if (broadcastAudience === "all_leads") {
      recipients = leads.map((l) => l.email).filter(Boolean);
    } else if (broadcastAudience === "enrolled") {
      recipients = orders.map((o) => o.studentEmail).filter(Boolean);
    } else if (broadcastAudience === "faculty") {
      recipients = instructors.map((i) => `${i.id}@fukeyeducation.com`);
    } else if (broadcastAudience === "class_9") {
      recipients = leads.filter((l) => l.targetClass?.includes("9")).map((l) => l.email).filter(Boolean);
    } else if (broadcastAudience === "class_10") {
      recipients = leads.filter((l) => l.targetClass?.includes("10")).map((l) => l.email).filter(Boolean);
    } else if (broadcastAudience === "class_11") {
      recipients = leads.filter((l) => l.targetClass?.includes("11")).map((l) => l.email).filter(Boolean);
    } else if (broadcastAudience === "class_12") {
      recipients = leads.filter((l) => l.targetClass?.includes("12")).map((l) => l.email).filter(Boolean);
    } else if (broadcastAudience === "custom") {
      recipients = customEmails.split(",").map((e) => e.trim()).filter(Boolean);
    }

    if (recipients.length === 0) {
      recipients = ["info@fukeyeducation.com", "admissions@fukeyeducation.com"];
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

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-400">Verifying Administrative Privileges...</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-black text-slate-900">Administrator Credentials Required</h2>
            <p className="text-xs text-slate-500">
              This area is restricted to Fukey Education administrators. Please sign in with your verified admin account.
            </p>
          </div>
          <Link
            href="/login?redirect=/admin"
            className="w-full block py-3.5 rounded-xl bg-[#050071] hover:bg-indigo-900 text-white font-black text-xs shadow-md transition-all hover:scale-105"
          >
            Sign In as Admin →
          </Link>
        </div>
      </div>
    );
  }

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

            <button
              onClick={handleOpenAssignModal}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Assign Batch to Student</span>
            </button>
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
            onClick={() => handleTabChange("leads")}
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
            onClick={() => handleTabChange("blogs")}
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
            onClick={() => handleTabChange("batches")}
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
            onClick={() => handleTabChange("leads")}
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
            onClick={() => handleTabChange("blogs")}
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
            onClick={() => handleTabChange("orders")}
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
            onClick={() => handleTabChange("batches")}
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
            onClick={() => handleTabChange("faculty")}
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
            onClick={() => handleTabChange("broadcast")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "broadcast"
                ? "bg-[#050071] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>📢 Announcement Broadcast</span>
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
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="space-y-3 block cursor-pointer group"
                    >
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
                        <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#5751E1] line-clamp-2 transition-colors">{blog.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{blog.excerpt}</p>
                      </div>
                    </Link>

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
                onClick={() => handleOpenCourseModal()}
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
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 flex flex-col justify-between group hover:border-indigo-300 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase">
                          {course.class}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-[#050071]">
                            ₹{course.price}
                          </span>
                          <button
                            onClick={() => handleOpenCourseModal(course)}
                            className="text-slate-400 hover:text-[#5751E1] p-1 transition-colors cursor-pointer"
                            title="Edit Batch"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
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

        {/* TAB 5: FACULTY WORKLOAD & TEAM MANAGEMENT */}
        {activeTab === "faculty" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6" data-aos="fade-up">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Faculty Educators &amp; Academic Team ({instructors.length})</h2>
                <p className="text-xs text-slate-500">
                  Manage educator profiles, board teaching specializations, doubt ratings, and assigned batch workloads.
                </p>
              </div>

              <button
                onClick={() => handleOpenFacultyModal()}
                className="px-4 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Faculty Member</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {instructors
                .slice((facultyPage - 1) * 4, facultyPage * 4)
                .map((inst) => (
                  <div
                    key={inst.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-xs text-center flex flex-col items-center justify-between group hover:border-indigo-300 transition-all"
                  >
                    <div className="flex flex-col items-center space-y-3 w-full">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shadow-md border-2 border-indigo-100">
                        <img
                          src={inst.photo || inst.image || "/images/instructors/kratika-rathore.webp"}
                          alt={inst.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/instructors/kratika-rathore.webp";
                          }}
                        />
                      </div>

                      <div className="space-y-0.5 w-full">
                        <h3 className="font-black text-sm text-slate-900 line-clamp-1">{inst.name}</h3>
                        <p className="text-xs text-indigo-600 font-bold line-clamp-1">{inst.role || inst.designation || inst.department}</p>
                        <p className="text-[11px] text-slate-400">{inst.experience}</p>
                      </div>
                    </div>

                    <div className="w-full space-y-3">
                      <div className="w-full pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs font-bold">
                        <div className="p-2 rounded-xl bg-slate-50">
                          <div className="text-slate-900 font-black">{inst.coursesCount || 4}</div>
                          <div className="text-[10px] text-slate-400">Batches</div>
                        </div>
                        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
                          <div className="font-black">{inst.rating || 4.9} ★</div>
                          <div className="text-[10px]">Rating</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-1">
                        <button
                          onClick={() => handleOpenFacultyModal(inst)}
                          className="flex-1 py-1.5 px-3 rounded-xl bg-indigo-50 hover:bg-[#5751E1] hover:text-white text-[#5751E1] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteFaculty(inst.id)}
                          className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer"
                          title="Remove Faculty"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <Pagination
              currentPage={facultyPage}
              totalItems={instructors.length}
              itemsPerPage={4}
              onPageChange={(page) => setFacultyPage(page)}
              pageSizeOptions={[4, 8, 12]}
            />
          </div>
        )}

        {/* TAB 6: OFFICIAL COMMUNICATION & ANNOUNCEMENT BROADCASTER */}
        {activeTab === "broadcast" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6" data-aos="fade-up">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Official Notification &amp; Announcement Broadcaster</span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black">
                  Verified Dispatcher
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Broadcast official timetable releases, batch commencement notices, and exam preparation guides across student &amp; faculty cohorts.
              </p>
            </div>

            {broadcastSuccessCount !== null && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in">
                <span>Successfully dispatched official communication to {broadcastSuccessCount} recipients!</span>
                <button onClick={() => setBroadcastSuccessCount(null)} className="text-emerald-600 hover:text-emerald-900 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <form onSubmit={handleSendBroadcast} className="space-y-4 max-w-3xl">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Audience Cohort</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "all_leads", label: `Prospective Leads (${leads.length})` },
                    { id: "enrolled", label: `Enrolled Students (${orders.length})` },
                    { id: "faculty", label: `Faculty Team (${instructors.length})` },
                    { id: "class_9", label: "Class 9th Batches" },
                    { id: "class_10", label: "Class 10th Batches" },
                    { id: "class_11", label: "Class 11th Batches" },
                    { id: "class_12", label: "Class 12th Batches" },
                    { id: "custom", label: "Custom Email List" }
                  ].map((aud) => (
                    <button
                      key={aud.id}
                      type="button"
                      onClick={() => setBroadcastAudience(aud.id as any)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                        broadcastAudience === aud.id
                          ? "bg-[#050071] text-white border-[#050071] shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {aud.label}
                    </button>
                  ))}
                </div>
              </div>

              {broadcastAudience === "custom" && (
                <div className="animate-in fade-in">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Custom Recipient Email Addresses (Comma Separated)</label>
                  <input
                    type="text"
                    required
                    value={customEmails}
                    onChange={(e) => setCustomEmails(e.target.value)}
                    placeholder="student1@gmail.com, student2@gmail.com, parent@yahoo.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Announcement Subject Headline</label>
                <input
                  type="text"
                  required
                  value={broadcastSubject}
                  onChange={(e) => setBroadcastSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <RichTextEditor
                  label="Official Announcement Body (Formatted with Live Preview)"
                  value={broadcastMessage}
                  onChange={setBroadcastMessage}
                  placeholder="Draft your announcement with bold text, bullet points, headers and links..."
                  rows={6}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSendingBroadcast}
                  className="px-6 py-3 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-extrabold text-xs shadow-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSendingBroadcast ? "Dispatching Communication..." : "Send Official Announcement"}</span>
                </button>
              </div>
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
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-bold text-slate-700">Cover Image URL</label>
                      <button
                        type="button"
                        onClick={() => setIsImageBrowserOpen(true)}
                        className="text-indigo-600 hover:text-indigo-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Browse Gallery</span>
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={blogImage}
                        onChange={(e) => setBlogImage(e.target.value)}
                        placeholder="Select or paste cover image URL..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setIsImageBrowserOpen(true)}
                        className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-[#050071] border border-indigo-200 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-1 cursor-pointer whitespace-nowrap"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Choose</span>
                      </button>
                    </div>
                    {blogImage && (
                      <div className="mt-2 relative w-full h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={blogImage} alt="Cover Preview" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-white font-semibold">
                          Selected Cover
                        </span>
                      </div>
                    )}
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
                  <RichTextEditor
                    label="Full Article Body & Markdown (with Live Formatted Preview)"
                    value={blogContent}
                    onChange={setBlogContent}
                    placeholder="Write detailed subject concepts, study tips, or derivations..."
                    rows={8}
                    minHeight="200px"
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

        {/* MODAL: IMAGE BROWSER & GALLERY PICKER */}
        {isImageBrowserOpen && (
          <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in max-h-[90vh] flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-shrink-0">
                <div className="space-y-0.5">
                  <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#050071]" />
                    <span>Select Blog Cover Image</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Choose from official high-resolution study banners or enter a custom URL
                  </p>
                </div>
                <button
                  onClick={() => setIsImageBrowserOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 p-1">
                {PRESET_BLOG_IMAGES.map((imgItem, idx) => {
                  const isSelected = blogImage === imgItem.url;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setBlogImage(imgItem.url);
                        setIsImageBrowserOpen(false);
                        triggerConfetti();
                      }}
                      className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all hover:scale-102 flex flex-col justify-between bg-slate-50 ${
                        isSelected ? "border-[#050071] ring-2 ring-indigo-300 shadow-md" : "border-slate-200 hover:border-indigo-400 shadow-xs"
                      }`}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={imgItem.url}
                          alt={imgItem.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[9px] font-bold text-white">
                          {imgItem.category}
                        </span>
                        {isSelected && (
                          <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#050071] text-white flex items-center justify-center shadow-md">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <div className="p-2.5">
                        <div className="font-bold text-[11px] text-slate-800 line-clamp-2 leading-tight group-hover:text-indigo-700">
                          {imgItem.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Image URL Footer */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
                <div className="text-xs text-slate-500 font-medium w-full sm:w-auto">
                  Or paste direct image URL in the editor input.
                </div>
                <button
                  type="button"
                  onClick={() => setIsImageBrowserOpen(false)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white text-xs font-bold transition-all"
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CREATE / EDIT COURSE BATCH */}
        {isCourseModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-black text-base text-slate-900">
                    {editingCourseId ? "Edit Academic Live Batch" : "Create New Academic Batch"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingCourseId ? "Update batch syllabus, faculty lead, and fees" : "Deploy a new live classroom batch with schedule and pricing"}
                  </p>
                </div>
                <button onClick={() => setIsCourseModalOpen(false)} className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Batch Name</label>
                  <input
                    type="text"
                    required
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                    placeholder="e.g. CLASS 10TH SCIENCE CRASH COURSE"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Class</label>
                    <select
                      value={newCourseClass}
                      onChange={(e) => setNewCourseClass(e.target.value)}
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
                    <input
                      type="text"
                      required
                      value={newCourseSubject}
                      onChange={(e) => setNewCourseSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Lead Faculty Educator</label>
                    <select
                      value={newCourseInstructor}
                      onChange={(e) => setNewCourseInstructor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-bold focus:outline-none"
                    >
                      {instructors.map((inst) => (
                        <option key={inst.id} value={inst.name}>
                          {inst.name} ({inst.department || inst.role})
                        </option>
                      ))}
                      <option value="Pawan Gupta">Pawan Gupta (Mathematics)</option>
                      <option value="Kratika Rathore">Kratika Rathore (Chemistry)</option>
                      <option value="Dr. Aditi Sharma">Dr. Aditi Sharma (Economics)</option>
                      <option value="Vivek Dubey">Vivek Dubey (Biology)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Fee (₹ INR)</label>
                    <input
                      type="number"
                      required
                      value={newCoursePrice}
                      onChange={(e) => setNewCoursePrice(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCourseModalOpen(false)}
                    className="px-3.5 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingCourse}
                    className="px-5 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold shadow-md transition-all cursor-pointer"
                  >
                    {isSavingCourse ? "Saving..." : (editingCourseId ? "Save Changes" : "Create Batch")}
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
                <Link
                  href={`/invoice/${selectedInvoice.invoice || selectedInvoice.no}`}
                  target="_blank"
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Invoice</span>
                </Link>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CREATE / EDIT FACULTY PROFILE */}
        {isFacultyModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-black text-base text-slate-900">
                    {editingFacultyId ? "Edit Faculty Educator Profile" : "Add New Faculty Member"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingFacultyId ? "Update subject designation, credentials, and teaching bio" : "Register a senior board educator to the platform faculty directory"}
                  </p>
                </div>
                <button
                  onClick={() => setIsFacultyModalOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveFaculty} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Educator Name</label>
                  <input
                    type="text"
                    required
                    value={facultyName}
                    onChange={(e) => setFacultyName(e.target.value)}
                    placeholder="e.g. Dr. Rajesh Verma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Designation / Role</label>
                    <input
                      type="text"
                      required
                      value={facultyRole}
                      onChange={(e) => setFacultyRole(e.target.value)}
                      placeholder="e.g. Senior Physics Faculty"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Academic Department</label>
                    <select
                      value={facultyDepartment}
                      onChange={(e) => setFacultyDepartment(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-bold focus:outline-none"
                    >
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science (PCB/PCM)</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                      <option value="Social Science">Social Science</option>
                      <option value="Commerce">Commerce & Accounts</option>
                      <option value="Foundations">Foundations (Class 9-10)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Experience</label>
                    <input
                      type="text"
                      required
                      value={facultyExperience}
                      onChange={(e) => setFacultyExperience(e.target.value)}
                      placeholder="e.g. 10+ Years Experience"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Qualifications</label>
                    <input
                      type="text"
                      required
                      value={facultyQualification}
                      onChange={(e) => setFacultyQualification(e.target.value)}
                      placeholder="e.g. M.Sc., B.Ed. (Gold Medalist)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div className="col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Photo Image URL</label>
                    <input
                      type="text"
                      required
                      value={facultyPhoto}
                      onChange={(e) => setFacultyPhoto(e.target.value)}
                      placeholder="/images/instructors/..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Student Rating</label>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      max="5"
                      required
                      value={facultyRating}
                      onChange={(e) => setFacultyRating(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teaching Philosophy & Bio</label>
                  <textarea
                    rows={3}
                    value={facultyBio}
                    onChange={(e) => setFacultyBio(e.target.value)}
                    placeholder="Short introduction about teaching methodology, focus on board derivations and student mentorship..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium focus:outline-none focus:border-indigo-500 text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsFacultyModalOpen(false)}
                    className="px-3.5 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingFaculty}
                    className="px-5 py-2 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSavingFaculty ? "Saving..." : (editingFacultyId ? "Save Changes" : "Add Faculty")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ASSIGN COURSE BATCH TO STUDENT */}
        {isAssignModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-amber-500" />
                    <span>Direct Student Course Assignment</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Grant academic batch access to a student email directly in MongoDB Atlas
                  </p>
                </div>
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAssignCourseSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Registered Email</label>
                  <input
                    type="email"
                    required
                    value={assignStudentEmail}
                    onChange={(e) => setAssignStudentEmail(e.target.value)}
                    placeholder="e.g. student@gmail.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Full Name (Optional)</label>
                  <input
                    type="text"
                    value={assignStudentName}
                    onChange={(e) => setAssignStudentName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Select Course / Academic Batch</label>
                  <select
                    value={assignCourseSlug}
                    onChange={(e) => setAssignCourseSlug(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold focus:outline-none"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.title} ({c.class} • ₹{c.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-amber-50 rounded-2xl text-[11px] text-amber-900 border border-amber-200/60 font-medium">
                  ⚡ Once confirmed, this course will instantly appear in the student&apos;s dashboard under <strong>&quot;Enrolled Batches&quot;</strong> and grant them full classroom &amp; test access.
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAssignModalOpen(false)}
                    className="px-3.5 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isAssigningCourse}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-black shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isAssigningCourse ? "Assigning Course..." : "Confirm & Assign Course"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* REUSABLE CUSTOM CONFIRM MODAL (NO BROWSER POPUPS) */}
        <CustomConfirmModal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          message={confirmModal.message}
          confirmText={confirmModal.confirmText}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
        />

        {/* REUSABLE TOAST NOTIFICATION */}
        <ToastNotification
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />

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
