"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Sparkles, ArrowRight, Percent, Gift } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { useCart } from "@/components/cart/CartContext";
import { useFestivalTheme } from "@/components/theme/FestivalThemeContext";

export default function FreedomSaleModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { applyCoupon } = useCart();
  const { activeFestival } = useFestivalTheme();
  const router = useRouter();

  const isRakhi = activeFestival.id === "rakshabandhan";

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("fukey_festive_modal_dismissed");
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("fukey_festive_modal_dismissed", "true");
  };

  const handleClaim = () => {
    applyCoupon(isRakhi ? "RAKHI40" : "FREEDOM40");
    handleClose();
    router.push("/courses");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-white overflow-hidden text-center p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top ribbon badge */}
        <div
          className="absolute top-0 left-0 text-white text-[10px] font-extrabold uppercase px-8 py-1.5 -rotate-45 -translate-x-6 translate-y-3 shadow-md tracking-wider"
          style={{
            background: isRakhi
              ? "linear-gradient(90deg, #D97706, #E11D48)"
              : "linear-gradient(90deg, #FF9933, #FF6B00)",
          }}
        >
          {isRakhi ? "Rakhi Special" : "Limited Time"}
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Festive Icon Graphic */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-3xl shadow-xs mb-3">
          {isRakhi ? "🪢" : "🇮🇳"}
        </div>

        {/* Tagline */}
        <div className="text-xs font-extrabold uppercase tracking-widest text-[#B45309] flex items-center justify-center gap-1 mb-1">
          <span>✦</span>
          <span>{isRakhi ? "Rakshabandhan Mahotsav" : "Freedom Sale"}</span>
          <span>✦</span>
        </div>

        {/* Headline */}
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          {isRakhi ? (
            <>
              Happy <span className="text-[#0F766E]">Raksha</span>
              <span className="text-[#D97706]">bandhan!</span>
            </>
          ) : (
            <>
              Happy <span className="text-[#138808]">Independence</span>{" "}
              <span className="text-[#FF9933]">Day!</span>
            </>
          )}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-5 max-w-xs mx-auto">
          {isRakhi
            ? "Celebrate the gift of education with your siblings! Flat 40% OFF on all live coaching batches for Classes 9th to 12th."
            : "Grab our biggest Freedom Sale discount on all live coaching batches for Classes 9th to 12th."}
        </p>

        {/* Discount Badge */}
        <div className="inline-flex items-center gap-1.5 px-6 py-2 rounded-2xl bg-gradient-to-r from-[#D97706] to-[#0F766E] text-white font-extrabold text-lg shadow-md mb-4">
          <Percent className="w-5 h-5" />
          <span>40% OFF SPECIAL</span>
        </div>

        {/* Price Breakdown */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-slate-400 line-through text-lg font-semibold">
            ₹2,499
          </span>
          <span className="text-3xl font-black text-[#0F766E] tracking-tight">
            ₹1,499
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleClaim}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0F766E] via-[#115E59] to-[#D97706] hover:brightness-110 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-102"
        >
          <Gift className="w-4 h-4 text-amber-300" />
          <span>Claim Festive Offer Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-slate-400 mt-3">
          Coupon code <code className="font-bold text-slate-700">{isRakhi ? "RAKHI40" : "FREEDOM40"}</code> applied automatically
        </p>
      </div>
    </div>
  );
}
