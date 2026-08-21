"use client";

import React, { useState } from "react";
import { Camera, X, ZoomIn } from "lucide-react";

export default function GallerySection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const galleryImages = [
    { src: "/images/gallery/gallery_1.webp", alt: "Classroom Workshop & Interactive Learning" },
    { src: "/images/gallery/gallery_2.webp", alt: "Student Seminar and Guidance Session" },
    { src: "/images/gallery/gallery_3.webp", alt: "Group Discussion & Board Strategy Session" },
    { src: "/images/gallery/gallery_4.webp", alt: "Faculty Mentorship Presentation" },
    { src: "/images/gallery/gallery_5.webp", alt: "Classroom Learning Environment" },
    { src: "/images/gallery/gallery_6.webp", alt: "Student Doubts Resolution Desk" },
    { src: "/images/gallery/gallery_7.webp", alt: "Interactive Lecture Discussion" },
    { src: "/images/gallery/gallery_8.webp", alt: "Board Toppers Felicitation Ceremony" },
    { src: "/images/gallery/gallery_9.webp", alt: "Educational Workshop Participation" },
  ];

  return (
    <section className="py-20 bg-slate-50/50 border-t border-slate-200/80" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3" data-aos="fade-up">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-orange-100 text-[#FF2424] font-extrabold text-xs uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Campus &amp; Workshops</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#050071] tracking-tight">
            Our Gallery &amp; Student Events
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Moments of academic passion, seminar workshops, and topper celebrations at Fukey Education
          </p>
        </div>

        {/* 9-Image Masonry Grid matching Screenshot */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryImages.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(item.src)}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer bg-slate-100"
              data-aos="zoom-in"
              data-aos-delay={idx * 80}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-06-15-03-20-17-2242.webp";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white text-xs font-bold flex items-center justify-between w-full">
                  <span className="line-clamp-1">{item.alt}</span>
                  <ZoomIn className="w-4 h-4 text-orange-400 flex-shrink-0 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden p-2 shadow-2xl">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeImage}
              alt="Gallery Preview"
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
