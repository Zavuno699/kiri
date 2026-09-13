export function DashboardTimelinePanel({
  items = [],
}: {
  items?: Array<{
    id: string
    title: string
    occurredAt: string
  }>
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Dashboard timeline
      </div>

      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-white/7 px-3 py-2"
          >
            <div className="text-xs font-semibold text-kiri-text">
              {item.title}
            </div>
            <div className="mt-1 text-[10px] text-kiri-text-muted">
              {item.occurredAt}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
