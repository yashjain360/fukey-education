export type FestivalType = "rakshabandhan" | "independence_day" | "diwali" | "holi" | "republic_day" | "standard";

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
  festiveHeadline: string;
  festiveSubtitle: string;
}

export const FESTIVALS: Record<FestivalType, FestivalTheme> = {
  rakshabandhan: {
    id: "rakshabandhan",
    name: "Rakshabandhan Utsav",
    badge: "🪢 रक्षाबंधन विशेष",
    tagline: "Gift of Knowledge for Your Brother & Sister",
    bannerText: "🪢 Rakshabandhan Special: Gift your sibling the best CBSE & State Board coaching with 40% OFF using code RAKHI40",
    primaryColor: "#0F766E", // Blinkit festive peacock teal
    secondaryColor: "#D97706", // Gold
    accentColor: "#E11D48", // Rakhi Crimson
    trailColors: ["#D97706", "#E11D48", "#0F766E", "#FDE047"],
    ambientIcons: ["🪢", "✨", "🎁", "🪔"],
    bannerGradient: "linear-gradient(90deg, #042F2E 0%, #0F766E 50%, #D97706 100%)",
    saleDiscount: "40% OFF",
    festiveHeadline: "Celebrate Rakshabandhan with the Gift of Education",
    festiveSubtitle: "Empower your sibling's board exam journey with India's top educators, live interactive classes, and complete NCERT notes.",
  },
  independence_day: {
    id: "independence_day",
    name: "Independence Day",
    badge: "🇮🇳 Freedom Special",
    tagline: "Celebrating 79 Years of Indian Independence",
    bannerText: "🇮🇳 Happy Independence Day! Get 40% OFF on all Classes 9th–12th Live Batches with code FREEDOM40",
    primaryColor: "#FF9933",
    secondaryColor: "#138808",
    accentColor: "#000080",
    trailColors: ["#FF9933", "#FFFFFF", "#138808", "#FFD700"],
    ambientIcons: ["🪁", "🇮🇳", "✨", "🕊️"],
    bannerGradient: "linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)",
    saleDiscount: "40% OFF",
    festiveHeadline: "Happy Independence Day Celebration",
    festiveSubtitle: "Grab our biggest Freedom Sale discount on all live coaching batches for Classes 9th to 12th.",
  },
  diwali: {
    id: "diwali",
    name: "Diwali Sparkle",
    badge: "🪔 Diwali Mahotsav",
    tagline: "Illuminate Your Academic Future",
    bannerText: "🪔 Shubh Deepavali! Light up your scores with Flat 50% OFF using code DIWALI50",
    primaryColor: "#B45309",
    secondaryColor: "#D97706",
    accentColor: "#78350F",
    trailColors: ["#FFD700", "#FF6B00", "#FF4500", "#FFF8DC"],
    ambientIcons: ["🪔", "✨", "🎆", "🎇"],
    bannerGradient: "linear-gradient(90deg, #78350F 0%, #D97706 50%, #B45309 100%)",
    saleDiscount: "50% OFF",
    festiveHeadline: "Light Up Your Board Exam Success",
    festiveSubtitle: "Festival of lights discount on all comprehensive subject masterclasses.",
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
    trailColors: ["#EC4899", "#8B5CF6", "#3B82F6", "#10B981"],
    ambientIcons: ["🎨", "🌸", "✨", "💧"],
    bannerGradient: "linear-gradient(90deg, #EC4899 0%, #8B5CF6 50%, #10B981 100%)",
    saleDiscount: "45% OFF",
    festiveHeadline: "Colors of Academic Excellence",
    festiveSubtitle: "Celebrate the season of colors with high-scoring board strategies.",
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
    trailColors: ["#FF9933", "#FFFFFF", "#138808"],
    ambientIcons: ["🇮🇳", "🏛️", "✨", "🎖️"],
    bannerGradient: "linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)",
    saleDiscount: "40% OFF",
    festiveHeadline: "Republic Day Academic Special",
    festiveSubtitle: "Special discount on all target board batches.",
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
    trailColors: ["#5751E1", "#050071", "#FF2424"],
    ambientIcons: ["✨", "📚", "⭐"],
    bannerGradient: "linear-gradient(90deg, #050071 0%, #5751E1 100%)",
    saleDiscount: "25% OFF",
    festiveHeadline: "Transform Your Board Exam Performance",
    festiveSubtitle: "Live online classes, recorded lectures, formula banks, and expert mentoring.",
  },
};
