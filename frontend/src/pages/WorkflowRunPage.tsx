import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { runWorkflow } from '../api/workflows';
import { Card } from '../components/ui/Card';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LoadingState';
import { StatusBadge } from '../components/ui/StatusBadge';
import type { AgentRole, WorkflowRun, WorkflowStep, WorkflowValue } from '../types/workflow';

const defaultTask = 'Analyze this startup idea and create a technical implementation plan.';

const roleLabels: Record<AgentRole, string> = {
  planner: 'Planner Agent',
  researcher: 'Research Agent',
  technical_architect: 'Technical Architect Agent',
  developer: 'Developer Agent',
  reviewer: 'Reviewer Agent',
  final_answer: 'Final Answer Agent',
};

function formatWorkflowValue(value: WorkflowValue | undefined): string {
  if (value === null || value === undefined || value === '') {
    return 'No content returned.';
  }

  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value, null, 2);
}

function formatDuration(durationMs?: number | null): string {
  if (durationMs === null || durationMs === undefined) {
    return '—';
  }

  if (durationMs >= 1000) {
    return `${(durationMs / 1000).toFixed(durationMs >= 10000 ? 1 : 2)} s`;
  }

  return `${durationMs} ms`;
}

function getApiErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const detail = error.response?.data?.detail;
    if (typeof detail === 'string') {
      return detail;
    }

    if (Array.isArray(detail)) {
      return detail.map((item) => item.msg ?? JSON.stringify(item)).join(' ');
    }

    return error.message || 'The backend request failed.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'The backend request failed.';
}

function getStepTitle(step: WorkflowStep): string {
  return step.name || roleLabels[step.role] || step.role.replace('_', ' ');
}

function WorkflowStepCard({ step, index }: { step: WorkflowStep; index: number }) {
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

function FinalAnswerCard({ workflow }: { workflow: WorkflowRun }) {
  const finalAnswer = workflow.final_answer || workflow.output || workflow.error || 'No final answer returned.';

  return (
    <Card
      title="Final Combined Answer"
      eyebrow="Workflow Result"
      actions={<StatusBadge status={workflow.status} />}
      className="border-slate-300 shadow-md"
    >
      <div className="mb-5 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Workflow ID</p>
          <p className="mt-1 break-all font-medium text-slate-900">{workflow.id}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Steps</p>
          <p className="mt-1 font-medium text-slate-900">{workflow.steps.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total Duration</p>
          <p className="mt-1 font-medium text-slate-900">
            {formatDuration(workflow.total_duration_ms ?? workflow.duration_ms)}
          </p>
        </div>
      </div>

      {workflow.error && (
        <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          <p className="font-semibold">Workflow error</p>
          <p className="mt-1 whitespace-pre-wrap">{workflow.error}</p>
        </div>
      )}

      <pre className="whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-950 p-5 text-sm leading-7 text-slate-100">
        {formatWorkflowValue(finalAnswer)}
      </pre>
    </Card>
  );
}

export default function WorkflowRunPage() {
  const [task, setTask] = useState(defaultTask);
  const [validationError, setValidationError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const workflowMutation = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
  });

  const taskLength = useMemo(() => task.trim().length, [task]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTask = task.trim();
    if (!trimmedTask) {
      setValidationError('Enter a task before running the workflow.');
      return;
    }

    setValidationError(null);
    workflowMutation.mutate({ task: trimmedTask });
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Run Workflow</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Run a multi-agent orchestration task</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Enter a complex request and the backend will send it through the planner, researcher, technical architect, developer,
          reviewer, and final answer agents.
        </p>
      </div>

      <Card title="New Task" eyebrow="Input">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="task" className="text-sm font-medium text-slate-700">
                User task
              </label>
              <span className="text-xs text-slate-400">{taskLength} characters</span>
            </div>
            <textarea
              id="task"
              rows={8}
              value={task}
              onChange={(event) => setTask(event.target.value)}
              placeholder="Analyze this startup idea and create a technical implementation plan."
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-200"
            />
            {validationError && <p className="mt-2 text-sm text-rose-600">{validationError}</p>}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              This calls <code className="rounded bg-slate-100 px-1 py-0.5">POST /api/workflows/run</code> and stores the run in SQLite.
            </p>
            <button
              type="submit"
              disabled={workflowMutation.isPending || taskLength === 0}
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {workflowMutation.isPending ? 'Running workflow...' : 'Run workflow'}
            </button>
          </div>
        </form>
      </Card>

      {workflowMutation.isPending && (
        <LoadingState
          title="Workflow running"
          message="The specialized agents are processing the task. Longer requests can take a little while."
        />
      )}

      {workflowMutation.isError && (
        <ErrorState
          title="Workflow request failed"
          message={getApiErrorMessage(workflowMutation.error)}
        />
      )}

      {workflowMutation.data && (
        <div className="space-y-6">
          <FinalAnswerCard workflow={workflowMutation.data} />

          <div>
            <h3 className="text-xl font-semibold text-slate-950">Agent Steps</h3>
            <p className="mt-1 text-sm text-slate-500">
              Each card shows the prompt input, generated output, status, duration, and any error returned by the backend.
            </p>
          </div>

          <div className="space-y-5">
            {workflowMutation.data.steps.map((step, index) => (
              <WorkflowStepCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
