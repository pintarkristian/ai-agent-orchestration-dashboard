import { useQuery } from '@tanstack/react-query';
import { Card } from '../components/ui/Card';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LoadingState';
import { StatusBadge } from '../components/ui/StatusBadge';
import { getHealth } from '../api/workflows';

const stackItems = ['FastAPI', 'SQLite', 'OpenRouter', 'React', 'TypeScript', 'Tailwind CSS'];
const agentRoles = ['Planner', 'Researcher', 'Technical Architect', 'Developer', 'Reviewer', 'Final Answer'];

export default function DashboardPage() {
  const healthQuery = useQuery({
    queryKey: ['health'],
    queryFn: getHealth,
    retry: 1,
  });

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-300/40 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            AI Workflow Platform
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Multi-agent orchestration dashboard for planning, building, and reviewing tasks.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            This frontend foundation is ready for the FastAPI workflow API, history views, and future React Flow visualization.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="API Status" eyebrow="Backend">
          {healthQuery.isLoading && <LoadingState title="Checking API" message="Connecting to the FastAPI backend..." />}
          {healthQuery.isError && <ErrorState message="Start the backend with python -m uvicorn app.main:app --reload." />}
          {healthQuery.data && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Status</span>
                <StatusBadge status="online" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Version</span>
                <span className="font-medium text-slate-900">{healthQuery.data.version}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Environment</span>
                <span className="font-medium text-slate-900">{healthQuery.data.environment}</span>
              </div>
            </div>
          )}
        </Card>

        <Card title="Agent Pipeline" eyebrow="Sequence" className="lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {agentRoles.map((role, index) => (
              <div key={role} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="font-medium text-slate-900">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Technology Stack" eyebrow="Foundation">
        <div className="flex flex-wrap gap-3">
          {stackItems.map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              {item}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
