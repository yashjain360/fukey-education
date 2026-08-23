"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  User,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  CheckCircle2,
  KeyRound
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { triggerConfetti } from "@/lib/confetti";

import { SEED_ACCOUNTS, SeedAccount } from "@/data/seedAccounts";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"student" | "instructor" | "admin">("student");
  const [qaActiveTab, setQaActiveTab] = useState<"admin" | "instructor" | "student">("admin");
  const [selectedPersonaName, setSelectedPersonaName] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { openGoogleModal, loginWithEmail } = useAuth();
  const router = useRouter();

  const handleSelectSeed = (acc: SeedAccount) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setRole(acc.role);
    setSelectedPersonaName(acc.name);
    setErrorMessage(null);
    triggerConfetti();
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setIsLoggingIn(true);
    setErrorMessage(null);
    try {
      const loggedUser = await loginWithEmail(email.trim(), password);
      const effectiveRole = loggedUser?.role || role;
      if (effectiveRole === "admin") {
        router.push("/admin");
      } else if (effectiveRole === "instructor") {
        router.push("/instructor/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 py-12 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Brand Header */}
      <div className="text-center space-y-2 mb-8" data-aos="fade-down">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#050071] text-amber-400 flex items-center justify-center shadow-lg shadow-indigo-950/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-[#050071] tracking-tight">
            FUKEY EDUCATION
          </span>
        </Link>
        <p className="text-xs sm:text-sm font-semibold text-slate-500">
          Unified Management ERP &amp; Scholastic Portal
        </p>
      </div>

      {/* 2-Column QA Portal Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT COLUMN: Clean Sign-In Form */}
        <div
          className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl flex flex-col justify-between space-y-6"
          data-aos="fade-right"
        >
          <div className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Sign In to Your Portal
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Access Admin ERP, Faculty Gradebooks, or Student Fee Records
              </p>
            </div>

            {/* Google OAuth One-Tap Button */}
            <button
              type="button"
              onClick={openGoogleModal}
              className="w-full py-3 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600">
                G
              </div>
              <div className="text-left flex-1">
                <div className="text-xs font-bold text-slate-800">Continue with Google</div>
                <div className="text-[10px] text-slate-400 font-normal">Official Google OAuth 2.0</div>
              </div>
              <svg className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 absolute">
                or sign in with credentials
              </span>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-2xl flex items-start gap-2.5 animate-in fade-in">
                <span className="text-rose-500 font-black">⚠️</span>
                <div className="flex-1">{errorMessage}</div>
              </div>
            )}

            {/* Credential Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Institutional Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@fukeyeducation.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Account Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
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

              {/* Portal Role Active Badge */}
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-slate-500">Signing into:</span>
                <span className="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-indigo-50 text-[#5751E1] border border-indigo-200/60">
                  {role === "admin" ? "Master Admin" : role === "instructor" ? "Faculty Studio" : "Student Portal"}
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 rounded-2xl bg-[#050071] hover:bg-[#5751E1] text-white font-extrabold text-xs shadow-lg shadow-indigo-950/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <KeyRound className="w-4 h-4" />
                <span>{isLoggingIn ? "Signing In..." : "Sign In to Portal"}</span>
              </button>
            </form>
          </div>

          {/* Footer links */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link href="/forgot-password" className="hover:text-indigo-600 transition-colors font-medium">
              Forgot Password?
            </Link>
            <Link href="/register" className="text-indigo-600 font-bold hover:underline">
              Create New Account →
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: 1-Click QA Test Switcher */}
        <div
          className="lg:col-span-6 bg-[#0E131F] text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-2xl flex flex-col justify-between space-y-5 relative overflow-hidden"
          data-aos="fade-left"
        >
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            {/* Top Switcher Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-black text-sm text-white">
                <Zap className="w-4 h-4 text-amber-400 fill-current" />
                <span>1-Click QA Test Switcher</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                {SEED_ACCOUNTS.admin.length + SEED_ACCOUNTS.instructor.length + SEED_ACCOUNTS.student.length} Pre-Seeded Accounts
              </span>
            </div>

            {/* 3 Role Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => setQaActiveTab("admin")}
                className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  qaActiveTab === "admin"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Admin ({SEED_ACCOUNTS.admin.length})
              </button>
              <button
                type="button"
                onClick={() => setQaActiveTab("instructor")}
                className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  qaActiveTab === "instructor"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Faculty ({SEED_ACCOUNTS.instructor.length})
              </button>
              <button
                type="button"
                onClick={() => setQaActiveTab("student")}
                className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  qaActiveTab === "student"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Student ({SEED_ACCOUNTS.student.length})
              </button>
            </div>

            {/* Scrollable Persona Cards List */}
            <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
              {SEED_ACCOUNTS[qaActiveTab].map((acc, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800/90 hover:border-slate-700 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="font-bold text-xs text-white truncate">{acc.name}</div>
                    <div className="text-[11px] font-mono text-slate-400 truncate">{acc.email}</div>
                    <div className="text-[10px] font-semibold text-amber-400/90 truncate">{acc.designation}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectSeed(acc)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-500 text-slate-300 hover:text-slate-950 font-black text-xs border border-slate-700 hover:border-amber-400 transition-all cursor-pointer shadow-xs whitespace-nowrap active:scale-95"
                  >
                    Use
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom helper text */}
          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center relative z-10">
            Click any account above to autofill, then click <strong className="text-white">Sign In</strong> to test full ERP features.
          </div>
        </div>
      </div>
    </div>
  );
}
