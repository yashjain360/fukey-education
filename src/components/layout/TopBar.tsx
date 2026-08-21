"use client";

import React from "react";
import { Mail, Phone, Sparkles } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { useTranslation } from "@/components/providers/LanguageContext";
import { siteConfig } from "@/data/siteConfig";

export default function TopBar() {
  const { currency, setCurrency } = useCart();
  const { language, setLanguage, t } = useTranslation();

  return (
    <div className="bg-[#030045] text-white text-xs py-2 border-b border-indigo-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
        {/* Contact Info */}
        <div className="flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-orange-400 animate-icon-pulse" />
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="hover:text-white transition-colors"
            >
              {siteConfig.supportEmail}
            </a>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 border-l border-slate-700 pl-4">
            <Phone className="w-3.5 h-3.5 text-emerald-400 animate-icon-wiggle" />
            <a href={`tel:${siteConfig.supportPhone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
              {siteConfig.supportPhone}
            </a>
          </div>

          <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 text-[10px] font-extrabold border border-indigo-400/30">
            <span>{t("topbar.boards")}</span>
          </span>
        </div>

        {/* Center Live Announcement */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-amber-300 font-semibold">
          <Sparkles className="w-3 h-3 text-amber-400 animate-icon-sparkle" />
          <span>{t("topbar.admissions")}</span>
        </div>

        {/* Social Icons & Selectors */}
        <div className="flex items-center gap-4 text-slate-300 ml-auto sm:ml-0">
          {/* Social SVGs */}
          <div className="flex items-center gap-2.5">
            <a
              href={siteConfig.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          {/* Currency Switcher */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as "INR" | "USD")}
            className="bg-indigo-950 border border-slate-700 text-slate-200 rounded-lg px-2 py-0.5 text-[11px] focus:outline-none cursor-pointer"
          >
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
          </select>

          {/* Active Bilingual Language Switcher */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "hi")}
            className="bg-indigo-950 border border-indigo-700 text-amber-300 font-bold rounded-lg px-2.5 py-0.5 text-[11px] focus:outline-none cursor-pointer hover:border-amber-400 transition-colors"
          >
            <option value="en">English (US/UK)</option>
            <option value="hi">🇮🇳 हिंदी (Hindi)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
