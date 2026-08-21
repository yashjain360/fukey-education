"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Trash2,
  ArrowRight,
  Heart,
  ShoppingCart,
  Check,
  BookOpen,
  Sparkles
} from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/utils";
import { triggerConfetti } from "@/lib/confetti";

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    removeFromWishlist,
    addToCart,
    isInCart,
    currency
  } = useCart();

  const router = useRouter();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base">Your Wishlist ({wishlist.length})</h3>
              <p className="text-[11px] text-slate-500">Saved courses for later review</p>
            </div>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
                <Heart className="w-8 h-8 opacity-70" />
              </div>
              <div className="text-base font-bold text-slate-700">Your wishlist is empty</div>
              <p className="text-xs max-w-xs mx-auto">
                Click the heart icon on any CBSE or State Board course card to save it here for fast access!
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  router.push("/courses");
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Browse All Batches
              </button>
            </div>
          ) : (
            wishlist.map((course) => {
              const inCart = isInCart(course.id);

              return (
                <div
                  key={course.id}
                  className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 flex flex-col gap-3 transition-all hover:shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-12 rounded-xl bg-gradient-to-tr from-indigo-700 to-[#050071] text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                      {course.classNum}th
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-800 text-xs line-clamp-1">{course.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{course.subject} • {course.instructor}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-black text-slate-900 text-sm">
                          {formatPrice(course.price, currency)}
                        </span>
                        <span className="text-[11px] text-slate-400 line-through">
                          {formatPrice(course.originalPrice, currency)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(course.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-all hover:scale-110 active:scale-95 cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                    <button
                      onClick={() => {
                        addToCart(course);
                        removeFromWishlist(course.id);
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-102 active:scale-95 cursor-pointer ${
                        inCart
                          ? "bg-emerald-600 text-white"
                          : "bg-[#FF2424] hover:bg-red-700 text-white shadow-sm"
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Already In Cart</span>
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
                      onClick={() => setIsWishlistOpen(false)}
                      className="py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold text-center transition-all hover:scale-102 active:scale-95"
                    >
                      View Batch
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {wishlist.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
            <button
              onClick={() => {
                wishlist.forEach((c) => {
                  if (!isInCart(c.id)) addToCart(c);
                });
                setIsWishlistOpen(false);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] text-white font-black text-xs shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add All Wishlist Items to Cart</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
