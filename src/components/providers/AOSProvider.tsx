"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 750,
      once: false,
      offset: 40,
      easing: "ease-out-cubic",
      mirror: true,
    });

    const handleAosRefresh = () => {
      AOS.refresh();
    };

    window.addEventListener("scroll", handleAosRefresh, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleAosRefresh);
    };
  }, []);

  return <>{children}</>;
}
