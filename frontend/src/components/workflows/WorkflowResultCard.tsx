import { Card } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import type { WorkflowRun } from '../../types/workflow';
import {
  formatDateTime,
  formatDuration,
  getWorkflowDuration,
  getWorkflowFinalAnswer,
} from '../../lib/workflowDisplay';

interface WorkflowResultCardProps {
  workflow: WorkflowRun;
  title?: string;
  eyebrow?: string;
}

export function WorkflowResultCard({ workflow, title = 'Final Combined Answer', eyebrow = 'Workflow Result' }: WorkflowResultCardProps) {
  return (
    <Card
      title={title}
      eyebrow={eyebrow}
      actions={<StatusBadge status={workflow.status} />}
      className="border-slate-300 shadow-md"
    >
      <div className="mb-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Workflow ID</p>
          <p className="mt-1 break-all font-medium text-slate-900">{workflow.id}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Created</p>
          <p className="mt-1 font-medium text-slate-900">{formatDateTime(workflow.created_at ?? workflow.started_at)}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Steps</p>
          <p className="mt-1 font-medium text-slate-900">{workflow.steps.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total Duration</p>
          <p className="mt-1 font-medium text-slate-900">{formatDuration(getWorkflowDuration(workflow))}</p>
        </div>
      </div>

      {workflow.error && (
        <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          <p className="font-semibold">Workflow error</p>
          <p className="mt-1 whitespace-pre-wrap">{workflow.error}</p>
        </div>
      )}

      <pre className="whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-950 p-5 text-sm leading-7 text-slate-100">
        {getWorkflowFinalAnswer(workflow)}
      </pre>
    </Card>
  );
}
