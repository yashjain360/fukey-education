"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  GraduationCap,
  ShieldCheck,
  ChevronDown,
  LogOut
} from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { useAuth } from "@/components/auth/AuthContext";
import GlobalSearchModal from "./GlobalSearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const { cart, wishlist, setIsCartOpen, setIsWishlistOpen } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200"
            : "bg-white py-3.5 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Authentic Fukey Education Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105 active:scale-95 flex-shrink-0">
            <img
              src="/images/logo/logo-main.png"
              alt="Fukey Education Logo"
              className="h-10 sm:h-11 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-02-23-03-59-14-6859.png";
              }}
            />
          </Link>

          {/* Center Navigation Links Desktop */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold relative py-1 transition-all hover:scale-105 active:scale-95 ${
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
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-500 text-xs border border-slate-200/60 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Search (Cmd + K)"
            >
              <Search className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline font-medium">Search courses...</span>
              <kbd className="hidden md:inline bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 rounded border border-slate-200">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Icon Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-full text-slate-600 hover:text-rose-500 hover:bg-rose-50 transition-all hover:scale-110 active:scale-90 cursor-pointer"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-rose-500 text-white rounded-full text-[10px] font-black flex items-center justify-center animate-bounce">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all hover:scale-110 active:scale-90 cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-[#FF2424] text-white rounded-full text-[10px] font-black flex items-center justify-center animate-bounce">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Student / Instructor / Admin Portal Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#050071] text-white text-xs font-bold shadow-sm hover:bg-[#5751E1] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">
                    {user?.name?.charAt(0) || "M"}
                  </div>
                  <span className="hidden sm:inline font-bold">{user?.name || "Mayank Dubey"}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <div className="text-xs font-black text-slate-900">{user?.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{user?.email}</div>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-[#5751E1] transition-colors"
                    >
                      <GraduationCap className="w-4 h-4 text-blue-500" />
                      <span>Student Dashboard</span>
                    </Link>

                    <Link
                      href="/instructor/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-[#5751E1] transition-colors"
                    >
                      <User className="w-4 h-4 text-purple-500" />
                      <span>Instructor Dashboard</span>
                    </Link>

                    <Link
                      href="/admin"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Admin Console</span>
                    </Link>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#050071] to-[#5751E1] text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                <User className="w-3.5 h-3.5" />
                <span>Student Portal</span>
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
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

            <div className="pt-2 flex flex-col gap-2 border-t border-slate-100">
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-[#050071] text-white text-xs font-bold transition-transform active:scale-95"
              >
                Student Dashboard
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold transition-transform active:scale-95"
              >
                Admin Console
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
