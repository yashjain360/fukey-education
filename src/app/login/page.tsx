"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("mayank@fukeyeducation.com");
  const [password, setPassword] = useState("••••••••");
  const { loginWithGoogle, loginAsDemo, loginWithEmail, user } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = () => {
    loginWithGoogle();
    router.push("/dashboard");
  };

  const handleDemoStudent = () => {
    loginAsDemo("student");
    router.push("/dashboard");
  };

  const handleDemoInstructor = () => {
    loginAsDemo("instructor");
    router.push("/instructor/dashboard");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithEmail(email);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50/50">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-[#050071] mx-auto flex items-center justify-center">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Welcome Back</h1>
          <p className="text-xs text-slate-500">
            Sign in to access your live classes, recordings, and formula notes
          </p>
        </div>

        {/* Google One-Click Login (Just as Amulyam) */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3.5 px-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-400 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-3 active:scale-98"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-3 text-slate-400 text-xs">
          <div className="flex-1 h-px bg-slate-200" />
          <span>or sign in with email</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Standard Email Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Logins for Instant Testing */}
        <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 space-y-2">
          <div className="text-[11px] font-bold text-indigo-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant Demo Access (Screenshots Profile)</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDemoStudent}
              className="px-3 py-2 bg-white hover:bg-indigo-100 text-[#050071] font-bold text-[11px] rounded-xl border border-indigo-200 transition-colors text-center"
            >
              Student View
            </button>
            <button
              onClick={handleDemoInstructor}
              className="px-3 py-2 bg-white hover:bg-indigo-100 text-[#5751E1] font-bold text-[11px] rounded-xl border border-indigo-200 transition-colors text-center"
            >
              Instructor View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
