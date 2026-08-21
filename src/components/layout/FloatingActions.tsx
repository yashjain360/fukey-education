"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, ArrowUp, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

interface FloatingActionsProps {
  onOpenChat: () => void;
}

export default function FloatingActions({ onOpenChat }: FloatingActionsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-3 rounded-2xl bg-[#5751E1] hover:bg-indigo-700 text-white shadow-xl shadow-indigo-950/20 hover:scale-110 active:scale-95 transition-all animate-in fade-in zoom-in-75 duration-200"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* Fukey AI Study Assistant Button */}
      <button
        onClick={onOpenChat}
        className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] text-white shadow-2xl shadow-indigo-950/30 hover:scale-105 active:scale-95 transition-all group border border-white/20"
        aria-label="Open Fukey AI Counselor"
      >
        <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform animate-pulse" />
        <span className="font-bold text-xs tracking-wide">Fukey AI Sahayak</span>
      </button>

      {/* WhatsApp Floating Connect */}
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto relative p-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl shadow-emerald-950/20 hover:scale-110 active:scale-95 transition-all"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
      </a>
    </div>
  );
}
