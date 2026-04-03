"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export default function AnimatedText({
  text,
  className = "",
  tag: Tag = "h2",
  delay = 0,
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: delay + i * 0.04,
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
