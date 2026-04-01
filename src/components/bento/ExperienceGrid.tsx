"use client";

import { motion } from "framer-motion";
import MaskedText from '../ui/MaskedText'
// Define the exact shape of the data coming from Sanity
export interface Experience {
  _id: string;
  company: string;
  role: string;
  date: string;
  highlights: string[];
  colSpan: string;
  rowSpan: string;
}

export default function ExperienceGrid({ experiences }: { experiences: Experience[] }) {
  // Fallback styling if no custom span is provided in the CMS
  const getGridSpan = (col: string, row: string) => {
    const colClass = col || 'md:col-span-1';
    const rowClass = row || 'md:row-span-1';
    return `${colClass} ${rowClass}`;
  };
  // Add this inside the ExperienceGrid component
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="mb-12">
        <MaskedText
            text="Engineering Impact"
            highlightLastWord={true} // Restores the white/cyan split
            className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-snow)] mb-4"
          />
        <p className="text-gray-400 font-light">
          Metrics-driven development and scalable architectures.
        </p>
      </div>

      {experiences.length === 0 ? (
        <div className="text-gray-500 border border-dashed border-gray-700 p-8 rounded-2xl text-center">
          No experience data found. Please add content in the Sanity Studio.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          {experiences.map((item, index) => (
            <motion.div
              key={item._id}
              onMouseMove={handleMouseMove} // <-- Attach the tracker here
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className={`relative group p-8 rounded-3xl bg-[var(--color-snow)]/5 border border-[var(--color-snow)]/10 backdrop-blur-md overflow-hidden flex flex-col justify-between ${getGridSpan(item.colSpan, item.rowSpan)} transition-colors`}
            >
              {/* The dynamic spotlight gradient */}
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                style={{
                  background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(0,240,255,0.15), transparent 40%)"
                }}
              />

              {/* Add relative z-10 to your content to keep it above the spotlight */}
              <div className="relative z-10">
                <span className="text-xs font-mono text-gray-500 block mb-2">{item.date}</span>
                <h3 className="text-2xl font-bold text-[var(--color-snow)] group-hover:text-[var(--color-electric-cyan)] transition-colors">{item.company}</h3>
                <p className="text-[var(--color-electric-cyan)] font-medium text-sm mt-1">{item.role}</p>
              </div>

              {item.highlights && item.highlights.length > 0 && (
                <ul className="relative z-10 mt-4 space-y-2">
                  {item.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-electric-cyan)]/50 shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}