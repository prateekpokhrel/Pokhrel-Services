import { useEffect, useRef, useState } from "react";

export default function CursorGlow({ isNight }) {
  const ref = useRef();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // ❌ Disable on mobile / touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setVisible(false);
      return;
    }

    const el = ref.current;

    const move = (e) => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!visible) return null;

  // 🌗 Sync with theme
  const glowColor = isNight
    ? "rgba(91,141,238,0.06)"   // soft blue at night
    : "rgba(60,200,255,0.05)";  // soft cyan in day ""

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        width: 120,          // smaller
        height: 120,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9997,
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.4s ease",

        // 🌫 Smooth fade edges
        background: `radial-gradient(
          circle,
          ${glowColor} 0%,
          ${glowColor.replace("0.06", "0.03")} 30%,
          transparent 75%
        )`,

        // 💓 Gentle pulse animation
        animation: "cursorPulse 4s ease-in-out infinite",
      }}
    />
  );
}