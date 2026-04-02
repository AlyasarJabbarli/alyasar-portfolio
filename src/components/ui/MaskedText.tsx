"use client";

import { motion } from "framer-motion";

interface MaskedTextProps {
  text: string;
  className?: string;
  delay?: number;
  highlightLastWord?: boolean; // New prop to restore your dual-colors
}

export default function MaskedText({ 
  text, 
  className = "", 
  delay = 0,
  highlightLastWord = false 
}: MaskedTextProps) {
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
      transition: { type: "spring" as const, damping: 12, stiffness: 100 },
    },
    hidden: {
      y: "200%",
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`flex flex-wrap gap-x-3 gap-y-1 ${className}`}
    >
      {words.map((word, index) => {
        // Check if this is the final word in the array and if the highlight prop is true
        const isLastWord = index === words.length - 1;
        const applyHighlight = highlightLastWord && isLastWord;

        return (
          <div key={index} className="overflow-hidden pb-2 pr-1">
            <motion.span 
              variants={child} 
              className={`inline-block ${applyHighlight ? "text-[var(--color-electric-cyan)]" : ""}`}
            >
              {word}
            </motion.span>
          </div>
        );
      })}
    </motion.div>
  );
}