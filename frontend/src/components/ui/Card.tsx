import type { HTMLAttributes, ReactNode } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  eyebrow?: string;
  actions?: ReactNode;
};

export function Card({ title, eyebrow, actions, children, className = '', ...props }: CardProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 ${className}`}
      {...props}
    >
      {(title || eyebrow || actions) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {eyebrow}
              </p>
            )}
            {title && <h2 className="mt-1 text-lg font-semibold text-slate-950">{title}</h2>}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
