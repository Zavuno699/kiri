interface EmptyStateProps {
  title: string
  message: string
}

export function EmptyState({
  title,
  message,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
      <div className="text-sm font-semibold text-kiri-text-soft">
        {title}
      </div>

      <div className="mt-1 text-xs leading-5 text-kiri-text-muted">
        {message}
      </div>
    </div>
  )
}
