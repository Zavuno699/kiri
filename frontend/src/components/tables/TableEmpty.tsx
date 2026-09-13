export function TableEmpty({
  title = "No records",
  detail = "There is no data available for this view.",
}: {
  title?: string
  detail?: string
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 px-6 py-10 text-center">
      <div className="text-sm font-semibold text-kiri-text">
        {title}
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        {detail}
      </div>
    </div>
  )
}
