"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Award,
  ArrowUpRight,
  Copy,
  Check,
  MessageSquare
} from "lucide-react";
import { blogsData, BlogPost } from "@/data/blogsData";
import { triggerConfetti } from "@/lib/confetti";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>(blogsData);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch(`/api/blogs?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.blog) {
          setBlog(data.blog);
        } else {
          const fallback = blogsData.find((b) => b.slug === slug);
          if (fallback) setBlog(fallback);
        }
      })
      .catch(() => {
        const fallback = blogsData.find((b) => b.slug === slug);
        if (fallback) setBlog(fallback);
      });

    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs && data.blogs.length > 0) setAllBlogs(data.blogs);
      })
      .catch(() => {});
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      triggerConfetti();
    }
  };

  const handleShare = (platform: "whatsapp" | "twitter" | "facebook") => {
    if (typeof window === "undefined" || !blog) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(blog.title);

    let shareUrl = "";
    if (platform === "whatsapp") shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    if (platform === "twitter") shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    if (platform === "facebook") shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const relatedBlogs = useMemo(() => {
    return allBlogs
      .filter((b) => b.slug !== slug)
      .slice(0, 3);
  }, [allBlogs, slug]);

  // Structured Content Parser
  const formattedSections = useMemo(() => {
    if (!blog?.content) return [];

    const raw = blog.content
      .replace(/^\d{1,2}\s+[A-Za-z]+,?\s+\d{4}\s*\n+by\s*\n+Fukey Education\s*\n+\d+\s*\n*\s*Min Read\s*\n+0 Comments\s*\n+/i, "")
      .replace(/\n+Tags\n[\s\S]*?(Share)?$/i, "")
      .trim();

    const paragraphs = raw.split(/\n\s*\n/);
    const sections: Array<{
      type: "heading" | "paragraph" | "quote" | "faq" | "list";
      title?: string;
      text?: string;
      items?: string[];
      q?: string;
      a?: string;
    }> = [];

    paragraphs.forEach((p) => {
      const trimmed = p.trim();
      if (!trimmed) return;

      // Check if heading
      const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
      
      if (
        lines.length === 1 &&
        (trimmed.endsWith("?") ||
          trimmed.endsWith(":") ||
          trimmed.endsWith("ः") ||
          (trimmed.length < 80 && /^[A-Z0-9\s—–:-]+$/.test(trimmed)) ||
          trimmed.includes("क्यों महत्वपूर्ण है") ||
          trimmed.includes("कैसे करें") ||
          trimmed.includes("क्या करें") ||
          trimmed.includes("निष्कर्ष") ||
          trimmed.includes("CONCLUSION") ||
          trimmed.includes("नया क्या है"))
      ) {
        sections.push({ type: "heading", title: trimmed });
      } else if (
        (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith('“') && trimmed.endsWith('”')) ||
        trimmed.startsWith("याद रखें")
      ) {
        sections.push({ type: "quote", text: trimmed });
      } else if (/^\d+\.\s+/.test(trimmed)) {
        // FAQ item format
        const match = trimmed.match(/^(\d+\.\s+[^?\n]+\??)\s*\n?([\s\S]*)$/);
        if (match) {
          sections.push({ type: "faq", q: match[1], a: match[2] || "Detailed explanation based on board curriculum." });
        } else {
          sections.push({ type: "paragraph", text: trimmed });
        }
      } else if (lines.length > 2 && lines.every((l) => l.length < 120 && !l.endsWith("."))) {
        // Bullet list
        sections.push({ type: "list", items: lines });
      } else {
        sections.push({ type: "paragraph", text: trimmed });
      }
    });

    return sections;
  }, [blog?.content]);

  if (!blog) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-indigo-50 text-[#5751E1] mx-auto flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Article Not Found</h1>
          <p className="text-xs text-slate-500">
            The educational resource you requested could not be located.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#050071] text-white font-bold text-xs shadow-md transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse All Articles</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Breadcrumbs */}
        <div className="flex items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#5751E1] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/blog" className="hover:text-[#5751E1] transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-xs">
              {blog.category}
            </span>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-[#050071] hover:bg-slate-50 font-bold text-xs shadow-xs transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </Link>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Article Content (8 Cols) */}
          <main className="lg:col-span-8 space-y-6">
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
              {/* Category & Title Header */}
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 text-[#5751E1] font-extrabold text-xs tracking-wide border border-indigo-100">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{blog.category}</span>
                </span>

                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
                  {blog.title}
                </h1>

                {/* Author, Date & Reading Stats Strip */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <div className="w-8 h-8 rounded-full bg-[#050071] text-amber-300 flex items-center justify-center font-black text-xs">
                        F
                      </div>
                      <div>
                        <div>{blog.author || "Fukey Academic Team"}</div>
                        <div className="text-[10px] text-slate-400 font-normal">CBSE &amp; State Board Expert</div>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-4 text-slate-500 text-xs">
                      <span className="text-slate-300">•</span>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{blog.date}</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{blog.readTime || "5 min read"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Share actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                      title="Copy Article Link"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Share"}</span>
                    </button>
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                      title="Share to WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              {blog.image && (
                <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 aspect-[16/9] shadow-inner relative group">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-08-14-06-28-03-5696.png";
                    }}
                  />
                </div>
              )}

              {/* Article Content Typography Engine */}
              <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                {formattedSections.map((sec, idx) => {
                  if (sec.type === "heading") {
                    return (
                      <div key={idx} className="pt-6 border-t border-slate-100 first:pt-0 first:border-0">
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                          <span className="w-2 h-6 rounded-full bg-gradient-to-b from-[#050071] to-[#5751E1] inline-block flex-shrink-0" />
                          <span>{sec.title}</span>
                        </h2>
                      </div>
                    );
                  }

                  if (sec.type === "quote") {
                    return (
                      <div
                        key={idx}
                        className="my-6 p-6 rounded-3xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 shadow-xs relative overflow-hidden"
                      >
                        <div className="text-base sm:text-lg font-bold text-[#050071] italic text-center">
                          {sec.text}
                        </div>
                      </div>
                    );
                  }

                  if (sec.type === "faq") {
                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-indigo-200 transition-colors"
                      >
                        <div className="font-extrabold text-sm sm:text-base text-slate-900 flex items-start gap-2">
                          <HelpCircle className="w-5 h-5 text-[#5751E1] flex-shrink-0 mt-0.5" />
                          <span>{sec.q}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 pl-7 leading-relaxed font-medium">
                          {sec.a}
                        </p>
                      </div>
                    );
                  }

                  if (sec.type === "list") {
                    return (
                      <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
                        {sec.items?.map((it, iIdx) => (
                          <div
                            key={iIdx}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2.5 text-xs font-semibold text-slate-800"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>{it}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }

                  return (
                    <p key={idx} className="text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                      {sec.text}
                    </p>
                  );
                })}
              </div>

              {/* Bottom Feedback & Share Bar */}
              <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-600">Was this article helpful?</span>
                  <button
                    onClick={() => {
                      setLiked(true);
                      triggerConfetti();
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                      liked
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    <span>👍 Helpful</span>
                    {liked && <span>✓</span>}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Share on:</span>
                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs cursor-pointer"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs cursor-pointer"
                  >
                    Twitter (X)
                  </button>
                </div>
              </div>

              {/* Author Bio Box */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#050071] text-amber-300 flex items-center justify-center font-black text-xl shadow-md flex-shrink-0">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-slate-900">
                    Fukey Academic Editorial Team
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Senior faculty educators specializing in CBSE and State Board examinations, preparing high-yield study materials, formulas, and NCERT curriculum mappings.
                  </p>
                </div>
              </div>
            </article>
          </main>

          {/* Sidebar Widgets (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* CTA 1: Live Interactive Batches */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#050071] via-[#1C1A4A] to-[#2D1B69] text-white shadow-xl space-y-4 relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-300/30">
                  Admissions Open 2026–27
                </span>
                <h3 className="font-black text-lg text-white leading-tight">
                  Join Live Online Preparation Batches
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Daily 45-Min Lectures + 15-Min 1-on-1 Doubt Sessions mapped 100% to NCERT.
                </p>
              </div>

              <div className="space-y-2 pt-2 relative z-10">
                <Link
                  href="/courses"
                  className="w-full block py-3 rounded-2xl bg-[#FF2424] hover:bg-red-700 text-white font-black text-xs text-center shadow-lg transition-all hover:scale-102"
                >
                  Explore All Batches →
                </Link>
                <Link
                  href="/test-series"
                  className="w-full block py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center border border-white/20 transition-all"
                >
                  Attempt Free Mock Test
                </Link>
              </div>
            </div>

            {/* Related Articles Widget */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-black text-sm text-slate-900">Related Articles</h3>
                <Link href="/blog" className="text-xs font-bold text-[#5751E1] hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-3.5">
                {relatedBlogs.map((r) => (
                  <Link
                    key={r.id}
                    href={`/blog/${r.slug}`}
                    className="block group space-y-1.5 pb-3 border-b border-slate-100 last:border-0 last:pb-0"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      {r.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#5751E1] line-clamp-2 transition-colors">
                      {r.title}
                    </h4>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2">
                      <span>{r.date}</span>
                      <span>•</span>
                      <span>{r.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Helpline Assistance Widget */}
            <div className="bg-amber-50/80 rounded-3xl p-6 border border-amber-200/70 space-y-2 text-xs">
              <div className="font-black text-amber-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-700" />
                <span>Need Academic Counseling?</span>
              </div>
              <p className="text-amber-800 leading-relaxed">
                Connect with our senior faculty advisors for stream selection and board strategies.
              </p>
              <div className="pt-2 font-bold text-slate-900">
                Call: <a href="tel:+918871835015" className="text-[#050071] underline">+91 88718 35015</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
