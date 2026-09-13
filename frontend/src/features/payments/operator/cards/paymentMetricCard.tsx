export function PaymentMetricCard({
  label,
  value,
  status = "normal",
}: {
  label: string
  value: string | number
  status?: "normal" | "warning" | "critical"
}) {
  return (
    <div className="rounded-xl border border-white/7 bg-kiri-950/55 p-4">
      <div className="text-xs text-kiri-text-muted">
        {label}
      </div>
      <div className="mt-1 text-xl font-black text-kiri-text">
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-kiri-text-muted">
        {status}
      </div>
    </div>
  )
}
