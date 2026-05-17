import { Card } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import type { WorkflowStep } from '../../types/workflow';
import { formatDuration, formatWorkflowValue, getStepTitle } from '../../lib/workflowDisplay';

interface AgentStepCardProps {
  step: WorkflowStep;
  index: number;
}

export function AgentStepCard({ step, index }: AgentStepCardProps) {
  return (
    <Card
      title={getStepTitle(step)}
      eyebrow={`Step ${index + 1}`}
      actions={<StatusBadge status={step.status} />}
      className="overflow-hidden"
    >
      <div className="grid gap-4 lg:grid-cols-[180px_1fr]">
        <div className="space-y-3 rounded-2xl bg-slate-50 p-4 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Role</p>
            <p className="mt-1 font-medium capitalize text-slate-900">{step.role.replace('_', ' ')}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</p>
            <div className="mt-1">
              <StatusBadge status={step.status} />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Duration</p>
            <p className="mt-1 font-medium text-slate-900">{formatDuration(step.duration_ms)}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Input</h4>
            <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              {formatWorkflowValue(step.input)}
            </pre>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Output</h4>
            <pre className="mt-2 max-h-96 overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-800">
              {formatWorkflowValue(step.output)}
            </pre>
          </div>

          {step.error && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
              <p className="font-semibold">Error</p>
              <p className="mt-1 whitespace-pre-wrap">{step.error}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
