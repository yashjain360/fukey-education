"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, DEMO_USER, setCookie, getCookie, removeCookie } from "@/lib/auth";
import { triggerConfetti } from "@/lib/confetti";
import GoogleOAuthModal from "./GoogleOAuthModal";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isGoogleModalOpen: boolean;
  openGoogleModal: () => void;
  closeGoogleModal: () => void;
  loginWithGoogle: (customData?: Partial<UserProfile>) => Promise<UserProfile>;
  loginWithEmail: (email: string, name?: string, role?: "student" | "instructor" | "admin", phone?: string) => Promise<UserProfile>;
  logout: () => void;
  switchRole: (role: "student" | "instructor" | "admin") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  useEffect(() => {
    // 1. Check cookies first, fallback to localStorage, fallback to initial Mayank session
    try {
      const sessionCookie = getCookie("fukey_session");
      const savedUser = localStorage.getItem("fukey_auth_user");

      if (sessionCookie) {
        const parsed = JSON.parse(sessionCookie);
        setUser(parsed);
      } else if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setCookie("fukey_session", JSON.stringify(parsed));
      } else {
        setUser(DEMO_USER);
        setCookie("fukey_session", JSON.stringify(DEMO_USER));
        localStorage.setItem("fukey_auth_user", JSON.stringify(DEMO_USER));
      }
    } catch (e) {
      setUser(DEMO_USER);
    }
  }, []);

  const saveUserSession = async (userObj: UserProfile) => {
    setUser(userObj);
    localStorage.setItem("fukey_auth_user", JSON.stringify(userObj));
    setCookie("fukey_session", JSON.stringify(userObj), 30);

    // Sync to MongoDB users collection
    try {
      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userObj),
      });
    } catch (err) {}

    triggerConfetti();
    return userObj;
  };

  const openGoogleModal = () => setIsGoogleModalOpen(true);
  const closeGoogleModal = () => setIsGoogleModalOpen(false);

  const loginWithGoogle = async (customData?: Partial<UserProfile>) => {
    const googleUser: UserProfile = {
      id: customData?.id || `usr_google_${Date.now()}`,
      name: customData?.name || "Mayank Dubey",
      email: customData?.email || "mayank@fukeyeducation.com",
      role: customData?.role || "student",
      phone: customData?.phone || "+91 88718 35015",
      avatar: customData?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      enrolledCoursesCount: 2,
      quizAttemptsCount: 5,
      totalReviewsCount: 3300,
      instructorCoursesCount: 2,
      pendingCoursesCount: 0,
    };

    setIsGoogleModalOpen(false);
    return await saveUserSession(googleUser);
  };

  const loginWithEmail = async (
    email: string,
    name = "Mayank Dubey",
    role: "student" | "instructor" | "admin" = "student",
    phone = "+91 88718 35015"
  ) => {
    const emailUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name || email.split("@")[0],
      email,
      role,
      phone: phone || "+91 88718 35015",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      enrolledCoursesCount: 2,
      quizAttemptsCount: 5,
      totalReviewsCount: 3300,
      instructorCoursesCount: 2,
      pendingCoursesCount: 0,
    };

    return await saveUserSession(emailUser);
  };

  const switchRole = (role: "student" | "instructor" | "admin") => {
    if (user) {
      const updated = { ...user, role };
      setUser(updated);
      localStorage.setItem("fukey_auth_user", JSON.stringify(updated));
      setCookie("fukey_session", JSON.stringify(updated), 30);
      triggerConfetti();
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fukey_auth_user");
    removeCookie("fukey_session");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isGoogleModalOpen,
        openGoogleModal: () => setIsGoogleModalOpen(true),
        closeGoogleModal: () => setIsGoogleModalOpen(false),
        loginWithGoogle,
        loginWithEmail,
        logout,
        switchRole,
      }}
    >
      {children}
      <GoogleOAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onSelectAccount={(acc) => loginWithGoogle(acc)}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
