"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react"; // Removed Github and Linkedin
import { useState } from "react";
import MaskedText from "../ui/MaskedText";

// Custom Github Icon matching Lucide's exact style
const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.39-3.5 5 5 0 0 0-.12-3.4s-1.12-.36-3.66 1.7a12.08 12.08 0 0 0-6.6 0c-2.54-2.06-3.66-1.7-3.66-1.7a5 5 0 0 0-.12 3.4A5.2 5.2 0 0 0 3 12.01c0 5.23 3 6.42 6 6.76-.7.2-1.25.8-1.4 1.84-.8.3-2.8.9-4-1.1-.3-.6-1-1-1-1-.8-.2-.1-.2-.1-.2 1.2 0 1.6.8 1.6.8 1 1.6 2.6 1.3 3.3 1 .1-.9.5-1.5 1-1.8V22"></path>
  </svg>
);

// Custom LinkedIn Icon matching Lucide's exact style
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 max-w-6xl mx-auto w-full relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <MaskedText
            text="Let's Connect"
            highlightLastWord={true} // Restores the white/cyan split
            className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-snow)] mb-4"
          />
          <p className="text-gray-400 font-light mb-10 max-w-md leading-relaxed">
            I'm currently open to new opportunities. Whether you have a question about my stack or just want to discuss high-performance architecture, my inbox is open.
          </p>

          <div className="space-y-6">
            <a href="mailto:alyasar.jabbarli@gmail.com" className="flex items-center gap-4 text-gray-400 hover:text-[var(--color-electric-cyan)] transition-colors group" data-interactive="true">
              <div className="w-12 h-12 rounded-full bg-[var(--color-snow)]/5 border border-[var(--color-snow)]/10 flex items-center justify-center group-hover:border-[var(--color-electric-cyan)]/30 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-mono text-sm">alyasar.jabbarli@gmail.com</span>
            </a>

            <a href="tel:+36703604522" className="flex items-center gap-4 text-gray-400 hover:text-[var(--color-electric-cyan)] transition-colors group" data-interactive="true">
              <div className="w-12 h-12 rounded-full bg-[var(--color-snow)]/5 border border-[var(--color-snow)]/10 flex items-center justify-center group-hover:border-[var(--color-electric-cyan)]/30 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-gray-400">
                {showPhone ? (
                  <a href="tel:+36703604522" className="text-[var(--color-electric-cyan)] hover:underline">
                    +36 70 360 45 22
                  </a>
                ) : (
                  <button
                    onClick={() => setShowPhone(true)}
                    className="text-sm px-3 py-1 border border-[var(--color-snow)]/20 rounded-full hover:border-[var(--color-electric-cyan)] transition-colors"
                  >
                    Click to reveal phone number
                  </button>
                )}
              </div>            </a>

            <div className="flex gap-4 pt-4 border-t border-[var(--color-snow)]/10 mt-8 max-w-xs">
              {/* Swapped to our custom icons here */}
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[var(--color-snow)]/5 border border-[var(--color-snow)]/10 flex items-center justify-center text-gray-400 hover:text-[var(--color-snow)] hover:border-[var(--color-snow)]/30 transition-all" data-interactive="true">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[var(--color-snow)]/5 border border-[var(--color-snow)]/10 flex items-center justify-center text-gray-400 hover:text-[var(--color-snow)] hover:border-[var(--color-snow)]/30 transition-all" data-interactive="true">
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-[var(--color-snow)]/5 border border-[var(--color-snow)]/10 backdrop-blur-md flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-mono text-gray-500 uppercase tracking-wider">Name</label>
              <input
                type="text"
                id="name"
                required
                className="w-full bg-transparent border-b border-[var(--color-snow)]/20 px-0 py-2 text-[var(--color-snow)] placeholder:text-gray-600 focus:outline-none focus:border-[var(--color-electric-cyan)] transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-mono text-gray-500 uppercase tracking-wider">Email</label>
              <input
                type="email"
                id="email"
                required
                className="w-full bg-transparent border-b border-[var(--color-snow)]/20 px-0 py-2 text-[var(--color-snow)] placeholder:text-gray-600 focus:outline-none focus:border-[var(--color-electric-cyan)] transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-mono text-gray-500 uppercase tracking-wider">Message</label>
              <textarea
                id="message"
                required
                rows={4}
                className="w-full bg-transparent border-b border-[var(--color-snow)]/20 px-0 py-2 text-[var(--color-snow)] placeholder:text-gray-600 focus:outline-none focus:border-[var(--color-electric-cyan)] transition-colors resize-none"
                placeholder="Let's talk about..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full py-4 rounded-xl bg-[var(--color-electric-cyan)] text-[var(--color-obsidian)] font-bold flex items-center justify-center gap-2 hover:bg-[var(--color-snow)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              data-interactive="true"
            >
              {isSubmitting ? "Transmitting..." : "Send Message"}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}