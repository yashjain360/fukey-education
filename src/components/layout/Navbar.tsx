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
  GraduationCap
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

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full ${
          isScrolled
            ? "bg-white/95 shadow-sm py-3 border-b border-slate-200"
            : "bg-white py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#050071] via-[#5751E1] to-[#FF2424] p-0.5 shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#050071]" />
              </div>
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight text-[#050071] flex items-center gap-1">
                <span>Fukey</span>
                <span className="text-[#FF2424]">Education</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium tracking-wide">
                Classes 9th - 12th Online Coaching
              </div>
            </div>
          </Link>

          {/* Center Navigation Links Desktop */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold relative py-1 ${
                    isActive ? "text-[#5751E1]" : "text-slate-700 hover:text-[#5751E1]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5751E1] rounded-full" />
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
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-500 text-xs border border-slate-200/60"
              title="Search (Cmd + K)"
            >
              <Search className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline font-medium">Search courses...</span>
              <kbd className="hidden md:inline bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 rounded border border-slate-200">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/courses"
              className="relative p-2 rounded-full text-slate-600 hover:text-rose-500 hover:bg-rose-50"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-[#FF2424] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Student Login / Profile */}
            <Link
              href={isAuthenticated ? (user?.role === "instructor" ? "/instructor/dashboard" : "/dashboard") : "/login"}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#050071] to-[#5751E1] text-white text-xs font-bold shadow-sm"
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
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
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
