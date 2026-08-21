"use client";

import React from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string | null;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export default function ToastNotification({
  message,
  type = "success",
  onClose,
}: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100001] animate-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md ${
          type === "success"
            ? "bg-slate-900/95 text-white border-emerald-500/40"
            : "bg-rose-950/95 text-white border-rose-500/40"
        }`}
      >
        <div
          className={`w-7 h-7 rounded-xl flex items-center justify-center ${
            type === "success" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
          }`}
        >
          {type === "success" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
        </div>

        <div className="text-xs font-bold">{message}</div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
