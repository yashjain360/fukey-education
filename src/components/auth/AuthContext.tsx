"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, DEMO_USER, setCookie, getCookie, removeCookie } from "@/lib/auth";
import { triggerConfetti } from "@/lib/confetti";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => void;
  loginAsDemo: (role?: "student" | "instructor") => void;
  loginWithEmail: (email: string, name?: string) => void;
  logout: () => void;
  switchRole: (role: "student" | "instructor") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEMO_USER); // Default logged in as Mayank Dubey per screenshot

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

  const loginWithGoogle = () => {
    const googleUser: UserProfile = {
      id: "google-mayank-1039",
      name: "Mayank Dubey",
      email: "mayank@fukeyeducation.com",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      phone: "+91 88718 35015",
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
  };

  const loginAsDemo = (role: "student" | "instructor" = "student") => {
    const updated = { ...DEMO_USER, role };
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

  const switchRole = (role: "student" | "instructor") => {
    if (user) {
      const updated = { ...user, role };
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
