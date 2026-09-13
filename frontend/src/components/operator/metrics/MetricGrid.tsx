export function MetricGrid({
  items,
}: {
  items: Array<{
    id: string
    label: string
    value: string | number
  }>
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-white/7 bg-kiri-950/50 p-4"
        >
          <div className="text-xs text-kiri-text-muted">
            {item.label}
          </div>
          <div className="mt-1 text-2xl font-black text-kiri-text">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  )
}
