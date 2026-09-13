interface KeyValueGridProps {
  items: Array<{
    label: string
    value: string
  }>
}

export function KeyValueGrid({
  items,
}: KeyValueGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-white/7 bg-kiri-900/60 p-3"
        >
          <div className="text-[10px] uppercase tracking-[0.13em] text-kiri-text-muted">
            {item.label}
          </div>

          <div className="mt-1 break-words text-sm text-kiri-text-soft">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  )
}
