export function ActivityTimeline({
  items,
}: {
  items: Array<{
    id: string
    title: string
    occurredAt: string
    severity?: "info" | "warning" | "critical"
  }>
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex gap-3 rounded-xl border border-white/7 p-3"
        >
          <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-kiri-blue-400" />
          <div className="min-w-0">
            <div className="text-xs font-semibold text-kiri-text">
              {item.title}
            </div>
            <div className="mt-1 text-[10px] text-kiri-text-muted">
              {item.occurredAt}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
