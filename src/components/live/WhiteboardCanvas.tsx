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

type WhiteboardMsg =
  | { type: "stroke"; tool: "pen" | "highlighter" | "eraser"; color: string; size: number; points: [number, number][] }
  | { type: "clear" };

interface WhiteboardProps {
  isInstructor: boolean;
  roomId: string;
  sendData: (topic: string, payload: unknown) => void;
  onData: (topic: string, handler: (payload: unknown) => void) => () => void;
}

const BG_COLOR = "#0A0D1A";

export default function WhiteboardCanvas({ isInstructor, roomId, sendData, onData }: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<"pen" | "highlighter" | "eraser">("pen");
  const [color, setColor] = useState("#FFFFFF");
  const [brushSize, setBrushSize] = useState(3);
  const [hasContent, setHasContent] = useState(false);

  // Last point, normalized to a 0..1 fraction of canvas width/height so a segment drawn on one
  // participant's canvas replays correctly on another's, even if their canvases render at a
  // different pixel size.
  const lastPointRef = useRef<[number, number] | null>(null);

  const colors = [
    "#FFFFFF", // White
    "#FBBF24", // Yellow
    "#34D399", // Emerald Green
    "#60A5FA", // Light Blue
    "#F472B6", // Pink
    "#EF4444", // Red
  ];

  const paintIntro = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

    ctx.font = "bold 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#FBBF24";
    ctx.fillText("📌 LIVE CLASSROOM WHITEBOARD • CBSE & STATE BOARDS", 24, 36);

    ctx.font = "14px monospace";
    ctx.fillStyle = "#94A3B8";
    ctx.fillText("Quadratic Formula: x = [-b ± √(b² - 4ac)] / 2a", 24, 64);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 900;
    canvas.height = canvas.parentElement?.clientHeight || 600;

    paintIntro(ctx, canvas);
  }, []);

  const strokeSegment = (msg: Extract<WhiteboardMsg, { type: "stroke" }>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const [[x0f, y0f], [x1f, y1f]] = msg.points;
    const x0 = x0f * canvas.width;
    const y0 = y0f * canvas.height;
    const x1 = x1f * canvas.width;
    const y1 = y1f * canvas.height;

    if (msg.tool === "eraser") {
      ctx.strokeStyle = BG_COLOR;
      ctx.lineWidth = msg.size * 4;
      ctx.globalAlpha = 1.0;
    } else if (msg.tool === "highlighter") {
      ctx.strokeStyle = msg.color;
      ctx.lineWidth = msg.size * 3;
      ctx.globalAlpha = 0.35;
    } else {
      ctx.strokeStyle = msg.color;
      ctx.lineWidth = msg.size;
      ctx.globalAlpha = 1.0;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.globalAlpha = 1.0;
  };

  // Students render whatever the instructor broadcasts; the instructor's own strokes are already
  // drawn locally as they're made, so the instructor doesn't also apply its own broadcast.
  useEffect(() => {
    if (isInstructor) return;

    return onData("whiteboard", (payload) => {
      const msg = payload as WhiteboardMsg;
      if (msg.type === "clear") {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) paintIntro(ctx, canvas);
        setHasContent(false);
      } else if (msg.type === "stroke") {
        strokeSegment(msg);
        setHasContent(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInstructor, onData]);

  const pointFromEvent = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): [number, number] | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return [(clientX - rect.left) / canvas.width, (clientY - rect.top) / canvas.height];
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isInstructor) return; // Only instructor has edit control
    setIsDrawing(true);
    setHasContent(true);
    lastPointRef.current = pointFromEvent(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isInstructor) return;
    const point = pointFromEvent(e);
    if (!point || !lastPointRef.current) return;

    const msg: WhiteboardMsg = {
      type: "stroke",
      tool,
      color,
      size: brushSize,
      points: [lastPointRef.current, point],
    };
    strokeSegment(msg);
    sendData("whiteboard", msg);
    lastPointRef.current = point;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPointRef.current = null;
  };

  const handleClear = () => {
    if (!isInstructor) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    sendData("whiteboard", { type: "clear" } as WhiteboardMsg);
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
