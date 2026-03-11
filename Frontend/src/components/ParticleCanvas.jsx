import { useEffect, useRef } from "react";

export default function ParticleCanvas({ isNight }) {
  const ref = useRef();

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");

    let W, H, animId;
    const pts = [];

    const resize = () => {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // 🎨 Color palettes
    const nightColors = [
      [91, 141, 238],
      [168, 85, 247],
      [52, 211, 153],
      [250, 204, 21],
      [125, 211, 252],
    ];

    const dayColors = [
      [0, 150, 255],
      [0, 200, 180],
      [120, 100, 255],
      [255, 150, 50],
      [255, 90, 150],
    ];

    const palette = isNight ? nightColors : dayColors;

    // ⭐ Create particles
    for (let i = 0; i < 110; i++) {
      const color = palette[Math.floor(Math.random() * palette.length)];

      pts.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,  // slightly stronger velocity
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.6,
        p: Math.random() * Math.PI * 2,
        color,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      pts.forEach((p, i) => {
        p.p += 0.01;

        // ✨ Continuous movement (no damping)
        p.x += p.vx;
        p.y += p.vy;

        // Bounce edges
        if (p.x <= 0 || p.x >= W) p.vx *= -1;
        if (p.y <= 0 || p.y >= H) p.vy *= -1;

        const alpha = 0.45 + 0.25 * Math.sin(p.p);
        const size = p.r * p.z;
        const [r, g, b] = p.color;

        ctx.shadowColor = `rgba(${r},${g},${b},0.7)`;
        ctx.shadowBlur = 8 * p.z;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();

        ctx.shadowBlur = 0;

        // ⭐ Constellation Lines
        pts.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 160;

          if (d < maxDist) {
            const opacity = 0.2 * (1 - d / maxDist);

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [isNight]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.95,
      }}
    />
  );
}