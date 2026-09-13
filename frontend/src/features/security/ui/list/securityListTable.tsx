export function SecurityListTable({
  rows = [],
}: {
  rows?: Array<{
    id: string
    status?: string
  }>
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/7">
      <div className="grid grid-cols-[1fr_auto] border-b border-white/7 px-4 py-3 text-[10px] uppercase tracking-wider text-kiri-text-muted">
        <span>Identifier</span>
        <span>Status</span>
      </div>

      {rows.map((row) => (
        <div
          key={row.id}
          className="grid grid-cols-[1fr_auto] border-b border-white/5 px-4 py-3 last:border-b-0"
        >
          <span className="truncate text-xs text-kiri-text">
            {row.id}
          </span>
          <span className="text-[10px] text-kiri-text-muted">
            {row.status ?? "unknown"}
          </span>
        </div>
      ))}
    </div>
  )
}
