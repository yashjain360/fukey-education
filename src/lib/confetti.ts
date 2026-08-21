import confetti from "canvas-confetti";

export function triggerConfetti() {
  if (typeof window === "undefined") return;

  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 45,
    spread: 360,
    ticks: 80,
    zIndex: 99999,
    colors: ["#FF9933", "#FFFFFF", "#138808", "#5751E1", "#FF2424", "#FFD700"],
  };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  // Multi-angle full screen cannon blasts
  // 1. Left Cannon blasting across the screen
  confetti({
    ...defaults,
    particleCount: 80,
    angle: 60,
    spread: 70,
    origin: { x: 0, y: 0.8 },
  });

  // 2. Right Cannon blasting across the screen
  confetti({
    ...defaults,
    particleCount: 80,
    angle: 120,
    spread: 70,
    origin: { x: 1, y: 0.8 },
  });

  // 3. Top / Center Burst
  confetti({
    ...defaults,
    particleCount: 100,
    spread: 120,
    origin: { x: 0.5, y: 0.4 },
  });

  // Continuous rain shower across entire screen width
  const interval: any = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);

    // Blast from random positions across left and right edges
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 200);
}
