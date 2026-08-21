"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("bg-slate-200/80 rounded-2xl animate-pulse", className)}
      {...props}
    />
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-0 overflow-hidden space-y-4">
      {/* Thumbnail placeholder */}
      <div className="aspect-[16/10] bg-slate-200" />
      {/* Content lines */}
      <div className="p-5 space-y-3">
        <div className="h-3 w-24 bg-slate-200 rounded" />
        <div className="h-4 w-4/5 bg-slate-200 rounded" />
        <div className="h-3 w-1/2 bg-slate-100 rounded" />
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="h-8 w-24 bg-slate-200 rounded-xl" />
          <div className="h-5 w-16 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export function DashboardMetricSkeleton() {
  return (
    <div className="bg-slate-100/70 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-3 border border-slate-200/60">
      <div className="w-14 h-14 rounded-full bg-slate-200" />
      <div className="h-8 w-16 bg-slate-200 rounded" />
      <div className="h-3 w-28 bg-slate-200 rounded" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="border-b border-slate-100">
      <td className="p-3.5"><div className="h-3 w-4 bg-slate-200 rounded" /></td>
      <td className="p-3.5"><div className="h-3 w-24 bg-slate-200 rounded" /></td>
      <td className="p-3.5"><div className="h-3 w-16 bg-slate-200 rounded" /></td>
      <td className="p-3.5"><div className="h-3 w-20 bg-slate-200 rounded" /></td>
      <td className="p-3.5"><div className="h-5 w-14 bg-slate-200 rounded-full" /></td>
      <td className="p-3.5"><div className="h-7 w-16 bg-slate-200 rounded-lg" /></td>
    </tr>
  );
}
