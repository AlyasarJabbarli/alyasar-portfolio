"use client";

import { motion } from "framer-motion";

const experienceData = [
  {
    id: 1,
    company: "Inci Group",
    role: "Software Engineer",
    date: "Jul 2025 - Present",
    highlights: ["Architecting microservices", "RESTful API design", "End-to-end fullstack scaling"],
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    accent: "border-electric-cyan/30",
  },
  {
    id: 2,
    company: "Pasha Bank OJSC",
    role: "Frontend Engineer",
    date: "May 2024 - Sep 2024",
    highlights: ["Reduced LCP scores", "React & Next.js UI", "100% Type-safe modular components"],
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    accent: "border-snow/10",
  },
  {
    id: 3,
    company: "Timesoft LLC",
    role: "Backend Developer",
    date: "Jan 2024 - May 2024",
    highlights: ["PostgreSQL & MongoDB schemas", "Secure auth flows", "Firebase real-time sync"],
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    accent: "border-snow/10",
  },
  {
    id: 4,
    company: "Celt Colleges",
    role: "Branch Manager & Instructor",
    date: "Sep 2022 - May 2024",
    highlights: ["Led cross-functional teams", "Taught advanced React/Redux", "Exceeded growth targets"],
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    accent: "border-snow/10",
  }
];

export default function ExperienceGrid() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-snow mb-4">
          Engineering <span className="text-electric-cyan">Impact</span>
        </h2>
        <p className="text-gray-400 font-light">
          Metrics-driven development and scalable architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
        {experienceData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className={`relative group p-8 rounded-3xl bg-snow/5 border backdrop-blur-md overflow-hidden flex flex-col justify-between ${item.colSpan} ${item.rowSpan} ${item.accent} hover:border-electric-cyan/60 transition-colors`}
          >
            {/* Background Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/0 to-electric-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <span className="text-xs font-mono text-gray-500 block mb-2">{item.date}</span>
              <h3 className="text-2xl font-bold text-snow">{item.company}</h3>
              <p className="text-electric-cyan font-medium text-sm mt-1">{item.role}</p>
            </div>

            <ul className="relative z-10 mt-4 space-y-2">
              {item.highlights.map((highlight, i) => (
                <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan/50" />
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}