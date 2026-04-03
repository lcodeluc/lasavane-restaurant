"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Gold line reveal at the top */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-gold"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: [0, 1, 0], transformOrigin: ["left", "left", "right"] }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
