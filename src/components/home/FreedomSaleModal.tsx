"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Sparkles, ArrowRight, Tag, Percent } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { useCart } from "@/components/cart/CartContext";
import { triggerConfetti } from "@/lib/confetti";

export default function FreedomSaleModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { applyCoupon } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem("fukey_freedom_sale_dismissed");
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        triggerConfetti();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("fukey_freedom_sale_dismissed", "true");
  };

  const handleClaim = () => {
    triggerConfetti();
    applyCoupon("FREEDOM40");
    handleClose();
    router.push("/courses");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-white overflow-hidden text-center p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top ribbon badge */}
        <div className="absolute top-0 left-0 bg-gradient-to-r from-[#FF9933] to-[#FF6B00] text-white text-[10px] font-extrabold uppercase px-8 py-1.5 -rotate-45 -translate-x-6 translate-y-3 shadow-md tracking-wider">
          Limited Time Offer
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Indian Flag Badge */}
        <div className="mx-auto w-12 h-8 rounded-md overflow-hidden border border-slate-200 shadow-sm flex flex-col mb-4">
          <div className="h-1/3 bg-[#FF9933]" />
          <div className="h-1/3 bg-white flex items-center justify-center">
            <div className="w-2 h-2 rounded-full border border-[#000080]" />
          </div>
          <div className="h-1/3 bg-[#138808]" />
        </div>

        {/* Tagline */}
        <div className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00] flex items-center justify-center gap-1 mb-2">
          <span>✦</span>
          <span>Freedom Sale</span>
          <span>✦</span>
        </div>

        {/* Headline */}
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          Happy <span className="text-[#138808]">Independence</span> <span className="text-[#FF9933]">Day!</span>
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-6 max-w-xs mx-auto">
          Celebrate freedom with knowledge! Grab our biggest Freedom Sale discount on all live courses for Classes 9th to 12th.
        </p>

        {/* Discount Badge */}
        <div className="inline-flex items-center gap-1.5 px-6 py-2 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF2424] text-white font-extrabold text-lg shadow-lg shadow-orange-500/30 mb-5 animate-bounce">
          <Percent className="w-5 h-5" />
          <span>40% OFF</span>
        </div>

        {/* Price Breakdown */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-slate-400 line-through text-lg font-semibold">
            ₹{siteConfig.saleOffer.originalPrice.toLocaleString()}
          </span>
          <span className="text-3xl font-black text-[#138808] tracking-tight">
            ₹{siteConfig.saleOffer.offerPrice.toLocaleString()}
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleClaim}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF9933] via-[#FF6B00] to-[#7B9900] hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 group transition-all"
        >
          <span>Claim Offer Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-[11px] text-slate-400 mt-3">
          Coupon code <code className="font-bold text-slate-700">FREEDOM40</code> applied automatically
        </p>
      </div>
    </div>
  );
}
