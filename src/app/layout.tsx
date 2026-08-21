import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import AOSProvider from "@/components/providers/AOSProvider";
import { LanguageProvider } from "@/components/providers/LanguageContext";
import { AuthProvider } from "@/components/auth/AuthContext";
import { CartProvider } from "@/components/cart/CartContext";
import { ModalProvider } from "@/components/ui/CustomModal";
import AutoEngagementModal from "@/components/ui/AutoEngagementModal";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import WishlistDrawer from "@/components/cart/WishlistDrawer";
import LayoutClientWrapper from "@/components/layout/LayoutClientWrapper";

export const metadata: Metadata = {
  title: "Fukey Education – Online Courses, eBooks & Expert Instructors for Classes 9th–12th",
  description:
    "Join Fukey Education for high-quality live online courses for Classes 9th to 12th, free and paid eBooks, expert instructors, and curated CBSE & State Board learning paths.",
  keywords: [
    "Fukey Education",
    "CBSE Online Coaching",
    "Class 10th Maths",
    "Class 10th Science",
    "Class 12th Physics",
    "Class 12th Chemistry",
    "NCERT Solutions",
    "Hindi Medium Coaching",
    "Bhopal Live Classes"
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-indigo-600 selection:text-white">
        <SmoothScrollProvider>
          <AOSProvider>
            <LanguageProvider>
              <AuthProvider>
                <CartProvider>
                  <ModalProvider>
                    <div className="relative z-10 flex min-h-screen flex-col justify-between">
                      <div>
                        <TopBar />
                        <Navbar />
                        <main>{children}</main>
                      </div>
                      <Footer />
                    </div>
                    <CartDrawer />
                    <WishlistDrawer />
                    <AutoEngagementModal />
                    <LayoutClientWrapper />
                  </ModalProvider>
                </CartProvider>
              </AuthProvider>
            </LanguageProvider>
          </AOSProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
