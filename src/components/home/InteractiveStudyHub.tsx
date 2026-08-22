"use client";

import React, { useState } from "react";
import {
  Lightbulb,
  CheckCircle2,
  XCircle,
  Download,
  BookOpen,
  Sparkles,
  ArrowRight,
  Clock
} from "lucide-react";
import { triggerConfetti } from "@/lib/confetti";
import { useModal } from "@/components/ui/CustomModal";
import { useTranslation } from "@/components/providers/LanguageContext";
import { downloadFormulaSheet } from "@/lib/downloadHelper";

interface QuizQuestion {
  id: number;
  classSubjectEn: string;
  classSubjectHi: string;
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctIndex: number;
  explanationEn: string;
  explanationHi: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    classSubjectEn: "Class 10 CBSE • Mathematics",
    classSubjectHi: "कक्षा 10वीं सीबीएसई • गणित",
    questionEn: "What are the roots of the quadratic equation x² - 5x + 6 = 0?",
    questionHi: "द्विघात समीकरण x² - 5x + 6 = 0 के मूल (roots) क्या हैं?",
    optionsEn: ["x = 1, x = 6", "x = 2, x = 3", "x = -2, x = -3", "x = 5, x = 6"],
    optionsHi: ["x = 1, x = 6", "x = 2, x = 3", "x = -2, x = -3", "x = 5, x = 6"],
    correctIndex: 1,
    explanationEn: "Factorizing: (x - 2)(x - 3) = 0 gives roots x = 2 and x = 3. Taught by Pawan Sir in Chapter 4!",
    explanationHi: "गुणनखंड करने पर: (x - 2)(x - 3) = 0, जिससे मूल x = 2 और x = 3 प्राप्त होते हैं।",
  },
  {
    id: 2,
    classSubjectEn: "Class 12 Boards • Physics",
    classSubjectHi: "कक्षा 12वीं बोर्ड • भौतिक विज्ञान",
    questionEn: "According to Snell's Law, what is the ratio of sin(i) to sin(r) equal to?",
    questionHi: "स्नेल के नियमानुसार sin(i) और sin(r) का अनुपात किसके बराबर होता है?",
    optionsEn: ["n₁ / n₂", "n₂ / n₁ (Relative Refractive Index)", "n₁ × n₂", "n₁ + n₂"],
    optionsHi: ["n₁ / n₂", "n₂ / n₁ (सापेक्ष अपवर्तनांक)", "n₁ × n₂", "n₁ + n₂"],
    correctIndex: 1,
    explanationEn: "Snell's law states sin(i) / sin(r) = n₂ / n₁ = ¹n₂ (refractive index of medium 2 w.r.t 1).",
    explanationHi: "स्नेल का नियम: sin(i) / sin(r) = n₂ / n₁ = ¹n₂ (माध्यम 1 के सापेक्ष माध्यम 2 का अपवर्तनांक)।",
  },
  {
    id: 3,
    classSubjectEn: "Class 10 Science • Chemistry",
    classSubjectHi: "कक्षा 10वीं विज्ञान • रसायन शास्त्र",
    questionEn: "What is the chemical formula of rust (hydrated iron oxide)?",
    questionHi: "जंग (hydrated iron oxide) का सही रासायनिक सूत्र क्या है?",
    optionsEn: ["FeO", "Fe₃O₄", "Fe₂O₃ · xH₂O", "Fe(OH)₂"],
    optionsHi: ["FeO", "Fe₃O₄", "Fe₂O₃ · xH₂O", "Fe(OH)₂"],
    correctIndex: 2,
    explanationEn: "Rust is chemically hydrated iron(III) oxide: Fe₂O₃ · xH₂O. Taught with practical color reactions in Class 10!",
    explanationHi: "जंग का रासायनिक सूत्र हाइड्रेटेड फेरिक ऑक्साइड (Fe₂O₃ · xH₂O) होता है।",
  },
];

export default function InteractiveStudyHub() {
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const { openModal } = useModal();
  const { t, language } = useTranslation();

  const currentQ = quizQuestions[currentQuizIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
      triggerConfetti();
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentQuizIdx((prev) => (prev + 1) % quizQuestions.length);
  };

  const handleDownloadHandbook = (title: string) => {
    downloadFormulaSheet(title);
    triggerConfetti();
    openModal({
      type: "download",
      title: `Free Revision Cheat-Sheet`,
      subtitle: `${title} • Official NCERT Board Summary by Fukey Education Faculty`,
    });
  };

  return (
    <section className="py-20 bg-white" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3" data-aos="fade-up">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-icon-sparkle" />
            <span>{t("hub.tag", "Interactive Knowledge Hub")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#050071] tracking-tight">
            {t("hub.title", "Test Your Board Exam Readiness in 60 Seconds")}
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            {t("hub.desc", "Try a real classroom concept quiz, download formula cheat-sheets, and experience our unique 45+15 teaching model.")}
          </p>
        </div>

        {/* 2-Column Interactive Workspace: Left = Live Quiz Widget, Right = 45+15 Model & Free Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Quiz Card */}
          <div
            className="lg:col-span-7 bg-gradient-to-br from-[#050071] to-[#1C1A4A] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6"
            data-aos="fade-right"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  {language === "hi" ? currentQ.classSubjectHi : currentQ.classSubjectEn}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-black text-indigo-200">
                  {t("hub.question", "Question")} {currentQuizIdx + 1} {t("hub.of", "of")} {quizQuestions.length}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                {language === "hi" ? currentQ.questionHi : currentQ.questionEn}
              </h3>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {(language === "hi" ? currentQ.optionsHi : currentQ.optionsEn).map((opt, idx) => {
                  const isCorrect = idx === currentQ.correctIndex;
                  const isSelected = selectedOption === idx;

                  let btnStyle = "bg-white/10 hover:bg-white/20 text-white border border-white/10";
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-500 text-white border-emerald-400 font-extrabold shadow-lg";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-600 text-white border-rose-500 font-bold";
                    } else {
                      btnStyle = "bg-white/5 text-white/50 border-white/5";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between transition-all hover:scale-101 active:scale-98 cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center text-xs font-black">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-white" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {isAnswered && (
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-indigo-100 space-y-1 animate-in fade-in zoom-in-95 duration-200">
                  <div className="font-extrabold text-amber-300 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{t("hub.explanation", "Faculty Explanation:")}</span>
                  </div>
                  <p>{language === "hi" ? currentQ.explanationHi : currentQ.explanationEn}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between">
              <div className="text-xs text-indigo-200">
                {t("hub.score", "Score:")} <strong className="text-amber-300 font-black">{score}</strong> / {quizQuestions.length}
              </div>

              <button
                onClick={handleNextQuiz}
                className="px-5 py-2.5 rounded-xl bg-[#FF2424] hover:bg-red-700 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>
                  {currentQuizIdx === quizQuestions.length - 1
                    ? t("hub.restart", "Restart Quiz")
                    : t("hub.next", "Next Question")}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: The 45+15 Methodology & Instant Formula Sheets */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between" data-aos="fade-left">
            {/* The 45+15 Model Card */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-[#050071] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 animate-icon-wiggle" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900">{t("hub.model_title", "The Signature 45+15 Learning Model")}</h4>
                  <p className="text-xs text-slate-500">{t("hub.model_sub", "Live digital tablet teaching vs recorded videos")}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
                  <div className="text-lg font-black text-[#5751E1]">{t("hub.lecture_time", "45 Mins")}</div>
                  <div className="font-bold text-slate-800 mt-0.5">{t("hub.lecture_title", "Live Interactive Lecture")}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{t("hub.lecture_desc", "Pen-tablet step-by-step whiteboard derivations.")}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
                  <div className="text-lg font-black text-emerald-600">{t("hub.doubt_time", "15 Mins")}</div>
                  <div className="font-bold text-slate-800 mt-0.5">{t("hub.doubt_title", "1-on-1 Doubt Solving")}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{t("hub.doubt_desc", "Live voice question asking before closing the room.")}</div>
                </div>
              </div>
            </div>

            {/* Instant Free Notes Download */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50/80 rounded-3xl p-6 border border-indigo-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-100/80 px-2 py-0.5 rounded-full">
                    {t("hub.notes_tag", "Free Board Resources")}
                  </span>
                  <h4 className="text-base font-black text-slate-900 mt-1">
                    {t("hub.notes_title", "Download NCERT Formula Cheat-Sheets")}
                  </h4>
                </div>
                <BookOpen className="w-7 h-7 text-[#050071] animate-icon-float" />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {t("hub.notes_desc", "Handwritten 2-page formula summaries for Class 10th Maths, Class 12th Physics & Chemistry by Bhopal subject specialists.")}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => handleDownloadHandbook("Class 10th Maths All Formulas PDF")}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-indigo-50 text-[#050071] border border-indigo-200 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-600" />
                  <span>10th Maths Formulas</span>
                </button>

                <button
                  onClick={() => handleDownloadHandbook("Class 12th Physics Derivations PDF")}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-indigo-50 text-[#050071] border border-indigo-200 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-600" />
                  <span>12th Physics Derivations</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
