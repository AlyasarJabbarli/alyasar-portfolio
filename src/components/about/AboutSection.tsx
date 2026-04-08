"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MOCK_COMMANDS = [
  '$ git commit -m "feat: bundle perf — Inci dashboard"',
  "$ npx next build --experimental-build-mode compile",
  '$ python -c "from attacks import pgd; run_eval(model)"',
  "$ pytest tests/ml/ -q --tb=short",
];

function TerminalWidget() {
  const [cmdIndex, setCmdIndex] = useState(0);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | undefined;
    const full = MOCK_COMMANDS[cmdIndex % MOCK_COMMANDS.length];
    let charIndex = 0;
    setDisplay("");

    const intervalId = window.setInterval(() => {
      if (cancelled) return;
      charIndex += 1;
      setDisplay(full.slice(0, charIndex));
      if (charIndex >= full.length) {
        window.clearInterval(intervalId);
        timeoutId = window.setTimeout(() => {
          if (!cancelled) {
            setCmdIndex((i) => (i + 1) % MOCK_COMMANDS.length);
          }
        }, 2200);
      }
    }, 42);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      if (timeoutId) window.clearTimeout(timeoutId);
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
      className="w-full py-24 px-4 max-w-6xl mx-auto relative z-10 border-t border-[var(--color-snow)]/5 cq"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div className="rounded-3xl border border-[var(--color-snow)]/10 bg-[var(--color-snow)]/[0.03] backdrop-blur-xl p-6 shadow-xl shadow-black/20">
          <div className="relative aspect-[5/6] w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-[var(--color-electric-cyan)]/20 bg-[var(--color-deep-slate)]">
            <Image
              src="/window.png"
              alt="Alyasar Jabbarli profile image"
              fill
              className="object-cover opacity-85 hover:opacity-100 transition-opacity duration-700"
              sizes="(max-width: 1024px) 100vw, 400px"
              priority={false}
            />

          </div>
        </div>

        <div className="rounded-3xl border border-[var(--color-snow)]/10 bg-[var(--color-snow)]/[0.03] backdrop-blur-xl p-8 shadow-xl shadow-black/20">
          <h2 className="text-[clamp(1.75rem,1.1rem+2vw,2.5rem)] font-bold text-[var(--color-snow)] mb-4 tracking-tight">
            About
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            I&apos;m Alyasar Jabbarli, a Software &amp; Data Engineer based in Budapest, currently focusing on the intersection of scalable data infrastructure and trustworthy machine learning.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Most recently, I served as a Technical Project Lead at{" "}
            <strong className="text-[var(--color-snow)] font-medium">Inci Group</strong>, where I spearheaded the development of modular, data-intensive web platforms. My work focused on building robust integration layers and ensuring end-to-end type safety—transforming complex data requirements into high-performance user experiences.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Currently, I am deep-diving into the world of Data Engineering and Security through my Master&apos;s at{" "}
            <strong className="text-[var(--color-snow)] font-medium">ELTE</strong>. My research in Trustworthy ML allows me to stress-test LLM vulnerabilities using adversarial attacks (PGD/GCG), giving me a unique &ldquo;security-first&rdquo; lens on how data pipelines should be built and protected in 2026.
          </p>
          <p className="text-gray-500 leading-relaxed text-sm">
            I am currently seeking my next challenge in a role that demands a blend of Next.js/modern web architecture and scalable data engineering. If you&apos;re building resilient, data-aware systems and need an engineer who values honest metrics over buzzwords, let&apos;s talk.
          </p>
          <TerminalWidget />
        </div>
      </div>
    </section>
  );
}
