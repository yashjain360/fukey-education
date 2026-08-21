"use client";

import React, { useEffect, useRef } from "react";
import { useFestivalTheme } from "./FestivalThemeContext";

export default function FestivalMouseTrail() {
  const { activeFestival, isTrailEnabled } = useFestivalTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isTrailEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let targetX = -1000;
    let targetY = -1000;

    interface MicroSparkle {
      x: number;
      y: number;
      size: number;
      alpha: number;
      color: string;
      decay: number;
    }

    let sparkles: MicroSparkle[] = [];
    let frameCount = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const colors = activeFestival.trailColors || ["#FF9933", "#138808", "#FFD700"];

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (mouseX === -1000) {
        mouseX = targetX;
        mouseY = targetY;
      }

      // Add only 1 subtle micro-sparkle occasionally
      frameCount++;
      if (frameCount % 3 === 0) {
        sparkles.push({
          x: targetX + (Math.random() - 0.5) * 6,
          y: targetY + (Math.random() - 0.5) * 6,
          size: Math.random() * 2 + 1, // tiny 1-3px micro-dot
          alpha: 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          decay: 0.04, // quick smooth fade
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth lerp cursor tracking
      mouseX += (targetX - mouseX) * 0.15;
      mouseY += (targetY - mouseY) * 0.15;

      // 1. Ultra-subtle ambient spotlight glow around cursor (low opacity, purely ambient)
      if (mouseX > 0 && mouseY > 0) {
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 160);
        gradient.addColorStop(0, "rgba(255, 153, 51, 0.05)"); // Saffron whisper
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.03)");
        gradient.addColorStop(1, "rgba(19, 136, 8, 0)"); // Fade to transparent

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 160, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render delicate micro-sparkles
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          i--;
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeFestival, isTrailEnabled]);

  if (!isTrailEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99998]"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
