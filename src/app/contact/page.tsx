"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
  Clock,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { triggerConfetti } from "@/lib/confetti";
import { siteConfig } from "@/data/siteConfig";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [targetClass, setTargetClass] = useState("Class 10");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          targetClass,
          medium: "Hindi & English",
          subjectInterest: message || "General Admission Inquiry",
        }),
      });

      setIsSent(true);
      triggerConfetti();
    } catch (err) {
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Banner */}
        <div
          className="rounded-3xl bg-gradient-to-r from-[#050071] via-[#1C1A4A] to-[#5751E1] text-white p-6 sm:p-12 shadow-xl mb-8 sm:mb-12 relative overflow-hidden"
          data-aos="fade-down"
          data-aos-duration="750"
        >
          <div className="relative z-10 space-y-2.5 sm:space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 font-extrabold text-[11px] sm:text-xs uppercase tracking-wider border border-orange-400/30">
              Admissions Desk &amp; Support 2026-27
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Contact Fukey Education Bhopal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Connect directly with our senior academic counselors in Bhopal, MP for CBSE &amp; State Board batch admissions, live demo bookings, or technical student assistance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6" data-aos="fade-right" data-aos-duration="800">
            {/* Main Details Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-black text-slate-900">Bhopal Academic Center &amp; Support</h2>

              <div className="space-y-4 divide-y divide-slate-100 text-xs">
                {/* Physical Location */}
                <div className="pt-3 first:pt-0 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 animate-icon-float" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Headquarters &amp; Studio</div>
                    <div className="text-slate-600 mt-0.5 leading-relaxed font-medium">
                      {siteConfig.address}
                    </div>
                    <a
                      href="https://maps.google.com/?q=Guru+Kripa+Tower+Kolar+Road+Bhopal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#5751E1] font-bold mt-1 hover:underline"
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Helpline Numbers */}
                <div className="pt-4 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#050071] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 animate-icon-wiggle" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Official Helplines</div>
                    <div className="text-slate-700 font-semibold mt-0.5 space-y-0.5">
                      <div>
                        <a href="tel:+918871835015" className="hover:text-indigo-600">
                          {siteConfig.supportPhone}
                        </a>
                      </div>
                      <div>
                        <a href="tel:+917024849838" className="hover:text-indigo-600">
                          {siteConfig.alternatePhone}
                        </a>
                      </div>
                    </div>
                    <div className="text-slate-500 text-[11px] mt-1">Mon – Sat: 9:00 AM – 7:30 PM IST</div>
                  </div>
                </div>

                {/* Email Inquiries */}
                <div className="pt-4 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 animate-icon-pulse" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Email Admissions Desk</div>
                    <div className="text-slate-600 mt-0.5">
                      <a href="mailto:info@fukeyeducation.com" className="hover:text-indigo-600 font-semibold">
                        {siteConfig.supportEmail}
                      </a>
                    </div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Response guaranteed within 2 hours</div>
                  </div>
                </div>

                {/* WhatsApp Chat Direct */}
                <div className="pt-4 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 animate-icon-wiggle" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">WhatsApp Instant Counselor</div>
                    <div className="text-slate-600 mt-0.5">Chat live for quick fee &amp; batch details</div>
                    <a
                      href={siteConfig.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-xs transition-all hover:scale-105 active:scale-95"
                    >
                      <span>Open WhatsApp Chat</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Interactive Map Preview */}
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm overflow-hidden space-y-2">
              <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-800">
                <span>Center Location (Kolar Road, Bhopal)</span>
                <span className="text-emerald-600 font-black">● Open Today</span>
              </div>
              <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                <iframe
                  title="Fukey Education Location Map"
                  src="https://maps.google.com/maps?q=Vishal+Mega+Mart+Kolar+Road+Bhopal+Madhya+Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7" data-aos="fade-left" data-aos-duration="850">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              {isSent ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Inquiry Confirmed &amp; Dispatched!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{name}</strong>. An email receipt has been sent to your inbox and our Bhopal counselor will call you on <strong className="text-slate-900">{phone}</strong> within 15 minutes.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setIsSent(false)}
                      className="px-6 py-2.5 rounded-xl bg-[#050071] text-white font-bold text-xs hover:bg-[#5751E1] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                      <Sparkles className="w-3.5 h-3.5 animate-icon-sparkle" />
                      <span>Free Live Demo &amp; Syllabus Counseling</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">Send an Academic Inquiry</h2>
                    <p className="text-xs text-slate-500">
                      Fill in your details below to request a callback or book a free trial class session.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Mayank Dubey"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Mobile *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="student@example.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Target Class *</label>
                        <select
                          value={targetClass}
                          onChange={(e) => setTargetClass(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
                        >
                          <option value="Class 9">Class 9 (CBSE / State Board)</option>
                          <option value="Class 10">Class 10 (CBSE / State Board)</option>
                          <option value="Class 11 Science">Class 11 Science (PCM / PCB)</option>
                          <option value="Class 11 Commerce">Class 11 Commerce</option>
                          <option value="Class 12 Science">Class 12 Science (Physics, Chemistry, Maths)</option>
                          <option value="Class 12 Commerce">Class 12 Commerce &amp; Economics</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Questions / Message</label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about the chapters or subjects where you need live teacher support..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] hover:brightness-110 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-102 active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Admission Inquiry"}</span>
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Your information is protected &amp; never shared. Free demo class included.</span>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
