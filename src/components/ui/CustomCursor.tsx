"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [pointerFine, setPointerFine] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setPointerFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const showCustomCursor =
    mounted && pointerFine && prefersReducedMotion !== true;

  // Motion values bypass the React render cycle for performance
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Apply physics to the cursor movement (adds a slight "drag" effect)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!showCustomCursor) return;
    const moveCursor = (e: MouseEvent) => {
      // Offset by 16px to center the 32x32px cursor on the actual pointer
      cursorX.set(e.clientX - 16); 
      cursorY.set(e.clientY - 16);
      
      // Detect if the user is hovering over interactive elements
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, [data-interactive]")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY, showCustomCursor]);

  useEffect(() => {
    if (!showCustomCursor) return;
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [showCustomCursor]);

  if (!showCustomCursor) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[var(--color-electric-cyan)] pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? "rgba(0, 240, 255, 0.1)" : "rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Inner targeting dot */}
      <motion.div 
        className="w-1 h-1 bg-[var(--color-electric-cyan)] rounded-full"
        animate={{
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}