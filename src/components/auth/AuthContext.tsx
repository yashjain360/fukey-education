"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, setCookie, getCookie, removeCookie } from "@/lib/auth";
import { triggerConfetti } from "@/lib/confetti";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isGoogleModalOpen: boolean;
  openGoogleModal: () => void;
  closeGoogleModal: () => void;
  loginWithGoogle: (customData?: Partial<UserProfile>) => Promise<UserProfile | void>;
  loginWithEmail: (email: string, name?: string, role?: "student" | "instructor" | "admin", phone?: string) => Promise<UserProfile>;
  updateUser: (updatedData: Partial<UserProfile>) => Promise<UserProfile>;
  logout: () => void;
  switchRole: (role: "student" | "instructor" | "admin") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  useEffect(() => {
    // Check cookies first, fallback to localStorage
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
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = async (userObj: UserProfile) => {
    // Sync to MongoDB users collection & retrieve verified role
    try {
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userObj),
      });
      const data = await res.json();
      if (data.success && data.user) {
        userObj = { ...userObj, ...data.user };
      }
    } catch (err) {}

    setUser(userObj);
    localStorage.setItem("fukey_auth_user", JSON.stringify(userObj));
    setCookie("fukey_session", JSON.stringify(userObj), 30);

    triggerConfetti();
    return userObj;
  };

  const updateUser = async (updatedData: Partial<UserProfile>) => {
    const current = user || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("fukey_auth_user") || "null") : null) || {};
    const mergedUser: UserProfile = {
      ...current,
      ...updatedData,
      id: current.id || `usr_${Date.now()}`,
      email: updatedData.email || current.email || "",
      name: updatedData.name || current.name || "Student",
      role: current.role || "student",
    };
    return await saveUserSession(mergedUser);
  };

  const redirectToGoogleOAuth = async (role = "student") => {
    try {
      const res = await fetch(`/api/auth/google/url?role=${encodeURIComponent(role)}`);
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Failed to initialize Google OAuth redirect", err);
    }
  };

  const openGoogleModal = () => redirectToGoogleOAuth("student");
  const closeGoogleModal = () => setIsGoogleModalOpen(false);

  const loginWithGoogle = async (customData?: Partial<UserProfile>) => {
    if (customData?.email) {
      const googleUser: UserProfile = {
        id: customData?.id || `usr_google_${Date.now()}`,
        name: customData?.name || "Student",
        email: customData.email,
        role: customData?.role || "student",
        phone: customData?.phone || "",
        avatar: customData?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        enrolledCoursesCount: 2,
        quizAttemptsCount: 5,
        totalReviewsCount: 3300,
        instructorCoursesCount: 2,
        pendingCoursesCount: 0,
      };
      return await saveUserSession(googleUser);
    }
    // Direct redirect to Official Google
    await redirectToGoogleOAuth("student");
  };

  const loginWithEmail = async (
    email: string,
    name = "Student",
    role: "student" | "instructor" | "admin" = "student",
    phone = ""
  ) => {
    const emailUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name || email.split("@")[0],
      email,
      role,
      phone: phone || "",
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
    localStorage.removeItem("fukey_student_active_tab");
    localStorage.removeItem("fukey_instructor_active_tab");
    localStorage.removeItem("fukey_admin_active_tab");
    removeCookie("fukey_session");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isGoogleModalOpen,
        openGoogleModal: () => redirectToGoogleOAuth("student"),
        closeGoogleModal: () => setIsGoogleModalOpen(false),
        loginWithGoogle,
        loginWithEmail,
        updateUser,
        logout,
        switchRole,
      }}
    >
      {children}
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
