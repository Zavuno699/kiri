export function PaymentRelationsPanel({
  items = [],
}: {
  items?: string[]
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Related domains
      </div>

      <div className="mt-3 space-y-2">
        {items.length === 0 ? (
          <div className="text-xs text-kiri-text-muted">
            No related entities.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-white/7 px-3 py-2 text-xs text-kiri-text"
            >
              {item}
            </div>
          ))
        )}
      </div>
    </section>
  )
}
