import type { WorkflowStatus } from '../../types/workflow';

interface StatusBadgeProps {
  status: WorkflowStatus | 'online' | 'offline' | 'unknown';
}

const styles: Record<StatusBadgeProps['status'], string> = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  running: 'bg-blue-50 text-blue-700 ring-blue-200',
  completed: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  failed: 'bg-rose-50 text-rose-700 ring-rose-200',
  online: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  offline: 'bg-rose-50 text-rose-700 ring-rose-200',
  unknown: 'bg-slate-100 text-slate-700 ring-slate-200',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${styles[status]}`}
    >
      {status.replace('_', ' ')}
    </span>
  );
}
