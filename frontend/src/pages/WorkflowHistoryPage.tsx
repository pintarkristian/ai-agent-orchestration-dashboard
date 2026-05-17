import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { listWorkflows } from '../api/workflows';
import { Card } from '../components/ui/Card';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LoadingState';
import { StatusBadge } from '../components/ui/StatusBadge';
import {
  formatDateTime,
  formatDuration,
  getWorkflowDuration,
  getWorkflowTask,
  truncateText,
} from '../lib/workflowDisplay';

export default function WorkflowHistoryPage() {
  const workflowsQuery = useQuery({
    queryKey: ['workflows'],
    queryFn: listWorkflows,
    retry: 1,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Workflow History</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Saved orchestration runs</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Review persisted workflow runs from the FastAPI SQLite backend and open any run for full agent details.
          </p>
        </div>
        <Link
          to="/workflows/run"
          className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Run new workflow
        </Link>
      </div>

      {workflowsQuery.isLoading && <LoadingState title="Loading workflows" message="Reading saved workflow runs from the backend..." />}
      {workflowsQuery.isError && <ErrorState message="Could not load workflow history. Check that the backend API is running." />}

      {workflowsQuery.data && (
        <Card title="Recent Runs" eyebrow={`${workflowsQuery.data.length} total`}>
          {workflowsQuery.data.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <h3 className="text-base font-semibold text-slate-950">No workflow runs yet</h3>
              <p className="mt-2 text-sm text-slate-500">Run your first workflow from the Workflow Run page to populate this history.</p>
              <Link
                to="/workflows/run"
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Start workflow
              </Link>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:hidden">
                {workflowsQuery.data.map((workflow) => (
                  <Link
                    key={workflow.id}
                    to={`/workflows/${workflow.id}`}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="break-all text-xs font-semibold uppercase tracking-wide text-slate-400">{workflow.id}</p>
                        <h3 className="mt-2 line-clamp-3 font-semibold text-slate-950">
                          {truncateText(getWorkflowTask(workflow), 130)}
                        </h3>
                      </div>
                      <StatusBadge status={workflow.status} />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Created</p>
                        <p className="mt-1 text-slate-700">{formatDateTime(workflow.created_at ?? workflow.started_at)}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Duration</p>
                        <p className="mt-1 text-slate-700">{formatDuration(getWorkflowDuration(workflow))}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Workflow ID</th>
                        <th className="px-4 py-3 font-semibold">Original Task</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Created</th>
                        <th className="px-4 py-3 font-semibold">Duration</th>
                        <th className="px-4 py-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {workflowsQuery.data.map((workflow) => (
                        <tr key={workflow.id} className="hover:bg-slate-50">
                          <td className="max-w-[220px] px-4 py-4 font-mono text-xs text-slate-500">
                            <span className="block truncate" title={workflow.id}>{workflow.id}</span>
                          </td>
                          <td className="max-w-xl px-4 py-4 font-medium text-slate-900">
                            {truncateText(getWorkflowTask(workflow), 170)}
                          </td>
                          <td className="px-4 py-4"><StatusBadge status={workflow.status} /></td>
                          <td className="px-4 py-4 text-slate-600">{formatDateTime(workflow.created_at ?? workflow.started_at)}</td>
                          <td className="px-4 py-4 text-slate-600">{formatDuration(getWorkflowDuration(workflow))}</td>
                          <td className="px-4 py-4">
                            <Link
                              to={`/workflows/${workflow.id}`}
                              className="font-semibold text-slate-950 underline-offset-4 hover:underline"
                            >
                              View details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
