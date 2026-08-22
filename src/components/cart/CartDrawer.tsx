"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Tag,
  Check,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/utils";
import { triggerConfetti } from "@/lib/confetti";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    subtotal,
    discountAmount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    currency
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponStatus, setCouponStatus] = useState<string | null>(null);
  const router = useRouter();

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e?: React.FormEvent, codeToUse?: string) => {
    if (e) e.preventDefault();
    const code = codeToUse || couponInput || "FREEDOM40";
    const res = applyCoupon(code);
    setCouponStatus(res.message);
    if (res.success) {
      setCouponInput("");
      triggerConfetti();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-slate-800 text-base">Your Cart ({cart.length})</h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 opacity-70" />
              </div>
              <div className="text-base font-bold text-slate-700">Your cart is empty</div>
              <p className="text-xs max-w-xs mx-auto">
                Explore our world-class CBSE & State Board coaching courses and boost your marks!
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/courses");
                }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-[#5751E1] text-white text-xs font-bold shadow-md hover:bg-indigo-700 transition-colors"
              >
                Browse All Courses
              </button>
            </div>
          ) : (
            cart.map(({ course }) => (
              <div
                key={course.id}
                className="p-3.5 rounded-2xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 flex items-start gap-3 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-700 to-[#050071] text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                  {course.classNum}th
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-800 text-xs truncate">{course.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Faculty: {course.instructor}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {formatPrice(course.price, currency)}
                      </span>
                      <span className="text-[11px] text-slate-400 line-through">
                        {formatPrice(course.originalPrice, currency)}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFromCart(course.id)}
                      className="text-rose-500 hover:text-rose-700 p-1 transition-colors"
                      title="Remove course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions & Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
            {/* Promo Code Form */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                  <div className="flex items-center gap-2 font-semibold">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon}</strong> applied!</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-rose-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <form onSubmit={(e) => handleApplyCoupon(e)} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Coupon (e.g. FREEDOM40)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:border-indigo-500 uppercase tracking-wider"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#050071] hover:bg-indigo-900 text-white rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Quick Click Promo Badge */}
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="text-slate-400">Available:</span>
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon(undefined, "FREEDOM40")}
                      className="px-2 py-0.5 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold cursor-pointer transition-colors"
                    >
                      ⚡ FREEDOM40 (40% OFF)
                    </button>
                  </div>
                </div>
              )}
              {couponStatus && (
                <p className={`text-[11px] mt-1 font-semibold ${couponStatus.includes("successfully") ? "text-emerald-600" : "text-rose-600"}`}>
                  {couponStatus}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-800">{formatPrice(subtotal, currency)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Special Promo Discount:</span>
                  <span>-{formatPrice(discountAmount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="text-[#5751E1] text-base">{formatPrice(total, currency)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                router.push("/checkout");
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] text-white font-bold text-sm shadow-xl shadow-indigo-950/20 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Instant Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant batch enrollment & 100% money-back guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
