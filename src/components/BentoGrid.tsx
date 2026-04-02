"use client";

import { motion } from "framer-motion";


export const ExperienceCard = ({ company, role, metric }: any) => (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 rounded-3xl bg-snow/5 border border-snow/10 backdrop-blur-md transition-all hover:border-electricCyan/50"
    >
      <h3 className="text-xl font-bold text-snow">{company}</h3>
      <p className="text-electricCyan text-sm font-mono mb-4">{role}</p>
      <div className="text-gray-400 text-sm italic">
         ⚡ {metric}
      </div>
    </motion.div>
  );