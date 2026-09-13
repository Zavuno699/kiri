export function LeasePaymentLink({
  leaseId,
  paymentId,
}: {
  leaseId?: string
  paymentId?: string
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-white/7 bg-kiri-900/60 p-4">
        <div className="text-[9px] uppercase tracking-[0.13em] text-kiri-text-muted">
          Lease
        </div>

        <div className="mt-1 break-all font-mono text-xs text-kiri-blue-400">
          {leaseId ?? "—"}
        </div>
      </div>

      <div className="rounded-xl border border-white/7 bg-kiri-900/60 p-4">
        <div className="text-[9px] uppercase tracking-[0.13em] text-kiri-text-muted">
          Payment
        </div>

        <div className="mt-1 break-all font-mono text-xs text-kiri-blue-400">
          {paymentId ?? "—"}
        </div>
      </div>
    </div>
  )
}
