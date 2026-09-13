export function LeaseEntitlementPanel({
  daysGranted,
}: {
  daysGranted: number
}) {
  return (
    <div className="rounded-xl border border-white/7 bg-kiri-950/50 p-4">
      <div className="text-xs text-kiri-text-muted">
        Entitlement
      </div>
      <div className="mt-1 text-xl font-black text-kiri-text">
        {daysGranted} days
      </div>
    </div>
  )
}
