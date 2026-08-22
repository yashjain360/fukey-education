"use client";

import React, { createContext, useContext, useState } from "react";
import { X, CheckCircle2, Video, Download, FileText, Plus, MessageSquare, AlertCircle, Sparkles } from "lucide-react";
import { triggerConfetti } from "@/lib/confetti";
import { downloadFormulaSheet } from "@/lib/downloadHelper";

interface ModalConfig {
  title: string;
  subtitle?: string;
  type?: "info" | "video" | "download" | "reply" | "create_class" | "create_course" | "receipt";
  data?: any;
  confirmText?: string;
  onConfirm?: () => void;
}

interface ModalContextType {
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<ModalConfig | null>(null);
  const [replyText, setReplyText] = useState("");
  const [newClassTitle, setNewClassTitle] = useState("");

  const openModal = (config: ModalConfig) => {
    setModal(config);
  };

  const closeModal = () => {
    setModal(null);
    setReplyText("");
    setNewClassTitle("");
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modal && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Lecture Room Modal */}
            {modal.type === "video" && (
              <div className="space-y-5 text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-[#5751E1] mx-auto flex items-center justify-center">
                  <Video className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-[11px] font-extrabold text-red-600 uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    <span>Live Classroom Session</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">{modal.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{modal.subtitle || "Connecting with faculty and peer batch..."}</p>
                </div>

                <div className="p-4 bg-slate-900 rounded-2xl text-white space-y-3">
                  <div className="aspect-video bg-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-400 p-4 space-y-2 border border-slate-700">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-200">High-Definition 1080p Stream Ready</span>
                    <span className="text-[10px] text-slate-400">Audio &amp; Chat Connected • Low Latency CDN</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Leave Room
                  </button>
                  <button
                    onClick={() => {
                      triggerConfetti();
                      closeModal();
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#050071] hover:bg-indigo-900 text-white font-bold text-xs"
                  >
                    Enter Fullscreen Class
                  </button>
                </div>
              </div>
            )}

            {/* Download Receipt / Notes Modal */}
            {modal.type === "download" && (
              <div className="space-y-5 text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <Download className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{modal.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{modal.subtitle || "Your verified PDF document is ready."}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Document Format:</span>
                    <span className="font-bold text-slate-800">Adobe Acrobat PDF (.pdf)</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Verification Status:</span>
                    <span className="font-bold text-emerald-600">Official Fukey Education Digital Seal</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    downloadFormulaSheet(modal.subtitle || modal.title || "NCERT Board Study Resource");
                    triggerConfetti();
                    closeModal();
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#050071] hover:bg-indigo-900 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-98"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Verified Document</span>
                </button>
              </div>
            )}

            {/* Reply to Student Question Modal */}
            {modal.type === "reply" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">{modal.title}</h3>
                    <p className="text-xs text-slate-500">{modal.subtitle}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200">
                  <span className="font-bold text-slate-900">Student Question: </span>
                  {modal.data?.question || "How to score high marks in board exams?"}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Educator Solution / Explanation</label>
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type step-by-step conceptual explanation and formula shortcut..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      triggerConfetti();
                      closeModal();
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#5751E1] hover:bg-indigo-700 text-white font-bold text-xs"
                  >
                    Send Reply to Student
                  </button>
                </div>
              </div>
            )}

            {/* Create / Schedule Live Class Modal */}
            {modal.type === "create_class" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">Schedule Live Stream Class</h3>
                    <p className="text-xs text-slate-500">Broadcast interactive lecture to registered students</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Session Topic / Chapter Name</label>
                    <input
                      type="text"
                      value={newClassTitle}
                      onChange={(e) => setNewClassTitle(e.target.value)}
                      placeholder="e.g. Chapter 6: Triangles - Board Speed Mastery"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Target Class</label>
                      <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none">
                        <option>Class 10th (CBSE)</option>
                        <option>Class 12th (Physics/Maths)</option>
                        <option>Class 9th (Science)</option>
                        <option>Class 11th (Commerce)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Scheduled Time</label>
                      <input
                        type="time"
                        defaultValue="17:00"
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      triggerConfetti();
                      closeModal();
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#050071] hover:bg-indigo-900 text-white font-bold text-xs"
                  >
                    Publish Live Class
                  </button>
                </div>
              </div>
            )}

            {/* Default Information Dialog */}
            {(modal.type === "info" || !modal.type) && (
              <div className="space-y-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-[#050071] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{modal.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{modal.subtitle}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="w-full py-3 rounded-xl bg-[#050071] hover:bg-indigo-900 text-white font-bold text-xs"
                >
                  {modal.confirmText || "Got it"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
