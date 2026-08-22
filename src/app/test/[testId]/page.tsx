"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Maximize,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  Sparkles,
  Award,
  RefreshCw,
  Eye,
  Check,
  ChevronRight,
  BookOpen,
  FileText,
  Calculator,
  Eraser,
  Copy,
  X
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { triggerConfetti } from "@/lib/confetti";

interface Question {
  id: number;
  section: string;
  marks: number;
  negativeMarks: number;
  statement: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  ncertRef: string;
}

interface TestData {
  id: string;
  title: string;
  class: string;
  subject: string;
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  instructions: string[];
  questions: Question[];
}

export default function SecureTestRoomPage() {
  const params = useParams();
  const testId = (params?.testId as string) || "test-maths-10-quadratics";
  const { user } = useAuth();
  const router = useRouter();

  // Test Lifecycle: "instructions" | "active" | "submitting" | "scorecard"
  const [stage, setStage] = useState<"instructions" | "active" | "submitting" | "scorecard">("instructions");
  const [testData, setTestData] = useState<TestData | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  // Candidate Response State
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Record<number, boolean>>({ 1: true });

  // Rough Notepad State
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const [notepadText, setNotepadText] = useState("");
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);

  // Load saved notepad from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`fukey_notepad_${testId}`);
      if (saved) setNotepadText(saved);
    } catch (e) {}
  }, [testId]);

  const handleUpdateNotepad = (text: string) => {
    setNotepadText(text);
    try {
      localStorage.setItem(`fukey_notepad_${testId}`, text);
    } catch (e) {}
  };

  const handleInsertMathSymbol = (sym: string) => {
    handleUpdateNotepad(notepadText + sym);
  };

  // Security Engine State
  const [securityStrikes, setSecurityStrikes] = useState(0);
  const [securityWarningOpen, setSecurityWarningOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Timer State
  const [secondsRemaining, setSecondsRemaining] = useState(45 * 60);

  // Post Submission Result State
  const [result, setResult] = useState<any>(null);

  // Fetch Test Data
  useEffect(() => {
    fetch(`/api/tests/${testId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.test) {
          setTestData(data.test);
          setSecondsRemaining(data.test.durationMinutes * 60);
        }
      })
      .catch(() => {});
  }, [testId]);

  // Anti-Cheating Event Listeners (Tab Switch & Clipboard Lock)
  useEffect(() => {
    if (stage !== "active") return;

    // 1. Tab-Switch / Window Blur Detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        recordSecurityViolation("Tab switch or browser window blur detected!");
      }
    };

    const handleWindowBlur = () => {
      recordSecurityViolation("Window focus lost! Please remain on the examination window.");
    };

    // 2. Clipboard & Right-Click Disabler
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      recordSecurityViolation("Copying test content is strictly prohibited.");
    };
    const handlePaste = (e: ClipboardEvent) => e.preventDefault();
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    // 3. DevTools / Inspection Key Interception
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.metaKey && e.altKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "u") ||
        (e.metaKey && e.key === "u")
      ) {
        e.preventDefault();
        recordSecurityViolation("Developer Inspection tools are disabled during assessment.");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    // Timer Countdown
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest("Time Expired");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(timer);
    };
  }, [stage, securityStrikes]);

  const recordSecurityViolation = (reason: string) => {
    setSecurityStrikes((prev) => {
      const updated = prev + 1;
      setWarningMessage(reason);
      setSecurityWarningOpen(true);
      if (updated >= 3) {
        // Auto submit test on 3 strikes
        handleSubmitTest("3 Security Strikes Reached");
      }
      return updated;
    });
  };

  const handleStartExam = () => {
    // Attempt fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    }
    setStage("active");
  };

  const handleSelectOption = (qId: number, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleClearResponse = (qId: number) => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const handleToggleReview = (qId: number) => {
    setMarkedForReview((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleNavigateQuestion = (idx: number) => {
    if (!testData) return;
    setCurrentQIndex(idx);
    const targetQId = testData.questions[idx].id;
    setVisitedQuestions((prev) => ({ ...prev, [targetQId]: true }));
  };

  const handleSubmitTest = async (triggerReason = "Manual Candidate Submission") => {
    if (!testData) return;
    setStage("submitting");

    try {
      const res = await fetch("/api/tests/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testId: testData.id,
          studentName: user?.name || "Mayank Dubey",
          studentEmail: user?.email || "mayank@fukeyeducation.com",
          answers,
          securityStrikes,
          timeTakenSeconds: testData.durationMinutes * 60 - secondsRemaining,
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setResult(data.result);
        setStage("scorecard");
        triggerConfetti();
      }
    } catch (e) {
      setStage("scorecard");
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!testData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center space-y-4">
        <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
        <h2 className="text-lg font-bold text-slate-800">Initializing Secure Testing Environment...</h2>
      </div>
    );
  }

  const currentQ = testData.questions[currentQIndex];

  // 1. INSTRUCTIONS STAGE
  if (stage === "instructions") {
    return (
      <div className="bg-slate-50 min-h-screen py-10 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-2xl space-y-6 animate-in fade-in">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase">
                Anti-Cheating Verified
              </span>
              <h1 className="text-xl font-black text-slate-900">{testData.title}</h1>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold">
            <div className="p-3 rounded-2xl bg-slate-50">
              <div className="text-slate-900 font-black">{testData.durationMinutes} Minutes</div>
              <div className="text-[10px] text-slate-400">Total Duration</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50">
              <div className="text-slate-900 font-black">{testData.totalQuestions} Questions</div>
              <div className="text-[10px] text-slate-400">Total Items</div>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800">
              <div className="font-black">{testData.totalMarks} Marks</div>
              <div className="text-[10px]">Maximum Marks</div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <h3 className="font-black text-slate-800 uppercase tracking-wider text-[11px]">
              Strict Candidate Examination Instructions:
            </h3>
            <ul className="space-y-1.5 text-slate-600">
              {testData.instructions.map((inst, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Security Protocol Notice:</strong> Clicking &ldquo;Enter Fullscreen &amp; Start Exam&rdquo; activates the anti-cheating monitor. Navigating away, switching tabs, or pressing inspection keys will log security strikes.
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Link
              href="/test-series"
              className="px-5 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 text-xs"
            >
              Cancel
            </Link>
            <button
              onClick={handleStartExam}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#050071] via-[#5751E1] to-[#FF2424] hover:brightness-110 text-white font-extrabold text-xs shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Maximize className="w-4 h-4" />
              <span>Enter Fullscreen &amp; Start Exam</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Derive live score metrics directly from candidate answers
  const clientMetrics = useMemo(() => {
    if (!testData?.questions) {
      return { totalScore: 0, maxScore: 20, percentage: 0, accuracy: 0, percentile: 75, correctCount: 0, incorrectCount: 0, skippedCount: 0 };
    }
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    let rawScore = 0;

    testData.questions.forEach((q) => {
      const chosen = answers[q.id];
      if (chosen === undefined || chosen === null) {
        skipped += 1;
      } else if (chosen === q.correctAnswer) {
        correct += 1;
        rawScore += (q.marks || 4);
      } else {
        incorrect += 1;
        rawScore -= (q.negativeMarks || 1);
      }
    });

    const maxScore = testData.questions.reduce((acc, q) => acc + (q.marks || 4), 0) || 20;
    const finalScore = Math.max(0, rawScore);
    const percentage = Math.round((finalScore / maxScore) * 100);
    const accuracy = (correct + incorrect) > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0;
    const percentile = Math.min(99.4, 75 + Math.round(percentage * 0.24));

    return {
      totalScore: finalScore,
      rawScore,
      maxScore,
      percentage,
      accuracy,
      percentile,
      correctCount: correct,
      incorrectCount: incorrect,
      skippedCount: skipped
    };
  }, [testData, answers]);

  // 2. SCORECARD & SOLUTION ANALYSIS STAGE
  if (stage === "scorecard") {
    const displayScore = result?.totalScore ?? clientMetrics.totalScore;
    const displayMax = result?.maxScore ?? clientMetrics.maxScore;
    const displayPercentage = result?.percentage ?? clientMetrics.percentage;
    const displayPercentile = result?.percentile ?? clientMetrics.percentile;
    const displayAccuracy = result?.accuracy ?? clientMetrics.accuracy;

    return (
      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 space-y-8 animate-in fade-in">
          {/* Header Banner */}
          <div className="bg-[#050071] text-white p-8 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase border border-emerald-400/30 flex items-center gap-1">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Official Assessment Scorecard</span>
              </span>
              <span className="text-xs text-indigo-200">Candidate: {user?.name || "Mayank Dubey"}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black">{testData.title}</h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-indigo-900">
              <div className="p-3 rounded-2xl bg-white/10 text-center">
                <div className="text-2xl font-black text-amber-300">{displayScore} / {displayMax}</div>
                <div className="text-[10px] text-slate-300 uppercase font-bold">Total Score</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 text-center">
                <div className="text-2xl font-black text-emerald-300">{displayPercentage}%</div>
                <div className="text-[10px] text-slate-300 uppercase font-bold">Percentage</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 text-center">
                <div className="text-2xl font-black text-sky-300">{displayPercentile}th</div>
                <div className="text-[10px] text-slate-300 uppercase font-bold">State Percentile</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 text-center">
                <div className="text-2xl font-black text-purple-300">{displayAccuracy}%</div>
                <div className="text-[10px] text-slate-300 uppercase font-bold">Accuracy Rate</div>
              </div>
            </div>
          </div>

          {/* Detailed Question Explanations & NCERT Citations */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Step-by-Step Question Derivations &amp; Solutions</h2>
              <p className="text-xs text-slate-500">Verified by Fukey Education senior faculty leads with NCERT chapter mappings.</p>
            </div>

            <div className="space-y-6">
              {testData.questions.map((q) => {
                const candidateChoice = answers[q.id];
                const isCorrect = candidateChoice === q.correctAnswer;
                const isSkipped = candidateChoice === undefined;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isCorrect
                        ? "border-emerald-200 bg-emerald-50/30"
                        : isSkipped
                        ? "border-slate-200 bg-slate-50/50"
                        : "border-rose-200 bg-rose-50/30"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-slate-700">Question {q.id}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                          isCorrect
                            ? "bg-emerald-100 text-emerald-800"
                            : isSkipped
                            ? "bg-slate-200 text-slate-700"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {isCorrect ? "✓ Correct (+4)" : isSkipped ? "⚪ Skipped (0)" : "✗ Incorrect (-1)"}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-900">{q.statement}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl border text-xs font-semibold ${
                            oIdx === q.correctAnswer
                              ? "bg-emerald-100/80 border-emerald-400 text-emerald-950 font-bold"
                              : candidateChoice === oIdx
                              ? "bg-rose-100/80 border-rose-400 text-rose-950"
                              : "bg-white border-slate-200 text-slate-600"
                          }`}
                        >
                          {opt} {oIdx === q.correctAnswer && " (Correct Answer)"}
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-100 text-xs text-indigo-950 space-y-1">
                      <div><strong>Faculty Derivation:</strong> {q.explanation}</div>
                      <div className="text-[11px] text-indigo-700 font-semibold">📖 {q.ncertRef}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Link
                href="/test-series"
                className="px-6 py-3 rounded-xl bg-[#050071] hover:bg-[#5751E1] text-white font-bold text-xs shadow-md transition-all hover:scale-105"
              >
                Back to Test Series
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. ACTIVE SECURE EXAMINATION STAGE
  return (
    <div className="bg-slate-950 min-h-screen text-white flex flex-col justify-between select-none">
      {/* Top Test Header Bar */}
      <header className="bg-slate-900 border-b border-indigo-950 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h1 className="text-sm sm:text-base font-black text-white">{testData.title}</h1>
          </div>
          <p className="text-[11px] text-indigo-300">
            Candidate: <strong>{user?.name || "Mayank Dubey"}</strong> • Section: {currentQ.section}
          </p>
        </div>

        {/* Security Guard & Tools */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={() => setIsNotepadOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold border border-indigo-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
            title="Open Rough Notepad"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Rough Notepad</span>
          </button>

          <button
            onClick={() => setIsFormulaModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
            title="View Formulas & Constants"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Formula Sheet</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-extrabold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{securityStrikes} Strikes</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono font-black text-xs shadow-md">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => handleSubmitTest("Candidate Finish Button")}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-extrabold text-xs shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            Submit Test
          </button>
        </div>
      </header>

      {/* Main Examination Workspace */}
      <main className="flex-1 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto w-full">
        {/* Left/Center Stage: Question Statement & Options */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-indigo-900 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="px-3 py-1 rounded-full bg-[#5751E1] text-white font-black text-xs uppercase">
                Question {currentQ.id} of {testData.totalQuestions}
              </span>
              <div className="text-xs font-bold text-slate-400 flex items-center gap-3">
                <span className="text-emerald-400">+{currentQ.marks} Marks</span>
                <span className="text-rose-400">-{currentQ.negativeMarks} Negative</span>
              </div>
            </div>

            <div className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed pt-2">
              {currentQ.statement}
            </div>

            {/* Radio Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = answers[currentQ.id] === optIdx;

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? "bg-indigo-900/60 border-indigo-400 text-white font-bold shadow-md scale-[1.01]"
                        : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? "border-indigo-400 bg-indigo-500" : "border-slate-500"
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm">{opt}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleReview(currentQ.id)}
                className={`px-4 py-2.5 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  markedForReview[currentQ.id]
                    ? "bg-purple-600 text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{markedForReview[currentQ.id] ? "Marked for Review" : "Mark for Review"}</span>
              </button>

              <button
                onClick={() => handleClearResponse(currentQ.id)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-bold transition-colors cursor-pointer"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentQIndex === 0}
                onClick={() => handleNavigateQuestion(currentQIndex - 1)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                disabled={currentQIndex === testData.questions.length - 1}
                onClick={() => handleNavigateQuestion(currentQIndex + 1)}
                className="px-6 py-2.5 rounded-xl bg-[#5751E1] hover:bg-indigo-600 text-white font-black transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Save &amp; Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Stage: Question Palette Grid */}
        <div className="lg:col-span-4 bg-slate-900 rounded-3xl p-6 border border-indigo-900 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-200 border-b border-white/10 pb-3">
              Question Navigation Palette
            </h3>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-md bg-emerald-500" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-md bg-rose-500" />
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-md bg-purple-600" />
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-md bg-slate-700" />
                <span>Not Visited</span>
              </div>
            </div>

            {/* Palette Buttons */}
            <div className="grid grid-cols-5 gap-2.5 pt-2">
              {testData.questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isMarked = markedForReview[q.id];
                const isVisited = visitedQuestions[q.id];
                const isCurrent = currentQIndex === idx;

                let btnBg = "bg-slate-800 text-slate-400";
                if (isMarked) {
                  btnBg = "bg-purple-600 text-white";
                } else if (isAnswered) {
                  btnBg = "bg-emerald-500 text-white";
                } else if (isVisited) {
                  btnBg = "bg-rose-500 text-white";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => handleNavigateQuestion(idx)}
                    className={`h-11 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center relative ${btnBg} ${
                      isCurrent ? "ring-2 ring-white scale-110 shadow-lg" : "hover:scale-105"
                    }`}
                  >
                    <span>{q.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => handleSubmitTest("Candidate Submit")}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-black text-xs shadow-lg transition-all hover:scale-102 active:scale-95 cursor-pointer"
            >
              Submit &amp; View Solution Scorecard
            </button>
          </div>
        </div>
      </main>

      {/* ROUGH NOTEPAD FLOATING DRAWER */}
      {isNotepadOpen && (
        <div className="fixed bottom-6 right-6 z-[9990] w-full max-w-md bg-slate-900 border border-indigo-500/40 rounded-3xl shadow-2xl p-5 text-white space-y-3 animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <h3 className="font-extrabold text-xs text-white">Rough Scratchpad &amp; Calculations</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleUpdateNotepad("")}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-slate-300 hover:text-rose-300 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                title="Clear Notes"
              >
                <Eraser className="w-3 h-3" />
                <span>Clear</span>
              </button>
              <button
                onClick={() => setIsNotepadOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Math Symbols Insert */}
          <div className="flex flex-wrap items-center gap-1 text-[11px] font-mono">
            {["x²", "√x", "π", "θ", "Δ", "α", "β", "±", "×", "÷", "≠", "≤", "≥", "∞"].map((sym) => (
              <button
                key={sym}
                onClick={() => handleInsertMathSymbol(` ${sym} `)}
                className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-indigo-600 text-indigo-200 hover:text-white font-bold transition-all cursor-pointer"
              >
                {sym}
              </button>
            ))}
          </div>

          <textarea
            rows={7}
            value={notepadText}
            onChange={(e) => handleUpdateNotepad(e.target.value)}
            placeholder="Type rough step-by-step math derivations, formulas, or notes here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
          />

          <div className="flex justify-between items-center text-[10px] text-slate-400">
            <span>● Automatically saved locally</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(notepadText);
                alert("Notes copied to clipboard!");
              }}
              className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>Copy Notes</span>
            </button>
          </div>
        </div>
      )}

      {/* FORMULA SHEET REFERENCE MODAL */}
      {isFormulaModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <h3 className="font-black text-base text-slate-900">Standard Board Exam Formula Sheet</h3>
              </div>
              <button
                onClick={() => setIsFormulaModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Mathematics Section */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
                <h4 className="font-black text-indigo-900 text-xs uppercase tracking-wider">Mathematics Core Formulas:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-800">
                  <div className="p-2 rounded-xl bg-white border border-indigo-100">
                    <strong>Quadratic Roots:</strong><br />
                    x = [-b ± √(b² - 4ac)] / 2a
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-indigo-100">
                    <strong>Discriminant:</strong><br />
                    D = b² - 4ac (D &gt; 0 real, D &lt; 0 imaginary)
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-indigo-100">
                    <strong>AP nth Term:</strong><br />
                    aₙ = a + (n - 1)d
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-indigo-100">
                    <strong>AP Sum:</strong><br />
                    Sₙ = (n/2)[2a + (n - 1)d]
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-indigo-100">
                    <strong>Trigonometric Identity:</strong><br />
                    sin²θ + cos²θ = 1 | 1 + tan²θ = sec²θ
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-indigo-100">
                    <strong>Coordinate Distance:</strong><br />
                    d = √[(x₂ - x₁)² + (y₂ - y₁)²]
                  </div>
                </div>
              </div>

              {/* Science & Physics Section */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-2">
                <h4 className="font-black text-amber-900 text-xs uppercase tracking-wider">Science / Physics Core Relations:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-800">
                  <div className="p-2 rounded-xl bg-white border border-amber-100">
                    <strong>Ohm&apos;s Law:</strong><br />
                    V = I · R | P = V · I = I²R
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-amber-100">
                    <strong>Mirror Formula:</strong><br />
                    1/f = 1/v + 1/u
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-amber-100">
                    <strong>Lens Formula:</strong><br />
                    1/f = 1/v - 1/u
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-amber-100">
                    <strong>Magnification:</strong><br />
                    m = -v/u (mirror) | m = +v/u (lens)
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end border-t border-slate-100">
              <button
                onClick={() => setIsFormulaModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#050071] text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Close Reference
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECURITY WARNING ALERT MODAL */}
      {securityWarningOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border-4 border-rose-500 space-y-4 animate-in zoom-in-95 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 animate-bounce" />
            </div>

            <div className="space-y-1">
              <span className="px-3 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-black uppercase">
                Strike {securityStrikes} of 3 Recorded
              </span>
              <h3 className="text-xl font-black text-slate-900">Anti-Cheating Security Alert</h3>
              <p className="text-xs text-slate-600">{warningMessage}</p>
            </div>

            <p className="text-[11px] text-rose-600 font-bold bg-rose-50 p-2.5 rounded-xl">
              Warning: If you reach 3 security strikes, your examination will be terminated and submitted immediately.
            </p>

            <button
              onClick={() => setSecurityWarningOpen(false)}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-md transition-all hover:scale-105"
            >
              I Understand &amp; Return to Exam
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
