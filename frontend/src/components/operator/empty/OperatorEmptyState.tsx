export function OperatorEmptyState({
  title,
  detail,
}: {
  title: string
  detail: string
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">
      <div className="text-sm font-semibold text-kiri-text">
        {title}
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        {detail}
      </div>
    </div>
  )
}
