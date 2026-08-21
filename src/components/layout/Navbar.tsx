"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Layers,
  Sparkles
} from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { useAuth } from "@/components/auth/AuthContext";
import GlobalSearchModal from "./GlobalSearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const { cart, wishlist, setIsCartOpen } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Ebooks", href: "/ebooks" },
    { name: "Instructors", href: "/instructors" },
    { name: "About Us", href: "/about-us" },
    { name: "Blog", href: "/blog" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
  ];

  const categories = [
    { name: "Class 9th Foundation", href: "/courses?class=Class+9", count: "12 Courses" },
    { name: "Class 10th Board Target", href: "/courses?class=Class+10", count: "14 Courses" },
    { name: "Class 11th Science & Commerce", href: "/courses?class=Class+11", count: "16 Courses" },
    { name: "Class 12th Board & Competitive", href: "/courses?class=Class+12", count: "18 Courses" },
    { name: "Hindi Medium Special Batches", href: "/courses?lang=Hindi", count: "24 Batches" },
    { name: "English Medium Batches", href: "/courses?lang=English", count: "28 Batches" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200/80"
            : "bg-white py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo & Category trigger */}
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#050071] via-[#5751E1] to-[#FF2424] p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-[#050071]" />
                </div>
              </div>
              <div>
                <div className="font-extrabold text-xl tracking-tight text-[#050071] flex items-center gap-1">
                  <span>Fukey</span>
                  <span className="text-[#FF2424]">Education</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 px-1.5 py-0.2 rounded ml-1">
                    CBSE
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium tracking-wide">
                  Classes 9th - 12th Coaching
                </div>
              </div>
            </Link>

            {/* Categories Dropdown Desktop */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50/70 hover:bg-indigo-100 text-[#050071] font-semibold text-xs transition-colors border border-indigo-100"
              >
                <Layers className="w-4 h-4 text-[#5751E1]" />
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`} />
              </button>

              {isCategoriesOpen && (
                <div
                  className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                >
                  <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                    Select Grade &amp; Stream
                  </div>
                  {categories.map((cat, idx) => (
                    <Link
                      key={idx}
                      href={cat.href}
                      onClick={() => setIsCategoriesOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-semibold">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Navigation Links Desktop */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors relative py-1 ${
                    isActive ? "text-[#5751E1]" : "text-slate-700 hover:text-[#5751E1]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5751E1] rounded-full animate-in fade-in duration-200" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Search Trigger */}
          <div className="flex items-center gap-3">
            {/* Search Input Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-500 text-xs transition-colors border border-slate-200/60 group"
              title="Search (Cmd + K)"
            >
              <Search className="w-3.5 h-3.5 text-indigo-600 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-medium">Search courses...</span>
              <kbd className="hidden md:inline bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 rounded border border-slate-200 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/courses"
              className="relative p-2 rounded-full text-slate-600 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-[#FF2424] text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm animate-bounce">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Student Login / Profile */}
            <Link
              href={isAuthenticated ? (user?.role === "instructor" ? "/instructor/dashboard" : "/dashboard") : "/login"}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#050071] to-[#5751E1] text-white text-xs font-bold shadow-md shadow-indigo-950/10 hover:shadow-lg hover:brightness-110 transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>{isAuthenticated ? (user?.name || "My Dashboard") : "Student Portal"}</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
                    pathname === link.href
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-400 px-3 uppercase tracking-wider mb-1">
                Categories
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {categories.map((cat, idx) => (
                  <Link
                    key={idx}
                    href={cat.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-indigo-50 text-slate-700 font-medium"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <Link
                href={isAuthenticated ? "/dashboard" : "/login"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-[#050071] text-white text-xs font-bold"
              >
                {isAuthenticated ? "Go to Dashboard" : "Sign In to Student Portal"}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
