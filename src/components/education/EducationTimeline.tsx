"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Code } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import MaskedText from "../ui/MaskedText";

export interface EducationItem {
  _id: string;
  title: string;
  institution: string;
  location: string;
  date: string;
  highlight: string;
  iconName: string;
}

// Map the string from Sanity to the actual Lucide component
const iconMap: Record<string, LucideIcon> = {
  GraduationCap: GraduationCap,
  Award: Award,
  Code: Code,
};

export default function EducationTimeline({ items }: { items: EducationItem[] }) {
  return (
    <section id="education" className="py-24 px-4 max-w-4xl mx-auto w-full relative z-10">
      <div className="mb-16 text-center">
        <MaskedText
          text="Academic Rigor"
          highlightLastWord={true} // Restores the white/cyan split
          className="text-4xl md:text-5xl font-bold tracking-tight justify-center text-[var(--color-snow)] mb-4"
        />
        <p className="text-gray-400 font-light">
          Formal education, specialized training, and recognized honors.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-snow)]/10 -translate-x-1/2" />

        <div className="space-y-12">
          {items.map((item, index) => {
            const isEven = index % 2 === 0;
            const Icon = iconMap[item.iconName] || GraduationCap; // Default fallback

            return (
              <div
                key={item._id}
                className={`relative flex flex-col items-start gap-8 md:pl-0 md:flex-row md:items-center ${isEven ? "md:flex-row-reverse" : ""}`}
              >

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute left-6 sm:left-8 md:left-1/2 w-12 h-12 rounded-full bg-[var(--color-obsidian)] border-2 border-[var(--color-electric-cyan)] flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                >
                  <Icon className="w-5 h-5 text-[var(--color-electric-cyan)]" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  className={`w-full min-w-0 md:w-[calc(50%_-_3rem)] p-5 sm:p-6 rounded-2xl bg-[var(--color-snow)]/5 border border-[var(--color-snow)]/10 backdrop-blur-md group hover:border-[var(--color-electric-cyan)]/30 transition-colors ${isEven ? "text-left md:text-right" : "text-left"}`}
                >
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-mono rounded-full bg-[var(--color-obsidian)] text-[var(--color-electric-cyan)] border border-[var(--color-electric-cyan)]/20">
                    {item.date}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--color-snow)] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 font-medium mb-1">
                    {item.institution}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    {item.location}
                  </p>
                  {item.highlight && (
                    <div className="p-3 rounded-lg bg-[var(--color-electric-cyan)]/5 border border-[var(--color-electric-cyan)]/10 flex gap-3 items-start">
                      <Award className="w-5 h-5 text-[var(--color-electric-cyan)] shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-300 italic text-left">
                        {item.highlight}
                      </p>
                    </div>
                  )}
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
