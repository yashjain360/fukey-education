"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, CheckCircle2, KeyRound, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { triggerConfetti } from "@/lib/confetti";

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tokenFromUrl = searchParams.get("token") || "";
  const emailFromUrl = searchParams.get("email") || "";

  // Request Reset Link State
  const [email, setEmail] = useState(emailFromUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // New Password State (When Token Present)
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send reset link.");
      }
      setIsSent(true);
      triggerConfetti();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to send reset link. Please verify your email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return;

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailFromUrl || email,
          token: tokenFromUrl,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setIsResetSuccess(true);
      triggerConfetti();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. If Token is present in URL -> Display "Set New Password" View
  if (tokenFromUrl) {
    return (
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
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
          <h1 className="text-2xl font-black text-slate-900">Create New Password</h1>
          <p className="text-xs text-slate-500">
            Enter a strong new password for <strong className="text-slate-800">{emailFromUrl}</strong>
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-2xl flex items-start gap-2.5 animate-in fade-in">
            <span className="text-rose-500 font-black">⚠️</span>
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {isResetSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Password Updated!</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Your password has been changed successfully. You can now sign into your student portal.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="px-6 py-3 rounded-2xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs inline-flex items-center gap-2 transition-all shadow-md shadow-indigo-950/20 active:scale-95"
              >
                <KeyRound className="w-4 h-4" />
                <span>Sign In to Portal</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">New Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Confirm New Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] hover:brightness-110 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-102 active:scale-95"
            >
              <span>{isSubmitting ? "Updating Password..." : "Save New Password"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    );
  }

  // 2. Default: Request Reset Link View
  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
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

      {errorMessage && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-2xl flex items-start gap-2.5 animate-in fade-in">
          <span className="text-rose-500 font-black">⚠️</span>
          <div className="flex-1">{errorMessage}</div>
        </div>
      )}

      {isSent ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Recovery Link Dispatched!</h3>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
            We have sent instant password recovery instructions to <strong className="text-slate-900">{email}</strong>. Please check your inbox and spam folder.
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
        <form onSubmit={handleRequestReset} className="space-y-4">
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
            <span>{isSubmitting ? "Dispatching Email..." : "Send Recovery Link"}</span>
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
  );
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50/50">
      <Suspense fallback={<div className="text-xs text-slate-400">Loading recovery form...</div>}>
        <ForgotPasswordContent />
      </Suspense>
    </div>
  );
}
