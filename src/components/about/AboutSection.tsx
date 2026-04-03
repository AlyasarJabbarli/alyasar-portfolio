"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MOCK_COMMANDS = [
  '$ git commit -m "feat: neural embeddings pipeline"',
  "$ npm run analyze --bundle-size-reduced",
  '$ curl -s api.example.com/embeddings | jq ".dimensions"',
  "$ python -m pytest tests/ml/ -q",
];

function TerminalWidget() {
  const [cmdIndex, setCmdIndex] = useState(0);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let cancelled = false;
    const full = MOCK_COMMANDS[cmdIndex % MOCK_COMMANDS.length];
    let charIndex = 0;
    setDisplay("");

    const intervalId = window.setInterval(() => {
      if (cancelled) return;
      charIndex += 1;
      setDisplay(full.slice(0, charIndex));
      if (charIndex >= full.length) {
        window.clearInterval(intervalId);
        window.setTimeout(() => {
          if (!cancelled) {
            setCmdIndex((i) => (i + 1) % MOCK_COMMANDS.length);
          }
        }, 2200);
      }
    }, 42);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [cmdIndex]);

  return (
    <div
      className="mt-8 rounded-xl border border-[var(--color-snow)]/15 bg-[var(--color-obsidian)]/80 backdrop-blur-xl p-4 font-mono text-sm text-left shadow-lg shadow-black/40"
      aria-label="Decorative terminal animation"
    >
      <div className="flex items-center gap-2 border-b border-[var(--color-snow)]/10 pb-2 mb-3 text-xs text-gray-500">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" aria-hidden="true" />
        <span className="ml-2">terminal</span>
      </div>
      <p className="text-[var(--color-electric-cyan)] break-all">
        <span className="text-gray-500 select-none" aria-hidden="true">
          user@alyasar
        </span>{" "}
        <span className="text-[var(--color-snow)]">{display}</span>
        <span className="inline-block w-2 h-4 ml-0.5 align-middle bg-[var(--color-electric-cyan)] animate-pulse" />
      </p>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full py-24 px-4 max-w-6xl mx-auto relative z-10 border-t border-[var(--color-snow)]/5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div className="rounded-3xl border border-[var(--color-snow)]/10 bg-[var(--color-snow)]/[0.03] backdrop-blur-xl p-6 shadow-xl shadow-black/20">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-[var(--color-electric-cyan)]/20 bg-[var(--color-deep-slate)]">
            <Image
              src="/window.svg"
              alt="Profile photo placeholder"
              fill
              className="object-cover opacity-40"
              sizes="(max-width: 1024px) 100vw, 400px"
              priority={false}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-gray-500 pointer-events-none">
              Profile image placeholder
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--color-snow)]/10 bg-[var(--color-snow)]/[0.03] backdrop-blur-xl p-8 shadow-xl shadow-black/20">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-snow)] mb-4 tracking-tight">
            About
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Background copy placeholder — engineering focus, stack, and what
            you build day to day. Replace this with your story.
          </p>
          <p className="text-gray-500 leading-relaxed text-sm">
            Second paragraph placeholder for education, interests, or current
            role highlights.
          </p>
          <TerminalWidget />
        </div>
      </div>
    </section>
  );
}
