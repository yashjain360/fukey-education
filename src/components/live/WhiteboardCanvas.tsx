"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Pen,
  Eraser,
  RotateCcw,
  Download,
  Palette,
  Square,
  Minus,
  Sparkles,
  Maximize2
} from "lucide-react";
import { triggerConfetti } from "@/lib/confetti";

interface WhiteboardProps {
  isInstructor: boolean;
  roomId: string;
}

export default function WhiteboardCanvas({ isInstructor, roomId }: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<"pen" | "highlighter" | "eraser">("pen");
  const [color, setColor] = useState("#FFFFFF");
  const [brushSize, setBrushSize] = useState(3);
  const [hasContent, setHasContent] = useState(false);

  const colors = [
    "#FFFFFF", // White
    "#FBBF24", // Yellow
    "#34D399", // Emerald Green
    "#60A5FA", // Light Blue
    "#F472B6", // Pink
    "#EF4444", // Red
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.parentElement?.clientWidth || 900;
    canvas.height = canvas.parentElement?.clientHeight || 600;

    // Fill slate background
    ctx.fillStyle = "#0A0D1A";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw subtle coordinate grid for math derivations
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Default instructor welcome equation
    ctx.font = "bold 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#FBBF24";
    ctx.fillText("📌 LIVE CLASSROOM WHITEBOARD • CBSE & STATE BOARDS", 24, 36);

    ctx.font = "14px monospace";
    ctx.fillStyle = "#94A3B8";
    ctx.fillText("Quadratic Formula: x = [-b ± √(b² - 4ac)] / 2a", 24, 64);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isInstructor) return; // Only instructor has edit control
    setIsDrawing(true);
    setHasContent(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isInstructor) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    if (tool === "eraser") {
      ctx.strokeStyle = "#0A0D1A";
      ctx.lineWidth = brushSize * 4;
      ctx.globalAlpha = 1.0;
    } else if (tool === "highlighter") {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize * 3;
      ctx.globalAlpha = 0.35;
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.globalAlpha = 1.0;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    if (!isInstructor) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0A0D1A";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `fukey_whiteboard_notes_${Date.now()}.png`;
    a.click();
    triggerConfetti();
  };

  return (
    <div className="relative w-full h-full min-h-[460px] bg-[#0A0D1A] rounded-3xl overflow-hidden border border-indigo-900/60 shadow-2xl flex flex-col justify-between">
      {/* Top Floating Whiteboard Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-slate-900/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-white text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-extrabold tracking-wide uppercase text-[11px] text-amber-300">
            Pen-Tablet Digital Board
          </span>
          {!isInstructor && (
            <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-slate-300">
              Student View
            </span>
          )}
        </div>

        {/* Instructor Controls */}
        {isInstructor ? (
          <div className="flex items-center gap-3">
            {/* Tool Selection */}
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setTool("pen")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  tool === "pen" ? "bg-[#5751E1] text-white font-bold" : "text-slate-300 hover:bg-white/10"
                }`}
                title="Pen"
              >
                <Pen className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setTool("highlighter")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  tool === "highlighter" ? "bg-amber-500 text-white font-bold" : "text-slate-300 hover:bg-white/10"
                }`}
                title="Highlighter"
              >
                <Sparkles className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setTool("eraser")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  tool === "eraser" ? "bg-rose-600 text-white font-bold" : "text-slate-300 hover:bg-white/10"
                }`}
                title="Eraser"
              >
                <Eraser className="w-4 h-4" />
              </button>
            </div>

            {/* Color Palette */}
            <div className="flex items-center gap-1.5">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setColor(c);
                    if (tool === "eraser") setTool("pen");
                  }}
                  style={{ backgroundColor: c }}
                  className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                    color === c && tool !== "eraser" ? "scale-125 ring-2 ring-white shadow-md" : "hover:scale-110"
                  }`}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>

            {/* Clear Board */}
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-600/60 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Clear Canvas"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        ) : null}

        {/* Download Snapshot (Students & Instructors) */}
        <button
          type="button"
          onClick={handleExportPNG}
          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Save handwritten notes as PNG"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Save Notes</span>
        </button>
      </div>

      {/* HTML5 Canvas Surface */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full h-full flex-1 cursor-crosshair touch-none"
      />
    </div>
  );
}
