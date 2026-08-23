"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  GraduationCap,
  BookOpen,
  HelpCircle,
  PhoneCall,
  CheckCircle2
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: string[];
  timestamp: string;
}

interface FukeyAiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FukeyAiChatbot({ isOpen, onClose }: FukeyAiChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Namaste! 🙏 I am **Fukey AI Sahayak**, your personal academic counselor. How can I assist you with your Class 9th-12th studies today?",
      options: [
        "Recommend courses for Class 10th",
        "Class 12th Physics & Chemistry batches",
        "Difference between Hindi & English medium",
        "How to prepare for Board Exams?",
        "Talk to a human academic counselor"
      ],
      timestamp: "Just now"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      let botReply = "";
      let botOptions: string[] | undefined = undefined;

      const q = text.toLowerCase().trim();

      if (q.includes("economic") || q.includes("who teaches eco")) {
        botReply = "📈 **Economics (Classes 11th & 12th)** is taught by:\n• **Dr. Aditi Sharma** (English Medium) — Delhi School of Economics alumna specializing in Macroeconomics & Micro Analysis.\n• **Rashmi Parihar** (Hindi Medium) — M.Com, M.Phil with 10+ years experience in Indian Economic Development & Statistics.\n\nBoth educators offer live NCERT derivations and numerical drills!";
        botOptions = ["View Economics Courses", "Meet Dr. Aditi Sharma", "Meet Rashmi Parihar", "Ask Course Fees"];
      } else if (q.includes("math") || q.includes("who teaches math") || q.includes("pawan")) {
        botReply = "📐 **Mathematics (Classes 9th to 12th)** is taught by **Pawan Gupta** (Senior Faculty & HOD, M.Sc. Mathematics, B.Ed. Gold Medalist with 10+ Years Experience). He is author of the 'Fast Track Maths Formula Bank' and has trained 150+ board centum scorers!";
        botOptions = ["View Maths Batches", "Download 10th Maths Formulas", "Meet Pawan Gupta"];
      } else if (q.includes("chem") || q.includes("kratika") || (q.includes("science") && !q.includes("social"))) {
        botReply = "🧪 **Science & Chemistry** is taught by **Kratika Rathore** (Head of Science, M.Sc. Chemistry, CSIR-NET Qualified with 8+ Years Experience). She brings chemical reactions alive through interactive experiment simulations and memory mnemonics!";
        botOptions = ["View Class 10 Science", "View Class 12 Chemistry", "Meet Kratika Rathore"];
      } else if (q.includes("physic") || q.includes("vivek")) {
        botReply = "⚡ **Physics (Classes 11th & 12th)** is taught by **Vivek Dubey** (Senior Physics Faculty Lead, M.Tech, 12+ Years Experience, Former Kota Faculty Lead). Renowned for pen-tablet whiteboard derivations and board numerical shortcuts!";
        botOptions = ["View Physics Batches", "Download 12th Physics Derivations", "Meet Vivek Dubey"];
      } else if (q.includes("bio") || q.includes("zoology") || q.includes("botany") || q.includes("babli")) {
        botReply = "🧬 **Biology (Classes 11th & 12th)** is taught by **Babli Jain** (M.Sc. Zoology, 9+ Years Experience). She specializes in high-yield NCERT diagram mastery, genetics problem solving, and human physiology!";
        botOptions = ["View Biology Batches", "Meet Babli Jain"];
      } else if (q.includes("account") || q.includes("soumya")) {
        botReply = "📊 **Accountancy (Classes 11th & 12th)** is taught by **Soumya Jain** (M.Com, Chartered Accountancy Faculty Lead with 8+ Years Experience). Covers Partnership Accounts, Company Balance Sheets, and Cash Flow Statements line-by-line!";
        botOptions = ["View Accountancy Batches", "Meet Soumya Jain"];
      } else if (q.includes("business") || q.includes("bstd") || q.includes("mousam")) {
        botReply = "💼 **Business Studies (Classes 11th & 12th)** is taught by **Mousam Patil** (M.Com, UGC-NET Qualified). Known for real-world case study breakdowns and board answer presentation techniques!";
        botOptions = ["View Business Studies Batches", "Meet Mousam Patil"];
      } else if (q.includes("polity") || q.includes("political") || q.includes("mayank")) {
        botReply = "🏛️ **Political Science & Humanities** is taught by **Mayank Dubey** (M.A. Political Science, Senior Faculty Lead). Covers Indian Constitution, World Politics, and Board Mock Answer Writing!";
        botOptions = ["View Political Science Batches", "Meet Mayank Dubey"];
      } else if (q.includes("social") || q.includes("history") || q.includes("geo") || q.includes("soni") || q.includes("ram")) {
        botReply = "🌍 **Social Science (Classes 9th & 10th)** is taught by **Ram Kumar Soni** (M.A., B.Ed., 10+ Yrs Exp). Known for map-pointing masterclasses, chronology timelines, and NCERT structured answer keys!";
        botOptions = ["View Social Science Batches", "Meet Ram Kumar Soni"];
      } else if (q.includes("faculty") || q.includes("teacher") || q.includes("instructor") || q.includes("sir") || q.includes("ma'am") || q.includes("mam")) {
        botReply = "👨‍🏫 **Fukey Education Faculty Directory**:\n• **Mathematics**: Pawan Gupta (Gold Medalist)\n• **Chemistry & Science**: Kratika Rathore (CSIR-NET)\n• **Physics**: Vivek Dubey (12+ Yrs Exp)\n• **Biology**: Babli Jain (9+ Yrs Exp)\n• **Economics**: Dr. Aditi Sharma & Rashmi Parihar\n• **Accountancy**: Soumya Jain\n• **Business Studies**: Mousam Patil\n• **Social Science & Polity**: Mayank Dubey & Ram Kumar Soni\n\nAll teachers hold live 45-min classes + 15-min 1-on-1 doubt solving daily!";
        botOptions = ["Meet All Faculty", "Explore All Batches", "Talk to Academic Counselor"];
      } else if (q.includes("fee") || q.includes("price") || q.includes("cost") || q.includes("discount") || q.includes("coupon") || q.includes("offer")) {
        botReply = "🎟️ **Course Pricing & Special Discounts**:\n• All individual subject batches are priced at **₹1,499** (regular ₹2,499).\n• Use coupon code **`FREEDOM40`** at checkout for an instant **40% OFF**!\n• Batches include complete NCERT live lectures, formula PDFs, test series & 1-on-1 doubts.";
        botOptions = ["Browse All Courses", "Claim FREEDOM40 Discount", "Talk to Admissions"];
      } else if (q.includes("10th") || q.includes("class 10")) {
        botReply = "For **Class 10th Boards**, we offer comprehensive target batches for **Mathematics (Pawan Gupta)** and **Science (Kratika Rathore)** available in both Hindi and English mediums. All courses include NCERT line-by-line solutions, chapter-wise mock tests, and live doubt sessions!";
        botOptions = ["View Class 10 Maths", "View Class 10 Science", "Claim Freedom 40% Discount"];
      } else if (q.includes("12th") || q.includes("physics") || q.includes("chemistry")) {
        botReply = "For **Class 12th**, our faculty includes **Vivek Dubey (Physics)** and **Kratika Rathore (Chemistry)**. The batch features complete formula derivation roadmaps, organic mechanisms, and previous 10 years board paper solutions.";
        botOptions = ["Check Class 12 Courses", "Download Free Physics Formula Sheet"];
      } else if (q.includes("hindi") || q.includes("english")) {
        botReply = "Fukey Education offers **dedicated separate batches** in both Hindi Medium and English Medium with native faculty, bilingual terminology, and handwritten notes!";
        botOptions = ["Show Hindi Medium Batches", "Show English Medium Batches"];
      } else if (q.includes("board exam") || q.includes("prepare") || q.includes("strategy")) {
        botReply = "💡 **Top 3 Board Exam Tips**:\n1. Solve NCERT in-text & back exercises twice.\n2. Dedicate 50 mins study + 10 mins break.\n3. Practice 5 full-length mock papers with 3-hour timer.\nCheck our Blog section for full timetables!";
        botOptions = ["Read Exam Strategy Blog", "Download Free eBooks"];
      } else if (q.includes("counselor") || q.includes("call") || q.includes("human") || q.includes("talk") || q.includes("phone")) {
        botReply = `You can speak directly with our senior admission counselor in Bhopal at **${siteConfig.supportPhone}** or click below to chat on WhatsApp instantly!`;
        botOptions = ["Chat on WhatsApp Now", "Request Free Callback"];
      } else {
        botReply = `Thank you for your question! We offer 52+ live courses for CBSE & State boards for Classes 9th-12th in Maths, Science, Commerce, and Humanities. Would you like to explore our course catalog or speak to an advisor?`;
        botOptions = ["Browse All Courses", "View Free eBooks", "Call Support"];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: botReply,
          options: botOptions,
          timestamp: "Just now"
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-[10000] sm:w-96 sm:h-[580px] bg-white sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] text-white p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="font-extrabold text-sm flex items-center gap-1.5">
              <span>Fukey AI Sahayak</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[11px] text-indigo-100">Live Academic Advisor</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                m.sender === "user"
                  ? "bg-[#5751E1] text-white rounded-tr-xs"
                  : "bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-xs"
              }`}
            >
              <div className="whitespace-pre-line">{m.text}</div>
            </div>

            {/* Quick Option Pills */}
            {m.options && (
              <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                {m.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(opt)}
                    className="px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-semibold transition-colors border border-indigo-200/60 text-left"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1 text-slate-400 text-xs p-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputText);
        }}
        className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask anything about courses, syllabus..."
          className="flex-1 bg-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-[#5751E1] hover:bg-indigo-700 disabled:opacity-40 text-white transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
