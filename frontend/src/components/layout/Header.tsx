export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Portfolio Project
          </p>
          <h1 className="text-lg font-semibold text-slate-950 sm:text-xl">
            AI Agent Orchestration Dashboard
          </h1>
        </div>
        <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 sm:block">
          FastAPI · React · TypeScript
        </div>
      </div>
    </header>
  );
}
