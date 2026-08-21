"use client";

import React, { useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShoppingBag,
  CreditCard,
  QrCode,
  Sparkles
} from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/utils";
import { triggerConfetti } from "@/lib/confetti";

export default function CheckoutPage() {
  const { cart, subtotal, discountAmount, total, appliedCoupon, clearCart, currency } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    triggerConfetti();
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50/50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Enrollment Confirmed!</h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Welcome to Fukey Education! Your live batch access, student credentials, and course notes have been activated.
          </p>
          <div className="p-4 bg-indigo-50 rounded-2xl text-xs text-indigo-950 font-semibold space-y-1">
            <div>Order ID: <span className="font-mono text-indigo-700">FK-2026-{Math.floor(100000 + Math.random() * 900000)}</span></div>
            <div>Access link sent to registered email &amp; WhatsApp</div>
          </div>
          <Link
            href="/"
            className="w-full block py-3.5 rounded-xl bg-[#050071] hover:bg-indigo-900 text-white font-bold text-xs transition-colors"
          >
            Go to Student Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4 text-center space-y-4">
        <div className="space-y-3">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800">Your cart is empty</h2>
          <Link
            href="/courses"
            className="inline-block px-6 py-2.5 rounded-xl bg-[#5751E1] text-white font-bold text-xs"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  const upiUri = `upi://pay?pa=fukeyeducation@upi&pn=Fukey%20Education&am=${total}&cu=INR`;

  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-black text-slate-900 mb-8">Fast &amp; Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form & Payment Method */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Student Information</h2>
              <form onSubmit={handlePay} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Yash Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Mobile No. *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Payment Selection */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Payment Method</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-4 rounded-2xl border-2 flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                        paymentMethod === "upi"
                          ? "border-[#5751E1] bg-indigo-50/60 text-[#050071]"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Instant UPI / QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 rounded-2xl border-2 flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                        paymentMethod === "card"
                          ? "border-[#5751E1] bg-indigo-50/60 text-[#050071]"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Card / NetBanking</span>
                    </button>
                  </div>
                </div>

                {/* UPI QR Display */}
                {paymentMethod === "upi" && (
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
                    <div className="text-xs font-bold text-slate-700">
                      Scan QR Code with Google Pay, PhonePe, Paytm or any UPI App
                    </div>
                    <div className="inline-block p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <QRCodeSVG value={upiUri} size={150} />
                    </div>
                    <div className="text-[11px] text-slate-500">
                      UPI ID: <strong className="text-slate-800 font-mono">fukeyeducation@upi</strong>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] text-white font-extrabold text-sm shadow-xl shadow-indigo-950/20 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Complete Enrollment &amp; Pay {formatPrice(total, currency)}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900">Order Summary ({cart.length} Courses)</h2>

              <div className="space-y-3 divide-y divide-slate-100">
                {cart.map(({ course }) => (
                  <div key={course.id} className="pt-3 first:pt-0 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-xs text-slate-800">{course.title}</div>
                      <div className="text-[11px] text-slate-500">{course.instructor} • {course.class}</div>
                    </div>
                    <div className="font-black text-xs text-[#050071]">{formatPrice(course.price, currency)}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-800">{formatPrice(subtotal, currency)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon ({appliedCoupon}):</span>
                    <span>-{formatPrice(discountAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Payable:</span>
                  <span className="text-[#5751E1]">{formatPrice(total, currency)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>256-bit Encrypted Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
