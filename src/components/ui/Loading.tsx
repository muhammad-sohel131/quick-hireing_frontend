export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--background)] to-[var(--neutrals-20)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[var(--neutrals-20)] border-t-[var(--brandColor)] rounded-full animate-spin"></div>
        <p className="text-[var(--neutrals-80)] font-medium">Loading...</p>
      </div>
    </div>
  );
}
