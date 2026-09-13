export function PropertyMetricsPanel({
  occupancy,
  availableUnits,
  totalUnits,
}: {
  occupancy: number
  availableUnits: number
  totalUnits: number
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-xl border border-white/7 p-4">
        <div className="text-xs text-kiri-text-muted">Occupancy</div>
        <div className="mt-1 text-xl font-black text-kiri-text">
          {occupancy.toFixed(1)}%
        </div>
      </div>

      <div className="rounded-xl border border-white/7 p-4">
        <div className="text-xs text-kiri-text-muted">Available</div>
        <div className="mt-1 text-xl font-black text-kiri-text">
          {availableUnits}
        </div>
      </div>

      <div className="rounded-xl border border-white/7 p-4">
        <div className="text-xs text-kiri-text-muted">Total</div>
        <div className="mt-1 text-xl font-black text-kiri-text">
          {totalUnits}
        </div>
      </div>
    </div>
  )
}
