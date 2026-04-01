"use client";

import { motion } from "framer-motion";

interface MaskedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function MaskedText({ text, className = "", delay = 0 }: MaskedTextProps) {
  // Split the text into an array of words
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      y: "200%", // Starts pushed down outside the clipping mask
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}
    >
      {words.map((word, index) => (
        <div key={index} className="overflow-hidden pb-2">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}