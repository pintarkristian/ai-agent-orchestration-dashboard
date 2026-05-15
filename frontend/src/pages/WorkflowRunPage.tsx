import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';

export default function WorkflowRunPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Run Workflow</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Prepare an orchestration task</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          This page provides the professional UI foundation for submitting a task. API submission and live visualization can be connected in the next milestone.
        </p>
      </div>

      <Card title="New Task" eyebrow="Input">
        <form className="space-y-5">
          <div>
            <label htmlFor="task" className="text-sm font-medium text-slate-700">
              User task
            </label>
            <textarea
              id="task"
              rows={8}
              placeholder="Analyze this startup idea and create a technical implementation plan."
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-200"
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">Workflow execution will call the FastAPI backend in a future UI milestone.</p>
            <button
              type="button"
              disabled
              className="rounded-xl bg-slate-300 px-5 py-3 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-80"
            >
              Run workflow soon
            </button>
          </div>
        </form>
      </Card>

      <Card title="Execution Preview" eyebrow="Pipeline">
        <div className="space-y-3">
          {['planner', 'researcher', 'technical_architect', 'developer', 'reviewer', 'final_answer'].map((role) => (
            <div key={role} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-sm font-medium capitalize text-slate-800">{role.replace('_', ' ')}</span>
              <StatusBadge status="pending" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
