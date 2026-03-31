"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-obsidian text-snow">
      {/* Neural Background Effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-electricCyan/20 rounded-full blur-[120px] animate-neural-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <motion.div style={{ y, opacity }} className="z-10 text-center px-4">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-electricCyan font-mono tracking-widest text-sm mb-4 block"
        >
          &lt;SOFTWARE ENGINEER / DATA SCIENTIST /&gt;
        </motion.span>
        
        <motion.h1 
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Alyasar Jabbarli [cite: 1]
        </motion.h1>

        <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed">
          Currently architecting modular ecosystems at **Inci Group** [cite: 18] and 
          pursuing a **Master of Data Science** at **ELTE**[cite: 54, 55]. 
          Focused on high-performance, type-safe full-stack applications[cite: 6, 7].
        </p>

        <div className="mt-10 flex gap-4 justify-center">
          <button className="px-8 py-3 bg-electricCyan text-obsidian font-bold rounded-full hover:scale-105 transition-transform">
            View Research
          </button>
          <button className="px-8 py-3 border border-snow/20 rounded-full hover:bg-snow/10 transition-colors">
            Contact Me
          </button>
        </div>
      </motion.div>
    </section>
  );
}