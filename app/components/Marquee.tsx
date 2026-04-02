"use client";

import { motion } from "framer-motion";

const items = [
  "Cuisine française",
  "Influences créoles",
  "Vue sur la baie",
  "Deshaies, Guadeloupe",
  "Brunch dominical",
  "Expérience sur-mesure",
];

export default function Marquee() {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-dark/10 bg-cream py-4">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="label mx-6 text-dark/60">
            {item} <span className="mx-4 text-gold">&#x2726;</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
