"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function NeuralHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll for parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Neural Background Orbs */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[var(--color-electric-cyan)]/10 rounded-full blur-[120px] animate-neural-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-blue-600/10 rounded-full blur-[100px]" style={{ animationDelay: "2s" }} />
      </div>

      <motion.div 
        style={{ y, opacity }} 
        className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-[var(--color-electric-cyan)]/30 bg-[var(--color-electric-cyan)]/5 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-electric-cyan)] animate-pulse" />
          <span className="text-[var(--color-electric-cyan)] font-mono text-xs tracking-wider">
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-[var(--color-snow)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Alyasar Jabbarli
        </motion.h1>

        <motion.p 
          className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Software Engineer & Data Scientist architecting modular ecosystems at <strong className="text-[var(--color-snow)] font-medium">Inci Group</strong> and pursuing a Master's at <strong className="text-[var(--color-snow)] font-medium">ELTE</strong>. Focused on high-performance, type-safe full-stack applications.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a 
            href="#projects"
            data-interactive="true"
            className="px-8 py-3 bg-[var(--color-electric-cyan)] text-[var(--color-obsidian)] font-bold rounded-full hover:scale-105 transition-transform w-full sm:w-auto"
          >
            Explore My Work
          </a>
          <a 
            href="#contact"
            data-interactive="true"
            className="px-8 py-3 border border-[var(--color-snow)]/20 rounded-full hover:bg-[var(--color-snow)]/10 transition-colors w-full sm:w-auto"
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}