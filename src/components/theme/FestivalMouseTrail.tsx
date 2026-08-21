"use client";

import React, { useEffect, useRef } from "react";
import { useFestivalTheme } from "./FestivalThemeContext";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  shape: "circle" | "star";
}

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
    let particles: Particle[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const colors = activeFestival.trailColors || ["#FF9933", "#FFFFFF", "#138808"];

    const addParticle = (x: number, y: number) => {
      for (let i = 0; i < 3; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = Math.random() > 0.6 ? "star" : "circle";
        particles.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          size: Math.random() * 5 + 3,
          color,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 0.5,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
          shape,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      addParticle(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        addParticle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          i--;
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw sparkling star
          ctx.beginPath();
          const spikes = 4;
          const outerRadius = p.size * 1.4;
          const innerRadius = p.size * 0.5;
          let rot = (Math.PI / 2) * 3;
          let x = p.x;
          let y = p.y;
          const step = Math.PI / spikes;

          ctx.moveTo(p.x, p.y - outerRadius);
          for (let s = 0; s < spikes; s++) {
            x = p.x + Math.cos(rot) * outerRadius;
            y = p.y + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = p.x + Math.cos(rot) * innerRadius;
            y = p.y + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
          }
          ctx.lineTo(p.x, p.y - outerRadius);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
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
