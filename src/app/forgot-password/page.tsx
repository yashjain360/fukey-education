"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Mail, ArrowRight, CheckCircle2, GraduationCap } from "lucide-react";
import { triggerConfetti } from "@/lib/confetti";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setIsSent(true);
      triggerConfetti();
    } catch (err) {
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50/50">
      <div
        className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6"
        data-aos="zoom-in"
        data-aos-duration="600"
      >
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block">
            <img
              src="/images/logo/logo-main.png"
              alt="Fukey Education Logo"
              className="h-12 w-auto mx-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-02-23-03-59-14-6859.png";
              }}
            />
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Reset Your Password</h1>
          <p className="text-xs text-slate-500">
            Enter your registered email address to receive password reset instructions
          </p>
        </div>

        {isSent ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Reset Link Sent!</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
              We have dispatched password recovery instructions to <strong className="text-slate-900">{email}</strong>.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="px-6 py-2.5 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
              >
                <span>Back to Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] hover:brightness-110 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-102 active:scale-95"
            >
              <span>{isSubmitting ? "Sending Instructions..." : "Send Reset Link"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
              Remember your password?{" "}
              <Link href="/login" className="font-bold text-[#5751E1] hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
