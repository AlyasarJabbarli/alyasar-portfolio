function ShimmerBlock({ className }: { className?: string }) {
  return (
    <div
      className={`skeleton-shimmer rounded-2xl border border-[var(--color-snow)]/10 bg-[var(--color-snow)]/[0.04] ${className ?? ""}`}
    />
  );
}

export function BentoGridSkeleton() {
  return (
    <div className="w-full px-4 py-24 max-w-6xl mx-auto">
      <ShimmerBlock className="h-10 w-48 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(120px,auto)]">
        <ShimmerBlock className="md:col-span-2 md:row-span-2 min-h-[220px]" />
        <ShimmerBlock className="min-h-[120px]" />
        <ShimmerBlock className="min-h-[120px]" />
        <ShimmerBlock className="md:col-span-2 min-h-[140px]" />
        <ShimmerBlock className="min-h-[140px]" />
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--color-snow)]/10 bg-[var(--color-snow)]/[0.03] p-6 flex flex-col gap-4">
      <ShimmerBlock className="h-6 w-3/4" />
      <ShimmerBlock className="h-3 w-full" />
      <ShimmerBlock className="h-3 w-5/6" />
      <div className="flex gap-2 mt-2">
        <ShimmerBlock className="h-6 w-16 rounded-full" />
        <ShimmerBlock className="h-6 w-20 rounded-full" />
        <ShimmerBlock className="h-6 w-14 rounded-full" />
      </div>
      <div className="flex gap-3 mt-auto pt-4">
        <ShimmerBlock className="h-10 flex-1 rounded-xl" />
        <ShimmerBlock className="h-10 w-10 rounded-xl" />
      </div>
    </div>
  );
}

export function ProjectsSectionSkeleton() {
  return (
    <div className="w-full px-4 py-24 max-w-6xl mx-auto">
      <ShimmerBlock className="h-10 w-40 mb-4" />
      <ShimmerBlock className="h-4 w-full max-w-xl mb-16" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </div>
    </div>
  );
}

export function EducationSectionSkeleton() {
  return (
    <div className="w-full px-4 py-24 max-w-6xl mx-auto">
      <ShimmerBlock className="h-10 w-56 mb-12 mx-auto" />
      <div className="space-y-6 max-w-3xl mx-auto">
        <ShimmerBlock className="h-28 w-full" />
        <ShimmerBlock className="h-28 w-full" />
        <ShimmerBlock className="h-28 w-full" />
      </div>
    </div>
  );
}
