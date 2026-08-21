"use client";

import React, { useState } from "react";
import { X, UserPlus, ShieldCheck, Check, ArrowRight } from "lucide-react";
import { UserProfile } from "@/lib/auth";

interface GoogleOAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (account: Partial<UserProfile>) => void;
}

export default function GoogleOAuthModal({
  isOpen,
  onClose,
  onSelectAccount,
}: GoogleOAuthModalProps) {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customEmail, setCustomEmail] = useState("");

  if (!isOpen) return null;

  const presetAccounts = [
    {
      name: "Mayank Dubey",
      email: "mayank@fukeyeducation.com",
      role: "student" as const,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      phone: "+91 88718 35015",
    },
    {
      name: "Yash Sharma (Admin)",
      email: "admin@fukeyeducation.com",
      role: "admin" as const,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      phone: "+91 98765 43210",
    },
    {
      name: "Pawan Gupta (Faculty)",
      email: "pawan.gupta@fukeyeducation.com",
      role: "instructor" as const,
      avatar: "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-06-15-02-14-08-1645.webp",
      phone: "+91 98234 56789",
    },
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    onSelectAccount({
      name: customName || customEmail.split("@")[0],
      email: customEmail,
      role: "student",
      phone: "+91 88718 35015",
    });
  };

  return (
    <div className="fixed inset-0 z-[100005] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Google Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
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
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 leading-tight">Sign in with Google</h3>
              <p className="text-[11px] text-slate-500">to continue to Fukey Education</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Account Selector List */}
        <div className="p-6 space-y-4">
          {!isCustomMode ? (
            <>
              <div className="text-xs font-bold text-slate-700">Choose an account</div>

              <div className="space-y-2 divide-y divide-slate-100">
                {presetAccounts.map((acc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectAccount(acc)}
                    className="w-full pt-3 first:pt-0 flex items-center gap-3.5 p-2 rounded-2xl hover:bg-slate-50 text-left transition-colors group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex-shrink-0 border border-slate-200">
                      <img src={acc.avatar} alt={acc.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 flex items-center gap-1.5">
                        <span className="truncate">{acc.name}</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 text-[9px] font-bold uppercase">
                          {acc.role}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{acc.email}</div>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(true)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <span>Use another Google account</span>
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div className="text-xs font-bold text-slate-700">Enter your Google Account details</div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Google Email Address</label>
                <input
                  type="email"
                  required
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="rahul@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(false)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Back to accounts
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#4285F4] hover:bg-blue-600 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Sign In with Google</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Google Security Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Google OAuth 2.0</span>
          </div>
          <span>Privacy &amp; Terms</span>
        </div>
      </div>
    </div>
  );
}
