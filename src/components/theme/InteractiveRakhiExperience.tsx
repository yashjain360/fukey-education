"use client";

import React, { useState } from "react";
import { Sparkles, Gift, Heart, Copy, Check, Share2, X, ArrowRight } from "lucide-react";
import { triggerConfetti } from "@/lib/confetti";
import { useCart } from "@/components/cart/CartContext";

export default function InteractiveRakhiExperience() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTied, setIsTied] = useState(false);
  const [copied, setCopied] = useState(false);
  const { applyCoupon } = useCart();

  const handleTieRakhi = () => {
    setIsTied(true);
    triggerConfetti();
    applyCoupon("RAKHI40");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("RAKHI40");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      "🪢 Happy Rakshabandhan! I'm gifting you the best CBSE & State Board Online Coaching on Fukey Education. Get 40% OFF with code RAKHI40: https://fukeyeducation.com/courses"
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <>
      {/* Floating Interactive Rakhi Charm (Placed at Bottom Left so WhatsApp & AI Sahayak at Bottom Right are 100% visible) */}
      <aside aria-label="Festive Rakhi widget" className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#0F766E] via-[#115E59] to-[#D97706] text-white font-black text-xs shadow-2xl shadow-teal-950/40 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-amber-300/70"
        >
          <span className="text-xl animate-bounce">🪢</span>
          <span className="tracking-wide">Tie a Rakhi</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-300 text-teal-950 text-[10px] font-black uppercase shadow-xs">
            40% OFF
          </span>
        </button>
      </aside>

      {/* Interactive Rakhi Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-amber-300/80 overflow-hidden text-center p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Motif */}
            <div className="text-[11px] font-black text-[#D97706] uppercase tracking-widest flex items-center justify-center gap-1 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rakshabandhan Interactive Ritual</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              {isTied ? "🪢 Rakhi Tied with Love!" : "Tie a Sacred Rakhi of Knowledge"}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-6 max-w-xs mx-auto">
              {isTied
                ? "May your sibling achieve top rank in board exams! Your 40% OFF coupon has been unlocked and activated."
                : "Click the Rakhi talisman below to tie the sacred thread of education and unlock exclusive sibling discounts."}
            </p>

            {/* Interactive Rakhi Center Piece */}
            <div className="my-6 flex flex-col items-center justify-center">
              <button
                onClick={handleTieRakhi}
                className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-xl ${
                  isTied
                    ? "bg-gradient-to-tr from-[#D97706] via-[#F59E0B] to-[#FEF3C7] border-4 border-amber-400 scale-110"
                    : "bg-gradient-to-tr from-[#0F766E] to-[#14B8A6] border-4 border-amber-300 hover:scale-105 active:scale-95 cursor-pointer"
                }`}
              >
                {/* Silk Ribbon Tails */}
                <div className="absolute -left-6 top-1/2 w-8 h-1.5 bg-red-600 rounded-full shadow-xs -rotate-12" />
                <div className="absolute -right-6 top-1/2 w-8 h-1.5 bg-red-600 rounded-full shadow-xs rotate-12" />

                <span className="text-4xl sm:text-5xl">{isTied ? "✨" : "🪢"}</span>
                <span className="text-[9px] font-black text-white mt-1 uppercase tracking-wider">
                  {isTied ? "Tied & Blessed" : "Tap To Tie"}
                </span>
              </button>
            </div>

            {/* Unlocked Reward Box */}
            {isTied ? (
              <div className="space-y-4 pt-2">
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-[10px] font-bold text-amber-800 uppercase">Coupon Code</div>
                    <div className="text-base font-black text-slate-900 tracking-wider">RAKHI40</div>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="px-3.5 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy Code"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleShareWhatsApp}
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp Sibling</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      window.location.href = "/courses";
                    }}
                    className="py-3 px-4 rounded-xl bg-[#D97706] hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>View Courses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleTieRakhi}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#0F766E] to-[#D97706] hover:brightness-110 text-white font-black text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <Heart className="w-4 h-4 text-amber-300" />
                <span>Tap To Tie Rakhi &amp; Unlock 40% OFF</span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
