interface ErrorStateProps {
  title?: string;
  message?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'The request could not be completed. Check that the backend API is running.',
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-900">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-rose-700">{message}</p>
    </div>
  );
}
