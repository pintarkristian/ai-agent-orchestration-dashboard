import { useQuery } from '@tanstack/react-query';
import { listWorkflows } from '../api/workflows';
import { Card } from '../components/ui/Card';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LoadingState';
import { StatusBadge } from '../components/ui/StatusBadge';

export default function WorkflowHistoryPage() {
  const workflowsQuery = useQuery({
    queryKey: ['workflows'],
    queryFn: listWorkflows,
    retry: 1,
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Workflow History</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Saved orchestration runs</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          A clean history page prepared for persisted workflow runs from the FastAPI SQLite backend.
        </p>
      </div>

      {workflowsQuery.isLoading && <LoadingState title="Loading workflows" message="Reading saved workflow runs from the backend..." />}
      {workflowsQuery.isError && <ErrorState message="Could not load workflow history. Check that the backend API is running." />}

      {workflowsQuery.data && (
        <Card title="Recent Runs" eyebrow={`${workflowsQuery.data.length} total`}>
          {workflowsQuery.data.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <h3 className="text-base font-semibold text-slate-950">No workflow runs yet</h3>
              <p className="mt-2 text-sm text-slate-500">Run your first workflow from the backend API to populate this table.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Task</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Steps</th>
                      <th className="px-4 py-3 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {workflowsQuery.data.map((workflow) => (
                      <tr key={workflow.id} className="hover:bg-slate-50">
                        <td className="max-w-xl px-4 py-4 font-medium text-slate-900">{workflow.task}</td>
                        <td className="px-4 py-4"><StatusBadge status={workflow.status} /></td>
                        <td className="px-4 py-4 text-slate-600">{workflow.steps?.length ?? 0}</td>
                        <td className="px-4 py-4 text-slate-600">{workflow.total_duration_ms ?? 0} ms</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
