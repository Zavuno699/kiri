export function DeviceActivityPanel({
  items = [],
}: {
  items?: Array<{
    id: string
    action: string
    outcome: string
  }>
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Activity
      </div>

      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-white/7 px-3 py-2"
          >
            <span className="text-xs text-kiri-text">
              {item.action}
            </span>
            <span className="text-[10px] uppercase text-kiri-text-muted">
              {item.outcome}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
