export type FestivalType = "independence_day" | "republic_day" | "diwali" | "holi" | "standard";

export interface FestivalTheme {
  id: FestivalType;
  name: string;
  badge: string;
  tagline: string;
  bannerText: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  trailColors: string[];
  ambientIcons: string[];
  bannerGradient: string;
  saleDiscount: string;
}

export const FESTIVALS: Record<FestivalType, FestivalTheme> = {
  independence_day: {
    id: "independence_day",
    name: "Independence Day",
    badge: "🇮🇳 Freedom Special",
    tagline: "Celebrating 79 Years of Indian Independence",
    bannerText: "🇮🇳 Happy Independence Day! Get 40% OFF on all Classes 9th–12th Live Batches with code FREEDOM40",
    primaryColor: "#FF9933",
    secondaryColor: "#138808",
    accentColor: "#000080",
    trailColors: ["#FF9933", "#FFFFFF", "#138808", "#000080", "#FFD700"],
    ambientIcons: ["🪁", "🇮🇳", "✨", "🕊️"],
    bannerGradient: "linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)",
    saleDiscount: "40% OFF",
  },
  republic_day: {
    id: "republic_day",
    name: "Republic Day",
    badge: "🇮🇳 Republic Utsav",
    tagline: "Honoring the Constitution & Nation's Youth",
    bannerText: "🇮🇳 Republic Day Special: Flat 40% OFF on Board Crash Courses with code REPUBLIC40",
    primaryColor: "#FF9933",
    secondaryColor: "#138808",
    accentColor: "#050071",
    trailColors: ["#FF9933", "#FFFFFF", "#138808", "#050071"],
    ambientIcons: ["🇮🇳", "🏛️", "✨", "🎖️"],
    bannerGradient: "linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)",
    saleDiscount: "40% OFF",
  },
  diwali: {
    id: "diwali",
    name: "Diwali Sparkle",
    badge: "🪔 Diwali Mahotsav",
    tagline: "Illuminate Your Academic Future",
    bannerText: "🪔 Shubh Deepavali! Light up your scores with Flat 50% OFF using code DIWALI50",
    primaryColor: "#FF6B00",
    secondaryColor: "#D97706",
    accentColor: "#B45309",
    trailColors: ["#FFD700", "#FF6B00", "#FF4500", "#FFF8DC", "#FF1493"],
    ambientIcons: ["🪔", "✨", "🎆", "🎇"],
    bannerGradient: "linear-gradient(90deg, #78350F 0%, #D97706 50%, #B45309 100%)",
    saleDiscount: "50% OFF",
  },
  holi: {
    id: "holi",
    name: "Holi Rangotsav",
    badge: "🎨 Rangotsav Special",
    tagline: "Add Colors of Success to Your Report Card",
    bannerText: "🎨 Happy Holi! Splash into top board scores with Flat 45% OFF using code HOLI45",
    primaryColor: "#EC4899",
    secondaryColor: "#8B5CF6",
    accentColor: "#10B981",
    trailColors: ["#EC4899", "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"],
    ambientIcons: ["🎨", "🌸", "✨", "💧"],
    bannerGradient: "linear-gradient(90deg, #EC4899 0%, #8B5CF6 50%, #10B981 100%)",
    saleDiscount: "45% OFF",
  },
  standard: {
    id: "standard",
    name: "Standard Theme",
    badge: "🎓 CBSE & State Board",
    tagline: "Empowering Students for Board Excellence",
    bannerText: "🔥 Admissions Open for 2026-27 CBSE & State Board Live Online Batches",
    primaryColor: "#5751E1",
    secondaryColor: "#050071",
    accentColor: "#FF2424",
    trailColors: ["#5751E1", "#050071", "#FF2424", "#60A5FA"],
    ambientIcons: ["✨", "📚", "⭐"],
    bannerGradient: "linear-gradient(90deg, #050071 0%, #5751E1 100%)",
    saleDiscount: "25% OFF",
  },
};
