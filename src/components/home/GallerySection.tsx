"use client";

import React from "react";
import Image from "next/image";

export default function GallerySection() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
      title: "Interactive Classroom"
    },
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
      title: "Collaborative Study"
    },
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
      title: "Online Live Coaching"
    },
    {
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
      title: "Faculty Mentorship"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 font-extrabold text-xs uppercase tracking-wider">
            Campus &amp; Learning Life
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Inside Fukey Education
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Take a look at how our students engage, learn, and excel every single day.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative h-64 rounded-3xl overflow-hidden shadow-md group"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                <div className="text-white font-bold text-xs">{img.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
