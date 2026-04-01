"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.39-3.5 5 5 0 0 0-.12-3.4s-1.12-.36-3.66 1.7a12.08 12.08 0 0 0-6.6 0c-2.54-2.06-3.66-1.7-3.66-1.7a5 5 0 0 0-.12 3.4A5.2 5.2 0 0 0 3 12.01c0 5.23 3 6.42 6 6.76-.7.2-1.25.8-1.4 1.84-.8.3-2.8.9-4-1.1-.3-.6-1-1-1-1-.8-.2-.1-.2-.1-.2 1.2 0 1.6.8 1.6.8 1 1.6 2.6 1.3 3.3 1 .1-.9.5-1.5 1-1.8V22"></path>
    </svg>
  );

// Placeholder projects highlighting your dual expertise
const projectsData = [
  {
    id: 1,
    title: "Real-Time Algorithmic Visualizer",
    description: "A high-performance dashboard mapping complex data structures in real-time. Built to handle 10k+ data points with zero layout shift.",
    tech: ["Next.js", "TypeScript", "D3.js", "WebSockets"],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Modular Micro-Frontend Ecosystem",
    description: "An isolated component architecture designed for scale. Reduces build times by 40% and ensures strict type-safety across distributed teams.",
    tech: ["React", "Redux", "Webpack", "Tailwind v4"],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Predictive Analytics Interface",
    description: "Bridging Data Science and UI. A clean, accessible interface that translates machine learning models into actionable business metrics.",
    tech: ["Python", "FastAPI", "Next.js", "Framer Motion"],
    link: "#",
    github: "#",
  }
];

export default function ProjectsLab() {
  return (
    <section id="projects" className="py-24 px-4 max-w-6xl mx-auto w-full relative z-10">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-[var(--color-snow)] mb-4">
            The <span className="text-[var(--color-electric-cyan)]">Lab</span>
          </h2>
          <p className="text-gray-400 font-light max-w-xl">
            Where frontend architecture meets data science. A selection of technical experiments and scalable applications.
          </p>
        </div>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-snow)] hover:text-[var(--color-electric-cyan)] transition-colors pb-1 border-b border-[var(--color-electric-cyan)]/30 hover:border-[var(--color-electric-cyan)]"
          data-interactive="true"
        >
          View Full Archive <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col justify-between p-8 rounded-3xl bg-[var(--color-snow)]/5 border border-[var(--color-snow)]/10 backdrop-blur-sm overflow-hidden transition-all hover:border-[var(--color-electric-cyan)]/50 hover:bg-[var(--color-snow)]/10"
          >
            {/* Subtle radial gradient on hover */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--color-electric-cyan)]/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 mb-8">
              <h3 className="text-2xl font-bold text-[var(--color-snow)] mb-3 group-hover:text-[var(--color-electric-cyan)] transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-6 mt-auto">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs font-mono rounded-full bg-[var(--color-obsidian)] text-[var(--color-snow)] border border-[var(--color-snow)]/10 group-hover:border-[var(--color-electric-cyan)]/30 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-snow)]/10">
                <a href={project.github} className="text-gray-400 hover:text-[var(--color-snow)] transition-colors" data-interactive="true" aria-label="View Source">
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a href={project.link} className="text-gray-400 hover:text-[var(--color-snow)] transition-colors ml-auto flex items-center gap-1 text-sm font-medium" data-interactive="true">
                  Live Demo <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}