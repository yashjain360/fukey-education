"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ZoomIn, X, Sparkles } from "lucide-react";

export default function GallerySection() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // Exact 9 real gallery images matching live website and screenshot
  const gallery = [
    {
      src: "/images/gallery/gallery_1.webp",
      fallback: "https://fukeyeducation.com/uploads/store/gallery/1W63OIxPn6VaVbsN7XZvfnmRAFyWLVNPgnjDTRZp.webp",
      alt: "Fukey Education Interactive Workshop Hall",
      aspect: "col-span-1 row-span-1",
    },
    {
      src: "/images/gallery/gallery_2.webp",
      fallback: "https://fukeyeducation.com/uploads/store/gallery/1pBApSu4gSKieUUUbUYlUjpmJrvJAYF91MKBeNCh.webp",
      alt: "Fukey Education Faculty Presentation",
      aspect: "col-span-1 row-span-1",
    },
    {
      src: "/images/gallery/gallery_3.webp",
      fallback: "https://fukeyeducation.com/uploads/store/gallery/M17kWT0kGMrwLRVsXyeWWhjcT5fNJgVQuweSGKZe.webp",
      alt: "Senior Educators Academic Panel",
      aspect: "col-span-1 row-span-2",
    },
    {
      src: "/images/gallery/gallery_4.webp",
      fallback: "https://fukeyeducation.com/uploads/store/gallery/OjnHbCXmu6TIssQOWVKYyyQgAUzkcZdgADVrYift.webp",
      alt: "Senior Master Trainer Keynote",
      aspect: "col-span-1 row-span-2",
    },
    {
      src: "/images/gallery/gallery_5.webp",
      fallback: "https://fukeyeducation.com/uploads/store/gallery/UAPFZ06vCwmp4QjZHb4u1I2SxgtHNwPpfeIdXsv1.webp",
      alt: "Student Speaker Stage",
      aspect: "col-span-1 row-span-2",
    },
    {
      src: "/images/gallery/gallery_6.webp",
      fallback: "https://fukeyeducation.com/uploads/store/gallery/VdtdlCFpTElBoaP8aGjYzae2yKoZaRSkf4YwUh93.webp",
      alt: "Classroom Cohort Batch",
      aspect: "col-span-1 row-span-1",
    },
    {
      src: "/images/gallery/gallery_7.webp",
      fallback: "https://fukeyeducation.com/uploads/store/gallery/tCHOhe8jKvht0yUThsrrtKlrA8r7Ws5SWbYtJKS2.webp",
      alt: "Core Teaching Team",
      aspect: "col-span-1 row-span-1",
    },
    {
      src: "/images/gallery/gallery_8.webp",
      fallback: "https://fukeyeducation.com/uploads/store/gallery/u57sHocAyCaCCDYiBjeclCFpKihyMZYc2qHp4K8z.webp",
      alt: "Faculty Educators Lineup",
      aspect: "col-span-1 row-span-1",
    },
    {
      src: "/images/gallery/gallery_9.webp",
      fallback: "https://fukeyeducation.com/uploads/store/gallery/xCt3H23prsMXs2NxGjAYghnYWVbXI7klYZka0aAM.webp",
      alt: "Student Leader Portrait",
      aspect: "col-span-1 row-span-2",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 font-extrabold text-xs uppercase tracking-wider">
            Real Campus &amp; Student Life
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Gallery
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Real moments from our live workshops, offline faculty masterclasses, and student felicitations.
          </p>
        </div>

        {/* Gallery Grid Matching Exact Layout From Screenshot */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImg(item.src)}
              className="relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border-2 border-white cursor-pointer bg-slate-200 aspect-[4/3] md:aspect-auto md:h-64 transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = item.fallback;
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
            <img src={selectedImg} alt="Enlarged gallery view" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}
