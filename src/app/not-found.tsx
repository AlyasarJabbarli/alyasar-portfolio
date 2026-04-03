import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 bg-[var(--color-obsidian)] text-[var(--color-snow)]">
      <p className="text-sm font-mono text-[var(--color-electric-cyan)] mb-2">404</p>
      <h1 className="text-2xl font-bold tracking-tight mb-4">Page not found</h1>
      <p className="text-gray-400 text-center max-w-md mb-8 text-sm">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[var(--color-electric-cyan)] text-[var(--color-obsidian)] font-bold hover:bg-[var(--color-snow)] transition-colors"
      >
        Return home
      </Link>
    </div>
  );
}
