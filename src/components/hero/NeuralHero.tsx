"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import DataNetworkCanvas from "../canvas/DataNetwork"; // Your new 3D Canvas!

export default function NeuralHero() {
  // Bypassing the SSR hydration issue by using the global scroll
  const { scrollY } = useScroll();

  // As the user scrolls down 800 pixels, push the text down and fade it out
  const y = useTransform(scrollY, [0, 800], ["0%", "40%"]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* 3D WebGL Data Network Background */}
      <DataNetworkCanvas />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto pointer-events-none"
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
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-[var(--color-snow)] pointer-events-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Alyasar Jabbarli
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Software Engineer & Data Scientist architecting modular ecosystems at <strong className="text-[var(--color-snow)] font-medium">Inci Group</strong> and pursuing a Master's at <strong className="text-[var(--color-snow)] font-medium">ELTE</strong>. Focused on high-performance, type-safe full-stack applications.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
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
            href="/Alyasar_Jabbarli_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-[var(--color-snow)]/20 text-[var(--color-snow)] font-semibold rounded-full hover:border-[var(--color-electric-cyan)] hover:text-[var(--color-electric-cyan)] transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
            Download CV
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