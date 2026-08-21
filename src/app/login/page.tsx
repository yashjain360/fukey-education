"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Lock, Mail, ArrowRight, ShieldCheck, User } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "instructor" | "admin">("student");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { openGoogleModal, loginWithEmail } = useAuth();
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoggingIn(true);
    try {
      const loggedUser = await loginWithEmail(email.trim(), email.split("@")[0], role);
      const effectiveRole = loggedUser?.role || role;
      if (effectiveRole === "admin") {
        router.push("/admin");
      } else if (effectiveRole === "instructor") {
        router.push("/instructor/dashboard");
      } else {
        router.push("/dashboard");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50/50">
      <div
        className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6"
        data-aos="zoom-in"
        data-aos-duration="650"
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
          <h1 className="text-2xl font-black text-slate-900">Sign In to Your Account</h1>
          <p className="text-xs text-slate-500">
            Access your live online batches, faculty mentor chats, and official study records
          </p>
        </div>

        {/* Portal Role Selector */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              role === "student"
                ? "bg-white text-[#050071] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole("instructor")}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              role === "instructor"
                ? "bg-white text-[#050071] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Instructor
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              role === "admin"
                ? "bg-white text-[#050071] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Google One-Click Login */}
        <button
          type="button"
          onClick={openGoogleModal}
          className="w-full py-3.5 px-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-400 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-3 hover:scale-102 active:scale-95 cursor-pointer"
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
          <span>or sign in with credentials</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Standard Email/Password Form */}
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <Link href="/forgot-password" className="text-[11px] font-semibold text-indigo-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] hover:brightness-110 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-102 active:scale-95"
          >
            <span>{isLoggingIn ? "Signing In..." : `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-[#5751E1] hover:underline">
            Create Student Account
          </Link>
        </div>
      </div>
    </div>
  );
}
