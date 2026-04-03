"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  overlay?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.3,
  overlay = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}px`, `${speed * 100}px`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-[-15%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </motion.div>
      {overlay && (
        <div className="absolute inset-0 bg-dark/40" />
      )}
    </div>
  );
}
