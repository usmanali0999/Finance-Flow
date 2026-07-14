export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-blue-500" />
        </div>
        <p className="text-sm text-slate-400">Loading Finance Flow...</p>
      </div>
    </div>
  );
}