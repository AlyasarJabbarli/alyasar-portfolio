"use client";

import Link from "next/link";

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 bg-[var(--color-obsidian)] text-[var(--color-snow)]">
      <p className="text-sm font-mono text-[var(--color-electric-cyan)] mb-2">
        Something went wrong
      </p>
      <h1 className="text-2xl font-bold tracking-tight mb-4 text-center">
        We couldn&apos;t load this page
      </h1>
      <p className="text-gray-400 text-center max-w-md mb-8 text-sm">
        An unexpected error occurred. You can try again or return home.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-full border border-[var(--color-snow)]/20 text-[var(--color-snow)] text-sm font-semibold hover:border-[var(--color-electric-cyan)] hover:text-[var(--color-electric-cyan)] transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-[var(--color-electric-cyan)] text-[var(--color-obsidian)] text-sm font-bold hover:bg-[var(--color-snow)] transition-colors"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
