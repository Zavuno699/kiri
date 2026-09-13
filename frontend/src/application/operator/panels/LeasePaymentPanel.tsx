export function LeasePaymentPanel({
  leaseId,
  paymentCount,
}: {
  leaseId: string
  paymentCount: number
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Lease / payment relationship
      </div>
      <div className="mt-2 text-xs text-kiri-text-muted">
        Lease {leaseId}
      </div>
      <div className="mt-1 text-sm font-bold text-kiri-text">
        {paymentCount} payment records
      </div>
    </section>
  )
}
