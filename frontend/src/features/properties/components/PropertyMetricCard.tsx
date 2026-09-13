import { DataCard } from "../../../components/data-display/DataCard"

export function PropertyMetricCard({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail: string
}) {
  return (
    <DataCard>
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-kiri-text-muted">
        {label}
      </div>

      <div className="mt-2 text-2xl font-black">
        {value}
      </div>

      <div className="mt-1 text-xs text-kiri-text-muted">
        {detail}
      </div>
    </DataCard>
  )
}
