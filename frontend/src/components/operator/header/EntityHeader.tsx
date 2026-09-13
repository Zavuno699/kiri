export function EntityHeader({
  label,
  id,
  status,
}: {
  label: string
  id: string
  status?: string
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-kiri-text-muted">
          {label}
        </div>
        <div className="mt-1 text-xl font-black text-kiri-text">
          {id}
        </div>
      </div>

      {status ? (
        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-kiri-text-muted">
          {status}
        </span>
      ) : null}
    </div>
  )
}
