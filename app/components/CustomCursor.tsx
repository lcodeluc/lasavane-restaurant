"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover"
      ) {
        setIsHovering(true);
      }
    };

    const handleOut = () => setIsHovering(false);
    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-gold"
        style={{ width: 8, height: 8, x: position.x - 4, y: position.y - 4 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-gold"
        style={{ x: position.x - 20, y: position.y - 20 }}
        animate={{
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          x: position.x - (isHovering ? 30 : 20),
          y: position.y - (isHovering ? 30 : 20),
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}
