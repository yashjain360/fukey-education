"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, DEMO_USER, setCookie, getCookie, removeCookie } from "@/lib/auth";
import { triggerConfetti } from "@/lib/confetti";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginWithGoogle: (customData?: Partial<UserProfile>) => UserProfile;
  loginAsDemo: (role?: "student" | "instructor" | "admin") => void;
  loginWithEmail: (email: string, name?: string) => void;
  logout: () => void;
  switchRole: (role: "student" | "instructor" | "admin") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEMO_USER);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("fukey_auth_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(DEMO_USER);
        localStorage.setItem("fukey_auth_user", JSON.stringify(DEMO_USER));
      }
    } catch (e) {}
  }, []);

  const loginWithGoogle = (customData?: Partial<UserProfile>) => {
    const googleUser: UserProfile = {
      id: "google-mayank-1039",
      name: customData?.name || "Mayank Dubey",
      email: customData?.email || "mayank@fukeyeducation.com",
      role: customData?.role || "student",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      phone: customData?.phone || "+91 88718 35015",
      enrolledCoursesCount: 2,
      quizAttemptsCount: 5,
      totalReviewsCount: 3300,
      instructorCoursesCount: 2,
      pendingCoursesCount: 0,
    };
    setUser(googleUser);
    localStorage.setItem("fukey_auth_user", JSON.stringify(googleUser));
    setCookie("fukey_session", JSON.stringify(googleUser));
    triggerConfetti();
    return googleUser;
  };

  const loginAsDemo = (role: "student" | "instructor" | "admin" = "student") => {
    const updated = { ...DEMO_USER, role: role as any };
    setUser(updated);
    localStorage.setItem("fukey_auth_user", JSON.stringify(updated));
    setCookie("fukey_session", JSON.stringify(updated));
    triggerConfetti();
  };

  const loginWithEmail = (email: string, name = "Mayank Dubey") => {
    const newUser: UserProfile = {
      ...DEMO_USER,
      email,
      name,
    };
    setUser(newUser);
    localStorage.setItem("fukey_auth_user", JSON.stringify(newUser));
    setCookie("fukey_session", JSON.stringify(newUser));
    triggerConfetti();
  };

  const switchRole = (role: "student" | "instructor" | "admin") => {
    if (user) {
      const updated = { ...user, role: role as any };
      setUser(updated);
      localStorage.setItem("fukey_auth_user", JSON.stringify(updated));
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
        loginWithGoogle,
        loginAsDemo,
        loginWithEmail,
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
