"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Course } from "@/data/coursesData";
import { siteConfig } from "@/data/siteConfig";

export interface CartItem {
  course: Course;
  addedAt: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: Course[];
  currency: "INR" | "USD";
  language: "en" | "hi";
  isCartOpen: boolean;
  appliedCoupon: string | null;
  discountAmount: number;
  subtotal: number;
  total: number;
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  toggleWishlist: (course: Course) => void;
  isInWishlist: (courseId: string) => boolean;
  isInCart: (courseId: string) => boolean;
  setIsCartOpen: (open: boolean) => void;
  setCurrency: (c: "INR" | "USD") => void;
  setLanguage: (l: "en" | "hi") => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Course[]>([]);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("fukey_cart");
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem("fukey_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      const savedCoupon = localStorage.getItem("fukey_coupon");
      if (savedCoupon) setAppliedCoupon(savedCoupon);
    } catch (e) {
      console.error("Failed loading storage", e);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem("fukey_cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("fukey_wishlist", JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const addToCart = (course: Course) => {
    if (!isInCart(course.id)) {
      setCart((prev) => [...prev, { course, addedAt: Date.now() }]);
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (courseId: string) => {
    setCart((prev) => prev.filter((item) => item.course.id !== courseId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (course: Course) => {
    if (isInWishlist(course.id)) {
      setWishlist((prev) => prev.filter((c) => c.id !== course.id));
    } else {
      setWishlist((prev) => [...prev, course]);
    }
  };

  const isInWishlist = (courseId: string) => {
    return wishlist.some((c) => c.id === courseId);
  };

  const isInCart = (courseId: string) => {
    return cart.some((item) => item.course.id === courseId);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.course.price, 0);

  let discountAmount = 0;
  if (appliedCoupon === "FREEDOM40" || appliedCoupon === "FUKEYEDU") {
    // 40% discount or special 10% extra
    discountAmount = Math.round(subtotal * 0.15); // additional promotional coupon
  }

  const total = Math.max(0, subtotal - discountAmount);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "FREEDOM40" || clean === "FUKEYEDU" || clean === "TOPPER10") {
      setAppliedCoupon(clean);
      localStorage.setItem("fukey_coupon", clean);
      return { success: true, message: `Coupon "${clean}" applied successfully!` };
    }
    return { success: false, message: "Invalid promo code. Try 'FREEDOM40'" };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem("fukey_coupon");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        currency,
        language,
        isCartOpen,
        appliedCoupon,
        discountAmount,
        subtotal,
        total,
        addToCart,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        isInCart,
        setIsCartOpen,
        setCurrency,
        setLanguage,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
