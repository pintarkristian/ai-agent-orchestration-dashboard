export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <section className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          Project Foundation
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          AI Agent Orchestration Dashboard
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
          React, TypeScript, Tailwind CSS, TanStack Query, Axios, and React Flow are prepared.
          Agent workflow UI and business logic will be added in future milestones.
        </p>
      </section>
    </main>
  );
}
