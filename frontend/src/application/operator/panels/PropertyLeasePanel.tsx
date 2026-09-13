export function PropertyLeasePanel({
  propertyId,
  leaseCount,
}: {
  propertyId: string
  leaseCount: number
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Property / lease relationship
      </div>
      <div className="mt-2 text-xs text-kiri-text-muted">
        Property {propertyId}
      </div>
      <div className="mt-1 text-sm font-bold text-kiri-text">
        {leaseCount} leases
      </div>
    </section>
  )
}
