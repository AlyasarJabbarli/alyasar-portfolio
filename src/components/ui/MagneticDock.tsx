"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Home, Briefcase, Code2, GraduationCap, Mail } from "lucide-react";
import Link from "next/link";

// Reusable physics-driven icon component
function DockIcon({ mouseX, icon: Icon, href, label }: { mouseX: any, icon: any, href: string, label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Calculate the distance from the mouse to the center of the icon
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Transform that distance into a width value (base 48px, max 80px when hovered)
  const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width }}
        className="relative flex aspect-square items-center justify-center rounded-full bg-snow/5 border border-snow/10 text-gray-400 backdrop-blur-md transition-colors hover:text-[var(--color-electric-cyan)] hover:bg-snow/10 group"
        data-interactive="true" // Tells our custom cursor to expand
      >
        <Icon className="w-1/2 h-1/2" />
        
        {/* Tooltip */}
        <span className="absolute -top-12 scale-0 rounded-md bg-[var(--color-obsidian)] border border-[var(--color-electric-cyan)]/30 px-3 py-1 text-xs font-mono text-[var(--color-snow)] transition-all group-hover:scale-100 backdrop-blur-xl">
          {label}
        </span>
      </motion.div>
    </Link>
  );
}

export default function MagneticDock() {
  // Infinity ensures icons stay small when the mouse is outside the dock
  const mouseX = useMotionValue(Infinity);

  const navItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: Briefcase, label: "Experience", href: "#experience" },
    { icon: Code2, label: "Projects", href: "#projects" },
    { icon: GraduationCap, label: "Education", href: "#education" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} // Custom spring easing
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex h-20 items-end gap-3 rounded-3xl bg-[var(--color-deep-slate)]/40 border border-snow/10 px-4 pb-3 backdrop-blur-2xl shadow-2xl shadow-black/50"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {navItems.map((item, idx) => (
        <DockIcon key={idx} mouseX={mouseX} {...item} />
      ))}
    </motion.div>
  );
}