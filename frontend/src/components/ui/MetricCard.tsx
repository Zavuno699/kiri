interface MetricCardProps {
  label: string
  value: string
  description?: string
}

export function MetricCard({
  label,
  value,
  description,
}: MetricCardProps) {
  return (
    <article className="kiri-panel kiri-panel-hover rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-kiri-text-muted">
          {label}
        </span>

        <span className="size-2 rounded-full bg-kiri-blue-500/70" />
      </div>

      <div className="mt-4 text-3xl font-black tracking-tight">
        {value}
      </div>

      {description ? (
        <div className="mt-2 text-xs leading-5 text-kiri-text-muted">
          {description}
        </div>
      ) : null}
    </article>
  )
}
