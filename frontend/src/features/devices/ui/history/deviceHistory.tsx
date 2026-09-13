export function DeviceHistory({
  items = [],
}: {
  items?: Array<{
    id: string
    action: string
    occurredAt: string
  }>
}) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-white/7 px-3 py-2"
        >
          <div className="text-xs font-semibold text-kiri-text">
            {item.action}
          </div>
          <div className="mt-1 text-[10px] text-kiri-text-muted">
            {item.occurredAt}
          </div>
        </div>
      ))}
    </div>
  )
}
