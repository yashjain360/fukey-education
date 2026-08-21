"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowRight, BookOpen, Check } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, isInCart, currency } = useCart();

  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Banner */}
        <div
          className="rounded-3xl bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-8 sm:p-12 shadow-xl mb-10 relative overflow-hidden"
          data-aos="fade-down"
          data-aos-duration="750"
        >
          <div className="relative z-10 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-extrabold text-xs uppercase tracking-wider border border-rose-400/30">
              Saved For Later
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              My Saved Wishlist ({wishlist.length})
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Review and enroll in your favorite CBSE &amp; State Board online coaching batches whenever you&apos;re ready.
            </p>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div
            className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-4 max-w-md mx-auto shadow-sm"
            data-aos="zoom-in"
          >
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
              <Heart className="w-8 h-8 opacity-70" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Your wishlist is currently empty</h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Browse our 52+ coaching batches and click the heart icon to save your preferred subjects here!
            </p>
            <div className="pt-2">
              <Link
                href="/courses"
                className="px-6 py-3 rounded-2xl bg-[#050071] hover:bg-[#5751E1] text-white text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((course, idx) => {
              const inCart = isInCart(course.id);

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
                  data-aos="fade-up"
                  data-aos-delay={(idx % 6) * 90}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#5751E1] font-extrabold text-[10px] uppercase">
                        {course.class}
                      </span>
                      <button
                        onClick={() => removeFromWishlist(course.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-all hover:scale-110 active:scale-95 cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <Link href={`/course/${course.slug}`}>
                      <h3 className="font-extrabold text-slate-900 text-base hover:text-[#5751E1] line-clamp-2 transition-colors">
                        {course.title}
                      </h3>
                    </Link>

                    <div className="text-xs text-slate-500">
                      Subject: <span className="font-bold text-slate-700">{course.subject}</span> • By {course.instructor}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-black text-lg text-[#050071]">
                        {formatPrice(course.price, currency)}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {formatPrice(course.originalPrice, currency)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <button
                      onClick={() => {
                        addToCart(course);
                        removeFromWishlist(course.id);
                      }}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                        inCart
                          ? "bg-emerald-600 text-white"
                          : "bg-[#FF2424] hover:bg-red-700 text-white shadow-sm"
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Move To Cart</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/course/${course.slug}`}
                      className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all hover:scale-105 active:scale-95 text-center"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
