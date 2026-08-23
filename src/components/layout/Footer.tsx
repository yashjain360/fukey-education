"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Send,
  ShieldCheck,
  Award,
  BookCheck,
  Sparkles,
  Star,
  ExternalLink,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { useTranslation } from "@/components/providers/LanguageContext";
import { triggerConfetti } from "@/lib/confetti";

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setIsSubscribing(true);
    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: email.split("@")[0],
          email: email.trim().toLowerCase(),
          phone: "Newsletter Subscriber",
          targetClass: "General Subscription",
          notes: "Subscribed via Stay Updated footer newsletter",
          type: "newsletter"
        })
      });
      setIsSubscribed(true);
      triggerConfetti();
      setEmail("");
    } catch (err) {
      setIsSubscribed(true);
      triggerConfetti();
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#050071] text-slate-300 pt-12 sm:pt-16 pb-8 border-t border-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Tier 1: Trust Badges Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-indigo-900/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-800/50 flex items-center justify-center flex-shrink-0 text-orange-400">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 animate-icon-pulse" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">{t("footer.ncert", "100% NCERT Aligned")}</div>
              <div className="text-xs text-slate-400">CBSE &amp; State Board Standard</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-800/50 flex items-center justify-center flex-shrink-0 text-emerald-400">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 animate-icon-sparkle" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">{t("footer.faculty", "Gold Medalist Faculty")}</div>
              <div className="text-xs text-slate-400">10+ Yrs Teaching Experience</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-800/50 flex items-center justify-center flex-shrink-0 text-sky-400">
              <BookCheck className="w-5 h-5 sm:w-6 sm:h-6 animate-icon-float" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">{t("footer.notes", "Free Study Notes")}</div>
              <div className="text-xs text-slate-400">Color PDFs &amp; Formula Sheets</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-800/50 flex items-center justify-center flex-shrink-0 text-pink-400">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-icon-sparkle" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">{t("footer.rated", "5.0 ★ Google Rated")}</div>
              <div className="text-xs text-slate-400">21+ Verified Student Reviews</div>
            </div>
          </div>
        </div>

        {/* Tier 2: Main Footer Navigation Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 py-8 sm:py-12 border-b border-indigo-900/60">
          {/* Col 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group transition-transform hover:scale-105">
              <img
                src="/images/logo/logo-white.png"
                alt="Fukey Education Logo"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://fukeyeducation.com/uploads/custom-images/wsus-img-2025-11-10-12-04-32-8747.png";
                }}
              />
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm font-medium">
              Empowering Class 9th to 12th students with high-yield live online coaching, expert faculty mentorship, comprehensive Hindi &amp; English study material, and proven board exam strategies.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a href={`mailto:${siteConfig.supportEmail}`} className="hover:text-white transition-colors">
                  {siteConfig.supportEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div className="flex items-center gap-2">
                  <a href={`tel:${siteConfig.supportPhone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                    {siteConfig.supportPhone}
                  </a>
                  <span>/</span>
                  <a href={`tel:${siteConfig.alternatePhone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                    {siteConfig.alternatePhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-indigo-900 hover:bg-indigo-700 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-indigo-900 hover:bg-pink-600 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-indigo-900 hover:bg-red-600 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-indigo-900 hover:bg-blue-600 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 3: Popular Courses */}
          <div className="space-y-3 text-sm">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Top Class Batches</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/courses?class=Class+10" className="hover:text-white transition-colors">
                  Class 10th Maths (Hindi &amp; English)
                </Link>
              </li>
              <li>
                <Link href="/courses?class=Class+10" className="hover:text-white transition-colors">
                  Class 10th Science Masterclass
                </Link>
              </li>
              <li>
                <Link href="/courses?class=Class+12" className="hover:text-white transition-colors">
                  Class 12th Physics &amp; Chemistry
                </Link>
              </li>
              <li>
                <Link href="/courses?class=Class+11" className="hover:text-white transition-colors">
                  Class 11th Economics &amp; Accounts
                </Link>
              </li>
              <li>
                <Link href="/courses?class=Class+12" className="hover:text-white transition-colors">
                  Class 12th Biology &amp; Zoology
                </Link>
              </li>
              <li>
                <Link href="/courses?class=Class+9" className="hover:text-white transition-colors">
                  Class 9th Foundation All-in-One
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3 text-sm">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Explore Fukey</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/ebooks" className="hover:text-white transition-colors">
                  Free NCERT Notes &amp; eBooks
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="hover:text-white transition-colors">
                  Our Expert Faculty
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Board Exam Preparation Blog
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  Academic News &amp; Notices
                </Link>
              </li>
              <li>
                <Link href="/career" className="hover:text-white transition-colors">
                  Join As Educator (Careers)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter & App */}
          <div className="space-y-3 text-sm">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Stay Updated</h4>
            <p className="text-xs text-slate-400">
              Get weekly exam tips, syllabus alerts, and free mock test papers sent straight to your email.
            </p>
            {isSubscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs flex items-start gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-bold">Subscribed!</strong>
                  <span>Check your inbox for weekly board exam materials.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter student email..."
                    className="w-full bg-indigo-950/80 border border-indigo-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 font-medium"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing || !email.trim()}
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#5751E1] hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                    title="Subscribe"
                  >
                    {isSubscribing ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Tier 3: Bottom Copyright & TheWebVale Branding */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-semibold">Fukey Education Pvt. Ltd.</span> {t("footer.rights", "All rights reserved.")}
          </div>

          {/* TheWebVale Branding */}
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium px-4 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-900 shadow-inner">
            <span>{t("footer.made_by", "Made with")}</span>
            <span className="text-rose-500 text-sm leading-none">❤️</span>
            <span>by</span>
            <a
              href="https://thewebvale.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-extrabold text-white hover:text-orange-400 transition-colors underline decoration-orange-500/60 underline-offset-4 tracking-wide"
            >
              TheWebVale
            </a>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/about-us" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about-us" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Support Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
