export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin";
  avatar?: string;
  phone?: string;
  bio?: string;
  enrolledCoursesCount?: number;
  quizAttemptsCount?: number;
  totalReviewsCount?: number;
  instructorCoursesCount?: number;
  pendingCoursesCount?: number;
}

export const DEMO_USER: UserProfile = {
  id: "user-mayank-1039",
  name: "Mayank Dubey",
  email: "mayank@fukeyeducation.com",
  role: "student",
  phone: "+91 88718 35015",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  bio: "CBSE Class 12 & Competitive Aspirant / Educator at Fukey Education",
  enrolledCoursesCount: 2,
  quizAttemptsCount: 5,
  totalReviewsCount: 3300,
  instructorCoursesCount: 2,
  pendingCoursesCount: 0,
};

export function setCookie(name: string, value: string, days = 30) {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      try {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      } catch (e) {
        return c.substring(nameEQ.length, c.length);
      }
    }
  }
  return null;
}

export function removeCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
